const links=[["Work","/work/"],["Services","/services/"],["About","/about/"],["Insights","/insights/"],["Contact","/contact/"]];

export default function SiteFooter(){
  return <footer className="tx-footer"><div className="tx-shell">
    <div className="tx-footer-top">
      <div><a className="tx-logo" href="/">TRANOS<span>.</span></a><p>Digital / AI / Creative<br/>Built for the next digital era.</p></div>
      <div className="tx-footer-links">{links.map(([label,href])=><a key={href} href={href}>{label}</a>)}</div>
      <div className="tx-footer-contact"><span>Start a project</span><a href="mailto:hello@tranos.studio">hello@tranos.studio</a></div>
    </div>
    <div className="tx-footer-bottom"><span>© 2026 Tranos Studio</span><span>Tehran · Remote Worldwide</span><span>Digital experiences / intelligent systems</span></div>
  </div></footer>;
}
