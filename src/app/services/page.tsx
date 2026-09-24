import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

export const metadata:Metadata={title:"Services — Tranos Studio",description:"Digital products, AI systems, brand identity, motion and digital strategy."};
const services=[
["01","Digital Products","Design and engineering for high-performance websites, platforms and product experiences.",["UX / UI","Frontend","Backend","CMS","Cloud"]],
["02","AI Systems","Turn AI from a feature into a useful part of the product and the workflow around it.",["AI UX","Automation","Agents","Integrations","Data workflows"]],
["03","Brand & Identity","Build a distinctive system that can scale from a first impression to a full digital ecosystem.",["Positioning","Identity","Art direction","Design systems","Launch assets"]],
["04","3D & Motion","Add depth, motion and cinematic storytelling without sacrificing speed or usability.",["Motion design","3D scenes","Interactive visuals","Prototyping","Creative code"]],
["05","Digital Strategy","Clarify what to build, why it matters and what needs to happen after launch.",["Discovery","Product strategy","Content","Roadmaps","Optimization"]]
];
export default function ServicesPage(){
 return <><SiteHeader/><main className="tx-inner-page"><section className="tx-page-hero"><div className="tx-shell tx-page-hero-grid"><div><div className="tx-kicker"><span/>Capabilities</div><h1>Design, technology<br/><em>and intelligence.</em></h1></div><p>One studio across the full digital stack—from the first strategic question to the last interaction.</p></div></section>
 <section className="tx-section"><div className="tx-shell"><div className="tx-service-detail-list">{services.map(([number,title,description,tags])=><article key={number}><span className="tx-service-detail-number">{number}</span><div><h2>{title}</h2><p>{description}</p><div>{(tags as string[]).map(tag=><span key={tag}>{tag}</span>)}</div></div></article>)}</div></div></section></main><SiteFooter/></>;
}
