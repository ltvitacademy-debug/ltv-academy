"use client";

import { useState } from "react";
import Link from "next/link";

// Prototype only — approve/request-changes is local state, nothing is sent anywhere.

const MOCK_RESUME_BULLETS = [
  "Built ETL pipelines moving on-prem SQL Server data into Azure Data Lake using ADF, serving 12 downstream Power BI reports.",
  "Migrated a 200GB on-prem data warehouse to a cloud lakehouse, cutting reporting latency by 40%.",
  "Designed star-schema data marts for self-service BI reporting across 3 business units.",
  "Automated data quality checks across 40+ pipeline tables using Great Expectations, catching schema drift before it reached dashboards.",
];

export default function CareerLaunchResumePage() {
  const [decision, setDecision] = useState<"pending" | "approved" | "changes">("pending");
  const [note, setNote] = useState("");

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="mb-6 border border-gold bg-gold/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-crimson-deep">
        Prototype — placeholder data, not a live feature
      </div>

      <nav className="mb-6 text-sm text-stone">
        <Link href="/app/career-launch" className="hover:text-crimson">
          LTV Career Launch
        </Link>
        {" · "}
        <span>Base resume</span>
      </nav>

      <p className="eyebrow mb-3">One resume, tailored per role</p>
      <h1 className="display text-3xl">Approve your base resume</h1>
      <p className="mt-3 max-w-xl text-stone">
        This is the source of truth our AI tailors from for every application — it only adjusts
        emphasis and keywords per posting, it never adds experience that isn&apos;t here. Review it
        once; you can request changes anytime.
      </p>

      <div className="mt-8 border border-ink/15 bg-white p-6">
        <p className="font-semibold text-ink">Jordan Alvarez</p>
        <p className="text-sm text-stone">Data Engineer · Atlanta, GA · jordan.alvarez@example.com</p>

        <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-crimson-deep">
          Capstone &amp; Project Experience
        </p>
        <ul className="mt-2 space-y-2 text-sm text-ink">
          {MOCK_RESUME_BULLETS.map((bullet, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-crimson">—</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-crimson-deep">
          Certifications
        </p>
        <p className="mt-2 text-sm text-ink">
          LTV Academy — Azure &amp; Fabric Data Engineer (Job-Ready) · Professional Mock Interview,
          Advanced — Passed
        </p>
      </div>

      {decision === "pending" && (
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setDecision("approved")}
            className="rounded-[2px] bg-crimson px-6 py-3 text-sm font-semibold text-parchment hover:bg-crimson-deep"
          >
            Approve as-is
          </button>
          <button
            type="button"
            onClick={() => setDecision("changes")}
            className="rounded-[2px] border border-ink/15 px-6 py-3 text-sm font-semibold text-ink hover:border-crimson"
          >
            Request changes
          </button>
        </div>
      )}

      {decision === "approved" && (
        <div className="mt-6 border border-crimson/30 bg-crimson/5 p-4 text-sm text-crimson-deep">
          Approved (prototype only). New matches can now be tailored from this version.
        </div>
      )}

      {decision === "changes" && (
        <div className="mt-6 space-y-3">
          <label className="block">
            <span className="mb-1 block text-sm font-semibold text-ink">What should change?</span>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
              className="w-full border border-ink/15 bg-white p-3 text-sm text-ink focus:border-crimson focus:outline-none"
              placeholder="e.g. add my new certification, remove the retail job"
            />
          </label>
          <button
            type="button"
            onClick={() => setDecision("pending")}
            className="rounded-[2px] bg-crimson px-6 py-3 text-sm font-semibold text-parchment hover:bg-crimson-deep"
          >
            Send to staff (prototype only)
          </button>
        </div>
      )}
    </main>
  );
}
