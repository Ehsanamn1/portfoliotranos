import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import CaseStudyStage from "@/components/case-study-stage";
import { getPublicProject, getPublicProjects } from "@/lib/public-data";
import { getLocaleFromCookie, t } from "@/lib/i18n";

export const dynamic="force-dynamic";

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params; const project=await getPublicProject(slug);
  return {title:project?project.title+" — Tranos Studio":"Project — Tranos Studio",description:project?.description};
}

export default async function ProjectDetail({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const [project,allProjects]=await Promise.all([getPublicProject(slug),getPublicProjects()]);
  if(!project)notFound();
  const locale=await getLocaleFromCookie(); const tr=(key:Parameters<typeof t>[1])=>t(locale,key);
  const image=project.imageUrl||"/work/"+project.slug+".svg";
  const currentIndex=allProjects.findIndex(item=>item.slug===project.slug);
  const nextProject=allProjects[(currentIndex+1)%allProjects.length]||null;
  const tech=(project.technologies||"").split("|").filter(Boolean);
  return <>
    <SiteHeader/>
    <main className="tx-detail-page">
      <section className="tx-case-hero"><div className="tx-shell tx-case-hero-grid">
        <div><a className="tx-back-link" href="/work/">← {tr("allWork")}</a><div className="tx-kicker"><span/>{project.category} · {project.year}</div><h1>{project.title}</h1><p>{project.description}</p></div>
        <div className="tx-case-hero-meta"><span>PROJECT / {String(currentIndex+1).padStart(2,"0")}</span><b>{project.clientName||"Tranos Concept"}</b></div>
      </div></section>
      <section className="tx-shell">
        <CaseStudyStage title={project.title} category={project.category} imageUrl={image}/>
        <div className="tx-detail-metrics"><div><span>DISCIPLINE</span><b>{project.category}</b></div><div><span>CLIENT</span><b>{project.clientName||"Tranos Concept"}</b></div><div><span>ROLE</span><b>{project.role||"Digital Studio"}</b></div><div><span>YEAR</span><b>{project.year}</b></div></div>
        <div className="tx-case-index-layout">
          <aside className="tx-case-index"><span>CASE STUDY / INDEX</span><a href="#overview">01 / Overview</a><a href="#challenge">02 / Challenge</a><a href="#strategy">03 / Strategy</a><a href="#design">04 / Design</a><a href="#technology">05 / Technology</a><a href="#results">06 / Results</a></aside>
          <div className="tx-case-content">
            <section id="overview" className="tx-case-section tx-case-section-lead tx-reveal"><div className="tx-kicker"><span/>01 / Overview</div><h2>{project.solution||"A focused digital system built around a clear idea."}</h2><p>{project.description}</p></section>
            <section id="challenge" className="tx-case-section tx-case-split tx-reveal"><div><span>02</span><h3>Challenge</h3></div><p>{project.challenge||project.description}</p></section>
            <section id="strategy" className="tx-case-section tx-case-split tx-reveal"><div><span>03</span><h3>Strategy</h3></div><p>{project.solution||"Build one coherent system across strategy, interface, interaction and technology."}</p></section>
            <section id="design" className="tx-case-section tx-reveal"><div className="tx-kicker"><span/>04 / Design System</div><div className="tx-design-specimen"><div className="tx-design-specimen-main"><small>{project.category}</small><strong>{project.title}</strong><i/><span>TYPE / MOTION / SYSTEMS</span></div><div className="tx-design-specimen-side"><b>01</b><b>02</b><b>03</b><b>04</b></div></div></section>
            <section id="technology" className="tx-case-section tx-reveal"><div className="tx-kicker"><span/>05 / Technology</div><div className="tx-tech-strip tx-tech-strip-large">{tech.map(item=><span key={item}>{item}</span>)}</div></section>
            <section id="results" className="tx-case-section tx-case-results tx-reveal"><div className="tx-kicker"><span/>06 / Results</div><h2>{project.impact||"A sharper story, cleaner interaction and a reusable visual system."}</h2></section>
            {project.galleryUrls?<section className="tx-case-section tx-case-gallery-wrap tx-reveal"><div className="tx-kicker"><span/>Gallery / Selected frames</div><div className="tx-case-gallery">{project.galleryUrls.split("|").filter(Boolean).map((url,index)=><div key={url+index} style={{backgroundImage:'url("'+url+'")'}}><span>TR / 0{index+1}</span></div>)}</div></section>:null}
            {nextProject?<section className="tx-next-project tx-reveal"><span>NEXT PROJECT</span><a href={"/work/"+nextProject.slug+"/"}><small>{nextProject.category} · {nextProject.year}</small><strong>{nextProject.title}</strong><b>↗</b></a></section>:null}
          </div>
        </div>
      </section>
    </main>
    <SiteFooter/>
  </>;
}