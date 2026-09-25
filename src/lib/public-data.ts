import getPrisma from "@/lib/prisma";

export type PublicProject = {
  id: string; slug: string; title: string; description: string; category: string; year: number;
  featured: boolean; imageUrl: string | null; clientName: string | null; role: string | null;
  challenge: string | null; solution: string | null; impact: string | null; technologies: string | null; galleryUrls: string | null;
};

export type PublicInsight = {
  id: string; slug: string; title: string; excerpt: string; content: string;
  coverImageUrl: string | null; publishedAt: Date | null;
};

const fallbackProjects: PublicProject[] = [
  {id:"fallback-tranos-ai",slug:"tranos-ai",title:"Tranos AI",description:"A calm AI workspace that turns complex intelligence into a clear product experience.",category:"AI Product",year:2026,featured:true,imageUrl:"/work/tranos-ai.svg",clientName:"Tranos Concept Lab",role:"Product / AI / Experience",challenge:"Translate powerful AI capabilities into an interface people can understand in seconds.",solution:"A modular workspace with strong hierarchy, intelligent states and restrained motion.",impact:"A clearer product story and a reusable experience system for future AI features.",technologies:"Next.js|TypeScript|AI UX|Motion|Cloudflare",galleryUrls:"/work/tranos-ai.svg"},
  {id:"fallback-brand",slug:"brand-system",title:"Brand System",description:"A visual identity and digital language for a technology-first brand.",category:"Branding",year:2026,featured:true,imageUrl:"/work/brand-system.svg",clientName:"Signal Brand Lab",role:"Brand Strategy / Identity",challenge:"Create a system that feels technical without becoming cold or generic.",solution:"A flexible identity built around signal, form, type, composition and controlled motion.",impact:"A coherent foundation for web, social, decks and launch campaigns.",technologies:"Art Direction|Typography|Identity|Motion",galleryUrls:"/work/brand-system.svg"},
  {id:"fallback-atlas",slug:"atlas-commerce",title:"Atlas Commerce",description:"A commerce experience designed around clarity, automation and momentum.",category:"E-commerce",year:2026,featured:true,imageUrl:"/work/atlas-commerce.svg",clientName:"Atlas Commerce Lab",role:"Commerce / Automation / UX",challenge:"Turn a complex commerce workflow into a confident, legible experience.",solution:"A visual operations layer connecting discovery, checkout and automation.",impact:"Less cognitive load and a stronger premium commerce story.",technologies:"UX/UI|E-commerce|Automation|Systems",galleryUrls:"/work/atlas-commerce.svg"},
  {id:"fallback-neon",slug:"neon-operations",title:"Neon Operations",description:"A control surface for complex digital operations, built around signal over noise.",category:"Creative Technology",year:2026,featured:false,imageUrl:"/work/neon-operations.svg",clientName:"Concept Project",role:"Product / Creative Technology",challenge:"Expose system health without overwhelming the operator.",solution:"A cinematic command interface with layered state and visual hierarchy.",impact:"A sharper operational story and a scalable design language.",technologies:"React|Creative Code|Motion|Systems",galleryUrls:"/work/neon-operations.svg"},
  {id:"fallback-halo",slug:"halo-health",title:"Halo Health",description:"A calm digital health product concept where trust is part of the interface.",category:"Digital Product",year:2026,featured:false,imageUrl:"/work/halo-health.svg",clientName:"Concept Project",role:"Product / UX / Brand",challenge:"Make a sensitive digital experience feel clear, human and reassuring.",solution:"A calm information system with progressive disclosure and warm visual rhythm.",impact:"A prototype direction designed around comprehension and trust.",technologies:"UX|UI|Product Strategy|Motion",galleryUrls:"/work/halo-health.svg"},
  {id:"fallback-orbit",slug:"orbit-finance",title:"Orbit Finance",description:"A financial intelligence interface built around signal, context and clarity.",category:"Fintech",year:2026,featured:false,imageUrl:"/work/orbit-finance.svg",clientName:"Concept Project",role:"Product / Data Experience",challenge:"Make dense financial information easier to scan and act on.",solution:"A visual intelligence layer that puts trend, context and next action in one view.",impact:"A more approachable interface for high-density financial workflows.",technologies:"Data UX|Product Design|Motion|Systems",galleryUrls:"/work/orbit-finance.svg"}
];

const fallbackInsights: PublicInsight[] = [
  {id:"fallback-ai",slug:"future-of-ai-products",title:"The Future of AI Products",excerpt:"Designing the layer between raw intelligence and a useful human decision.",content:"AI products become valuable when the intelligence is woven into the experience rather than bolted onto it. The interface should make the system feel useful, legible and calm. The strongest AI experiences make the next action obvious and preserve the user's sense of control.",coverImageUrl:"/insights/ai-products.svg",publishedAt:new Date("2026-09-12T10:00:00Z")},
  {id:"fallback-min",slug:"minimalism-in-web-design",title:"Minimalism in Web Design",excerpt:"Why restraint, hierarchy and typography can make an interface feel more expensive.",content:"Minimalism is not less design. It is stronger decisions. When every element has a job, hierarchy becomes visible and the product becomes easier to remember.",coverImageUrl:"/insights/minimalism.svg",publishedAt:new Date("2026-08-24T10:00:00Z")},
  {id:"fallback-brand",slug:"building-a-digital-brand",title:"Building a Digital Brand",excerpt:"Positioning, identity and systems for modern companies that need to feel distinct.",content:"A modern brand is not only a logo. It is a system of type, motion, color, voice and behavior that can survive across every touchpoint.",coverImageUrl:"/insights/digital-brand.svg",publishedAt:new Date("2026-07-18T10:00:00Z")}
];

export async function getPublicProjects(limit?: number) {
  try {
    return await getPrisma().project.findMany({
      where:{published:true},orderBy:[{featured:"desc"},{sortOrder:"asc"},{createdAt:"desc"}],take:limit,
      select:{id:true,slug:true,title:true,description:true,category:true,year:true,featured:true,imageUrl:true,clientName:true,role:true,challenge:true,solution:true,impact:true,technologies:true,galleryUrls:true}
    });
  } catch { return limit ? fallbackProjects.slice(0,limit) : fallbackProjects; }
}

export async function getPublicProject(slug:string) {
  try {
    return await getPrisma().project.findFirst({
      where:{slug,published:true},
      select:{id:true,slug:true,title:true,description:true,category:true,year:true,featured:true,imageUrl:true,clientName:true,role:true,challenge:true,solution:true,impact:true,technologies:true,galleryUrls:true}
    });
  } catch { return fallbackProjects.find(x=>x.slug===slug) ?? null; }
}

export async function getPublicInsights(limit?:number) {
  try {
    return await getPrisma().insight.findMany({
      where:{published:true},orderBy:[{publishedAt:"desc"},{createdAt:"desc"}],take:limit,
      select:{id:true,slug:true,title:true,excerpt:true,content:true,coverImageUrl:true,publishedAt:true}
    });
  } catch { return limit ? fallbackInsights.slice(0,limit) : fallbackInsights; }
}

export async function getPublicInsight(slug:string) {
  try {
    return await getPrisma().insight.findFirst({
      where:{slug,published:true},
      select:{id:true,slug:true,title:true,excerpt:true,content:true,coverImageUrl:true,publishedAt:true}
    });
  } catch { return fallbackInsights.find(x=>x.slug===slug) ?? null; }
}

export type PublicService = {
  id:string; slug:string; number:string; title:string; description:string;
  capabilities:string|null; sortOrder:number; published:boolean;
};

const fallbackServices:PublicService[] = [
  {id:"fallback-service-1",slug:"digital-products",number:"01",title:"Digital Products",description:"Websites, platforms and product experiences engineered for speed, clarity and conversion.",capabilities:"UX / UI|Frontend|Backend|CMS|Cloud",sortOrder:1,published:true},
  {id:"fallback-service-2",slug:"ai-systems",number:"02",title:"AI Systems",description:"AI-powered products, automations and workflows designed around real business outcomes.",capabilities:"AI UX|Automation|Agents|Integrations",sortOrder:2,published:true},
  {id:"fallback-service-3",slug:"brand-identity",number:"03",title:"Brand & Identity",description:"Distinctive visual systems that make technology brands feel human, premium and ownable.",capabilities:"Positioning|Identity|Art direction|Design systems",sortOrder:3,published:true},
  {id:"fallback-service-4",slug:"3d-motion",number:"04",title:"3D & Motion",description:"Cinematic interfaces, motion systems and immersive visuals that give digital products a pulse.",capabilities:"Motion design|3D scenes|Creative code",sortOrder:4,published:true},
  {id:"fallback-service-5",slug:"digital-strategy",number:"05",title:"Digital Strategy",description:"Clarify what to build, why it matters and what should happen after launch.",capabilities:"Discovery|Product strategy|Content|Roadmaps",sortOrder:5,published:true}
];

const fallbackSettings = {
  id:"main",brandName:"TRANOS",tagline:"Digital / AI / Creative",heroTitle:"Ideas into Digital Reality.",
  heroDescription:"Tranos is an independent digital studio building premium experiences, intelligent systems and visual identities for ambitious teams.",
  email:"hello@tranos.studio",location:"Tehran · Remote Worldwide",footerNote:"Built for the next digital era.",
  linkedinUrl:null,instagramUrl:null,behanceUrl:null,dribbbleUrl:null,defaultLocale:"en",defaultTheme:"dark"
};

export async function getSiteSettings() {
  try { return (await getPrisma().siteSetting.findUnique({where:{id:"main"}})) ?? fallbackSettings; }
  catch { return fallbackSettings; }
}

export async function getPublicServices() {
  try { return await getPrisma().service.findMany({where:{published:true},orderBy:[{sortOrder:"asc"},{createdAt:"asc"}]}); }
  catch { return fallbackServices; }
}
