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
    title: "Planning",
    lessons: [
      L(1, "data-migration-overview", "Data Migration Overview"),
      L(2, "source-analysis", "Source Analysis"),
      L(3, "data-profiling-and-quality-assessment", "Data Profiling and Quality Assessment"),
      L(4, "migration-scope-and-strategy", "Migration Scope and Strategy"),
      L(5, "migration-tooling-options", "Migration Tooling Options"),
    ],
  },
  {
    n: 2,
    title: "Designing the Migration",
    lessons: [
      L(6, "mappings", "Mappings"),
      L(7, "transformation", "Transformation"),
      L(8, "migration-sequencing", "Migration Sequencing"),
      L(9, "handling-relationships-and-external-ids", "Handling Relationships and External IDs"),
      L(10, "handling-attachments-and-files", "Handling Attachments and Files"),
      L(11, "handling-history-and-audit-fields", "Handling History and Audit Fields"),
    ],
  },
  {
    n: 3,
    title: "Proving and Cutting Over",
    lessons: [
      L(12, "validation", "Validation"),
      L(13, "reconciliation", "Reconciliation"),
      L(14, "trial-migrations-and-rehearsals", "Trial Migrations and Rehearsals"),
      L(15, "cutover", "Cutover"),
      L(16, "rollback-and-contingency-planning", "Rollback and Contingency Planning"),
      L(17, "post-migration-support", "Post-Migration Support"),
      L(18, "data-migration-case-study", "Data Migration Case Study"),
    ],
  },
];
