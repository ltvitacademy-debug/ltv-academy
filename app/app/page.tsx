import Link from "next/link";
import { COURSES, lessonCount } from "@/lib/courses";
import ContinueCard from "@/components/app/ContinueCard";

export default function DashboardPage() {
  const available = COURSES.filter((c) => c.status === "available");
  const comingSoon = COURSES.filter((c) => c.status === "coming-soon");

  return (
    <main className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <p className="eyebrow mb-4">Welcome back</p>
      <h1 className="display text-4xl sm:text-5xl">
        Your <em className="text-crimson">learning</em> center.
      </h1>

      <ContinueCard />

      <section className="mt-14">
        <p className="eyebrow mb-6">Available now</p>
        <div className="grid gap-6 md:grid-cols-2">
          {available.map((c) => (
            <Link
              key={c.slug}
              href={`/app/courses/${c.slug}`}
              className="group block border border-ink/15 bg-white/40 p-8 transition-colors hover:border-gold"
            >
              <h2 className="display text-3xl group-hover:text-crimson">
                {c.title}
              </h2>
              <p className="mt-3 text-stone">{c.tagline}</p>
              <p className="mt-5 text-sm uppercase tracking-[0.18em] text-gold">
                {c.chapters?.length} chapters · {lessonCount(c)} lessons →
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <p className="eyebrow mb-6">Coming soon</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {comingSoon.map((c) => (
            <div
              key={c.slug}
              className="border border-ink/10 p-6 opacity-70"
            >
              <h3 className="display text-xl">{c.title}</h3>
              <p className="mt-2 text-sm text-stone line-clamp-2">{c.tagline}</p>
              <p className="mt-4 text-xs uppercase tracking-[0.18em] text-stone">
                Coming soon
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
