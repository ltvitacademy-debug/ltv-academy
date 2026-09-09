"use client";

import Link from "next/link";

export default function LearningCenterBar() {
  // Always shown, even in embed mode (?embed=1) — this is the only way
  // back to /app once a viewer is a few lessons deep inside the iframe.
  return (
    <div className="border-b border-ink/10 bg-parchment">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <p className="eyebrow">Student Learning Center</p>
        <Link
          href="/app"
          className="text-sm text-stone underline underline-offset-4 hover:text-crimson"
        >
          My dashboard
        </Link>
      </div>
    </div>
  );
}
