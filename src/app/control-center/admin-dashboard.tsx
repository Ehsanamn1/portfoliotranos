"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type Message={id:string;name:string;email:string;company:string|null;projectType:string|null;message:string;status:"NEW"|"READ"|"REPLIED"|"ARCHIVED";createdAt:string};
type Project={id:string;slug:string;title:string;description:string;category:string;year:number;featured:boolean;published:boolean;imageUrl:string|null;sortOrder:number};
type Insight={id:string;slug:string;title:string;excerpt:string;content:string;coverImageUrl:string|null;published:boolean;publishedAt:string|null};

async function api(path:string,options?:RequestInit){
 const response=await fetch(path,{...options,headers:{"Content-Type":"application/json",...(options?.headers||{})}});
 const data=await response.json();if(!response.ok)throw new Error(data.error||"Request failed.");return data;
}
function slugify(value:string){return value.toLowerCase().trim().replace(/[^a-z0-9]+/g,"-").replace(/(^-|-$)/g,"");}

export default function AdminDashboard({email}:{email:string}){
 const [messages,setMessages]=useState<Message[]>([]),[projects,setProjects]=useState<Project[]>([]),[insights,setInsights]=useState<Insight[]>([]);
 const [tab,setTab]=useState<"overview"|"projects"|"insights"|"messages">("overview"),[notice,setNotice]=useState(""),[busy,setBusy]=useState(false);
 const [projectForm,setProjectForm]=useState({id:"",slug:"",title:"",description:"",category:"Digital Product",year:new Date().getFullYear(),featured:false,published:true,imageUrl:"",sortOrder:0});
 const [insightForm,setInsightForm]=useState({id:"",slug:"",title:"",excerpt:"",content:"",coverImageUrl:"",published:false,publishedAt:""});

 async function load(){
  setBusy(true);
  try{const [m,p,i]=await Promise.all([api("/api/admin/messages"),api("/api/admin/projects"),api("/api/admin/insights")]);setMessages(m.data);setProjects(p.data);setInsights(i.data);}
  catch(error){setNotice(error instanceof Error?error.message:"Unable to load dashboard.");}finally{setBusy(false);}
 }
 useEffect(()=>{void load();},[]);
 const unread=useMemo(()=>messages.filter(x=>x.status==="NEW").length,[messages]);
 const publishedProjects=useMemo(()=>projects.filter(x=>x.published).length,[projects]);
 const publishedInsights=useMemo(()=>insights.filter(x=>x.published).length,[insights]);

 function newProject(){setProjectForm({id:"",slug:"",title:"",description:"",category:"Digital Product",year:new Date().getFullYear(),featured:false,published:true,imageUrl:"",sortOrder:0});setTab("projects");}
 function editProject(item:Project){setProjectForm({...item,imageUrl:item.imageUrl||""});setTab("projects");window.scrollTo({top:0,behavior:"smooth"});}
 async function saveProject(event:FormEvent){event.preventDefault();try{setBusy(true);const payload={...projectForm,slug:projectForm.slug||slugify(projectForm.title)};if(projectForm.id){await api(`/api/admin/projects/${projectForm.id}`,{method:"PATCH",body:JSON.stringify(payload)});setNotice("Project updated.");}else{await api("/api/admin/projects",{method:"POST",body:JSON.stringify(payload)});setNotice("Project created and synced to the public site.");}await load();newProject();}catch(error){setNotice(error instanceof Error?error.message:"Unable to save project.");}finally{setBusy(false);}}
 function newInsight(){setInsightForm({id:"",slug:"",title:"",excerpt:"",content:"",coverImageUrl:"",published:false,publishedAt:""});setTab("insights");}
 function editInsight(item:Insight){setInsightForm({id:item.id,slug:item.slug,title:item.title,excerpt:item.excerpt,content:item.content,coverImageUrl:item.coverImageUrl||"",published:item.published,publishedAt:item.publishedAt?new Date(item.publishedAt).toISOString().slice(0,16):""});setTab("insights");window.scrollTo({top:0,behavior:"smooth"});}
 async function saveInsight(event:FormEvent){event.preventDefault();try{setBusy(true);const payload={...insightForm,slug:insightForm.slug||slugify(insightForm.title),publishedAt:insightForm.publishedAt?new Date(insightForm.publishedAt).toISOString():null};if(insightForm.id){await api(`/api/admin/insights/${insightForm.id}`,{method:"PATCH",body:JSON.stringify(payload)});setNotice("Insight updated.");}else{await api("/api/admin/insights",{method:"POST",body:JSON.stringify(payload)});setNotice("Insight created.");}await load();newInsight();}catch(error){setNotice(error instanceof Error?error.message:"Unable to save insight.");}finally{setBusy(false);}}
 async function updateMessage(id:string,status:Message["status"]){try{await api(`/api/admin/messages/${id}`,{method:"PATCH",body:JSON.stringify({status})});setNotice("Message status updated.");await load();}catch(error){setNotice(error instanceof Error?error.message:"Unable to update message.");}}
 async function removeProject(id:string){if(!window.confirm("Delete this project permanently?"))return;try{await api(`/api/admin/projects/${id}`,{method:"DELETE"});setNotice("Project deleted.");await load();}catch(error){setNotice(error instanceof Error?error.message:"Unable to delete project.");}}
 async function removeInsight(id:string){if(!window.confirm("Delete this insight permanently?"))return;try{await api(`/api/admin/insights/${id}`,{method:"DELETE"});setNotice("Insight deleted.");await load();}catch(error){setNotice(error instanceof Error?error.message:"Unable to delete insight.");}}
 async function logout(){await fetch("/api/auth/logout",{method:"POST"});window.location.href="/control-center/login";}

 return <main className="tx-admin-page"><div className="tx-admin-shell">
  <header className="tx-admin-top"><div><span>TRANOS / CONTROL CENTER</span><h1>Command center.</h1><p>{email}</p></div><div className="tx-admin-actions"><a href="/" className="tx-admin-button">View site ↗</a><button className="tx-admin-button" onClick={logout}>Logout</button></div></header>
  {notice?<div className="tx-admin-notice">{notice}</div>:null}
  <nav className="tx-admin-tabs">{[["overview","Overview"],["projects","Projects"],["insights","Insights"],["messages","Messages"]].map(([key,label])=><button key={key} className={tab===key?"active":""} onClick={()=>setTab(key as typeof tab)}>{label}{key==="messages"&&unread?<b>{unread}</b>:null}</button>)}</nav>

  {tab==="overview"?<section className="tx-admin-overview">
    <div className="tx-admin-stat"><span>Total Projects</span><strong>{projects.length}</strong><small>{publishedProjects} published</small></div>
    <div className="tx-admin-stat"><span>Total Insights</span><strong>{insights.length}</strong><small>{publishedInsights} published</small></div>
    <div className="tx-admin-stat"><span>New Messages</span><strong>{unread}</strong><small>{messages.length} total inquiries</small></div>
    <div className="tx-admin-card tx-admin-wide-card"><div className="tx-admin-card-head"><div><span>CONTENT FLOW</span><h2>Keep the public site moving.</h2></div><div className="tx-admin-card-actions"><button onClick={newProject}>New project</button><button onClick={newInsight}>New insight</button></div></div><div className="tx-admin-feed">
      {projects.slice(0,4).map(x=><div key={x.id}><span>PROJECT</span><b>{x.title}</b><small>{x.published?"Published":"Draft"}</small><button onClick={()=>editProject(x)}>Edit</button></div>)}
      {insights.slice(0,3).map(x=><div key={x.id}><span>INSIGHT</span><b>{x.title}</b><small>{x.published?"Published":"Draft"}</small><button onClick={()=>editInsight(x)}>Edit</button></div>)}
      {!busy&&!projects.length&&!insights.length?<p className="tx-admin-muted">No content yet. Create your first project or insight.</p>:null}
    </div></div>
  </section>:null}

  {tab==="projects"?<section className="tx-admin-content">
    <form className="tx-admin-editor" onSubmit={saveProject}><div className="tx-admin-card-head"><div><span>{projectForm.id?"EDIT PROJECT":"NEW PROJECT"}</span><h2>{projectForm.id?projectForm.title||"Untitled project":"Create a project"}</h2></div><button type="button" onClick={newProject}>Clear</button></div>
      <div className="tx-admin-form-grid">
        <label>Title<input value={projectForm.title} onChange={e=>setProjectForm({...projectForm,title:e.target.value})} required/></label>
        <label>Slug<input value={projectForm.slug} onChange={e=>setProjectForm({...projectForm,slug:e.target.value})} placeholder="auto-generated"/></label>
        <label>Category<input value={projectForm.category} onChange={e=>setProjectForm({...projectForm,category:e.target.value})} required/></label>
        <label>Year<input type="number" value={projectForm.year} onChange={e=>setProjectForm({...projectForm,year:Number(e.target.value)})} required/></label>
        <label className="wide">Description<textarea value={projectForm.description} onChange={e=>setProjectForm({...projectForm,description:e.target.value})} required/></label>
        <label className="wide">Image URL<input value={projectForm.imageUrl} onChange={e=>setProjectForm({...projectForm,imageUrl:e.target.value})} placeholder="https://..."/></label>
        <label>Sort order<input type="number" value={projectForm.sortOrder} onChange={e=>setProjectForm({...projectForm,sortOrder:Number(e.target.value)})}/></label>
        <label className="check"><input type="checkbox" checked={projectForm.featured} onChange={e=>setProjectForm({...projectForm,featured:e.target.checked})}/> Featured</label>
        <label className="check"><input type="checkbox" checked={projectForm.published} onChange={e=>setProjectForm({...projectForm,published:e.target.checked})}/> Published</label>
      </div>
      <button className="tx-button tx-button-gold" disabled={busy}>{busy?"Saving...":projectForm.id?"Update project ↗":"Create project ↗"}</button>
    </form>
    <div className="tx-admin-list">{projects.map(x=><article key={x.id} className="tx-admin-list-item"><div><span>{x.category} · {x.year}</span><h3>{x.title}</h3><p>{x.description}</p></div><div><small>{x.published?"LIVE":"DRAFT"}</small><button onClick={()=>editProject(x)}>Edit</button><button className="danger" onClick={()=>removeProject(x.id)}>Delete</button></div></article>)}</div>
  </section>:null}

  {tab==="insights"?<section className="tx-admin-content">
    <form className="tx-admin-editor" onSubmit={saveInsight}><div className="tx-admin-card-head"><div><span>{insightForm.id?"EDIT INSIGHT":"NEW INSIGHT"}</span><h2>{insightForm.id?insightForm.title||"Untitled insight":"Write an insight"}</h2></div><button type="button" onClick={newInsight}>Clear</button></div>
      <div className="tx-admin-form-grid">
        <label>Title<input value={insightForm.title} onChange={e=>setInsightForm({...insightForm,title:e.target.value})} required/></label>
        <label>Slug<input value={insightForm.slug} onChange={e=>setInsightForm({...insightForm,slug:e.target.value})} placeholder="auto-generated"/></label>
        <label className="wide">Excerpt<input value={insightForm.excerpt} onChange={e=>setInsightForm({...insightForm,excerpt:e.target.value})} required/></label>
        <label className="wide">Cover image URL<input value={insightForm.coverImageUrl} onChange={e=>setInsightForm({...insightForm,coverImageUrl:e.target.value})} placeholder="https://..."/></label>
        <label className="wide">Content<textarea className="tx-admin-editor-textarea" value={insightForm.content} onChange={e=>setInsightForm({...insightForm,content:e.target.value})} required/></label>
        <label>Publish date<input type="datetime-local" value={insightForm.publishedAt} onChange={e=>setInsightForm({...insightForm,publishedAt:e.target.value})}/></label>
        <label className="check"><input type="checkbox" checked={insightForm.published} onChange={e=>setInsightForm({...insightForm,published:e.target.checked})}/> Published</label>
      </div>
      <button className="tx-button tx-button-gold" disabled={busy}>{busy?"Saving...":insightForm.id?"Update insight ↗":"Create insight ↗"}</button>
    </form>
    <div className="tx-admin-list">{insights.map(x=><article key={x.id} className="tx-admin-list-item"><div><span>INSIGHT</span><h3>{x.title}</h3><p>{x.excerpt}</p></div><div><small>{x.published?"LIVE":"DRAFT"}</small><button onClick={()=>editInsight(x)}>Edit</button><button className="danger" onClick={()=>removeInsight(x.id)}>Delete</button></div></article>)}</div>
  </section>:null}

  {tab==="messages"?<section className="tx-admin-content tx-admin-single"><div className="tx-admin-card-head"><div><span>INBOX</span><h2>Incoming project inquiries.</h2></div><button onClick={()=>void load()}>Refresh</button></div><div className="tx-admin-messages">
    {messages.map(x=><article key={x.id}><div className="tx-admin-message-head"><div><span>{x.projectType||"General inquiry"}</span><h3>{x.name}</h3><a href={`mailto:${x.email}`}>{x.email}</a>{x.company?<small>{x.company}</small>:null}</div><b className={`status-${x.status.toLowerCase()}`}>{x.status}</b></div><p>{x.message}</p><div className="tx-admin-message-actions">{(["NEW","READ","REPLIED","ARCHIVED"] as const).map(status=><button key={status} className={x.status===status?"active":""} onClick={()=>void updateMessage(x.id,status)}>{status}</button>)}</div></article>)}
    {!messages.length?<p className="tx-admin-muted">No inquiries yet.</p>:null}
  </div></section>:null}
 </div></main>;
}
