"use client";

import { useEffect, useState } from "react";
import { localeMeta, locales, type Locale } from "@/lib/i18n";

export default function SitePreferences(){
 const [theme,setTheme]=useState<"dark"|"light">("dark");
 const [locale,setLocale]=useState<Locale>("en");

 useEffect(()=>{
  const savedTheme=localStorage.getItem("tranos-theme") as "dark"|"light"|null;
  const savedLocale=localStorage.getItem("tranos-locale") as Locale|null;
  const nextTheme=savedTheme==="light"?"light":"dark";
  const nextLocale=savedLocale&&locales.includes(savedLocale)?savedLocale:"en";
  setTheme(nextTheme);setLocale(nextLocale);
  document.documentElement.dataset.theme=nextTheme;
  document.documentElement.lang=nextLocale;
  document.documentElement.dir=localeMeta[nextLocale].dir;
 },[]);

 function toggleTheme(){
  const next=theme==="dark"?"light":"dark";setTheme(next);
  localStorage.setItem("tranos-theme",next);document.cookie=`tranos-theme=${next}; Path=/; Max-Age=31536000; SameSite=Lax`;
  document.documentElement.dataset.theme=next;
 }
 function changeLocale(next:Locale){
  setLocale(next);localStorage.setItem("tranos-locale",next);
  document.cookie=`tranos-locale=${next}; Path=/; Max-Age=31536000; SameSite=Lax`;
  document.documentElement.lang=next;document.documentElement.dir=localeMeta[next].dir;
  window.location.reload();
 }
 return <div className="tx-preferences">
   <button className="tx-theme-toggle" onClick={toggleTheme} aria-label={theme==="dark"?"Switch to light mode":"Switch to dark mode"}>
    <span className={theme==="dark"?"is-active":""}>☾</span><span className={theme==="light"?"is-active":""}>☼</span>
   </button>
   <div className="tx-language-picker">
    <select value={locale} onChange={e=>changeLocale(e.target.value as Locale)} aria-label="Language">
      {locales.map(code=><option key={code} value={code}>{localeMeta[code].native}</option>)}
    </select>
   </div>
 </div>;
}
