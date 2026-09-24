import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import ContactForm from "@/components/contact-form";
import { getLocaleFromCookie, t } from "@/lib/i18n";
import { getSiteSettings } from "@/lib/public-data";
export const metadata:Metadata={title:"Contact — Tranos Studio",description:"Start a project with Tranos Studio."};
export const dynamic="force-dynamic";
export default async function ContactPage(){
 const locale=await getLocaleFromCookie();const tr=(key:Parameters<typeof t>[1])=>t(locale,key);const settings=await getSiteSettings();
 return <><SiteHeader/><main className="tx-inner-page"><section className="tx-page-hero"><div className="tx-shell tx-page-hero-grid"><div><div className="tx-kicker"><span/>{tr("contact")}</div><h1>{locale==="fa"?"به ما بگویید بعد چه چیزی می‌سازید.":locale==="es"?"Cuéntanos qué vas a construir.":locale==="de"?"Erzähl uns, was du als Nächstes baust.":"Tell us what you're building next."}</h1></div><div className="tx-contact-meta"><span>{settings.email}</span><span>{settings.location}</span></div></div></section><section className="tx-section"><div className="tx-shell tx-contact-layout"><div><div className="tx-kicker"><span/>{tr("projectInquiry")}</div><h2>{locale==="fa"?"یک بریف خوب از اینجا شروع می‌شود.":"A good brief starts here."}</h2><p>{tr("heroDescription")}</p></div><ContactForm/></div></section></main><SiteFooter/></>;
}
