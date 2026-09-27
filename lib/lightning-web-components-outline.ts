// The Lightning Web Components course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Salesforce Technical Architect career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/lightning-web-components/
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

export const SFTA_LIGHTNING_WEB_COMPONENTS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Component Basics",
    lessons: [
      L(1, "lwc-overview-and-setup", "LWC Overview and Setup"),
      L(2, "html-templates", "HTML Templates"),
      L(3, "javascript-fundamentals", "JavaScript Fundamentals"),
      L(4, "components", "Components"),
      L(5, "properties-and-reactivity", "Properties and Reactivity"),
    ],
  },
  {
    n: 2,
    title: "Connecting Components",
    lessons: [
      L(6, "events", "Events"),
      L(7, "calling-apex", "Calling Apex"),
      L(8, "lightning-data-service", "Lightning Data Service"),
      L(9, "the-wire-service", "The Wire Service"),
    ],
  },
  {
    n: 3,
    title: "Reusable UI",
    lessons: [
      L(10, "reusable-ui-components", "Reusable UI Components"),
      L(11, "styling", "Styling"),
      L(12, "lwc-testing-and-debugging", "LWC Testing and Debugging"),
    ],
  },
];
