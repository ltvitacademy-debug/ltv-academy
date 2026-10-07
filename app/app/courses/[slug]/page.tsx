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
      <p className="eyebrow mb-4">Course curriculum</p>
      <h1 className="display text-4xl sm:text-5xl">
        {course.title}
        <span className="text-crimson">.</span>
      </h1>
      <p className="mt-4 max-w-2xl text-stone">{course.tagline}</p>
      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm uppercase tracking-[0.14em] text-stone">
        <span>{totalLessons} lessons</span>
        <span>{chapterCount} chapters</span>
        {hasFinalTest && <span>Final assessment</span>}
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

      <div className="mt-16 border-t-2 border-gold pt-10">
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
            stat={flashcardCount > 0 ? `${flashcardCount} key terms` : undefined}
            description="Review the key terms and concepts from every lesson in this course."
            href={`/app/courses/${course.slug}/flashcards`}
            cta="Review flashcards →"
          />
          <MasteryCard
            step="02"
            eyebrow="Practice"
            title="Guided practice"
            stat={practiceCount > 0 ? `${practiceCount} questions` : undefined}
            description="Try the answers yourself, reveal the solutions, and strengthen weak areas."
            href={`/app/courses/${course.slug}/practice`}
            cta="Start guided practice →"
          />
          <MasteryCard
            step="03"
            eyebrow="Prove it"
            title="Final assessment"
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

function MasteryCard({
  step,
  eyebrow,
  title,
  stat,
  description,
  href,
  cta,
  highlight,
}: {
  step: string;
  eyebrow: string;
  title: string;
  stat?: string;
  description: string;
  href: string;
  cta: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`flex flex-col border-2 p-6 ${
        highlight ? "border-gold bg-gold/10" : "border-ink/15"
      }`}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-crimson-deep">
        {step} · {eyebrow}
      </p>
      <h3 className="display mt-2 text-xl">{title}</h3>
      {stat && (
        <p className="mt-1 inline-block w-fit rounded-[2px] bg-ink/5 px-2 py-0.5 text-xs font-semibold uppercase tracking-[0.1em] text-stone">
          {stat}
        </p>
      )}
      <p className="mt-3 flex-1 text-sm text-stone">{description}</p>
      {stat ? (
        <Link
          href={href}
          className={`mt-5 inline-block rounded-[2px] px-5 py-2.5 text-center text-sm font-semibold ${
            highlight
              ? "bg-crimson text-parchment hover:bg-crimson-deep"
              : "border border-ink/20 hover:border-crimson hover:text-crimson"
          }`}
        >
          {cta}
        </Link>
      ) : (
        <p className="mt-5 text-xs uppercase tracking-[0.14em] text-stone">In production</p>
      )}
    </div>
  );
}
