import Link from "next/link";
import { notFound } from "next/navigation";
import { COURSES, getCourse, renderMarkdown } from "@/lib/courses";
import { loadWorkedExamples, hasWorkedExamples } from "@/lib/workedExamples";
import { loadCourseResources } from "@/lib/resourceVault";
import type { WorkedExample } from "@/lib/workedExampleTypes";
import { DownloadIcon } from "@/components/app/DashboardIcons";

export function generateStaticParams() {
  return COURSES.filter((c) => c.chapters && hasWorkedExamples(c)).flatMap((c) =>
    loadWorkedExamples(c).map((ex) => ({ slug: c.slug, exampleId: ex.id }))
  );
}

type NarrativeField = "context" | "objective" | "startingInformation" | "walkthrough" | "reasoning" | "solution" | "validation" | "pitfalls";

const SECTIONS: { key: NarrativeField; label: string }[] = [
  { key: "context", label: "Business or technical context" },
  { key: "objective", label: "Objective" },
  { key: "startingInformation", label: "Starting information" },
  { key: "walkthrough", label: "Step-by-step walkthrough" },
  { key: "reasoning", label: "Professional reasoning" },
  { key: "solution", label: "Completed solution" },
  { key: "validation", label: "Validation" },
  { key: "pitfalls", label: "Common pitfalls" },
];

export default async function WorkedExampleDetailPage({
  params,
}: {
  params: Promise<{ slug: string; exampleId: string }>;
}) {
  const { slug, exampleId } = await params;
  const course = getCourse(slug);
  if (!course || !course.chapters) notFound();

  const examples = loadWorkedExamples(course);
  const index = examples.findIndex((e) => e.id === exampleId);
  if (index === -1) notFound();
  const example = examples[index];

  const resources = loadCourseResources(course);
  const relatedResources = resources.filter((r) => example.relatedResourceIds.includes(r.id));

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm text-stone">
        <Link href="/app" className="hover:text-crimson">
          Learning center
        </Link>
        {" · "}
        <Link href={`/app/courses/${course.slug}`} className="hover:text-crimson">
          {course.title}
        </Link>
        {" · "}
        <Link href={`/app/courses/${course.slug}/worked-examples`} className="hover:text-crimson">
          Worked Examples
        </Link>
        {" · "}
        <span>{example.title}</span>
      </nav>

      <p className="eyebrow mb-2">
        Worked example {index + 1} of {examples.length}
        {example.chapterTitle ? ` · ${example.chapterTitle}` : ""}
      </p>
      <h1 className="display text-3xl sm:text-4xl">{example.title}</h1>

      {(relatedResources.length > 0 || example.relatedLessons.length > 0) && (
        <div className="mt-6 flex flex-wrap gap-3">
          {relatedResources.map((r) => (
            <a
              key={r.id}
              href={r.downloadHref}
              download
              className="inline-flex items-center gap-1.5 rounded-[2px] border-2 border-crimson bg-gold-pale px-4 py-2 text-sm font-semibold text-crimson-deep hover:border-crimson-deep"
            >
              <DownloadIcon className="h-4 w-4" />
              {r.title}
            </a>
          ))}
        </div>
      )}

      <article className="example-page mt-10 border-t-2 border-gold pt-8">
        {SECTIONS.map(({ key, label }) => {
          const value: WorkedExample[NarrativeField] = example[key];
          if (!value) return null;
          return (
            <section key={key} className="mb-10">
              <p className="eyebrow mb-3">{label}</p>
              <div dangerouslySetInnerHTML={{ __html: renderMarkdown(value) }} />
            </section>
          );
        })}
      </article>

      {example.relatedLessons.length > 0 && (
        <div className="border-t border-ink/15 pt-8">
          <p className="eyebrow mb-3">Related lessons</p>
          <ul className="space-y-2">
            {example.relatedLessons.map((l) => (
              <li key={l.lessonSlug}>
                <Link
                  href={`/app/courses/${course.slug}/${l.lessonSlug}`}
                  className="text-sm font-semibold text-crimson underline underline-offset-2 hover:text-crimson-deep"
                >
                  {l.title} →
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-ink/15 pt-6">
        <Link
          href={`/app/courses/${course.slug}/worked-examples`}
          className="text-sm font-semibold text-stone hover:text-crimson"
        >
          ← All worked examples
        </Link>
        {index < examples.length - 1 && (
          <Link
            href={`/app/courses/${course.slug}/worked-examples/${examples[index + 1].id}`}
            className="text-sm font-semibold text-crimson hover:text-crimson-deep"
          >
            Next example: {examples[index + 1].title} →
          </Link>
        )}
      </div>
    </main>
  );
}
