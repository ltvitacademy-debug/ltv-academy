// The Oracle Financial Reporting course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Section 05. Reporting tools in Oracle Fusion Cloud Financials.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/oracle-financial-reporting/
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

export const ORACLE_FINANCIAL_REPORTING_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Reporting Overview",
    lessons: [
      L(1, "financial-reporting-in-oracle-fusion", "Financial Reporting in Oracle Fusion"),
      L(2, "the-reports-and-analytics-pane", "The Reports and Analytics Pane"),
      L(3, "choosing-the-right-reporting-tool", "Choosing the Right Reporting Tool"),
      L(4, "reporting-security-and-data-access", "Reporting Security and Data Access"),
    ],
  },
  {
    n: 2,
    title: "Financial Reporting Center",
    lessons: [
      L(5, "financial-reporting-center-tour", "Financial Reporting Center Tour"),
      L(6, "running-seeded-financial-reports", "Running Seeded Financial Reports"),
      L(7, "account-groups", "Account Groups"),
      L(8, "financial-report-studio-basics", "Financial Report Studio Basics"),
      L(9, "building-a-simple-financial-report", "Building a Simple Financial Report"),
    ],
  },
  {
    n: 3,
    title: "OTBI Analyses and Dashboards",
    lessons: [
      L(10, "otbi-and-subject-areas", "OTBI and Subject Areas"),
      L(11, "creating-an-analysis", "Creating an Analysis"),
      L(12, "filters-prompts-and-views", "Filters, Prompts and Views"),
      L(13, "building-dashboards", "Building Dashboards"),
      L(14, "scheduling-and-sharing-analyses", "Scheduling and Sharing Analyses"),
    ],
  },
  {
    n: 4,
    title: "BI Publisher",
    lessons: [
      L(15, "bi-publisher-overview", "BI Publisher Overview"),
      L(16, "data-models", "Data Models"),
      L(17, "report-templates", "Report Templates"),
      L(18, "running-and-scheduling-bi-publisher-reports", "Running and Scheduling BI Publisher Reports"),
      L(19, "common-financial-bi-publisher-reports", "Common Financial BI Publisher Reports"),
    ],
  },
  {
    n: 5,
    title: "Smart View and Excel Reporting",
    lessons: [
      L(20, "smart-view-setup", "Smart View Setup"),
      L(21, "ad-hoc-analysis-with-smart-view", "Ad Hoc Analysis with Smart View"),
      L(22, "report-packages-and-templates", "Report Packages and Templates"),
      L(23, "refreshing-and-distributing-reports", "Refreshing and Distributing Reports"),
    ],
  },
  {
    n: 6,
    title: "Financial and Operational Reports",
    lessons: [
      L(24, "financial-statements-income-statement-and-balance-sheet", "Financial Statements: Income Statement and Balance Sheet"),
      L(25, "trial-balance-and-account-analysis-reports", "Trial Balance and Account Analysis Reports"),
      L(26, "payables-reports-aging-and-payments", "Payables Reports: Aging and Payments"),
      L(27, "receivables-reports-aging-and-collections", "Receivables Reports: Aging and Collections"),
      L(28, "fixed-assets-and-cash-management-reports", "Fixed Assets and Cash Management Reports"),
      L(29, "month-end-reporting-package", "Month-End Reporting Package"),
    ],
  },
];
