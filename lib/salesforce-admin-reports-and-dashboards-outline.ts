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
      L(1, "report-types", "Report Types"),
      L(2, "creating-a-report", "Creating a Report"),
      L(3, "report-filters", "Report Filters"),
      L(4, "grouping-and-summary-reports", "Grouping and Summary Reports"),
      L(5, "matrix-reports", "Matrix Reports"),
      L(6, "joined-reports", "Joined Reports"),
      L(7, "formulas-in-reports", "Formulas in Reports"),
      L(8, "bucketing", "Bucketing"),
    ],
  },
  {
    n: 2,
    title: "Report Management",
    lessons: [
      L(9, "custom-report-types", "Custom Report Types"),
      L(10, "report-folders-and-sharing", "Report Folders and Sharing"),
      L(11, "scheduling-and-subscriptions", "Scheduling and Subscriptions"),
      L(12, "exporting-reports", "Exporting Reports"),
      L(13, "report-limits-and-performance", "Report Limits and Performance"),
    ],
  },
  {
    n: 3,
    title: "Dashboards",
    lessons: [
      L(14, "dashboards", "Dashboards"),
      L(15, "dashboard-components-and-charts", "Dashboard Components and Charts"),
      L(16, "dashboard-filters-and-sharing", "Dashboard Filters and Sharing"),
      L(17, "dynamic-dashboards", "Dynamic Dashboards"),
      L(18, "dashboard-design-best-practices", "Dashboard Design Best Practices"),
    ],
  },
  {
    n: 4,
    title: "Business Analytics",
    lessons: [
      L(19, "sales-pipeline-reporting", "Sales Pipeline Reporting"),
      L(20, "service-performance-reporting", "Service Performance Reporting"),
      L(21, "business-analytics-case-study", "Business Analytics Case Study"),
      L(22, "reports-and-dashboards-practice-lab", "Reports and Dashboards Practice Lab"),
    ],
  },
];
