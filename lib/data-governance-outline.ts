// The Data Governance course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Salesforce Technical Architect career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/data-governance/
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

export const SFTA_DATA_GOVERNANCE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Governing Data",
    lessons: [
      L(1, "data-ownership", "Data Ownership"),
      L(2, "data-quality", "Data Quality"),
      L(3, "data-retention", "Data Retention"),
      L(4, "compliance", "Compliance"),
      L(5, "building-a-governance-framework", "Building a Governance Framework"),
    ],
  },
];
