import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import PortfolioExplorer from "@/components/portfolio-explorer";
import { getPublicProjects } from "@/lib/public-data";
import { getLocaleFromCookie, t } from "@/lib/i18n";

export const metadata:Metadata={title:"Work — Tranos Studio",description:"Editorial portfolio of digital products, AI systems, branding and creative technology."};
export const dynamic="force-dynamic";

export default async function WorkPage(){
  const locale=await getLocaleFromCookie();
  const tr=(key:Parameters<typeof t>[1])=>t(locale,key);
  const projects=await getPublicProjects();
  return <>
    <SiteHeader/>
    <main className="tx-inner-page">
      <section className="tx-page-hero tx-work-hero"><div className="tx-shell tx-page-hero-grid">
        <div><div className="tx-kicker"><span/>{tr("selectedWork")}</div><h1>Projects with a<br/><em>point of view.</em></h1></div>
        <p>Selected digital products, identities and intelligent experiences. Search by discipline or project, then step into the full case study.</p>
      </div></section>
      <section className="tx-section"><div className="tx-shell"><PortfolioExplorer projects={projects}/></div></section>
    </main>
    <SiteFooter/>
  </>;
}