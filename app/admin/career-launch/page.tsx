"use client";

import { useState } from "react";
import type { AdminJobApplicationDTO } from "@/lib/careerLaunchTypes";

export default function CareerLaunchAdminQueuePage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Held only in memory, same convention as the Mock Interview admin queue —
  // never localStorage/sessionStorage for a token that can act on real
  // students' applications.
  const [token, setToken] = useState<string | null>(null);
  const [queue, setQueue] = useState<AdminJobApplicationDTO[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<string | null>(null);

  async function login() {
    setPending(true);
    setError(null);
    try {
      const res = await fetch("/api/admin-login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Invalid email or password.");
      setToken(data.token);
      setPassword("");
      await loadQueue(data.token);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setPending(false);
    }
  }

  async function loadQueue(tokenOverride?: string) {
    const activeToken = tokenOverride ?? token;
    if (!activeToken) return;
    setPending(true);
    setError(null);
    try {
      const res = await fetch("/api/career-launch-admin-review", { headers: { authorization: `Bearer ${activeToken}` } });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Not authorized.");
      setQueue(data.applications);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setQueue(null);
    } finally {
      setPending(false);
    }
  }

  async function decide(applicationId: string, decision: "approve" | "reject") {
    if (!token) return;
    setSubmitting(applicationId);
    setError(null);
    try {
      const res = await fetch("/api/career-launch-admin-review", {
        method: "POST",
        headers: { "content-type": "application/json", authorization: `Bearer ${token}` },
        body: JSON.stringify({ applicationId, decision, adminName: email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Could not update this application.");
      setQueue((prev) => (prev ? prev.map((a) => (a.id === applicationId ? data.application : a)) : prev));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(null);
    }
  }

  if (!token) {
    return (
      <main className="mx-auto min-h-screen max-w-sm bg-parchment px-4 py-16 sm:px-6">
        <p className="eyebrow mb-2">Staff only</p>
        <h1 className="display text-2xl text-ink">LTV Career Launch — Review Queue</h1>
        <form
          className="mt-8 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            login();
          }}
        >
          <label className="block">
            <span className="mb-1 block text-sm font-semibold text-ink">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-ink/15 bg-white p-3 text-sm text-ink focus:border-crimson focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-semibold text-ink">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-ink/15 bg-white p-3 text-sm text-ink focus:border-crimson focus:outline-none"
            />
          </label>
          {error && <p className="text-sm text-crimson-deep">{error}</p>}
          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-[2px] bg-crimson px-6 py-3 text-sm font-semibold text-parchment hover:bg-crimson-deep disabled:opacity-50"
          >
            {pending ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </main>
    );
  }

  const pendingItems = (queue ?? []).filter((a) => a.status === "tailored" || a.status === "staff_review");

  return (
    <main className="mx-auto min-h-screen max-w-4xl bg-parchment px-4 py-10 sm:px-6">
      <p className="eyebrow mb-2">Staff only</p>
      <h1 className="display text-3xl text-ink">LTV Career Launch — Review Queue</h1>
      <p className="mt-2 max-w-2xl text-sm text-stone">
        Every AI-tailored application lands here before it goes out. Approving marks it
        &quot;submitted&quot; — the actual application still goes out by hand; there&apos;s no
        automated submission channel yet.
      </p>

      <div className="mt-6 flex items-center gap-4 border border-ink/15 bg-white p-3 text-sm">
        <span className="text-stone">
          <strong className="text-ink">{pendingItems.length}</strong> pending review
        </span>
        <span className="text-stone">·</span>
        <span className="text-stone">
          <strong className="text-ink">{queue?.length ?? 0}</strong> total in queue
        </span>
      </div>

      {error && <p className="mt-4 border border-crimson/40 bg-crimson/5 p-3 text-sm text-crimson-deep">{error}</p>}

      {pendingItems.length === 0 && queue !== null && (
        <p className="mt-8 text-sm text-stone">Nothing left in the queue — nice work.</p>
      )}

      <div className="mt-8 space-y-4">
        {pendingItems.map((app) => {
          const isOpen = expanded === app.id;
          return (
            <section key={app.id} className="border border-ink/15 bg-white p-6">
              <button
                type="button"
                onClick={() => setExpanded(isOpen ? null : app.id)}
                className="flex w-full items-start justify-between gap-4 text-left"
              >
                <div>
                  <p className="font-semibold text-ink">
                    {app.studentName ?? app.studentEmail}{" "}
                    <span className="font-normal text-stone">
                      → {app.posting.title}, {app.posting.company}
                    </span>
                  </p>
                  <p className="mt-0.5 text-xs text-stone">
                    {app.posting.location} · Found {new Date(app.createdAt).toLocaleDateString()}
                  </p>
                </div>
                {app.matchScore !== null && (
                  <span className="whitespace-nowrap rounded-[2px] bg-gold/30 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-crimson-deep">
                    {app.matchScore}% match
                  </span>
                )}
              </button>

              {isOpen && (
                <div className="mt-5 space-y-5 border-t border-ink/10 pt-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-stone">Original posting</p>
                    <p className="mt-1 text-sm text-ink">{app.posting.rawSummary}</p>
                    <a href={app.posting.sourceUrl} target="_blank" rel="noreferrer" className="mt-1 inline-block text-xs text-crimson hover:underline">
                      View posting ↗
                    </a>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-crimson-deep">AI-tailored resume</p>
                    <p className="mt-1 whitespace-pre-wrap border border-gold/40 bg-gold/5 p-3 text-sm text-ink">
                      {app.tailoredResumeText}
                    </p>
                  </div>

                  {app.coverLetterText && (
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-crimson-deep">Cover letter</p>
                      <p className="mt-1 whitespace-pre-wrap text-sm italic text-stone">{app.coverLetterText}</p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => decide(app.id, "approve")}
                      disabled={submitting === app.id}
                      className="rounded-[2px] bg-crimson px-6 py-3 text-sm font-semibold text-parchment hover:bg-crimson-deep disabled:opacity-50"
                    >
                      Approve &amp; mark submitted
                    </button>
                    <button
                      type="button"
                      onClick={() => decide(app.id, "reject")}
                      disabled={submitting === app.id}
                      className="rounded-[2px] border border-crimson/30 px-6 py-3 text-sm font-semibold text-crimson hover:bg-crimson/5 disabled:opacity-50"
                    >
                      Reject match
                    </button>
                  </div>
                </div>
              )}
            </section>
          );
        })}
      </div>
    </main>
  );
}
