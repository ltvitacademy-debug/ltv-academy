import Link from "next/link";
import { notFound } from "next/navigation";
import { CAREER_PATHS, getCareerPath } from "@/lib/career-paths";
import { loadCommunicationScenarios, hasCommunicationScenarios } from "@/lib/communicationTrainer";
import CommunicationTrainer from "@/components/app/CommunicationTrainer";

const SCOPE_STEPS = [
  { letter: "S", label: "Situation", text: "Describe the business or technical problem." },
  { letter: "C", label: "Clarify", text: "Identify missing requirements, symptoms, and constraints." },
  { letter: "O", label: "Observe", text: "Explain which evidence, logs, metrics, or tools you would examine." },
  { letter: "P", label: "Plan & Perform", text: "Describe your proposed technical solution and why you chose it." },
  { letter: "E", label: "Evaluate", text: "Explain how you would test, validate, and communicate the outcome." },
];

export function generateStaticParams() {
  return CAREER_PATHS.filter((p) => hasCommunicationScenarios(p.slug)).map((p) => ({ path: p.slug }));
}

export default async function CommunicationTrainerPage({
  params,
}: {
  params: Promise<{ path: string }>;
}) {
  const { path: pathSlug } = await params;
  const careerPath = getCareerPath(pathSlug);
  if (!careerPath) notFound();

  const scenarios = loadCommunicationScenarios(pathSlug);

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm text-stone">
        <Link href="/app" className="hover:text-crimson">
          Learning center
        </Link>
        {" · "}
        <Link href={`/careers/${careerPath.slug}`} className="hover:text-crimson">
          {careerPath.title}
        </Link>
        {" · "}
        <span>Communication trainer</span>
      </nav>

      <p className="eyebrow mb-3">LTV Technical Communication Trainer</p>
      <h1 className="display text-3xl sm:text-4xl">
        {careerPath.title} <span className="text-crimson">scenario practice</span>
      </h1>
      <p className="mt-4 max-w-2xl text-stone">
        Technical correctness isn&apos;t the same as explaining your work the way a working
        professional does. These scenarios aren&apos;t about memorizing jargon — they&apos;re about
        thinking through a problem out loud with the precision, structure, and vocabulary
        someone doing this job every day actually uses.
      </p>

      <div className="mt-8 rounded-[2px] border-2 border-gold bg-gold-pale/40 p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-crimson-deep">A repeatable framework: SCOPE</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-5">
          {SCOPE_STEPS.map((step) => (
            <div key={step.letter}>
              <p className="display text-2xl text-crimson">{step.letter}</p>
              <p className="text-sm font-semibold text-ink">{step.label}</p>
              <p className="mt-1 text-xs text-stone">{step.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 border-t-2 border-gold pt-8">
        <CommunicationTrainer scenarios={scenarios} storageKey={`communication-trainer:${pathSlug}`} />
      </div>

      <div className="mt-14 border-t border-ink/15 pt-6">
        <Link href={`/careers/${careerPath.slug}`} className="text-sm font-semibold text-stone hover:text-crimson">
          ← Back to {careerPath.title}
        </Link>
      </div>
    </main>
  );
}
