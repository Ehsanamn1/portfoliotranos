import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { getPublicInsight } from "@/lib/public-data";
import { getLocaleFromCookie, t } from "@/lib/i18n";

export const dynamic="force-dynamic";
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
 const {slug}=await params;const insight=await getPublicInsight(slug);
 return {title:insight?`${insight.title} — Tranos Studio`:"Insight — Tranos Studio",description:insight?.excerpt};
}
export default async function InsightDetail({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const insight=await getPublicInsight(slug);if(!insight)notFound();
 const locale=await getLocaleFromCookie();const tr=(key:Parameters<typeof t>[1])=>t(locale,key);
 const date=insight.publishedAt?new Intl.DateTimeFormat("en",{dateStyle:"long"}).format(new Date(insight.publishedAt)):"Tranos Studio";
 return <><SiteHeader/><main className="tx-detail-page"><section className="tx-detail-hero"><div className="tx-shell"><a className="tx-back-link" href="/insights/">← {tr("allInsights")}</a><div className="tx-kicker"><span/>{date}</div><h1>{insight.title}</h1><p>{insight.excerpt}</p></div></section><section className="tx-shell"><div className="tx-insight-cover" style={{backgroundImage:`linear-gradient(180deg,rgba(0,0,0,.04),rgba(0,0,0,.68)),url("${insight.coverImageUrl||"/insights/ai-products.svg"}")`}}></div><div className="tx-detail-grid"><aside><div className="tx-kicker"><span/>{tr("read")}</div><span className="tx-reading-note">Tranos Studio / Insight</span></aside><article className="tx-article">{insight.content.split(/\n{2,}/).map((paragraph,index)=><p key={index}>{paragraph}</p>)}</article></div></section></main><SiteFooter/></>;
}
