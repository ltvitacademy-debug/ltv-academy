"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { ApplicationStatus, JobApplicationDTO } from "@/lib/careerLaunchTypes";

const STATUS_LABEL: Record<ApplicationStatus, string> = {
  discovered: "Discovered",
  tailored: "Tailored",
  staff_review: "In staff review",
  submitted: "Submitted",
  response: "Employer responded",
  interview: "Interview",
  rejected: "Not a fit",
};

const STATUS_ORDER: ApplicationStatus[] = [
  "discovered",
  "tailored",
  "staff_review",
  "submitted",
  "response",
  "interview",
];

const STATUS_STYLE: Record<ApplicationStatus, string> = {
  discovered: "bg-ink/10 text-stone",
  tailored: "bg-gold/20 text-crimson-deep",
  staff_review: "bg-gold/30 text-crimson-deep",
  submitted: "bg-crimson/10 text-crimson-deep",
  response: "bg-crimson text-parchment",
  interview: "bg-crimson-deep text-parchment",
  rejected: "bg-ink/10 text-stone line-through decoration-stone/50",
};

const DEV_EMAIL_KEY = "careerLaunchDevEmail";

export default function CareerLaunchDashboard() {
  const [applications, setApplications] = useState<JobApplicationDTO[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [devEmail, setDevEmail] = useState("");

  useEffect(() => {
    setDevEmail(window.localStorage.getItem(DEV_EMAIL_KEY) ?? "");
  }, []);

  useEffect(() => {
    const query = devEmail ? `?devStudentEmail=${encodeURIComponent(devEmail)}` : "";
    fetch(`/api/career-launch-applications${query}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
          return;
        }
        setApplications(data.applications);
      })
      .catch(() => setError("Could not load your applications."));
  }, [devEmail]);

  const live = applications?.filter((a) => a.status !== "rejected") ?? [];
  const counts = STATUS_ORDER.map((status) => ({
    status,
    count: applications?.filter((a) => a.status === status).length ?? 0,
  }));

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm text-stone">
        <Link href="/app" className="hover:text-crimson">
          Learning center
        </Link>
        {" · "}
        <span>LTV Career Launch</span>
      </nav>

      <p className="eyebrow mb-3">LTV Career Launch</p>
      <h1 className="display text-3xl sm:text-4xl">
        We apply. <span className="text-crimson">You interview.</span>
      </h1>
      <p className="mt-4 max-w-2xl text-stone">
        Since passing your Mock Interview, our team has been finding roles that match your
        preferences, tailoring your resume and cover letter for each one, and handling the
        application itself. You only step in when an employer wants to talk to you directly.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/app/career-launch/intake"
          className="rounded-[2px] border border-ink/15 bg-white px-4 py-2 text-sm font-semibold text-ink hover:border-crimson"
        >
          Edit preferences
        </Link>
        <Link
          href="/app/career-launch/resume"
          className="rounded-[2px] border border-ink/15 bg-white px-4 py-2 text-sm font-semibold text-ink hover:border-crimson"
        >
          Review base resume
        </Link>
      </div>

      {error && <p className="mt-6 border border-crimson/40 bg-crimson/5 p-3 text-sm text-crimson-deep">{error}</p>}

      {!error && applications === null && <p className="mt-10 text-sm text-stone">Loading your applications…</p>}

      {!error && applications !== null && (
        <>
          <section className="mt-10">
            <h2 className="display text-xl text-ink">This week</h2>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-6">
              {counts.map(({ status, count }) => (
                <div key={status} className="border border-ink/15 bg-white p-3 text-center">
                  <p className="display text-2xl text-crimson-deep">{count}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-wide text-stone">{STATUS_LABEL[status]}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-10">
            <div className="flex items-end justify-between">
              <h2 className="display text-xl text-ink">Your applications</h2>
              <p className="text-xs text-stone">
                {live.length} active · {applications.length - live.length} closed
              </p>
            </div>

            {applications.length === 0 && (
              <p className="mt-4 border border-ink/15 bg-white p-4 text-sm text-stone">
                No applications yet — set your preferences and approve a base resume to get started.
              </p>
            )}

            <div className="mt-4 space-y-3">
              {applications.map((app) => (
                <div key={app.id} className="border border-ink/15 bg-white p-4">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-ink">
                        {app.posting.title} <span className="font-normal text-stone">— {app.posting.company}</span>
                      </p>
                      <p className="mt-0.5 text-xs text-stone">
                        {app.posting.location}
                        {app.posting.salaryRange && ` · ${app.posting.salaryRange}`}
                      </p>
                    </div>
                    <span
                      className={`whitespace-nowrap rounded-[2px] px-2 py-1 text-[11px] font-semibold uppercase tracking-wide ${STATUS_STYLE[app.status]}`}
                    >
                      {STATUS_LABEL[app.status]}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center gap-2 text-xs text-stone">
                    {app.matchScore !== null && <span className="font-semibold text-crimson-deep">{app.matchScore}% match</span>}
                    <span>·</span>
                    <span>Found {new Date(app.createdAt).toLocaleDateString()}</span>
                    {app.tailoredResumeText && (
                      <>
                        <span>·</span>
                        <a
                          href={`/api/career-launch-resume-pdf?applicationId=${app.id}${devEmail ? `&devStudentEmail=${encodeURIComponent(devEmail)}` : ""}`}
                          className="font-semibold text-crimson hover:underline"
                        >
                          Download tailored resume
                        </a>
                      </>
                    )}
                    <a href={app.posting.sourceUrl} target="_blank" rel="noreferrer" className="ml-auto text-crimson hover:underline">
                      View posting ↗
                    </a>
                  </div>

                  {app.staffNote && <p className="mt-3 border-l-2 border-gold pl-3 text-xs text-stone">{app.staffNote}</p>}
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      <details className="mt-12 text-xs text-stone">
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
