import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import ProjectCard from "@/components/project-card";
import InsightCard from "@/components/insight-card";
import { HeroVisual } from "@/app/hero-visual";
import { getLocaleFromCookie, t } from "@/lib/i18n";
import { getPublicInsights, getPublicProjects, getPublicServices, getSiteSettings } from "@/lib/public-data";

export const dynamic = "force-dynamic";

const process = [
  { number: "01", title: "Discover", text: "Find the real problem, the real audience and the clearest opportunity." },
  { number: "02", title: "Shape", text: "Turn strategy into a visual language, product structure and sharp direction." },
  { number: "03", title: "Build", text: "Design and engineer the experience as one connected system." },
  { number: "04", title: "Evolve", text: "Launch, learn and keep improving what people actually use." }
];

const stats = [
  { value: "06", label: "selected case studies" },
  { value: "05", label: "core capabilities" },
  { value: "01", label: "integrated studio" },
  { value: "∞", label: "ways to iterate" }
];

export default async function Home() {
  const locale = await getLocaleFromCookie();
  const tr = (key: Parameters<typeof t>[1]) => t(locale, key);
  const [projects, insights, services, settings] = await Promise.all([
    getPublicProjects(6),
    getPublicInsights(3),
    getPublicServices(),
    getSiteSettings()
  ]);

  const heroTitle =
    locale === "en"
      ? settings.heroTitle
      : tr("heroTitle");

  const heroDescription =
    locale === "en"
      ? settings.heroDescription
      : tr("heroDescription");

  return (
    <>
      <SiteHeader />
      <main className="tx-home">
        <section className="tx-hero">
          <div className="tx-shell tx-hero-grid">
            <div className="tx-hero-copy">
              <div className="tx-kicker"><span />Independent digital studio / 2026</div>
              <div className="tx-hero-index">TR — 001 / CREATIVE ENGINE</div>

              <h1>
                {heroTitle.split(" ").map((word, index) => (
                  <span key={index} className={index > 1 ? "accent-word" : undefined}>
                    {word}{" "}
                  </span>
                ))}
              </h1>

              <p className="tx-hero-lede">{heroDescription}</p>

              <div className="tx-hero-actions">
                <a className="tx-button tx-button-gold" href="/work/">Explore the work <b>↗</b></a>
                <a className="tx-button tx-button-ghost" href="/contact/">Start a project <b>↗</b></a>
              </div>

              <div className="tx-hero-trust">
                <span>AI SYSTEMS</span><i />
                <span>DIGITAL PRODUCTS</span><i />
                <span>BRAND + MOTION</span>
              </div>

              <a className="tx-scroll-cue" href="#work" aria-label="Scroll to selected work">
                <span>Scroll to explore</span><b>↓</b>
              </a>
            </div>

            <HeroVisual />
          </div>
        </section>

        <section className="tx-marquee" aria-label="Tranos capabilities">
          <div>
            DESIGN <b>×</b> ENGINEERING <b>×</b> AI <b>×</b> MOTION <b>×</b> BRAND <b>×</b> STRATEGY
            <b>×</b> DESIGN <b>×</b> ENGINEERING <b>×</b> AI <b>×</b> MOTION
          </div>
        </section>

        <section className="tx-section tx-section-work" id="work">
          <div className="tx-shell">
            <div className="tx-section-head">
              <div>
                <div className="tx-kicker"><span />Selected work</div>
                <h2>Work with a point of view.</h2>
              </div>
              <p>
                Digital products, intelligent systems and visual identities built to make the
                right idea feel obvious.
              </p>
            </div>

            <div className="tx-project-grid">
              {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>

            <div className="tx-section-link">
              <a href="/work/">View all work <span>↗</span></a>
            </div>
          </div>
        </section>

        <section className="tx-section tx-capabilities" id="services">
          <div className="tx-shell">
            <div className="tx-section-head">
              <div>
                <div className="tx-kicker"><span />Capabilities</div>
                <h2>One studio.<br /><em>Many disciplines.</em></h2>
              </div>
              <p>
                Tranos connects strategy, design, creative technology and engineering so every
                layer speaks the same visual language.
              </p>
            </div>

            <div className="tx-service-grid">
              {services.map((service, index) => (
                <a className="tx-service-card" key={service.id} href="/services/">
                  <div className="tx-service-top">
                    <span>{service.number || String(index + 1).padStart(2, "0")}</span>
                    <b>↗</b>
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <div className="tx-service-tags">
                    {(service.capabilities || "")
                      .split("|")
                      .filter(Boolean)
                      .slice(0, 4)
                      .map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="tx-manifesto">
          <div className="tx-shell">
            <div className="tx-kicker"><span />The Tranos principle</div>
            <h2>Make the complex feel<br /><em>calm, clear and inevitable.</em></h2>
            <div className="tx-manifesto-bottom">
              <p>
                Good digital work is not about filling a screen. It is about deciding what matters,
                removing noise and giving people a confident next move.
              </p>
              <a className="tx-inline-link" href="/about/">Read our approach <span>↗</span></a>
            </div>
          </div>
        </section>

        <section className="tx-section tx-process">
          <div className="tx-shell">
            <div className="tx-section-head">
              <div>
                <div className="tx-kicker"><span />Process</div>
                <h2>From first question<br />to shipped experience.</h2>
              </div>
              <p>
                A compact process with enough structure to move quickly and enough flexibility
                to discover something better.
              </p>
            </div>

            <div className="tx-process-grid">
              {process.map((step) => (
                <article key={step.number}>
                  <span>{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="tx-section tx-about" id="about">
          <div className="tx-shell tx-about-grid">
            <div className="tx-about-visual">
              <div className="tx-about-orbit orbit-one" />
              <div className="tx-about-orbit orbit-two" />
              <div className="tx-about-orbit orbit-three" />
              <div className="tx-about-core">TR<span>.</span></div>
              <div className="tx-about-label">TRANOS / 2026</div>
            </div>

            <div className="tx-about-copy">
              <div className="tx-kicker"><span />About Tranos</div>
              <h2>Designed for brands that refuse to look generic.</h2>
              <p>
                Tranos is an independent studio for teams who need more than another template,
                another dashboard or another predictable brand. We build distinct digital
                experiences where visual craft and technology reinforce each other.
              </p>
              <a className="tx-inline-link" href="/about/">About the studio <span>↗</span></a>

              <div className="tx-stats">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="tx-section tx-insights-section" id="insights">
          <div className="tx-shell">
            <div className="tx-section-head">
              <div>
                <div className="tx-kicker"><span />Insights</div>
                <h2>Notes from the<br />creative engine.</h2>
              </div>
              <p>
                Thinking about AI products, digital identity, systems, motion and the craft behind
                memorable interfaces.
              </p>
            </div>

            <div className="tx-insights-grid">
              {insights.map((insight, index) => (
                <InsightCard key={insight.id} insight={insight} index={index} />
              ))}
            </div>

            <div className="tx-section-link">
              <a href="/insights/">Read all insights <span>↗</span></a>
            </div>
          </div>
        </section>

        <section className="tx-cta">
          <div className="tx-shell">
            <div className="tx-kicker tx-kicker-center"><span />Have a good problem?</div>
            <h2>Let’s build the<br /><em>next version.</em></h2>
            <p>
              Bring the ambition, the mess, or the unfinished idea. We will turn it into a clearer
              digital direction.
            </p>
            <a className="tx-button tx-button-gold" href="/contact/">Start a project <b>↗</b></a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
