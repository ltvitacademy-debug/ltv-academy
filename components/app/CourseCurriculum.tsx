"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import ChapterIcon from "./ChapterIcon";

type LessonRow = {
  n: number;
  slug: string;
  title: string;
  playable: boolean;
  durationLabel?: string;
};

type ChapterRow = {
  n: number;
  title: string;
  lessons: LessonRow[];
};

function lessonDoneKey(courseSlug: string, lessonSlug: string) {
  return `done:${courseSlug}:${lessonSlug}`;
}

export default function CourseCurriculum({
  courseSlug,
  chapters,
}: {
  courseSlug: string;
  chapters: ChapterRow[];
}) {
  // Render deterministically (nothing done, chapter 1 open) on first paint —
  // localStorage-derived state only applies after mount, same hydration-safe
  // pattern as MarkComplete/LessonRow elsewhere in this app.
  const [done, setDone] = useState<Set<string>>(new Set());
  const [ready, setReady] = useState(false);
  const [expanded, setExpanded] = useState<Set<number>>(() => new Set([chapters[0]?.n]));
  const [allExpanded, setAllExpanded] = useState(false);

  const allLessons = useMemo(
    () => chapters.flatMap((ch) => ch.lessons.map((l) => ({ ...l, chapterN: ch.n }))),
    [chapters]
  );
  const playableLessons = useMemo(() => allLessons.filter((l) => l.playable), [allLessons]);

  useEffect(() => {
    try {
      const found = new Set<string>();
      for (const l of playableLessons) {
        if (localStorage.getItem(lessonDoneKey(courseSlug, l.slug))) found.add(l.slug);
      }
      setDone(found);
    } catch {}
    setReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseSlug]);

  const totalPlayable = playableLessons.length;
  const doneCount = done.size;
  const percent = totalPlayable === 0 ? 0 : Math.round((doneCount / totalPlayable) * 100);
  const nextLesson = playableLessons.find((l) => !done.has(l.slug));

  function toggleChapter(n: number) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(n)) next.delete(n);
      else next.add(n);
      return next;
    });
  }

  function toggleAll() {
    if (allExpanded) {
      setExpanded(new Set());
      setAllExpanded(false);
    } else {
      setExpanded(new Set(chapters.map((c) => c.n)));
      setAllExpanded(true);
    }
  }

  return (
    <div>
      {ready && totalPlayable > 0 && (
        <div className="mb-10 grid gap-4 border-2 border-ink/15 bg-white/40 p-6 sm:grid-cols-[1fr_auto] sm:items-center">
          <div>
            <p className="eyebrow mb-2">Course progress</p>
            <div className="h-2 w-full overflow-hidden rounded-full bg-ink/10">
              <div
                className="h-full rounded-full bg-crimson transition-[width]"
                style={{ width: `${percent}%` }}
              />
            </div>
            <p className="mt-2 text-sm text-stone">
              <span className="font-semibold text-ink">{percent}%</span> — {doneCount} of{" "}
              {totalPlayable} lessons completed
            </p>
          </div>
          {nextLesson && (
            <Link
              href={`/app/courses/${courseSlug}/${nextLesson.slug}`}
              className="whitespace-nowrap rounded-[2px] bg-crimson px-6 py-3 text-center text-sm font-semibold text-parchment hover:bg-crimson-deep"
            >
              {doneCount === 0 ? "Start the course →" : "Continue learning →"}
            </Link>
          )}
        </div>
      )}

      <div className="mb-5 flex items-center justify-between">
        <p className="eyebrow">Course content</p>
        <button
          type="button"
          onClick={toggleAll}
          className="text-xs font-semibold uppercase tracking-[0.14em] text-stone hover:text-crimson"
        >
          {allExpanded ? "Collapse all chapters" : "Expand all chapters"}
        </button>
      </div>

      <div className="space-y-4">
        {chapters.map((ch) => {
          const chPlayable = ch.lessons.filter((l) => l.playable);
          const chDone = chPlayable.filter((l) => done.has(l.slug)).length;
          const chPercent =
            chPlayable.length === 0 ? 0 : Math.round((chDone / chPlayable.length) * 100);
          const isOpen = expanded.has(ch.n);

          return (
            <div key={ch.n} className="border-2 border-ink/15 bg-white/30">
              <button
                type="button"
                onClick={() => toggleChapter(ch.n)}
                className="flex w-full items-center gap-4 p-4 text-left sm:p-5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[4px] bg-crimson-deep text-parchment">
                  <ChapterIcon title={ch.title} className="h-5 w-5" />
                </span>
                <span className="flex-1">
                  <span className="flex items-baseline gap-3">
                    <span className="text-xs text-stone">{String(ch.n).padStart(2, "0")}</span>
                    <span className="display text-lg sm:text-xl">{ch.title}</span>
                  </span>
                </span>
                <span className="hidden shrink-0 text-right text-sm text-stone sm:block">
                  {ready ? (
                    <>
                      {ch.lessons.length} lessons · {chDone} completed
                    </>
                  ) : (
                    <>{ch.lessons.length} lessons</>
                  )}
                </span>
                <span
                  className={`shrink-0 text-crimson transition-transform ${isOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                >
                  ▾
                </span>
              </button>

              {ready && chPlayable.length > 0 && (
                <div className="px-4 pb-1 sm:px-5">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink/10">
                    <div
                      className="h-full rounded-full bg-gold"
                      style={{ width: `${chPercent}%` }}
                    />
                  </div>
                </div>
              )}

              {isOpen && (
                <ul className="divide-y divide-ink/10 border-t border-ink/10 px-4 sm:px-5">
                  {ch.lessons.map((l) => {
                    const isDone = done.has(l.slug);
                    if (!l.playable) {
                      return (
                        <li key={l.slug} className="flex items-baseline gap-4 py-3 opacity-60">
                          <span className="w-8 shrink-0 text-right text-sm text-stone">
                            {l.n}
                          </span>
                          <span className="flex-1 text-sm">{l.title}</span>
                          <span className="text-xs uppercase tracking-[0.14em] text-stone">
                            In production
                          </span>
                        </li>
                      );
                    }
                    return (
                      <li key={l.slug}>
                        <Link
                          href={`/app/courses/${courseSlug}/${l.slug}`}
                          className="group flex items-center gap-4 py-3 hover:bg-white/50"
                        >
                          <span className="w-8 shrink-0 text-right text-sm text-stone">
                            {l.n}
                          </span>
                          <span className="flex-1 text-sm group-hover:text-crimson">
                            {l.title}
                          </span>
                          {l.durationLabel && (
                            <span className="hidden text-xs text-stone sm:inline">
                              {l.durationLabel}
                            </span>
                          )}
                          <span
                            className={`shrink-0 text-xs font-semibold uppercase tracking-[0.1em] ${
                              ready && isDone ? "text-gold" : "text-stone"
                            }`}
                          >
                            {ready && isDone ? "✓ Completed" : "Not started"}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
