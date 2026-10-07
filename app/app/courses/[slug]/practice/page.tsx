import Link from "next/link";
import { notFound } from "next/navigation";
import { COURSES, getCourse, lessonCount, getCoursePracticeQuestions } from "@/lib/courses";
import GuidedPractice from "@/components/app/GuidedPractice";

export function generateStaticParams() {
  return COURSES.filter((c) => c.chapters).map((c) => ({ slug: c.slug }));
}

export default async function CoursePracticePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course || !course.chapters) notFound();

  const questions = getCoursePracticeQuestions(course);

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm text-stone">
        <Link href="/app" className="hover:text-crimson">
          Learning center
        </Link>
        {" · "}
        <Link href={`/app/courses/${course.slug}`} className="hover:text-crimson">
          {course.title}
        </Link>
        {" · "}
        <span>Guided practice</span>
      </nav>

      <p className="eyebrow mb-3">Guided practice · {lessonCount(course)} lessons covered</p>
      <h1 className="display text-3xl sm:text-4xl">{course.title}</h1>
      <p className="mt-4 max-w-2xl text-stone">
        Try to answer each question yourself, then reveal the correct answer
        and why. No grading, no pressure — just compare your thinking
        against the real answer and decide if it clicked. Questions you mark
        &ldquo;Review again&rdquo; come back to the front of the line next
        time you visit.
      </p>

      <div className="mt-10 border-t-2 border-gold pt-8">
        <GuidedPractice questions={questions} storageKey={`practice:${course.slug}`} />
      </div>

      <div className="mt-14 border-t border-ink/15 pt-6">
        <Link
          href={`/app/courses/${course.slug}`}
          className="text-sm font-semibold text-stone hover:text-crimson"
        >
          ← Back to {course.title}
        </Link>
      </div>
    </main>
  );
}
