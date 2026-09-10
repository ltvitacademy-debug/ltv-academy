import Link from "next/link";
import type { Metadata } from "next";
import { CAREER_PATHS } from "@/lib/career-paths";

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
                  <span className="font-semibold text-crimson">{p.salaryRange}</span>
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

      <div className="mt-20">
        <p className="eyebrow mb-4">The long road</p>
        <h2 className="display max-w-2xl text-3xl sm:text-4xl">
          {destinationPaths.length} <em className="text-crimson">destinations</em>, not first choices.
        </h2>
        <p className="mt-4 max-w-2xl text-stone">
          These aren't where a beginner enrolls — they're shown so students
          can see where the {firstChoicePaths.length} paths above eventually converge.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {destinationPaths.map((p) => (
            <Link
              key={p.slug}
              href={`/careers/${p.slug}`}
              className="group rounded-[2px] border border-ink/15 bg-crimson-deep p-7 hover:border-gold"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                Destination path
              </p>
              <h3 className="display mt-3 text-2xl text-gold-pale group-hover:text-gold">
                {p.title}
              </h3>
              <p className="mt-3 text-sm text-gold-pale/80">{p.description}</p>
              <p className="mt-4 text-sm font-semibold text-gold">{p.salaryRange}</p>
            </Link>
          ))}
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
