import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminSession } from "@/lib/auth";
import getPrisma from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const statusSchema = z.object({
  status: z.enum(["NEW", "READ", "REPLIED", "ARCHIVED"])
});

async function admin() {
  const session = await getAdminSession();
  return session?.user.role === "ADMIN";
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const prisma = getPrisma();
  try {
    if (!(await admin())) return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
    const { id } = await params;
    const parsed = statusSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ ok: false, error: "Invalid status." }, { status: 400 });

    const data = await prisma.contactMessage.update({
      where: { id },
      data: { status: parsed.data.status }
    });
    return NextResponse.json({ ok: true, data });
  } catch {
    return NextResponse.json({ ok: false, error: "Unable to update message." }, { status: 500 });
  }
}
