"use client";

import { FormEvent, useEffect, useState } from "react";

type Message = {
  id: string; name: string; email: string; company: string | null;
  projectType: string | null; message: string; status: string; createdAt: string;
};
type Project = {
  id: string; slug: string; title: string; description: string;
  category: string; year: number; featured: boolean; published: boolean;
};
type Insight = {
  id: string; slug: string; title: string; excerpt: string;
  content: string; published: boolean; publishedAt: string | null;
};

async function api(path: string, options?: RequestInit) {
  const response = await fetch(path, { ...options, headers: { "Content-Type": "application/json", ...(options?.headers || {}) } });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Request failed.");
  return data;
}

export default function AdminDashboard({ email }: { email: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [notice, setNotice] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [insightTitle, setInsightTitle] = useState("");

  async function load() {
    try {
      const [m, p, i] = await Promise.all([
        api("/api/admin/messages"),
        api("/api/admin/projects"),
        api("/api/admin/insights")
      ]);
      setMessages(m.data); setProjects(p.data); setInsights(i.data);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Unable to load dashboard.");
    }
  }

  useEffect(() => { void load(); }, []);

  async function createProject(event: FormEvent) {
    event.preventDefault();
    try {
      await api("/api/admin/projects", {
        method: "POST",
        body: JSON.stringify({
          slug: projectTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
          title: projectTitle,
          description: "New Tranos project.",
          category: "Digital",
          year: new Date().getFullYear(),
          published: true,
          featured: false
        })
      });
      setProjectTitle(""); setNotice("Project created."); await load();
    } catch (error) { setNotice(error instanceof Error ? error.message : "Unable to create project."); }
  }

  async function createInsight(event: FormEvent) {
    event.preventDefault();
    try {
      await api("/api/admin/insights", {
        method: "POST",
        body: JSON.stringify({
          slug: insightTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
          title: insightTitle,
          excerpt: "New Tranos insight.",
          content: "Start writing your insight here.",
          published: false
        })
      });
      setInsightTitle(""); setNotice("Insight created."); await load();
    } catch (error) { setNotice(error instanceof Error ? error.message : "Unable to create insight."); }
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/control-center/login";
  }

  async function archiveMessage(id: string) {
    try {
      await api(`/api/admin/messages/${id}`, { method: "PATCH", body: JSON.stringify({ status: "ARCHIVED" }) });
      setNotice("Message archived."); await load();
    } catch (error) { setNotice(error instanceof Error ? error.message : "Unable to update message."); }
  }

  async function deleteProject(id: string) {
    if (!window.confirm("Delete this project?")) return;
    try { await api(`/api/admin/projects/${id}`, { method: "DELETE" }); setNotice("Project deleted."); await load(); }
    catch (error) { setNotice(error instanceof Error ? error.message : "Unable to delete project."); }
  }

  async function deleteInsight(id: string) {
    if (!window.confirm("Delete this insight?")) return;
    try { await api(`/api/admin/insights/${id}`, { method: "DELETE" }); setNotice("Insight deleted."); await load(); }
    catch (error) { setNotice(error instanceof Error ? error.message : "Unable to delete insight."); }
  }

  return (
    <main className="adminShell adminWide">
      <div className="adminTopbar">
        <div>
          <div className="eyebrow">Tranos / Control Center</div>
          <h1>Command center.</h1>
          <p>{email}</p>
        </div>
        <div className="adminTopActions">
          <a className="btn" href="/">View site ↗</a>
          <button className="btn" onClick={logout}>Logout</button>
        </div>
      </div>

      {notice ? <div className="adminNotice">{notice}</div> : null}

      <section className="adminGrid">
        <div className="adminPanel">
          <div className="adminPanelHead"><h2>Messages</h2><span>{messages.length}</span></div>
          <div className="adminList">
            {messages.length === 0 ? <p className="adminMuted">No messages yet.</p> : messages.map((item) => (
              <article className="adminItem" key={item.id}>
                <div><strong>{item.name}</strong><span>{item.email}</span></div>
                <p>{item.message}</p>
                <div className="adminMeta">{item.projectType || "General"} · {item.status}</div>
                {item.status !== "ARCHIVED" ? <button className="textButton" onClick={() => archiveMessage(item.id)}>Archive</button> : null}
              </article>
            ))}
          </div>
        </div>

        <div className="adminPanel">
          <div className="adminPanelHead"><h2>Projects</h2><span>{projects.length}</span></div>
          <form className="adminInlineForm" onSubmit={createProject}>
            <input value={projectTitle} onChange={(e) => setProjectTitle(e.target.value)} placeholder="Project title" required />
            <button className="btn primary" type="submit">Create</button>
          </form>
          <div className="adminList">
            {projects.map((item) => (
              <article className="adminItem compact" key={item.id}>
                <div><strong>{item.title}</strong><span>{item.category} · {item.year}</span></div>
                <button className="textButton danger" onClick={() => deleteProject(item.id)}>Delete</button>
              </article>
            ))}
          </div>
        </div>

        <div className="adminPanel">
          <div className="adminPanelHead"><h2>Insights</h2><span>{insights.length}</span></div>
          <form className="adminInlineForm" onSubmit={createInsight}>
            <input value={insightTitle} onChange={(e) => setInsightTitle(e.target.value)} placeholder="Insight title" required />
            <button className="btn primary" type="submit">Create</button>
          </form>
          <div className="adminList">
            {insights.map((item) => (
              <article className="adminItem compact" key={item.id}>
                <div><strong>{item.title}</strong><span>{item.published ? "Published" : "Draft"}</span></div>
                <button className="textButton danger" onClick={() => deleteInsight(item.id)}>Delete</button>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
