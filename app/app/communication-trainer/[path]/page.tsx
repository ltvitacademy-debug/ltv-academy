import Link from "next/link";
import { notFound } from "next/navigation";
import { CAREER_PATHS, getCareerPath } from "@/lib/career-paths";
import { loadCommunicationExercises, hasCommunicationExercises } from "@/lib/communicationTrainer";
import CommunicationTrainer from "@/components/app/CommunicationTrainer";

export function generateStaticParams() {
  return CAREER_PATHS.filter((p) => hasCommunicationExercises(p.slug)).map((p) => ({ path: p.slug }));
}

export default async function CommunicationTrainerPage({
  params,
}: {
  params: Promise<{ path: string }>;
}) {
  const { path: pathSlug } = await params;
  const careerPath = getCareerPath(pathSlug);
  if (!careerPath) notFound();

  const exercises = loadCommunicationExercises(pathSlug);
  if (exercises.length === 0) notFound();
  const exercise = exercises[0];

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

      <div className="mt-14 border-t border-ink/15 pt-6">
        <Link href={`/careers/${careerPath.slug}`} className="text-sm font-semibold text-stone hover:text-crimson">
          ← Back to {careerPath.title}
        </Link>
      </div>
    </main>
  );
}
