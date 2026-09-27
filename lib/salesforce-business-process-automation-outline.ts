// The Business Process Automation course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Salesforce Technical Architect career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/salesforce-business-process-automation/
  videoUrl?: string;
  durationLabel?: string;
};

export type ChapterMeta = { n: number; title: string; lessons: LessonMeta[] };

const L = (n: number, slug: string, title: string, extra?: Partial<LessonMeta>): LessonMeta => ({
  n,
  slug,
  title,
  ...extra,
});

export const SFTA_SALESFORCE_BUSINESS_PROCESS_AUTOMATION_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Declarative Business Logic",
    lessons: [
      L(1, "approval-processes", "Approval Processes"),
      L(2, "validation-rules", "Validation Rules"),
      L(3, "formulas", "Formulas"),
      L(4, "notifications", "Notifications"),
    ],
  },
  {
    n: 2,
    title: "Choosing the Right Tool",
    lessons: [
      L(5, "choosing-declarative-vs-programmatic-solutions", "Choosing Declarative vs. Programmatic Solutions"),
      L(6, "the-order-of-execution-overview", "The Order of Execution Overview"),
      L(7, "business-process-case-study", "Business Process Case Study"),
    ],
  },
];
