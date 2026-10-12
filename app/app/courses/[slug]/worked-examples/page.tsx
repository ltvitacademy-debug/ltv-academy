import Link from "next/link";
import { notFound } from "next/navigation";
import { COURSES, getCourse } from "@/lib/courses";
import { loadWorkedExamples, hasWorkedExamples } from "@/lib/workedExamples";
import { BookOpenIcon } from "@/components/app/DashboardIcons";

export function generateStaticParams() {
  return COURSES.filter((c) => c.chapters && hasWorkedExamples(c)).map((c) => ({ slug: c.slug }));
}

export default async function CourseWorkedExamplesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course || !course.chapters) notFound();

  const examples = loadWorkedExamples(course);
  if (examples.length === 0) notFound();

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
        <span>Worked Examples</span>
      </nav>

      <p className="eyebrow mb-3">
        Worked Examples · {examples.length} example{examples.length === 1 ? "" : "s"}
      </p>
      <h1 className="display text-3xl sm:text-4xl">{course.title}</h1>
      <p className="mt-4 max-w-2xl text-stone">
        Complete, start-to-finish solutions to realistic professional tasks — not a quiz, not a
        flashcard. Study how an experienced professional reasons through the problem, not just the
        final answer.
      </p>

      <div className="mt-10 grid gap-5 border-t-2 border-gold pt-8 sm:grid-cols-2">
        {examples.map((ex, i) => (
          <Link
            key={ex.id}
            href={`/app/courses/${course.slug}/worked-examples/${ex.id}`}
            className="group flex flex-col border-2 border-ink/15 bg-white/40 p-5 shadow-[0_6px_18px_-10px_rgba(30,26,22,0.3)] transition-all duration-300 hover:-translate-y-1 hover:border-crimson-deep/30"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[5px] bg-crimson-deep text-gold-pale">
                <BookOpenIcon className="h-5 w-5" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-crimson-deep">
                Example {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="display mt-3 text-lg leading-snug">{ex.title}</h3>
            {ex.chapterTitle && (
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.1em] text-stone">
                {ex.chapterTitle}
              </p>
            )}
            <span className="mt-4 text-sm font-semibold text-stone group-hover:text-crimson">
              Study this example →
            </span>
          </Link>
        ))}
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
