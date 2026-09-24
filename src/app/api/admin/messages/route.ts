import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getAdminSession();

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
    }

    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        company: true,
        projectType: true,
        message: true,
        status: true,
        createdAt: true
      }
    });

    return NextResponse.json({ ok: true, data: messages });
  } catch {
    return NextResponse.json({ ok: false, error: "Unable to load messages." }, { status: 500 });
  }
}
