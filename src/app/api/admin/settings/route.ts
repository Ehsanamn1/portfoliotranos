import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminSession } from "@/lib/auth";
import getPrisma from "@/lib/prisma";

export const runtime="nodejs";export const dynamic="force-dynamic";
const schema=z.object({
 brandName:z.string().trim().min(2).max(40),tagline:z.string().trim().min(2).max(120),
 heroTitle:z.string().trim().min(2).max(180),heroDescription:z.string().trim().min(2).max(1000),
 email:z.email(),location:z.string().trim().min(2).max(160),footerNote:z.string().trim().min(2).max(240),
 linkedinUrl:z.url().or(z.literal("")).optional(),instagramUrl:z.url().or(z.literal("")).optional(),
 behanceUrl:z.url().or(z.literal("")).optional(),dribbbleUrl:z.url().or(z.literal("")).optional(),
 defaultLocale:z.enum(["en","fa","es","de"]),defaultTheme:z.enum(["dark","light"])
});
async function admin(){const s=await getAdminSession();return s?.user.role==="ADMIN";}
export async function GET(){if(!(await admin()))return NextResponse.json({ok:false,error:"Unauthorized."},{status:401});try{
 const prisma=getPrisma();const data=await prisma.siteSetting.findUnique({where:{id:"main"}});return NextResponse.json({ok:true,data});
}catch{return NextResponse.json({ok:false,error:"Unable to load settings."},{status:500});}}
export async function PATCH(request:Request){if(!(await admin()))return NextResponse.json({ok:false,error:"Unauthorized."},{status:401});try{
 const parsed=schema.safeParse(await request.json());if(!parsed.success)return NextResponse.json({ok:false,error:"Invalid settings."},{status:400});
 const data=await getPrisma().siteSetting.upsert({where:{id:"main"},create:{id:"main",...parsed.data,linkedinUrl:parsed.data.linkedinUrl||null,instagramUrl:parsed.data.instagramUrl||null,behanceUrl:parsed.data.behanceUrl||null,dribbbleUrl:parsed.data.dribbbleUrl||null},update:{...parsed.data,linkedinUrl:parsed.data.linkedinUrl||null,instagramUrl:parsed.data.instagramUrl||null,behanceUrl:parsed.data.behanceUrl||null,dribbbleUrl:parsed.data.dribbbleUrl||null}});
 return NextResponse.json({ok:true,data});
}catch{return NextResponse.json({ok:false,error:"Unable to update settings."},{status:500});}}
