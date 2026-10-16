import { FAQS } from "@/lib/copy";
import { CHECKOUT_URL } from "./VslHero";

export default function VslPricingFaq() {
  return (
    <section className="bg-parchment">
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <div className="overflow-hidden rounded-[2px] border border-gold bg-crimson-deep p-8 sm:p-10">
          <p className="eyebrow mb-3 text-gold">Limited-time intro offer</p>
          <h2 className="display text-3xl text-parchment sm:text-4xl">
            Start Building Your Future for <em className="text-gold-pale">$9.97</em>.
          </h2>
          <p className="mt-3 max-w-xl text-sm text-parchment/75">
            Get full access to all 24 career paths, video lessons, hands-on
            practice, interview preparation, and more.
          </p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs uppercase tracking-wide text-parchment/60">First 30 days</p>
              <p className="display text-4xl text-gold">$9.97</p>
            </div>
            <div className="text-parchment/40 sm:px-2">then</div>
            <div>
              <p className="text-xs uppercase tracking-wide text-parchment/60">After day 30</p>
              <p className="display text-4xl text-parchment">$97<span className="text-base">/month</span></p>
              <p className="text-xs text-parchment/60">until canceled</p>
            </div>
          </div>
          <a
            href={CHECKOUT_URL}
            className="mt-8 block rounded-[2px] bg-gold px-6 py-4 text-center text-base font-semibold text-crimson-deep transition-colors hover:bg-gold-pale sm:inline-block"
          >
            Start My First 30 Days for $9.97 →
          </a>
          <p className="mt-4 text-xs text-parchment/55">
            By subscribing you authorize the above payment and recurring
            charges. You can cancel anytime.
          </p>
        </div>

        <div className="mt-16">
          <p className="eyebrow mb-4">Frequently asked questions</p>
          <div className="divide-y divide-ink/10 border-y border-ink/10">
            {FAQS.map((item) => (
              <details key={item.q} className="faq-item group py-5">
                <summary className="flex items-center justify-between gap-4">
                  <span className="display text-lg">{item.q}</span>
                  <span className="faq-mark flex-shrink-0 text-xl text-crimson" aria-hidden="true" />
                </summary>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-stone">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
