"use client";

import { useEffect, useState } from "react";
import { localeMeta, type Locale } from "@/lib/i18n";

const links = [
  ["work", "/work/"],
  ["services", "/services/"],
  ["about", "/about/"],
  ["insights", "/insights/"],
  ["contact", "/contact/"]
] as const;

const labels: Record<Locale, Record<string, string>> = {
  en: { work: "Work", services: "Services", about: "About", insights: "Insights", contact: "Contact", talk: "Let's Talk" },
  fa: { work: "نمونه‌کارها", services: "خدمات", about: "درباره ما", insights: "مجله", contact: "تماس", talk: "شروع گفتگو" },
  es: { work: "Proyectos", services: "Servicios", about: "Nosotros", insights: "Ideas", contact: "Contacto", talk: "Hablemos" },
  de: { work: "Projekte", services: "Leistungen", about: "Über uns", insights: "Insights", contact: "Kontakt", talk: "Lass uns reden" }
};

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    const value = document.documentElement.lang;
    setLocale((Object.keys(localeMeta) as Locale[]).includes(value as Locale) ? value as Locale : "en");
  }, []);

  const tr = labels[locale];

  return (
    <header className="tx-header">
      <div className="tx-shell tx-header-inner">
        <a className="tx-logo" href="/" onClick={() => setOpen(false)} aria-label="Tranos home">
          TRANOS<span>.</span>
        </a>

        <nav className="tx-desktop-nav" aria-label="Primary navigation">
          {links.map(([key, href]) => (
            <a key={href} href={href}>{tr[key]}</a>
          ))}
        </nav>

        <div className="tx-header-actions">
          <span className="tx-header-status"><i />Available for selected projects</span>
          <a className="tx-header-cta" href="/contact/">{tr.talk} <span>↗</span></a>
          <button
            className="tx-menu-button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <span /><span />
          </button>
        </div>
      </div>

      <div className={`tx-mobile-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div className="tx-mobile-menu-inner">
          {links.map(([key, href], index) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              <small>0{index + 1}</small>
              <span>{tr[key]}</span>
              <b>↗</b>
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
