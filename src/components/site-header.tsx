"use client";

import { useState } from "react";

const links=[["Work","/work/"],["Services","/services/"],["About","/about/"],["Insights","/insights/"],["Contact","/contact/"]];

export default function SiteHeader(){
  const [open,setOpen]=useState(false);
  return <header className="tx-header">
    <div className="tx-shell tx-header-inner">
      <a className="tx-logo" href="/" onClick={()=>setOpen(false)}>TRANOS<span>.</span></a>
      <nav className="tx-desktop-nav" aria-label="Primary navigation">{links.map(([label,href])=><a key={href} href={href}>{label}</a>)}</nav>
      <div className="tx-header-actions">
        <a className="tx-header-cta" href="/contact/">Let&apos;s Talk <span>↗</span></a>
        <button className="tx-menu-button" aria-label={open?"Close menu":"Open menu"} aria-expanded={open} onClick={()=>setOpen(v=>!v)}><span/><span/></button>
      </div>
    </div>
    <div className={`tx-mobile-menu ${open?"is-open":""}`}>
      <div className="tx-mobile-menu-inner">{links.map(([label,href])=><a key={href} href={href} onClick={()=>setOpen(false)}><span>{label}</span><small>↗</small></a>)}</div>
    </div>
  </header>;
}
