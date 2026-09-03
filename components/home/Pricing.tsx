import { PHONE } from "@/lib/copy";

const TIERS = [
  {
    name: "Monthly",
    price: "$297",
    per: "per month",
    detail: "All-access. Month to month, cancel with 2 weeks notice.",
    featured: false,
  },
  {
    name: "6-Month",
    price: "Call",
    per: `for current rate · ${PHONE}`,
    detail: "All-access. A lower monthly rate for a 6-month commitment.",
    featured: false,
  },
  {
    name: "Annual",
    price: "~$192",
    per: "per month, billed annually",
    detail: "All-access. The best rate for a full year of classes.",
    featured: true,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-20 bg-parchment">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <p className="eyebrow mb-4">Plans &amp; pricing</p>
        <h2 className="display max-w-2xl text-4xl sm:text-5xl">
          One subscription. <em className="text-crimson">Every</em> class.
        </h2>
        <p className="mt-4 max-w-xl text-stone">
          Tiers differ only by billing period — every plan opens all nine
          tracks, live sessions, and the recorded archive.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {TIERS.map((t) => (
            <div
              key={t.name}
              className={`rounded-[2px] border p-8 ${
                t.featured
                  ? "border-gold bg-crimson-deep text-parchment"
                  : "border-ink/15 bg-parchment"
              }`}
            >
              <p
                className={`eyebrow ${t.featured ? "" : ""}`}
              >
                {t.name}
              </p>
              <p className="display mt-4 text-5xl">
                {t.price}
              </p>
              <p className={`mt-1 text-sm ${t.featured ? "text-gold-pale" : "text-stone"}`}>
                {t.per}
              </p>
              <p className={`mt-5 text-sm leading-relaxed ${t.featured ? "text-parchment/85" : "text-ink/80"}`}>
                {t.detail}
              </p>
              <a
                href={`tel:${PHONE}`}
                className={`mt-8 inline-block rounded-[2px] px-5 py-2.5 text-sm font-semibold transition-colors ${
                  t.featured
                    ? "bg-gold text-crimson-deep hover:bg-gold-pale"
                    : "bg-crimson text-parchment hover:bg-crimson-deep"
                }`}
              >
                Enroll now
              </a>
            </div>
          ))}
        </div>

        <p className="mt-8 max-w-2xl text-sm text-stone">
          Refunds are honored within 48 hours of any payment. Cancel a monthly
          membership with 2 weeks notice before your next payment. We do not
          guarantee employment — we guarantee training that holds up in a
          technical interview.
        </p>
      </div>
    </section>
  );
}
