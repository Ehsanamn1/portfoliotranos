import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminSession } from "@/lib/auth";
import getPrisma from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const insightSchema = z.object({
  slug: z.string().trim().min(2).max(100).regex(/^[a-z0-9-]+$/),
  title: z.string().trim().min(2).max(180),
  excerpt: z.string().trim().min(2).max(600),
  content: z.string().trim().min(2).max(100000),
  coverImageUrl: z.url().optional().or(z.literal("")),
  published: z.boolean().optional(),
  publishedAt: z.coerce.date().nullable().optional()
});

async function admin() {
  const session = await getAdminSession();
  return session?.user.role === "ADMIN";
}

export async function GET() {
  const prisma = getPrisma();
  try {
    if (!(await admin())) return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
    const data = await prisma.insight.findMany({ orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }] });
    return NextResponse.json({ ok: true, data });
  } catch {
    return NextResponse.json({ ok: false, error: "Unable to load insights." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const prisma = getPrisma();
  try {
    if (!(await admin())) return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
    const parsed = insightSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ ok: false, error: "Invalid insight data." }, { status: 400 });

    const data = await prisma.insight.create({
      data: {
        ...parsed.data,
        coverImageUrl: parsed.data.coverImageUrl || null,
        published: parsed.data.published ?? false
      }
    });
    return NextResponse.json({ ok: true, data }, { status: 201 });
  } catch {
    return NextResponse.json({ ok: false, error: "Unable to create insight." }, { status: 500 });
  }
}
