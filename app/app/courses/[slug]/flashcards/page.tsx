import Link from "next/link";
import { notFound } from "next/navigation";
import { COURSES, getCourse, lessonCount, getCourseFlashcards } from "@/lib/courses";
import FlashcardDeck from "@/components/app/FlashcardDeck";

export function generateStaticParams() {
  return COURSES.filter((c) => c.chapters).map((c) => ({ slug: c.slug }));
}

export default async function CourseFlashcardsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course || !course.chapters) notFound();

  const cards = getCourseFlashcards(course);

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
        <span>Flashcards</span>
      </nav>

      <p className="eyebrow mb-3">Flashcards · {lessonCount(course)} lessons covered</p>
      <h1 className="display text-3xl sm:text-4xl">{course.title}</h1>
      <p className="mt-4 max-w-2xl text-stone">
        Every key term from every lesson in this course, pulled into one deck.
        Tap a card to see the definition, then mark it &ldquo;Got it&rdquo; or
        &ldquo;Review again&rdquo; — missed cards come back around before the
        deck is done.
      </p>

      <div className="mt-10 border-t-2 border-gold pt-8">
        <FlashcardDeck cards={cards} />
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
