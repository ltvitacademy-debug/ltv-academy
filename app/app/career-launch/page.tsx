import Link from "next/link";
import type { Metadata } from "next";
import {
  MOCK_STUDENT,
  STATUS_LABEL,
  STATUS_ORDER,
  applicationsForStudent,
  type ApplicationStatus,
} from "@/lib/careerLaunchMockData";

export const metadata: Metadata = {
  title: "LTV Career Launch (prototype)",
  robots: { index: false },
};

const STATUS_STYLE: Record<ApplicationStatus, string> = {
  discovered: "bg-ink/10 text-stone",
  tailored: "bg-gold/20 text-crimson-deep",
  staff_review: "bg-gold/30 text-crimson-deep",
  submitted: "bg-crimson/10 text-crimson-deep",
  response: "bg-crimson text-parchment",
  interview: "bg-crimson-deep text-parchment",
  rejected: "bg-ink/10 text-stone line-through decoration-stone/50",
};

export default function CareerLaunchDashboardPage() {
  const applications = applicationsForStudent(MOCK_STUDENT.name);
  const live = applications.filter((a) => a.status !== "rejected");
  const counts = STATUS_ORDER.map((status) => ({
    status,
    count: applications.filter((a) => a.status === status).length,
  }));

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="mb-6 border border-gold bg-gold/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-crimson-deep">
        Prototype — placeholder data, not a live feature
      </div>

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

      <div className="mt-6 flex flex-wrap items-center gap-3 border border-ink/15 bg-white p-4 text-sm">
        <span className="font-semibold text-ink">{MOCK_STUDENT.name}</span>
        <span className="text-stone">·</span>
        <span className="text-stone">{MOCK_STUDENT.careerPath}</span>
        <span className="text-stone">·</span>
        <span className="rounded-[2px] bg-gold px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-ink">
          {MOCK_STUDENT.mockInterviewResult}
        </span>
        <span className="ml-auto text-xs text-stone">Eligible since {MOCK_STUDENT.eligibleSince}</span>
      </div>

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
        <button
          type="button"
          className="ml-auto rounded-[2px] border border-crimson/40 px-4 py-2 text-sm font-semibold text-crimson hover:bg-crimson/5"
        >
          Pause applications
        </button>
      </div>

      <section className="mt-10">
        <h2 className="display text-xl text-ink">This week</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-6">
          {counts.map(({ status, count }) => (
            <div key={status} className="border border-ink/15 bg-white p-3 text-center">
              <p className="display text-2xl text-crimson-deep">{count}</p>
              <p className="mt-1 text-[11px] uppercase tracking-wide text-stone">
                {STATUS_LABEL[status]}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <div className="flex items-end justify-between">
          <h2 className="display text-xl text-ink">Your applications</h2>
          <p className="text-xs text-stone">{live.length} active · {applications.length - live.length} closed</p>
        </div>

        <div className="mt-4 space-y-3">
          {applications.map((app) => (
            <div key={app.id} className="border border-ink/15 bg-white p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-ink">
                    {app.role} <span className="font-normal text-stone">— {app.company}</span>
                  </p>
                  <p className="mt-0.5 text-xs text-stone">
                    {app.location}
                    {app.salaryRange && ` · ${app.salaryRange}`}
                  </p>
                </div>
                <span
                  className={`whitespace-nowrap rounded-[2px] px-2 py-1 text-[11px] font-semibold uppercase tracking-wide ${STATUS_STYLE[app.status]}`}
                >
                  {STATUS_LABEL[app.status]}
                </span>
              </div>

              <div className="mt-3 flex items-center gap-2 text-xs text-stone">
                <span className="font-semibold text-crimson-deep">{app.matchScore}% match</span>
                <span>·</span>
                <span>Found {app.discoveredAt}</span>
              </div>

              {app.staffNote && (
                <p className="mt-3 border-l-2 border-gold pl-3 text-xs text-stone">{app.staffNote}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
