import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await prisma.$queryRawUnsafe("SELECT 1");

    return NextResponse.json({
      ok: true,
      service: "tranos-studio",
      database: "connected",
      timestamp: new Date().toISOString()
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        service: "tranos-studio",
        database: "unavailable",
        timestamp: new Date().toISOString()
      },
      { status: 503 }
    );
  }
}
