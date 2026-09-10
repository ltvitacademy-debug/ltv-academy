import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { COURSES, getCourse, lessonCount } from "@/lib/courses";
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
    </main>
  );
}
