import Link from "next/link";
import { notFound } from "next/navigation";
import { CAREER_PATHS, getCareerPath } from "@/lib/career-paths";
import { loadCommunicationExercises, hasCommunicationExercises } from "@/lib/communicationTrainer";
import { COMPETENCY_LABELS, type CommunicationCompetency } from "@/lib/communicationTrainerTypes";

const COMPETENCY_ORDER: CommunicationCompetency[] = [
  "vocabulary-terminology",
  "troubleshooting",
  "architecture",
  "business-communication",
  "performance-validation",
];

export function generateStaticParams() {
  return CAREER_PATHS.filter((p) => hasCommunicationExercises(p.slug)).map((p) => ({ path: p.slug }));
}

export default async function CommunicationTrainerIndexPage({
  params,
}: {
  params: Promise<{ path: string }>;
}) {
  const { path: pathSlug } = await params;
  const careerPath = getCareerPath(pathSlug);
  if (!careerPath) notFound();

  const exercises = loadCommunicationExercises(pathSlug);
  if (exercises.length === 0) notFound();

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
        <span>Communication Lab</span>
      </nav>

      <p className="eyebrow mb-3">LTV Technical Communication Lab</p>
      <h1 className="display text-3xl sm:text-4xl">
        {careerPath.title} <span className="text-crimson">exercises</span>
      </h1>
      <p className="mt-4 max-w-2xl text-stone">
        This isn&apos;t an exam, and it isn&apos;t Guided Practice — nobody&apos;s checking whether
        your answer is technically correct. Each exercise teaches how an experienced{" "}
        {careerPath.title} professional explains a real problem: the vocabulary, the structured
        reasoning, and the judgment behind the explanation, not just a correct-sounding answer.
      </p>

      <div className="mt-10 space-y-10">
        {COMPETENCY_ORDER.map((competency) => {
          const group = exercises.filter((e) => e.competency === competency);
          if (group.length === 0) return null;
          return (
            <div key={competency}>
              <div className="flex items-baseline justify-between border-b border-ink/15 pb-3">
                <h2 className="display text-xl">{COMPETENCY_LABELS[competency]}</h2>
                <span className="text-xs uppercase tracking-[0.14em] text-stone">
                  {group.length} exercise{group.length === 1 ? "" : "s"}
                </span>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {group.map((e) => {
                  const isFlagship = Boolean(e.deepDive && e.deepDive.length > 0);
                  return (
                    <Link
                      key={e.id}
                      href={`/app/communication-trainer/${careerPath.slug}/${e.id}`}
                      className={
                        isFlagship
                          ? "group rounded-[2px] border-2 border-gold bg-gold/[0.07] p-4 hover:bg-gold/[0.12]"
                          : "group rounded-[2px] border border-ink/15 bg-white/40 p-4 hover:border-crimson"
                      }
                    >
                      {isFlagship && (
                        <p className="mb-1 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-crimson-deep">
                          <span aria-hidden="true">★</span> Flagship
                        </p>
                      )}
                      <p className="text-xs uppercase tracking-[0.14em] text-stone">{e.skillTag}</p>
                      <h3 className="display mt-1 text-base group-hover:text-crimson">{e.title}</h3>
                      <span className="mt-1.5 inline-block text-xs font-semibold text-crimson-deep group-hover:underline">
                        Start →
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-14 border-t border-ink/15 pt-6">
        <Link href={`/careers/${careerPath.slug}`} className="text-sm font-semibold text-stone hover:text-crimson">
          ← Back to {careerPath.title}
        </Link>
      </div>
    </main>
  );
}
