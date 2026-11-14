"use client";

import { useState } from "react";
import { MOCK_APPLICATIONS, type MockApplication } from "@/lib/careerLaunchMockData";

// Prototype only — approve/reject is local state, nothing is submitted
// anywhere and no real students are involved. See memory: "LTV Career
// Launch" for the staged build plan this stands in for.

type LocalStatus = "pending" | "approved" | "rejected";

export default function CareerLaunchAdminQueuePage() {
  const queue = MOCK_APPLICATIONS.filter(
    (a) => a.status === "tailored" || a.status === "staff_review"
  );

  const [decisions, setDecisions] = useState<Record<string, LocalStatus>>({});
  const [expanded, setExpanded] = useState<string | null>(queue[0]?.id ?? null);

  const remaining = queue.filter((a) => (decisions[a.id] ?? "pending") === "pending");

  return (
    <main className="mx-auto min-h-screen max-w-4xl bg-parchment px-4 py-10 sm:px-6">
      <div className="mb-6 border border-gold bg-gold/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-crimson-deep">
        Prototype — placeholder data, not a live feature
      </div>

      <p className="eyebrow mb-2">Staff only</p>
      <h1 className="display text-3xl text-ink">LTV Career Launch — Review Queue</h1>
      <p className="mt-2 max-w-2xl text-sm text-stone">
        Every AI-tailored application lands here before it goes out. Nothing is submitted to an
        employer without someone approving it here first.
      </p>

      <div className="mt-6 flex items-center gap-4 border border-ink/15 bg-white p-3 text-sm">
        <span className="text-stone">
          <strong className="text-ink">{remaining.length}</strong> pending review
        </span>
        <span className="text-stone">·</span>
        <span className="text-stone">
          <strong className="text-ink">{queue.length}</strong> total this week
        </span>
      </div>

      {remaining.length === 0 && (
        <p className="mt-8 text-sm text-stone">Nothing left in the queue — nice work.</p>
      )}

      <div className="mt-8 space-y-4">
        {queue.map((app) => {
          const decision = decisions[app.id] ?? "pending";
          const isOpen = expanded === app.id;
          return (
            <ReviewCard
              key={app.id}
              app={app}
              decision={decision}
              isOpen={isOpen}
              onToggle={() => setExpanded(isOpen ? null : app.id)}
              onApprove={() => setDecisions((d) => ({ ...d, [app.id]: "approved" }))}
              onReject={() => setDecisions((d) => ({ ...d, [app.id]: "rejected" }))}
            />
          );
        })}
      </div>
    </main>
  );
}

function ReviewCard({
  app,
  decision,
  isOpen,
  onToggle,
  onApprove,
  onReject,
}: {
  app: MockApplication;
  decision: LocalStatus;
  isOpen: boolean;
  onToggle: () => void;
  onApprove: () => void;
  onReject: () => void;
}) {
  return (
    <section
      className={`border bg-white p-6 ${
        decision === "approved"
          ? "border-crimson/30 opacity-60"
          : decision === "rejected"
            ? "border-ink/10 opacity-50"
            : "border-ink/15"
      }`}
    >
      <button type="button" onClick={onToggle} className="flex w-full items-start justify-between gap-4 text-left">
        <div>
          <p className="font-semibold text-ink">
            {app.studentName} <span className="font-normal text-stone">→ {app.role}, {app.company}</span>
          </p>
          <p className="mt-0.5 text-xs text-stone">
            {app.studentPath} · {app.location} · Found {app.discoveredAt}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <span className="whitespace-nowrap rounded-[2px] bg-gold/30 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-crimson-deep">
            {app.matchScore}% match
          </span>
          {decision === "approved" && (
            <span className="whitespace-nowrap rounded-[2px] bg-crimson px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-parchment">
              Approved
            </span>
          )}
          {decision === "rejected" && (
            <span className="whitespace-nowrap rounded-[2px] bg-ink/10 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-stone">
              Rejected
            </span>
          )}
        </div>
      </button>

      {isOpen && (
        <div className="mt-5 space-y-5 border-t border-ink/10 pt-5">
          {app.staffNote && (
            <p className="border-l-2 border-gold pl-3 text-sm text-crimson-deep">{app.staffNote}</p>
          )}

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-stone">Base resume bullet</p>
            <p className="mt-1 text-sm text-ink">{app.baseResumeBullet}</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-crimson-deep">
              AI-tailored for this posting
            </p>
            <p className="mt-1 border border-gold/40 bg-gold/5 p-3 text-sm text-ink">
              {app.tailoredResumeBullet}
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-crimson-deep">
              Cover letter excerpt
            </p>
            <p className="mt-1 whitespace-pre-wrap text-sm italic text-stone">{app.coverLetterExcerpt}</p>
          </div>

          {decision === "pending" && (
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={onApprove}
                className="rounded-[2px] bg-crimson px-6 py-3 text-sm font-semibold text-parchment hover:bg-crimson-deep"
              >
                Approve &amp; submit
              </button>
              <button
                type="button"
                className="rounded-[2px] border border-ink/15 px-6 py-3 text-sm font-semibold text-ink hover:border-crimson"
              >
                Edit tailoring
              </button>
              <button
                type="button"
                onClick={onReject}
                className="rounded-[2px] border border-crimson/30 px-6 py-3 text-sm font-semibold text-crimson hover:bg-crimson/5"
              >
                Reject match
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
