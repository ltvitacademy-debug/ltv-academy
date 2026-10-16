import Seal from "@/components/Seal";

const CHECKOUT_URL = "https://www.ltvacademy.com/vsl";

export default function VslHero() {
  return (
    <section className="relative overflow-hidden bg-crimson-deep">
      <div className="pointer-events-none absolute inset-0 ledger-texture opacity-40" />
      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-4 pb-16 pt-10 text-center sm:px-6 sm:pt-14">
        <Seal size={84} />
        <p className="eyebrow mt-6">
          Lifting the Veil Academy — the complete technology learning experience
        </p>
        <h1 className="display mt-5 max-w-3xl text-4xl text-parchment sm:text-5xl md:text-6xl">
          24 Career Options.{" "}
          <em className="text-gold-pale">One</em> Complete Technology
          Training Platform.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-parchment/85">
          Choose your path. Watch instructional videos. Practice real
          technical skills. Get AI-assisted learning support. Prepare for
          interviews. Track your progress.
        </p>

        <div className="mt-10 w-full max-w-md rounded-[2px] border border-gold/40 bg-ink/30 p-6">
          <p className="display text-5xl text-gold">
            $9.97
          </p>
          <p className="mt-1 text-sm text-parchment/75">
            for your first 30 days — then $97/month until canceled
          </p>
          <a
            href={CHECKOUT_URL}
            className="mt-6 block rounded-[2px] bg-gold px-6 py-4 text-center text-base font-semibold text-crimson-deep transition-colors hover:bg-gold-pale"
          >
            Start My First 30 Days for $9.97 →
          </a>
          <p className="mt-3 text-xs text-parchment/60">
            By subscribing you authorize the above payment and recurring
            charges. Cancel anytime.
          </p>
        </div>

        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-parchment/75">
          <li className="flex items-center gap-1.5">
            <CheckIcon /> Full access to all 24 career paths
          </li>
          <li className="flex items-center gap-1.5">
            <CheckIcon /> Learn at your own pace
          </li>
          <li className="flex items-center gap-1.5">
            <CheckIcon /> Cancel anytime
          </li>
        </ul>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="text-gold">
      <path d="M3 8.5l3 3 7-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export { CHECKOUT_URL };
