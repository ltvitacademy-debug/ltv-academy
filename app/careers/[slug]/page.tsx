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

      {path.subtitle && <p className="mt-3 text-lg font-medium text-crimson-deep">{path.subtitle}</p>}

      {path.longDescription ? (
        <div className="mt-6 max-w-2xl space-y-4 text-stone">
          {path.longDescription.map((para) => (
            <p key={para}>{para}</p>
          ))}
        </div>
      ) : (
        <p className="mt-4 max-w-2xl text-stone">{path.description}</p>
      )}

      {path.capstoneFlow && (
        <ol className="mt-5 flex max-w-3xl flex-wrap items-center gap-x-2 gap-y-2 text-sm">
          {path.capstoneFlow.map((step, i) => (
            <li key={step} className="flex items-center gap-2">
              <span className="rounded-[2px] border border-ink/15 bg-gold-pale px-3 py-1.5 font-medium text-crimson-deep">
                {step}
              </span>
              {i < path.capstoneFlow!.length - 1 && <span className="text-gold">→</span>}
            </li>
          ))}
        </ol>
      )}

      {path.afterFlow && (
        <div className="mt-5 max-w-2xl space-y-4 text-stone">
          {path.afterFlow.map((para) => (
            <p key={para}>{para}</p>
          ))}
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-y border-ink/10 py-5 text-sm">
        {path.salaryRange && (
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-stone">Salary range</p>
            <p className="mt-1 font-semibold text-crimson">{path.salaryRange}</p>
          </div>
        )}
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

      {path.labRequirement && (
        <section
          aria-labelledby="lab-requirement"
          className="mt-12 rounded-[2px] border-2 border-gold bg-crimson-deep p-6 text-gold-pale sm:p-10"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">{path.labRequirement.eyebrow}</p>
          <h2 id="lab-requirement" className="display mt-3 text-3xl text-gold-pale sm:text-4xl">
            {path.labRequirement.heading}
          </h2>
          <div className="mt-5 max-w-2xl space-y-4 text-gold-pale/90">
            {path.labRequirement.intro.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>

          <div className="mt-6 max-w-md rounded-[2px] border border-gold/50 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">{path.labRequirement.optionLabel}</p>
            <ul className="mt-3 space-y-1">
              {path.labRequirement.optionLines.map((line, i) => (
                <li key={line} className={i === 0 ? "display text-xl text-gold-pale" : "text-gold-pale/90"}>
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <a
            href={path.labRequirement.buttonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-[2px] bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-crimson-deep hover:bg-gold-pale"
          >
            {path.labRequirement.buttonLabel} <span aria-hidden="true">↗</span>
            <span className="sr-only"> (opens OracleERPGuide in a new tab)</span>
          </a>

          <p className="mt-5 max-w-2xl text-sm text-gold-pale/80">
            <strong className="font-semibold text-gold">IMPORTANT:</strong> {path.labRequirement.importantNote}
          </p>

          <div className="mt-8 max-w-2xl border-t border-gold/30 pt-6">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">{path.labRequirement.whenHeading}</h3>
            <p className="mt-3 text-gold-pale/90">{path.labRequirement.whenText}</p>
          </div>

          <p className="mt-6 text-xs text-gold-pale/70">{path.labRequirement.verifiedNote}</p>
        </section>
      )}

      {path.compensation && (
        <section className="mt-12">
          <h2 className="display border-b border-ink/15 pb-3 text-2xl">{path.compensation.heading}</h2>
          <div className="mt-4 max-w-2xl space-y-4 text-ink">
            {path.compensation.paragraphs.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>
        </section>
      )}

      {path.progression && (
        <section className="mt-12">
          <h2 className="display border-b border-ink/15 pb-3 text-2xl">{path.progression.heading}</h2>
          <p className="mt-4 max-w-3xl font-medium text-ink">{path.progression.ladder}</p>
          <dl className="mt-5 grid gap-4 sm:grid-cols-3">
            {path.progression.levels.map((level) => (
              <div key={level.label} className="rounded-[2px] border border-ink/15 p-4">
                <dt className="text-xs uppercase tracking-[0.14em] text-stone">{level.label}</dt>
                <dd className="mt-2 font-semibold text-crimson">{level.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

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
                          {path.courseDetails?.[courseSlug] && (
                            <p className="mt-2 max-w-xl text-sm text-ink">{path.courseDetails[courseSlug]}</p>
                          )}
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
                      {choice.salaryRange && <p className="mt-2 text-sm text-stone">{choice.salaryRange}</p>}
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
