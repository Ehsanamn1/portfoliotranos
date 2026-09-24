"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function ControlCenterLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Login failed.");
      router.replace("/control-center");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="adminShell">
      <section className="adminCard">
        <div className="eyebrow">Tranos / Control Center</div>
        <h1>Admin access.</h1>
        <p>Sign in to manage projects, insights and incoming messages.</p>
        <form onSubmit={submit} className="adminForm">
          <label>
            Email
            <input type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label>
            Password
            <input type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />
          </label>
          {error ? <div className="adminError">{error}</div> : null}
          <button className="btn primary" type="submit" disabled={loading}>
            {loading ? "Authenticating…" : "Enter Control Center ↗"}
          </button>
        </form>
        <a className="adminBack" href="/">← Back to site</a>
      </section>
    </main>
  );
}
