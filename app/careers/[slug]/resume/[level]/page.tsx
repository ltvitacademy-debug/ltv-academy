import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCareerPath } from "@/lib/career-paths";
import {
  getAllSampleResumeParams,
  getSampleResume,
  getSampleResumeLevels,
  RESUME_LEVEL_LABELS,
  type SampleResumeLevel,
} from "@/lib/sampleResumes";
import ResumeView from "@/components/careers/ResumeView";

export function generateStaticParams() {
  return getAllSampleResumeParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; level: string }>;
}): Promise<Metadata> {
  const { slug, level } = await params;
  const path = getCareerPath(slug);
  const label = RESUME_LEVEL_LABELS[level as SampleResumeLevel];
  if (!path || !label) return {};
  return { title: `Sample ${label} Resume — ${path.title}` };
}

export default async function SampleResumePage({
  params,
}: {
  params: Promise<{ slug: string; level: string }>;
}) {
  const { slug, level } = await params;
  const path = getCareerPath(slug);
  if (!path) notFound();

  const levelKey = level as SampleResumeLevel;
  const resume = getSampleResume(slug, levelKey);
  if (!resume) notFound();

  const levels = getSampleResumeLevels(slug);

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm text-stone">
        <Link href="/careers" className="hover:text-crimson">
          Careers
        </Link>
        {" · "}
        <Link href={`/careers/${path.slug}`} className="hover:text-crimson">
          {path.title}
        </Link>
        {" · "}
        <span>Sample resume</span>
      </nav>

      <p className="eyebrow mb-3">Sample resume · {RESUME_LEVEL_LABELS[levelKey]}</p>
      <h1 className="display text-3xl sm:text-4xl">{path.title}</h1>
      <p className="mt-3 max-w-2xl text-stone">
        A fictional graduate, John Doe, showing what you can credibly claim after finishing{" "}
        {levelKey === "job-ready" ? "this path's Job Ready stage" : "this path, including its Advanced stage"}.
        Every detail is made up — treat this as a template to adapt, not a record of a real person.
      </p>

      {levels.length > 1 && (
        <div className="mt-6 flex gap-2">
          {levels.map((l) => (
            <Link
              key={l}
              href={`/careers/${path.slug}/resume/${l}`}
              className={`rounded-[2px] border px-4 py-1.5 text-sm font-semibold transition-colors ${
                l === levelKey
                  ? "border-crimson bg-crimson text-parchment"
                  : "border-ink/15 bg-white/50 text-ink hover:border-crimson/40"
              }`}
            >
              {RESUME_LEVEL_LABELS[l]}
            </Link>
          ))}
        </div>
      )}

      <div className="mt-10 rounded-[2px] border-2 border-ink/15 bg-white/70 p-8 sm:p-10">
        <ResumeView resume={resume} />
      </div>

      <div className="mt-10 border-t border-ink/15 pt-6">
        <Link href={`/careers/${path.slug}`} className="text-sm text-stone underline underline-offset-4 hover:text-crimson">
          ← Back to {path.title}
        </Link>
      </div>
    </main>
  );
}
