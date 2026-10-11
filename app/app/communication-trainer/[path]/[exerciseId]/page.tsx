import Link from "next/link";
import { notFound } from "next/navigation";
import { CAREER_PATHS, getCareerPath } from "@/lib/career-paths";
import { loadCommunicationExercises } from "@/lib/communicationTrainer";
import { COMPETENCY_LABELS } from "@/lib/communicationTrainerTypes";
import CommunicationTrainer from "@/components/app/CommunicationTrainer";

export function generateStaticParams() {
  return CAREER_PATHS.flatMap((p) =>
    loadCommunicationExercises(p.slug).map((e) => ({ path: p.slug, exerciseId: e.id }))
  );
}

export default async function CommunicationExercisePage({
  params,
}: {
  params: Promise<{ path: string; exerciseId: string }>;
}) {
  const { path: pathSlug, exerciseId } = await params;
  const careerPath = getCareerPath(pathSlug);
  if (!careerPath) notFound();

  const exercises = loadCommunicationExercises(pathSlug);
  const index = exercises.findIndex((e) => e.id === exerciseId);
  if (index === -1) notFound();
  const exercise = exercises[index];
  const prev = exercises[index - 1];
  const next = exercises[index + 1];

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
        <Link href={`/app/communication-trainer/${careerPath.slug}`} className="hover:text-crimson">
          Communication Lab
        </Link>
        {" · "}
        <span>{exercise.title}</span>
      </nav>

      <p className="eyebrow mb-3">
        LTV Technical Communication Lab · {COMPETENCY_LABELS[exercise.competency]} · Exercise {index + 1} of {exercises.length}
      </p>
      <h1 className="display text-3xl sm:text-4xl">
        {careerPath.title} <span className="text-crimson">{exercise.title}</span>
      </h1>
      <p className="mt-4 max-w-2xl text-stone">
        This isn&apos;t an exam, and it isn&apos;t Guided Practice — nobody&apos;s checking whether
        your answer is technically correct. It&apos;s about learning to <em>explain</em> technical
        work the way an experienced professional does: precise vocabulary, a structured reasoning
        process, and language that connects the technical problem to what it actually costs the
        business. Work through each step in order — the teaching comes before the practice.
      </p>

      <div className="mt-10">
        <CommunicationTrainer exercise={exercise} />
      </div>

      <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-ink/15 pt-6">
        <Link href={`/app/communication-trainer/${careerPath.slug}`} className="text-sm font-semibold text-stone hover:text-crimson">
          ← All {careerPath.title} exercises
        </Link>
        <div className="flex gap-4">
          {prev && (
            <Link
              href={`/app/communication-trainer/${careerPath.slug}/${prev.id}`}
              className="text-sm font-semibold text-stone hover:text-crimson"
            >
              ← {prev.title}
            </Link>
          )}
          {next && (
            <Link
              href={`/app/communication-trainer/${careerPath.slug}/${next.id}`}
              className="text-sm font-semibold text-crimson-deep hover:underline"
            >
              {next.title} →
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
