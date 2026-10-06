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
      L(1, "ways-to-load-data-into-oracle-fusion", "Ways to Load Data into Oracle Fusion", { contentDir: "ch01/01-ways-to-load-data-into-oracle-fusion" }),
      L(2, "file-based-data-import-overview", "File-Based Data Import Overview", { contentDir: "ch01/02-file-based-data-import-overview" }),
      L(3, "the-fbdi-process-template-to-import", "The FBDI Process: Template to Import", { contentDir: "ch01/03-the-fbdi-process-template-to-import" }),
      L(4, "universal-content-management-and-import-locations", "Universal Content Management and Import Locations", { contentDir: "ch01/04-universal-content-management-and-import-locations" }),
    ],
  },
  {
    n: 2,
    title: "FBDI Templates and Files",
    lessons: [
      L(5, "downloading-and-reading-fbdi-templates", "Downloading and Reading FBDI Templates", { contentDir: "ch02/05-downloading-and-reading-fbdi-templates" }),
      L(6, "filling-in-templates-correctly", "Filling in Templates Correctly", { contentDir: "ch02/06-filling-in-templates-correctly" }),
      L(7, "generating-csv-and-zip-files", "Generating CSV and ZIP Files", { contentDir: "ch02/07-generating-csv-and-zip-files" }),
      L(8, "common-template-mistakes", "Common Template Mistakes", { contentDir: "ch02/08-common-template-mistakes" }),
      L(9, "loading-suppliers-with-fbdi", "Loading Suppliers with FBDI", { contentDir: "ch02/09-loading-suppliers-with-fbdi" }),
    ],
  },
  {
    n: 3,
    title: "Running Imports",
    lessons: [
      L(10, "uploading-files-and-loading-to-interface-tables", "Uploading Files and Loading to Interface Tables", { contentDir: "ch03/10-uploading-files-and-loading-to-interface-tables" }),
      L(11, "running-import-processes", "Running Import Processes", { contentDir: "ch03/11-running-import-processes" }),
      L(12, "scheduled-processes-and-monitoring-imports", "Scheduled Processes and Monitoring Imports", { contentDir: "ch03/12-scheduled-processes-and-monitoring-imports" }),
      L(13, "import-reports-and-logs", "Import Reports and Logs", { contentDir: "ch03/13-import-reports-and-logs" }),
      L(14, "interface-table-review", "Interface Table Review", { contentDir: "ch03/14-interface-table-review" }),
    ],
  },
  {
    n: 4,
    title: "Financials FBDI Imports",
    lessons: [
      L(15, "importing-journals", "Importing Journals", { contentDir: "ch04/15-importing-journals" }),
      L(16, "importing-payables-invoices", "Importing Payables Invoices", { contentDir: "ch04/16-importing-payables-invoices" }),
      L(17, "importing-receivables-transactions-with-autoinvoice", "Importing Receivables Transactions with AutoInvoice", { contentDir: "ch04/17-importing-receivables-transactions-with-autoinvoice" }),
      L(18, "importing-fixed-assets-additions", "Importing Fixed Assets Additions", { contentDir: "ch04/18-importing-fixed-assets-additions" }),
      L(19, "importing-bank-statements", "Importing Bank Statements", { contentDir: "ch04/19-importing-bank-statements" }),
    ],
  },
  {
    n: 5,
    title: "Validation and Failed Imports",
    lessons: [
      L(20, "validation-errors-and-rejected-rows", "Validation Errors and Rejected Rows", { contentDir: "ch05/20-validation-errors-and-rejected-rows" }),
      L(21, "correcting-and-re-running-failed-imports", "Correcting and Re-Running Failed Imports", { contentDir: "ch05/21-correcting-and-re-running-failed-imports" }),
      L(22, "purging-interface-data", "Purging Interface Data", { contentDir: "ch05/22-purging-interface-data" }),
      L(23, "fbdi-troubleshooting-practice", "FBDI Troubleshooting Practice", { contentDir: "ch05/23-fbdi-troubleshooting-practice" }),
    ],
  },
  {
    n: 6,
    title: "ADFdi and Spreadsheet Uploads",
    lessons: [
      L(24, "adfdi-overview-and-setup", "ADFdi Overview and Setup", { contentDir: "ch06/24-adfdi-overview-and-setup" }),
      L(25, "uploading-journals-with-adfdi", "Uploading Journals with ADFdi", { contentDir: "ch06/25-uploading-journals-with-adfdi" }),
      L(26, "uploading-payables-invoices-with-adfdi", "Uploading Payables Invoices with ADFdi", { contentDir: "ch06/26-uploading-payables-invoices-with-adfdi" }),
      L(27, "adfdi-errors-and-troubleshooting", "ADFdi Errors and Troubleshooting", { contentDir: "ch06/27-adfdi-errors-and-troubleshooting" }),
      L(28, "choosing-fbdi-vs-adfdi-vs-manual-entry", "Choosing FBDI vs. ADFdi vs. Manual Entry", { contentDir: "ch06/28-choosing-fbdi-vs-adfdi-vs-manual-entry" }),
    ],
  },
];
