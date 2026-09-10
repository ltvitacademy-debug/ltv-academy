import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CAREER_PATHS, getCareerPath } from "@/lib/career-paths";
import { getCourse, lessonCount } from "@/lib/courses";

export function generateStaticParams() {
  return CAREER_PATHS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const path = getCareerPath(slug);
  if (!path) return {};
  return {
    title: path.title,
    description: path.description,
  };
}

export default async function CareerPathPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const path = getCareerPath(slug);
  if (!path) notFound();

  return (
    <main className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <Link href="/careers" className="text-sm font-medium text-stone hover:text-crimson">
        ← All career paths
      </Link>

      <p className="eyebrow mb-4 mt-8">
        {path.isDestination ? "Destination path" : "Career path"}
      </p>
      <h1 className="display text-4xl sm:text-5xl">
        {path.title}
        <span className="text-crimson">.</span>
      </h1>

      <p className="mt-4 max-w-2xl text-stone">{path.description}</p>

      <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-y border-ink/10 py-5 text-sm">
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-stone">Salary range</p>
          <p className="mt-1 font-semibold text-crimson">{path.salaryRange}</p>
        </div>
        {path.certification && (
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-stone">Certification target</p>
            <p className="mt-1 font-semibold text-ink">{path.certification}</p>
          </div>
        )}
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-stone">Target jobs</p>
          <p className="mt-1 text-ink">{path.targetJobs.join(" → ")}</p>
        </div>
      </div>

      <div className="mt-12 space-y-10">
        {path.stages.map((stage, i) => (
          <section key={stage.label}>
            <div className="flex items-baseline gap-4 border-b border-ink/15 pb-3">
              <span className="display text-2xl text-crimson">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h2 className="display text-2xl">{stage.label}</h2>
                {stage.note && <p className="text-sm italic text-stone">{stage.note}</p>}
              </div>
            </div>

            {stage.courseSlugs && (
              <ul className="divide-y divide-ink/10">
                {stage.courseSlugs.map((courseSlug) => {
                  const course = getCourse(courseSlug);
                  if (!course) return null;
                  return (
                    <li key={courseSlug}>
                      <Link
                        href={`/app/courses/${courseSlug}?path=${path.slug}`}
                        className="group flex items-center justify-between gap-4 py-5"
                      >
                        <div>
                          <h3 className="display text-xl group-hover:text-crimson">{course.title}</h3>
                          <p className="mt-1 max-w-xl text-sm text-stone">{course.tagline}</p>
                        </div>
                        <span className="whitespace-nowrap text-xs uppercase tracking-[0.14em] text-gold">
                          {lessonCount(course)} lessons
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}

            {stage.pathChoiceSlugs && (
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {stage.pathChoiceSlugs.map((choiceSlug) => {
                  const choice = getCareerPath(choiceSlug);
                  if (!choice) return null;
                  return (
                    <Link
                      key={choiceSlug}
                      href={`/careers/${choiceSlug}`}
                      className="group rounded-[2px] border border-ink/15 p-5 hover:border-crimson"
                    >
                      <h3 className="display text-lg group-hover:text-crimson">{choice.title}</h3>
                      <p className="mt-2 text-sm text-stone">{choice.salaryRange}</p>
                    </Link>
                  );
                })}
              </div>
            )}
          </section>
        ))}
      </div>

      <div className="mt-14 rounded-[2px] bg-gold-pale p-6">
        <p className="text-sm uppercase tracking-[0.14em] text-crimson-deep">Where this leads</p>
        <p className="mt-2 max-w-2xl text-ink">{path.destinationNote}</p>
      </div>

      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href="/app"
          className="rounded-[2px] bg-crimson px-6 py-3 text-sm font-semibold text-parchment hover:bg-crimson-deep"
        >
          Start this path
        </Link>
        <Link
          href="/careers"
          className="rounded-[2px] border border-ink/20 px-6 py-3 text-sm font-semibold text-ink hover:border-crimson hover:text-crimson"
        >
          See all paths
        </Link>
      </div>
    </main>
  );
}
