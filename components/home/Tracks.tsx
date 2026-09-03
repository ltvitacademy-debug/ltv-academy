import { TRACKS } from "@/lib/copy";

export default function Tracks() {
  return (
    <section id="tracks" className="scroll-mt-20 bg-parchment">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <p className="eyebrow mb-4">What we teach</p>
        <h2 className="display max-w-2xl text-4xl sm:text-5xl">
          The <em className="text-crimson">nine</em> tracks.
        </h2>
        <p className="mt-4 max-w-xl text-stone">
          One subscription opens every one of them. New classes launch every
          month.
        </p>

        <ol className="mt-14 divide-y divide-ink/10 border-y border-ink/10">
          {TRACKS.map((t) => (
            <li key={t.n} className="group grid gap-3 py-8 sm:grid-cols-[5rem_1fr] sm:gap-8">
              <span className="display text-3xl text-crimson sm:text-4xl">
                {t.n}
              </span>
              <div>
                <h3 className="display text-2xl sm:text-3xl">{t.title}</h3>
                <p className="mt-2 max-w-2xl text-stone">{t.line}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
