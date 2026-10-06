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
    title: "Getting Data In",
    lessons: [
      L(1, "planning-a-data-load", "Planning a Data Load"),
      L(2, "the-import-wizard", "The Import Wizard"),
      L(3, "data-loader-concepts", "Data Loader Concepts"),
      L(4, "preparing-csv-files", "Preparing CSV Files"),
      L(5, "insert-update-and-upsert-operations", "Insert, Update and Upsert Operations"),
      L(6, "external-ids-and-relationships-during-loads", "External IDs and Relationships During Loads"),
    ],
  },
  {
    n: 2,
    title: "Getting Data Out and Keeping It Safe",
    lessons: [
      L(7, "data-exports-and-backups", "Data Exports and Backups"),
      L(8, "weekly-export-service", "Weekly Export Service"),
      L(9, "bulk-data-operations", "Bulk Data Operations"),
      L(10, "deleting-and-mass-transferring-records", "Deleting and Mass Transferring Records"),
      L(11, "recycle-bin-and-data-recovery", "Recycle Bin and Data Recovery"),
    ],
  },
  {
    n: 3,
    title: "Data Quality",
    lessons: [
      L(12, "duplicate-management", "Duplicate Management", { contentDir: "ch03/12-duplicate-management" }),
      L(13, "matching-rules-and-duplicate-rules", "Matching Rules and Duplicate Rules", { contentDir: "ch03/13-matching-rules-and-duplicate-rules" }),
      L(14, "validation-and-data-quality", "Validation and Data Quality", { contentDir: "ch03/14-validation-and-data-quality" }),
      L(15, "standardizing-data", "Standardizing Data", { contentDir: "ch03/15-standardizing-data" }),
      L(16, "data-cleaning-practice", "Data Cleaning Practice", { contentDir: "ch03/16-data-cleaning-practice" }),
      L(17, "data-management-best-practices", "Data Management Best Practices", { contentDir: "ch03/17-data-management-best-practices" }),
    ],
  },
  {
    n: 4,
    title: "Applied Data Management",
    lessons: [
      L(18, "data-loader-practice-lab", "Data Loader Practice Lab", { contentDir: "ch04/18-data-loader-practice-lab" }),
      L(19, "import-troubleshooting", "Import Troubleshooting", { contentDir: "ch04/19-import-troubleshooting" }),
      L(20, "data-management-case-study", "Data Management Case Study", { contentDir: "ch04/20-data-management-case-study" }),
    ],
  },
];
