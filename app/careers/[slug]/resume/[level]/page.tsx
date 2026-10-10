import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCareerPath } from "@/lib/career-paths";
import { getAllSampleResumeParams, getSampleResume, getSampleResumeLevels } from "@/lib/sampleResumes";
import ResumeView from "@/components/careers/ResumeView";
import ResumeProtection from "@/components/careers/ResumeProtection";

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
  const resume = getSampleResume(slug, level);
  if (!path || !resume) return {};
  return { title: `Sample ${resume.levelLabel} Resume — ${path.title}` };
}

export default async function SampleResumePage({
  params,
}: {
  params: Promise<{ slug: string; level: string }>;
}) {
  const { slug, level } = await params;
  const path = getCareerPath(slug);
  if (!path) notFound();

  const resume = getSampleResume(slug, level);
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

      <p className="eyebrow mb-3">Sample resume · {resume.levelLabel}</p>
      <h1 className="display text-3xl sm:text-4xl">{path.title}</h1>
      <p className="mt-3 max-w-2xl text-stone">
        A fictional graduate, John Doe, showing what you can credibly claim after reaching the{" "}
        {resume.levelLabel} stage of this path. Every detail — the name, the contact information, the
        employer, the dates — is made up. Treat this as a template to adapt, not a record of a real person.
      </p>
      <p className="mt-3 max-w-2xl text-stone">
        This is also one possible configuration, not the only correct answer. Two people who finish the
        same courses will reasonably write different resumes — different lab choices, different phrasing,
        a different order of emphasis. What should stay constant is the discipline underneath it: every
        bullet traces back to something specific you actually built or practiced in the coursework, named
        tools and artifacts stand in for vague claims, and nothing is padded with experience you don&apos;t
        have yet.
      </p>

      {levels.length > 1 && (
        <div className="mt-6 flex gap-2">
          {levels.map((l) => (
            <Link
              key={l.key}
              href={`/careers/${path.slug}/resume/${l.key}`}
              className={`rounded-[2px] border px-4 py-1.5 text-sm font-semibold transition-colors ${
                l.key === level
                  ? "border-crimson bg-crimson text-parchment"
                  : "border-ink/15 bg-white/50 text-ink hover:border-crimson/40"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}

      <div className="mt-10 rounded-[2px] border-2 border-ink/15 bg-white/70 p-8 sm:p-10">
        <ResumeProtection />
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
