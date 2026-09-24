import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminSession } from "@/lib/auth";
import getPrisma from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const updateSchema = z.object({
  slug: z.string().trim().min(2).max(100).regex(/^[a-z0-9-]+$/).optional(),
  title: z.string().trim().min(2).max(180).optional(),
  excerpt: z.string().trim().min(2).max(600).optional(),
  content: z.string().trim().min(2).max(100000).optional(),
  coverImageUrl: z.url().optional().or(z.literal("")).optional(),
  published: z.boolean().optional(),
  publishedAt: z.coerce.date().nullable().optional()
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
    const parsed = updateSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ ok: false, error: "Invalid insight data." }, { status: 400 });

    const data = await prisma.insight.update({
      where: { id },
      data: { ...parsed.data, coverImageUrl: parsed.data.coverImageUrl === "" ? null : parsed.data.coverImageUrl }
    });
    return NextResponse.json({ ok: true, data });
  } catch {
    return NextResponse.json({ ok: false, error: "Unable to update insight." }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const prisma = getPrisma();
  try {
    if (!(await admin())) return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
    const { id } = await params;
    await prisma.insight.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Unable to delete insight." }, { status: 500 });
  }
}
