import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error("DATABASE_URL is required for seeding.");

const adapter = new PrismaPg({ connectionString: databaseUrl });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.project.createMany({
    data: [
      { slug:"tranos-ai", title:"Tranos AI", description:"AI product experience and web platform.", category:"AI Product", year:2026, featured:true, sortOrder:1 },
      { slug:"brand-system", title:"Brand System", description:"Identity and digital presence for a modern technology brand.", category:"Branding", year:2026, featured:true, sortOrder:2 },
      { slug:"atlas-commerce", title:"Atlas Commerce", description:"Commerce platform with automation at the core.", category:"E-commerce", year:2026, featured:true, sortOrder:3 }
    ],
    skipDuplicates:true
  });

  await prisma.insight.createMany({
    data: [
      { slug:"future-of-ai-products", title:"The Future of AI Products", excerpt:"How intelligent systems are changing digital product design.", content:"Tranos Studio insight placeholder.", published:true, publishedAt:new Date() },
      { slug:"minimalism-in-web-design", title:"Minimalism in Web Design", excerpt:"Why restraint and typography can create stronger interfaces.", content:"Tranos Studio insight placeholder.", published:true, publishedAt:new Date() },
      { slug:"building-a-digital-brand", title:"Building a Digital Brand", excerpt:"Positioning, identity and systems for modern companies.", content:"Tranos Studio insight placeholder.", published:true, publishedAt:new Date() }
    ],
    skipDuplicates:true
  });

  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (adminEmail && adminPassword) {
    const passwordHash = await bcrypt.hash(adminPassword, 12);
    await prisma.adminUser.upsert({
      where: { email: adminEmail },
      update: { passwordHash },
      create: { email: adminEmail, passwordHash, role: "ADMIN" }
    });
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
