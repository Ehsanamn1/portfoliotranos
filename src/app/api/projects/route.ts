import { NextResponse } from "next/server";
import getPrisma from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const prisma = getPrisma();
  try {
    const projects = await prisma.project.findMany({
      where: { published: true },
      orderBy: [{ featured: "desc" }, { sortOrder: "asc" }, { createdAt: "desc" }],
      select: {
        id: true,
        slug: true,
        title: true,
        description: true,
        category: true,
        year: true,
        featured: true,
        imageUrl: true
      }
    });

    return NextResponse.json({ ok: true, data: projects });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Unable to load projects." },
      { status: 500 }
    );
  }
}
