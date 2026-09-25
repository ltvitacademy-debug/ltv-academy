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
      L(1, "report-types-overview", "Report Types, Overview", { contentDir: "ch01/01-report-types-overview" }),
      L(2, "tabular-reports", "Tabular Reports", { contentDir: "ch01/02-tabular-reports" }),
      L(3, "summary-reports", "Summary Reports", { contentDir: "ch01/03-summary-reports" }),
      L(4, "matrix-reports", "Matrix Reports", { contentDir: "ch01/04-matrix-reports" }),
      L(5, "joined-reports", "Joined Reports", { contentDir: "ch01/05-joined-reports" }),
    ],
  },
  {
    n: 2,
    title: "Filtering & Organizing Reports",
    lessons: [
      L(6, "standard-filters", "Standard Filters", { contentDir: "ch02/06-standard-filters" }),
      L(7, "cross-filters", "Cross Filters", { contentDir: "ch02/07-cross-filters" }),
      L(8, "bucketing", "Bucketing", { contentDir: "ch02/08-bucketing" }),
      L(9, "filter-logic", "Filter Logic", { contentDir: "ch02/09-filter-logic" }),
      L(10, "grouping-and-subtotals", "Grouping & Subtotals", { contentDir: "ch02/10-grouping-and-subtotals" }),
    ],
  },
  {
    n: 3,
    title: "Formulas in Reports",
    lessons: [
      L(11, "summary-formulas", "Summary Formulas", { contentDir: "ch03/11-summary-formulas" }),
      L(12, "row-level-formulas", "Row-Level Formulas", { contentDir: "ch03/12-row-level-formulas" }),
      L(13, "formula-functions-for-analysts", "Formula Functions for Analysts", { contentDir: "ch03/13-formula-functions-for-analysts" }),
      L(14, "common-formula-patterns", "Common Formula Patterns", { contentDir: "ch03/14-common-formula-patterns" }),
    ],
  },
  {
    n: 4,
    title: "Report Charts & Visualization",
    lessons: [
      L(15, "report-charts", "Report Charts", { contentDir: "ch04/15-report-charts" }),
      L(16, "chart-types-in-salesforce", "Chart Types in Salesforce", { contentDir: "ch04/16-chart-types-in-salesforce" }),
      L(17, "formatting-for-readability", "Formatting for Readability", { contentDir: "ch04/17-formatting-for-readability" }),
    ],
  },
  {
    n: 5,
    title: "Salesforce Dashboards",
    lessons: [
      L(18, "dashboard-components", "Dashboard Components", { contentDir: "ch05/18-dashboard-components" }),
      L(19, "dashboard-filters", "Dashboard Filters", { contentDir: "ch05/19-dashboard-filters" }),
      L(20, "dynamic-dashboards", "Dynamic Dashboards", { contentDir: "ch05/20-dynamic-dashboards" }),
      L(21, "scheduling-and-subscriptions", "Scheduling & Subscriptions", { contentDir: "ch05/21-scheduling-and-subscriptions" }),
      L(22, "dashboard-layout-best-practices", "Dashboard Layout Best Practices", { contentDir: "ch05/22-dashboard-layout-best-practices" }),
      L(23, "mobile-dashboards", "Mobile Dashboards", { contentDir: "ch05/23-mobile-dashboards" }),
    ],
  },
  {
    n: 6,
    title: "Sales Analytics",
    lessons: [
      L(24, "sales-pipeline-analysis", "Sales Pipeline Analysis", { contentDir: "ch06/24-sales-pipeline-analysis" }),
      L(25, "forecast-analysis", "Forecast Analysis", { contentDir: "ch06/25-forecast-analysis" }),
      L(26, "lead-conversion-analysis", "Lead Conversion Analysis", { contentDir: "ch06/26-lead-conversion-analysis" }),
      L(27, "opportunity-analysis", "Opportunity Analysis", { contentDir: "ch06/27-opportunity-analysis" }),
      L(28, "win-loss-analysis", "Win/Loss Analysis", { contentDir: "ch06/28-win-loss-analysis" }),
    ],
  },
  {
    n: 7,
    title: "Service & Campaign Analytics",
    lessons: [
      L(29, "customer-service-analytics", "Customer/Service Analytics", { contentDir: "ch07/29-customer-service-analytics" }),
      L(30, "case-analytics", "Case Analytics", { contentDir: "ch07/30-case-analytics" }),
      L(31, "campaign-analysis", "Campaign Analysis", { contentDir: "ch07/31-campaign-analysis" }),
      L(32, "roi-reporting", "ROI Reporting", { contentDir: "ch07/32-roi-reporting" }),
    ],
  },
  {
    n: 8,
    title: "When Salesforce Reporting Is (and Isn't) Enough",
    lessons: [
      L(33, "the-limits-of-native-reporting", "The Limits of Native Reporting", { contentDir: "ch08/33-the-limits-of-native-reporting" }),
      L(34, "deciding-when-to-go-external", "Deciding When to Go External", { contentDir: "ch08/34-deciding-when-to-go-external" }),
    ],
  },
  {
    n: 9,
    title: "Capstone",
    lessons: [
      L(35, "capstone-kickoff", "Capstone Kickoff", { contentDir: "ch09/35-capstone-kickoff" }),
      L(36, "capstone-build-a-sales-dashboard", "Capstone: Build a Sales Dashboard", { contentDir: "ch09/36-capstone-build-a-sales-dashboard" }),
      L(37, "capstone-build-a-service-dashboard", "Capstone: Build a Service Dashboard", { contentDir: "ch09/37-capstone-build-a-service-dashboard" }),
      L(38, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch09/38-capstone-wrap-up" }),
    ],
  },
];
