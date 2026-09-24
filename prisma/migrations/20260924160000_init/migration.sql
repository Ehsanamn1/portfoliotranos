CREATE TABLE "ContactMessage" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "company" TEXT,
  "projectType" TEXT,
  "message" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'NEW',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ContactMessage_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Project" (
  "id" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "category" TEXT NOT NULL,
  "year" INTEGER NOT NULL,
  "featured" BOOLEAN NOT NULL DEFAULT false,
  "published" BOOLEAN NOT NULL DEFAULT true,
  "imageUrl" TEXT,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Insight" (
  "id" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "excerpt" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "coverImageUrl" TEXT,
  "published" BOOLEAN NOT NULL DEFAULT false,
  "publishedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Insight_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "AdminUser" (
  "id" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "passwordHash" TEXT NOT NULL,
  "role" TEXT NOT NULL DEFAULT 'ADMIN',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "AdminSession" (
  "id" TEXT NOT NULL,
  "tokenHash" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "expiresAt" TIMESTAMP(3) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "AdminSession_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");
CREATE UNIQUE INDEX "Insight_slug_key" ON "Insight"("slug");
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");
CREATE UNIQUE INDEX "AdminSession_tokenHash_key" ON "AdminSession"("tokenHash");

CREATE INDEX "ContactMessage_createdAt_idx" ON "ContactMessage"("createdAt");
CREATE INDEX "ContactMessage_status_createdAt_idx" ON "ContactMessage"("status", "createdAt");
CREATE INDEX "Project_published_featured_sortOrder_idx" ON "Project"("published", "featured", "sortOrder");
CREATE INDEX "Insight_published_publishedAt_idx" ON "Insight"("published", "publishedAt");
CREATE INDEX "AdminSession_userId_idx" ON "AdminSession"("userId");
CREATE INDEX "AdminSession_expiresAt_idx" ON "AdminSession"("expiresAt");

ALTER TABLE "AdminSession"
  ADD CONSTRAINT "AdminSession_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "AdminUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
