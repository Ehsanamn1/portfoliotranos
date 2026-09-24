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
