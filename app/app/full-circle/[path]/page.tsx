import Link from "next/link";
import { notFound } from "next/navigation";
import { CAREER_PATHS, getCareerPath } from "@/lib/career-paths";
import { loadFullCircleSeries, hasFullCircleSeries } from "@/lib/fullCircleSeries";
import { renderMarkdown } from "@/lib/courses";
import FullCircleCurriculum from "@/components/app/FullCircleCurriculum";

export function generateStaticParams() {
  return CAREER_PATHS.filter((p) => hasFullCircleSeries(p.slug)).map((p) => ({ path: p.slug }));
}

export default async function FullCircleOverviewPage({
  params,
}: {
  params: Promise<{ path: string }>;
}) {
  const { path: pathSlug } = await params;
  const careerPath = getCareerPath(pathSlug);
  if (!careerPath) notFound();
  const series = loadFullCircleSeries(pathSlug);
  if (!series) notFound();

  const publishedCount = series.lessons.filter((l) => l.status === "published").length;

  return (
    <main className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <nav className="mb-6 text-sm text-stone">
        <Link href="/app" className="hover:text-crimson">Learning center</Link>
        {" · "}
        <Link href={`/careers/${careerPath.slug}`} className="hover:text-crimson">
          {careerPath.title}
        </Link>
        {" · "}
        <span>Full-Circle Implementation Series</span>
      </nav>

      <p className="eyebrow mb-3">Full-Circle Implementation Series</p>
      <h1 className="display text-4xl sm:text-5xl">{series.projectTitle}</h1>
      <p className="mt-4 max-w-2xl text-stone">{series.projectTagline}</p>

      <div className="mt-8 flex flex-wrap gap-3">
        <span className="inline-flex items-center gap-2 border border-ink/15 bg-white/50 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-stone shadow-sm">
          {series.lessons.length} videos planned
        </span>
        <span className="inline-flex items-center gap-2 border border-gold bg-gold/15 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-crimson-deep shadow-sm">
          {publishedCount} live now
        </span>
      </div>

      <div className="mt-10 border-t-2 border-gold pt-8">
        <p className="eyebrow mb-4">The scenario</p>
        <article
          className="example-page"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(series.businessContext) }}
        />
      </div>

      <div className="mt-10 border-t-2 border-gold pt-8">
        <p className="eyebrow mb-4">What you&apos;ll end up with</p>
        <article
          className="example-page"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(series.architectureSummary) }}
        />
      </div>

      <div className="mt-12 border-t-2 border-gold pt-8">
        <FullCircleCurriculum
          pathSlug={careerPath.slug}
          lessons={series.lessons.map((l) => ({
            n: l.n,
            slug: l.slug,
            title: l.title,
            summary: l.summary,
            phase: l.phase,
            published: l.status === "published",
            durationLabel: l.durationLabel,
          }))}
        />
      </div>
    </main>
  );
}
