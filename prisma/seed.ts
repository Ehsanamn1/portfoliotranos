import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error("DATABASE_URL is required for seeding.");

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: databaseUrl }) });

async function main() {
  const projects = [
    {slug:"tranos-ai",title:"Tranos AI",description:"A calm AI workspace that turns complex intelligence into a clear product experience.",category:"AI Product",year:2026,featured:true,published:true,imageUrl:"https://images.unsplash.com/photo-1678058315341-f17934861ae0?auto=format&fit=crop&w=2200&q=86",clientName:"Tranos Concept Lab",role:"Product / AI / Experience",challenge:"Translate powerful AI capabilities into an interface people can understand in seconds.",solution:"A modular workspace with strong hierarchy, intelligent states and restrained motion.",impact:"A clearer product story and a reusable experience system for future AI features.",technologies:"Next.js|TypeScript|AI UX|Motion|Cloudflare",galleryUrls:"https://images.unsplash.com/photo-1678058315341-f17934861ae0?auto=format&fit=crop&w=2200&q=86",sortOrder:1},
    {slug:"brand-system",title:"Brand System",description:"A visual identity and digital language for a technology-first brand.",category:"Branding",year:2026,featured:true,published:true,imageUrl:"https://images.unsplash.com/photo-1518342550687-97913bd65a59?auto=format&fit=crop&w=2200&q=86",clientName:"Signal Brand Lab",role:"Brand Strategy / Identity",challenge:"Create a system that feels technical without becoming cold or generic.",solution:"A flexible identity built around signal, form, type, composition and controlled motion.",impact:"A coherent foundation for web, social, decks and launch campaigns.",technologies:"Art Direction|Typography|Identity|Motion",galleryUrls:"https://images.unsplash.com/photo-1518342550687-97913bd65a59?auto=format&fit=crop&w=2200&q=86",sortOrder:2},
    {slug:"atlas-commerce",title:"Atlas Commerce",description:"A commerce experience designed around clarity, automation and momentum.",category:"E-commerce",year:2026,featured:true,published:true,imageUrl:"https://images.unsplash.com/photo-1649700028744-3de5d81dfba9?auto=format&fit=crop&w=2200&q=86",clientName:"Atlas Commerce Lab",role:"Commerce / Automation / UX",challenge:"Turn a complex commerce workflow into a confident, legible experience.",solution:"A visual operations layer connecting discovery, checkout and automation.",impact:"Less cognitive load and a stronger premium commerce story.",technologies:"UX/UI|E-commerce|Automation|Systems",galleryUrls:"https://images.unsplash.com/photo-1649700028744-3de5d81dfba9?auto=format&fit=crop&w=2200&q=86",sortOrder:3},
    {slug:"neon-operations",title:"Neon Operations",description:"A control surface for complex digital operations, built around signal over noise.",category:"Creative Technology",year:2026,featured:false,published:true,imageUrl:"https://images.unsplash.com/photo-1741524915876-2494dee7ebff?auto=format&fit=crop&w=2200&q=86",clientName:"Concept Project",role:"Product / Creative Technology",challenge:"Expose system health without overwhelming the operator.",solution:"A cinematic command interface with layered state and visual hierarchy.",impact:"A sharper operational story and a scalable design language.",technologies:"React|Creative Code|Motion|Systems",galleryUrls:"https://images.unsplash.com/photo-1741524915876-2494dee7ebff?auto=format&fit=crop&w=2200&q=86",sortOrder:4},
    {slug:"halo-health",title:"Halo Health",description:"A calm digital health product concept where trust is part of the interface.",category:"Digital Product",year:2026,featured:false,published:true,imageUrl:"https://images.unsplash.com/photo-1758800601654-d8b262d585b9?auto=format&fit=crop&w=2200&q=86",clientName:"Concept Project",role:"Product / UX / Brand",challenge:"Make a sensitive digital experience feel clear, human and reassuring.",solution:"A calm information system with progressive disclosure and warm visual rhythm.",impact:"A prototype direction designed around comprehension and trust.",technologies:"UX|UI|Product Strategy|Motion",galleryUrls:"https://images.unsplash.com/photo-1758800601654-d8b262d585b9?auto=format&fit=crop&w=2200&q=86",sortOrder:5},
    {slug:"orbit-finance",title:"Orbit Finance",description:"A financial intelligence interface built around signal, context and clarity.",category:"Fintech",year:2026,featured:false,published:true,imageUrl:"https://images.unsplash.com/photo-1716827173021-57a1b5e85580?auto=format&fit=crop&w=2200&q=86",clientName:"Concept Project",role:"Product / Data Experience",challenge:"Make dense financial information easier to scan and act on.",solution:"A visual intelligence layer that puts trend, context and next action in one view.",impact:"A more approachable interface for high-density financial workflows.",technologies:"Data UX|Product Design|Motion|Systems",galleryUrls:"https://images.unsplash.com/photo-1716827173021-57a1b5e85580?auto=format&fit=crop&w=2200&q=86",sortOrder:6}
  ];
  for (const project of projects) {
    await prisma.project.upsert({ where:{slug:project.slug}, update:project, create:project });
  }

  const insights = [
    {slug:"future-of-ai-products",title:"The Future of AI Products",excerpt:"Designing the layer between raw intelligence and a useful human decision.",content:"AI products become valuable when intelligence is woven into the experience rather than bolted onto it. The interface should make the system feel useful, legible and calm.",published:true,publishedAt:new Date("2026-09-12T10:00:00Z"),coverImageUrl:"https://images.unsplash.com/photo-1678058315341-f17934861ae0?auto=format&fit=crop&w=2200&q=86"},
    {slug:"minimalism-in-web-design",title:"Minimalism in Web Design",excerpt:"Why restraint, hierarchy and typography can make an interface feel more expensive.",content:"Minimalism is not less design. It is stronger decisions. When every element has a job, hierarchy becomes visible and the product becomes easier to remember.",published:true,publishedAt:new Date("2026-08-24T10:00:00Z"),coverImageUrl:"https://images.unsplash.com/photo-1546425703-2fc3051478ec?auto=format&fit=crop&w=2200&q=86"},
    {slug:"building-a-digital-brand",title:"Building a Digital Brand",excerpt:"Positioning, identity and systems for modern companies that need to feel distinct.",content:"A modern brand is not only a logo. It is a system of type, motion, color, voice and behavior that can survive across every touchpoint.",published:true,publishedAt:new Date("2026-07-18T10:00:00Z"),coverImageUrl:"https://images.unsplash.com/photo-1518342550687-97913bd65a59?auto=format&fit=crop&w=2200&q=86"}
  ];
  for (const insight of insights) {
    await prisma.insight.upsert({ where:{slug:insight.slug}, update:insight, create:insight });
  }

  const services = [
    {slug:"digital-products",number:"01",title:"Digital Products",description:"Websites, platforms and product experiences engineered for speed, clarity and conversion.",capabilities:"UX / UI|Frontend|Backend|CMS|Cloud",sortOrder:1,published:true},
    {slug:"ai-systems",number:"02",title:"AI Systems",description:"AI-powered products, automations and workflows designed around real business outcomes.",capabilities:"AI UX|Automation|Agents|Integrations|Data workflows",sortOrder:2,published:true},
    {slug:"brand-identity",number:"03",title:"Brand & Identity",description:"Distinctive visual systems that make technology brands feel human, premium and ownable.",capabilities:"Positioning|Identity|Art direction|Design systems|Launch assets",sortOrder:3,published:true},
    {slug:"3d-motion",number:"04",title:"3D & Motion",description:"Cinematic interfaces, motion systems and immersive visuals that give digital products a pulse.",capabilities:"Motion design|3D scenes|Interactive visuals|Creative code",sortOrder:4,published:true},
    {slug:"digital-strategy",number:"05",title:"Digital Strategy",description:"Clarify what to build, why it matters and what should happen after launch.",capabilities:"Discovery|Product strategy|Content|Roadmaps|Optimization",sortOrder:5,published:true}
  ];
  for (const service of services) {
    await prisma.service.upsert({ where:{slug:service.slug}, update:service, create:service });
  }

  const settings = {
    brandName:"TRANOS",
    tagline:"Digital / AI / Creative",
    heroTitle:"Ideas into Digital Reality.",
    heroDescription:"Tranos is an independent digital studio building premium experiences, intelligent systems and visual identities for ambitious teams.",
    email:"hello@tranos.studio",
    location:"Tehran · Remote Worldwide",
    footerNote:"Built for the next digital era.",
    defaultLocale:"en",
    defaultTheme:"dark"
  };
  await prisma.siteSetting.upsert({where:{id:"main"},update:settings,create:{id:"main",...settings}});

  const adminEmail = (process.env.ADMIN_EMAIL || "admin@tranos.studio").trim().toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) throw new Error("ADMIN_PASSWORD is required to seed the Tranos Control Center admin.");

  await prisma.adminUser.upsert({
    where:{email:adminEmail},
    update:{passwordHash:await bcrypt.hash(adminPassword,12),role:"ADMIN"},
    create:{email:adminEmail,passwordHash:await bcrypt.hash(adminPassword,12),role:"ADMIN"}
  });

  console.log(`Seeded Tranos CMS and admin ${adminEmail}`);
}

main().catch((error)=>{console.error(error);process.exit(1)}).finally(()=>prisma.$disconnect());
