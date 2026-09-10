"use client";

import Link from "next/link";

export default function LearningCenterBar() {
  // Always shown, even in embed mode (?embed=1) — this is the only way
  // back out once a viewer is a few lessons deep inside the iframe.
  // Career paths is the flagship entry point now, so it's the only link
  // here — course pages carry their own, more specific back-links.
  return (
    <div className="border-b border-ink/10 bg-parchment">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <p className="eyebrow">Student Learning Center</p>
        <Link
          href="/careers"
          className="text-sm text-stone underline underline-offset-4 hover:text-crimson"
        >
          ← All career paths
        </Link>
      </div>
    </div>
  );
}
