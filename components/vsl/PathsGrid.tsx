import Link from "next/link";
import { CAREER_PATHS } from "@/lib/career-paths";
import CareerPathIcon from "@/components/CareerPathIcon";

export default function PathsGrid() {
  const core = CAREER_PATHS.filter((p) => !p.isDestination);
  const destinations = CAREER_PATHS.filter((p) => p.isDestination);

  return (
    <section className="bg-parchment">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <p className="eyebrow mb-4">1. Choose your career direction</p>
        <h2 className="display max-w-2xl text-4xl sm:text-5xl">
          <em className="text-crimson">24</em> technology career paths.
        </h2>
        <p className="mt-4 max-w-2xl text-stone">
          Sixteen core paths take you from zero to job-ready. Eight advanced
          destinations build on that foundation for senior and specialist
          roles. Every path includes video lessons, hands-on practice,
          real-world projects, and interview preparation.
        </p>

        <div className="mt-12">
          <p className="eyebrow mb-4">16 core career paths</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {core.map((path, i) => (
              <Link
                key={path.slug}
                href={`/careers/${path.slug}`}
                className="group flex items-start gap-3 rounded-[2px] border border-ink/12 bg-white/40 p-4 transition-colors hover:border-gold"
              >
                <span className="display mt-0.5 flex-shrink-0 text-lg text-crimson">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex min-w-0 items-center gap-2">
                  <CareerPathIcon slug={path.slug} className="h-5 w-5 flex-shrink-0 text-crimson-deep" />
                  <span className="truncate text-sm font-semibold text-ink group-hover:text-crimson-deep">
                    {path.title}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <p className="eyebrow mb-4">8 advanced career destinations</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {destinations.map((path) => (
              <Link
                key={path.slug}
                href={`/careers/${path.slug}`}
                className="group flex items-start gap-3 rounded-[2px] border border-gold/30 bg-crimson-deep p-4 transition-colors hover:border-gold"
              >
                <CareerPathIcon slug={path.slug} className="mt-0.5 h-5 w-5 flex-shrink-0 text-gold" />
                <span className="truncate text-sm font-semibold text-gold-pale group-hover:text-gold">
                  {path.title}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <Link
          href="/careers"
          className="mt-10 inline-flex items-center gap-2 text-sm font-semibold text-crimson hover:text-crimson-deep"
        >
          Compare all 24 career paths in detail
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
