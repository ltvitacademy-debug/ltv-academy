// The full Salesforce Reports & Dashboards course outline. Only lessons
// with a contentDir + videoUrl are playable; everything else renders as
// "in production". Teaches native Salesforce analytics first, deliberately
// — before Tableau enters this path, students should know when Salesforce's
// own reporting is enough and when it isn't.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/salesforce-reports-dashboards/
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

export const SALESFORCE_REPORTS_DASHBOARDS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Report Fundamentals",
    lessons: [
      L(1, "report-types-overview", "Report Types, Overview"),
      L(2, "tabular-reports", "Tabular Reports"),
      L(3, "summary-reports", "Summary Reports"),
      L(4, "matrix-reports", "Matrix Reports"),
      L(5, "joined-reports", "Joined Reports"),
    ],
  },
  {
    n: 2,
    title: "Filtering & Organizing Reports",
    lessons: [
      L(6, "standard-filters", "Standard Filters"),
      L(7, "cross-filters", "Cross Filters"),
      L(8, "bucketing", "Bucketing"),
      L(9, "filter-logic", "Filter Logic"),
      L(10, "grouping-and-subtotals", "Grouping & Subtotals"),
    ],
  },
  {
    n: 3,
    title: "Formulas in Reports",
    lessons: [
      L(11, "summary-formulas", "Summary Formulas"),
      L(12, "row-level-formulas", "Row-Level Formulas"),
      L(13, "formula-functions-for-analysts", "Formula Functions for Analysts"),
      L(14, "common-formula-patterns", "Common Formula Patterns"),
    ],
  },
  {
    n: 4,
    title: "Report Charts & Visualization",
    lessons: [
      L(15, "report-charts", "Report Charts"),
      L(16, "chart-types-in-salesforce", "Chart Types in Salesforce"),
      L(17, "formatting-for-readability", "Formatting for Readability"),
    ],
  },
  {
    n: 5,
    title: "Salesforce Dashboards",
    lessons: [
      L(18, "dashboard-components", "Dashboard Components"),
      L(19, "dashboard-filters", "Dashboard Filters"),
      L(20, "dynamic-dashboards", "Dynamic Dashboards"),
      L(21, "scheduling-and-subscriptions", "Scheduling & Subscriptions"),
      L(22, "dashboard-layout-best-practices", "Dashboard Layout Best Practices"),
      L(23, "mobile-dashboards", "Mobile Dashboards"),
    ],
  },
  {
    n: 6,
    title: "Sales Analytics",
    lessons: [
      L(24, "sales-pipeline-analysis", "Sales Pipeline Analysis"),
      L(25, "forecast-analysis", "Forecast Analysis"),
      L(26, "lead-conversion-analysis", "Lead Conversion Analysis"),
      L(27, "opportunity-analysis", "Opportunity Analysis"),
      L(28, "win-loss-analysis", "Win/Loss Analysis"),
    ],
  },
  {
    n: 7,
    title: "Service & Campaign Analytics",
    lessons: [
      L(29, "customer-service-analytics", "Customer/Service Analytics"),
      L(30, "case-analytics", "Case Analytics"),
      L(31, "campaign-analysis", "Campaign Analysis"),
      L(32, "roi-reporting", "ROI Reporting"),
    ],
  },
  {
    n: 8,
    title: "When Salesforce Reporting Is (and Isn't) Enough",
    lessons: [
      L(33, "the-limits-of-native-reporting", "The Limits of Native Reporting"),
      L(34, "deciding-when-to-go-external", "Deciding When to Go External"),
    ],
  },
  {
    n: 9,
    title: "Capstone",
    lessons: [
      L(35, "capstone-kickoff", "Capstone Kickoff"),
      L(36, "capstone-build-a-sales-dashboard", "Capstone: Build a Sales Dashboard"),
      L(37, "capstone-build-a-service-dashboard", "Capstone: Build a Service Dashboard"),
      L(38, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation"),
    ],
  },
];
