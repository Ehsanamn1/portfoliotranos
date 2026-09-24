import { getLocaleFromCookie, t } from "@/lib/i18n";
import { getSiteSettings } from "@/lib/public-data";

export default async function SiteFooter(){
 const locale=await getLocaleFromCookie();const settings=await getSiteSettings();const tr=(key:Parameters<typeof t>[1])=>t(locale,key);
 const links=[[tr("work"),"/work/"],[tr("services"),"/services/"],[tr("about"),"/about/"],[tr("insights"),"/insights/"],[tr("contact"),"/contact/"]];
 return <footer className="tx-footer"><div className="tx-shell">
  <div className="tx-footer-top">
   <div><a className="tx-logo" href="/">{settings.brandName}<span>.</span></a><p>{settings.tagline}<br/>{settings.footerNote}</p></div>
   <div className="tx-footer-links">{links.map(([label,href])=><a key={href} href={href}>{label}</a>)}</div>
   <div className="tx-footer-contact"><span>{tr("startProject")}</span><a href={`mailto:${settings.email}`}>{settings.email}</a><div className="tx-footer-socials">{settings.linkedinUrl&&<a href={settings.linkedinUrl} target="_blank" rel="noreferrer">LinkedIn</a>}{settings.instagramUrl&&<a href={settings.instagramUrl} target="_blank" rel="noreferrer">Instagram</a>}{settings.behanceUrl&&<a href={settings.behanceUrl} target="_blank" rel="noreferrer">Behance</a>}</div></div>
  </div>
  <div className="tx-footer-bottom"><span>© 2026 {settings.brandName}</span><span>{settings.location}</span><span>{settings.tagline}</span></div>
 </div></footer>;
}
