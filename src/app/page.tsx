import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import ProjectCard from "@/components/project-card";
import InsightCard from "@/components/insight-card";
import { HeroVisual } from "@/app/hero-visual";
import { getPublicInsights, getPublicProjects } from "@/lib/public-data";

export const dynamic="force-dynamic";

const services=[
  ["01","Digital Products","Websites, platforms and product experiences engineered for speed, clarity and conversion."],
  ["02","AI Systems","AI-powered products, automations and workflows designed around real business outcomes."],
  ["03","Brand & Identity","Distinctive visual systems that make technology brands feel human, premium and ownable."],
  ["04","3D & Motion","Cinematic interfaces, motion systems and immersive visuals that give digital products a pulse."]
];
const process=[
  ["01","Discover","We define the opportunity, audience and objective before touching pixels."],
  ["02","Shape","Strategy, art direction and interaction design become one focused experience."],
  ["03","Build","Design and engineering move together into a resilient production system."],
  ["04","Evolve","Launch is the beginning: measure, refine and keep the experience moving."]
];

export default async function Home(){
  const [projects,insights]=await Promise.all([getPublicProjects(6),getPublicInsights(3)]);
  return <>
    <SiteHeader/>
    <main>
      <section className="tx-hero"><div className="tx-shell tx-hero-grid">
        <div className="tx-hero-copy">
          <div className="tx-kicker"><span/>Digital / AI / Creative</div>
          <div className="tx-hero-index">TR — 001 / CREATIVE ENGINE</div>
          <h1>Ideas into <em>Digital Reality.</em></h1>
          <p className="tx-hero-lede">Tranos is an independent digital studio building premium experiences, intelligent systems and visual identities for ambitious teams.</p>
          <div className="tx-hero-actions"><a className="tx-button tx-button-gold" href="/work/">Explore selected work ↗</a><a className="tx-button tx-button-ghost" href="/contact/">Start a project</a></div>
          <div className="tx-hero-trust"><span>AI PRODUCTS</span><i/><span>DIGITAL EXPERIENCES</span><i/><span>CREATIVE TECHNOLOGY</span></div>
        </div>
        <HeroVisual/>
      </div></section>

      <section className="tx-marquee"><div>STRATEGY <span>×</span> DESIGN <span>×</span> ENGINEERING <span>×</span> AI <span>×</span> MOTION <span>×</span> BRAND <span>×</span> STRATEGY <span>×</span> DESIGN <span>×</span> AI</div></section>

      <section className="tx-section" id="work"><div className="tx-shell">
        <div className="tx-section-head"><div><div className="tx-kicker"><span/>Selected work</div><h2>Built to <em>stand out.</em></h2></div><p>We design the kind of digital work that can carry a brand, launch a product and create a lasting first impression.</p></div>
        <div className="tx-project-grid">{projects.map((project,index)=><ProjectCard key={project.id} project={project} index={index}/>)}</div>
        <div className="tx-section-link"><a href="/work/">See all work <span>↗</span></a></div>
      </div></section>

      <section className="tx-section tx-services" id="services"><div className="tx-shell">
        <div className="tx-section-head"><div><div className="tx-kicker"><span/>Capabilities</div><h2>One studio.<br/><em>Many disciplines.</em></h2></div><p>Tranos connects creative direction, product thinking and engineering so the experience feels like one system—not a collection of disconnected deliverables.</p></div>
        <div className="tx-service-grid">{services.map(([number,title,description])=><article key={number} className="tx-service-card"><span>{number}</span><h3>{title}</h3><p>{description}</p><a href="/services/">Explore <small>↗</small></a></article>)}</div>
      </div></section>

      <section className="tx-story-section"><div className="tx-shell tx-story-grid">
        <div className="tx-story-art"><div className="tx-story-art-inner"><span>TR</span><b>04:12</b></div></div>
        <div className="tx-story-copy"><div className="tx-kicker"><span/>The Tranos approach</div><h2>Make it feel<br/><em>inevitable.</em></h2><p>Good digital work is not about adding more. It is about removing the friction between an idea and the moment someone feels it.</p><a className="tx-inline-link" href="/about/">Why Tranos exists <span>↗</span></a></div>
      </div></section>

      <section className="tx-section tx-process"><div className="tx-shell"><div className="tx-kicker"><span/>Process</div><div className="tx-process-grid">{process.map(([number,title,description])=><article key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div></div></section>

      <section className="tx-section" id="insights"><div className="tx-shell">
        <div className="tx-section-head"><div><div className="tx-kicker"><span/>Insights</div><h2>What we&apos;re <em>thinking.</em></h2></div><p>Notes on digital products, AI, brand systems and the ideas shaping how people experience technology.</p></div>
        <div className="tx-insights-grid">{insights.map((insight,index)=><InsightCard key={insight.id} insight={insight} index={index}/>)}</div>
        <div className="tx-section-link"><a href="/insights/">Read all insights <span>↗</span></a></div>
      </div></section>

      <section className="tx-cta"><div className="tx-shell tx-cta-inner"><div className="tx-kicker"><span/>Your next move</div><h2>Let&apos;s build the<br/><em>next version.</em></h2><p>Have a product, brand or digital problem worth solving? Bring the ambition. We&apos;ll bring the system.</p><a className="tx-button tx-button-gold" href="/contact/">Start a project ↗</a></div></section>
    </main>
    <SiteFooter/>
  </>;
}
