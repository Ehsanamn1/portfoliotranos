import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const databaseUrl=process.env.DATABASE_URL;
if(!databaseUrl)throw new Error("DATABASE_URL is required for seeding.");
const prisma=new PrismaClient({adapter:new PrismaPg({connectionString:databaseUrl})});

async function main(){
 const projects=[
  {slug:"tranos-ai",title:"Tranos AI",description:"AI product experience and web platform.",category:"AI Product",year:2026,featured:true,published:true,imageUrl:"/work/tranos-ai.svg",clientName:"Tranos Concept Lab",role:"Product / AI / Experience",challenge:"Translate complex AI capabilities into a calm, premium product experience.",solution:"A modular AI workspace with clear hierarchy, intelligent states and cinematic interaction.",impact:"Sharper positioning, clearer product story and a reusable experience system.",technologies:"Next.js|TypeScript|AI UX|Motion|Cloudflare",galleryUrls:"/work/tranos-ai.svg",sortOrder:1},
  {slug:"brand-system",title:"Brand System",description:"Identity and digital presence for a technology-first brand.",category:"Branding",year:2026,featured:true,published:true,imageUrl:"/work/brand-system.svg",clientName:"Signal Brand Lab",role:"Brand Strategy / Identity",challenge:"Create a visual system that feels technical without losing warmth.",solution:"A flexible identity built around signal, form, type and controlled motion.",impact:"A coherent foundation for web, social, decks and launch campaigns.",technologies:"Art Direction|Typography|Identity|Motion",galleryUrls:"/work/brand-system.svg",sortOrder:2},
  {slug:"atlas-commerce",title:"Atlas Commerce",description:"Commerce experience with automation at the core.",category:"E-commerce",year:2026,featured:true,published:true,imageUrl:"/work/atlas-commerce.svg",clientName:"Atlas Commerce Lab",role:"Commerce / Automation / UX",challenge:"Turn a complex commerce workflow into an interface people can understand quickly.",solution:"A visual operations layer connecting discovery, checkout and automation.",impact:"Less cognitive load, clearer states and a stronger premium commerce story.",technologies:"UX/UI|E-commerce|Automation|Systems",galleryUrls:"/work/atlas-commerce.svg",sortOrder:3},
  {slug:"neon-operations",title:"Neon Operations",description:"A control experience for complex digital operations.",category:"Creative Technology",year:2026,featured:false,published:true,imageUrl:"/work/neon-operations.svg",sortOrder:4},
  {slug:"halo-health",title:"Halo Health",description:"A calm, premium digital health product concept.",category:"Digital Product",year:2026,featured:false,published:true,imageUrl:"/work/halo-health.svg",sortOrder:5},
  {slug:"orbit-finance",title:"Orbit Finance",description:"A financial intelligence interface built around signal and clarity.",category:"Fintech",year:2026,featured:false,published:true,imageUrl:"/work/orbit-finance.svg",sortOrder:6}
 ];
 for(const project of projects)await prisma.project.upsert({where:{slug:project.slug},update:project,create:project});

 const insights=[
  {slug:"future-of-ai-products",title:"The Future of AI Products",excerpt:"How intelligent systems are changing digital product design.",content:"AI products become valuable when the intelligence is woven into the experience rather than bolted onto it. The interface should make the system feel useful, legible and calm.",published:true,publishedAt:new Date()},
  {slug:"minimalism-in-web-design",title:"Minimalism in Web Design",excerpt:"Why restraint and typography can create stronger interfaces.",content:"Minimalism is not less design. It is stronger decisions. When every element has a job, hierarchy becomes visible and the product becomes easier to remember.",published:true,publishedAt:new Date()},
  {slug:"building-a-digital-brand",title:"Building a Digital Brand",excerpt:"Positioning, identity and systems for modern companies.",content:"A modern brand is not only a logo. It is a system of type, motion, color, voice and behavior that can survive across every touchpoint.",published:true,publishedAt:new Date()}
 ];
 for(const insight of insights)await prisma.insight.upsert({where:{slug:insight.slug},update:insight,create:insight});

 const services=[
  {slug:"digital-products",number:"01",title:"Digital Products",description:"Websites, platforms and product experiences engineered for speed, clarity and conversion.",capabilities:"UX / UI|Frontend|Backend|CMS|Cloud",sortOrder:1,published:true},
  {slug:"ai-systems",number:"02",title:"AI Systems",description:"AI-powered products, automations and workflows designed around real business outcomes.",capabilities:"AI UX|Automation|Agents|Integrations|Data workflows",sortOrder:2,published:true},
  {slug:"brand-identity",number:"03",title:"Brand & Identity",description:"Distinctive visual systems that make technology brands feel human, premium and ownable.",capabilities:"Positioning|Identity|Art direction|Design systems|Launch assets",sortOrder:3,published:true},
  {slug:"3d-motion",number:"04",title:"3D & Motion",description:"Cinematic interfaces, motion systems and immersive visuals that give digital products a pulse.",capabilities:"Motion design|3D scenes|Interactive visuals|Creative code",sortOrder:4,published:true},
  {slug:"digital-strategy",number:"05",title:"Digital Strategy",description:"Clarify what to build, why it matters and what needs to happen after launch.",capabilities:"Discovery|Product strategy|Content|Roadmaps|Optimization",sortOrder:5,published:true}
 ];
 for(const service of services)await prisma.service.upsert({where:{slug:service.slug},update:service,create:service});

 await prisma.siteSetting.upsert({
  where:{id:"main"},
  update:{brandName:"TRANOS",tagline:"Digital / AI / Creative",heroTitle:"Ideas into Digital Reality.",heroDescription:"Tranos is an independent digital studio building premium experiences, intelligent systems and visual identities for ambitious teams.",email:"hello@tranos.studio",location:"Tehran · Remote Worldwide",footerNote:"Built for the next digital era.",defaultLocale:"en",defaultTheme:"dark"},
  create:{id:"main",brandName:"TRANOS",tagline:"Digital / AI / Creative",heroTitle:"Ideas into Digital Reality.",heroDescription:"Tranos is an independent digital studio building premium experiences, intelligent systems and visual identities for ambitious teams.",email:"hello@tranos.studio",location:"Tehran · Remote Worldwide",footerNote:"Built for the next digital era.",defaultLocale:"en",defaultTheme:"dark"}
 });

 const adminEmail=(process.env.ADMIN_EMAIL||"admin@tranos.studio").trim().toLowerCase();
 const adminPassword=process.env.ADMIN_PASSWORD;
 if(!adminPassword)throw new Error("ADMIN_PASSWORD is required to seed the Tranos Control Center admin.");
 await prisma.adminUser.upsert({where:{email:adminEmail},update:{passwordHash:await bcrypt.hash(adminPassword,12),role:"ADMIN"},create:{email:adminEmail,passwordHash:await bcrypt.hash(adminPassword,12),role:"ADMIN"}});
 console.log(`Seeded Tranos CMS and admin ${adminEmail}`);
}
main().catch((error)=>{console.error(error);process.exit(1)}).finally(()=>prisma.$disconnect());
