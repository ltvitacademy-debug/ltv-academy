import Link from "next/link";
import { notFound } from "next/navigation";
import { CAREER_PATHS, getCareerPath } from "@/lib/career-paths";
import { loadInterviewBank, hasInterviewBank } from "@/lib/interviewPrep";
import InterviewPrep from "@/components/app/InterviewPrep";

export function generateStaticParams() {
  return CAREER_PATHS.filter((p) => hasInterviewBank(p.slug)).map((p) => ({ path: p.slug }));
}

export default async function InterviewPrepPage({
  params,
}: {
  params: Promise<{ path: string }>;
}) {
  const { path: pathSlug } = await params;
  const careerPath = getCareerPath(pathSlug);
  if (!careerPath) notFound();

  const questions = loadInterviewBank(pathSlug);

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
        <span>Interview prep</span>
      </nav>

      <p className="eyebrow mb-3">Career Interview Prep Center</p>
      <h1 className="display text-3xl sm:text-4xl">
        {careerPath.title} <span className="text-crimson">interview practice</span>
      </h1>
      <p className="mt-4 max-w-2xl text-stone">
        Train for the interview. Prove your skills. Type your own answer first — the model
        answer only reveals after you submit, so you find out what you actually know.
      </p>

      <div className="mt-8">
        <InterviewPrep pathSlug={pathSlug} pathTitle={careerPath.title} questions={questions} />
      </div>
    </main>
  );
}
