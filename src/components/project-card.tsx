"use client";

import { PointerEvent, useRef } from "react";
import type { PublicProject } from "@/lib/public-data";

export default function ProjectCard({ project, index = 0 }: { project: PublicProject; index?: number }) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const image = project.imageUrl || `/work/${project.slug}.svg`;

  function move(event: PointerEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--px", `${x * 10}px`);
    el.style.setProperty("--py", `${y * 8}px`);
    el.style.setProperty("--rx", `${y * -1.8}deg`);
    el.style.setProperty("--ry", `${x * 2.2}deg`);
  }

  function leave() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--px", "0px");
    el.style.setProperty("--py", "0px");
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }

  return (
    <a className="tx-project-card tx-reveal" href={`/work/${project.slug}/`} ref={ref} onPointerMove={move} onPointerLeave={leave}>
      <div
        className={`tx-project-media tx-project-media-${(index % 6) + 1}`}
        style={{ backgroundImage: `linear-gradient(180deg, rgba(6,6,7,.02) 25%, rgba(6,6,7,.82) 100%), url("${image}")` }}
      >
        <div className="tx-project-image-glass" />
        <div className="tx-project-no">0{index + 1}</div>
        <div className="tx-project-arrow">↗</div>
        <div className="tx-project-overlay"><span>View case study</span><b>Open project</b></div>
      </div>
      <div className="tx-project-info">
        <div><h3>{project.title}</h3><p>{project.description}</p></div>
        <span>{project.category} <i /> {project.year}</span>
      </div>
    </a>
  );
}
