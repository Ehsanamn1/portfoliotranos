import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import getPrisma from "@/lib/prisma";
import { createAdminSession } from "@/lib/auth";
import { z } from "zod";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(200)
});

export async function POST(request: Request) {
  const prisma = getPrisma();
  try {
    const body: unknown = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ ok: false, error: "Invalid credentials." }, { status: 400 });
    }

    const user = await prisma.adminUser.findUnique({
      where: { email: parsed.data.email.toLowerCase() }
    });

    if (!user || !(await bcrypt.compare(parsed.data.password, user.passwordHash))) {
      return NextResponse.json({ ok: false, error: "Invalid email or password." }, { status: 401 });
    }

    await createAdminSession(user.id);

    return NextResponse.json({
      ok: true,
      data: { email: user.email, role: user.role }
    });
  } catch {
    return NextResponse.json({ ok: false, error: "Login is temporarily unavailable." }, { status: 500 });
  }
}
