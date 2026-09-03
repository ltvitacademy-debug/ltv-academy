import { FAQS } from "@/lib/copy";

export default function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 border-t border-ink/10 bg-parchment">
      <div className="mx-auto max-w-4xl px-4 py-24 sm:px-6">
        <p className="eyebrow mb-4">How it works</p>
        <h2 className="display text-4xl sm:text-5xl">
          Frequently asked <em className="text-crimson">questions</em>.
        </h2>

        <div className="mt-12 divide-y divide-ink/10 border-y border-ink/10">
          {FAQS.map((f, i) => (
            <details key={f.q} className="faq-item group py-5">
              <summary className="flex items-baseline gap-5">
                <span className="display text-lg text-crimson">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="display flex-1 text-xl sm:text-2xl">{f.q}</span>
                <span className="faq-mark display text-2xl text-gold" aria-hidden="true" />
              </summary>
              <p className="mt-4 pl-[3.1rem] leading-relaxed text-ink/80">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
