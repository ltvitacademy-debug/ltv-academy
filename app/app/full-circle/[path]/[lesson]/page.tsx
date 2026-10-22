import Link from "next/link";
import { notFound } from "next/navigation";
import { CAREER_PATHS, getCareerPath } from "@/lib/career-paths";
import { loadFullCircleSeries, hasFullCircleSeries, FULL_CIRCLE_PHASE_LABELS } from "@/lib/fullCircleSeries";
import { renderMarkdown } from "@/lib/courses";
import MarkComplete from "@/components/app/MarkComplete";
import LessonChat from "@/components/app/LessonChat";
import TabbedHtmlPanel from "@/components/app/TabbedHtmlPanel";

export function generateStaticParams() {
  return CAREER_PATHS.filter((p) => hasFullCircleSeries(p.slug)).flatMap((p) => {
    const series = loadFullCircleSeries(p.slug);
    if (!series) return [];
    return series.lessons
      .filter((l) => l.status === "published")
      .map((l) => ({ path: p.slug, lesson: l.slug }));
  });
}

export default async function FullCircleLessonPage({
  params,
}: {
  params: Promise<{ path: string; lesson: string }>;
}) {
  const { path: pathSlug, lesson: lessonSlug } = await params;
  const careerPath = getCareerPath(pathSlug);
  if (!careerPath) notFound();
  const series = loadFullCircleSeries(pathSlug);
  if (!series) notFound();

  const idx = series.lessons.findIndex((l) => l.slug === lessonSlug);
  if (idx === -1) notFound();
  const lesson = series.lessons[idx];
  if (lesson.status !== "published") notFound();

  const prev = idx > 0 ? series.lessons[idx - 1] : null;
  const next = idx < series.lessons.length - 1 ? series.lessons[idx + 1] : null;

  const explainTabs = [
    lesson.explainSimple
      ? { key: "simple", label: "Explain it simply", html: renderMarkdown(lesson.explainSimple) }
      : null,
    lesson.explainProfessional
      ? { key: "pro", label: "Explain it like a pro", html: renderMarkdown(lesson.explainProfessional) }
      : null,
  ].filter((t): t is { key: string; label: string; html: string } => t !== null);

  const workplace = lesson.workplaceExplanation;
  const workplaceTabs = workplace
    ? [
        { key: "lead", label: "Technical Lead", html: renderMarkdown(workplace.technicalLead) },
        { key: "pm", label: "Project Manager", html: renderMarkdown(workplace.projectManager) },
        { key: "exec", label: "Executive", html: renderMarkdown(workplace.executive) },
      ]
    : [];

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm text-stone">
        <Link href="/app" className="hover:text-crimson">Learning center</Link>
        {" · "}
        <Link href={`/careers/${careerPath.slug}`} className="hover:text-crimson">
          {careerPath.title}
        </Link>
        {" · "}
        <Link href={`/app/full-circle/${careerPath.slug}`} className="hover:text-crimson">
          {series.projectTitle}
        </Link>
      </nav>

      <p className="eyebrow mb-3">
        {FULL_CIRCLE_PHASE_LABELS[lesson.phase]} · Video {lesson.n} of {series.lessons.length}
      </p>
      <h1 className="display text-3xl sm:text-4xl">{lesson.title}</h1>

      {lesson.videoUrl ? (
        <div className="mt-8 border border-ink/15 bg-ink">
          <video className="block w-full" controls preload="metadata" src={lesson.videoUrl} />
        </div>
      ) : (
        <div className="photo-plate relative mt-8 flex min-h-[16rem] items-center justify-center">
          <p className="px-6 text-center text-parchment/90">This video is in production.</p>
        </div>
      )}

      {lesson.whatAreWeBuilding && (
        <div className="mt-10 border-t-2 border-gold pt-8">
          <p className="eyebrow mb-4">What are we building?</p>
          <article
            className="example-page"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(lesson.whatAreWeBuilding) }}
          />
        </div>
      )}

      {explainTabs.length > 0 && (
        <div className="mt-12 border-t-2 border-gold pt-8">
          <p className="eyebrow mb-4">Pick your level</p>
          <TabbedHtmlPanel tabs={explainTabs} />
        </div>
      )}

      {lesson.writtenInstructions && (
        <div className="mt-12 border-t-2 border-gold pt-8">
          <p className="eyebrow mb-4">Step-by-step implementation</p>
          <article
            className="example-page"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(lesson.writtenInstructions) }}
          />
        </div>
      )}

      {workplaceTabs.length > 0 && (
        <div className="mt-12 border-t-2 border-gold pt-8">
          <p className="eyebrow mb-4">How would you explain this at work?</p>
          <p className="mb-5 max-w-2xl text-sm text-stone">
            The same piece of work, explained the way you&apos;d actually say it to three different
            people.
          </p>
          <TabbedHtmlPanel tabs={workplaceTabs} />
        </div>
      )}

      <div className="mt-14 border-t-2 border-gold pt-8">
        <LessonChat
          courseTitle={series.projectTitle}
          lessonTitle={lesson.title}
          guideExcerpt={lesson.writtenInstructions ?? lesson.whatAreWeBuilding ?? ""}
        />
      </div>

      <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-ink/15 pt-6">
        <MarkComplete
          storageKey={`done:full-circle:${careerPath.slug}:${lesson.slug}`}
          lessonHref={`/app/full-circle/${careerPath.slug}/${lesson.slug}`}
          lessonTitle={lesson.title}
          courseSlug={careerPath.slug}
        />
        <div className="flex gap-4 text-sm">
          {prev && prev.status === "published" && (
            <Link
              href={`/app/full-circle/${careerPath.slug}/${prev.slug}`}
              className="text-stone underline underline-offset-4 hover:text-crimson"
            >
              ← {prev.title}
            </Link>
          )}
          {next && next.status === "published" && (
            <Link
              href={`/app/full-circle/${careerPath.slug}/${next.slug}`}
              className="text-stone underline underline-offset-4 hover:text-crimson"
            >
              {next.title} →
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
