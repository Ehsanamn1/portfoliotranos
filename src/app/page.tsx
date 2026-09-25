import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import InsightCard from "@/components/insight-card";
import SelectedWork from "@/components/selected-work";
import ThreeShowcase from "@/components/three-showcase";
import { HeroVisual } from "@/app/hero-visual";
import { getLocaleFromCookie, t } from "@/lib/i18n";
import { getPublicInsights, getPublicProjects, getPublicServices, getSiteSettings } from "@/lib/public-data";

export const dynamic="force-dynamic";

const process=[
  {number:"01",title:"Discover",text:"Find the real problem, the audience and the clearest opportunity."},
  {number:"02",title:"Strategy",text:"Turn direction into a visual language, product structure and sharp point of view."},
  {number:"03",title:"Design",text:"Shape the interaction, identity and motion as one coherent system."},
  {number:"04",title:"Build",text:"Engineer, launch and keep improving what people actually use."},
  {number:"05",title:"Scale",text:"Extend the system across products, campaigns and future digital touchpoints."}
];

const stats=[{value:"06",label:"selected works"},{value:"05",label:"core capabilities"},{value:"01",label:"integrated studio"},{value:"∞",label:"ways to evolve"}];

export default async function Home(){
  const locale=await getLocaleFromCookie();const tr=(key:Parameters<typeof t>[1])=>t(locale,key);
  const [projects,insights,services,settings]=await Promise.all([getPublicProjects(6),getPublicInsights(3),getPublicServices(),getSiteSettings()]);
  const heroTitle=locale==="en"?settings.heroTitle:tr("heroTitle");
  const heroDescription=locale==="en"?settings.heroDescription:tr("heroDescription");
  return <>
    <SiteHeader/>
    <main>
      <section className="tx-hero">
        <div className="tx-shell tx-hero-grid">
          <div className="tx-hero-copy">
            <div className="tx-kicker"><span/>Digital / AI / Systems</div>
            <div className="tx-hero-index">TR — 001 / CREATIVE ENGINE</div>
            <h1>{heroTitle.split(" ").map((word,index)=><span key={index} className={index>1?"accent-word":undefined}>{word} </span>)}</h1>
            <p className="tx-hero-lede">{heroDescription}</p>
            <div className="tx-hero-actions"><a className="tx-button tx-button-gold" href="/work/">View our work <b>↗</b></a><a className="tx-button tx-button-ghost" href="/contact/">Start a project <b>↗</b></a></div>
            <div className="tx-hero-trust"><span>PRODUCT</span><i/><span>AI</span><i/><span>BRAND</span><i/><span>MOTION</span></div>
          </div>
          <HeroVisual/>
        </div>
      </section>

      <section className="tx-philosophy">
        <div className="tx-shell">
          <div className="tx-kicker tx-reveal"><span/>The point of view</div>
          <div className="tx-philosophy-title">
            <span className="tx-reveal">WE DON'T JUST</span>
            <span className="tx-reveal">BUILD WEBSITES.</span>
            <strong className="tx-reveal">WE BUILD</strong>
            <em className="tx-reveal">SYSTEMS.</em>
          </div>
          <p className="tx-philosophy-copy tx-reveal">A premium digital studio for products, identities and intelligent experiences that need a distinct point of view.</p>
        </div>
      </section>

      <section className="tx-section tx-section-work" id="work">
        <div className="tx-shell">
          <div className="tx-section-head tx-reveal"><div><div className="tx-kicker"><span/>Selected work</div><h2>Large ideas deserve<br/><em>large compositions.</em></h2></div><p>Projects are presented like editorial case studies: big visual moments, restrained type and enough space for the work to lead.</p></div>
          <SelectedWork projects={projects}/>
          <div className="tx-section-link"><a href="/work/">Explore the full portfolio <span>↗</span></a></div>
        </div>
      </section>

      <section className="tx-section tx-capabilities" id="services">
        <div className="tx-shell">
          <div className="tx-section-head tx-reveal"><div><div className="tx-kicker"><span/>Capabilities</div><h2>One studio.<br/><em>Seven directions.</em></h2></div><p>Strategy, product, AI, interaction and identity connected inside one visual system.</p></div>
          <div className="tx-capability-list">
            {services.map((service,index)=><a href="/services/" className="tx-capability-row tx-reveal" key={service.id}><span>{service.number||String(index+1).padStart(2,"0")}</span><div><h3>{service.title}</h3><p>{service.description}</p></div><b>↗</b></a>)}
          </div>
        </div>
      </section>

      <section className="tx-showcase-section">
        <div className="tx-shell">
          <div className="tx-section-head tx-reveal"><div><div className="tx-kicker"><span/>3D project showcase</div><h2>Projects can have<br/><em>their own atmosphere.</em></h2></div><p>Interactive objects and spatial previews are reserved for moments where they add meaning—not decoration for decoration's sake.</p></div>
          <ThreeShowcase/>
        </div>
      </section>

      <section className="tx-section tx-process">
        <div className="tx-shell">
          <div className="tx-section-head tx-reveal"><div><div className="tx-kicker"><span/>Process</div><h2>Discover.<br/>Design.<br/><em>Build.</em></h2></div><p>A five-step rhythm that keeps the work structured without making it predictable.</p></div>
          <div className="tx-process-editorial">{process.map(step=><article className="tx-process-editorial-item tx-reveal" key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.text}</p></article>)}</div>
        </div>
      </section>

      <section className="tx-section tx-about" id="about">
        <div className="tx-shell tx-about-grid">
          <div className="tx-about-visual tx-reveal"><div className="tx-about-orbit orbit-one"/><div className="tx-about-orbit orbit-two"/><div className="tx-about-orbit orbit-three"/><div className="tx-about-core">TR<span>.</span></div><div className="tx-about-label">TRANOS / 2026</div></div>
          <div className="tx-about-copy tx-reveal"><div className="tx-kicker"><span/>About Tranos</div><h2>Designed for brands that refuse to look generic.</h2><p>Tranos is an independent digital studio for teams who need more than another template. We build experiences where visual craft, technology and strategy reinforce each other.</p><a className="tx-inline-link" href="/about/">Read the studio story <span>↗</span></a><div className="tx-stats">{stats.map(stat=><div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}</div></div>
        </div>
      </section>

      <section className="tx-section tx-insights-section" id="insights">
        <div className="tx-shell">
          <div className="tx-section-head tx-reveal"><div><div className="tx-kicker"><span/>Insights</div><h2>Notes from the<br/><em>creative engine.</em></h2></div><p>Ideas on AI products, digital identity, systems, motion and the craft behind memorable interfaces.</p></div>
          <div className="tx-insights-grid">{insights.map((insight,index)=><InsightCard key={insight.id} insight={insight} index={index}/>)}</div>
        </div>
      </section>

      <section className="tx-cta"><div className="tx-shell tx-reveal"><div className="tx-kicker tx-kicker-center"><span/>Have a good problem?</div><h2>LET'S BUILD<br/><em>SOMETHING EXTRAORDINARY.</em></h2><p>Bring the ambition, the mess or the unfinished idea. We will turn it into a clearer digital direction.</p><a className="tx-button tx-button-gold" href="/contact/">Start a project <b>↗</b></a></div></section>
    </main>
    <SiteFooter/>
  </>;
}
