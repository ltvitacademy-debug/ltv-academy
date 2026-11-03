"use client";

import { useState } from "react";
import Link from "next/link";

type HistoryEntry = {
  sessionId: string;
  careerPath: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  status: "in-progress" | "interrupted" | "complete";
  outcome: "pass" | "fail" | "incomplete" | "needs-review" | null;
  overallScore: number | null;
  startedAt: string;
  completedAt: string | null;
  hasCertificate: boolean;
};

function outcomeLabel(entry: HistoryEntry): string {
  if (!entry.outcome) return entry.status === "complete" ? "Report pending" : "In progress";
  if (entry.outcome === "pass") return entry.hasCertificate ? "Passed — Certificate Earned" : "Passed";
  if (entry.outcome === "needs-review") return "Pending review";
  if (entry.outcome === "incomplete") return "Incomplete";
  return "Not passed";
}

export default function MockInterviewHistoryPage() {
  const [email, setEmail] = useState("");
  const [history, setHistory] = useState<HistoryEntry[] | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadHistory(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setPending(true);
    setError(null);
    try {
      const res = await fetch(`/api/mock-interview-history?devStudentEmail=${encodeURIComponent(email.trim())}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Could not load your history.");
      setHistory(data.history);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm text-stone">
        <Link href="/app/mock-interview" className="hover:text-crimson">
          Professional Mock Interview
        </Link>
        {" · "}
        <span>My history</span>
      </nav>

      <p className="eyebrow mb-2">Interview history</p>
      <h1 className="display text-3xl">Every attempt, in one place.</h1>
      <p className="mt-3 max-w-xl text-stone">
        See your past Professional Mock Interview attempts, scores, and reports, and track your
        improvement over time.
      </p>

      <form onSubmit={loadHistory} className="mt-6 flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com (development preview)"
          className="flex-1 border border-ink/15 bg-white p-3 text-sm text-ink focus:border-crimson focus:outline-none"
        />
        <button
          type="submit"
          disabled={pending}
          className="rounded-[2px] bg-crimson px-6 py-3 text-sm font-semibold text-parchment enabled:hover:bg-crimson-deep disabled:opacity-40"
        >
          {pending ? "Loading…" : "View my history"}
        </button>
      </form>

      {error && <p className="mt-4 text-sm text-crimson">{error}</p>}

      {history && (
        <div className="mt-8 space-y-3">
          {history.length === 0 && <p className="text-sm text-stone">No interviews yet for this email.</p>}
          {history.map((entry) => (
            <Link
              key={entry.sessionId}
              // An unfinished session resumes the interview itself (spec
              // Phase D priority 6 — never a second credit just to
              // continue); a finished one opens its report.
              href={
                entry.status === "complete"
                  ? `/app/mock-interview/report?sessionId=${entry.sessionId}`
                  : `/app/mock-interview/session?path=${entry.careerPath}&difficulty=${entry.difficulty}&resume=${entry.sessionId}`
              }
              className="block border border-ink/15 bg-white p-4 transition hover:border-crimson"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold capitalize text-ink">
                    {entry.careerPath.replace(/-/g, " ")} — {entry.difficulty}
                  </p>
                  <p className="text-xs text-stone">
                    Started {new Date(entry.startedAt).toLocaleDateString()}
                    {entry.completedAt ? ` · Completed ${new Date(entry.completedAt).toLocaleDateString()}` : ""}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-crimson-deep">{outcomeLabel(entry)}</p>
                  {entry.overallScore !== null && <p className="text-xs text-stone">{entry.overallScore}/100</p>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
