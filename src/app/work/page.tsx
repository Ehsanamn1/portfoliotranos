import type { Metadata } from "next";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import ProjectCard from "@/components/project-card";
import { getPublicProjects } from "@/lib/public-data";
import { getLocaleFromCookie, t } from "@/lib/i18n";
export const metadata:Metadata={title:"Work — Tranos Studio",description:"Selected digital, AI, branding and motion work from Tranos Studio."};
export const dynamic="force-dynamic";
export default async function WorkPage(){
 const locale=await getLocaleFromCookie();const tr=(key:Parameters<typeof t>[1])=>t(locale,key);const projects=await getPublicProjects();
 return <><SiteHeader/><main className="tx-inner-page"><section className="tx-page-hero"><div className="tx-shell tx-page-hero-grid"><div><div className="tx-kicker"><span/>{tr("selectedWork")}</div><h1>{locale==="fa"?"کارهایی که به ایده‌ها شکل می‌دهند.":locale==="es"?"Proyectos que dan forma a las ideas.":locale==="de"?"Arbeiten, die Ideen Gestalt geben.":"Work that gives ideas a shape."}</h1></div><p>{locale==="fa"?"محصولات دیجیتال، هویت‌ها و تجربه‌های هوشمندی که در نقطه تلاقی طراحی، مهندسی و هوش مصنوعی ساخته شده‌اند.":"Digital products, identities and intelligent experiences created at the intersection of design, engineering and AI."}</p></div></section><section className="tx-section"><div className="tx-shell"><div className="tx-project-grid tx-project-grid-wide">{projects.map((p,i)=><ProjectCard key={p.id} project={p} index={i}/>)}</div></div></section></main><SiteFooter/></>;
}
