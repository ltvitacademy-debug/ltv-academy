import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CAREER_PATHS, getCareerPath } from "@/lib/career-paths";
import { getCourse, lessonCount } from "@/lib/courses";
import PathDetailRedesign from "@/components/careers/PathDetailRedesign";

// Piloting the new photo-hero / stat-tier / stepper / curriculum-grid design
// on these two paths before rolling it out to all 23. Remove this gate (and
// the branch below) once the redesign is approved for everyone.
const REDESIGN_PILOT_SLUGS = new Set(["analytics-engineer", "bi-to-data-architect"]);

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

  if (REDESIGN_PILOT_SLUGS.has(path.slug)) {
    return <PathDetailRedesign path={path} />;
  }

  const stageTotal = (slugs?: string[]) =>
    (slugs ?? []).reduce((sum, s) => {
      const c = getCourse(s);
      return sum + (c ? lessonCount(c) : 0);
    }, 0);
  const programTotal = path.stages.reduce((sum, st) => sum + stageTotal(st.courseSlugs), 0);
  const programCourseCount = path.stages.reduce((sum, st) => sum + (st.courseSlugs?.length ?? 0), 0);
  const startStage = path.stages.find((st) => st.label.startsWith("Start") && st.pathChoiceSlugs?.length === 1);
  const startPath = startStage ? getCareerPath(startStage.pathChoiceSlugs![0]) : undefined;
  const startTotal = startPath ? startPath.stages.reduce((sum, st) => sum + stageTotal(st.courseSlugs), 0) : 0;

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

      {path.specializations && (
        <section className="mt-10">
          <h2 className="display border-b border-ink/15 pb-3 text-2xl">{path.specializations.heading}</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[2px] border-2 border-crimson bg-gold-pale p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-crimson-deep">{path.specializations.primaryLabel}</p>
              <ul className="mt-3 space-y-1">
                {path.specializations.primary.map((item) => (
                  <li key={item} className="display text-lg text-crimson-deep">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[2px] border border-ink/15 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone">{path.specializations.optionalLabel}</p>
              <ul className="mt-3 space-y-1">
                {path.specializations.optional.map((item) => (
                  <li key={item} className="text-ink">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {path.positioning && (
        <section className="mt-10 rounded-[2px] border-l-4 border-crimson bg-gold-pale p-5 sm:p-6">
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-crimson-deep">{path.positioning.heading}</h2>
          <div className="mt-3 max-w-2xl space-y-3 text-ink">
            {path.positioning.paragraphs.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>
        </section>
      )}

      {path.certificationRoadmap && (
        <section className="mt-12">
          <h2 className="display border-b border-ink/15 pb-3 text-2xl">{path.certificationRoadmap.heading}</h2>
          <ol className="mt-6 space-y-6">
            {path.certificationRoadmap.steps.map((step, i, arr) => (
              <li key={step.label} className="grid gap-3 sm:grid-cols-[11rem_1fr] sm:gap-6">
                <div className="flex items-baseline gap-3">
                  <span className="display text-2xl text-crimson">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">{step.label}</p>
                </div>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {step.items.map((item) => (
                    <li
                      key={item}
                      className={
                        i === arr.length - 1
                          ? "rounded-[2px] border-2 border-gold bg-crimson-deep px-4 py-3 text-sm font-semibold text-gold-pale"
                          : "rounded-[2px] border border-ink/15 bg-gold-pale px-4 py-3 text-sm font-medium text-crimson-deep"
                      }
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
          <p className="mt-6 max-w-2xl text-sm text-stone">{path.certificationRoadmap.notice}</p>
        </section>
      )}

      {path.freeLab && (
        <section
          aria-labelledby="free-lab"
          className="mt-12 rounded-[2px] border-2 border-crimson bg-gold-pale p-6 sm:p-10"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-crimson-deep">{path.freeLab.eyebrow}</p>
          <h2 id="free-lab" className="display mt-3 text-3xl text-crimson-deep sm:text-4xl">
            {path.freeLab.heading}
          </h2>
          <div className="mt-5 max-w-2xl space-y-4 text-ink">
            {path.freeLab.intro.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.14em] text-crimson-deep">{path.freeLab.listLabel}</p>
          <ul className="mt-3 grid gap-x-8 gap-y-2 sm:grid-cols-2">
            {path.freeLab.items.map((item) => (
              <li key={item} className="flex items-start gap-3 text-ink">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-7 flex flex-wrap gap-3">
            {path.freeLab.buttons.map((b) => (
              <a
                key={b.url}
                href={b.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-[2px] bg-crimson px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-parchment hover:bg-crimson-deep"
              >
                {b.label} <span aria-hidden="true">↗</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ))}
          </div>
          <div className="mt-6 max-w-2xl space-y-2 text-sm text-stone">
            {path.freeLab.notes.map((note) => (
              <p key={note}>{note}</p>
            ))}
          </div>
        </section>
      )}

      {(path.milestones || path.showLessonTotals) && (
        <section className="mt-12">
          <h2 className="display border-b border-ink/15 pb-3 text-2xl">
            {path.milestones ? "Program total and milestones" : "Program total"}
          </h2>
          <p className="mt-4 text-ink">
            <span className="display text-4xl text-crimson">{programTotal}</span> lessons across {programCourseCount} courses in{" "}
            {path.stages.length} numbered sections
          </p>
          {startPath && startTotal > 0 && (
            <p className="mt-2 text-sm text-stone">
              Plus {startTotal} lessons in the shared start, {startPath.title}, which comes first.
            </p>
          )}
          {path.milestones && (
            <>
              <dl className="mt-5 grid gap-4 sm:grid-cols-3">
                {path.milestones.map((m) => (
                  <div key={m.label} className="rounded-[2px] border border-ink/15 p-4">
                    <dt className="text-xs uppercase tracking-[0.14em] text-stone">{m.label}</dt>
                    <dd className="mt-2 font-semibold text-crimson">{m.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-sm text-stone">Approximate milestones only — not a promise of employment or of any certification result.</p>
            </>
          )}
        </section>
      )}

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
        {path.stages.map((stage, i) => {
          const dark = Boolean(stage.capstone);
          const total = stageTotal(stage.courseSlugs);
          return (
            <section
              key={stage.label}
              className={dark ? "rounded-[2px] border-2 border-gold bg-crimson-deep p-5 text-gold-pale sm:p-8" : ""}
            >
              <div className={`flex items-baseline gap-4 border-b pb-3 ${dark ? "border-gold/40" : "border-ink/15"}`}>
                <span className={`display text-2xl ${dark ? "text-gold" : "text-crimson"}`}>{String(i + 1).padStart(2, "0")}</span>
                <div className="flex-1">
                  <h2 className={`display text-2xl ${dark ? "text-gold-pale" : ""}`}>{stage.label}</h2>
                  {stage.note && <p className={`text-sm italic ${dark ? "text-gold-pale/80" : "text-stone"}`}>{stage.note}</p>}
                </div>
                {path.showLessonTotals && total > 0 && (
                  <span className="whitespace-nowrap text-xs uppercase tracking-[0.14em] text-gold">Total {total}</span>
                )}
              </div>

              {stage.courseSlugs && (
                <ul className={`divide-y ${dark ? "divide-gold/20" : "divide-ink/10"}`}>
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
                            <h3 className={`display text-xl ${dark ? "text-gold-pale group-hover:text-gold" : "group-hover:text-crimson"}`}>
                              {course.title}
                            </h3>
                            <p className={`mt-1 max-w-xl text-sm ${dark ? "text-gold-pale/80" : "text-stone"}`}>{course.tagline}</p>
                            {path.courseDetails?.[courseSlug] && (
                              <p className={`mt-2 max-w-xl text-sm ${dark ? "text-gold-pale" : "text-ink"}`}>{path.courseDetails[courseSlug]}</p>
                            )}
                            {path.courseDetailLists?.[courseSlug]?.map((list) => (
                              <div key={list.heading} className="mt-3 max-w-xl">
                                <p className={`text-xs font-semibold uppercase tracking-[0.14em] ${dark ? "text-gold" : "text-crimson-deep"}`}>
                                  {list.heading}
                                </p>
                                <ul className="mt-2 flex flex-wrap gap-2">
                                  {list.items.map((item) => (
                                    <li
                                      key={item}
                                      className={`rounded-[2px] border px-2 py-1 text-xs ${dark ? "border-gold/40 text-gold-pale" : "border-ink/15 text-ink"}`}
                                    >
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
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

              {stage.checkpoint && (
                <div
                  className={
                    stage.checkpoint.kind === "destination"
                      ? "mt-6 rounded-[2px] border-2 border-gold bg-crimson-deep p-5 text-gold-pale sm:p-6"
                      : stage.checkpoint.kind === "milestone"
                        ? "mt-6 rounded-[2px] border-2 border-crimson bg-gold-pale p-5 text-crimson-deep sm:p-6"
                        : "mt-6 rounded-[2px] border-l-4 border-gold bg-gold-pale p-5 text-crimson-deep sm:p-6"
                  }
                >
                  <p
                    className={`text-xs font-semibold uppercase tracking-[0.18em] ${stage.checkpoint.kind === "destination" ? "text-gold" : "text-crimson"}`}
                  >
                    {stage.checkpoint.label}
                  </p>
                  <ul className="mt-2 space-y-1">
                    {stage.checkpoint.items.map((item) => (
                      <li key={item} className="display text-lg sm:text-xl">
                        {item}
                      </li>
                    ))}
                  </ul>
                  {stage.checkpoint.note && (
                    <p className={`mt-3 max-w-2xl text-sm font-medium ${stage.checkpoint.kind === "destination" ? "text-gold-pale" : "text-ink"}`}>
                      {stage.checkpoint.note}
                    </p>
                  )}
                </div>
              )}
            </section>
          );
        })}
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
