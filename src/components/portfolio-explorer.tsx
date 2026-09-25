"use client";

import { useMemo, useState } from "react";
import type { PublicProject } from "@/lib/public-data";

const normalize=(value:string)=>value.toLowerCase().trim();

export default function PortfolioExplorer({ projects }: { projects: PublicProject[] }) {
  const [query,setQuery]=useState("");
  const [category,setCategory]=useState("All");
  const categories=useMemo(()=>["All",...Array.from(new Set(projects.map(project=>project.category)))],[projects]);
  const filtered=useMemo(()=>{
    const q=normalize(query);
    return projects.filter(project=>{
      const categoryMatch=category==="All"||project.category===category;
      const queryMatch=!q||[project.title,project.category,project.description,project.clientName||""].some(value=>normalize(value).includes(q));
      return categoryMatch&&queryMatch;
    });
  },[category,query,projects]);

  return (
    <div className="tx-portfolio-explorer">
      <div className="tx-portfolio-tools">
        <div className="tx-filter-row">{categories.map(item=><button type="button" key={item} onClick={()=>setCategory(item)} className={category===item?"is-active":""}>{item}</button>)}</div>
        <label className="tx-portfolio-search"><span>Search work</span><input value={query} onChange={event=>setQuery(event.target.value)} placeholder="Project, discipline, client..." /><b>⌕</b></label>
      </div>
      <div className="tx-portfolio-list">
        {filtered.map((project,index)=>{
          const image=project.imageUrl||"/work/"+project.slug+".svg";
          return (
            <a className="tx-portfolio-row tx-reveal" key={project.id} href={"/work/"+project.slug+"/"}>
              <span className="tx-portfolio-index">{String(index+1).padStart(2,"0")}</span>
              <div className="tx-portfolio-thumb" style={{backgroundImage:'url("' + image + '")'}} />
              <div className="tx-portfolio-row-copy"><small>{project.category} · {project.year}</small><h2>{project.title}</h2><p>{project.description}</p></div>
              <span className="tx-portfolio-open">OPEN <b>↗</b></span>
            </a>
          );
        })}
      </div>
      {!filtered.length&&<div className="tx-portfolio-empty">No projects match this filter yet.</div>}
    </div>
  );
}
