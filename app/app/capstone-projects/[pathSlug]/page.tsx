import Link from "next/link";
import { notFound } from "next/navigation";
import { CAREER_PATHS, getCareerPath } from "@/lib/career-paths";
import { getCapstoneTiers } from "@/lib/capstoneProjects";

export function generateStaticParams() {
  return CAREER_PATHS.filter((p) => (p.capstoneProjects ? true : false)).map((p) => ({
    pathSlug: p.slug,
  }));
}

const LEVEL_NOTE: Record<string, string> = {
  Beginner: "Start here if this is your first project in this path. Smaller scope, one or two tools.",
  Intermediate: "A bigger ask, more of the stack, and a real troubleshooting moment along the way.",
  Advanced: "The full end-to-end build — every tool in the path, tied into one real solution.",
};

export default async function CapstoneProjectsPage({
  params,
}: {
  params: Promise<{ pathSlug: string }>;
}) {
  const { pathSlug } = await params;
  const careerPath = getCareerPath(pathSlug);
  if (!careerPath) notFound();

  const tiers = getCapstoneTiers(pathSlug);
  if (tiers.length === 0) notFound();

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm text-stone">
        <Link href="/app" className="hover:text-crimson">
          Learning center
        </Link>
        {" · "}
        <Link href={`/careers/${careerPath.slug}`} className="hover:text-crimson">
          {careerPath.title}
        </Link>
        {" · "}
        <span>Capstone projects</span>
      </nav>

      <p className="eyebrow mb-3">Build something real</p>
      <h1 className="display text-3xl sm:text-4xl">
        {careerPath.title} <span className="text-crimson">capstone projects</span>
      </h1>
      <p className="mt-4 max-w-2xl text-stone">
        Three real projects, one path — pick the one that matches where you are. Each one is a
        complete, guided build: a real business scenario, real tools, and instructions the whole
        way through.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-1">
        {tiers.map((tier) => (
          <Link
            key={tier.courseSlug}
            href={`/app/courses/${tier.courseSlug}`}
            className="group block rounded-[2px] border-2 border-ink/15 bg-white/50 p-6 transition-colors hover:border-crimson"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-crimson-deep">
                {tier.level}
              </p>
              <span className="text-xs uppercase tracking-[0.14em] text-stone">
                {tier.lessons} lesson{tier.lessons === 1 ? "" : "s"}
              </span>
            </div>
            <h2 className="display mt-2 text-2xl group-hover:text-crimson">{tier.title}</h2>
            <p className="mt-2 text-sm text-stone">{tier.tagline}</p>
            <p className="mt-3 text-xs text-stone/80">{LEVEL_NOTE[tier.level]}</p>
            <span className="mt-4 inline-block text-sm font-semibold text-crimson-deep group-hover:underline">
              Start this project →
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-14 border-t border-ink/15 pt-6">
        <Link href={`/careers/${careerPath.slug}`} className="text-sm font-semibold text-stone hover:text-crimson">
          ← Back to {careerPath.title}
        </Link>
      </div>
    </main>
  );
}
