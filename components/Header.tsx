"use client";

import { useState } from "react";
import Link from "next/link";
import Seal from "./Seal";

const NAV = [
  { label: "Tracks", href: "/#tracks" },
  { label: "Schedule", href: "/#schedule" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Bill Green", href: "/#bill" },
  { label: "Member login", href: "/login" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-crimson-deep border-b border-gold">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6">
        <Link href="/" className="flex items-center gap-3 no-underline">
          <span className="hidden sm:block">
            <Seal size={54} />
          </span>
          <span className="sm:hidden">
            <Seal size={44} />
          </span>
          <span className="leading-tight">
            <span className="display block text-parchment text-xl sm:text-2xl">
              Lifting the Veil
            </span>
            <span className="block text-[0.6rem] tracking-[0.18em] uppercase text-gold-pale">
              Information Technology Academy · Est. 2017
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm text-parchment/90 hover:text-gold-pale transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#pricing"
            className="rounded-[2px] bg-gold px-4 py-2 text-sm font-semibold text-crimson-deep hover:bg-gold-pale transition-colors"
          >
            Enroll
          </Link>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="lg:hidden text-parchment p-2"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-gold/40 bg-crimson-deep px-6 pb-5 pt-3">
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block py-2.5 text-parchment/90 hover:text-gold-pale"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#pricing"
            onClick={() => setOpen(false)}
            className="mt-3 inline-block rounded-[2px] bg-gold px-5 py-2.5 text-sm font-semibold text-crimson-deep"
          >
            Enroll
          </Link>
        </nav>
      )}
    </header>
  );
}
