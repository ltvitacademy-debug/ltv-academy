import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { COURSES, getCourse, lessonCount, loadCourseTest } from "@/lib/courses";
import LessonRow from "@/components/app/LessonRow";
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
  const test = loadCourseTest(course);

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

  return (
    <main className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <Suspense fallback={<div className="mb-6 h-5" />}>
        <CoursePathBreadcrumb />
      </Suspense>
      <p className="eyebrow mb-4">The {course.chapters?.length}-chapter course</p>
      <h1 className="display text-4xl sm:text-5xl">
        {course.title}
        <span className="text-crimson">.</span>
      </h1>
      <p className="mt-4 max-w-2xl text-stone">{course.tagline}</p>
      <p className="mt-2 text-sm uppercase tracking-[0.18em] text-gold">
        {lessonCount(course)} lessons
      </p>

      <div className="mt-12 space-y-10">
        {course.chapters!.map((ch) => (
          <section key={ch.n}>
            <div className="flex items-baseline gap-4 border-b border-ink/15 pb-3">
              <span className="display text-2xl text-crimson">
                {String(ch.n).padStart(2, "0")}
              </span>
              <h2 className="display text-2xl">{ch.title}</h2>
            </div>
            <ul className="divide-y divide-ink/10">
              {ch.lessons.map((l) => (
                <LessonRow
                  key={l.slug}
                  courseSlug={course.slug}
                  lesson={{
                    n: l.n,
                    slug: l.slug,
                    title: l.title,
                    playable: Boolean(l.videoUrl || l.contentDir),
                    durationLabel: l.durationLabel,
                  }}
                />
              ))}
            </ul>
          </section>
        ))}
      </div>

      {test && (
        <div className="mt-14 border-2 border-gold bg-gold/10 p-7">
          <p className="eyebrow mb-2">Final test</p>
          <h2 className="display text-2xl">Ready to test what you&apos;ve learned?</h2>
          <p className="mt-2 max-w-2xl text-stone">
            {test.questions.length} questions covering the whole course — 90% to pass.
          </p>
          <Link
            href={`/app/courses/${course.slug}/test`}
            className="mt-4 inline-block rounded-[2px] bg-crimson px-6 py-3 text-sm font-semibold text-parchment hover:bg-crimson-deep"
          >
            Take the final test →
          </Link>
        </div>
      )}
    </main>
  );
}
