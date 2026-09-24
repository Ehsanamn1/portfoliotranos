import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import InsightCard from "@/components/insight-card";
import { getPublicInsights } from "@/lib/public-data";
import { getLocaleFromCookie, t } from "@/lib/i18n";
export const metadata:Metadata={title:"Insights — Tranos Studio",description:"Notes on digital products, AI, brand systems and creative technology."};
export const dynamic="force-dynamic";
export default async function InsightsPage(){
 const locale=await getLocaleFromCookie();const tr=(key:Parameters<typeof t>[1])=>t(locale,key);const insights=await getPublicInsights();
 return <><SiteHeader/><main className="tx-inner-page"><section className="tx-page-hero"><div className="tx-shell tx-page-hero-grid"><div><div className="tx-kicker"><span/>{tr("insights")}</div><h1>{locale==="fa"?"ایده‌هایی که ارزش دنبال کردن دارند.":locale==="es"?"Ideas que vale la pena seguir.":locale==="de"?"Ideen, denen es sich zu folgen lohnt.":"Ideas worth following."}</h1></div><p>{tr("insightsLead")}</p></div></section><section className="tx-section"><div className="tx-shell"><div className="tx-insights-grid">{insights.map((item,i)=><InsightCard key={item.id} insight={item} index={i}/>)}</div></div></section></main><SiteFooter/></>;
}
