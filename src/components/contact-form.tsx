"use client";

import { FormEvent, useState } from "react";

export default function ContactForm(){
  const [sending,setSending]=useState(false);
  const [status,setStatus]=useState<string|null>(null);
  async function submit(event:FormEvent<HTMLFormElement>){
    event.preventDefault();setSending(true);setStatus(null);
    const form=event.currentTarget;const data=new FormData(form);
    try{
      const response=await fetch("/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({
        name:data.get("name"),email:data.get("email"),company:data.get("company")||undefined,projectType:data.get("projectType")||undefined,message:data.get("message")
      })});
      const payload=await response.json();if(!response.ok)throw new Error(payload.error||"Unable to send message.");
      form.reset();setStatus("Message received. We will be in touch soon.");
    }catch(error){setStatus(error instanceof Error?error.message:"Unable to send message.");}
    finally{setSending(false);}
  }
  return <form className="tx-contact-form" onSubmit={submit}>
    <div className="tx-form-grid">
      <label><span>Your name</span><input name="name" required placeholder="Ehsan Amn"/></label>
      <label><span>Email</span><input name="email" type="email" required placeholder="you@company.com"/></label>
      <label><span>Company</span><input name="company" placeholder="Company / Brand"/></label>
      <label><span>Project type</span><select name="projectType" defaultValue=""><option value="">Select a service</option><option>Web Development</option><option>AI Solution</option><option>Branding</option><option>3D / Motion</option><option>Digital Strategy</option></select></label>
      <label className="tx-form-full"><span>What are you building?</span><textarea name="message" required placeholder="Tell us about the goal, product, deadline or challenge."/></label>
    </div>
    <div className="tx-form-submit"><button type="submit" className="tx-button tx-button-gold" disabled={sending}>{sending?"Sending...":"Send project inquiry ↗"}</button>{status?<p role="status">{status}</p>:null}</div>
  </form>;
}
