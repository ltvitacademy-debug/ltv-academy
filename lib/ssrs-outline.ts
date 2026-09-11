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
      L(2, "report-server-architecture", "Report Server Architecture", { contentDir: "ch01/02-report-server-architecture" }),
      L(3, "report-builder-vs-ssdt", "Report Builder vs. SSDT/Visual Studio", { contentDir: "ch01/03-report-builder-vs-ssdt" }),
      L(4, "setting-up-a-report-project", "Setting Up a Report Project", { contentDir: "ch01/04-setting-up-a-report-project" }),
      L(5, "deploying-to-report-server", "Deploying to Report Server", { contentDir: "ch01/05-deploying-to-report-server" }),
    ],
  },
  {
    n: 2,
    title: "Building Reports",
    lessons: [
      L(6, "datasets-and-data-sources", "Datasets & Data Sources", { contentDir: "ch02/06-datasets-and-data-sources" }),
      L(7, "the-report-design-surface", "The Report Design Surface", { contentDir: "ch02/07-the-report-design-surface" }),
      L(8, "tables-and-lists", "Tables & Lists", { contentDir: "ch02/08-tables-and-lists" }),
      L(9, "matrices", "Matrices", { contentDir: "ch02/09-matrices" }),
      L(10, "grouping-and-sorting", "Grouping & Sorting", { contentDir: "ch02/10-grouping-and-sorting" }),
      L(11, "report-layout-best-practices", "Report Layout Best Practices", { contentDir: "ch02/11-report-layout-best-practices" }),
    ],
  },
  {
    n: 3,
    title: "Parameters",
    lessons: [
      L(12, "report-parameters", "Report Parameters", { contentDir: "ch03/12-report-parameters" }),
      L(13, "cascading-parameters", "Cascading Parameters", { contentDir: "ch03/13-cascading-parameters" }),
      L(14, "default-values", "Default Values", { contentDir: "ch03/14-default-values" }),
      L(15, "multi-value-parameters", "Multi-Value Parameters", { contentDir: "ch03/15-multi-value-parameters" }),
      L(16, "parameter-driven-datasets", "Parameter-Driven Datasets", { contentDir: "ch03/16-parameter-driven-datasets" }),
    ],
  },
  {
    n: 4,
    title: "Expressions & Formatting",
    lessons: [
      L(17, "the-expression-editor", "The Expression Editor", { contentDir: "ch04/17-the-expression-editor" }),
      L(18, "common-expression-patterns", "Common Expression Patterns", { contentDir: "ch04/18-common-expression-patterns" }),
      L(19, "conditional-formatting", "Conditional Formatting", { contentDir: "ch04/19-conditional-formatting" }),
      L(20, "text-box-formatting", "Text Box Formatting", { contentDir: "ch04/20-text-box-formatting" }),
      L(21, "formatting-numbers-dates-currency", "Formatting Numbers, Dates & Currency", { contentDir: "ch04/21-formatting-numbers-dates-currency" }),
    ],
  },
  {
    n: 5,
    title: "Charts & Visual Elements",
    lessons: [
      L(22, "charts-in-ssrs", "Charts in SSRS", { contentDir: "ch05/22-charts-in-ssrs" }),
      L(23, "gauges", "Gauges", { contentDir: "ch05/23-gauges" }),
      L(24, "indicators", "Indicators", { contentDir: "ch05/24-indicators" }),
      L(25, "sparklines", "Sparklines", { contentDir: "ch05/25-sparklines" }),
    ],
  },
  {
    n: 6,
    title: "Drilldowns & Navigation",
    lessons: [
      L(26, "drilldown-reports", "Drilldown Reports", { contentDir: "ch06/26-drilldown-reports" }),
      L(27, "drillthrough-reports", "Drillthrough Reports", { contentDir: "ch06/27-drillthrough-reports" }),
      L(28, "subreports", "Subreports", { contentDir: "ch06/28-subreports" }),
      L(29, "bookmarks-and-document-maps", "Bookmarks & Document Maps", { contentDir: "ch06/29-bookmarks-and-document-maps" }),
    ],
  },
  {
    n: 7,
    title: "Subscriptions & Delivery",
    lessons: [
      L(30, "standard-subscriptions", "Standard Subscriptions", { contentDir: "ch07/30-standard-subscriptions" }),
      L(31, "data-driven-subscriptions", "Data-Driven Subscriptions", { contentDir: "ch07/31-data-driven-subscriptions" }),
      L(32, "delivery-to-email-and-file-share", "Delivery to Email & File Share", { contentDir: "ch07/32-delivery-to-email-and-file-share" }),
      L(33, "subscription-scheduling", "Subscription Scheduling", { contentDir: "ch07/33-subscription-scheduling" }),
    ],
  },
  {
    n: 8,
    title: "Deployment & Administration",
    lessons: [
      L(34, "report-server-administration", "Report Server Administration", { contentDir: "ch08/34-report-server-administration" }),
      L(35, "security-and-role-assignments", "Security & Role Assignments", { contentDir: "ch08/35-security-and-role-assignments" }),
      L(36, "report-caching-and-snapshots", "Report Caching & Snapshots", { contentDir: "ch08/36-report-caching-and-snapshots" }),
      L(37, "performance-considerations", "Performance Considerations", { contentDir: "ch08/37-performance-considerations" }),
    ],
  },
  {
    n: 9,
    title: "Capstone",
    lessons: [
      L(38, "capstone-kickoff", "Capstone Kickoff", { contentDir: "ch09/38-capstone-kickoff" }),
      L(39, "capstone-building-a-report-suite", "Capstone: Building a Real Paginated Report Suite", { contentDir: "ch09/39-capstone-building-a-report-suite" }),
      L(40, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch09/40-capstone-wrap-up" }),
    ],
  },
];
