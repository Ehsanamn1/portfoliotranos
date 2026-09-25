import type { PublicProject } from "@/lib/public-data";

export default function ProjectCard({ project, index = 0 }: { project: PublicProject; index?: number }) {
  const image = project.imageUrl || `/work/${project.slug}.svg`;

  return (
    <a className="tx-project-card" href={`/work/${project.slug}/`}>
      <div
        className={`tx-project-media tx-project-media-${(index % 6) + 1}`}
        style={{
          backgroundImage:
            `linear-gradient(180deg, rgba(6,6,7,0) 30%, rgba(6,6,7,.78) 100%), url("${image}")`
        }}
      >
        <div className="tx-project-no">0{index + 1}</div>
        <div className="tx-project-arrow">↗</div>
        <div className="tx-project-overlay"><span>View case study</span><b>Open project</b></div>
      </div>

      <div className="tx-project-info">
        <div>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
        </div>
        <span>{project.category} <i /> {project.year}</span>
      </div>
    </a>
  );
}
