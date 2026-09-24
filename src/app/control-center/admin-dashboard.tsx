"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type Message={id:string;name:string;email:string;company:string|null;projectType:string|null;message:string;status:"NEW"|"READ"|"REPLIED"|"ARCHIVED";createdAt:string};
type Project={id:string;slug:string;title:string;description:string;category:string;year:number;featured:boolean;published:boolean;imageUrl:string|null;sortOrder:number};
type Insight={id:string;slug:string;title:string;excerpt:string;content:string;coverImageUrl:string|null;published:boolean;publishedAt:string|null};
type Service={id:string;slug:string;number:string;title:string;description:string;capabilities:string|null;sortOrder:number;published:boolean};
type Settings={id:string;brandName:string;tagline:string;heroTitle:string;heroDescription:string;email:string;location:string;footerNote:string;linkedinUrl:string|null;instagramUrl:string|null;behanceUrl:string|null;dribbbleUrl:string|null;defaultLocale:"en"|"fa"|"es"|"de";defaultTheme:"dark"|"light"};

async function api(path:string,options?:RequestInit){const response=await fetch(path,{...options,headers:{"Content-Type":"application/json",...(options?.headers||{})}});const data=await response.json();if(!response.ok)throw new Error(data.error||"Request failed.");return data;}
function slugify(value:string){return value.toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");}

const blankSettings:Settings={id:"main",brandName:"TRANOS",tagline:"Digital / AI / Creative",heroTitle:"Ideas into Digital Reality.",heroDescription:"Tranos is an independent digital studio building premium experiences, intelligent systems and visual identities for ambitious teams.",email:"hello@tranos.studio",location:"Tehran · Remote Worldwide",footerNote:"Built for the next digital era.",linkedinUrl:null,instagramUrl:null,behanceUrl:null,dribbbleUrl:null,defaultLocale:"en",defaultTheme:"dark"};

export default function AdminDashboard({email}:{email:string}){
 const [messages,setMessages]=useState<Message[]>([]),[projects,setProjects]=useState<Project[]>([]),[insights,setInsights]=useState<Insight[]>([]),[services,setServices]=useState<Service[]>([]);
 const [settings,setSettings]=useState<Settings>(blankSettings);
 const [tab,setTab]=useState<"overview"|"projects"|"insights"|"services"|"settings"|"messages">("overview"),[notice,setNotice]=useState(""),[busy,setBusy]=useState(false);
 const [projectForm,setProjectForm]=useState({id:"",slug:"",title:"",description:"",category:"Digital Product",year:new Date().getFullYear(),featured:false,published:true,imageUrl:"",sortOrder:0});
 const [insightForm,setInsightForm]=useState({id:"",slug:"",title:"",excerpt:"",content:"",coverImageUrl:"",published:false,publishedAt:""});
 const [serviceForm,setServiceForm]=useState({id:"",slug:"",number:"01",title:"",description:"",capabilities:"",sortOrder:0,published:true});

 async function load(){
  setBusy(true);
  try{
   const [m,p,i,s,settingsRes]=await Promise.all([api("/api/admin/messages"),api("/api/admin/projects"),api("/api/admin/insights"),api("/api/admin/services"),api("/api/admin/settings")]);
   setMessages(m.data);setProjects(p.data);setInsights(i.data);setServices(s.data);setSettings(settingsRes.data||blankSettings);
  }catch(error){setNotice(error instanceof Error?error.message:"Unable to load dashboard.");}
  finally{setBusy(false);}
 }
 useEffect(()=>{void load();},[]);
 const unread=useMemo(()=>messages.filter(x=>x.status==="NEW").length,[messages]);const publishedProjects=useMemo(()=>projects.filter(x=>x.published).length,[projects]);const publishedInsights=useMemo(()=>insights.filter(x=>x.published).length,[insights]);
 function newProject(){setProjectForm({id:"",slug:"",title:"",description:"",category:"Digital Product",year:new Date().getFullYear(),featured:false,published:true,imageUrl:"",sortOrder:0});setTab("projects");}
 function editProject(x:Project){setProjectForm({...x,imageUrl:x.imageUrl||""});setTab("projects");window.scrollTo({top:0,behavior:"smooth"});}
 async function saveProject(event:FormEvent){event.preventDefault();try{setBusy(true);const payload={...projectForm,slug:projectForm.slug||slugify(projectForm.title)};if(projectForm.id){await api(`/api/admin/projects/${projectForm.id}`,{method:"PATCH",body:JSON.stringify(payload)});setNotice("Project updated.");}else{await api("/api/admin/projects",{method:"POST",body:JSON.stringify(payload)});setNotice("Project created and synced to the public site.");}await load();newProject();}catch(error){setNotice(error instanceof Error?error.message:"Unable to save project.");}finally{setBusy(false);}}
 function newInsight(){setInsightForm({id:"",slug:"",title:"",excerpt:"",content:"",coverImageUrl:"",published:false,publishedAt:""});setTab("insights");}
 function editInsight(x:Insight){setInsightForm({id:x.id,slug:x.slug,title:x.title,excerpt:x.excerpt,content:x.content,coverImageUrl:x.coverImageUrl||"",published:x.published,publishedAt:x.publishedAt?new Date(x.publishedAt).toISOString().slice(0,16):""});setTab("insights");window.scrollTo({top:0,behavior:"smooth"});}
 async function saveInsight(event:FormEvent){event.preventDefault();try{setBusy(true);const payload={...insightForm,slug:insightForm.slug||slugify(insightForm.title),publishedAt:insightForm.publishedAt?new Date(insightForm.publishedAt).toISOString():null};if(insightForm.id){await api(`/api/admin/insights/${insightForm.id}`,{method:"PATCH",body:JSON.stringify(payload)});setNotice("Insight updated.");}else{await api("/api/admin/insights",{method:"POST",body:JSON.stringify(payload)});setNotice("Insight created.");}await load();newInsight();}catch(error){setNotice(error instanceof Error?error.message:"Unable to save insight.");}finally{setBusy(false);}}
 function newService(){setServiceForm({id:"",slug:"",number:String(services.length+1).padStart(2,"0"),title:"",description:"",capabilities:"",sortOrder:services.length,published:true});setTab("services");}
 function editService(x:Service){setServiceForm({id:x.id,slug:x.slug,number:x.number,title:x.title,description:x.description,capabilities:x.capabilities||"",sortOrder:x.sortOrder,published:x.published});setTab("services");window.scrollTo({top:0,behavior:"smooth"});}
 async function saveService(event:FormEvent){event.preventDefault();try{setBusy(true);const payload={...serviceForm,slug:serviceForm.slug||slugify(serviceForm.title)};if(serviceForm.id){await api(`/api/admin/services/${serviceForm.id}`,{method:"PATCH",body:JSON.stringify(payload)});setNotice("Service updated.");}else{await api("/api/admin/services",{method:"POST",body:JSON.stringify(payload)});setNotice("Service added to the public site.");}await load();newService();}catch(error){setNotice(error instanceof Error?error.message:"Unable to save service.");}finally{setBusy(false);}}
 async function saveSettings(event:FormEvent){event.preventDefault();try{setBusy(true);await api("/api/admin/settings",{method:"PATCH",body:JSON.stringify(settings)});setNotice("Site settings updated.");await load();}catch(error){setNotice(error instanceof Error?error.message:"Unable to save settings.");}finally{setBusy(false);}}
 async function updateMessage(id:string,status:Message["status"]){try{await api(`/api/admin/messages/${id}`,{method:"PATCH",body:JSON.stringify({status})});setNotice("Message status updated.");await load();}catch(error){setNotice(error instanceof Error?error.message:"Unable to update message.");}}
 async function removeProject(id:string){if(!window.confirm("Delete this project permanently?"))return;try{await api(`/api/admin/projects/${id}`,{method:"DELETE"});setNotice("Project deleted.");await load();}catch(error){setNotice(error instanceof Error?error.message:"Unable to delete project.");}}
 async function removeInsight(id:string){if(!window.confirm("Delete this insight permanently?"))return;try{await api(`/api/admin/insights/${id}`,{method:"DELETE"});setNotice("Insight deleted.");await load();}catch(error){setNotice(error instanceof Error?error.message:"Unable to delete insight.");}}
 async function removeService(id:string){if(!window.confirm("Delete this service permanently?"))return;try{await api(`/api/admin/services/${id}`,{method:"DELETE"});setNotice("Service deleted.");await load();}catch(error){setNotice(error instanceof Error?error.message:"Unable to delete service.");}}
 async function logout(){await fetch("/api/auth/logout",{method:"POST"});window.location.href="/control-center/login";}

 return <main className="tx-admin-page"><div className="tx-admin-shell">
  <header className="tx-admin-top"><div><span>TRANOS / CONTROL CENTER</span><h1>Command center.</h1><p>{email}</p></div><div className="tx-admin-actions"><a href="/" className="tx-admin-button">View site ↗</a><button className="tx-admin-button" onClick={logout}>Logout</button></div></header>
  {notice?<div className="tx-admin-notice">{notice}</div>:null}
  <nav className="tx-admin-tabs">{[["overview","Overview"],["projects","Projects"],["insights","Insights"],["services","Services"],["settings","Site settings"],["messages","Messages"]].map(([key,label])=><button key={key} className={tab===key?"active":""} onClick={()=>setTab(key as typeof tab)}>{label}{key==="messages"&&unread?<b>{unread}</b>:null}</button>)}</nav>

  {tab==="overview"?<section className="tx-admin-overview">
   <div className="tx-admin-stat"><span>Projects</span><strong>{projects.length}</strong><small>{publishedProjects} published</small></div>
   <div className="tx-admin-stat"><span>Insights</span><strong>{insights.length}</strong><small>{publishedInsights} published</small></div>
   <div className="tx-admin-stat"><span>New messages</span><strong>{unread}</strong><small>{messages.length} total inquiries</small></div>
   <div className="tx-admin-stat"><span>Services</span><strong>{services.length}</strong><small>Managed capabilities</small></div>
   <div className="tx-admin-card tx-admin-wide-card"><div className="tx-admin-card-head"><div><span>CONTROL SURFACE</span><h2>Every important part has a control.</h2></div><div className="tx-admin-card-actions"><button onClick={newProject}>New project</button><button onClick={newInsight}>New insight</button><button onClick={newService}>New service</button></div></div>
    <div className="tx-admin-feed">{projects.slice(0,3).map(x=><div key={x.id}><span>PROJECT</span><b>{x.title}</b><small>{x.published?"Published":"Draft"}</small><button onClick={()=>editProject(x)}>Edit</button></div>)}{services.slice(0,3).map(x=><div key={x.id}><span>SERVICE</span><b>{x.title}</b><small>{x.published?"Published":"Draft"}</small><button onClick={()=>editService(x)}>Edit</button></div>)}{insights.slice(0,2).map(x=><div key={x.id}><span>INSIGHT</span><b>{x.title}</b><small>{x.published?"Published":"Draft"}</small><button onClick={()=>editInsight(x)}>Edit</button></div>)}</div>
   </div>
  </section>:null}

  {tab==="projects"?<section className="tx-admin-content"><form className="tx-admin-editor" onSubmit={saveProject}><div className="tx-admin-card-head"><div><span>{projectForm.id?"EDIT PROJECT":"NEW PROJECT"}</span><h2>{projectForm.id?projectForm.title||"Untitled project":"Create a project"}</h2></div><button type="button" onClick={newProject}>Clear</button></div><div className="tx-admin-form-grid">
   <label>Title<input value={projectForm.title} onChange={e=>setProjectForm({...projectForm,title:e.target.value})} required/></label><label>Slug<input value={projectForm.slug} onChange={e=>setProjectForm({...projectForm,slug:e.target.value})} placeholder="auto-generated"/></label>
   <label>Category<input value={projectForm.category} onChange={e=>setProjectForm({...projectForm,category:e.target.value})} required/></label><label>Year<input type="number" value={projectForm.year} onChange={e=>setProjectForm({...projectForm,year:Number(e.target.value)})} required/></label>
   <label className="wide">Description<textarea value={projectForm.description} onChange={e=>setProjectForm({...projectForm,description:e.target.value})} required/></label>
   <label className="wide">Image URL<input value={projectForm.imageUrl} onChange={e=>setProjectForm({...projectForm,imageUrl:e.target.value})} placeholder="/work/project.svg or https://..."/></label>
   <label>Sort order<input type="number" value={projectForm.sortOrder} onChange={e=>setProjectForm({...projectForm,sortOrder:Number(e.target.value)})}/></label>
   <label className="check"><input type="checkbox" checked={projectForm.featured} onChange={e=>setProjectForm({...projectForm,featured:e.target.checked})}/> Featured</label><label className="check"><input type="checkbox" checked={projectForm.published} onChange={e=>setProjectForm({...projectForm,published:e.target.checked})}/> Published</label>
  </div><button className="tx-button tx-button-gold" disabled={busy}>{busy?"Saving...":projectForm.id?"Update project ↗":"Create project ↗"}</button></form>
  <div className="tx-admin-list">{projects.map(x=><article key={x.id} className="tx-admin-list-item"><div><span>{x.category} · {x.year}</span><h3>{x.title}</h3><p>{x.description}</p></div><div><small>{x.published?"LIVE":"DRAFT"}</small><button onClick={()=>editProject(x)}>Edit</button><button className="danger" onClick={()=>removeProject(x.id)}>Delete</button></div></article>)}</div></section>:null}

  {tab==="insights"?<section className="tx-admin-content"><form className="tx-admin-editor" onSubmit={saveInsight}><div className="tx-admin-card-head"><div><span>{insightForm.id?"EDIT INSIGHT":"NEW INSIGHT"}</span><h2>{insightForm.id?insightForm.title||"Untitled insight":"Write an insight"}</h2></div><button type="button" onClick={newInsight}>Clear</button></div><div className="tx-admin-form-grid">
   <label>Title<input value={insightForm.title} onChange={e=>setInsightForm({...insightForm,title:e.target.value})} required/></label><label>Slug<input value={insightForm.slug} onChange={e=>setInsightForm({...insightForm,slug:e.target.value})}/></label>
   <label className="wide">Excerpt<input value={insightForm.excerpt} onChange={e=>setInsightForm({...insightForm,excerpt:e.target.value})} required/></label><label className="wide">Cover image URL<input value={insightForm.coverImageUrl} onChange={e=>setInsightForm({...insightForm,coverImageUrl:e.target.value})}/></label>
   <label className="wide">Content<textarea className="tx-admin-editor-textarea" value={insightForm.content} onChange={e=>setInsightForm({...insightForm,content:e.target.value})} required/></label>
   <label>Publish date<input type="datetime-local" value={insightForm.publishedAt} onChange={e=>setInsightForm({...insightForm,publishedAt:e.target.value})}/></label><label className="check"><input type="checkbox" checked={insightForm.published} onChange={e=>setInsightForm({...insightForm,published:e.target.checked})}/> Published</label>
  </div><button className="tx-button tx-button-gold" disabled={busy}>{busy?"Saving...":insightForm.id?"Update insight ↗":"Create insight ↗"}</button></form>
  <div className="tx-admin-list">{insights.map(x=><article key={x.id} className="tx-admin-list-item"><div><span>INSIGHT</span><h3>{x.title}</h3><p>{x.excerpt}</p></div><div><small>{x.published?"LIVE":"DRAFT"}</small><button onClick={()=>editInsight(x)}>Edit</button><button className="danger" onClick={()=>removeInsight(x.id)}>Delete</button></div></article>)}</div></section>:null}

  {tab==="services"?<section className="tx-admin-content"><form className="tx-admin-editor" onSubmit={saveService}><div className="tx-admin-card-head"><div><span>{serviceForm.id?"EDIT SERVICE":"NEW SERVICE"}</span><h2>{serviceForm.id?serviceForm.title||"Untitled service":"Add a capability"}</h2></div><button type="button" onClick={newService}>Clear</button></div><div className="tx-admin-form-grid">
   <label>Title<input value={serviceForm.title} onChange={e=>setServiceForm({...serviceForm,title:e.target.value})} required/></label><label>Slug<input value={serviceForm.slug} onChange={e=>setServiceForm({...serviceForm,slug:e.target.value})}/></label>
   <label>Number<input value={serviceForm.number} onChange={e=>setServiceForm({...serviceForm,number:e.target.value})} required/></label><label>Sort order<input type="number" value={serviceForm.sortOrder} onChange={e=>setServiceForm({...serviceForm,sortOrder:Number(e.target.value)})}/></label>
   <label className="wide">Description<textarea value={serviceForm.description} onChange={e=>setServiceForm({...serviceForm,description:e.target.value})} required/></label>
   <label className="wide">Capabilities (separate with |)<input value={serviceForm.capabilities} onChange={e=>setServiceForm({...serviceForm,capabilities:e.target.value})} placeholder="UX / UI|Frontend|AI"/></label>
   <label className="check"><input type="checkbox" checked={serviceForm.published} onChange={e=>setServiceForm({...serviceForm,published:e.target.checked})}/> Published</label>
  </div><button className="tx-button tx-button-gold" disabled={busy}>{busy?"Saving...":serviceForm.id?"Update service ↗":"Create service ↗"}</button></form>
  <div className="tx-admin-list">{services.map(x=><article key={x.id} className="tx-admin-list-item"><div><span>{x.number} · {x.slug}</span><h3>{x.title}</h3><p>{x.description}</p></div><div><small>{x.published?"LIVE":"DRAFT"}</small><button onClick={()=>editService(x)}>Edit</button><button className="danger" onClick={()=>removeService(x.id)}>Delete</button></div></article>)}</div></section>:null}

  {tab==="settings"?<section className="tx-admin-single"><form className="tx-admin-editor tx-admin-settings" onSubmit={saveSettings}><div className="tx-admin-card-head"><div><span>GLOBAL CONFIGURATION</span><h2>Site settings.</h2></div><button type="button" onClick={()=>setSettings(blankSettings)}>Reset form</button></div><div className="tx-admin-form-grid">
   <label>Brand name<input value={settings.brandName} onChange={e=>setSettings({...settings,brandName:e.target.value})}/></label><label>Tagline<input value={settings.tagline} onChange={e=>setSettings({...settings,tagline:e.target.value})}/></label>
   <label className="wide">Hero title<input value={settings.heroTitle} onChange={e=>setSettings({...settings,heroTitle:e.target.value})}/></label><label className="wide">Hero description<textarea value={settings.heroDescription} onChange={e=>setSettings({...settings,heroDescription:e.target.value})}/></label>
   <label>Email<input type="email" value={settings.email} onChange={e=>setSettings({...settings,email:e.target.value})}/></label><label>Location<input value={settings.location} onChange={e=>setSettings({...settings,location:e.target.value})}/></label>
   <label className="wide">Footer note<input value={settings.footerNote} onChange={e=>setSettings({...settings,footerNote:e.target.value})}/></label>
   <label>LinkedIn<input value={settings.linkedinUrl||""} onChange={e=>setSettings({...settings,linkedinUrl:e.target.value})}/></label><label>Instagram<input value={settings.instagramUrl||""} onChange={e=>setSettings({...settings,instagramUrl:e.target.value})}/></label>
   <label>Behance<input value={settings.behanceUrl||""} onChange={e=>setSettings({...settings,behanceUrl:e.target.value})}/></label><label>Dribbble<input value={settings.dribbbleUrl||""} onChange={e=>setSettings({...settings,dribbbleUrl:e.target.value})}/></label>
   <label>Default language<select value={settings.defaultLocale} onChange={e=>setSettings({...settings,defaultLocale:e.target.value as Settings["defaultLocale"]})}><option value="en">English</option><option value="fa">فارسی</option><option value="es">Español</option><option value="de">Deutsch</option></select></label>
   <label>Default theme<select value={settings.defaultTheme} onChange={e=>setSettings({...settings,defaultTheme:e.target.value as Settings["defaultTheme"]})}><option value="dark">Dark</option><option value="light">Light</option></select></label>
  </div><button className="tx-button tx-button-gold" disabled={busy}>{busy?"Saving...":"Save global settings ↗"}</button></form></section>:null}

  {tab==="messages"?<section className="tx-admin-content tx-admin-single"><div className="tx-admin-card-head"><div><span>INBOX</span><h2>Incoming project inquiries.</h2></div><button onClick={()=>void load()}>Refresh</button></div><div className="tx-admin-messages">{messages.map(x=><article key={x.id}><div className="tx-admin-message-head"><div><span>{x.projectType||"General inquiry"}</span><h3>{x.name}</h3><a href={`mailto:${x.email}`}>{x.email}</a>{x.company?<small>{x.company}</small>:null}</div><b className={`status-${x.status.toLowerCase()}`}>{x.status}</b></div><p>{x.message}</p><div className="tx-admin-message-actions">{(["NEW","READ","REPLIED","ARCHIVED"] as const).map(status=><button key={status} className={x.status===status?"active":""} onClick={()=>void updateMessage(x.id,status)}>{status}</button>)}</div></article>)}{!messages.length?<p className="tx-admin-muted">No inquiries yet.</p>:null}</div></section>:null}
 </div></main>;
}
