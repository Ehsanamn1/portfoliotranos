"use client";

import { useEffect } from "react";

const projects = [
  ["Tranos AI", "AI product experience and web platform.", "AI Product · 2026"],
  ["Brand System", "Identity and digital presence for a modern technology brand.", "Branding · 2026"],
  ["Atlas Commerce", "Commerce platform with automation at the core.", "E-commerce · 2026"]
];

const services = [
  ["01", "Web Development", "Modern, scalable and high-performance web applications."],
  ["02", "UI / UX Design", "User-centered digital experiences with strong visual systems."],
  ["03", "3D & Motion", "Interactive 3D, motion design and cinematic storytelling."],
  ["04", "AI Solutions", "Intelligent products, integrations and automation workflows."],
  ["05", "Branding", "Distinct visual identities for digital-first brands."],
  ["06", "Digital Strategy", "Product, content and digital transformation strategy."]
];

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header className="nav">
        <div className="container navin">
          <a className="brand" href="#top">TRANOS<span>.</span></a>
          <nav className="links" aria-label="Primary">
            <a href="#work">Work</a><a href="#services">Services</a><a href="#about">About</a>
            <a href="#insights">Insights</a><a href="#contact">Contact</a>
          </nav>
          <a className="ctaNav" href="#contact">Let&apos;s Talk ↗</a>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="heroLeft">
            <div className="container heroIn">
              <div className="heroCopy reveal">
                <div className="eyebrow">Digital / AI / Creative</div>
                <h1>Ideas into<br /><strong>Digital Reality.</strong></h1>
                <p>We build future-ready digital experiences, powered by creativity, technology and artificial intelligence.</p>
                <div className="actions">
                  <a className="btn primary" href="#work">Explore Our Work ↗</a>
                  <a className="btn" href="#about">Discover Tranos</a>
                </div>
                <div className="scroll">Scroll Down ↓</div>
              </div>
            </div>
          </div>
          <div className="scene" aria-hidden="true">
            <div className="orb"><div className="core" /></div>
            <div className="sceneLabel">TR / 01</div>
          </div>
        </section>

        <section className="section" id="work">
          <div className="container reveal">
            <div className="two">
              <div><div className="eyebrow">Selected Works</div><h2 className="title">Featured Projects</h2></div>
              <p className="copy">A focused selection of digital experiences, brands and intelligent products built for forward-thinking teams.</p>
            </div>
            <div className="grid3">
              {projects.map(([title, description, meta], index) => (
                <article className="card" key={title}>
                  <div className={`visual visual-${index + 1}`} />
                  <h3>{title}</h3><p>{description}</p><div className="meta">{meta}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="services">
          <div className="container reveal">
            <div className="eyebrow">Capabilities</div><h2 className="title">What We Do</h2>
            <div className="grid3 serviceGrid">
              {services.map(([number, title, description]) => (
                <article className="card serviceCard" key={title}>
                  <span className="serviceNumber">{number}</span><h3>{title}</h3><p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container reveal">
            <div className="eyebrow">Process</div>
            <div className="process">
              {[
                ["01", "Discover", "Understand goals, users and the opportunity."],
                ["02", "Design", "Turn the strategy into a focused experience."],
                ["03", "Develop", "Build the product with modern technology."],
                ["04", "Launch", "Ship, measure and improve continuously."]
              ].map(([number, title, description]) => (
                <article className="step" key={number}>
                  <div className="num">{number}</div><h3>{title}</h3><p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="about">
          <div className="container reveal">
            <div className="two">
              <div>
                <div className="eyebrow">Who We Are</div><h2 className="title">Built for the next digital era.</h2>
                <p className="copy aboutCopy">We combine design, engineering, AI and motion to create digital systems that feel considered from the first frame to the final interaction.</p>
              </div>
              <div className="stats">
                {[["10+", "Years Experience"], ["50+", "Projects"], ["30+", "Clients"], ["∞", "Ideas"]].map(([value, label]) => (
                  <div className="stat" key={label}><b>{value}</b><span>{label}</span></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="insights">
          <div className="container reveal">
            <div className="eyebrow">Insights</div><h2 className="title">Latest Thinking</h2>
            <div className="grid3">
              {[
                ["The Future of AI Products", "How intelligent systems are changing digital product design."],
                ["Minimalism in Web Design", "Why restraint and typography can create stronger interfaces."],
                ["Building a Digital Brand", "Positioning, identity and systems for modern companies."]
              ].map(([title, description], index) => (
                <article className="card" key={title}>
                  <div className={`visual insight-${index + 1}`} /><h3>{title}</h3><p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="cta">
          <div className="container reveal">
            <div className="eyebrow centerEyebrow">Let&apos;s Create Together</div>
            <h2>Ready to Build<br /><span>Something Amazing?</span></h2>
            <p>Let&apos;s create a digital experience people remember.</p>
            <a className="btn primary" href="#contact">Get In Touch ↗</a>
          </div>
        </section>

        <section className="section" id="contact">
          <div className="container">
            <div className="contact reveal">
              <div>
                <div className="eyebrow">Get In Touch</div><h2>Let&apos;s talk.</h2>
                <p className="copy">Have a project in mind? Tell us what you&apos;re building.</p>
                <div className="detail"><small>Email</small><a href="mailto:hello@tranos.studio">hello@tranos.studio</a></div>
                <div className="detail"><small>Location</small><span>Tehran, Iran</span></div>
              </div>
              <form action="mailto:hello@tranos.studio" method="post" encType="text/plain">
                <div className="fields">
                  <input name="name" placeholder="Your Name" required />
                  <input name="email" type="email" placeholder="Your Email" required />
                  <input className="full" name="company" placeholder="Company" />
                  <select className="full" name="projectType" defaultValue="">
                    <option value="" disabled>Project Type</option><option>Web Development</option><option>AI Solution</option><option>Branding</option><option>3D / Motion</option>
                  </select>
                  <textarea className="full" name="message" placeholder="Your Message" required />
                </div>
                <button className="btn primary formButton" type="submit">Send Message ↗</button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <div className="footer">
            <a className="brand" href="#top">TRANOS<span>.</span></a>
            <div className="flinks"><a href="#work">Work</a><a href="#services">Services</a><a href="#about">About</a><a href="#insights">Insights</a><a href="#contact">Contact</a></div>
          </div>
          <div className="footbottom"><div>© 2026 Tranos Studio</div><div>Digital · AI · Creative</div></div>
        </div>
      </footer>
    </>
  );
}
