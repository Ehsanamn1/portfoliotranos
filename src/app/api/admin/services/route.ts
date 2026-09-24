import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminSession } from "@/lib/auth";
import getPrisma from "@/lib/prisma";

export const runtime="nodejs";export const dynamic="force-dynamic";
const schema=z.object({slug:z.string().trim().min(2).max(100).regex(/^[a-z0-9-]+$/),number:z.string().trim().min(1).max(10),title:z.string().trim().min(2).max(120),description:z.string().trim().min(2).max(1000),capabilities:z.string().max(600).optional(),sortOrder:z.coerce.number().int().min(0).max(1000).optional(),published:z.boolean().optional()});
async function admin(){const s=await getAdminSession();return s?.user.role==="ADMIN";}
export async function GET(){if(!(await admin()))return NextResponse.json({ok:false,error:"Unauthorized."},{status:401});try{return NextResponse.json({ok:true,data:await getPrisma().service.findMany({orderBy:[{sortOrder:"asc"},{createdAt:"asc"}]})});}catch{return NextResponse.json({ok:false,error:"Unable to load services."},{status:500});}}
export async function POST(request:Request){if(!(await admin()))return NextResponse.json({ok:false,error:"Unauthorized."},{status:401});try{
 const parsed=schema.safeParse(await request.json());if(!parsed.success)return NextResponse.json({ok:false,error:"Invalid service."},{status:400});
 const data=await getPrisma().service.create({data:{...parsed.data,capabilities:parsed.data.capabilities||null,sortOrder:parsed.data.sortOrder??0,published:parsed.data.published??true}});
 return NextResponse.json({ok:true,data},{status:201});
}catch{return NextResponse.json({ok:false,error:"Unable to create service."},{status:500});}}
