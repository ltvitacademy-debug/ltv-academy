import Link from "next/link";
import { PHONE, QUOTES } from "@/lib/copy";

export default function FinalCta() {
  return (
    <section className="bg-crimson-deep">
      <div className="mx-auto max-w-6xl px-4 py-28 text-center sm:px-6">
        <blockquote className="display mx-auto max-w-3xl text-2xl italic leading-snug text-gold-pale sm:text-3xl">
          &ldquo;{QUOTES.success}&rdquo;
        </blockquote>
        <p className="mt-3 text-sm uppercase tracking-[0.18em] text-parchment/60">
          — Booker T. Washington
        </p>

        <h2 className="display mt-16 text-4xl text-parchment sm:text-5xl">
          Ready to lift the <em className="text-gold-pale">veil</em>?
        </h2>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-6">
          <Link
            href="/#pricing"
            className="rounded-[2px] bg-gold px-7 py-3.5 text-sm font-semibold text-crimson-deep hover:bg-gold-pale transition-colors"
          >
            Enroll now
          </Link>
          <a
            href={`tel:${PHONE}`}
            className="text-sm text-parchment underline underline-offset-4 hover:text-gold-pale"
          >
            Book a free consultation · {PHONE}
          </a>
        </div>
      </div>
    </section>
  );
}
