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
      L(1, "financial-reporting-in-oracle-fusion", "Financial Reporting in Oracle Fusion", { contentDir: "ch01/01-financial-reporting-in-oracle-fusion" }),
      L(2, "the-reports-and-analytics-pane", "The Reports and Analytics Pane", { contentDir: "ch01/02-the-reports-and-analytics-pane" }),
      L(3, "choosing-the-right-reporting-tool", "Choosing the Right Reporting Tool", { contentDir: "ch01/03-choosing-the-right-reporting-tool" }),
      L(4, "reporting-security-and-data-access", "Reporting Security and Data Access", { contentDir: "ch01/04-reporting-security-and-data-access" }),
    ],
  },
  {
    n: 2,
    title: "Financial Reporting Center",
    lessons: [
      L(5, "financial-reporting-center-tour", "Financial Reporting Center Tour", { contentDir: "ch02/05-financial-reporting-center-tour" }),
      L(6, "running-seeded-financial-reports", "Running Seeded Financial Reports", { contentDir: "ch02/06-running-seeded-financial-reports" }),
      L(7, "account-groups", "Account Groups", { contentDir: "ch02/07-account-groups" }),
      L(8, "financial-report-studio-basics", "Financial Report Studio Basics", { contentDir: "ch02/08-financial-report-studio-basics" }),
      L(9, "building-a-simple-financial-report", "Building a Simple Financial Report", { contentDir: "ch02/09-building-a-simple-financial-report" }),
    ],
  },
  {
    n: 3,
    title: "OTBI Analyses and Dashboards",
    lessons: [
      L(10, "otbi-and-subject-areas", "OTBI and Subject Areas", { contentDir: "ch03/10-otbi-and-subject-areas" }),
      L(11, "creating-an-analysis", "Creating an Analysis", { contentDir: "ch03/11-creating-an-analysis" }),
      L(12, "filters-prompts-and-views", "Filters, Prompts and Views", { contentDir: "ch03/12-filters-prompts-and-views" }),
      L(13, "building-dashboards", "Building Dashboards", { contentDir: "ch03/13-building-dashboards" }),
      L(14, "scheduling-and-sharing-analyses", "Scheduling and Sharing Analyses", { contentDir: "ch03/14-scheduling-and-sharing-analyses" }),
    ],
  },
  {
    n: 4,
    title: "BI Publisher",
    lessons: [
      L(15, "bi-publisher-overview", "BI Publisher Overview", { contentDir: "ch04/15-bi-publisher-overview" }),
      L(16, "data-models", "Data Models", { contentDir: "ch04/16-data-models" }),
      L(17, "report-templates", "Report Templates", { contentDir: "ch04/17-report-templates" }),
      L(18, "running-and-scheduling-bi-publisher-reports", "Running and Scheduling BI Publisher Reports", { contentDir: "ch04/18-running-and-scheduling-bi-publisher-reports" }),
      L(19, "common-financial-bi-publisher-reports", "Common Financial BI Publisher Reports", { contentDir: "ch04/19-common-financial-bi-publisher-reports" }),
    ],
  },
  {
    n: 5,
    title: "Smart View and Excel Reporting",
    lessons: [
      L(20, "smart-view-setup", "Smart View Setup", { contentDir: "ch05/20-smart-view-setup" }),
      L(21, "ad-hoc-analysis-with-smart-view", "Ad Hoc Analysis with Smart View", { contentDir: "ch05/21-ad-hoc-analysis-with-smart-view" }),
      L(22, "report-packages-and-templates", "Report Packages and Templates", { contentDir: "ch05/22-report-packages-and-templates" }),
      L(23, "refreshing-and-distributing-reports", "Refreshing and Distributing Reports", { contentDir: "ch05/23-refreshing-and-distributing-reports" }),
    ],
  },
  {
    n: 6,
    title: "Financial and Operational Reports",
    lessons: [
      L(24, "financial-statements-income-statement-and-balance-sheet", "Financial Statements: Income Statement and Balance Sheet", { contentDir: "ch06/24-financial-statements-income-statement-and-balance-sheet" }),
      L(25, "trial-balance-and-account-analysis-reports", "Trial Balance and Account Analysis Reports", { contentDir: "ch06/25-trial-balance-and-account-analysis-reports" }),
      L(26, "payables-reports-aging-and-payments", "Payables Reports: Aging and Payments", { contentDir: "ch06/26-payables-reports-aging-and-payments" }),
      L(27, "receivables-reports-aging-and-collections", "Receivables Reports: Aging and Collections", { contentDir: "ch06/27-receivables-reports-aging-and-collections" }),
      L(28, "fixed-assets-and-cash-management-reports", "Fixed Assets and Cash Management Reports", { contentDir: "ch06/28-fixed-assets-and-cash-management-reports" }),
      L(29, "month-end-reporting-package", "Month-End Reporting Package", { contentDir: "ch06/29-month-end-reporting-package" }),
    ],
  },
];
