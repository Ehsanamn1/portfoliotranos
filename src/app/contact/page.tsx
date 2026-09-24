import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import ContactForm from "@/components/contact-form";

export const metadata:Metadata={title:"Contact — Tranos Studio",description:"Start a project with Tranos Studio."};
export default function ContactPage(){
 return <><SiteHeader/><main className="tx-inner-page"><section className="tx-page-hero"><div className="tx-shell tx-page-hero-grid"><div><div className="tx-kicker"><span/>Contact</div><h1>Tell us what you&apos;re<br/><em>building next.</em></h1></div><div className="tx-contact-meta"><span>hello@tranos.studio</span><span>Tehran · Remote Worldwide</span></div></div></section>
 <section className="tx-section"><div className="tx-shell tx-contact-layout"><div><div className="tx-kicker"><span/>Project inquiry</div><h2>A good brief<br/>starts here.</h2><p>Share the problem, product or ambition. You do not need the perfect brief—we can shape it together.</p></div><ContactForm/></div></section></main><SiteFooter/></>;
}
