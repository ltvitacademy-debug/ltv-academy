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
      L(2, "report-filters", "Report Filters"),
      L(3, "grouping-and-summary-reports", "Grouping and Summary Reports"),
      L(4, "matrix-reports", "Matrix Reports"),
      L(5, "joined-reports", "Joined Reports"),
    ],
  },
  {
    n: 2,
    title: "Dashboards and Analytics",
    lessons: [
      L(6, "dashboards", "Dashboards"),
      L(7, "dashboard-filters-and-sharing", "Dashboard Filters and Sharing"),
      L(8, "business-analytics-case-study", "Business Analytics Case Study"),
    ],
  },
];
