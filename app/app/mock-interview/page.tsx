import Link from "next/link";
import { getCareerPath } from "@/lib/career-paths";

// Phase A pilot scope (approved spec, section 14): Snowflake Data /
// Analytics Engineer only. Adding a path later is a config change here, not
// a rebuild — the session/turn engine (Netlify Functions) is already
// careerPath-driven.
const PILOT_PATHS = ["snowflake-data-engineer"];

const DIFFICULTIES: {
  id: "beginner" | "intermediate" | "advanced";
  label: string;
  blurb: string;
  certificateEligible: boolean;
}[] = [
  {
    id: "beginner",
    label: "Beginner",
    blurb: "Entry-level questions — foundational concepts and core terminology.",
    certificateEligible: false,
  },
  {
    id: "intermediate",
    label: "Intermediate",
    blurb: "2–5 years of practical scenarios and design tradeoffs.",
    certificateEligible: false,
  },
  {
    id: "advanced",
    label: "Advanced",
    blurb: "Senior-level depth — architecture, cost, and judgment calls.",
    certificateEligible: true,
  },
];

export default function MockInterviewPage() {
  const paths = PILOT_PATHS.map((slug) => getCareerPath(slug)).filter((p): p is NonNullable<typeof p> => !!p);

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm text-stone">
        <Link href="/app" className="hover:text-crimson">
          Learning center
        </Link>
        {" · "}
        <span>Professional Mock Interview</span>
        {" · "}
        <Link href="/app/mock-interview/history" className="hover:text-crimson">
          My history
        </Link>
      </nav>

      <p className="eyebrow mb-3">LTV Academy Professional Mock Interview</p>
      <h1 className="display text-3xl sm:text-4xl">
        A real interview, <span className="text-crimson">before the real interview.</span>
      </h1>
      <p className="mt-4 max-w-2xl text-stone">
        A 54-minute interview — after a brief greeting, 45 minutes of formal scored
        assessment (core technical questions, a deep dive into a project you built, and
        realistic workplace scenarios), then 9 minutes of personalized coaching. An AI
        interviewer leads the conversation and adapts to your answers; it is not a
        multiple-choice quiz. Students who pass receive a performance report and a printable
        certificate.
      </p>

      <div className="mt-6 border border-gold/40 bg-gold/10 p-4 text-sm text-ink">
        <strong>Development preview.</strong> This page is running in text-based testing mode
        while the question engine is tested (voice comes later). The scoring engine, report, and
        certificate system are built and tested, but automatic grading is still awaiting final
        administrator sign-off before it runs for real students — no payment is active yet,
        this is for internal review only.
      </div>

      <div className="mt-4 border border-crimson/30 bg-crimson/5 p-4 text-sm text-ink">
        <strong className="text-crimson-deep">Certificate eligibility.</strong> Every difficulty
        level gives you a full score, personalized coaching, and a detailed performance report.
        Only the <strong>Advanced</strong> interview can earn the printable{" "}
        <em>Certificate of Successful Completion</em> — Beginner and Intermediate results are
        shown as <strong>&ldquo;Passed — Certificate Not Eligible&rdquo;</strong> even at a
        perfect score, since they&apos;re not evaluated at the depth a certificate represents.
        Choose Advanced if earning the certificate is your goal.
      </div>

      <div className="mt-10 space-y-10">
        {paths.map((path) => (
          <section key={path.slug}>
            <h2 className="display text-xl text-ink">{path.title}</h2>
            <p className="mt-1 text-sm text-stone">Choose a difficulty to begin.</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {DIFFICULTIES.map((d) => (
                <Link
                  key={d.id}
                  href={`/app/mock-interview/session?path=${path.slug}&difficulty=${d.id}`}
                  className="block border border-ink/15 bg-parchment p-4 transition hover:border-crimson"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-crimson-deep">{d.label}</p>
                    {d.certificateEligible ? (
                      <span className="rounded-[2px] bg-gold px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-ink">
                        Certificate eligible
                      </span>
                    ) : (
                      <span className="rounded-[2px] bg-ink/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-stone">
                        No certificate
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-stone">{d.blurb}</p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
