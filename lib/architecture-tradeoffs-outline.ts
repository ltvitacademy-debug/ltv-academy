// The Architecture Tradeoffs course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Salesforce Technical Architect career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/architecture-tradeoffs/
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

export const SFTA_ARCHITECTURE_TRADEOFFS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Architecture Tradeoffs",
    lessons: [
      L(1, "security-vs-usability", "Security vs. Usability"),
      L(2, "performance-vs-complexity", "Performance vs. Complexity"),
      L(3, "build-vs-buy", "Build vs. Buy"),
      L(4, "synchronous-vs-asynchronous", "Synchronous vs. Asynchronous"),
      L(5, "declarative-vs-programmatic", "Declarative vs. Programmatic"),
      L(6, "real-time-vs-batch", "Real-Time vs. Batch"),
      L(7, "documenting-tradeoffs", "Documenting Tradeoffs"),
      L(8, "tradeoff-practice", "Tradeoff Practice"),
    ],
  },
];
