const ROWS = [
  {
    when: "Weeknights",
    what: "Live classes, evenings",
    note: "Specific nights vary by class and instructor",
  },
  {
    when: "Saturday mornings",
    what: "Live weekend sessions",
    note: "Built for working professionals",
  },
  {
    when: "Every month",
    what: "New classes launch",
    note: "Any subscription opens any class",
  },
];

export default function Schedule() {
  return (
    <section id="schedule" className="scroll-mt-20 border-y border-ink/10 bg-parchment">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <p className="eyebrow mb-4">The live schedule</p>
        <h2 className="display max-w-2xl text-4xl sm:text-5xl">
          Taught <em className="text-crimson">live</em>, around your day job.
        </h2>
        <p className="mt-4 max-w-xl text-stone">
          Classes are web-based and typically run 4 to 5 months (some up to 8).
          Every session is recorded and archived, so missing one never sets you
          back.
        </p>

        <div className="mt-12 divide-y divide-ink/10 border-y border-ink/10">
          {ROWS.map((r) => (
            <div
              key={r.when}
              className="grid gap-1 py-6 sm:grid-cols-[12rem_1fr_auto] sm:items-baseline sm:gap-6"
            >
              <p className="display text-2xl text-crimson">{r.when}</p>
              <p className="text-ink/85">{r.what}</p>
              <p className="text-sm text-stone">{r.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
