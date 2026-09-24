import type { PublicProject } from "@/lib/public-data";

export default function ProjectCard({project,index=0}:{project:PublicProject;index?:number}){
 const image=project.imageUrl||`/work/${project.slug}.svg`;
 const style={backgroundImage:`linear-gradient(180deg,rgba(0,0,0,.02),rgba(0,0,0,.58)),url("${image}")`};
 return <a className="tx-project-card" href={`/work/${project.slug}/`}>
  <div className={`tx-project-media tx-project-media-${(index%4)+1}`} style={style}><div className="tx-project-shine"/><span className="tx-project-number">{String(index+1).padStart(2,"0")}</span><span className="tx-project-open">View case ↗</span></div>
  <div className="tx-project-info"><div><h3>{project.title}</h3><p>{project.description}</p></div><span>{project.category} · {project.year}</span></div>
 </a>;
}
