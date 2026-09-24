import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminSession } from "@/lib/auth";
import getPrisma from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const projectSchema = z.object({
  slug: z.string().trim().min(2).max(100).regex(/^[a-z0-9-]+$/),
  title: z.string().trim().min(2).max(140),
  description: z.string().trim().min(2).max(1000),
  category: z.string().trim().min(2).max(100),
  year: z.coerce.number().int().min(1900).max(3000),
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
  imageUrl: z.url().optional().or(z.literal("")),
  clientName: z.string().trim().max(200).optional(),
  role: z.string().trim().max(200).optional(),
  challenge: z.string().trim().max(5000).optional(),
  solution: z.string().trim().max(5000).optional(),
  impact: z.string().trim().max(5000).optional(),
  technologies: z.string().trim().max(1000).optional(),
  galleryUrls: z.string().trim().max(5000).optional(),
  sortOrder: z.coerce.number().int().min(0).max(10000).optional()
});

async function requireAdmin() {
  const session = await getAdminSession();
  return session?.user.role === "ADMIN" ? session : null;
}

export async function GET() {
  const prisma = getPrisma();
  try {
    const session = await requireAdmin();
    if (!session) return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });

    const data = await prisma.project.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] });
    return NextResponse.json({ ok: true, data });
  } catch {
    return NextResponse.json({ ok: false, error: "Unable to load projects." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const prisma = getPrisma();
  try {
    const session = await requireAdmin();
    if (!session) return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });

    const parsed = projectSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ ok: false, error: "Invalid project data." }, { status: 400 });

    const data = await prisma.project.create({
      data: {
        ...parsed.data,
        imageUrl: parsed.data.imageUrl || null,
        clientName: parsed.data.clientName || null,
        role: parsed.data.role || null,
        challenge: parsed.data.challenge || null,
        solution: parsed.data.solution || null,
        impact: parsed.data.impact || null,
        technologies: parsed.data.technologies || null,
        galleryUrls: parsed.data.galleryUrls || null,
        featured: parsed.data.featured ?? false,
        published: parsed.data.published ?? true,
        sortOrder: parsed.data.sortOrder ?? 0
      }
    });
    return NextResponse.json({ ok: true, data }, { status: 201 });
  } catch {
    return NextResponse.json({ ok: false, error: "Unable to create project." }, { status: 500 });
  }
}
