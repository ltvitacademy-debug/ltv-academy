"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const DEV_EMAIL_KEY = "careerLaunchDevEmail";

export default function CareerLaunchResumePage() {
  const [devEmail, setDevEmail] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [savedText, setSavedText] = useState("");
  const [approvedAt, setApprovedAt] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    setDevEmail(window.localStorage.getItem(DEV_EMAIL_KEY) ?? "");
  }, []);

  useEffect(() => {
    const query = devEmail ? `?devStudentEmail=${encodeURIComponent(devEmail)}` : "";
    fetch(`/api/career-launch-resume${query}`)
      .then((res) => res.json())
      .then((data: { baseResumeText: string | null; baseResumeApprovedAt: string | null; error?: string }) => {
        if (data.error) {
          setError(data.error);
          return;
        }
        setResumeText(data.baseResumeText ?? "");
        setSavedText(data.baseResumeText ?? "");
        setApprovedAt(data.baseResumeApprovedAt);
        setLoaded(true);
      })
      .catch(() => setError("Could not load your resume."));
  }, [devEmail]);

  async function handleSave() {
    setStatus(null);
    setError(null);
    try {
      const res = await fetch("/api/career-launch-resume", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ devStudentEmail: devEmail || undefined, baseResumeText: resumeText }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        return;
      }
      setSavedText(resumeText);
      setApprovedAt(null);
      setStatus("Saved. Approve below when it's ready to use.");
    } catch {
      setError("Could not save your resume.");
    }
  }

  async function handleApprove() {
    setStatus(null);
    setError(null);
    try {
      const res = await fetch("/api/career-launch-resume", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ devStudentEmail: devEmail || undefined, action: "approve" }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        return;
      }
      setApprovedAt(data.baseResumeApprovedAt);
      setStatus("Approved. New matches can now be tailored from this version.");
    } catch {
      setError("Could not approve your resume.");
    }
  }

  const hasUnsavedChanges = resumeText !== savedText;

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm text-stone">
        <Link href="/app/career-launch" className="hover:text-crimson">
          LTV Career Launch
        </Link>
        {" · "}
        <span>Base resume</span>
      </nav>

      <p className="eyebrow mb-3">One resume, tailored per role</p>
      <h1 className="display text-3xl">Your base resume</h1>
      <p className="mt-3 max-w-xl text-stone">
        This is the source of truth our AI tailors from for every application — it only adjusts
        emphasis and keywords per posting, it never adds experience that isn&apos;t here. Edit it
        directly, save, then approve when it's ready to use.
      </p>

      {error && <p className="mt-6 border border-crimson/40 bg-crimson/5 p-3 text-sm text-crimson-deep">{error}</p>}

      <div className="mt-8">
        <textarea
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          rows={16}
          placeholder="Paste your resume text here…"
          className="w-full border border-ink/15 bg-white p-4 text-sm text-ink focus:border-crimson focus:outline-none"
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleSave}
          disabled={!loaded || !resumeText.trim()}
          className="rounded-[2px] border border-ink/15 bg-white px-6 py-3 text-sm font-semibold text-ink hover:border-crimson disabled:opacity-50"
        >
          Save
        </button>
        <button
          type="button"
          onClick={handleApprove}
          disabled={!loaded || !savedText.trim() || hasUnsavedChanges || !!approvedAt}
          className="rounded-[2px] bg-crimson px-6 py-3 text-sm font-semibold text-parchment hover:bg-crimson-deep disabled:opacity-50"
        >
          {approvedAt ? "Approved" : "Approve"}
        </button>
        {hasUnsavedChanges && <span className="text-xs text-stone">Save before approving.</span>}
        {approvedAt && !hasUnsavedChanges && (
          <span className="text-xs text-crimson-deep">Approved {new Date(approvedAt).toLocaleDateString()}</span>
        )}
      </div>

      {status && <p className="mt-4 border border-crimson/30 bg-crimson/5 p-4 text-sm text-crimson-deep">{status}</p>}

      <details className="mt-10 text-xs text-stone">
        <summary className="cursor-pointer">Dev mode (local testing only)</summary>
        <input
          type="email"
          value={devEmail}
          onChange={(e) => {
            setDevEmail(e.target.value);
            window.localStorage.setItem(DEV_EMAIL_KEY, e.target.value);
          }}
          placeholder="dev email, ignored in production"
          className="mt-2 w-full max-w-xs rounded-[2px] border border-ink/15 px-2 py-1"
        />
      </details>
    </main>
  );
}
