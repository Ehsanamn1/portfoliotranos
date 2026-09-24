import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminSession } from "@/lib/auth";
import getPrisma from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const projectUpdateSchema = z.object({
  slug: z.string().trim().min(2).max(100).regex(/^[a-z0-9-]+$/).optional(),
  title: z.string().trim().min(2).max(140).optional(),
  description: z.string().trim().min(2).max(1000).optional(),
  category: z.string().trim().min(2).max(100).optional(),
  year: z.coerce.number().int().min(1900).max(3000).optional(),
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
  imageUrl: z.url().optional().or(z.literal("")).optional(),
  sortOrder: z.coerce.number().int().min(0).max(10000).optional()
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
    const parsed = projectUpdateSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ ok: false, error: "Invalid project data." }, { status: 400 });

    const data = await prisma.project.update({
      where: { id },
      data: { ...parsed.data, imageUrl: parsed.data.imageUrl === "" ? null : parsed.data.imageUrl }
    });
    return NextResponse.json({ ok: true, data });
  } catch {
    return NextResponse.json({ ok: false, error: "Unable to update project." }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const prisma = getPrisma();
  try {
    if (!(await admin())) return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
    const { id } = await params;
    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Unable to delete project." }, { status: 500 });
  }
}
