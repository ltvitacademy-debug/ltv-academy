import fs from "fs";
import path from "path";
import {
  DAYS,
  type LearningPlanner,
  type PlannerDay,
  type PlannerHourSlot,
  type PlannerLessonRef,
  type PlannerMonthlyMilestone,
  type PlannerSlotType,
} from "./learningPlannerTypes";

export * from "./learningPlannerTypes";

type RawLessonRef = {
  lessonSlug: string;
  title: string;
  chapterTitle: string;
  estimatedMinutes: number;
  durationIsEstimated: boolean;
};

type RawSlot = {
  type: PlannerSlotType;
  lessons: RawLessonRef[];
  practicalActivity: string;
  deliverable: string;
};

type RawPart = {
  courseSlug: string;
  courseTitle: string;
  slots: RawSlot[];
  monthlyMilestoneContribution: string;
};

// Fixed course order per the career path's "Job Ready" stage — the Advanced
// stage's Power Automate course is deliberately excluded from this plan.
const COURSE_ORDER = [
  "how-it-teams-work",
  "t-sql-development",
  "ssis-development",
  "ssrs-development",
  "power-bi",
  "data-modeling-and-data-warehousing",
  "microsoft-bi-capstone",
];

const HOURS_PER_DAY = 2;
const DAYS_PER_WEEK = 5;
const HOURS_PER_WEEK = HOURS_PER_DAY * DAYS_PER_WEEK; // 10
const WEEKS_PER_MONTH = 4;
const HOURS_PER_MONTH = HOURS_PER_WEEK * WEEKS_PER_MONTH; // 40

function partsDir() {
  return path.join(process.cwd(), "content", "learning-planner", "_parts");
}

export function loadLearningPlanner(pathSlug: string): LearningPlanner | null {
  if (pathSlug !== "microsoft-data-bi-developer") return null; // only this path has a plan so far

  const dir = partsDir();
  const parts: RawPart[] = [];
  for (const courseSlug of COURSE_ORDER) {
    const file = path.join(dir, `${courseSlug}.json`);
    if (!fs.existsSync(file)) return null; // not all parts built yet
    parts.push(JSON.parse(fs.readFileSync(file, "utf8")));
  }

  // Flatten into one ordered sequence of hour-slots, course by course.
  const flat: { part: RawPart; raw: RawSlot }[] = [];
  for (const part of parts) {
    for (const raw of part.slots) flat.push({ part, raw });
  }

  const totalHours = flat.length;

  const slots: PlannerHourSlot[] = flat.map((entry, i) => {
    const month = Math.floor(i / HOURS_PER_MONTH) + 1;
    const indexInMonth = i % HOURS_PER_MONTH;
    const weekInMonth = Math.floor(indexInMonth / HOURS_PER_WEEK) + 1;
    const week = Math.floor(i / HOURS_PER_WEEK) + 1;
    const indexInWeek = i % HOURS_PER_WEEK;
    const day: PlannerDay = DAYS[Math.floor(indexInWeek / HOURS_PER_DAY)];
    const hour = ((indexInWeek % HOURS_PER_DAY) + 1) as 1 | 2;

    const lessons: PlannerLessonRef[] = entry.raw.lessons.map((l) => ({
      courseSlug: entry.part.courseSlug,
      lessonSlug: l.lessonSlug,
      title: l.title,
      lessonHref: `/app/courses/${entry.part.courseSlug}/${l.lessonSlug}`,
      estimatedMinutes: l.estimatedMinutes,
      durationIsEstimated: l.durationIsEstimated,
    }));

    const dayAbbr = day.slice(0, 3).toLowerCase();

    return {
      id: `microsoft-data-bi-developer-m${month}-w${weekInMonth}-${dayAbbr}-h${hour}`,
      month,
      week,
      weekInMonth,
      day,
      hour,
      courseSlug: entry.part.courseSlug,
      courseTitle: entry.part.courseTitle,
      chapterTitle: entry.raw.lessons[0]?.chapterTitle ?? "",
      type: entry.raw.type,
      lessons,
      practicalActivity: entry.raw.practicalActivity,
      deliverable: entry.raw.deliverable,
    };
  });

  // Monthly milestones: for each month, credit the courses that FINISH their
  // last hour within that month (a course mid-stream contributes nothing yet
  // — its milestone lands in the month it actually completes in).
  const monthlyMilestones: PlannerMonthlyMilestone[] = [];
  for (let month = 1; month <= Math.ceil(totalHours / HOURS_PER_MONTH); month++) {
    const monthStart = (month - 1) * HOURS_PER_MONTH;
    const monthEnd = Math.min(month * HOURS_PER_MONTH, totalHours);
    const completing = new Set<string>();
    for (const part of parts) {
      const lastIndex = flat.map((e) => e.part.courseSlug).lastIndexOf(part.courseSlug);
      if (lastIndex >= monthStart && lastIndex < monthEnd) completing.add(part.courseSlug);
    }
    const contributions = parts
      .filter((p) => completing.has(p.courseSlug))
      .map((p) => p.monthlyMilestoneContribution);
    monthlyMilestones.push({
      month,
      title: `Month ${month} milestone`,
      description:
        contributions.length > 0
          ? contributions.join(" ")
          : "Continuing through this month's course — no new course completes yet.",
    });
  }

  const totalLessons = flat.reduce((sum, e) => sum + e.raw.lessons.length, 0);
  const realVideoMinutes = flat.reduce(
    (sum, e) => sum + e.raw.lessons.filter((l) => !l.durationIsEstimated).reduce((s, l) => s + l.estimatedMinutes, 0),
    0
  );
  const lessonsWithEstimatedDuration = flat.reduce(
    (sum, e) => sum + e.raw.lessons.filter((l) => l.durationIsEstimated).length,
    0
  );
  const realVideoHours = Math.round((realVideoMinutes / 60) * 10) / 10;

  return {
    pathSlug: "microsoft-data-bi-developer",
    pathTitle: "Microsoft Data & BI Developer",
    totalWeeks: Math.ceil(totalHours / HOURS_PER_WEEK),
    totalHours,
    hoursPerWeek: HOURS_PER_WEEK,
    hoursPerDay: HOURS_PER_DAY,
    studyDaysPerWeek: DAYS_PER_WEEK,
    excludedCourses: [
      {
        courseSlug: "power-automate",
        title: "Power Automate",
        reason:
          "This 30-lesson course is the path's separate 'Advanced' stage, not part of the 6-month Job Ready foundation — it's a natural next step after this plan, not part of it.",
      },
    ],
    monthlyMilestones,
    workloadAudit: {
      totalLessons,
      realVideoHours,
      lessonsWithEstimatedDuration,
      practiceAndLabHours: Math.round((totalHours - realVideoHours) * 10) / 10,
      note:
        "Real recorded video across all 372 lessons totals roughly " +
        realVideoHours +
        " hours — a small fraction of the 240 scheduled hours. The remaining time is real, scheduled guided practice, labs, and the capstone build, not passive viewing. " +
        lessonsWithEstimatedDuration +
        " lessons (mostly conceptual career-prep lessons with no recording yet) use an estimated duration instead of a measured one.",
    },
    slots,
  };
}

export function hasLearningPlanner(pathSlug: string): boolean {
  return loadLearningPlanner(pathSlug) !== null;
}
