import Link from "next/link";
import type { CareerPath } from "@/lib/career-paths";
import { getCareerPath } from "@/lib/career-paths";
import { getCourse, lessonCount } from "@/lib/courses";
import { COURSE_CERTIFICATIONS, certificationsForCourses } from "@/lib/course-certifications";

function CourseLogo({ slug, className = "h-6 w-6" }: { slug: string; className?: string }) {
  const logo = COURSE_CERTIFICATIONS[slug]?.logo;
  if (logo) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={`/brand/logos/${logo}.svg`} alt="" className={`${className} object-contain`} aria-hidden="true" />;
  }
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 4h9l3 3v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" />
      <path d="M14 4v4h4" />
    </svg>
  );
}

// Splits a free-text salaryRange like "$80K–$140K as an X · $140K–$200K+ at Y"
// into up to 3 tiers without inventing numbers that aren't already there.
function parseSalaryTiers(salaryRange?: string) {
  if (!salaryRange) return [];
  const labels = ["Starting", "Experienced", "Advanced"];
  const icons = [
    <path key="a" d="M3 17l5-5 4 4 8-9M20 7h-4M20 7v4" />,
    <path key="b" d="M4 19h16M7 19v-5M12 19V9M17 19v-8" />,
    <path key="c" d="M8 4h8v3a4 4 0 0 1-8 0V4ZM6 6H4v1a4 4 0 0 0 4 4M18 6h2v1a4 4 0 0 1-4 4M12 13v3m-3 3h6" />,
  ];
  return salaryRange
    .split(" · ")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 3)
    .map((part, i) => {
      const match = part.match(/\$[\d,]+(?:\.\d+)?[KM]?(?:\s?[-–]\s?\$?[\d,]+(?:\.\d+)?[KM]?)?\+?/);
      const value = match ? match[0] : part;
      const detail = match
        ? (part.slice(0, match.index) + " " + part.slice((match.index ?? 0) + match[0].length))
            .replace(/^\s*(as|at)\s+/i, "")
            .replace(/\s+(as|at)\s*$/i, "")
            .replace(/\s{2,}/g, " ")
            .trim()
        : "";
      return { label: labels[i] ?? "Range", value, detail, icon: icons[i] ?? icons[0] };
    });
}

export default function PathDetailRedesign({
  path,
  hasInterviewPrep,
}: {
  path: CareerPath;
  hasInterviewPrep?: boolean;
}) {
  const allCourseSlugs = path.stages.flatMap((s) => s.courseSlugs ?? []);
  const tiers = parseSalaryTiers(path.salaryRange);

  const heroLogos = Array.from(
    new Set(allCourseSlugs.map((s) => COURSE_CERTIFICATIONS[s]?.logo).filter((l): l is string => Boolean(l)))
  ).slice(0, 3);

  const certs = (() => {
    const fromCourses = certificationsForCourses(allCourseSlugs);
    const seen = new Set(fromCourses.map((c) => c.certification));
    const out = [...fromCourses];
    if (path.certificationRoadmap) {
      for (const step of path.certificationRoadmap.steps) {
        for (const item of step.items) {
          if (!seen.has(item)) {
            seen.add(item);
            out.push({ certification: item });
          }
        }
      }
    }
    return out;
  })();

  const capstoneStages = path.stages.filter((s) => s.capstone && s.courseSlugs?.length);

  const firstCourseSlug =
    path.stages.find((s) => s.courseSlugs?.length)?.courseSlugs?.[0] ??
    path.stages.find((s) => s.pathChoiceSlugs?.length)?.pathChoiceSlugs?.[0];
  const startHref = firstCourseSlug
    ? allCourseSlugs.includes(firstCourseSlug)
      ? `/app/courses/${firstCourseSlug}?path=${path.slug}`
      : `/careers/${firstCourseSlug}`
    : "/app";

  const exactStepIndex = path.targetJobs.findIndex((j) => j.toLowerCase() === path.title.toLowerCase());
  const currentStepIndex = exactStepIndex >= 0 ? exactStepIndex : path.targetJobs.findIndex((j) => j.toLowerCase().includes(path.title.toLowerCase()));

  const stageLessonTotal = (slugs?: string[]) =>
    (slugs ?? []).reduce((sum, s) => {
      const c = getCourse(s);
      return sum + (c ? lessonCount(c) : 0);
    }, 0);
  const programTotal = path.stages.reduce((sum, st) => sum + stageLessonTotal(st.courseSlugs), 0);
  const programCourseCount = path.stages.reduce((sum, st) => sum + (st.courseSlugs?.length ?? 0), 0);
  const startStage = path.stages.find((st) => st.label.startsWith("Start") && st.pathChoiceSlugs?.length === 1);
  const startPath = startStage ? getCareerPath(startStage.pathChoiceSlugs![0]) : undefined;
  const startTotal = startPath ? startPath.stages.reduce((sum, st) => sum + stageLessonTotal(st.courseSlugs), 0) : 0;

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/careers/${path.slug}.jpg`} alt="" className="absolute inset-0 h-full w-full object-cover opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />

        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 sm:pt-14">
          <Link href="/careers" className="text-sm text-parchment/70 hover:text-gold-pale">
            ← All career paths
          </Link>

          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.22em] text-gold">
            {path.isDestination ? "Destination path" : "Career path"}
          </p>
          <h1 className="display mt-3 max-w-2xl text-4xl text-parchment sm:text-6xl">
            {path.title}
            <span className="text-gold">.</span>
          </h1>
          {path.subtitle && <p className="mt-3 max-w-xl text-lg font-medium text-gold-pale">{path.subtitle}</p>}

          {path.longDescription ? (
            <div className="mt-5 max-w-xl space-y-3 text-parchment/80">
              {path.longDescription.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
          ) : (
            <p className="mt-5 max-w-xl text-parchment/80">{path.description}</p>
          )}

          {path.capstoneFlow && (
            <ol className="mt-5 flex max-w-xl flex-wrap items-center gap-x-2 gap-y-2 text-sm">
              {path.capstoneFlow.map((step, i) => (
                <li key={step} className="flex items-center gap-2">
                  <span className="rounded-[2px] border border-gold/40 bg-ink/40 px-3 py-1.5 font-medium text-gold-pale">{step}</span>
                  {i < path.capstoneFlow!.length - 1 && <span className="text-gold">→</span>}
                </li>
              ))}
            </ol>
          )}

          {path.afterFlow && (
            <div className="mt-4 max-w-xl space-y-3 text-sm text-parchment/70">
              {path.afterFlow.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-4">
            <Link href={startHref} className="rounded-[2px] bg-gold px-6 py-3.5 text-sm font-semibold text-crimson-deep hover:bg-gold-pale transition-colors">
              Start this path →
            </Link>
            <a href="#curriculum" className="rounded-[2px] border border-parchment/30 px-6 py-3.5 text-sm font-semibold text-parchment hover:border-gold hover:text-gold-pale transition-colors">
              See full curriculum
            </a>
          </div>

          {heroLogos.length > 0 && (
            <div className="mt-10 flex items-center gap-3">
              <span className="text-xs uppercase tracking-[0.14em] text-parchment/50">Tools you&rsquo;ll use</span>
              {heroLogos.map((logo) => (
                <span key={logo} className="flex h-9 w-9 items-center justify-center rounded-full bg-parchment p-1.5 shadow-[0_0_0_1.5px_var(--color-gold)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/brand/logos/${logo}.svg`} alt="" className="h-full w-full object-contain" />
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Stat tiers */}
        {tiers.length > 0 && (
          <div className="relative border-t border-gold/20 bg-ink">
            <div className={`mx-auto grid max-w-6xl divide-y divide-gold/15 px-4 py-8 sm:divide-x sm:divide-y-0 sm:px-6 sm:py-10 ${tiers.length === 3 ? "sm:grid-cols-3" : tiers.length === 2 ? "sm:grid-cols-2" : ""}`}>
              {tiers.map((tier) => (
                <div key={tier.label} className="flex items-start gap-3 py-4 first:pt-0 sm:py-0 sm:px-8 sm:first:pl-0">
                  <svg className="mt-0.5 h-6 w-6 flex-shrink-0 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {tier.icon}
                  </svg>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-gold">{tier.label}</p>
                    <p className="display mt-1 text-xl text-parchment">{tier.value}</p>
                    {tier.detail && <p className="mt-0.5 text-xs text-parchment/60">{tier.detail}</p>}
                  </div>
                </div>
              ))}
            </div>
            <p className="mx-auto max-w-6xl px-4 pb-6 text-xs text-parchment/40 sm:px-6">
              Salary ranges are market targets, not guarantees, and vary by experience, location, employer and total compensation.
            </p>
          </div>
        )}
      </section>

      {/* Career progression stepper */}
      {path.targetJobs.length > 1 && (
        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <p className="eyebrow mb-3">Career progression</p>
          <h2 className="display max-w-2xl text-3xl sm:text-4xl">
            The ladder from here to <em className="text-crimson">{path.targetJobs[path.targetJobs.length - 1]}</em>.
          </h2>
          <div className="mt-10 flex flex-wrap items-center gap-x-2 gap-y-6">
            {path.targetJobs.map((job, i) => (
              <div key={job} className="flex items-center gap-2">
                <div className="flex w-28 flex-col items-center text-center">
                  <span
                    className={`flex h-14 w-14 items-center justify-center rounded-full border-2 ${
                      i === currentStepIndex ? "border-gold bg-crimson-deep text-gold-pale" : "border-ink/15 bg-parchment text-stone"
                    }`}
                  >
                    <span className="display text-lg">{i + 1}</span>
                  </span>
                  <span className={`mt-2 text-xs leading-tight ${i === currentStepIndex ? "font-semibold text-crimson-deep" : "text-stone"}`}>{job}</span>
                </div>
                {i < path.targetJobs.length - 1 && (
                  <svg width="20" height="12" viewBox="0 0 20 12" fill="none" className="flex-shrink-0 text-gold" aria-hidden="true">
                    <path d="M1 6h16M12 1l6 5-6 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {path.specializations && (
        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <h2 className="display text-2xl sm:text-3xl">{path.specializations.heading}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
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
        <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
          <div className="rounded-[2px] border-l-4 border-crimson bg-gold-pale p-5 sm:p-6">
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-crimson-deep">{path.positioning.heading}</h2>
            <div className="mt-3 max-w-2xl space-y-3 text-ink">
              {path.positioning.paragraphs.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      {path.certificationRoadmap && (
        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <p className="eyebrow mb-3">Certification roadmap</p>
          <h2 className="display text-2xl sm:text-3xl">{path.certificationRoadmap.heading}</h2>
          <ol className="mt-8 space-y-6">
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
        <section aria-labelledby="free-lab" className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div className="rounded-[2px] border-2 border-crimson bg-gold-pale p-6 sm:p-10">
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
          </div>
        </section>
      )}

      {path.milestones && (
        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <p className="eyebrow mb-3">Program</p>
          <h2 className="display text-2xl sm:text-3xl">Program total and milestones</h2>
          <p className="mt-4 text-ink">
            <span className="display text-4xl text-crimson">{programTotal}</span> lessons across {programCourseCount} courses in{" "}
            {path.stages.length} numbered sections
          </p>
          {startPath && startTotal > 0 && (
            <p className="mt-2 text-sm text-stone">
              Plus {startTotal} lessons in the shared start, {startPath.title}, which comes first.
            </p>
          )}
          <dl className="mt-5 grid gap-4 sm:grid-cols-3">
            {path.milestones.map((m) => (
              <div key={m.label} className="rounded-[2px] border border-ink/15 p-4">
                <dt className="text-xs uppercase tracking-[0.14em] text-stone">{m.label}</dt>
                <dd className="mt-2 font-semibold text-crimson">{m.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-sm text-stone">Approximate milestones only — not a promise of employment or of any certification result.</p>
        </section>
      )}

      {path.labRequirement && (
        <section aria-labelledby="lab-requirement" className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div className="rounded-[2px] border-2 border-gold bg-crimson-deep p-6 text-gold-pale sm:p-10">
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
              <span className="sr-only"> (opens in a new tab)</span>
            </a>

            <p className="mt-5 max-w-2xl text-sm text-gold-pale/80">
              <strong className="font-semibold text-gold">IMPORTANT:</strong> {path.labRequirement.importantNote}
            </p>

            <div className="mt-8 max-w-2xl border-t border-gold/30 pt-6">
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">{path.labRequirement.whenHeading}</h3>
              <p className="mt-3 text-gold-pale/90">{path.labRequirement.whenText}</p>
            </div>

            <p className="mt-6 text-xs text-gold-pale/70">{path.labRequirement.verifiedNote}</p>
          </div>
        </section>
      )}

      {path.compensation && (
        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <p className="eyebrow mb-3">Compensation</p>
          <h2 className="display text-2xl sm:text-3xl">{path.compensation.heading}</h2>
          <div className="mt-4 max-w-2xl space-y-4 text-ink">
            {path.compensation.paragraphs.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>
        </section>
      )}

      {path.progression && (
        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <p className="eyebrow mb-3">Progression</p>
          <h2 className="display text-2xl sm:text-3xl">{path.progression.heading}</h2>
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

      {path.competencies && (
        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <p className="eyebrow mb-3">Required competencies</p>
          <h2 className="display text-2xl sm:text-3xl">{path.competencies.heading}</h2>
          {path.competencies.intro && <p className="mt-4 max-w-3xl text-ink">{path.competencies.intro}</p>}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {path.competencies.items.map((item) => (
              <div key={item.label} className="rounded-[2px] border border-ink/15 bg-white/40 p-5">
                <h3 className="display text-lg text-crimson-deep">{item.label}</h3>
                <p className="mt-1.5 text-sm text-stone">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Curriculum + sidebar */}
      <div id="curriculum" className="bg-[color-mix(in_srgb,var(--color-parchment)_92%,var(--color-ink))] py-14 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_20rem]">
          <div>
            <p className="eyebrow mb-3">The curriculum</p>
            <h2 className="display text-3xl sm:text-4xl">What You&rsquo;ll Learn</h2>
            <p className="mt-3 max-w-xl text-stone">A structured curriculum that builds real {path.title} skills, course by course.</p>

            <div className="mt-10 space-y-10">
              {path.stages.map((stage, i) => {
                const courses = (stage.courseSlugs ?? []).map((s) => getCourse(s)).filter((c): c is NonNullable<typeof c> => Boolean(c));
                const total = courses.reduce((sum, c) => sum + lessonCount(c), 0);
                return (
                  <div key={stage.label}>
                    <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-ink/15 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="display flex h-8 w-8 items-center justify-center rounded-full bg-crimson-deep text-sm text-gold-pale">{i + 1}</span>
                        <h3 className="display text-xl">{stage.label}</h3>
                      </div>
                      {courses.length > 0 && (
                        <span className="text-xs uppercase tracking-[0.14em] text-stone">
                          {courses.length} course{courses.length === 1 ? "" : "s"} · {total} lessons
                        </span>
                      )}
                    </div>
                    {stage.note && <p className="mt-2 text-sm italic text-stone">{stage.note}</p>}

                    {courses.length > 0 && (
                      <div className="mt-5 grid gap-4 sm:grid-cols-2">
                        {courses.map((course) => (
                          <Link
                            key={course.slug}
                            href={`/app/courses/${course.slug}?path=${path.slug}`}
                            className="group flex gap-3 rounded-[2px] border border-ink/15 bg-white/40 p-4 hover:border-crimson"
                          >
                            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-parchment shadow-[0_0_0_1.5px_var(--color-gold)]">
                              <CourseLogo slug={course.slug} className="h-5 w-5" />
                            </span>
                            <div className="min-w-0">
                              <div className="flex items-baseline justify-between gap-2">
                                <h4 className="display text-base group-hover:text-crimson">{course.title}</h4>
                              </div>
                              <p className="text-xs text-stone">{lessonCount(course)} lessons</p>
                              <p className="mt-1 text-sm text-stone line-clamp-2">{course.tagline}</p>
                              {path.courseDetails?.[course.slug] && (
                                <p className="mt-2 text-sm text-ink">{path.courseDetails[course.slug]}</p>
                              )}
                              {path.courseDetailLists?.[course.slug]?.map((list) => (
                                <div key={list.heading} className="mt-2">
                                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-crimson-deep">{list.heading}</p>
                                  <ul className="mt-1 flex flex-wrap gap-1.5">
                                    {list.items.map((item) => (
                                      <li key={item} className="rounded-[2px] border border-ink/15 px-1.5 py-0.5 text-xs text-ink">
                                        {item}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                              <span className="mt-1.5 inline-block text-xs font-semibold text-crimson-deep group-hover:underline">View course →</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}

                    {stage.pathChoiceSlugs && stage.pathChoiceSlugs.length > 0 && (
                      <div className="mt-5 grid gap-4 sm:grid-cols-2">
                        {stage.pathChoiceSlugs.map((choiceSlug) => {
                          const choice = getCareerPath(choiceSlug);
                          return (
                            <Link key={choiceSlug} href={`/careers/${choiceSlug}`} className="group rounded-[2px] border border-dashed border-ink/25 p-4 hover:border-crimson">
                              <p className="text-xs uppercase tracking-[0.14em] text-stone">Choose one</p>
                              <h4 className="display mt-1 text-base group-hover:text-crimson">{choice?.title ?? choiceSlug.replace(/-/g, " ")}</h4>
                              {choice?.salaryRange && <p className="mt-1 text-sm text-stone">{choice.salaryRange}</p>}
                            </Link>
                          );
                        })}
                      </div>
                    )}

                    {stage.checkpoint && (
                      <div
                        className={
                          stage.checkpoint.kind === "destination"
                            ? "mt-5 rounded-[2px] border-2 border-gold bg-crimson-deep p-5 text-gold-pale"
                            : "mt-5 rounded-[2px] border-l-4 border-gold bg-gold-pale p-5 text-crimson-deep"
                        }
                      >
                        <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${stage.checkpoint.kind === "destination" ? "text-gold" : "text-crimson"}`}>
                          {stage.checkpoint.label}
                        </p>
                        <ul className="mt-2 space-y-1">
                          {stage.checkpoint.items.map((item) => (
                            <li key={item} className="display text-lg">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            {capstoneStages.length > 0 && (
              <div className="rounded-[2px] border border-gold/40 bg-crimson-deep p-5 text-gold-pale">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                    <path d="M4 4h16v4H4zM4 10h16v10H4z" />
                  </svg>
                  Real-world projects
                </p>
                <ul className="mt-3 space-y-2.5 text-sm">
                  {capstoneStages.flatMap((s) => s.courseSlugs ?? []).map((slug) => {
                    const c = getCourse(slug);
                    if (!c) return null;
                    return (
                      <li key={slug} className="flex items-start gap-2">
                        <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                          <path d="M3 8.5l3 3 7-7" />
                        </svg>
                        <span className="text-gold-pale/90">{c.title}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {certs.length > 0 && (
              <div className="rounded-[2px] border border-ink/15 bg-white/60 p-5">
                <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-crimson-deep">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                    <circle cx="12" cy="8" r="5" />
                    <path d="M8.5 12.5 7 21l5-3 5 3-1.5-8.5" />
                  </svg>
                  What this prepares you for
                </p>
                <ul className="mt-3 space-y-3">
                  {certs.map((c) => (
                    <li key={c.certification} className="flex items-center gap-3 text-sm">
                      {c.logo ? (
                        <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-parchment shadow-[0_0_0_1px_var(--color-gold)]">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={`/brand/logos/${c.logo}.svg`} alt="" className="h-4 w-4 object-contain" />
                        </span>
                      ) : (
                        <span className="h-7 w-7 flex-shrink-0 rounded-full border border-ink/15" aria-hidden="true" />
                      )}
                      <span className="text-ink">{c.certification}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-stone">LTV Academy does not issue certifications — this shows the skills these courses cover.</p>
              </div>
            )}

            <div className="rounded-[2px] bg-crimson-deep p-6 text-center text-gold-pale">
              <p className="display text-xl">Ready to become {/^[aeiou]/i.test(path.title) ? "an" : "a"} {path.title}?</p>
              <p className="mt-2 text-sm text-gold-pale/80">Step-by-step training and real projects to break into one of the most in-demand careers in tech.</p>
              <Link href={startHref} className="mt-5 inline-block rounded-[2px] bg-gold px-6 py-3 text-sm font-semibold text-crimson-deep hover:bg-gold-pale transition-colors">
                Start this path →
              </Link>
              {hasInterviewPrep && (
                <Link
                  href={`/app/interview-prep/${path.slug}`}
                  className="mt-3 block rounded-[2px] border border-gold-pale/40 px-6 py-3 text-sm font-semibold text-gold-pale transition-colors hover:border-gold-pale hover:bg-crimson-deep/60"
                >
                  Practice interview questions →
                </Link>
              )}
            </div>
          </aside>
        </div>
      </div>

      {path.principalProjects && (
        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <p className="eyebrow mb-3">Prove it</p>
          <h2 className="display text-2xl sm:text-3xl">{path.principalProjects.heading}</h2>
          {path.principalProjects.intro && <p className="mt-4 max-w-3xl text-ink">{path.principalProjects.intro}</p>}
          <div className="mt-8 space-y-6">
            {path.principalProjects.projects.map((proj, i) => (
              <div key={proj.title} className="rounded-[2px] border-2 border-ink/15 p-6 sm:p-7">
                <div className="flex items-baseline gap-3">
                  <span className="display text-2xl text-crimson">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="display text-xl">{proj.title}</h3>
                </div>
                <p className="mt-3 max-w-2xl text-ink">{proj.description}</p>
                {proj.deliverables && (
                  <ol className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm">
                    {proj.deliverables.map((d, di) => (
                      <li key={d} className="flex items-center gap-2">
                        <span className="rounded-[2px] border border-ink/15 bg-parchment px-3 py-1.5 font-medium text-ink">{d}</span>
                        {di < proj.deliverables!.length - 1 && <span className="text-gold">→</span>}
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {path.experienceVsEducation && (
        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div className="rounded-[2px] border-2 border-ink/15 bg-white/40 p-6 sm:p-8">
            <p className="eyebrow mb-3">Honest about the ladder</p>
            <h2 className="display text-2xl sm:text-3xl">{path.experienceVsEducation.heading}</h2>
            {path.experienceVsEducation.intro && (
              <p className="mt-4 max-w-3xl text-ink">{path.experienceVsEducation.intro}</p>
            )}
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[2px] border-2 border-crimson bg-gold-pale p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-crimson-deep">
                  {path.experienceVsEducation.taughtLabel}
                </p>
                <ul className="mt-3 space-y-1.5">
                  {path.experienceVsEducation.taught.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-ink">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[2px] border border-ink/15 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone">
                  {path.experienceVsEducation.experienceLabel}
                </p>
                <ul className="mt-3 space-y-1.5">
                  {path.experienceVsEducation.experience.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-ink">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-stone" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {path.experienceVsEducation.closing && (
              <p className="mt-6 max-w-3xl text-sm italic text-stone">{path.experienceVsEducation.closing}</p>
            )}
          </div>
        </section>
      )}

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="rounded-[2px] bg-gold-pale p-6">
          <p className="text-sm uppercase tracking-[0.14em] text-crimson-deep">Where this leads</p>
          <p className="mt-2 max-w-2xl text-ink">{path.destinationNote}</p>
        </div>
      </div>
    </main>
  );
}
