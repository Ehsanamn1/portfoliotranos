"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function ControlCenterLogin(){
 const router=useRouter();const [email,setEmail]=useState("");const [password,setPassword]=useState("");const [error,setError]=useState("");const [loading,setLoading]=useState(false);
 async function submit(event:FormEvent<HTMLFormElement>){
  event.preventDefault();setLoading(true);setError("");
  try{
   const response=await fetch("/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email,password})});
   const data=await response.json();if(!response.ok)throw new Error(data.error||"Login failed.");
   router.replace("/control-center");router.refresh();
  }catch(err){setError(err instanceof Error?err.message:"Login failed.");}finally{setLoading(false);}
 }
 return <main className="tx-login-page"><section className="tx-login-card">
  <div className="tx-login-brand"><a className="tx-logo" href="/">TRANOS<span>.</span></a><span>CONTROL CENTER</span></div>
  <div className="tx-kicker"><span/>Secure admin access</div><h1>Control the<br/><em>experience.</em></h1><p>Manage projects, publish insights and handle incoming project inquiries from one place.</p>
  <form onSubmit={submit} className="tx-login-form">
   <label>Email<input type="email" autoComplete="username" value={email} onChange={e=>setEmail(e.target.value)} required/></label>
   <label>Password<input type="password" autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)} required minLength={8}/></label>
   {error?<div className="tx-login-error">{error}</div>:null}
   <button className="tx-button tx-button-gold" type="submit" disabled={loading}>{loading?"Authenticating…":"Enter Control Center ↗"}</button>
  </form>
  <a className="tx-login-back" href="/">← Back to Tranos</a>
 </section></main>;
}
