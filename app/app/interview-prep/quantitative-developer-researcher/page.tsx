import Link from "next/link";
import { getCareerPath } from "@/lib/career-paths";

// Static route that intentionally overrides app/app/interview-prep/[path]/page.tsx
// for this one slug (Next.js prefers a static sibling route over a dynamic one).
// The Quantitative Developer / Researcher destination spans 3 very different real
// jobs, so instead of one combined bank, this is a picker into 3 separate banks.
const ROLES = [
  {
    slug: "researcher",
    title: "Quantitative Researcher",
    subtitle: "Quant ML Researcher",
    description:
      "Math, statistics, and machine learning under finance's constraints — low signal-to-noise, non-stationarity, and the constant risk of overfitting. Expect probability, Bayesian inference, time-series modeling, validation methodology, and defending a research result to a skeptical audience.",
  },
  {
    slug: "developer",
    title: "Quantitative Developer",
    subtitle: "Low-Latency / High-Frequency Trading Engineer",
    description:
      "Production engineering where a wrong number is a bug and a slow number can be a loss. Expect modern C++, memory and concurrency, performance optimization, the Python/C++ boundary, and designing low-latency systems.",
  },
  {
    slug: "analyst",
    title: "Quantitative Analyst",
    subtitle: "Markets, derivatives & risk",
    description:
      "Where research and trading meet the business — pricing, portfolio theory, and risk. Expect options and the Greeks, VaR and stress testing, factor models, and explaining a risk report or a losing trade to a trader or PM.",
  },
];

export default async function QuantInterviewPrepPicker() {
  const careerPath = getCareerPath("quantitative-developer-researcher");

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm text-stone">
        <Link href="/app" className="hover:text-crimson">
          Learning center
        </Link>
        {" · "}
        <Link href={`/careers/${careerPath?.slug ?? "quantitative-developer-researcher"}`} className="hover:text-crimson">
          {careerPath?.title ?? "Quantitative Developer / Researcher"}
        </Link>
        {" · "}
        <span>Interview prep</span>
      </nav>

      <p className="eyebrow mb-3">Career Interview Prep Center</p>
      <h1 className="display text-3xl sm:text-4xl">
        Choose your <span className="text-crimson">interviewer</span>
      </h1>
      <p className="mt-4 max-w-2xl text-stone">
        This destination branches into three real, distinct quant jobs. Each one gets its own
        interview bank, built from the coursework that role actually leans on — pick the one
        you&apos;re preparing for.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-1">
        {ROLES.map((role) => (
          <Link
            key={role.slug}
            href={`/app/interview-prep/quantitative-developer-researcher/${role.slug}`}
            className="group rounded-[2px] border border-ink/15 bg-white/40 p-5 hover:border-crimson"
          >
            <p className="text-xs uppercase tracking-[0.14em] text-stone">{role.subtitle}</p>
            <h2 className="display mt-1 text-xl group-hover:text-crimson">{role.title}</h2>
            <p className="mt-2 text-sm text-stone">{role.description}</p>
            <span className="mt-3 inline-block text-xs font-semibold text-crimson-deep group-hover:underline">
              Start this interviewer →
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
