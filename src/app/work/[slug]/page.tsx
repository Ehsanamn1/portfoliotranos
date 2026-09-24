import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { getPublicProject } from "@/lib/public-data";

export const dynamic="force-dynamic";
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;const project=await getPublicProject(slug);
  return {title:project?`${project.title} — Tranos Studio`:"Project — Tranos Studio",description:project?.description};
}
export default async function ProjectDetail({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;const project=await getPublicProject(slug);if(!project)notFound();
  const style=project.imageUrl?{backgroundImage:`linear-gradient(180deg,rgba(0,0,0,.12),rgba(0,0,0,.65)),url("${project.imageUrl}")`}:undefined;
  return <><SiteHeader/><main className="tx-detail-page">
    <section className="tx-detail-hero"><div className="tx-shell"><a className="tx-back-link" href="/work/">← All work</a><div className="tx-kicker"><span/>{project.category} · {project.year}</div><h1>{project.title}</h1><p>{project.description}</p></div></section>
    <section className="tx-shell"><div className="tx-detail-visual tx-project-media-2" style={style}><span>TR / CASE STUDY</span></div>
      <div className="tx-detail-grid"><div><div className="tx-kicker"><span/>Project overview</div><h2>A focused digital system built around a clear idea.</h2></div><div className="tx-rich-copy"><p>{project.description}</p><p>Tranos combines creative direction, interface design, engineering and intelligent technology into one coherent production process.</p><a className="tx-button tx-button-gold" href="/contact/">Discuss a similar project ↗</a></div></div>
    </section>
  </main><SiteFooter/></>;
}
