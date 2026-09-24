import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { getPublicInsight } from "@/lib/public-data";

export const dynamic="force-dynamic";
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
 const {slug}=await params;const insight=await getPublicInsight(slug);
 return {title:insight?`${insight.title} — Tranos Studio`:"Insight — Tranos Studio",description:insight?.excerpt};
}
export default async function InsightDetail({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const insight=await getPublicInsight(slug);if(!insight)notFound();
 const date=insight.publishedAt?new Intl.DateTimeFormat("en",{dateStyle:"long"}).format(new Date(insight.publishedAt)):"Tranos Studio";
 return <><SiteHeader/><main className="tx-detail-page"><section className="tx-detail-hero"><div className="tx-shell"><a className="tx-back-link" href="/insights/">← All insights</a><div className="tx-kicker"><span/>{date}</div><h1>{insight.title}</h1><p>{insight.excerpt}</p></div></section><section className="tx-shell"><div className="tx-detail-grid"><aside><div className="tx-kicker"><span/>Read</div><span className="tx-reading-note">Tranos Studio / Insight</span></aside><article className="tx-article">{insight.content.split(/\n{2,}/).map((paragraph,index)=><p key={index}>{paragraph}</p>)}</article></div></section></main><SiteFooter/></>;
}
