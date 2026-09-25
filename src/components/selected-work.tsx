import type { PublicProject } from "@/lib/public-data";

function ProjectImage({ project, index }: { project: PublicProject; index: number }) {
  const image = project.imageUrl || "/work/" + project.slug + ".svg";
  return (
    <div className={"tx-editorial-image tx-editorial-image-" + ((index % 4) + 1)} style={{ backgroundImage: "url(\"" + image + "\")" }}>
      <div className="tx-editorial-image-shine" />
      <div className="tx-editorial-image-label">TR / 0{index + 1}</div>
      <div className="tx-editorial-image-arrow">↗</div>
    </div>
  );
}

export default function SelectedWork({ projects }: { projects: PublicProject[] }) {
  return (
    <div className="tx-editorial-work">
      {projects.map((project, index) => (
        <article className={"tx-editorial-project tx-reveal " + (index % 2 === 0 ? "tx-editorial-project-left" : "tx-editorial-project-right")} key={project.id}>
          <div className="tx-editorial-project-meta">
            <span>0{index + 1}</span>
            <div><b>{project.category}</b><small>{project.year}</small></div>
          </div>
          <a href={"/work/" + project.slug + "/"} className="tx-editorial-project-main">
            <ProjectImage project={project} index={index} />
            <div className="tx-editorial-project-copy">
              <div><h3>{project.title}</h3><p>{project.description}</p></div>
              <span>View case study <b>↗</b></span>
            </div>
          </a>
        </article>
      ))}
    </div>
  );
}
