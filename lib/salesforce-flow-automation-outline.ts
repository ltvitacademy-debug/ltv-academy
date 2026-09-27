// The Flow Automation course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Salesforce Technical Architect career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/salesforce-flow-automation/
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

export const SFTA_SALESFORCE_FLOW_AUTOMATION_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Flow Types",
    lessons: [
      L(1, "flow-builder-overview", "Flow Builder Overview"),
      L(2, "record-triggered-flows", "Record-Triggered Flows"),
      L(3, "screen-flows", "Screen Flows"),
      L(4, "scheduled-flows", "Scheduled Flows"),
      L(5, "autolaunched-flows-and-subflows", "Autolaunched Flows and Subflows"),
    ],
  },
  {
    n: 2,
    title: "Flow Logic",
    lessons: [
      L(6, "variables-and-formulas", "Variables and Formulas"),
      L(7, "decisions", "Decisions"),
      L(8, "loops", "Loops"),
      L(9, "collections", "Collections"),
    ],
  },
  {
    n: 3,
    title: "Reliable Automation",
    lessons: [
      L(10, "fault-handling", "Fault Handling"),
      L(11, "flow-testing-and-debugging", "Flow Testing and Debugging"),
      L(12, "automation-architecture", "Automation Architecture"),
    ],
  },
];
