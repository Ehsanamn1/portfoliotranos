import getPrisma from "@/lib/prisma";

export type PublicProject = {
  id: string; slug: string; title: string; description: string;
  category: string; year: number; featured: boolean; imageUrl: string | null;
};
export type PublicInsight = {
  id: string; slug: string; title: string; excerpt: string;
  content: string; coverImageUrl: string | null; publishedAt: Date | null;
};

const fallbackProjects: PublicProject[]=[
  {id:"fallback-tranos-ai",slug:"tranos-ai",title:"Tranos AI",description:"AI product experience and digital platform.",category:"AI Product",year:2026,featured:true,imageUrl:null},
  {id:"fallback-brand",slug:"brand-system",title:"Brand System",description:"Identity and digital presence for a technology-first brand.",category:"Branding",year:2026,featured:false,imageUrl:null},
  {id:"fallback-atlas",slug:"atlas-commerce",title:"Atlas Commerce",description:"Commerce experience with automation at the core.",category:"E-commerce",year:2026,featured:false,imageUrl:null}
];
const fallbackInsights: PublicInsight[]=[
  {id:"fallback-ai",slug:"future-of-ai-products",title:"The Future of AI Products",excerpt:"How intelligent systems are changing digital product design.",content:"Publish the real article from the Tranos Control Center.",coverImageUrl:null,publishedAt:null},
  {id:"fallback-min",slug:"minimalism-in-web-design",title:"Minimalism in Web Design",excerpt:"Why restraint and typography can create stronger interfaces.",content:"Publish the real article from the Tranos Control Center.",coverImageUrl:null,publishedAt:null},
  {id:"fallback-brand",slug:"building-a-digital-brand",title:"Building a Digital Brand",excerpt:"Positioning, identity and systems for modern companies.",content:"Publish the real article from the Tranos Control Center.",coverImageUrl:null,publishedAt:null}
];

export async function getPublicProjects(limit?:number){
  try{
    return await getPrisma().project.findMany({
      where:{published:true},orderBy:[{featured:"desc"},{sortOrder:"asc"},{createdAt:"desc"}],take:limit,
      select:{id:true,slug:true,title:true,description:true,category:true,year:true,featured:true,imageUrl:true}
    });
  }catch{return limit?fallbackProjects.slice(0,limit):fallbackProjects;}
}
export async function getPublicProject(slug:string){
  try{return await getPrisma().project.findFirst({where:{slug,published:true},select:{id:true,slug:true,title:true,description:true,category:true,year:true,featured:true,imageUrl:true}});}
  catch{return fallbackProjects.find(x=>x.slug===slug)??null;}
}
export async function getPublicInsights(limit?:number){
  try{
    return await getPrisma().insight.findMany({
      where:{published:true},orderBy:[{publishedAt:"desc"},{createdAt:"desc"}],take:limit,
      select:{id:true,slug:true,title:true,excerpt:true,content:true,coverImageUrl:true,publishedAt:true}
    });
  }catch{return limit?fallbackInsights.slice(0,limit):fallbackInsights;}
}
export async function getPublicInsight(slug:string){
  try{return await getPrisma().insight.findFirst({where:{slug,published:true},select:{id:true,slug:true,title:true,excerpt:true,content:true,coverImageUrl:true,publishedAt:true}});}
  catch{return fallbackInsights.find(x=>x.slug===slug)??null;}
}


export type PublicService = {
  id:string; slug:string; number:string; title:string; description:string;
  capabilities:string|null; sortOrder:number; published:boolean;
};

const fallbackServices:PublicService[]=[
  {id:"fallback-service-1",slug:"digital-products",number:"01",title:"Digital Products",description:"Websites, platforms and product experiences engineered for speed, clarity and conversion.",capabilities:"UX / UI|Frontend|Backend|CMS|Cloud",sortOrder:1,published:true},
  {id:"fallback-service-2",slug:"ai-systems",number:"02",title:"AI Systems",description:"AI-powered products, automations and workflows designed around real business outcomes.",capabilities:"AI UX|Automation|Agents|Integrations",sortOrder:2,published:true},
  {id:"fallback-service-3",slug:"brand-identity",number:"03",title:"Brand & Identity",description:"Distinctive visual systems that make technology brands feel human, premium and ownable.",capabilities:"Positioning|Identity|Art direction|Design systems",sortOrder:3,published:true},
  {id:"fallback-service-4",slug:"3d-motion",number:"04",title:"3D & Motion",description:"Cinematic interfaces, motion systems and immersive visuals that give digital products a pulse.",capabilities:"Motion design|3D scenes|Creative code",sortOrder:4,published:true}
];

export async function getSiteSettings(){
  try{
    const data=await getPrisma().siteSetting.findUnique({where:{id:"main"}});
    return data ?? {
      id:"main",brandName:"TRANOS",tagline:"Digital / AI / Creative",
      heroTitle:"Ideas into Digital Reality.",
      heroDescription:"Tranos is an independent digital studio building premium experiences, intelligent systems and visual identities for ambitious teams.",
      email:"hello@tranos.studio",location:"Tehran · Remote Worldwide",
      footerNote:"Built for the next digital era.",linkedinUrl:null,instagramUrl:null,behanceUrl:null,dribbbleUrl:null,
      defaultLocale:"en",defaultTheme:"dark"
    };
  }catch{
    return {
      id:"main",brandName:"TRANOS",tagline:"Digital / AI / Creative",
      heroTitle:"Ideas into Digital Reality.",
      heroDescription:"Tranos is an independent digital studio building premium experiences, intelligent systems and visual identities for ambitious teams.",
      email:"hello@tranos.studio",location:"Tehran · Remote Worldwide",
      footerNote:"Built for the next digital era.",linkedinUrl:null,instagramUrl:null,behanceUrl:null,dribbbleUrl:null,
      defaultLocale:"en",defaultTheme:"dark"
    };
  }
}

export async function getPublicServices(){
  try{
    return await getPrisma().service.findMany({
      where:{published:true},orderBy:[{sortOrder:"asc"},{createdAt:"asc"}]
    });
  }catch{return fallbackServices;}
}
