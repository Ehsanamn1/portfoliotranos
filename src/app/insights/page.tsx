import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import InsightCard from "@/components/insight-card";
import { getPublicInsights } from "@/lib/public-data";

export const metadata:Metadata={title:"Insights — Tranos Studio",description:"Notes on digital products, AI, brand systems and creative technology."};
export const dynamic="force-dynamic";
export default async function InsightsPage(){
 const insights=await getPublicInsights();
 return <><SiteHeader/><main className="tx-inner-page"><section className="tx-page-hero"><div className="tx-shell tx-page-hero-grid"><div><div className="tx-kicker"><span/>Insights</div><h1>Ideas worth<br/><em>following.</em></h1></div><p>Practical notes on product design, AI, brand systems and the digital culture around them.</p></div></section><section className="tx-section"><div className="tx-shell"><div className="tx-insights-grid">{insights.map((item,i)=><InsightCard key={item.id} insight={item} index={i}/>)}</div></div></section></main><SiteFooter/></>;
}
