"use client";

import { FormEvent, useEffect, useState } from "react";
import { getStoredLocaleLabel } from "@/lib/client-i18n";
import { type Locale } from "@/lib/i18n";

const copy:Record<Locale,{name:string;email:string;company:string;type:string;message:string;select:string;submit:string;sending:string;success:string}>={
 en:{name:"Your name",email:"Email",company:"Company",type:"Project type",message:"What are you building?",select:"Select a service",submit:"Send project inquiry",sending:"Sending...",success:"Message received. We will be in touch soon."},
 fa:{name:"نام شما",email:"ایمیل",company:"شرکت",type:"نوع پروژه",message:"چه چیزی می‌سازید؟",select:"انتخاب سرویس",submit:"ارسال درخواست پروژه",sending:"در حال ارسال...",success:"پیام شما دریافت شد. به‌زودی با شما تماس می‌گیریم."},
 es:{name:"Tu nombre",email:"Email",company:"Empresa",type:"Tipo de proyecto",message:"¿Qué estás construyendo?",select:"Selecciona un servicio",submit:"Enviar solicitud",sending:"Enviando...",success:"Mensaje recibido. Nos pondremos en contacto contigo."},
 de:{name:"Dein Name",email:"E-Mail",company:"Unternehmen",type:"Projekttyp",message:"Was baust du?",select:"Leistung auswählen",submit:"Projektanfrage senden",sending:"Senden...",success:"Nachricht erhalten. Wir melden uns bald."}
};

export default function ContactForm(){
 const [locale,setLocale]=useState<Locale>("en");const [sending,setSending]=useState(false);const [status,setStatus]=useState<string|null>(null);
 useEffect(()=>setLocale(getStoredLocaleLabel()),[]);const c=copy[locale];
 async function submit(event:FormEvent<HTMLFormElement>){
  event.preventDefault();setSending(true);setStatus(null);const form=event.currentTarget;const data=new FormData(form);
  try{const response=await fetch("/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:data.get("name"),email:data.get("email"),company:data.get("company")||undefined,projectType:data.get("projectType")||undefined,message:data.get("message")})});const payload=await response.json();if(!response.ok)throw new Error(payload.error||"Unable to send message.");form.reset();setStatus(c.success);}catch(error){setStatus(error instanceof Error?error.message:"Unable to send message.");}finally{setSending(false);}
 }
 return <form className="tx-contact-form" onSubmit={submit}><div className="tx-form-grid">
  <label><span>{c.name}</span><input name="name" required placeholder={locale==="fa"?"احسان امین":"Ehsan Amn"}/></label>
  <label><span>{c.email}</span><input name="email" type="email" required placeholder="you@company.com"/></label>
  <label><span>{c.company}</span><input name="company" placeholder={locale==="fa"?"نام شرکت / برند":"Company / Brand"}/></label>
  <label><span>{c.type}</span><select name="projectType" defaultValue=""><option value="">{c.select}</option><option>Web Development</option><option>AI Solution</option><option>Branding</option><option>3D / Motion</option><option>Digital Strategy</option></select></label>
  <label className="tx-form-full"><span>{c.message}</span><textarea name="message" required placeholder={locale==="fa"?"هدف، محصول، زمان‌بندی یا چالش را توضیح دهید.":"Tell us about the goal, product, deadline or challenge."}/></label>
 </div><div className="tx-form-submit"><button type="submit" className="tx-button tx-button-gold" disabled={sending}>{sending?c.sending:`${c.submit} ↗`}</button>{status?<p role="status">{status}</p>:null}</div></form>;
}
