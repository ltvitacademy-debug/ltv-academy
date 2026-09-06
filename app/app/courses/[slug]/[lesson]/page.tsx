import Link from "next/link";
import { notFound } from "next/navigation";
import { COURSES, findLesson, getCourse, loadLessonContent } from "@/lib/courses";
import Quiz from "@/components/app/Quiz";
import MarkComplete from "@/components/app/MarkComplete";

export function generateStaticParams() {
  return COURSES.flatMap((c) =>
    (c.chapters ?? []).flatMap((ch) =>
      ch.lessons.map((l) => ({ slug: c.slug, lesson: l.slug }))
    )
  );
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ slug: string; lesson: string }>;
}) {
  const { slug, lesson: lessonSlug } = await params;
  const course = getCourse(slug);
  if (!course || !course.chapters) notFound();
  const found = findLesson(course, lessonSlug);
  if (!found) notFound();
  const { chapter, lesson } = found;
  const content = loadLessonContent(lesson);

  // Previous/next within the flat lesson order
  const flat = course.chapters.flatMap((ch) => ch.lessons);
  const idx = flat.findIndex((l) => l.slug === lesson.slug);
  const prev = idx > 0 ? flat[idx - 1] : null;
  const next = idx < flat.length - 1 ? flat[idx + 1] : null;

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm text-stone">
        <Link href="/app" className="hover:text-crimson">Learning center</Link>
        {" · "}
        <Link href={`/app/courses/${course.slug}`} className="hover:text-crimson">
          {course.title}
        </Link>
        {" · "}
        <span>Chapter {chapter.n}</span>
      </nav>

      <p className="eyebrow mb-3">
        Chapter {chapter.n} · {chapter.title} · Lesson {lesson.n}
      </p>
      <h1 className="display text-3xl sm:text-4xl">{lesson.title}</h1>

      {lesson.videoUrl ? (
        <div className="mt-8 border border-ink/15 bg-ink">
          <video
            className="block w-full"
            controls
            preload="metadata"
            src={lesson.videoUrl}
          />
        </div>
      ) : (
        <div className="photo-plate relative mt-8 flex min-h-[16rem] items-center justify-center">
          <p className="px-6 text-center text-parchment/90">
            This lesson&apos;s video is in production. The written guide arrives
            with it.
          </p>
        </div>
      )}

      {content?.guideHtml && (
        <>
          <div className="mt-12 border-t-2 border-gold pt-8">
            <p className="eyebrow mb-6">The lesson guide</p>
            <article
              className="book-page"
              dangerouslySetInnerHTML={{ __html: content.guideHtml }}
            />
          </div>
        </>
      )}

      {content?.quiz && (
        <div className="mt-14 border-t-2 border-gold pt-8">
          <p className="eyebrow mb-6">Check your understanding</p>
          <Quiz
            storageKey={`quiz:${course.slug}:${lesson.slug}`}
            questions={content.quiz.questions}
          />
        </div>
      )}

      <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-ink/15 pt-6">
        <MarkComplete storageKey={`done:${course.slug}:${lesson.slug}`} lessonHref={`/app/courses/${course.slug}/${lesson.slug}`} lessonTitle={lesson.title} courseSlug={course.slug} />
        <div className="flex gap-4 text-sm">
          {prev && (
            <Link
              href={`/app/courses/${course.slug}/${prev.slug}`}
              className="text-stone underline underline-offset-4 hover:text-crimson"
            >
              ← {prev.title}
            </Link>
          )}
          {next && (
            <Link
              href={`/app/courses/${course.slug}/${next.slug}`}
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
