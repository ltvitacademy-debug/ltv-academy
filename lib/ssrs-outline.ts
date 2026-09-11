// The full SSRS Development course outline. Only lessons with a
// contentDir + videoUrl are playable; everything else renders as "in
// production". Assumes T-SQL Development — this course teaches paginated
// reporting itself: report design, parameters, expressions, drilldowns,
// subscriptions, and deployment.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/ssrs/
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

export const SSRS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "SSRS Fundamentals",
    lessons: [
      L(1, "what-is-ssrs-and-paginated-reporting", "What Is SSRS & Paginated Reporting?", { contentDir: "ch01/01-what-is-ssrs-and-paginated-reporting" }),
      L(2, "report-server-architecture", "Report Server Architecture"),
      L(3, "report-builder-vs-ssdt", "Report Builder vs. SSDT/Visual Studio"),
      L(4, "setting-up-a-report-project", "Setting Up a Report Project"),
      L(5, "deploying-to-report-server", "Deploying to Report Server"),
    ],
  },
  {
    n: 2,
    title: "Building Reports",
    lessons: [
      L(6, "datasets-and-data-sources", "Datasets & Data Sources"),
      L(7, "the-report-design-surface", "The Report Design Surface"),
      L(8, "tables-and-lists", "Tables & Lists"),
      L(9, "matrices", "Matrices"),
      L(10, "grouping-and-sorting", "Grouping & Sorting"),
      L(11, "report-layout-best-practices", "Report Layout Best Practices"),
    ],
  },
  {
    n: 3,
    title: "Parameters",
    lessons: [
      L(12, "report-parameters", "Report Parameters"),
      L(13, "cascading-parameters", "Cascading Parameters"),
      L(14, "default-values", "Default Values"),
      L(15, "multi-value-parameters", "Multi-Value Parameters"),
      L(16, "parameter-driven-datasets", "Parameter-Driven Datasets"),
    ],
  },
  {
    n: 4,
    title: "Expressions & Formatting",
    lessons: [
      L(17, "the-expression-editor", "The Expression Editor"),
      L(18, "common-expression-patterns", "Common Expression Patterns"),
      L(19, "conditional-formatting", "Conditional Formatting"),
      L(20, "text-box-formatting", "Text Box Formatting"),
      L(21, "formatting-numbers-dates-currency", "Formatting Numbers, Dates & Currency"),
    ],
  },
  {
    n: 5,
    title: "Charts & Visual Elements",
    lessons: [
      L(22, "charts-in-ssrs", "Charts in SSRS"),
      L(23, "gauges", "Gauges"),
      L(24, "indicators", "Indicators"),
      L(25, "sparklines", "Sparklines"),
    ],
  },
  {
    n: 6,
    title: "Drilldowns & Navigation",
    lessons: [
      L(26, "drilldown-reports", "Drilldown Reports"),
      L(27, "drillthrough-reports", "Drillthrough Reports"),
      L(28, "subreports", "Subreports"),
      L(29, "bookmarks-and-document-maps", "Bookmarks & Document Maps"),
    ],
  },
  {
    n: 7,
    title: "Subscriptions & Delivery",
    lessons: [
      L(30, "standard-subscriptions", "Standard Subscriptions"),
      L(31, "data-driven-subscriptions", "Data-Driven Subscriptions"),
      L(32, "delivery-to-email-and-file-share", "Delivery to Email & File Share"),
      L(33, "subscription-scheduling", "Subscription Scheduling"),
    ],
  },
  {
    n: 8,
    title: "Deployment & Administration",
    lessons: [
      L(34, "report-server-administration", "Report Server Administration"),
      L(35, "security-and-role-assignments", "Security & Role Assignments"),
      L(36, "report-caching-and-snapshots", "Report Caching & Snapshots"),
      L(37, "performance-considerations", "Performance Considerations"),
    ],
  },
  {
    n: 9,
    title: "Capstone",
    lessons: [
      L(38, "capstone-kickoff", "Capstone Kickoff"),
      L(39, "capstone-building-a-report-suite", "Capstone: Building a Real Paginated Report Suite"),
      L(40, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation"),
    ],
  },
];
