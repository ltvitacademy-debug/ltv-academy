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
        <div className="ledger-texture relative mb-12 overflow-hidden border-2 border-crimson-deep/25 bg-white/50 shadow-[0_8px_30px_-12px_rgba(30,26,22,0.35)]">
          <div className="h-1.5 w-full bg-gradient-to-r from-gold via-gold-pale to-gold" />
          <div className="grid gap-8 p-7 sm:grid-cols-[1fr_auto] sm:items-center sm:p-9">
            <div>
              <p className="eyebrow mb-3">Course progress</p>
              <div className="flex items-end gap-4">
                <span className="display text-6xl leading-none text-crimson-deep">
                  {percent}
                  <span className="text-3xl text-crimson">%</span>
                </span>
                <span className="pb-1 text-sm text-stone">
                  {doneCount} of {totalPlayable}
                  <br />
                  lessons completed
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
                  {doneCount === 0 ? "Start here" : "Continue learning"}
                </p>
                <p className="display mt-1 max-w-[16rem] text-lg">{nextLesson.title}</p>
                <Link
                  href={`/app/courses/${courseSlug}/${nextLesson.slug}`}
                  className="mt-4 inline-block rounded-[2px] bg-crimson px-7 py-3 text-center text-sm font-semibold text-parchment shadow-[0_4px_14px_-4px_rgba(142,28,28,0.6)] transition-colors hover:bg-crimson-deep"
                >
                  {doneCount === 0 ? "Start the course →" : "Continue learning →"}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mb-5 flex items-center justify-between border-b-2 border-ink/10 pb-3">
        <p className="eyebrow">Course content</p>
        <button
          type="button"
          onClick={toggleAll}
          className="text-xs font-semibold uppercase tracking-[0.14em] text-stone hover:text-crimson"
        >
          {allExpanded ? "Collapse all chapters" : "Expand all chapters"}
        </button>
      </div>

      <div className="space-y-5">
        {chapters.map((ch) => {
          const chPlayable = ch.lessons.filter((l) => l.playable);
          const chDone = chPlayable.filter((l) => done.has(l.slug)).length;
          const chPercent =
            chPlayable.length === 0 ? 0 : Math.round((chDone / chPlayable.length) * 100);
          const isOpen = expanded.has(ch.n);

          return (
            <div
              key={ch.n}
              className={`border-2 bg-white/40 transition-shadow ${
                isOpen
                  ? "border-crimson-deep/30 shadow-[0_10px_28px_-14px_rgba(30,26,22,0.4)]"
                  : "border-ink/15 shadow-[0_2px_8px_-4px_rgba(30,26,22,0.15)] hover:border-ink/30"
              }`}
            >
              <button
                type="button"
                onClick={() => toggleChapter(ch.n)}
                className={`flex w-full items-center gap-5 p-5 text-left transition-colors sm:p-6 ${
                  isOpen ? "bg-gold/[0.06]" : ""
                }`}
              >
                <span className="display w-10 shrink-0 text-center text-4xl leading-none text-crimson sm:text-5xl">
                  {String(ch.n).padStart(2, "0")}
                </span>
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[5px] bg-gradient-to-br from-crimson to-crimson-deep shadow-[0_4px_12px_-4px_rgba(94,15,15,0.6)] ring-1 ring-gold/40 sm:h-16 sm:w-16">
                  <ChapterIcon title={ch.title} className="h-7 w-7 text-gold-pale sm:h-8 sm:w-8" />
                </span>
                <span className="flex-1">
                  <span className="display block text-xl sm:text-2xl">{ch.title}</span>
                  <span className="mt-0.5 block text-xs uppercase tracking-[0.1em] text-stone sm:hidden">
                    {ch.lessons.length} lessons
                  </span>
                </span>
                <span className="hidden shrink-0 text-right sm:block">
                  <span className="block text-sm text-stone">
                    {ready ? (
                      <>
                        {ch.lessons.length} lessons · {chDone} completed
                      </>
                    ) : (
                      <>{ch.lessons.length} lessons</>
                    )}
                  </span>
                  {ready && chPlayable.length > 0 && (
                    <span className="mt-2 flex items-center justify-end gap-2">
                      <span className="h-1.5 w-28 overflow-hidden rounded-full bg-ink/10">
                        <span
                          className="block h-full rounded-full bg-gradient-to-r from-gold to-gold-pale"
                          style={{ width: `${chPercent}%` }}
                        />
                      </span>
                      <span className="w-9 text-xs font-semibold text-crimson-deep">
                        {chPercent}%
                      </span>
                    </span>
                  )}
                </span>
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink/15 text-crimson transition-transform ${
                    isOpen ? "rotate-180 border-gold bg-gold/15" : ""
                  }`}
                  aria-hidden="true"
                >
                  ▾
                </span>
              </button>

              {isOpen && (
                <ul className="divide-y divide-ink/10 border-t-2 border-gold/30 bg-white/30 px-5 sm:px-6">
                  {ch.lessons.map((l) => {
                    const isDone = done.has(l.slug);
                    if (!l.playable) {
                      return (
                        <li key={l.slug} className="flex items-baseline gap-4 py-3.5 opacity-60">
                          <span className="w-8 shrink-0 text-right text-sm text-stone">
                            {l.n}
                          </span>
                          <span className="flex-1 text-sm">{l.title}</span>
                          <span className="rounded-full border border-ink/15 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-stone">
                            In production
                          </span>
                        </li>
                      );
                    }
                    return (
                      <li key={l.slug}>
                        <Link
                          href={`/app/courses/${courseSlug}/${l.slug}`}
                          className="group flex items-center gap-4 py-3.5 hover:bg-white/60"
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
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
