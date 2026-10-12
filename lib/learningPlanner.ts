import fs from "fs";
import path from "path";
import { getCareerPath } from "./career-paths";
import {
  DAYS,
  type LearningPlanner,
  type PlannerDay,
  type PlannerExcludedCourse,
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

// Per-path config: the exact course order the schedule follows (the path's
// real "core curriculum" stage(s), excluding any separate bonus/"Advanced"
// add-on stage — see each entry's `excludedCourses` for what's left out and
// why). Course order matches each path's own `stages` in lib/career-paths.ts.
const PATH_CONFIG: Record<string, { courseOrder: string[]; excludedCourses: PlannerExcludedCourse[] }> = {
  "microsoft-data-bi-developer": {
    courseOrder: ["how-it-teams-work", "t-sql-development", "ssis-development", "ssrs-development", "power-bi", "data-modeling-and-data-warehousing", "microsoft-bi-capstone"],
    excludedCourses: [
      { courseSlug: "power-automate", title: "Power Automate", reason: "This 30-lesson course is the path's separate 'Advanced' stage, not part of the Job Ready foundation — a natural next step after this plan, not part of it." },
    ],
  },
  "data-analyst-bi-engineer": {
    courseOrder: ["how-it-teams-work", "t-sql-development", "power-bi", "python-for-power-bi", "tableau", "advanced-excel-for-data-analysts"],
    excludedCourses: [],
  },
  "analytics-engineer": {
    courseOrder: ["how-it-teams-work", "t-sql-development", "power-bi", "snowflake", "dbt-analytics-engineering", "git-github-cicd-for-data"],
    excludedCourses: [],
  },
  "azure-fabric-data-engineer": {
    courseOrder: ["how-it-teams-work", "t-sql-development", "data-engineering-foundations", "data-factory", "azure-databricks-and-delta-lake", "microsoft-fabric-and-real-time-analytics", "data-engineering-career-and-capstone"],
    excludedCourses: [],
  },
  "databricks-lakehouse-engineer": {
    courseOrder: ["how-it-teams-work", "t-sql-development", "data-engineering-foundations", "data-factory", "azure-databricks-and-delta-lake"],
    excludedCourses: [],
  },
  "aws-data-engineer": {
    courseOrder: ["how-it-teams-work", "t-sql-development", "data-engineering-foundations", "aws-fundamentals-for-data-engineers", "aws-data-engineering"],
    excludedCourses: [],
  },
  "snowflake-data-engineer": {
    courseOrder: ["how-it-teams-work", "t-sql-development", "snowflake", "dbt-analytics-engineering", "data-factory", "power-bi"],
    excludedCourses: [],
  },
  "azure-database-engineer": {
    courseOrder: ["how-it-teams-work", "t-sql-development", "azure-fundamentals", "azure-database-administrator", "data-factory"],
    excludedCourses: [],
  },
  "sql-server-database-administrator": {
    courseOrder: ["how-it-teams-work", "t-sql-development", "t-sql-for-database-administrators", "sql-server-database-administration", "sql-server-performance-tuning", "sql-server-ha-backup-and-disaster-recovery", "azure-database-administrator", "powershell-automation-and-devops-for-dbas", "cross-platform-relational-database-administration", "nosql-document-and-graph-databases"],
    excludedCourses: [],
  },
  "data-governance": {
    courseOrder: ["how-it-teams-work", "t-sql-development", "data-engineering-foundations", "data-governance-foundations", "data-quality-management", "metadata-management-and-business-glossary", "data-lineage-and-impact-analysis", "master-and-reference-data-management", "data-security-privacy-and-classification", "microsoft-purview", "microsoft-fabric-data-governance", "databricks-unity-catalog-governance", "snowflake-data-governance", "power-bi-governance", "cloud-data-governance-azure-and-aws", "ai-and-machine-learning-governance", "data-governance-program-management", "data-governance-architecture", "data-governance-career-and-capstone"],
    excludedCourses: [],
  },
  "data-scientist": {
    courseOrder: ["how-it-teams-work", "t-sql-development", "python-for-data-science", "statistics-and-probability-for-data-science", "data-visualization-and-eda", "machine-learning-fundamentals", "applied-machine-learning", "advanced-data-science", "ai-and-generative-ai-fundamentals-for-data-scientists", "azure-data-science", "aws-data-science", "mlops-for-data-scientists", "data-science-capstone"],
    excludedCourses: [],
  },
  "ai-engineer": {
    courseOrder: ["how-it-teams-work", "python-for-ai-engineering", "git-github-for-software-engineers", "apis-json-for-ai-applications", "ai-ml-foundations", "generative-ai-and-llms", "prompt-and-context-engineering", "rag-and-vector-databases", "ai-agents", "azure-ai-and-cloud-for-ai-engineers", "docker-and-deployment-for-ai-applications", "ai-security-evaluation-and-monitoring", "ai-engineering-capstones"],
    excludedCourses: [
      { courseSlug: "power-automate-ai-agents", title: "Power Automate AI Agents", reason: "This is the path's separate 'Advanced' stage, not part of the Job Ready foundation — a natural next step after this plan, not part of it." },
    ],
  },
  "salesforce-administrator": {
    courseOrder: ["how-it-teams-work", "salesforce-and-crm-foundations", "salesforce-hands-on-environment", "salesforce-data-model-fundamentals", "salesforce-administration", "salesforce-security-and-access-fundamentals", "salesforce-data-management", "salesforce-admin-reports-and-dashboards", "salesforce-platform-app-builder", "salesforce-flow-automation", "salesforce-business-process-automation", "ltv-customer-management-system", "salesforce-career-preparation"],
    excludedCourses: [
      { courseSlug: "salesforce-architect", title: "Continue to the Salesforce Architect destination", reason: "That's an optional next destination (pathChoiceSlugs), not fixed coursework in this program." },
    ],
  },
  "oracle-fusion-financials-consultant": {
    courseOrder: ["how-it-teams-work", "oracle-fusion-cloud-and-erp-foundations", "accounting-fundamentals-for-oracle-professionals", "oracle-fusion-enterprise-structures-and-chart-of-accounts", "oracle-fusion-general-ledger", "oracle-fusion-accounts-payable", "oracle-fusion-accounts-receivable", "oracle-fusion-cash-management", "oracle-fusion-fixed-assets", "oracle-fusion-expenses", "oracle-fusion-procure-to-pay", "oracle-fusion-order-to-cash", "oracle-fusion-subledger-accounting", "oracle-financial-reporting", "oracle-financials-data", "sql-for-oracle-financials", "fbdi-and-adfdi", "rest-apis-and-integration-fundamentals", "oracle-fusion-security", "oracle-fusion-implementation-lifecycle", "troubleshooting-oracle-financials", "ltv-manufacturing-corporation-capstone", "oracle-financials-career-and-interview-preparation"],
    excludedCourses: [],
  },
  "devops-engineer": {
    courseOrder: ["how-it-teams-work", "it-networking-and-cloud-fundamentals", "linux-administration", "git-github-for-software-engineers", "python-and-bash-automation", "azure-fundamentals", "aws-fundamentals-for-data-engineers", "docker-and-containers", "kubernetes-orchestration", "infrastructure-as-code-with-terraform", "ci-cd-pipelines", "monitoring-logging-and-observability", "devsecops-fundamentals", "devops-capstone"],
    excludedCourses: [],
  },
  "blockchain-engineer": {
    courseOrder: ["how-it-teams-work", "js-ts-blockchain", "blockchain", "blockchain-apis-backend", "defi-token-engineering", "blockchain-testing-devops", "blockchain-engineering-capstones"],
    excludedCourses: [],
  },
};

const HOURS_PER_DAY = 2;
const DAYS_PER_WEEK = 5;
const HOURS_PER_WEEK = HOURS_PER_DAY * DAYS_PER_WEEK; // 10
const WEEKS_PER_MONTH = 4;
const HOURS_PER_MONTH = HOURS_PER_WEEK * WEEKS_PER_MONTH; // 40

function partsDir(pathSlug: string) {
  return path.join(process.cwd(), "content", "learning-planner", "_parts", pathSlug);
}

export function loadLearningPlanner(pathSlug: string): LearningPlanner | null {
  const config = PATH_CONFIG[pathSlug];
  if (!config) return null;
  const careerPath = getCareerPath(pathSlug);
  if (!careerPath) return null;

  const dir = partsDir(pathSlug);
  const parts: RawPart[] = [];
  for (const courseSlug of config.courseOrder) {
    const file = path.join(dir, `${courseSlug}.json`);
    if (!fs.existsSync(file)) return null; // not all parts built yet for this path
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
      id: `${pathSlug}-m${month}-w${weekInMonth}-${dayAbbr}-h${hour}`,
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
    pathSlug,
    pathTitle: careerPath.title,
    totalWeeks: Math.ceil(totalHours / HOURS_PER_WEEK),
    totalHours,
    hoursPerWeek: HOURS_PER_WEEK,
    hoursPerDay: HOURS_PER_DAY,
    studyDaysPerWeek: DAYS_PER_WEEK,
    excludedCourses: config.excludedCourses,
    monthlyMilestones,
    workloadAudit: {
      totalLessons,
      realVideoHours,
      lessonsWithEstimatedDuration,
      practiceAndLabHours: Math.round((totalHours - realVideoHours) * 10) / 10,
      note:
        "Real recorded video across all " +
        totalLessons +
        " lessons totals roughly " +
        realVideoHours +
        " hours — a small fraction of the " +
        totalHours +
        " scheduled hours. The remaining time is real, scheduled guided practice, labs, and the capstone build, not passive viewing. " +
        lessonsWithEstimatedDuration +
        " lessons (mostly conceptual career-prep lessons with no recording yet) use an estimated duration instead of a measured one.",
    },
    slots,
  };
}

export function hasLearningPlanner(pathSlug: string): boolean {
  return loadLearningPlanner(pathSlug) !== null;
}

// Cheap enough to call from a page that just needs the real week count for
// copy (e.g. "Get a real 36-week study plan") without rendering the whole UI.
export function getLearningPlannerWeeks(pathSlug: string): number | null {
  return loadLearningPlanner(pathSlug)?.totalWeeks ?? null;
}

export function getLearningPlannerPathSlugs(): string[] {
  return Object.keys(PATH_CONFIG);
}
