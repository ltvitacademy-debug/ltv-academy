import Link from "next/link";
import type { Metadata } from "next";
import { CAREER_PATHS, type CareerPath } from "@/lib/career-paths";
import CareerPathIcon from "@/components/CareerPathIcon";

const FIRST_CHOICE_COUNT = CAREER_PATHS.filter((p) => !p.isDestination).length;
const DESTINATION_COUNT = CAREER_PATHS.filter((p) => p.isDestination).length;

// Photos still being produced — renders a marked placeholder instead of a
// broken image. Remove an entry here once public/careers/<slug>.jpg lands.
const PENDING_PHOTOS = new Set<string>([]);

export const metadata: Metadata = {
  title: "Career Paths",
  description: `${FIRST_CHOICE_COUNT} career paths through the LTV Academy catalog — from your first job to a $200K+ technical destination. Pick a path, see the exact courses.`,
};

function PathCard({
  path,
  index,
  dark,
  spanFull,
}: {
  path: CareerPath;
  index: number;
  dark: boolean;
  spanFull?: boolean;
}) {
  const hasPhoto = !PENDING_PHOTOS.has(path.slug);
  const topRole = path.targetJobs[path.targetJobs.length - 1];

  return (
    <Link
      href={`/careers/${path.slug}`}
      className={`group flex flex-col overflow-hidden rounded-[2px] border transition-colors ${
        dark
          ? "border-gold/25 bg-crimson-deep hover:border-gold"
          : "border-ink/15 bg-crimson-deep hover:border-gold"
      } ${spanFull ? "sm:col-span-2 sm:flex-row sm:min-h-[240px] lg:col-span-3" : ""}`}
    >
      <div className={`relative overflow-hidden bg-ink ${spanFull ? "aspect-[16/10] sm:aspect-auto sm:w-80 sm:flex-shrink-0" : "aspect-[16/10]"}`}>
        {hasPhoto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`/careers/${path.slug}.jpg`}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-crimson-deep to-ink text-gold-pale/50">
            <CareerPathIcon slug={path.slug} className="h-9 w-9" />
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em]">Photo coming soon</span>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-crimson-deep via-crimson-deep/0 to-transparent" />
        <span className="display absolute left-3 top-3 text-2xl text-gold [text-shadow:0_1px_6px_rgba(0,0,0,0.6)]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-full bg-parchment text-crimson-deep shadow-[0_0_0_1.5px_var(--color-gold)]">
          <CareerPathIcon slug={path.slug} className="h-5 w-5" />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="display text-xl text-gold-pale group-hover:text-gold">{path.title}</h3>
        <p className={`mt-2 text-sm leading-relaxed text-gold-pale/70 ${spanFull ? "sm:line-clamp-2" : "line-clamp-3"}`}>
          {path.description}
        </p>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-gold/20 pt-4 mt-4">
          <div className="min-w-0">
            {path.salaryRange && (
              <p className="truncate text-sm font-semibold tabular-nums text-gold">{path.salaryRange.split(" · ")[0]}</p>
            )}
            {topRole && <p className="truncate text-xs text-gold-pale/60">{topRole}</p>}
          </div>
          <span className="inline-flex flex-shrink-0 items-center gap-1.5 rounded-[2px] bg-gold px-3 py-1.5 text-xs font-semibold text-crimson-deep transition-colors group-hover:bg-gold-pale">
            {dark ? "View path" : "Learn path"}
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function CareerPathsPage() {
  const firstChoicePaths = CAREER_PATHS.filter((p) => !p.isDestination);
  const destinationPaths = CAREER_PATHS.filter((p) => p.isDestination);

  return (
    <main>

      <div id="paths" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <p className="eyebrow mb-4">Destination paths</p>
        <h2 className="display max-w-2xl text-3xl sm:text-4xl">
          Choose your <em className="text-crimson">path</em>.
        </h2>
        <p className="mt-4 max-w-2xl text-stone">
          Every path below shows real-world skills, certifications, and
          hands-on projects aimed at a high-paying role in today&rsquo;s tech
          industry. A couple, like AI Engineer, skip the shared SQL foundation
          and start entirely on their own.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {firstChoicePaths.map((p, i) => (
            <PathCard key={p.slug} path={p} index={i} dark={false} />
          ))}
        </div>

        {/* Destinations */}
        <div className="mt-20 rounded-[2px] border border-gold/40 bg-crimson-deep px-5 py-14 sm:px-10 sm:py-16">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">The long road</p>
          <h2 className="display mt-4 max-w-2xl text-3xl text-parchment sm:text-4xl">
            {destinationPaths.length} <em className="text-gold-pale">destinations</em>, not first choices.
          </h2>
          <p className="mt-4 max-w-2xl text-gold-pale/70">
            These aren&rsquo;t where a beginner enrolls — they&rsquo;re shown
            so students can see where the {firstChoicePaths.length} paths
            above eventually converge.
          </p>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {destinationPaths.map((p, i) => (
              <PathCard key={p.slug} path={p} index={i} dark spanFull={destinationPaths.length % 3 === 1 && i === destinationPaths.length - 1} />
            ))}
          </div>
        </div>

        <p className="mt-16 max-w-2xl text-sm text-stone">
          One important note: the $200K+ figures above are real, current
          postings — but they&rsquo;re destinations, not promises. Every one
          of them typically asks for years of production experience and
          technical ownership on top of the coursework.
        </p>
      </div>
    </main>
  );
}
