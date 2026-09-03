import Link from "next/link";
import { PHONE } from "@/lib/copy";

export default function Footer() {
  return (
    <footer className="bg-crimson-deep text-parchment">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/ltv-logo-still.png"
            alt="Lifting the Veil Academy seal"
            width={72}
            height={72}
          />
          <p className="display mt-4 text-xl">Lifting the Veil</p>
          <p className="text-[0.65rem] uppercase tracking-[0.18em] text-gold-pale">
            Information Technology Academy · Est. 2017
          </p>
        </div>
        <div className="text-sm">
          <p className="eyebrow mb-3">Explore</p>
          <ul className="space-y-2">
            <li><Link href="/#tracks" className="hover:text-gold-pale">Tracks</Link></li>
            <li><Link href="/#schedule" className="hover:text-gold-pale">Schedule</Link></li>
            <li><Link href="/#pricing" className="hover:text-gold-pale">Pricing</Link></li>
            <li><Link href="/#faq" className="hover:text-gold-pale">FAQ</Link></li>
            <li><Link href="/login" className="hover:text-gold-pale">Member login</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="eyebrow mb-3">Get in touch</p>
          <p>
            Bill Green — Founder / Course Instructor
          </p>
          <p className="mt-2">
            <a href={`tel:${PHONE}`} className="text-gold-pale hover:underline">
              {PHONE}
            </a>
          </p>
        </div>
      </div>
      <div className="border-t border-gold/30">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-4 text-xs text-parchment/70 sm:px-6">
          <p>© 2017 by Lifting the Veil Academy</p>
          <p>Privacy Policy</p>
        </div>
      </div>
    </footer>
  );
}
