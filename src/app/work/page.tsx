import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import ProjectCard from "@/components/project-card";
import { getPublicProjects } from "@/lib/public-data";

export const metadata: Metadata={title:"Work — Tranos Studio",description:"Selected digital, AI, branding and motion work from Tranos Studio."};
export const dynamic="force-dynamic";

export default async function WorkPage(){
  const projects=await getPublicProjects();
  return <><SiteHeader/><main className="tx-inner-page">
    <section className="tx-page-hero"><div className="tx-shell tx-page-hero-grid"><div><div className="tx-kicker"><span/>Selected work</div><h1>Work that gives<br/><em>ideas a shape.</em></h1></div><p>Digital products, identities and intelligent experiences created at the intersection of design, engineering and AI.</p></div></section>
    <section className="tx-section"><div className="tx-shell"><div className="tx-project-grid tx-project-grid-wide">{projects.map((p,i)=><ProjectCard key={p.id} project={p} index={i}/>)}</div></div></section>
  </main><SiteFooter/></>;
}
