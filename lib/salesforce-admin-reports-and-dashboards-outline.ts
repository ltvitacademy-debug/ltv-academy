// The Reports & Dashboards course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Part of the Salesforce Technical Architect career path.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/salesforce-admin-reports-and-dashboards/
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

export const SFTA_SALESFORCE_ADMIN_REPORTS_AND_DASHBOARDS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Reports",
    lessons: [
      L(1, "report-types", "Report Types", { contentDir: "ch01/01-report-types", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792533665/ltv-salesforce-admin-reports-and-dashboards/01-report-types.mp4", durationLabel: "1 min 53 s" }),
      L(2, "creating-a-report", "Creating a Report", { contentDir: "ch01/02-creating-a-report", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792533809/ltv-salesforce-admin-reports-and-dashboards/02-creating-a-report.mp4", durationLabel: "1 min 37 s" }),
      L(3, "report-filters", "Report Filters", { contentDir: "ch01/03-report-filters", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792533944/ltv-salesforce-admin-reports-and-dashboards/03-report-filters.mp4", durationLabel: "1 min 41 s" }),
      L(4, "grouping-and-summary-reports", "Grouping and Summary Reports", { contentDir: "ch01/04-grouping-and-summary-reports", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792534060/ltv-salesforce-admin-reports-and-dashboards/04-grouping-and-summary-reports.mp4", durationLabel: "1 min 35 s" }),
      L(5, "matrix-reports", "Matrix Reports", { contentDir: "ch01/05-matrix-reports", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792534160/ltv-salesforce-admin-reports-and-dashboards/05-matrix-reports.mp4", durationLabel: "1 min 29 s" }),
      L(6, "joined-reports", "Joined Reports", { contentDir: "ch01/06-joined-reports", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792534279/ltv-salesforce-admin-reports-and-dashboards/06-joined-reports.mp4", durationLabel: "1 min 45 s" }),
      L(7, "formulas-in-reports", "Formulas in Reports", { contentDir: "ch01/07-formulas-in-reports", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792534407/ltv-salesforce-admin-reports-and-dashboards/07-formulas-in-reports.mp4", durationLabel: "1 min 53 s" }),
      L(8, "bucketing", "Bucketing", { contentDir: "ch01/08-bucketing", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792534500/ltv-salesforce-admin-reports-and-dashboards/08-bucketing.mp4", durationLabel: "1 min 36 s" }),
    ],
  },
  {
    n: 2,
    title: "Report Management",
    lessons: [
      L(9, "custom-report-types", "Custom Report Types", { contentDir: "ch02/09-custom-report-types", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792600705/ltv-salesforce-admin-reports-and-dashboards/09-custom-report-types.mp4", durationLabel: "1 min 53 s" }),
      L(10, "report-folders-and-sharing", "Report Folders and Sharing", { contentDir: "ch02/10-report-folders-and-sharing", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792534617/ltv-salesforce-admin-reports-and-dashboards/10-report-folders-and-sharing.mp4", durationLabel: "1 min 49 s" }),
      L(11, "scheduling-and-subscriptions", "Scheduling and Subscriptions", { contentDir: "ch02/11-scheduling-and-subscriptions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792534708/ltv-salesforce-admin-reports-and-dashboards/11-scheduling-and-subscriptions.mp4", durationLabel: "1 min 41 s" }),
      L(12, "exporting-reports", "Exporting Reports", { contentDir: "ch02/12-exporting-reports", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792534784/ltv-salesforce-admin-reports-and-dashboards/12-exporting-reports.mp4", durationLabel: "1 min 30 s" }),
      L(13, "report-limits-and-performance", "Report Limits and Performance", { contentDir: "ch02/13-report-limits-and-performance", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792534888/ltv-salesforce-admin-reports-and-dashboards/13-report-limits-and-performance.mp4", durationLabel: "1 min 53 s" }),
    ],
  },
  {
    n: 3,
    title: "Dashboards",
    lessons: [
      L(14, "dashboards", "Dashboards", { contentDir: "ch03/14-dashboards", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792534958/ltv-salesforce-admin-reports-and-dashboards/14-dashboards.mp4", durationLabel: "1 min 15 s" }),
      L(15, "dashboard-components-and-charts", "Dashboard Components and Charts", { contentDir: "ch03/15-dashboard-components-and-charts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792535042/ltv-salesforce-admin-reports-and-dashboards/15-dashboard-components-and-charts.mp4", durationLabel: "1 min 33 s" }),
      L(16, "dashboard-filters-and-sharing", "Dashboard Filters and Sharing", { contentDir: "ch03/16-dashboard-filters-and-sharing", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792535109/ltv-salesforce-admin-reports-and-dashboards/16-dashboard-filters-and-sharing.mp4", durationLabel: "1 min 13 s" }),
      L(17, "dynamic-dashboards", "Dynamic Dashboards", { contentDir: "ch03/17-dynamic-dashboards", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792535191/ltv-salesforce-admin-reports-and-dashboards/17-dynamic-dashboards.mp4", durationLabel: "1 min 29 s" }),
      L(18, "dashboard-design-best-practices", "Dashboard Design Best Practices", { contentDir: "ch03/18-dashboard-design-best-practices", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792535264/ltv-salesforce-admin-reports-and-dashboards/18-dashboard-design-best-practices.mp4", durationLabel: "1 min 22 s" }),
    ],
  },
  {
    n: 4,
    title: "Business Analytics",
    lessons: [
      L(19, "sales-pipeline-reporting", "Sales Pipeline Reporting", { contentDir: "ch04/19-sales-pipeline-reporting", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792535353/ltv-salesforce-admin-reports-and-dashboards/19-sales-pipeline-reporting.mp4", durationLabel: "1 min 42 s" }),
      L(20, "service-performance-reporting", "Service Performance Reporting", { contentDir: "ch04/20-service-performance-reporting", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792535445/ltv-salesforce-admin-reports-and-dashboards/20-service-performance-reporting.mp4", durationLabel: "1 min 45 s" }),
      L(21, "business-analytics-case-study", "Business Analytics Case Study", { contentDir: "ch04/21-business-analytics-case-study", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792535546/ltv-salesforce-admin-reports-and-dashboards/21-business-analytics-case-study.mp4", durationLabel: "1 min 49 s" }),
      L(22, "reports-and-dashboards-practice-lab", "Reports and Dashboards Practice Lab", { contentDir: "ch04/22-reports-and-dashboards-practice-lab", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792535630/ltv-salesforce-admin-reports-and-dashboards/22-reports-and-dashboards-practice-lab.mp4", durationLabel: "1 min 35 s" }),
    ],
  },
];
