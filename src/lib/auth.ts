import { createHash, randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import getPrisma from "@/lib/prisma";

const SESSION_COOKIE = "tranos_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function createAdminSession(userId: string) {
  const prisma = getPrisma();
  const token = randomBytes(32).toString("hex");
  const tokenHash = hashToken(token);
  const expiresAt = new Date(Date.now() + SESSION_TTL_SECONDS * 1000);

  await prisma.adminSession.create({
    data: { tokenHash, userId, expiresAt }
  });

  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt
  });
}

export async function getAdminSession() {
  const prisma = getPrisma();
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const session = await prisma.adminSession.findUnique({
    where: { tokenHash: hashToken(token) },
    include: { user: true }
  });

  if (!session) return null;

  if (session.expiresAt <= new Date()) {
    await prisma.adminSession.delete({ where: { id: session.id } }).catch(() => undefined);
    return null;
  }

  return session;
}

export async function destroyAdminSession() {
  const prisma = getPrisma();
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;

  if (token) {
    await prisma.adminSession.deleteMany({
      where: { tokenHash: hashToken(token) }
    });
  }

  store.delete(SESSION_COOKIE);
}
