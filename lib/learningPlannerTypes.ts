// Pure types for the LTV 24-Week Learning Planner — no fs/path, safe to import
// client-side. Content lives as static JSON per career path
// (content/learning-planner/<path-slug>.json), loaded server-side by
// lib/learningPlanner.ts, mirroring the Interview Prep / Final Test split
// between a pure types file and an fs-based loader.
//
// Progress is tracked the same way every other learning feature on this
// platform does today (see components/app/MarkComplete.tsx): localStorage,
// per device. There is no real backend/auth in this codebase yet, so this
// is per-device progress, not cross-device — honestly labeled as such in
// the UI rather than claiming sync it can't actually do.

export type PlannerDay = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";

export type PlannerSlotType = "lesson" | "practice" | "lab" | "review" | "capstone";

export type PlannerLessonRef = {
  courseSlug: string;
  lessonSlug: string;
  title: string;
  lessonHref: string; // /app/courses/<courseSlug>/<lessonSlug>
  estimatedMinutes: number; // real recorded video length where known
  durationIsEstimated: boolean; // true when no real video-length data exists yet for this lesson
};

export type PlannerHourSlot = {
  id: string; // "<pathSlug>-m<M>-w<weekInMonth>-<day-3letter>-h<H>", unique within the plan
  month: number; // 1-based, path-dependent (6/7/9 months depending on course count)
  week: number; // 1-based, global across the whole plan
  weekInMonth: number; // 1-4
  day: PlannerDay;
  hour: 1 | 2;
  courseSlug: string;
  courseTitle: string;
  chapterTitle: string;
  type: PlannerSlotType;
  lessons: PlannerLessonRef[]; // 0+ lessons anchoring this hour; practice-only hours may be empty
  practicalActivity: string;
  deliverable: string;
};

export type PlannerMonthlyMilestone = {
  month: number;
  title: string;
  description: string;
};

export type PlannerExcludedCourse = {
  courseSlug: string;
  title: string;
  reason: string;
};

export type LearningPlanner = {
  pathSlug: string;
  pathTitle: string;
  totalWeeks: number;
  totalHours: number;
  hoursPerWeek: number;
  hoursPerDay: number;
  studyDaysPerWeek: number;
  excludedCourses: PlannerExcludedCourse[];
  monthlyMilestones: PlannerMonthlyMilestone[];
  workloadAudit: {
    totalLessons: number;
    realVideoHours: number; // sum of actual recorded durations where known
    lessonsWithEstimatedDuration: number; // lessons with no real recording yet
    practiceAndLabHours: number; // totalHours - realVideoHours (rounded)
    note: string;
  };
  slots: PlannerHourSlot[]; // length === totalHours
};

export const DAYS: PlannerDay[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

// localStorage keys — per-device only, same honesty as MarkComplete.tsx.
// Three separate things are tracked, deliberately not conflated:
//   1. The scheduled STUDY HOUR itself ("I did this session")
//   2. Each LESSON's completion — reads the *same* key MarkComplete.tsx
//      already writes on the real lesson page, so this is genuinely derived
//      from the existing lesson-progress system, not a parallel copy of it.
//   3. The hour's practical DELIVERABLE, which is its own checkbox.
export function plannerSlotKey(pathSlug: string, slotId: string) {
  return `learningPlanner:${pathSlug}:slot:${slotId}`;
}
export function plannerDeliverableKey(pathSlug: string, slotId: string) {
  return `learningPlanner:${pathSlug}:deliverable:${slotId}`;
}
export function lessonDoneKey(courseSlug: string, lessonSlug: string) {
  return `done:${courseSlug}:${lessonSlug}`; // matches components/app/MarkComplete.tsx exactly
}
export function plannerStartDateKey(pathSlug: string) {
  return `learningPlanner:${pathSlug}:startDate`;
}
