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
      L(1, "ways-to-load-data-into-oracle-fusion", "Ways to Load Data into Oracle Fusion"),
      L(2, "file-based-data-import-overview", "File-Based Data Import Overview"),
      L(3, "the-fbdi-process-template-to-import", "The FBDI Process: Template to Import"),
      L(4, "universal-content-management-and-import-locations", "Universal Content Management and Import Locations"),
    ],
  },
  {
    n: 2,
    title: "FBDI Templates and Files",
    lessons: [
      L(5, "downloading-and-reading-fbdi-templates", "Downloading and Reading FBDI Templates"),
      L(6, "filling-in-templates-correctly", "Filling in Templates Correctly"),
      L(7, "generating-csv-and-zip-files", "Generating CSV and ZIP Files"),
      L(8, "common-template-mistakes", "Common Template Mistakes"),
      L(9, "loading-suppliers-with-fbdi", "Loading Suppliers with FBDI"),
    ],
  },
  {
    n: 3,
    title: "Running Imports",
    lessons: [
      L(10, "uploading-files-and-loading-to-interface-tables", "Uploading Files and Loading to Interface Tables"),
      L(11, "running-import-processes", "Running Import Processes"),
      L(12, "scheduled-processes-and-monitoring-imports", "Scheduled Processes and Monitoring Imports"),
      L(13, "import-reports-and-logs", "Import Reports and Logs"),
      L(14, "interface-table-review", "Interface Table Review"),
    ],
  },
  {
    n: 4,
    title: "Financials FBDI Imports",
    lessons: [
      L(15, "importing-journals", "Importing Journals"),
      L(16, "importing-payables-invoices", "Importing Payables Invoices"),
      L(17, "importing-receivables-transactions-with-autoinvoice", "Importing Receivables Transactions with AutoInvoice"),
      L(18, "importing-fixed-assets-additions", "Importing Fixed Assets Additions"),
      L(19, "importing-bank-statements", "Importing Bank Statements"),
    ],
  },
  {
    n: 5,
    title: "Validation and Failed Imports",
    lessons: [
      L(20, "validation-errors-and-rejected-rows", "Validation Errors and Rejected Rows"),
      L(21, "correcting-and-re-running-failed-imports", "Correcting and Re-Running Failed Imports"),
      L(22, "purging-interface-data", "Purging Interface Data"),
      L(23, "fbdi-troubleshooting-practice", "FBDI Troubleshooting Practice"),
    ],
  },
  {
    n: 6,
    title: "ADFdi and Spreadsheet Uploads",
    lessons: [
      L(24, "adfdi-overview-and-setup", "ADFdi Overview and Setup"),
      L(25, "uploading-journals-with-adfdi", "Uploading Journals with ADFdi"),
      L(26, "uploading-payables-invoices-with-adfdi", "Uploading Payables Invoices with ADFdi"),
      L(27, "adfdi-errors-and-troubleshooting", "ADFdi Errors and Troubleshooting"),
      L(28, "choosing-fbdi-vs-adfdi-vs-manual-entry", "Choosing FBDI vs. ADFdi vs. Manual Entry"),
    ],
  },
];
