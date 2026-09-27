// The Data Migration Architecture course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Salesforce Technical Architect career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/data-migration-architecture/
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

export const SFTA_DATA_MIGRATION_ARCHITECTURE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Designing a Migration",
    lessons: [
      L(1, "source-analysis", "Source Analysis"),
      L(2, "mappings", "Mappings"),
      L(3, "transformation", "Transformation"),
      L(4, "migration-sequencing", "Migration Sequencing"),
    ],
  },
  {
    n: 2,
    title: "Proving the Migration",
    lessons: [
      L(5, "validation", "Validation"),
      L(6, "reconciliation", "Reconciliation"),
      L(7, "cutover", "Cutover"),
    ],
  },
];
