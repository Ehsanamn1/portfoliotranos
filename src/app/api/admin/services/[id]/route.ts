import { NextResponse } from "next/server";
import { z } from "zod";
import { getAdminSession } from "@/lib/auth";
import getPrisma from "@/lib/prisma";

export const runtime="nodejs";export const dynamic="force-dynamic";
const schema=z.object({slug:z.string().trim().min(2).max(100).regex(/^[a-z0-9-]+$/).optional(),number:z.string().trim().min(1).max(10).optional(),title:z.string().trim().min(2).max(120).optional(),description:z.string().trim().min(2).max(1000).optional(),capabilities:z.string().max(600).nullable().optional(),sortOrder:z.coerce.number().int().min(0).max(1000).optional(),published:z.boolean().optional()});
async function admin(){const s=await getAdminSession();return s?.user.role==="ADMIN";}
export async function PATCH(request:Request,{params}:{params:Promise<{id:string}>}){if(!(await admin()))return NextResponse.json({ok:false,error:"Unauthorized."},{status:401});try{const parsed=schema.safeParse(await request.json());if(!parsed.success)return NextResponse.json({ok:false,error:"Invalid service."},{status:400});const {id}=await params;const data=await getPrisma().service.update({where:{id},data:parsed.data});return NextResponse.json({ok:true,data});}catch{return NextResponse.json({ok:false,error:"Unable to update service."},{status:500});}}
export async function DELETE(_:Request,{params}:{params:Promise<{id:string}>}){if(!(await admin()))return NextResponse.json({ok:false,error:"Unauthorized."},{status:401});try{const {id}=await params;await getPrisma().service.delete({where:{id}});return NextResponse.json({ok:true});}catch{return NextResponse.json({ok:false,error:"Unable to delete service."},{status:500});}}
