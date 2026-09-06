"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function LessonRow({
  courseSlug,
  lesson,
}: {
  courseSlug: string;
  lesson: {
    n: number;
    slug: string;
    title: string;
    playable: boolean;
    durationLabel?: string;
  };
}) {
  const [done, setDone] = useState(false);
  useEffect(() => {
    try {
      setDone(Boolean(localStorage.getItem(`done:${courseSlug}:${lesson.slug}`)));
    } catch {}
  }, [courseSlug, lesson.slug]);

  const number = (
    <span className="w-10 shrink-0 text-right font-[family-name:var(--font-display)] text-lg text-crimson">
      {lesson.n}
    </span>
  );

  if (!lesson.playable) {
    return (
      <li className="flex items-baseline gap-4 py-3 opacity-60">
        {number}
        <span className="flex-1">{lesson.title}</span>
        <span className="text-xs uppercase tracking-[0.18em] text-stone">
          In production
        </span>
      </li>
    );
  }

  return (
    <li>
      <Link
        href={`/app/courses/${courseSlug}/${lesson.slug}`}
        className="group flex items-baseline gap-4 py-3 hover:bg-white/50"
      >
        {number}
        <span className="flex-1 group-hover:text-crimson">{lesson.title}</span>
        {lesson.durationLabel && (
          <span className="text-sm text-stone">{lesson.durationLabel}</span>
        )}
        <span className={`text-sm ${done ? "text-gold" : "text-stone"}`}>
          {done ? "✓ done" : "Watch →"}
        </span>
      </Link>
    </li>
  );
}
