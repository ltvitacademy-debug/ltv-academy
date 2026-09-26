// The FBDI & ADFdi course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Section 06. Loading data into Oracle Fusion Cloud Financials.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/fbdi-and-adfdi/
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

export const FBDI_AND_ADFDI_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "File-Based Data Import",
    lessons: [
      L(1, "fbdi-overview-and-templates", "FBDI Overview and Templates"),
      L(2, "preparing-csv-and-zip-files", "Preparing CSV and ZIP Files"),
      L(3, "uploading-and-loading-data", "Uploading and Loading Data"),
      L(4, "validation-and-failed-imports", "Validation and Failed Imports"),
    ],
  },
  {
    n: 2,
    title: "Spreadsheet Uploads and Scheduling",
    lessons: [
      L(5, "adfdi-overview-and-setup", "ADFdi Overview and Setup"),
      L(6, "uploading-with-adfdi-spreadsheets", "Uploading with ADFdi Spreadsheets"),
      L(7, "scheduled-processes-and-monitoring-imports", "Scheduled Processes and Monitoring Imports"),
    ],
  },
];
