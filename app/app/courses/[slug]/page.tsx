import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import {
  COURSES,
  getCourse,
  lessonCount,
  getCourseFlashcards,
  getCoursePracticeQuestions,
} from "@/lib/courses";
import { buildFinalTest } from "@/lib/finalTest";
import CourseCurriculum from "@/components/app/CourseCurriculum";
import CoursePathBreadcrumb from "@/components/app/CoursePathBreadcrumb";
import {
  LayersIcon,
  PencilCheckIcon,
  PlayIcon,
  ShieldCheckIcon,
  StackIcon,
} from "@/components/app/DashboardIcons";

export function generateStaticParams() {
  return COURSES.map((c) => ({ slug: c.slug }));
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();
  const test = buildFinalTest(course);
  const hasFinalTest = test.questions.length > 0;
  const flashcardCount = getCourseFlashcards(course).length;
  const practiceCount = getCoursePracticeQuestions(course).length;

  if (course.status === "coming-soon") {
    return (
      <main className="mx-auto flex min-h-[50vh] max-w-3xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
        <p className="eyebrow mb-4">Coming soon</p>
        <h1 className="display text-4xl sm:text-5xl">{course.title}</h1>
        <p className="mt-4 max-w-xl text-stone">{course.tagline}</p>
        <p className="mt-6 text-sm text-stone">
          This track is in production. The Power BI course is open now.
        </p>
        <Link
          href="/app"
          className="mt-8 rounded-[2px] bg-crimson px-6 py-3 text-sm font-semibold text-parchment hover:bg-crimson-deep"
        >
          Back to the learning center
        </Link>
      </main>
    );
  }

  const chapterCount = course.chapters?.length ?? 0;
  const totalLessons = lessonCount(course);

  return (
    <main className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <Suspense fallback={<div className="mb-6 h-5" />}>
        <CoursePathBreadcrumb />
      </Suspense>

      <div className="relative border-l-4 border-gold pl-5 sm:pl-7">
        <p className="eyebrow mb-4">Course curriculum</p>
        <h1 className="display text-4xl sm:text-5xl">
          {course.title}
          <span className="text-crimson">.</span>
        </h1>
        <p className="mt-4 max-w-2xl text-stone">{course.tagline}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <StatChip icon={<PlayIcon className="h-4 w-4" />} label={`${totalLessons} lessons`} />
          <StatChip icon={<LayersIcon className="h-4 w-4" />} label={`${chapterCount} chapters`} />
          {hasFinalTest && (
            <StatChip
              icon={<ShieldCheckIcon className="h-4 w-4" />}
              label="Final assessment"
              gold
            />
          )}
        </div>
      </div>

      <div className="mt-10">
        <CourseCurriculum
          courseSlug={course.slug}
          chapters={course.chapters!.map((ch) => ({
            n: ch.n,
            title: ch.title,
            lessons: ch.lessons.map((l) => ({
              n: l.n,
              slug: l.slug,
              title: l.title,
              playable: Boolean(l.videoUrl || l.contentDir),
              durationLabel: l.durationLabel,
            })),
          }))}
        />
      </div>

      <div className="relative mt-16 border-t-4 border-double border-gold pt-10">
        <p className="eyebrow mb-2">Course mastery</p>
        <h2 className="display text-2xl sm:text-3xl">Take your learning further</h2>
        <p className="mt-2 max-w-2xl text-stone">
          Reinforce what you&apos;ve learned, practice the skills, then prove it.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <MasteryCard
            step="01"
            eyebrow="Remember"
            title="Flashcards"
            icon={<StackIcon className="h-6 w-6" />}
            stat={flashcardCount > 0 ? `${flashcardCount} key terms` : undefined}
            description="Review the key terms and concepts from every lesson in this course."
            href={`/app/courses/${course.slug}/flashcards`}
            cta="Review flashcards →"
          />
          <MasteryCard
            step="02"
            eyebrow="Practice"
            title="Guided practice"
            icon={<PencilCheckIcon className="h-6 w-6" />}
            stat={practiceCount > 0 ? `${practiceCount} questions` : undefined}
            description="Try the answers yourself, reveal the solutions, and strengthen weak areas."
            href={`/app/courses/${course.slug}/practice`}
            cta="Start guided practice →"
          />
          <MasteryCard
            step="03"
            eyebrow="Prove it"
            title="Final assessment"
            icon={<ShieldCheckIcon className="h-6 w-6" />}
            stat={hasFinalTest ? `${test.questions.length} questions · 90% to pass` : undefined}
            description="Applied questions covering the entire course."
            href={`/app/courses/${course.slug}/test`}
            cta="Take final test →"
            highlight
          />
        </div>
      </div>
    </main>
  );
}

function StatChip({
  icon,
  label,
  gold,
}: {
  icon: React.ReactNode;
  label: string;
  gold?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 border px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.12em] shadow-sm ${
        gold
          ? "border-gold bg-gold/15 text-crimson-deep"
          : "border-ink/15 bg-white/50 text-stone"
      }`}
    >
      {icon}
      {label}
    </span>
  );
}

function MasteryCard({
  step,
  eyebrow,
  title,
  icon,
  stat,
  description,
  href,
  cta,
  highlight,
}: {
  step: string;
  eyebrow: string;
  title: string;
  icon: React.ReactNode;
  stat?: string;
  description: string;
  href: string;
  cta: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`group relative flex flex-col overflow-hidden border-2 p-6 transition-all duration-300 hover:-translate-y-1 ${
        highlight
          ? "border-gold bg-gradient-to-br from-gold/20 via-gold/10 to-transparent shadow-[0_12px_30px_-14px_rgba(196,149,46,0.6)] hover:shadow-[0_16px_36px_-12px_rgba(196,149,46,0.7)]"
          : "border-ink/15 bg-white/40 shadow-[0_6px_18px_-10px_rgba(30,26,22,0.3)] hover:border-crimson-deep/30 hover:shadow-[0_10px_24px_-10px_rgba(30,26,22,0.35)]"
      }`}
    >
      <span className="display pointer-events-none absolute -right-2 -top-4 text-7xl leading-none text-ink/[0.045]">
        {step}
      </span>
      <div className="relative flex items-center gap-3">
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[5px] ${
            highlight
              ? "bg-gradient-to-br from-crimson to-crimson-deep text-gold-pale shadow-[0_4px_12px_-4px_rgba(94,15,15,0.6)]"
              : "bg-crimson-deep text-gold-pale"
          }`}
        >
          {icon}
        </span>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-crimson-deep">
          {step} · {eyebrow}
        </p>
      </div>
      <h3 className="display relative mt-3 text-xl">{title}</h3>
      {stat && (
        <p className="relative mt-1 inline-block w-fit rounded-full border border-ink/10 bg-white/60 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-[0.08em] text-stone">
          {stat}
        </p>
      )}
      <p className="relative mt-3 flex-1 text-sm text-stone">{description}</p>
      {stat ? (
        <Link
          href={href}
          className={`relative mt-5 inline-block rounded-[2px] px-5 py-2.5 text-center text-sm font-semibold transition-colors ${
            highlight
              ? "bg-crimson text-parchment shadow-[0_4px_14px_-4px_rgba(142,28,28,0.6)] hover:bg-crimson-deep"
              : "border border-ink/20 hover:border-crimson hover:text-crimson"
          }`}
        >
          {cta}
        </Link>
      ) : (
        <p className="relative mt-5 text-xs uppercase tracking-[0.14em] text-stone">
          In production
        </p>
      )}
    </div>
  );
}
