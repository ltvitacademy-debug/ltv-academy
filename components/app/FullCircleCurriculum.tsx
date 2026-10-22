"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { FULL_CIRCLE_PHASE_LABELS, type FullCirclePhase } from "@/lib/fullCircleSeriesTypes";

type LessonRow = {
  n: number;
  slug: string;
  title: string;
  summary: string;
  phase: FullCirclePhase;
  published: boolean;
  durationLabel?: string;
};

function lessonDoneKey(pathSlug: string, lessonSlug: string) {
  return `done:full-circle:${pathSlug}:${lessonSlug}`;
}

export default function FullCircleCurriculum({
  pathSlug,
  lessons,
}: {
  pathSlug: string;
  lessons: LessonRow[];
}) {
  // Deterministic first paint (nothing done), same hydration-safe pattern as CourseCurriculum.
  const [done, setDone] = useState<Set<string>>(new Set());
  const [ready, setReady] = useState(false);

  const publishedLessons = useMemo(() => lessons.filter((l) => l.published), [lessons]);

  useEffect(() => {
    try {
      const found = new Set<string>();
      for (const l of publishedLessons) {
        if (localStorage.getItem(lessonDoneKey(pathSlug, l.slug))) found.add(l.slug);
      }
      setDone(found);
    } catch {}
    setReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathSlug]);

  const totalPublished = publishedLessons.length;
  const doneCount = done.size;
  const percent = totalPublished === 0 ? 0 : Math.round((doneCount / totalPublished) * 100);
  const nextLesson = publishedLessons.find((l) => !done.has(l.slug));

  const phases = useMemo(() => {
    const order: FullCirclePhase[] = [
      "business-requirements",
      "architecture-planning",
      "implementation",
      "troubleshooting-validation",
      "business-interpretation",
      "professional-communication",
    ];
    return order
      .map((phase) => ({ phase, lessons: lessons.filter((l) => l.phase === phase) }))
      .filter((p) => p.lessons.length > 0);
  }, [lessons]);

  return (
    <div>
      {ready && totalPublished > 0 && (
        <div className="ledger-texture relative mb-12 overflow-hidden border-2 border-crimson-deep/25 bg-white/50 shadow-[0_8px_30px_-12px_rgba(30,26,22,0.35)]">
          <div className="h-1.5 w-full bg-gradient-to-r from-gold via-gold-pale to-gold" />
          <div className="grid gap-8 p-7 sm:grid-cols-[1fr_auto] sm:items-center sm:p-9">
            <div>
              <p className="eyebrow mb-3">Series progress</p>
              <div className="flex items-end gap-4">
                <span className="display text-6xl leading-none text-crimson-deep">
                  {percent}
                  <span className="text-3xl text-crimson">%</span>
                </span>
                <span className="pb-1 text-sm text-stone">
                  {doneCount} of {totalPublished}
                  <br />
                  videos completed
                </span>
              </div>
              <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-ink/10 shadow-inner">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-crimson to-crimson-deep shadow-[0_0_10px_rgba(142,28,28,0.5)] transition-[width] duration-500"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>

            {nextLesson && (
              <div className="border-t border-ink/15 pt-6 sm:border-l sm:border-t-0 sm:pl-8 sm:pt-0">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-crimson-deep">
                  {doneCount === 0 ? "Start here" : "Continue building"}
                </p>
                <p className="display mt-1 max-w-[16rem] text-lg">{nextLesson.title}</p>
                <Link
                  href={`/app/full-circle/${pathSlug}/${nextLesson.slug}`}
                  className="mt-4 inline-block rounded-[2px] bg-crimson px-7 py-3 text-center text-sm font-semibold text-parchment shadow-[0_4px_14px_-4px_rgba(142,28,28,0.6)] transition-colors hover:bg-crimson-deep"
                >
                  {doneCount === 0 ? "Start the project →" : "Continue the project →"}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="space-y-10">
        {phases.map(({ phase, lessons: phaseLessons }) => (
          <div key={phase}>
            <p className="eyebrow mb-4">{FULL_CIRCLE_PHASE_LABELS[phase]}</p>
            <ul className="divide-y divide-ink/10 border-2 border-ink/15 bg-white/30">
              {phaseLessons.map((l) => {
                const isDone = done.has(l.slug);
                if (!l.published) {
                  return (
                    <li key={l.slug} className="flex items-baseline gap-4 px-5 py-3.5 opacity-60 sm:px-6">
                      <span className="w-8 shrink-0 text-right text-sm text-stone">{l.n}</span>
                      <span className="flex-1">
                        <span className="block text-sm">{l.title}</span>
                        <span className="mt-0.5 block text-xs text-stone">{l.summary}</span>
                      </span>
                      <span className="shrink-0 rounded-full border border-ink/15 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-stone">
                        Coming soon
                      </span>
                    </li>
                  );
                }
                return (
                  <li key={l.slug}>
                    <Link
                      href={`/app/full-circle/${pathSlug}/${l.slug}`}
                      className="group flex items-center gap-4 px-5 py-3.5 hover:bg-white/60 sm:px-6"
                    >
                      <span className="w-8 shrink-0 text-right text-sm text-stone">{l.n}</span>
                      <span className="flex-1">
                        <span className="block text-sm group-hover:text-crimson">{l.title}</span>
                        <span className="mt-0.5 block text-xs text-stone">{l.summary}</span>
                      </span>
                      {l.durationLabel && (
                        <span className="hidden text-xs text-stone sm:inline">{l.durationLabel}</span>
                      )}
                      <span
                        className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.1em] ${
                          ready && isDone
                            ? "border-gold bg-gold/15 text-crimson-deep"
                            : "border-ink/15 text-stone"
                        }`}
                      >
                        {ready && isDone ? "✓ Completed" : "Not started"}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
