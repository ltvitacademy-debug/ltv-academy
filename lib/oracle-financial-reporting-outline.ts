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
      L(1, "financial-reporting-in-oracle-fusion", "Financial Reporting in Oracle Fusion", { contentDir: "ch01/01-financial-reporting-in-oracle-fusion", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792624232/ltv-oracle-financial-reporting/financial-reporting-in-oracle-fusion.mp4", durationLabel: "1 min 60 s" }),
      L(2, "the-reports-and-analytics-pane", "The Reports and Analytics Pane", { contentDir: "ch01/02-the-reports-and-analytics-pane", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792624363/ltv-oracle-financial-reporting/the-reports-and-analytics-pane.mp4", durationLabel: "1 min 35 s" }),
      L(3, "choosing-the-right-reporting-tool", "Choosing the Right Reporting Tool", { contentDir: "ch01/03-choosing-the-right-reporting-tool", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792624516/ltv-oracle-financial-reporting/choosing-the-right-reporting-tool.mp4", durationLabel: "1 min 48 s" }),
      L(4, "reporting-security-and-data-access", "Reporting Security and Data Access", { contentDir: "ch01/04-reporting-security-and-data-access", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792624663/ltv-oracle-financial-reporting/reporting-security-and-data-access.mp4", durationLabel: "1 min 47 s" }),
    ],
  },
  {
    n: 2,
    title: "Financial Reporting Center",
    lessons: [
      L(5, "financial-reporting-center-tour", "Financial Reporting Center Tour", { contentDir: "ch02/05-financial-reporting-center-tour", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792624785/ltv-oracle-financial-reporting/financial-reporting-center-tour.mp4", durationLabel: "1 min 30 s" }),
      L(6, "running-seeded-financial-reports", "Running Seeded Financial Reports", { contentDir: "ch02/06-running-seeded-financial-reports", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792624907/ltv-oracle-financial-reporting/running-seeded-financial-reports.mp4", durationLabel: "1 min 29 s" }),
      L(7, "account-groups", "Account Groups", { contentDir: "ch02/07-account-groups", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792625030/ltv-oracle-financial-reporting/account-groups.mp4", durationLabel: "1 min 25 s" }),
      L(8, "financial-report-studio-basics", "Financial Report Studio Basics", { contentDir: "ch02/08-financial-report-studio-basics", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792625160/ltv-oracle-financial-reporting/financial-report-studio-basics.mp4", durationLabel: "1 min 34 s" }),
      L(9, "building-a-simple-financial-report", "Building a Simple Financial Report", { contentDir: "ch02/09-building-a-simple-financial-report", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792625304/ltv-oracle-financial-reporting/building-a-simple-financial-report.mp4", durationLabel: "1 min 44 s" }),
    ],
  },
  {
    n: 3,
    title: "OTBI Analyses and Dashboards",
    lessons: [
      L(10, "otbi-and-subject-areas", "OTBI and Subject Areas", { contentDir: "ch03/10-otbi-and-subject-areas", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792625449/ltv-oracle-financial-reporting/otbi-and-subject-areas.mp4", durationLabel: "1 min 46 s" }),
      L(11, "creating-an-analysis", "Creating an Analysis", { contentDir: "ch03/11-creating-an-analysis", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792625565/ltv-oracle-financial-reporting/creating-an-analysis.mp4", durationLabel: "1 min 36 s" }),
      L(12, "filters-prompts-and-views", "Filters, Prompts and Views", { contentDir: "ch03/12-filters-prompts-and-views", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792625694/ltv-oracle-financial-reporting/filters-prompts-and-views.mp4", durationLabel: "1 min 38 s" }),
      L(13, "building-dashboards", "Building Dashboards", { contentDir: "ch03/13-building-dashboards", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792625821/ltv-oracle-financial-reporting/building-dashboards.mp4", durationLabel: "1 min 36 s" }),
      L(14, "scheduling-and-sharing-analyses", "Scheduling and Sharing Analyses", { contentDir: "ch03/14-scheduling-and-sharing-analyses", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792625953/ltv-oracle-financial-reporting/scheduling-and-sharing-analyses.mp4", durationLabel: "1 min 39 s" }),
    ],
  },
  {
    n: 4,
    title: "BI Publisher",
    lessons: [
      L(15, "bi-publisher-overview", "BI Publisher Overview", { contentDir: "ch04/15-bi-publisher-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792626081/ltv-oracle-financial-reporting/bi-publisher-overview.mp4", durationLabel: "1 min 36 s" }),
      L(16, "data-models", "Data Models", { contentDir: "ch04/16-data-models", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792626213/ltv-oracle-financial-reporting/data-models.mp4", durationLabel: "1 min 40 s" }),
      L(17, "report-templates", "Report Templates", { contentDir: "ch04/17-report-templates", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792626343/ltv-oracle-financial-reporting/report-templates.mp4", durationLabel: "1 min 38 s" }),
      L(18, "running-and-scheduling-bi-publisher-reports", "Running and Scheduling BI Publisher Reports", { contentDir: "ch04/18-running-and-scheduling-bi-publisher-reports", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792626480/ltv-oracle-financial-reporting/running-and-scheduling-bi-publisher-reports.mp4", durationLabel: "1 min 37 s" }),
      L(19, "common-financial-bi-publisher-reports", "Common Financial BI Publisher Reports", { contentDir: "ch04/19-common-financial-bi-publisher-reports", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792626613/ltv-oracle-financial-reporting/common-financial-bi-publisher-reports.mp4", durationLabel: "1 min 42 s" }),
    ],
  },
  {
    n: 5,
    title: "Smart View and Excel Reporting",
    lessons: [
      L(20, "smart-view-setup", "Smart View Setup", { contentDir: "ch05/20-smart-view-setup", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792626742/ltv-oracle-financial-reporting/smart-view-setup.mp4", durationLabel: "1 min 28 s" }),
      L(21, "ad-hoc-analysis-with-smart-view", "Ad Hoc Analysis with Smart View", { contentDir: "ch05/21-ad-hoc-analysis-with-smart-view", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792626877/ltv-oracle-financial-reporting/ad-hoc-analysis-with-smart-view.mp4", durationLabel: "1 min 36 s" }),
      L(22, "report-packages-and-templates", "Report Packages and Templates", { contentDir: "ch05/22-report-packages-and-templates", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792627012/ltv-oracle-financial-reporting/report-packages-and-templates.mp4", durationLabel: "1 min 34 s" }),
      L(23, "refreshing-and-distributing-reports", "Refreshing and Distributing Reports", { contentDir: "ch05/23-refreshing-and-distributing-reports", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792627151/ltv-oracle-financial-reporting/refreshing-and-distributing-reports.mp4", durationLabel: "1 min 44 s" }),
    ],
  },
  {
    n: 6,
    title: "Financial and Operational Reports",
    lessons: [
      L(24, "financial-statements-income-statement-and-balance-sheet", "Financial Statements: Income Statement and Balance Sheet", { contentDir: "ch06/24-financial-statements-income-statement-and-balance-sheet", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792627262/ltv-oracle-financial-reporting/financial-statements-income-statement-and-balance-sheet.mp4", durationLabel: "1 min 37 s" }),
      L(25, "trial-balance-and-account-analysis-reports", "Trial Balance and Account Analysis Reports", { contentDir: "ch06/25-trial-balance-and-account-analysis-reports", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792627394/ltv-oracle-financial-reporting/trial-balance-and-account-analysis-reports.mp4", durationLabel: "1 min 35 s" }),
      L(26, "payables-reports-aging-and-payments", "Payables Reports: Aging and Payments", { contentDir: "ch06/26-payables-reports-aging-and-payments", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792627518/ltv-oracle-financial-reporting/payables-reports-aging-and-payments.mp4", durationLabel: "1 min 32 s" }),
      L(27, "receivables-reports-aging-and-collections", "Receivables Reports: Aging and Collections", { contentDir: "ch06/27-receivables-reports-aging-and-collections", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792627655/ltv-oracle-financial-reporting/receivables-reports-aging-and-collections.mp4", durationLabel: "1 min 36 s" }),
      L(28, "fixed-assets-and-cash-management-reports", "Fixed Assets and Cash Management Reports", { contentDir: "ch06/28-fixed-assets-and-cash-management-reports", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792627793/ltv-oracle-financial-reporting/fixed-assets-and-cash-management-reports.mp4", durationLabel: "1 min 34 s" }),
      L(29, "month-end-reporting-package", "Month-End Reporting Package", { contentDir: "ch06/29-month-end-reporting-package", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792627933/ltv-oracle-financial-reporting/month-end-reporting-package.mp4", durationLabel: "1 min 41 s" }),
    ],
  },
];
