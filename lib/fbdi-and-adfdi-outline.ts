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
    title: "Data Loading Concepts",
    lessons: [
      L(1, "ways-to-load-data-into-oracle-fusion", "Ways to Load Data into Oracle Fusion", { contentDir: "ch01/01-ways-to-load-data-into-oracle-fusion", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792506847/ltv-fbdi-and-adfdi/ways-to-load-data-into-oracle-fusion.mp4", durationLabel: "2 min 1 s" }),
      L(2, "file-based-data-import-overview", "File-Based Data Import Overview", { contentDir: "ch01/02-file-based-data-import-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792507654/ltv-fbdi-and-adfdi/file-based-data-import-overview.mp4", durationLabel: "1 min 54 s" }),
      L(3, "the-fbdi-process-template-to-import", "The FBDI Process: Template to Import", { contentDir: "ch01/03-the-fbdi-process-template-to-import", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792508348/ltv-fbdi-and-adfdi/the-fbdi-process-template-to-import.mp4", durationLabel: "1 min 55 s" }),
      L(4, "universal-content-management-and-import-locations", "Universal Content Management and Import Locations", { contentDir: "ch01/04-universal-content-management-and-import-locations", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792509115/ltv-fbdi-and-adfdi/universal-content-management-and-import-locations.mp4", durationLabel: "1 min 54 s" }),
    ],
  },
  {
    n: 2,
    title: "FBDI Templates and Files",
    lessons: [
      L(5, "downloading-and-reading-fbdi-templates", "Downloading and Reading FBDI Templates", { contentDir: "ch02/05-downloading-and-reading-fbdi-templates", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792509844/ltv-fbdi-and-adfdi/downloading-and-reading-fbdi-templates.mp4", durationLabel: "1 min 58 s" }),
      L(6, "filling-in-templates-correctly", "Filling in Templates Correctly", { contentDir: "ch02/06-filling-in-templates-correctly", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792510555/ltv-fbdi-and-adfdi/filling-in-templates-correctly.mp4", durationLabel: "1 min 44 s" }),
      L(7, "generating-csv-and-zip-files", "Generating CSV and ZIP Files", { contentDir: "ch02/07-generating-csv-and-zip-files", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792511311/ltv-fbdi-and-adfdi/generating-csv-and-zip-files.mp4", durationLabel: "1 min 53 s" }),
      L(8, "common-template-mistakes", "Common Template Mistakes", { contentDir: "ch02/08-common-template-mistakes", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792512011/ltv-fbdi-and-adfdi/common-template-mistakes.mp4", durationLabel: "1 min 49 s" }),
      L(9, "loading-suppliers-with-fbdi", "Loading Suppliers with FBDI", { contentDir: "ch02/09-loading-suppliers-with-fbdi", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792512720/ltv-fbdi-and-adfdi/loading-suppliers-with-fbdi.mp4", durationLabel: "1 min 51 s" }),
    ],
  },
  {
    n: 3,
    title: "Running Imports",
    lessons: [
      L(10, "uploading-files-and-loading-to-interface-tables", "Uploading Files and Loading to Interface Tables", { contentDir: "ch03/10-uploading-files-and-loading-to-interface-tables", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792513373/ltv-fbdi-and-adfdi/uploading-files-and-loading-to-interface-tables.mp4", durationLabel: "1 min 47 s" }),
      L(11, "running-import-processes", "Running Import Processes", { contentDir: "ch03/11-running-import-processes", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792514096/ltv-fbdi-and-adfdi/running-import-processes.mp4", durationLabel: "1 min 47 s" }),
      L(12, "scheduled-processes-and-monitoring-imports", "Scheduled Processes and Monitoring Imports", { contentDir: "ch03/12-scheduled-processes-and-monitoring-imports", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792514733/ltv-fbdi-and-adfdi/scheduled-processes-and-monitoring-imports.mp4", durationLabel: "1 min 40 s" }),
      L(13, "import-reports-and-logs", "Import Reports and Logs", { contentDir: "ch03/13-import-reports-and-logs", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792515433/ltv-fbdi-and-adfdi/import-reports-and-logs.mp4", durationLabel: "1 min 44 s" }),
      L(14, "interface-table-review", "Interface Table Review", { contentDir: "ch03/14-interface-table-review", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792516212/ltv-fbdi-and-adfdi/interface-table-review.mp4", durationLabel: "1 min 52 s" }),
    ],
  },
  {
    n: 4,
    title: "Financials FBDI Imports",
    lessons: [
      L(15, "importing-journals", "Importing Journals", { contentDir: "ch04/15-importing-journals", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792516905/ltv-fbdi-and-adfdi/importing-journals.mp4", durationLabel: "1 min 43 s" }),
      L(16, "importing-payables-invoices", "Importing Payables Invoices", { contentDir: "ch04/16-importing-payables-invoices", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792517672/ltv-fbdi-and-adfdi/importing-payables-invoices.mp4", durationLabel: "2 min 2 s" }),
      L(17, "importing-receivables-transactions-with-autoinvoice", "Importing Receivables Transactions with AutoInvoice", { contentDir: "ch04/17-importing-receivables-transactions-with-autoinvoice", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792527446/ltv-fbdi-and-adfdi/importing-receivables-transactions-with-autoinvoice.mp4", durationLabel: "1 min 49 s" }),
      L(18, "importing-fixed-assets-additions", "Importing Fixed Assets Additions", { contentDir: "ch04/18-importing-fixed-assets-additions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792518987/ltv-fbdi-and-adfdi/importing-fixed-assets-additions.mp4", durationLabel: "1 min 51 s" }),
      L(19, "importing-bank-statements", "Importing Bank Statements", { contentDir: "ch04/19-importing-bank-statements", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792519753/ltv-fbdi-and-adfdi/importing-bank-statements.mp4", durationLabel: "1 min 51 s" }),
    ],
  },
  {
    n: 5,
    title: "Validation and Failed Imports",
    lessons: [
      L(20, "validation-errors-and-rejected-rows", "Validation Errors and Rejected Rows", { contentDir: "ch05/20-validation-errors-and-rejected-rows", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792520545/ltv-fbdi-and-adfdi/validation-errors-and-rejected-rows.mp4", durationLabel: "1 min 59 s" }),
      L(21, "correcting-and-re-running-failed-imports", "Correcting and Re-Running Failed Imports", { contentDir: "ch05/21-correcting-and-re-running-failed-imports", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792521229/ltv-fbdi-and-adfdi/correcting-and-re-running-failed-imports.mp4", durationLabel: "1 min 40 s" }),
      L(22, "purging-interface-data", "Purging Interface Data", { contentDir: "ch05/22-purging-interface-data", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792521978/ltv-fbdi-and-adfdi/purging-interface-data.mp4", durationLabel: "1 min 44 s" }),
      L(23, "fbdi-troubleshooting-practice", "FBDI Troubleshooting Practice", { contentDir: "ch05/23-fbdi-troubleshooting-practice", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792522767/ltv-fbdi-and-adfdi/fbdi-troubleshooting-practice.mp4", durationLabel: "2 min 13 s" }),
    ],
  },
  {
    n: 6,
    title: "ADFdi and Spreadsheet Uploads",
    lessons: [
      L(24, "adfdi-overview-and-setup", "ADFdi Overview and Setup", { contentDir: "ch06/24-adfdi-overview-and-setup", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792523555/ltv-fbdi-and-adfdi/adfdi-overview-and-setup.mp4", durationLabel: "1 min 58 s" }),
      L(25, "uploading-journals-with-adfdi", "Uploading Journals with ADFdi", { contentDir: "ch06/25-uploading-journals-with-adfdi", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792524255/ltv-fbdi-and-adfdi/uploading-journals-with-adfdi.mp4", durationLabel: "1 min 42 s" }),
      L(26, "uploading-payables-invoices-with-adfdi", "Uploading Payables Invoices with ADFdi", { contentDir: "ch06/26-uploading-payables-invoices-with-adfdi", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792525007/ltv-fbdi-and-adfdi/uploading-payables-invoices-with-adfdi.mp4", durationLabel: "1 min 52 s" }),
      L(27, "adfdi-errors-and-troubleshooting", "ADFdi Errors and Troubleshooting", { contentDir: "ch06/27-adfdi-errors-and-troubleshooting", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792525766/ltv-fbdi-and-adfdi/adfdi-errors-and-troubleshooting.mp4", durationLabel: "1 min 54 s" }),
      L(28, "choosing-fbdi-vs-adfdi-vs-manual-entry", "Choosing FBDI vs. ADFdi vs. Manual Entry", { contentDir: "ch06/28-choosing-fbdi-vs-adfdi-vs-manual-entry", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792526661/ltv-fbdi-and-adfdi/choosing-fbdi-vs-adfdi-vs-manual-entry.mp4", durationLabel: "2 min 21 s" }),
    ],
  },
];
