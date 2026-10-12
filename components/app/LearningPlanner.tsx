"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { LearningPlanner, PlannerHourSlot } from "@/lib/learningPlannerTypes";
import { DAYS, plannerSlotKey, plannerDeliverableKey, lessonDoneKey, plannerStartDateKey } from "@/lib/learningPlannerTypes";

function loadSet(getter: () => string[] | null): Set<string> {
  try {
    const items = getter();
    return new Set(items ?? []);
  } catch {
    return new Set();
  }
}

export default function LearningPlannerView({ plan }: { plan: LearningPlanner }) {
  const totalMonths = Math.ceil(plan.totalHours / (plan.hoursPerWeek * 4));
  const [month, setMonth] = useState(1);
  const [weekInMonth, setWeekInMonth] = useState(1);
  const [studiedSlots, setStudiedSlots] = useState<Set<string>>(new Set());
  const [doneLessons, setDoneLessons] = useState<Set<string>>(new Set());
  const [doneDeliverables, setDoneDeliverables] = useState<Set<string>>(new Set());
  const [startDate, setStartDate] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const studied = loadSet(() =>
      plan.slots.filter((s) => localStorage.getItem(plannerSlotKey(plan.pathSlug, s.id))).map((s) => s.id)
    );
    const deliverables = loadSet(() =>
      plan.slots.filter((s) => localStorage.getItem(plannerDeliverableKey(plan.pathSlug, s.id))).map((s) => s.id)
    );
    const lessonKeys: string[] = [];
    for (const s of plan.slots) {
      for (const l of s.lessons) {
        const k = `${l.courseSlug}:${l.lessonSlug}`;
        try {
          if (localStorage.getItem(lessonDoneKey(l.courseSlug, l.lessonSlug))) lessonKeys.push(k);
        } catch {}
      }
    }
    setStudiedSlots(studied);
    setDoneDeliverables(deliverables);
    setDoneLessons(new Set(lessonKeys));

    try {
      let sd = localStorage.getItem(plannerStartDateKey(plan.pathSlug));
      if (!sd) {
        sd = new Date().toISOString().slice(0, 10);
        localStorage.setItem(plannerStartDateKey(plan.pathSlug), sd);
      }
      setStartDate(sd);
    } catch {}
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plan.pathSlug]);

  function toggleSlot(id: string) {
    const key = plannerSlotKey(plan.pathSlug, id);
    setStudiedSlots((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        try {
          localStorage.removeItem(key);
        } catch {}
      } else {
        next.add(id);
        try {
          localStorage.setItem(key, String(Date.now()));
        } catch {}
      }
      return next;
    });
  }

  function toggleDeliverable(id: string) {
    const key = plannerDeliverableKey(plan.pathSlug, id);
    setDoneDeliverables((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        try {
          localStorage.removeItem(key);
        } catch {}
      } else {
        next.add(id);
        try {
          localStorage.setItem(key, String(Date.now()));
        } catch {}
      }
      return next;
    });
  }

  function toggleLesson(courseSlug: string, lessonSlug: string) {
    const key = lessonDoneKey(courseSlug, lessonSlug);
    const mapKey = `${courseSlug}:${lessonSlug}`;
    setDoneLessons((prev) => {
      const next = new Set(prev);
      if (next.has(mapKey)) {
        next.delete(mapKey);
        try {
          localStorage.removeItem(key);
        } catch {}
      } else {
        next.add(mapKey);
        try {
          localStorage.setItem(key, String(Date.now()));
        } catch {}
      }
      return next;
    });
  }

  const weekSlots = plan.slots.filter((s) => s.month === month && s.weekInMonth === weekInMonth);
  const monthSlots = plan.slots.filter((s) => s.month === month);

  const studiedInWeek = weekSlots.filter((s) => studiedSlots.has(s.id)).length;
  const studiedInMonth = monthSlots.filter((s) => studiedSlots.has(s.id)).length;
  const studiedOverall = studiedSlots.size;

  const nextIncomplete = useMemo(() => plan.slots.find((s) => !studiedSlots.has(s.id)), [plan.slots, studiedSlots]);

  const pace = useMemo(() => {
    if (!startDate || !hydrated) return null;
    const elapsedDays = Math.floor((Date.now() - new Date(startDate + "T00:00:00").getTime()) / 86400000);
    if (elapsedDays < 3) return null;
    const elapsedWeeks = elapsedDays / 7;
    const expectedHours = Math.min(plan.totalHours, Math.round(elapsedWeeks * plan.hoursPerWeek));
    const diff = studiedOverall - expectedHours;
    if (diff >= 5) return { label: "Ahead of schedule", tone: "ahead" as const };
    if (diff <= -5) return { label: "Behind schedule", tone: "behind" as const };
    return { label: "On track", tone: "ontrack" as const };
  }, [startDate, hydrated, studiedOverall, plan.totalHours, plan.hoursPerWeek]);

  const milestone = plan.monthlyMilestones.find((m) => m.month === month);

  return (
    <div>
      {/* Overall progress */}
      <div className="rounded-[2px] border-2 border-crimson bg-gold-pale p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-crimson">Overall progress</p>
            <p className="display mt-1 text-2xl text-crimson-deep">
              {studiedOverall} / {plan.totalHours} hours
            </p>
          </div>
          {pace && (
            <span
              className={`rounded-[2px] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] ${
                pace.tone === "ahead"
                  ? "bg-gold text-crimson-deep"
                  : pace.tone === "behind"
                  ? "bg-crimson text-parchment"
                  : "border border-crimson-deep/40 bg-white/40 text-crimson-deep"
              }`}
            >
              {pace.label}
            </span>
          )}
        </div>
        <div className="mt-3 h-2 w-full overflow-hidden rounded-[2px] bg-white/50">
          <div className="h-full bg-crimson" style={{ width: `${(studiedOverall / plan.totalHours) * 100}%` }} />
        </div>

        {nextIncomplete && (
          <div className="mt-4 border-t border-crimson-deep/20 pt-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-crimson-deep/70">Next up</p>
            <button
              onClick={() => {
                setMonth(nextIncomplete.month);
                setWeekInMonth(nextIncomplete.weekInMonth);
              }}
              className="mt-1 text-left text-sm font-semibold text-crimson-deep hover:underline"
            >
              Month {nextIncomplete.month}, Week {nextIncomplete.weekInMonth} — {nextIncomplete.day}, Hour{" "}
              {nextIncomplete.hour}: {nextIncomplete.courseTitle}
            </button>
          </div>
        )}
      </div>

      {/* Month / Week selectors */}
      <div className="mt-6 flex flex-wrap gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-stone">
            Month ({studiedInMonth}/{plan.hoursPerWeek * 4} hrs)
          </p>
          <div className="mt-2 flex gap-1.5">
            {Array.from({ length: totalMonths }, (_, i) => i + 1).map((m) => (
              <button
                key={m}
                onClick={() => {
                  setMonth(m);
                  setWeekInMonth(1);
                }}
                className={`h-9 w-9 rounded-[2px] text-sm font-semibold transition-colors ${
                  m === month ? "bg-crimson text-parchment" : "border border-ink/15 bg-white/40 text-ink hover:border-crimson"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-stone">
            Week ({studiedInWeek}/{plan.hoursPerWeek} hrs)
          </p>
          <div className="mt-2 flex gap-1.5">
            {Array.from({ length: 4 }, (_, i) => i + 1).map((w) => (
              <button
                key={w}
                onClick={() => setWeekInMonth(w)}
                className={`h-9 w-9 rounded-[2px] text-sm font-semibold transition-colors ${
                  w === weekInMonth ? "bg-crimson text-parchment" : "border border-ink/15 bg-white/40 text-ink hover:border-crimson"
                }`}
              >
                {w}
              </button>
            ))}
          </div>
        </div>
      </div>

      {milestone && (
        <div className="mt-5 rounded-[2px] border border-gold bg-white/40 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-crimson">Month {month} practical milestone</p>
          <p className="mt-1 text-sm text-ink">{milestone.description}</p>
        </div>
      )}

      {/* Day grid */}
      <div className="mt-6 space-y-5">
        {DAYS.map((day) => {
          const daySlots = weekSlots.filter((s) => s.day === day).sort((a, b) => a.hour - b.hour);
          const studiedInDay = daySlots.filter((s) => studiedSlots.has(s.id)).length;
          return (
            <div key={day} className="rounded-[2px] border border-ink/15 bg-white/30 p-4">
              <div className="flex items-center justify-between">
                <h3 className="display text-lg">{day}</h3>
                <span className="text-xs uppercase tracking-[0.1em] text-stone">
                  {studiedInDay}/{daySlots.length} hrs
                </span>
              </div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {daySlots.map((slot) => (
                  <HourCard
                    key={slot.id}
                    slot={slot}
                    studied={studiedSlots.has(slot.id)}
                    deliverableDone={doneDeliverables.has(slot.id)}
                    doneLessons={doneLessons}
                    onToggleSlot={() => toggleSlot(slot.id)}
                    onToggleDeliverable={() => toggleDeliverable(slot.id)}
                    onToggleLesson={toggleLesson}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function HourCard({
  slot,
  studied,
  deliverableDone,
  doneLessons,
  onToggleSlot,
  onToggleDeliverable,
  onToggleLesson,
}: {
  slot: PlannerHourSlot;
  studied: boolean;
  deliverableDone: boolean;
  doneLessons: Set<string>;
  onToggleSlot: () => void;
  onToggleDeliverable: () => void;
  onToggleLesson: (courseSlug: string, lessonSlug: string) => void;
}) {
  return (
    <div className={`rounded-[2px] border p-3.5 ${studied ? "border-gold bg-gold-pale/40" : "border-ink/15 bg-white/50"}`}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-crimson">Hour {slot.hour}</p>
          <p className="display mt-0.5 text-sm leading-snug">{slot.courseTitle}</p>
          {slot.chapterTitle && <p className="text-xs text-stone">{slot.chapterTitle}</p>}
        </div>
        <label className="flex shrink-0 cursor-pointer items-center gap-1.5 text-xs font-semibold text-crimson-deep">
          <input type="checkbox" checked={studied} onChange={onToggleSlot} className="h-4 w-4 accent-crimson" />
          Studied
        </label>
      </div>

      {slot.lessons.length > 0 && (
        <ul className="mt-2.5 space-y-1.5">
          {slot.lessons.map((l) => {
            const done = doneLessons.has(`${l.courseSlug}:${l.lessonSlug}`);
            return (
              <li key={l.lessonSlug} className="flex items-start gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={done}
                  onChange={() => onToggleLesson(l.courseSlug, l.lessonSlug)}
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-gold"
                />
                <Link href={l.lessonHref} className={`hover:text-crimson hover:underline ${done ? "text-stone line-through" : "text-ink"}`}>
                  {l.title}
                </Link>
                <span className="shrink-0 text-xs text-stone">
                  {l.durationIsEstimated ? "~" : ""}
                  {l.estimatedMinutes}m
                </span>
              </li>
            );
          })}
        </ul>
      )}

      <div className="mt-2.5 border-t border-ink/10 pt-2.5">
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-stone">Practical activity</p>
        <p className="mt-0.5 text-xs text-ink">{slot.practicalActivity}</p>
      </div>

      <label className="mt-2.5 flex cursor-pointer items-start gap-2 border-t border-ink/10 pt-2.5 text-xs">
        <input type="checkbox" checked={deliverableDone} onChange={onToggleDeliverable} className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-crimson" />
        <span>
          <span className="font-semibold uppercase tracking-[0.1em] text-stone">Deliverable: </span>
          <span className={deliverableDone ? "text-stone line-through" : "text-ink"}>{slot.deliverable}</span>
        </span>
      </label>
    </div>
  );
}
