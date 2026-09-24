CREATE TABLE "Service" (
  "id" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "number" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "capabilities" TEXT,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "published" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Service_slug_key" ON "Service"("slug");
CREATE INDEX "Service_published_sortOrder_idx" ON "Service"("published", "sortOrder");

CREATE TABLE "SiteSetting" (
  "id" TEXT NOT NULL,
  "brandName" TEXT NOT NULL DEFAULT 'TRANOS',
  "tagline" TEXT NOT NULL DEFAULT 'Digital / AI / Creative',
  "heroTitle" TEXT NOT NULL DEFAULT 'Ideas into Digital Reality.',
  "heroDescription" TEXT NOT NULL DEFAULT 'Tranos is an independent digital studio building premium experiences, intelligent systems and visual identities for ambitious teams.',
  "email" TEXT NOT NULL DEFAULT 'hello@tranos.studio',
  "location" TEXT NOT NULL DEFAULT 'Tehran · Remote Worldwide',
  "footerNote" TEXT NOT NULL DEFAULT 'Built for the next digital era.',
  "linkedinUrl" TEXT,
  "instagramUrl" TEXT,
  "behanceUrl" TEXT,
  "dribbbleUrl" TEXT,
  "defaultLocale" TEXT NOT NULL DEFAULT 'en',
  "defaultTheme" TEXT NOT NULL DEFAULT 'dark',
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "SiteSetting_pkey" PRIMARY KEY ("id")
);
