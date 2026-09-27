// The Nonfunctional Requirements course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Salesforce Technical Architect career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/nonfunctional-requirements/
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

export const SFTA_NONFUNCTIONAL_REQUIREMENTS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Nonfunctional Requirements",
    lessons: [
      L(1, "performance", "Performance"),
      L(2, "security", "Security"),
      L(3, "scalability", "Scalability"),
      L(4, "reliability", "Reliability"),
      L(5, "maintainability-and-recoverability", "Maintainability and Recoverability"),
      L(6, "compliance", "Compliance"),
    ],
  },
];
