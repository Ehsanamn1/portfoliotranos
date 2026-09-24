import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { getPublicServices } from "@/lib/public-data";
import { getLocaleFromCookie, t } from "@/lib/i18n";
export const metadata:Metadata={title:"Services — Tranos Studio",description:"Digital products, AI systems, brand identity, motion and digital strategy."};
export const dynamic="force-dynamic";
export default async function ServicesPage(){
 const locale=await getLocaleFromCookie();const tr=(key:Parameters<typeof t>[1])=>t(locale,key);const services=await getPublicServices();
 return <><SiteHeader/><main className="tx-inner-page"><section className="tx-page-hero"><div className="tx-shell tx-page-hero-grid"><div><div className="tx-kicker"><span/>{tr("capabilities")}</div><h1>{locale==="fa"?"طراحی، فناوری و هوشمندی.":locale==="es"?"Diseño, tecnología e inteligencia.":locale==="de"?"Design, Technologie und Intelligenz.":"Design, technology and intelligence."}</h1></div><p>{locale==="fa"?"یک استودیو برای کل زنجیره دیجیتال؛ از سؤال استراتژیک اول تا آخرین تعامل.":"One studio across the full digital stack—from the first strategic question to the last interaction."}</p></div></section><section className="tx-section"><div className="tx-shell"><div className="tx-service-detail-list">{services.map(x=><article key={x.id}><span className="tx-service-detail-number">{x.number}</span><div><h2>{x.title}</h2><p>{x.description}</p><div>{(x.capabilities||"").split("|").filter(Boolean).map(tag=><span key={tag}>{tag}</span>)}</div></div></article>)}</div></div></section></main><SiteFooter/></>;
}
