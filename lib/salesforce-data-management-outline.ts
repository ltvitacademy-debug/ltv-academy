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
      L(1, "planning-a-data-load", "Planning a Data Load", { contentDir: "ch01/01-planning-a-data-load", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792600367/ltv-salesforce-data-management/planning-a-data-load.mp4", durationLabel: "1 min 50 s" }),
      L(2, "the-import-wizard", "The Import Wizard", { contentDir: "ch01/02-the-import-wizard", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792600931/ltv-salesforce-data-management/the-import-wizard.mp4", durationLabel: "1 min 57 s" }),
      L(3, "data-loader-concepts", "Data Loader Concepts", { contentDir: "ch01/03-data-loader-concepts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792601358/ltv-salesforce-data-management/data-loader-concepts.mp4", durationLabel: "1 min 44 s" }),
      L(4, "preparing-csv-files", "Preparing CSV Files", { contentDir: "ch01/04-preparing-csv-files", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792601754/ltv-salesforce-data-management/preparing-csv-files.mp4", durationLabel: "1 min 37 s" }),
      L(5, "insert-update-and-upsert-operations", "Insert, Update and Upsert Operations", { contentDir: "ch01/05-insert-update-and-upsert-operations", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792602263/ltv-salesforce-data-management/insert-update-and-upsert-operations.mp4", durationLabel: "1 min 55 s" }),
      L(6, "external-ids-and-relationships-during-loads", "External IDs and Relationships During Loads", { contentDir: "ch01/06-external-ids-and-relationships-during-loads", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792602723/ltv-salesforce-data-management/external-ids-and-relationships-during-loads.mp4", durationLabel: "1 min 51 s" }),
    ],
  },
  {
    n: 2,
    title: "Getting Data Out and Keeping It Safe",
    lessons: [
      L(7, "data-exports-and-backups", "Data Exports and Backups", { contentDir: "ch02/07-data-exports-and-backups", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792603146/ltv-salesforce-data-management/data-exports-and-backups.mp4", durationLabel: "1 min 35 s" }),
      L(8, "weekly-export-service", "Weekly Export Service", { contentDir: "ch02/08-weekly-export-service", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792603539/ltv-salesforce-data-management/weekly-export-service.mp4", durationLabel: "1 min 29 s" }),
      L(9, "bulk-data-operations", "Bulk Data Operations", { contentDir: "ch02/09-bulk-data-operations", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792604002/ltv-salesforce-data-management/bulk-data-operations.mp4", durationLabel: "1 min 46 s" }),
      L(10, "deleting-and-mass-transferring-records", "Deleting and Mass Transferring Records", { contentDir: "ch02/10-deleting-and-mass-transferring-records", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792604513/ltv-salesforce-data-management/deleting-and-mass-transferring-records.mp4", durationLabel: "1 min 43 s" }),
      L(11, "recycle-bin-and-data-recovery", "Recycle Bin and Data Recovery", { contentDir: "ch02/11-recycle-bin-and-data-recovery", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792605006/ltv-salesforce-data-management/recycle-bin-and-data-recovery.mp4", durationLabel: "1 min 47 s" }),
    ],
  },
  {
    n: 3,
    title: "Data Quality",
    lessons: [
      L(12, "duplicate-management", "Duplicate Management", { contentDir: "ch03/12-duplicate-management", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792605642/ltv-salesforce-data-management/duplicate-management.mp4", durationLabel: "2 min 11 s" }),
      L(13, "matching-rules-and-duplicate-rules", "Matching Rules and Duplicate Rules", { contentDir: "ch03/13-matching-rules-and-duplicate-rules", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792606278/ltv-salesforce-data-management/matching-rules-and-duplicate-rules.mp4", durationLabel: "2 min 20 s" }),
      L(14, "validation-and-data-quality", "Validation and Data Quality", { contentDir: "ch03/14-validation-and-data-quality", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792606835/ltv-salesforce-data-management/validation-and-data-quality.mp4", durationLabel: "2 min 4 s" }),
      L(15, "standardizing-data", "Standardizing Data", { contentDir: "ch03/15-standardizing-data", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792607376/ltv-salesforce-data-management/standardizing-data.mp4", durationLabel: "1 min 55 s" }),
      L(16, "data-cleaning-practice", "Data Cleaning Practice", { contentDir: "ch03/16-data-cleaning-practice", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792607935/ltv-salesforce-data-management/data-cleaning-practice.mp4", durationLabel: "2 min 6 s" }),
      L(17, "data-management-best-practices", "Data Management Best Practices", { contentDir: "ch03/17-data-management-best-practices", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792608340/ltv-salesforce-data-management/data-management-best-practices.mp4", durationLabel: "1 min 48 s" }),
    ],
  },
  {
    n: 4,
    title: "Applied Data Management",
    lessons: [
      L(18, "data-loader-practice-lab", "Data Loader Practice Lab", { contentDir: "ch04/18-data-loader-practice-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792608955/ltv-salesforce-data-management/data-loader-practice-lab.mp4", durationLabel: "2 min 13 s" }),
      L(19, "import-troubleshooting", "Import Troubleshooting", { contentDir: "ch04/19-import-troubleshooting", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792609571/ltv-salesforce-data-management/import-troubleshooting.mp4", durationLabel: "2 min 12 s" }),
      L(20, "data-management-case-study", "Data Management Case Study", { contentDir: "ch04/20-data-management-case-study", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792610242/ltv-salesforce-data-management/data-management-case-study.mp4", durationLabel: "2 min 30 s" }),
    ],
  },
];
