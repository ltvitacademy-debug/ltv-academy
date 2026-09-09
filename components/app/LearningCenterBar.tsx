"use client";

import Link from "next/link";
import { useEmbedMode } from "@/components/useEmbedMode";

export default function LearningCenterBar() {
  const isEmbed = useEmbedMode();

  if (isEmbed) return null;

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
