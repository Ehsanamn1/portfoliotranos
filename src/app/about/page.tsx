import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export const metadata:Metadata={title:"About — Tranos Studio",description:"Tranos is a digital and AI creative studio built around clarity, craft and technology."};

export default function AboutPage(){
 return <><SiteHeader/><main className="tx-inner-page">
  <section className="tx-page-hero"><div className="tx-shell tx-page-hero-grid"><div><div className="tx-kicker"><span/>About Tranos</div><h1>A studio for the<br/><em>next digital era.</em></h1></div><p>We bring strategy, design, engineering, AI and motion into the same room—and make them feel like one language.</p></div></section>
  <section className="tx-section"><div className="tx-shell tx-about-layout"><div className="tx-about-statement"><span>01 / Philosophy</span><h2>Clarity is a creative advantage.</h2></div><div className="tx-rich-copy"><p>Tranos exists for teams that do not want another template, another generic dashboard or another brand that looks like everyone else.</p><p>We build digital work with a point of view: calm when it should be calm, expressive when it should be expressive, and always grounded in a real objective.</p><p>Our stack is modern by default, but technology is never the headline. The headline is the experience people remember.</p></div></div></section>
  <section className="tx-dark-band"><div className="tx-shell tx-values-grid">{[["01","Precision","Every detail earns its place."],["02","Curiosity","We explore until the idea gets interesting."],["03","Systems","Strong work should scale, not collapse."],["04","Momentum","Launch fast enough to learn."]].map(([n,t,d])=><div key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></div>)}</div></section>
 </main><SiteFooter/></>;
}
