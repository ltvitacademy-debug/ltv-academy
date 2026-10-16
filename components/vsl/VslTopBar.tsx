import Seal from "@/components/Seal";
import { CHECKOUT_URL } from "./VslHero";

export default function VslTopBar() {
  return (
    <div className="sticky top-0 z-40 border-b border-gold/30 bg-ink">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <Seal size={40} />
          <div className="leading-tight">
            <p className="display text-base text-parchment sm:text-lg">
              Lifting the Veil Academy
            </p>
            <p className="eyebrow text-[0.6rem] text-gold-pale">
              Information Technology Academy
            </p>
          </div>
        </div>
        <a
          href={CHECKOUT_URL}
          className="flex-shrink-0 rounded-[2px] bg-crimson px-4 py-2.5 text-xs font-semibold text-parchment transition-colors hover:bg-crimson-deep sm:px-5 sm:text-sm"
        >
          Start Learning Now →
        </a>
      </div>
    </div>
  );
}
