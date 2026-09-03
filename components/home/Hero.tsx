import Link from "next/link";
import Seal from "@/components/Seal";
import { QUOTES } from "@/lib/copy";

export default function Hero() {
  return (
    <section className="relative flex min-h-[92svh] flex-col justify-between overflow-hidden bg-crimson-deep lg:justify-end">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/photos/dsc08163.jpg"
        alt="Photo from the Lifting the Veil Academy site"
        className="absolute inset-x-0 bottom-0 top-[270px] w-full object-cover object-[50%_15%] lg:inset-0 lg:object-[50%_35%]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/20 via-ink/40 to-ink/90" />

      {/* The animated seal: top-center on mobile (in flow, can't overlap), upper right on desktop */}
      <div className="relative mx-auto pt-8 lg:hidden">
        <Seal size={210} src="/brand/ltv-seal-320.mp4" />
      </div>
      <div className="absolute right-10 top-24 hidden lg:block xl:right-16 xl:top-24">
        <Seal size={380} src="/brand/ltv-seal-544.mp4" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 pb-20 pt-10 sm:px-6 lg:pt-40">
        <p className="eyebrow mb-5">
          Live classes · Nightly and Saturday mornings
        </p>
        <h1 className="display max-w-3xl text-5xl text-parchment sm:text-6xl md:text-7xl">
          Learn the work. Get the <em className="text-gold-pale">job</em>.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-parchment/85">
          Acquire the skills you need to launch your IT career in weeks — and
          the opportunity to make more money than ever before.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-6">
          <Link
            href="/#tracks"
            className="rounded-[2px] bg-crimson px-6 py-3.5 text-sm font-semibold text-parchment hover:bg-crimson-deep transition-colors"
          >
            See the nine tracks
          </Link>
          <a
            href="tel:678-627-2796"
            className="text-sm text-parchment underline underline-offset-4 hover:text-gold-pale"
          >
            Book a free consultation
          </a>
        </div>

        <blockquote className="mt-16 ml-auto max-w-xs text-right text-xs italic text-parchment/60 sm:absolute sm:bottom-8 sm:right-6 sm:mt-0">
          &ldquo;{QUOTES.prosper}&rdquo;
          <span className="mt-1 block not-italic">— Booker T. Washington</span>
        </blockquote>
      </div>
    </section>
  );
}
