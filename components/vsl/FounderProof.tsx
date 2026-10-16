import { ABOUT_STORY, TESTIMONIALS } from "@/lib/copy";
import TestimonialVideos from "./TestimonialVideos";

const VIDEO_NAMES = new Set([
  "lauren",
  "okey",
  "ian",
]);

export default function FounderProof() {
  const textOnly = TESTIMONIALS.filter(
    (t) => !VIDEO_NAMES.has(t.name.toLowerCase())
  );

  return (
    <section className="bg-crimson-deep">
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <p className="eyebrow mb-4 text-gold">Who you&rsquo;d be learning from</p>
        <h2 className="display max-w-2xl text-4xl text-parchment sm:text-5xl">
          Built by someone who&rsquo;s done the job.
        </h2>
        <p className="mt-6 max-w-2xl text-parchment/80">{ABOUT_STORY}</p>

        <TestimonialVideos />

        {textOnly.length > 0 && (
          <div className="mt-10">
            <p className="eyebrow mb-4 text-gold">More from the community</p>
            <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
              {textOnly.map((t) =>
                t.image ? (
                  <div
                    key={t.name}
                    className="mb-4 overflow-hidden break-inside-avoid rounded-[2px] border border-gold/20 bg-white"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={t.image}
                      alt={`Real Facebook review from ${t.name}`}
                      className="w-full"
                    />
                  </div>
                ) : (
                  <blockquote
                    key={t.name}
                    className="mb-4 break-inside-avoid rounded-[2px] border border-gold/20 bg-ink/15 p-5"
                  >
                    <p className="text-sm leading-relaxed text-parchment/85">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <cite className="mt-3 block text-xs font-semibold not-italic tracking-wide text-gold-pale">
                      — {t.name}
                    </cite>
                  </blockquote>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
