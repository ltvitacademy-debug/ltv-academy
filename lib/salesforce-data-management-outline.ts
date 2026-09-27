// The Data Management course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Salesforce Technical Architect career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/salesforce-data-management/
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

export const SFTA_SALESFORCE_DATA_MANAGEMENT_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Getting Data In and Out",
    lessons: [
      L(1, "the-import-wizard", "The Import Wizard"),
      L(2, "data-loader-concepts", "Data Loader Concepts"),
      L(3, "data-exports-and-backups", "Data Exports and Backups"),
      L(4, "bulk-data-operations", "Bulk Data Operations"),
    ],
  },
  {
    n: 2,
    title: "Data Quality",
    lessons: [
      L(5, "duplicate-management", "Duplicate Management"),
      L(6, "validation-and-data-quality", "Validation and Data Quality"),
      L(7, "data-cleaning-practice", "Data Cleaning Practice"),
      L(8, "data-management-best-practices", "Data Management Best Practices"),
    ],
  },
];
