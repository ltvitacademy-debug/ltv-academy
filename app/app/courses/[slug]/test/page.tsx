import Link from "next/link";
import { notFound } from "next/navigation";
import { COURSES, getCourse, lessonCount } from "@/lib/courses";
import { buildFinalTest, passingScore } from "@/lib/finalTest";
import CourseTest from "@/components/app/CourseTest";

export function generateStaticParams() {
  return COURSES.filter((c) => c.chapters).map((c) => ({ slug: c.slug }));
}

export default async function CourseTestPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course || !course.chapters) notFound();

  const test = buildFinalTest(course);
  const hasQuestions = test.questions.length > 0;

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm text-stone">
        <Link href="/app" className="hover:text-crimson">Learning center</Link>
        {" · "}
        <Link href={`/app/courses/${course.slug}`} className="hover:text-crimson">
          {course.title}
        </Link>
        {" · "}
        <span>Final test</span>
      </nav>

      <p className="eyebrow mb-3">Final test · {lessonCount(course)} lessons covered</p>
      <h1 className="display text-3xl sm:text-4xl">{course.title}</h1>

      {hasQuestions ? (
        <>
          <p className="mt-4 max-w-2xl text-stone">
            {test.questions.length} questions covering the whole course. You need
            90% ({passingScore(test.questions.length)} of {test.questions.length})
            to pass. There's no penalty for retaking it — review the submitted and
            correct answers below each question, then try again.
          </p>
          {test.shortfall > 0 && (
            <p className="mt-2 max-w-2xl text-xs uppercase tracking-[0.18em] text-crimson-deep">
              This course&apos;s final test bank is still being built out — showing
              {" "}{test.questions.length} of a planned {test.targetSize} questions.
            </p>
          )}
          <div className="mt-10 border-t-2 border-gold pt-8">
            <CourseTest
              storageKey={`courseTest:${course.slug}`}
              questions={test.questions}
            />
          </div>
        </>
      ) : (
        <div className="photo-plate relative mt-8 flex min-h-[12rem] items-center justify-center">
          <p className="px-6 text-center text-parchment/90">
            This course&apos;s final test is in production.
          </p>
        </div>
      )}

      <div className="mt-14 border-t border-ink/15 pt-6">
        <Link
          href={`/app/courses/${course.slug}`}
          className="text-sm text-stone underline underline-offset-4 hover:text-crimson"
        >
          ← Back to {course.title}
        </Link>
      </div>
    </main>
  );
}
