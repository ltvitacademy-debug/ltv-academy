/*
 * Five full-bleed scroll "chapters" in the Montgomery Ledger style:
 * one image, a small eyebrow, one serif headline, one sentence.
 * Chapters without a real photo yet render a clearly marked plate.
 */

type Chapter = {
  eyebrow: string;
  headline: React.ReactNode;
  sentence: string;
  photo?: { src: string; alt: string };
  plateNote?: string;
};

const CHAPTERS: Chapter[] = [
  {
    eyebrow: "Chapter One · The Veil",
    headline: (
      <>
        Nobody told you what these jobs{" "}
        <em className="text-gold-pale">pay</em>.
      </>
    ),
    sentence:
      "Reports developers, ETL developers, BI developers — ordinary people do this work every day, and most of us were simply never shown the door in.",
    photo: { src: "/photos/chapter-veil.jpg", alt: "A crimson curtain drawn aside, golden light pouring through a doorway" },
  },
  {
    eyebrow: "Chapter Two · The Work",
    headline: (
      <>
        Real tools. Real <em className="text-gold-pale">work</em>.
      </>
    ),
    sentence:
      "SQL Server, Oracle Financials, Salesforce, Python — the same software running inside the companies that will hire you.",
    photo: { src: "/photos/laptop-code.jpg", alt: "Code on a developer's laptop screen" },
  },
  {
    eyebrow: "Chapter Three · The Class",
    headline: (
      <>
        Live, at night, with a teacher who <em className="text-gold-pale">does the job</em>.
      </>
    ),
    sentence:
      "Classes meet on weeknights and Saturday mornings, live on the web — and every session is recorded, so missing one never means falling behind.",
    photo: { src: "/photos/chapter-class.jpg", alt: "An evening coding class, students at laptops facing a lit screen" },
  },
  {
    eyebrow: "Chapter Four · The Interview",
    headline: (
      <>
        You don&apos;t finish until you can <em className="text-gold-pale">defend it</em>.
      </>
    ),
    sentence:
      "Every track ends in a technical interview — pass it, and you've earned your certificate of completion.",
    photo: { src: "/photos/chapter-interview.jpg", alt: "A technical interview across a table in golden-hour light" },
  },
  {
    eyebrow: "Chapter Five · The Job",
    headline: (
      <>
        Graduates sit in developer <em className="text-gold-pale">seats</em>.
      </>
    ),
    sentence:
      "Reports Developer. ETL Developer. Business Intelligence Developer. No guarantees — just training that holds up in the room.",
    photo: { src: "/photos/chapter-job.jpg", alt: "A developer at dual monitors in warm morning light" },
  },
];

export default function Chapters() {
  return (
    <div>
      {CHAPTERS.map((c) => (
        <section
          key={c.eyebrow}
          className={`relative flex min-h-[88svh] items-center overflow-hidden ${
            c.photo ? "" : "photo-plate"
          }`}
        >
          {c.photo && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.photo.src}
                alt={c.photo.alt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-ink/60" />
            </>
          )}
          {!c.photo && c.plateNote && (
            <span className="absolute right-4 top-4 rounded-[2px] border border-gold/50 px-2 py-1 text-[0.6rem] uppercase tracking-[0.18em] text-gold/80">
              {c.plateNote}
            </span>
          )}
          <div className="relative mx-auto w-full max-w-6xl px-4 py-24 sm:px-6">
            <p className="eyebrow mb-5">{c.eyebrow}</p>
            <h2 className="display max-w-3xl text-4xl text-parchment sm:text-5xl md:text-6xl">
              {c.headline}
            </h2>
            <p className="mt-6 max-w-xl text-lg text-parchment/80">{c.sentence}</p>
          </div>
        </section>
      ))}
    </div>
  );
}
