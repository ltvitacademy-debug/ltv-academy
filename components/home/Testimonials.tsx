import { TESTIMONIALS } from "@/lib/copy";

export default function Testimonials() {
  return (
    <section className="bg-crimson-deep">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <p className="eyebrow mb-4">What our graduates are saying</p>
        <h2 className="display max-w-2xl text-4xl text-parchment sm:text-5xl">
          Real students. Real <em className="text-gold-pale">results</em>.
        </h2>

        <div className="mt-16 space-y-16">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="border-l-2 border-gold pl-6 sm:pl-10">
              <blockquote className="display text-2xl leading-snug text-parchment sm:text-3xl md:text-4xl">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-sm uppercase tracking-[0.18em] text-gold-pale">
                — {t.name}, graduate
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
