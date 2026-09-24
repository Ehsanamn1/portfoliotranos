import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import ProjectCard from "@/components/project-card";
import InsightCard from "@/components/insight-card";
import { HeroVisual } from "@/app/hero-visual";
import { getLocaleFromCookie, t } from "@/lib/i18n";
import { getPublicInsights, getPublicProjects, getPublicServices, getSiteSettings } from "@/lib/public-data";

export const dynamic="force-dynamic";

const process=[["01","Discover"],["02","Shape"],["03","Build"],["04","Evolve"]];

export default async function Home(){
 const locale=await getLocaleFromCookie();
 const tr=<K extends keyof typeof import("@/lib/i18n").translations>(k:K)=>t(locale,k as any);
 const [projects,insights,services,settings]=await Promise.all([getPublicProjects(6),getPublicInsights(3),getPublicServices(),getSiteSettings()]);
 const heroTitle=locale==="en"?settings.heroTitle:tr("heroTitle");
 const heroDescription=locale==="en"?settings.heroDescription:tr("heroDescription");
 return <>
  <SiteHeader/>
  <main>
   <section className="tx-hero"><div className="tx-shell tx-hero-grid">
    <div className="tx-hero-copy">
     <div className="tx-kicker"><span/>{settings.tagline}</div><div className="tx-hero-index">TR — 001 / CREATIVE ENGINE</div>
     <h1>{heroTitle}</h1><p className="tx-hero-lede">{heroDescription}</p>
     <div className="tx-hero-actions"><a className="tx-button tx-button-gold" href="/work/">{tr("exploreWork")} ↗</a><a className="tx-button tx-button-ghost" href="/contact/">{tr("startProject")}</a></div>
     <div className="tx-hero-trust"><span>AI PRODUCTS</span><i/><span>DIGITAL EXPERIENCES</span><i/><span>CREATIVE TECHNOLOGY</span></div>
    </div>
    <HeroVisual/>
   </div></section>

   <section className="tx-marquee"><div>STRATEGY <span>×</span> DESIGN <span>×</span> ENGINEERING <span>×</span> AI <span>×</span> MOTION <span>×</span> BRAND <span>×</span> STRATEGY <span>×</span> DESIGN <span>×</span> AI</div></section>

   <section className="tx-section" id="work"><div className="tx-shell">
    <div className="tx-section-head"><div><div className="tx-kicker"><span/>{tr("selectedWork")}</div><h2>{tr("builtToStandOut")}</h2></div><p>{locale==="en"?"Digital products, identities and intelligent experiences created at the intersection of design, engineering and AI.":"Digital products, identities and intelligent experiences created at the intersection of design, engineering and AI."}</p></div>
    <div className="tx-project-grid">{projects.map((p,i)=><ProjectCard key={p.id} project={p} index={i}/>)}</div>
    <div className="tx-section-link"><a href="/work/">{tr("allWork")} <span>↗</span></a></div>
   </div></section>

   <section className="tx-section tx-services" id="services"><div className="tx-shell">
    <div className="tx-section-head"><div><div className="tx-kicker"><span/>{tr("capabilities")}</div><h2>{tr("oneStudio")}<br/><em>{tr("manyDisciplines")}</em></h2></div><p>Tranos connects creative direction, product thinking and engineering so the experience feels like one system—not a collection of disconnected deliverables.</p></div>
    <div className="tx-service-grid">{services.map((service)=><article key={service.id} className="tx-service-card"><span>{service.number}</span><h3>{service.title}</h3><p>{service.description}</p><a href="/services/">{tr("services")} <small>↗</small></a></article>)}</div>
   </div></section>

   <section className="tx-story-section"><div className="tx-shell tx-story-grid">
    <div className="tx-story-art"><div className="tx-story-art-inner"><span>TR</span><b>04:12</b></div></div>
    <div className="tx-story-copy"><div className="tx-kicker"><span/>{tr("aboutTranos")}</div><h2>{tr("storyTitle")}</h2><p>{tr("storyLead")}</p><a className="tx-inline-link" href="/about/">{tr("about")} <span>↗</span></a></div>
   </div></section>

   <section className="tx-section tx-process"><div className="tx-shell"><div className="tx-kicker"><span/>{tr("process")}</div><div className="tx-process-grid">{process.map(([n,title])=><article key={n}><span>{n}</span><h3>{title}</h3><p>{locale==="fa"?"از کشف تا اجرا، یک مسیر یکپارچه می‌سازیم.":"One continuous path from the first question to the shipped experience."}</p></article>)}</div></div></section>

   <section className="tx-section" id="insights"><div className="tx-shell">
    <div className="tx-section-head"><div><div className="tx-kicker"><span/>{tr("insights")}</div><h2>{tr("whatThinking")}</h2></div><p>{tr("insightsLead")}</p></div>
    <div className="tx-insights-grid">{insights.map((insight,index)=><InsightCard key={insight.id} insight={insight} index={index}/>)}</div>
    <div className="tx-section-link"><a href="/insights/">{tr("allInsights")} <span>↗</span></a></div>
   </div></section>

   <section className="tx-cta"><div className="tx-shell tx-cta-inner"><div className="tx-kicker"><span/>{tr("talk")}</div><h2>{tr("nextVersion")}</h2><p>{tr("heroDescription")}</p><a className="tx-button tx-button-gold" href="/contact/">{tr("startProject")} ↗</a></div></section>
  </main>
  <SiteFooter/>
 </>;
}
