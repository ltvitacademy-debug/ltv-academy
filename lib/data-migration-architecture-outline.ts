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
      L(1, "data-migration-overview", "Data Migration Overview", { contentDir: "ch01/01-data-migration-overview" }),
      L(2, "source-analysis", "Source Analysis", { contentDir: "ch01/02-source-analysis" }),
      L(3, "data-profiling-and-quality-assessment", "Data Profiling and Quality Assessment", { contentDir: "ch01/03-data-profiling-and-quality-assessment" }),
      L(4, "migration-scope-and-strategy", "Migration Scope and Strategy", { contentDir: "ch01/04-migration-scope-and-strategy" }),
      L(5, "migration-tooling-options", "Migration Tooling Options", { contentDir: "ch01/05-migration-tooling-options" }),
    ],
  },
  {
    n: 2,
    title: "Designing the Migration",
    lessons: [
      L(6, "mappings", "Mappings", { contentDir: "ch02/06-mappings" }),
      L(7, "transformation", "Transformation", { contentDir: "ch02/07-transformation" }),
      L(8, "migration-sequencing", "Migration Sequencing", { contentDir: "ch02/08-migration-sequencing" }),
      L(9, "handling-relationships-and-external-ids", "Handling Relationships and External IDs", { contentDir: "ch02/09-handling-relationships-and-external-ids" }),
      L(10, "handling-attachments-and-files", "Handling Attachments and Files", { contentDir: "ch02/10-handling-attachments-and-files" }),
      L(11, "handling-history-and-audit-fields", "Handling History and Audit Fields", { contentDir: "ch02/11-handling-history-and-audit-fields" }),
    ],
  },
  {
    n: 3,
    title: "Proving and Cutting Over",
    lessons: [
      L(12, "validation", "Validation", { contentDir: "ch03/12-validation" }),
      L(13, "reconciliation", "Reconciliation", { contentDir: "ch03/13-reconciliation" }),
      L(14, "trial-migrations-and-rehearsals", "Trial Migrations and Rehearsals", { contentDir: "ch03/14-trial-migrations-and-rehearsals" }),
      L(15, "cutover", "Cutover", { contentDir: "ch03/15-cutover" }),
      L(16, "rollback-and-contingency-planning", "Rollback and Contingency Planning", { contentDir: "ch03/16-rollback-and-contingency-planning" }),
      L(17, "post-migration-support", "Post-Migration Support", { contentDir: "ch03/17-post-migration-support" }),
      L(18, "data-migration-case-study", "Data Migration Case Study", { contentDir: "ch03/18-data-migration-case-study" }),
    ],
  },
];
