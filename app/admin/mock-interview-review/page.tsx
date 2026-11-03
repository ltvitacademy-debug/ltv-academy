"use client";

import { useState } from "react";

type GradedItem = {
  itemId: string;
  itemType: string;
  questionAsked: string;
  studentAnswer: string;
  rubric: string;
  verdict: "met" | "not-met" | "needs-review";
  score: number;
  explanation: string;
};

type AdminReviewSession = {
  sessionId: string;
  careerPath: string;
  difficulty: string;
  studentEmail: string;
  startedAt: string;
  itemsNeedingReview: GradedItem[];
};

type Resolution = { verdict: "met" | "not-met"; score: string; adminNote: string };

export default function MockInterviewAdminReviewPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Held only in memory (not localStorage/sessionStorage) — an admin
  // session that can resolve real students' grading decisions and
  // certificates is worth re-entering a password for after a refresh,
  // rather than leaving it sitting in browser storage.
  const [token, setToken] = useState<string | null>(null);
  const [sessions, setSessions] = useState<AdminReviewSession[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [resolutions, setResolutions] = useState<Record<string, Record<string, Resolution>>>({});
  const [submitting, setSubmitting] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function login() {
    setPending(true);
    setError(null);
    setMessage(null);
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
    setMessage(null);
    try {
      const res = await fetch("/api/mock-interview-admin-review", { headers: { authorization: `Bearer ${activeToken}` } });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Not authorized.");
      setSessions(data.sessions);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setSessions(null);
    } finally {
      setPending(false);
    }
  }

  function setResolution(sessionId: string, itemId: string, patch: Partial<Resolution>) {
    setResolutions((prev) => {
      const existing: Resolution = prev[sessionId]?.[itemId] ?? { verdict: "met", score: "", adminNote: "" };
      return {
        ...prev,
        [sessionId]: {
          ...prev[sessionId],
          [itemId]: { ...existing, ...patch },
        },
      };
    });
  }

  async function submitSession(sessionId: string, items: GradedItem[]) {
    const sessionResolutions = resolutions[sessionId] ?? {};
    const unresolved = items.filter((i) => !sessionResolutions[i.itemId]);
    if (unresolved.length > 0) {
      setError(`Choose a verdict for every item before submitting (missing: ${unresolved.map((i) => i.itemId).join(", ")}).`);
      return;
    }
    setSubmitting(sessionId);
    setError(null);
    try {
      const res = await fetch("/api/mock-interview-admin-review", {
        method: "POST",
        headers: { "content-type": "application/json", authorization: `Bearer ${token}` },
        body: JSON.stringify({
          sessionId,
          adminName: "Bill Green",
          resolutions: items.map((i) => {
            const r = sessionResolutions[i.itemId];
            return {
              itemId: i.itemId,
              verdict: r.verdict,
              score: r.score.trim() ? Number(r.score) : undefined,
              adminNote: r.adminNote.trim() || undefined,
            };
          }),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Could not resolve this session.");
      setMessage(`Resolved — new outcome: ${data.scored.outcome}.`);
      setSessions((prev) => prev?.filter((s) => s.sessionId !== sessionId) ?? null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(null);
    }
  }

  return (
    <main className="mx-auto min-h-screen max-w-4xl bg-parchment px-4 py-10 sm:px-6">
      <p className="eyebrow mb-2">Administrator only</p>
      <h1 className="display text-3xl text-ink">Mock Interview — Review Queue</h1>
      <p className="mt-2 max-w-2xl text-sm text-stone">
        Sessions where the AI grader couldn&apos;t reliably judge an answer land here instead of being
        auto-failed. Resolve every flagged item to finalize the session&apos;s outcome.
      </p>

      {!token && (
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Admin email"
            className="flex-1 border border-ink/15 bg-white p-3 text-sm text-ink focus:border-crimson focus:outline-none"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            onKeyDown={(e) => e.key === "Enter" && login()}
            className="flex-1 border border-ink/15 bg-white p-3 text-sm text-ink focus:border-crimson focus:outline-none"
          />
          <button
            type="button"
            onClick={login}
            disabled={pending || !email || !password}
            className="rounded-[2px] bg-crimson px-6 py-3 text-sm font-semibold text-parchment enabled:hover:bg-crimson-deep disabled:opacity-40"
          >
            {pending ? "Logging in…" : "Log in"}
          </button>
        </div>
      )}

      {token && (
        <div className="mt-6 flex items-center justify-between border border-ink/15 bg-white p-3 text-sm">
          <span className="text-stone">Logged in as {email}</span>
          <button
            type="button"
            onClick={() => {
              setToken(null);
              setSessions(null);
            }}
            className="text-crimson hover:text-crimson-deep"
          >
            Log out
          </button>
        </div>
      )}

      {error && <p className="mt-4 text-sm text-crimson">{error}</p>}
      {message && <p className="mt-4 text-sm text-crimson-deep">{message}</p>}

      {sessions && sessions.length === 0 && <p className="mt-8 text-sm text-stone">Nothing needs review right now.</p>}

      <div className="mt-8 space-y-10">
        {sessions?.map((s) => (
          <section key={s.sessionId} className="border border-ink/15 bg-white p-6">
            <p className="font-semibold capitalize text-ink">
              {s.careerPath.replace(/-/g, " ")} — {s.difficulty}
            </p>
            <p className="text-xs text-stone">
              {s.studentEmail} · Started {new Date(s.startedAt).toLocaleString()}
            </p>

            <div className="mt-4 space-y-5">
              {s.itemsNeedingReview.map((item) => {
                const r = resolutions[s.sessionId]?.[item.itemId];
                return (
                  <div key={item.itemId} className="border border-gold/40 bg-gold/5 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-crimson-deep">{item.itemType}</p>
                    <p className="mt-2 whitespace-pre-wrap text-sm font-semibold text-ink">{item.questionAsked}</p>
                    <p className="mt-2 whitespace-pre-wrap text-sm text-stone">
                      <span className="font-semibold text-ink">Student answer: </span>
                      {item.studentAnswer || "(no response recorded)"}
                    </p>
                    <p className="mt-2 whitespace-pre-wrap text-xs text-stone">
                      <span className="font-semibold text-ink">Rubric: </span>
                      {item.rubric}
                    </p>
                    <p className="mt-2 text-sm text-ink">
                      <span className="font-semibold">AI grader&apos;s note: </span>
                      {item.explanation}
                    </p>

                    <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
                      <label className="text-sm">
                        <span className="mb-1 block font-semibold text-ink">Verdict</span>
                        <select
                          value={r?.verdict ?? "met"}
                          onChange={(e) => setResolution(s.sessionId, item.itemId, { verdict: e.target.value as "met" | "not-met" })}
                          className="border border-ink/15 bg-white p-2 text-sm"
                        >
                          <option value="met">Met</option>
                          <option value="not-met">Not met</option>
                        </select>
                      </label>
                      <label className="text-sm">
                        <span className="mb-1 block font-semibold text-ink">Score (optional)</span>
                        <input
                          value={r?.score ?? ""}
                          onChange={(e) => setResolution(s.sessionId, item.itemId, { score: e.target.value })}
                          placeholder={String(item.score)}
                          className="w-24 border border-ink/15 bg-white p-2 text-sm"
                        />
                      </label>
                      <label className="flex-1 text-sm">
                        <span className="mb-1 block font-semibold text-ink">Admin note (optional)</span>
                        <input
                          value={r?.adminNote ?? ""}
                          onChange={(e) => setResolution(s.sessionId, item.itemId, { adminNote: e.target.value })}
                          placeholder="Why you made this call"
                          className="w-full border border-ink/15 bg-white p-2 text-sm"
                        />
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => submitSession(s.sessionId, s.itemsNeedingReview)}
              disabled={submitting === s.sessionId}
              className="mt-5 rounded-[2px] bg-crimson px-6 py-3 text-sm font-semibold text-parchment enabled:hover:bg-crimson-deep disabled:opacity-40"
            >
              {submitting === s.sessionId ? "Submitting…" : "Submit resolutions"}
            </button>
          </section>
        ))}
      </div>
    </main>
  );
}
