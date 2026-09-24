import { NextResponse } from "next/server";
import getPrisma from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const prisma = getPrisma();
  try {
    const insights = await prisma.insight.findMany({
      where: { published: true },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      select: {
        id: true,
        slug: true,
        title: true,
        excerpt: true,
        coverImageUrl: true,
        publishedAt: true
      }
    });

    return NextResponse.json({ ok: true, data: insights });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Unable to load insights." },
      { status: 500 }
    );
  }
}
