import { ABOUT_STORY } from "@/lib/copy";

const STATS = [
  { value: "2017", label: "Founded on a challenge to give back" },
  { value: "Thousands", label: "of students taught and helped employ" },
  { value: "Developer", label: "by trade — databases, not theory" },
];

export default function Instructor() {
  return (
    <section id="bill" className="scroll-mt-20 bg-parchment">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[2fr_3fr]">
        <div className="photo-plate min-h-[24rem] rounded-[2px]">
          <span className="absolute right-3 top-3 rounded-[2px] border border-gold/50 px-2 py-1 text-[0.6rem] uppercase tracking-[0.18em] text-gold/80">
            PHOTO PLATE — Bill Green portrait
          </span>
        </div>

        <div>
          <p className="eyebrow mb-4">Who you&apos;d be learning from</p>
          <h2 className="display text-4xl sm:text-5xl">
            Bill <em className="text-crimson">Green</em>.
          </h2>
          <p className="mt-2 text-sm uppercase tracking-[0.18em] text-stone">
            Founder / Course Instructor
          </p>
          <p className="mt-6 max-w-xl leading-relaxed text-ink/85">{ABOUT_STORY}</p>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {STATS.map((s) => (
              <div key={s.value} className="border-t-2 border-gold pt-4">
                <p className="display text-3xl text-crimson">{s.value}</p>
                <p className="mt-1 text-sm text-stone">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
