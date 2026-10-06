import Link from "next/link";
import type { Metadata } from "next";
import { CAREER_PATHS } from "@/lib/career-paths";
import DestinationIcon from "@/components/DestinationIcon";

const FIRST_CHOICE_COUNT = CAREER_PATHS.filter((p) => !p.isDestination).length;
const DESTINATION_COUNT = CAREER_PATHS.filter((p) => p.isDestination).length;

export const metadata: Metadata = {
  title: "Career Paths",
  description: `${FIRST_CHOICE_COUNT} career paths through the LTV Academy catalog — from your first job to a $200K+ technical destination. Pick a path, see the exact courses.`,
};

export default function CareerPathsPage() {
  const firstChoicePaths = CAREER_PATHS.filter((p) => !p.isDestination);
  const destinationPaths = CAREER_PATHS.filter((p) => p.isDestination);

  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <p className="eyebrow mb-4">Choose your path</p>
      <h1 className="display max-w-3xl text-4xl sm:text-5xl">
        Most paths start at <em className="text-crimson">T-SQL</em>. A couple
        have their own door in.
      </h1>
      <p className="mt-5 max-w-2xl text-stone">
        The catalog isn't dozens of unrelated courses — most of it branches
        from one shared SQL foundation into {firstChoicePaths.length} career
        paths, plus {destinationPaths.length} longer destinations that show
        where the road eventually leads. A couple of paths, like AI Engineer,
        skip that foundation entirely and start on their own. Pick where you
        want to end up, and the exact course sequence is right there.
      </p>

      <ol className="mt-16 divide-y divide-ink/10 border-y border-ink/10">
        {firstChoicePaths.map((p, i) => (
          <li key={p.slug} className="py-10">
            <Link href={`/careers/${p.slug}`} className="group grid gap-3 sm:grid-cols-[5rem_1fr] sm:gap-8">
              <span className="display text-3xl text-crimson sm:text-4xl">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="display text-2xl sm:text-3xl group-hover:text-crimson">
                  {p.title}
                </h2>
                <p className="mt-2 max-w-2xl text-stone">{p.description}</p>
                <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                  {p.salaryRange && <span className="font-semibold text-crimson">{p.salaryRange}</span>}
                  {p.certification && (
                    <span className="text-stone">
                      Certification: <span className="text-ink">{p.certification.split(" — ")[0]}</span>
                    </span>
                  )}
                  <span className="font-medium text-ink underline decoration-gold decoration-2 underline-offset-4 group-hover:decoration-crimson">
                    See the courses →
                  </span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ol>

      <div className="mt-20 rounded-[2px] border border-gold/40 bg-crimson-deep px-5 py-14 sm:px-10 sm:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">The long road</p>
        <h2 className="display mt-4 max-w-2xl text-3xl text-parchment sm:text-4xl">
          {destinationPaths.length} <em className="text-gold-pale">destinations</em>, not first choices.
        </h2>
        <p className="mt-4 max-w-2xl text-gold-pale/70">
          These aren't where a beginner enrolls — they're shown so students
          can see where the {firstChoicePaths.length} paths above eventually converge.
        </p>

        <div className="mt-12 grid gap-px overflow-hidden rounded-[2px] border border-gold/25 bg-gold/25 sm:grid-cols-2">
          {destinationPaths.map((p, i) => {
            const isLastOdd = destinationPaths.length % 2 === 1 && i === destinationPaths.length - 1;
            const topRole = p.targetJobs[p.targetJobs.length - 1];
            return (
              <Link
                key={p.slug}
                href={`/careers/${p.slug}`}
                className={`group relative flex flex-col overflow-hidden bg-crimson-deep p-7 transition-colors hover:bg-[#6b1313] sm:p-8 ${isLastOdd ? "sm:col-span-2" : ""}`}
              >
                <span className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold/10 blur-3xl transition-opacity group-hover:bg-gold/20" />

                <div className="relative flex items-start justify-between gap-4">
                  <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full text-gold-pale shadow-[0_0_0_1.5px_var(--color-gold)]">
                    <DestinationIcon slug={p.slug} className="h-6 w-6" />
                  </span>
                  <p className="pt-1 text-right text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-gold/70">
                    Destination path
                    <span className="mt-0.5 block text-sm tracking-normal text-gold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </p>
                </div>

                <h3 className="display relative mt-5 text-2xl text-gold-pale group-hover:text-gold">
                  {p.title}
                </h3>
                <p className="relative mt-3 text-sm leading-relaxed text-gold-pale/70">{p.description}</p>

                <div className="relative mt-auto flex items-end justify-between gap-4 border-t border-gold/20 pt-5">
                  <div>
                    {p.salaryRange && (
                      <p className="font-semibold tabular-nums text-gold">{p.salaryRange.split(" · ")[0]}</p>
                    )}
                    {topRole && <p className="mt-1 text-xs text-gold-pale/60">{topRole}</p>}
                  </div>
                  <span className="inline-flex flex-shrink-0 items-center gap-2 rounded-[2px] bg-gold px-4 py-2 text-sm font-semibold text-crimson-deep transition-colors group-hover:bg-gold-pale">
                    View path
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <p className="mt-16 max-w-2xl text-sm text-stone">
        One important note: the $200K+ figures above are real, current
        postings — but they're destinations, not promises. Every one of them
        typically asks for years of production experience and technical
        ownership on top of the coursework.
      </p>
    </main>
  );
}
