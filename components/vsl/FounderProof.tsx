import { ABOUT_STORY, TESTIMONIALS } from "@/lib/copy";

export default function FounderProof() {
  return (
    <section className="bg-crimson-deep">
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <p className="eyebrow mb-4 text-gold">Who you&rsquo;d be learning from</p>
        <h2 className="display max-w-2xl text-4xl text-parchment sm:text-5xl">
          Built by someone who&rsquo;s done the job.
        </h2>
        <p className="mt-6 max-w-2xl text-parchment/80">{ABOUT_STORY}</p>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <blockquote
              key={t.name}
              className="rounded-[2px] border border-gold/25 bg-ink/15 p-6"
            >
              <p className="display text-lg text-parchment/90">&ldquo;{t.quote}&rdquo;</p>
              <cite className="mt-3 block text-sm not-italic text-gold-pale">
                — {t.name}
              </cite>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
