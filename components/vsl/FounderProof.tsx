import { ABOUT_STORY, TESTIMONIALS } from "@/lib/copy";
import TestimonialVideos from "./TestimonialVideos";

export default function FounderProof() {
  // Only reviews with a real screenshot are shown here — a typed-up quote
  // with no image to back it isn't independently verifiable, so it's left
  // out rather than mixed in with the ones that are.
  const screenshots = TESTIMONIALS.filter((t) => t.image);

  return (
    <section className="bg-crimson-deep">
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <p className="eyebrow mb-4 text-gold">Who you&rsquo;d be learning from</p>
        <h2 className="display max-w-2xl text-4xl text-parchment sm:text-5xl">
          Built by someone who&rsquo;s done the job.
        </h2>
        <p className="mt-6 max-w-2xl text-parchment/80">{ABOUT_STORY}</p>

        <TestimonialVideos />

        {screenshots.length > 0 && (
          <div className="mt-10">
            <p className="eyebrow mb-4 text-gold">Real reviews, from our Facebook community</p>
            <div className="grid grid-cols-2 items-start gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {screenshots.map((t) => (
                <div
                  key={t.name}
                  className="overflow-hidden rounded-[2px] border border-gold/20 bg-white"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.image}
                    alt={`Real Facebook review from ${t.name}`}
                    className="block h-auto w-full"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
