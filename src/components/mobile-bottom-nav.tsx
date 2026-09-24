"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getStoredLocaleLabel } from "@/lib/client-i18n";
import { type Locale } from "@/lib/i18n";

export default function MobileBottomNav(){
 const pathname=usePathname();const [locale,setLocale]=useState<Locale>("en");
 useEffect(()=>setLocale(getStoredLocaleLabel()),[]);
 const labels=locale==="fa"?["خانه","کار","خدمات","تماس"]:locale==="es"?["Inicio","Proyectos","Servicios","Contacto"]:locale==="de"?["Start","Projekte","Leistungen","Kontakt"]:["Home","Work","Services","Contact"];
 const items=[["/",labels[0],"⌂"],["/work/",labels[1],"◈"],["/services/",labels[2],"✦"],["/contact/",labels[3],"↗"]];
 return <nav className="tx-mobile-bottom-nav" aria-label="Mobile navigation">{items.map(([href,label,icon])=>{const active=href==="/" ? pathname==="/" : pathname.startsWith(href.replace(/\/$/,""));return <a key={href} href={href} className={active?"active":""}><span>{icon}</span><small>{label}</small></a>;})}</nav>;
}
