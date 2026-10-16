import Link from "next/link";
import { CAREER_PATHS } from "@/lib/career-paths";
import CareerPathIcon from "@/components/CareerPathIcon";

export default function PathsGrid() {
  return (
    <section className="bg-parchment">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="display text-4xl sm:text-5xl">
              <em className="text-crimson">24</em> Technology Career Options.
            </h2>
            <p className="mt-3 max-w-2xl text-stone">
              Choose a career path that matches your goals. Each path
              includes a structured curriculum, video lessons, hands-on
              practice, knowledge checks, AI learning support, and interview
              preparation.
            </p>
          </div>
          <Link
            href="/careers"
            className="flex-shrink-0 text-sm font-semibold text-crimson hover:text-crimson-deep"
          >
            Explore All Career Paths →
          </Link>
        </div>

        <div className="mt-10 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {CAREER_PATHS.map((path, i) => (
            <Link
              key={path.slug}
              href={`/careers/${path.slug}`}
              title={path.title}
              className="group flex items-center gap-2.5 rounded-[2px] border border-ink/10 bg-white/50 px-3 py-2.5 transition-colors hover:border-crimson hover:bg-white"
            >
              <span className="display w-5 flex-shrink-0 text-sm text-crimson">
                {i + 1}
              </span>
              <CareerPathIcon slug={path.slug} className="h-4.5 w-4.5 flex-shrink-0 text-crimson-deep" />
              <span className="truncate text-sm font-medium text-ink group-hover:text-crimson-deep">
                {path.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
