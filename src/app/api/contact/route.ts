import { NextResponse } from "next/server";
import getPrisma from "@/lib/prisma";
import { contactMessageSchema } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const prisma = getPrisma();
  try {
    const body: unknown = await request.json();
    const parsed = contactMessageSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Invalid contact form data." },
        { status: 400 }
      );
    }

    const contact = await prisma.contactMessage.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        company: parsed.data.company || null,
        projectType: parsed.data.projectType || null,
        message: parsed.data.message
      },
      select: {
        id: true,
        createdAt: true
      }
    });

    return NextResponse.json(
      {
        ok: true,
        message: "Your message has been received.",
        data: contact
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { ok: false, error: "Unable to save your message right now." },
      { status: 500 }
    );
  }
}
