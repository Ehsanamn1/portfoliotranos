import "dotenv/config";
import getPrisma from "../src/lib/prisma";

async function main() {
  const prisma = getPrisma();
  try {
    await prisma.$queryRawUnsafe("SELECT 1");
    console.log("Database connection: OK");
  } catch (error) {
    console.error("Database connection: FAILED");
    console.error(error);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

void main();
