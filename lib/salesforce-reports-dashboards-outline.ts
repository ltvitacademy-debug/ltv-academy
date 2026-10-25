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
      L(1, "report-types-overview", "Report Types, Overview", { contentDir: "ch01/01-report-types-overview" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792599719/ltv-salesforce-reports-dashboards/report-types-overview.mp4", durationLabel: "1 min 35 s" }),
      L(2, "tabular-reports", "Tabular Reports", { contentDir: "ch01/02-tabular-reports" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792600039/ltv-salesforce-reports-dashboards/tabular-reports.mp4", durationLabel: "1 min 34 s" }),
      L(3, "summary-reports", "Summary Reports", { contentDir: "ch01/03-summary-reports" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792600464/ltv-salesforce-reports-dashboards/summary-reports.mp4", durationLabel: "1 min 40 s" }),
      L(4, "matrix-reports", "Matrix Reports", { contentDir: "ch01/04-matrix-reports" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792600920/ltv-salesforce-reports-dashboards/matrix-reports.mp4", durationLabel: "1 min 38 s" }),
      L(5, "joined-reports", "Joined Reports", { contentDir: "ch01/05-joined-reports" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792601309/ltv-salesforce-reports-dashboards/joined-reports.mp4", durationLabel: "1 min 34 s" }),
    ],
  },
  {
    n: 2,
    title: "Filtering & Organizing Reports",
    lessons: [
      L(6, "standard-filters", "Standard Filters", { contentDir: "ch02/06-standard-filters" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792601736/ltv-salesforce-reports-dashboards/standard-filters.mp4", durationLabel: "1 min 36 s" }),
      L(7, "cross-filters", "Cross Filters", { contentDir: "ch02/07-cross-filters" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792602154/ltv-salesforce-reports-dashboards/cross-filters.mp4", durationLabel: "1 min 35 s" }),
      L(8, "bucketing", "Bucketing", { contentDir: "ch02/08-bucketing" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792602564/ltv-salesforce-reports-dashboards/bucketing.mp4", durationLabel: "1 min 40 s" }),
      L(9, "filter-logic", "Filter Logic", { contentDir: "ch02/09-filter-logic" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792603045/ltv-salesforce-reports-dashboards/filter-logic.mp4", durationLabel: "1 min 39 s" }),
      L(10, "grouping-and-subtotals", "Grouping & Subtotals", { contentDir: "ch02/10-grouping-and-subtotals" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792603481/ltv-salesforce-reports-dashboards/grouping-and-subtotals.mp4", durationLabel: "1 min 36 s" }),
    ],
  },
  {
    n: 3,
    title: "Formulas in Reports",
    lessons: [
      L(11, "summary-formulas", "Summary Formulas", { contentDir: "ch03/11-summary-formulas" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792603968/ltv-salesforce-reports-dashboards/summary-formulas.mp4", durationLabel: "1 min 49 s" }),
      L(12, "row-level-formulas", "Row-Level Formulas", { contentDir: "ch03/12-row-level-formulas" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792604474/ltv-salesforce-reports-dashboards/row-level-formulas.mp4", durationLabel: "1 min 45 s" }),
      L(13, "formula-functions-for-analysts", "Formula Functions for Analysts", { contentDir: "ch03/13-formula-functions-for-analysts" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792604997/ltv-salesforce-reports-dashboards/formula-functions-for-analysts.mp4", durationLabel: "1 min 51 s" }),
      L(14, "common-formula-patterns", "Common Formula Patterns", { contentDir: "ch03/14-common-formula-patterns" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792605441/ltv-salesforce-reports-dashboards/common-formula-patterns.mp4", durationLabel: "1 min 40 s" }),
    ],
  },
  {
    n: 4,
    title: "Report Charts & Visualization",
    lessons: [
      L(15, "report-charts", "Report Charts", { contentDir: "ch04/15-report-charts" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792605896/ltv-salesforce-reports-dashboards/report-charts.mp4", durationLabel: "1 min 34 s" }),
      L(16, "chart-types-in-salesforce", "Chart Types in Salesforce", { contentDir: "ch04/16-chart-types-in-salesforce" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792606277/ltv-salesforce-reports-dashboards/chart-types-in-salesforce.mp4", durationLabel: "1 min 33 s" }),
      L(17, "formatting-for-readability", "Formatting for Readability", { contentDir: "ch04/17-formatting-for-readability" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792606756/ltv-salesforce-reports-dashboards/formatting-for-readability.mp4", durationLabel: "1 min 47 s" }),
    ],
  },
  {
    n: 5,
    title: "Salesforce Dashboards",
    lessons: [
      L(18, "dashboard-components", "Dashboard Components", { contentDir: "ch05/18-dashboard-components" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792607204/ltv-salesforce-reports-dashboards/dashboard-components.mp4", durationLabel: "1 min 36 s" }),
      L(19, "dashboard-filters", "Dashboard Filters", { contentDir: "ch05/19-dashboard-filters" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792607639/ltv-salesforce-reports-dashboards/dashboard-filters.mp4", durationLabel: "1 min 36 s" }),
      L(20, "dynamic-dashboards", "Dynamic Dashboards", { contentDir: "ch05/20-dynamic-dashboards" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792608074/ltv-salesforce-reports-dashboards/dynamic-dashboards.mp4", durationLabel: "1 min 41 s" }),
      L(21, "scheduling-and-subscriptions", "Scheduling & Subscriptions", { contentDir: "ch05/21-scheduling-and-subscriptions" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792608536/ltv-salesforce-reports-dashboards/scheduling-and-subscriptions.mp4", durationLabel: "1 min 45 s" }),
      L(22, "dashboard-layout-best-practices", "Dashboard Layout Best Practices", { contentDir: "ch05/22-dashboard-layout-best-practices" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792608998/ltv-salesforce-reports-dashboards/dashboard-layout-best-practices.mp4", durationLabel: "1 min 41 s" }),
      L(23, "mobile-dashboards", "Mobile Dashboards", { contentDir: "ch05/23-mobile-dashboards" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792609469/ltv-salesforce-reports-dashboards/mobile-dashboards.mp4", durationLabel: "1 min 40 s" }),
    ],
  },
  {
    n: 6,
    title: "Sales Analytics",
    lessons: [
      L(24, "sales-pipeline-analysis", "Sales Pipeline Analysis", { contentDir: "ch06/24-sales-pipeline-analysis" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792609951/ltv-salesforce-reports-dashboards/sales-pipeline-analysis.mp4", durationLabel: "1 min 45 s" }),
      L(25, "forecast-analysis", "Forecast Analysis", { contentDir: "ch06/25-forecast-analysis" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792610390/ltv-salesforce-reports-dashboards/forecast-analysis.mp4", durationLabel: "1 min 51 s" }),
      L(26, "lead-conversion-analysis", "Lead Conversion Analysis", { contentDir: "ch06/26-lead-conversion-analysis" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792610879/ltv-salesforce-reports-dashboards/lead-conversion-analysis.mp4", durationLabel: "1 min 50 s" }),
      L(27, "opportunity-analysis", "Opportunity Analysis", { contentDir: "ch06/27-opportunity-analysis" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792611626/ltv-salesforce-reports-dashboards/opportunity-analysis.mp4", durationLabel: "1 min 56 s" }),
      L(28, "win-loss-analysis", "Win/Loss Analysis", { contentDir: "ch06/28-win-loss-analysis" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792612205/ltv-salesforce-reports-dashboards/win-loss-analysis.mp4", durationLabel: "1 min 46 s" }),
    ],
  },
  {
    n: 7,
    title: "Service & Campaign Analytics",
    lessons: [
      L(29, "customer-service-analytics", "Customer/Service Analytics", { contentDir: "ch07/29-customer-service-analytics" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792612806/ltv-salesforce-reports-dashboards/customer-service-analytics.mp4", durationLabel: "1 min 45 s" }),
      L(30, "case-analytics", "Case Analytics", { contentDir: "ch07/30-case-analytics" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792613333/ltv-salesforce-reports-dashboards/case-analytics.mp4", durationLabel: "1 min 53 s" }),
      L(31, "campaign-analysis", "Campaign Analysis", { contentDir: "ch07/31-campaign-analysis" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792613785/ltv-salesforce-reports-dashboards/campaign-analysis.mp4", durationLabel: "1 min 42 s" }),
      L(32, "roi-reporting", "ROI Reporting", { contentDir: "ch07/32-roi-reporting" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792614160/ltv-salesforce-reports-dashboards/roi-reporting.mp4", durationLabel: "1 min 55 s" }),
    ],
  },
  {
    n: 8,
    title: "When Salesforce Reporting Is (and Isn't) Enough",
    lessons: [
      L(33, "the-limits-of-native-reporting", "The Limits of Native Reporting", { contentDir: "ch08/33-the-limits-of-native-reporting" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792614534/ltv-salesforce-reports-dashboards/the-limits-of-native-reporting.mp4", durationLabel: "1 min 47 s" }),
      L(34, "deciding-when-to-go-external", "Deciding When to Go External", { contentDir: "ch08/34-deciding-when-to-go-external" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792614897/ltv-salesforce-reports-dashboards/deciding-when-to-go-external.mp4", durationLabel: "1 min 52 s" }),
    ],
  },
  {
    n: 9,
    title: "Capstone",
    lessons: [
      L(35, "capstone-kickoff", "Capstone Kickoff", { contentDir: "ch09/35-capstone-kickoff" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792615293/ltv-salesforce-reports-dashboards/capstone-kickoff.mp4", durationLabel: "2 min 28 s" }),
      L(36, "capstone-build-a-sales-dashboard", "Capstone: Build a Sales Dashboard", { contentDir: "ch09/36-capstone-build-a-sales-dashboard" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792615641/ltv-salesforce-reports-dashboards/capstone-build-a-sales-dashboard.mp4", durationLabel: "2 min 38 s" }),
      L(37, "capstone-build-a-service-dashboard", "Capstone: Build a Service Dashboard", { contentDir: "ch09/37-capstone-build-a-service-dashboard" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792615983/ltv-salesforce-reports-dashboards/capstone-build-a-service-dashboard.mp4", durationLabel: "2 min 39 s" }),
      L(38, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch09/38-capstone-wrap-up" , videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792616232/ltv-salesforce-reports-dashboards/capstone-wrap-up.mp4", durationLabel: "2 min 43 s" }),
    ],
  },
];
