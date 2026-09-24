import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import CaseStudyStage from "@/components/case-study-stage";
import { getPublicProject } from "@/lib/public-data";
import { getLocaleFromCookie, t } from "@/lib/i18n";

export const dynamic="force-dynamic";

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
 const {slug}=await params;const project=await getPublicProject(slug);
 return {title:project?`${project.title} — Tranos Studio`:"Project — Tranos Studio",description:project?.description};
}
export default async function ProjectDetail({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const project=await getPublicProject(slug);if(!project)notFound();
 const locale=await getLocaleFromCookie();const tr=(key:Parameters<typeof t>[1])=>t(locale,key);
 const image=project.imageUrl||`/work/${project.slug}.svg`;
 return <><SiteHeader/><main className="tx-detail-page">
  <section className="tx-detail-hero"><div className="tx-shell"><a className="tx-back-link" href="/work/">← {tr("allWork")}</a><div className="tx-kicker"><span/>{project.category} · {project.year}</div><h1>{project.title}</h1><p>{project.description}</p></div></section>
  <section className="tx-shell">
   <CaseStudyStage title={project.title} category={project.category} imageUrl={image}/>
   <div className="tx-detail-metrics"><div><span>DISCIPLINE</span><b>{project.category}</b></div><div><span>CLIENT</span><b>{project.clientName||"Tranos Concept"}</b></div><div><span>ROLE</span><b>{project.role||"Digital Studio"}</b></div><div><span>YEAR</span><b>{project.year}</b></div></div>
   <div className="tx-detail-grid"><div><div className="tx-kicker"><span/>{locale==="fa"?"معرفی پروژه":"Project overview"}</div><h2>{project.solution||"A focused digital system built around a clear idea."}</h2></div><div className="tx-rich-copy"><p>{project.challenge||project.description}</p><p>{project.solution||"Tranos combines creative direction, interface design, engineering and intelligent technology into one coherent production process."}</p><p>{project.impact||"A stronger digital story, clearer interaction and a reusable visual system."}</p><a className="tx-button tx-button-gold" href="/contact/">{tr("startProject")} ↗</a></div></div>
   <div className="tx-case-story-grid"><div><span>01</span><h3>{locale==="fa"?"چالش":"Challenge"}</h3><p>{project.challenge||project.description}</p></div><div><span>02</span><h3>{locale==="fa"?"راه‌حل":"Solution"}</h3><p>{project.solution||"A focused digital system built around a clear idea."}</p></div><div><span>03</span><h3>{locale==="fa"?"اثر":"Impact"}</h3><p>{project.impact||"A sharper story and a more coherent product experience."}</p></div></div>
   {project.technologies?<div className="tx-tech-strip"><span>TECH / STACK</span><div>{project.technologies.split("|").map(item=><b key={item}>{item}</b>)}</div></div>:null}
   {project.galleryUrls?<div className="tx-case-gallery">{project.galleryUrls.split("|").filter(Boolean).map((url,index)=><div key={url+index} style={{backgroundImage:`url("${url}")`}}><span>TR / 0{index+1}</span></div>)}</div>:null}
  </section>
 </main><SiteFooter/></>;
}
