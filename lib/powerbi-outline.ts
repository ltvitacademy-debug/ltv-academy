// The full Power BI course outline. Only lessons with a contentDir + videoUrl
// are playable; everything else renders as "in production".

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/powerbi/
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

export const POWERBI_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Power BI Fundamentals",
    lessons: [
      L(1, "what-is-power-bi", "What Is Power BI?", { contentDir: "ch01/01-what-is-power-bi", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/what-is-power-bi.mp4", durationLabel: "3 min 11 s" }),
      L(2, "installing-power-bi-desktop", "Installing Power BI Desktop", { contentDir: "ch01/02-installing-power-bi-desktop", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/installing-power-bi-desktop.mp4", durationLabel: "2 min 19 s" }),
      L(3, "desktop-interface-tour", "Power BI Desktop Interface Tour", { contentDir: "ch01/03-desktop-interface-tour", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/desktop-interface-tour.mp4", durationLabel: "2 min 20 s" }),
      L(4, "your-first-report", "Your First Power BI Report", { contentDir: "ch01/04-your-first-report", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/your-first-report.mp4", durationLabel: "2 min 9 s" }),
      L(5, "the-power-bi-workflow", "The Power BI Workflow: Get → Transform → Model → Visualize → Publish", { contentDir: "ch01/05-power-bi-workflow", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/the-power-bi-workflow.mp4", durationLabel: "2 min 25 s" }),
    ],
  },
  {
    n: 2,
    title: "Connecting to Data",
    lessons: [
      L(6, "data-sources", "Understanding Power BI Data Sources", { contentDir: "ch02/06-data-sources", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/data-sources.mp4", durationLabel: "1 min 56 s" }),
      L(7, "connecting-to-excel", "Connecting to Excel", { contentDir: "ch02/07-connecting-to-excel", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/connecting-to-excel.mp4", durationLabel: "1 min 34 s" }),
      L(8, "connecting-to-csv", "Connecting to CSV/Text Files", { contentDir: "ch02/08-connecting-to-csv-text", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/connecting-to-csv.mp4", durationLabel: "1 min 44 s" }),
      L(9, "connecting-to-sql", "Connecting to SQL Databases", { contentDir: "ch02/09-connecting-to-sql", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/connecting-to-sql.mp4", durationLabel: "1 min 55 s" }),
      L(10, "web-json-rest", "Connecting to Web, JSON & REST API Data", { contentDir: "ch02/10-connecting-to-web-json-rest", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/web-json-rest.mp4", durationLabel: "2 min 1 s" }),
      L(11, "import-vs-directquery", "Import vs. DirectQuery", { contentDir: "ch02/11-import-vs-directquery", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/import-vs-directquery.mp4", durationLabel: "1 min 60 s" }),
    ],
  },
  {
    n: 3,
    title: "Power Query & Data Cleaning",
    lessons: [
      L(12, "power-query-editor", "Power Query Editor Explained", { contentDir: "ch03/12-power-query-editor", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/power-query-editor.mp4", durationLabel: "2 min 13 s" }),
      L(13, "changing-data-types", "Changing Data Types", { contentDir: "ch03/13-changing-data-types", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/changing-data-types.mp4", durationLabel: "1 min 40 s" }),
      L(14, "rows", "Removing, Filtering & Editing Rows", { contentDir: "ch03/14-rows", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/rows.mp4", durationLabel: "1 min 51 s" }),
      L(15, "replacing-values-errors", "Replacing Values and Handling Errors", { contentDir: "ch03/15-replacing-values-errors", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/replacing-values-errors.mp4", durationLabel: "1 min 46 s" }),
      L(16, "columns", "Splitting, Merging & Extracting Columns", { contentDir: "ch03/16-columns", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/columns.mp4", durationLabel: "1 min 42 s" }),
      L(17, "conditional-columns", "Conditional Columns & Columns From Examples", { contentDir: "ch03/17-conditional-columns", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/conditional-columns.mp4", durationLabel: "1 min 48 s" }),
      L(18, "pivot-unpivot", "Pivoting & Unpivoting", { contentDir: "ch03/18-pivot-unpivot", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/pivot-unpivot.mp4", durationLabel: "1 min 42 s" }),
      L(19, "group-by", "Group By & Aggregations", { contentDir: "ch03/19-group-by", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/group-by.mp4", durationLabel: "1 min 35 s" }),
      L(20, "merging-queries", "Merging Queries", { contentDir: "ch03/20-merging-queries", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/merging-queries.mp4", durationLabel: "1 min 41 s" }),
      L(21, "appending-queries", "Appending Queries", { contentDir: "ch03/21-appending-queries", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/appending-queries.mp4", durationLabel: "1 min 34 s" }),
      L(22, "parameters", "Parameters", { contentDir: "ch03/22-parameters", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/parameters.mp4", durationLabel: "1 min 39 s" }),
      L(23, "power-query-best-practices", "Power Query Best Practices & Performance", { contentDir: "ch03/23-power-query-best-practices", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/power-query-best-practices.mp4", durationLabel: "1 min 55 s" }),
    ],
  },
  {
    n: 4,
    title: "Data Modeling",
    lessons: [
      L(24, "why-modeling-matters", "Why Data Modeling Matters", { contentDir: "ch04/24-why-modeling-matters", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/why-modeling-matters.mp4", durationLabel: "1 min 2 s" }),
      L(25, "fact-vs-dimension", "Fact Tables vs. Dimension Tables", { contentDir: "ch04/25-fact-vs-dimension", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/fact-vs-dimension.mp4", durationLabel: "1 min 15 s" }),
      L(26, "star-schema", "Star Schema", { contentDir: "ch04/26-star-schema", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/star-schema.mp4", durationLabel: "1 min 5 s" }),
      L(27, "creating-relationships", "Creating Relationships", { contentDir: "ch04/27-creating-relationships", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/creating-relationships.mp4", durationLabel: "1 min 16 s" }),
      L(28, "cardinality", "One-to-Many, One-to-One & Many-to-Many", { contentDir: "ch04/28-cardinality", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/cardinality.mp4", durationLabel: "1 min 8 s" }),
      L(29, "filter-direction", "Filter Direction", { contentDir: "ch04/29-filter-direction", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/filter-direction.mp4", durationLabel: "1 min 15 s" }),
      L(30, "active-inactive", "Active vs. Inactive Relationships", { contentDir: "ch04/30-active-inactive", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/active-inactive.mp4", durationLabel: "1 min 8 s" }),
      L(31, "complete-data-model", "Building a Complete Power BI Data Model", { contentDir: "ch04/31-complete-data-model", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/complete-data-model.mp4", durationLabel: "1 min 14 s" }),
    ],
  },
  {
    n: 5,
    title: "DAX Fundamentals",
    lessons: [
      L(32, "what-is-dax", "What Is DAX?", { contentDir: "ch05/32-what-is-dax", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/what-is-dax.mp4", durationLabel: "2 min 1 s" }),
      L(33, "dax-syntax", "DAX Syntax Basics", { contentDir: "ch05/33-dax-syntax", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/dax-syntax.mp4", durationLabel: "1 min 49 s" }),
      L(34, "calculated-columns", "Calculated Columns", { contentDir: "ch05/34-calculated-columns", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/calculated-columns.mp4", durationLabel: "1 min 46 s" }),
      L(35, "measures", "Measures", { contentDir: "ch05/35-measures", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/measures.mp4", durationLabel: "1 min 47 s" }),
      L(36, "measures-vs-columns", "Measures vs. Calculated Columns", { contentDir: "ch05/36-measures-vs-columns", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/measures-vs-columns.mp4", durationLabel: "1 min 37 s" }),
      L(37, "basic-aggregations", "SUM, COUNT, DISTINCTCOUNT & Basic Aggregations", { contentDir: "ch05/37-basic-aggregations", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/basic-aggregations.mp4", durationLabel: "1 min 35 s" }),
      L(38, "row-vs-filter-context", "Row Context vs. Filter Context", { contentDir: "ch05/38-row-vs-filter-context", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/row-vs-filter-context.mp4", durationLabel: "1 min 54 s" }),
      L(39, "calculate", "CALCULATE Explained", { contentDir: "ch05/39-calculate", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/calculate.mp4", durationLabel: "1 min 41 s" }),
      L(40, "context-transition", "Context Transition", { contentDir: "ch05/40-context-transition", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/context-transition.mp4", durationLabel: "1 min 33 s" }),
      L(41, "iterators", "Iterator Functions — SUMX and Friends", { contentDir: "ch05/41-iterators", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/iterators.mp4", durationLabel: "1 min 40 s" }),
      L(42, "calculate-modifiers", "CALCULATE Filter Modifiers", { contentDir: "ch05/42-calculate-modifiers", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/calculate-modifiers.mp4", durationLabel: "1 min 36 s" }),
      L(43, "filter-function", "FILTER & Table Filter Expressions", { contentDir: "ch05/43-filter-function", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/filter-function.mp4", durationLabel: "1 min 32 s" }),
      L(44, "all-allexcept", "ALL & ALLEXCEPT", { contentDir: "ch05/44-all-allexcept", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/all-allexcept.mp4", durationLabel: "1 min 36 s" }),
      L(45, "allselected", "ALLSELECTED", { contentDir: "ch05/45-allselected", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/allselected.mp4", durationLabel: "1 min 39 s" }),
      L(46, "variables-best-practices", "Variables & DAX Best Practices", { contentDir: "ch05/46-variables-best-practices", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/variables-best-practices.mp4", durationLabel: "1 min 39 s" }),
    ],
  },
  {
    n: 6,
    title: "Dates & Time Intelligence",
    lessons: [
      L(47, "date-table", "Building a Date Table", { contentDir: "ch06/47-date-table", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/date-table.mp4", durationLabel: "1 min 40 s" }),
      L(48, "calendar-functions", "CALENDAR and Date Functions", { contentDir: "ch06/48-calendar-functions", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/calendar-functions.mp4", durationLabel: "1 min 34 s" }),
      L(49, "dateadd", "DATEADD", { contentDir: "ch06/49-dateadd", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/dateadd.mp4", durationLabel: "1 min 32 s" }),
      L(50, "ytd-mtd-qtd", "YTD, MTD & QTD", { contentDir: "ch06/50-ytd-mtd-qtd", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/ytd-mtd-qtd.mp4", durationLabel: "1 min 32 s" }),
      L(51, "datesytd-totalytd", "DATESYTD, TOTALYTD & DATESBETWEEN", { contentDir: "ch06/51-datesytd-totalytd", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/datesytd-totalytd.mp4", durationLabel: "1 min 41 s" }),
    ],
  },
  {
    n: 7,
    title: "Building Reports & Visualizations",
    lessons: [
      L(52, "choosing-the-right-visual", "Choosing the Right Visual", { contentDir: "ch07/52-choosing-the-right-visual", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/choosing-the-right-visual.mp4", durationLabel: "2 min 15 s" }),
      L(53, "tables-matrices", "Tables & Matrices", { contentDir: "ch07/53-tables-matrices", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/tables-matrices.mp4", durationLabel: "1 min 32 s" }),
      L(54, "core-charts", "Bar, Column, Line & Pie Charts", { contentDir: "ch07/54-core-charts", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/core-charts.mp4", durationLabel: "1 min 48 s" }),
      L(55, "cards-kpis-slicers", "Cards, KPIs & Slicers", { contentDir: "ch07/55-cards-kpis-slicers", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/cards-kpis-slicers.mp4", durationLabel: "1 min 47 s" }),
      L(56, "formatting", "Formatting & Conditional Formatting", { contentDir: "ch07/56-formatting", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/formatting.mp4", durationLabel: "1 min 47 s" }),
      L(57, "filter-pane", "Filters & the Filter Pane", { contentDir: "ch07/57-filter-pane", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/filter-pane.mp4", durationLabel: "1 min 45 s" }),
      L(58, "interactions", "Cross Filtering & Visual Interactions", { contentDir: "ch07/58-interactions", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/interactions.mp4", durationLabel: "1 min 30 s" }),
      L(59, "drill-down-through", "Drill Down & Drill Through", { contentDir: "ch07/59-drill-down-through", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/drill-down-through.mp4", durationLabel: "1 min 43 s" }),
      L(60, "buttons-bookmarks", "Buttons, Bookmarks & Navigation", { contentDir: "ch07/60-buttons-bookmarks", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/buttons-bookmarks.mp4", durationLabel: "1 min 39 s" }),
      L(61, "analytics-forecasting", "Analytics, Forecasting & Advanced Visuals", { contentDir: "ch07/61-analytics-forecasting", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/analytics-forecasting.mp4", durationLabel: "1 min 55 s" }),
    ],
  },
  {
    n: 8,
    title: "Dashboard Design & Storytelling",
    lessons: [
      L(62, "business-requirements", "Gathering Business Requirements", { contentDir: "ch08/62-business-requirements", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/business-requirements.mp4", durationLabel: "1 min 34 s" }),
      L(63, "choosing-kpis", "Choosing KPIs", { contentDir: "ch08/63-choosing-kpis", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/choosing-kpis.mp4", durationLabel: "1 min 46 s" }),
      L(64, "layout-hierarchy", "Dashboard Layout & Visual Hierarchy", { contentDir: "ch08/64-layout-hierarchy", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/layout-hierarchy.mp4", durationLabel: "1 min 41 s" }),
      L(65, "storytelling", "Storytelling With Data", { contentDir: "ch08/65-storytelling", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/storytelling.mp4", durationLabel: "2 min 8 s" }),
      L(66, "executive-dashboard", "Building a Professional Executive Dashboard", { contentDir: "ch08/66-executive-dashboard", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/executive-dashboard.mp4", durationLabel: "2 min 6 s" }),
    ],
  },
  {
    n: 9,
    title: "Power BI Service & Fabric",
    lessons: [
      L(67, "service-vs-desktop", "Power BI Service vs. Desktop", { contentDir: "ch09/67-service-vs-desktop", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/service-vs-desktop.mp4", durationLabel: "1 min 32 s" }),
      L(68, "licenses-fabric", "Understanding Power BI Licenses & Fabric", { contentDir: "ch09/68-licenses-fabric", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/licenses-fabric.mp4", durationLabel: "1 min 47 s" }),
      L(69, "workspaces", "Workspaces", { contentDir: "ch09/69-workspaces", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/workspaces.mp4", durationLabel: "1 min 55 s" }),
      L(70, "publishing", "Publishing Reports", { contentDir: "ch09/70-publishing", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/publishing.mp4", durationLabel: "1 min 34 s" }),
      L(71, "semantic-models", "Semantic Models", { contentDir: "ch09/71-semantic-models", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/semantic-models.mp4", durationLabel: "1 min 36 s" }),
      L(72, "sharing-access", "Sharing Reports & Managing Access", { contentDir: "ch09/72-sharing-access", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/sharing-access.mp4", durationLabel: "1 min 41 s" }),
      L(73, "apps", "Power BI Apps", { contentDir: "ch09/73-apps", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/apps.mp4", durationLabel: "1 min 43 s" }),
      L(74, "service-dashboards", "Dashboards in Power BI Service", { contentDir: "ch09/74-service-dashboards", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/service-dashboards.mp4", durationLabel: "1 min 46 s" }),
    ],
  },
  {
    n: 10,
    title: "Refresh & Gateways",
    lessons: [
      L(75, "how-refresh-works", "How Power BI Refresh Works", { contentDir: "ch10/75-how-refresh-works", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/how-refresh-works.mp4", durationLabel: "1 min 56 s" }),
      L(76, "data-gateway", "Installing & Configuring the Data Gateway", { contentDir: "ch10/76-data-gateway", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/data-gateway.mp4", durationLabel: "1 min 50 s" }),
      L(77, "scheduled-refresh", "Scheduled Refresh", { contentDir: "ch10/77-scheduled-refresh", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/scheduled-refresh.mp4", durationLabel: "1 min 52 s" }),
      L(78, "troubleshooting-refresh", "Troubleshooting Refresh Problems", { contentDir: "ch10/78-troubleshooting-refresh", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/troubleshooting-refresh.mp4", durationLabel: "1 min 49 s" }),
    ],
  },
  {
    n: 11,
    title: "Security",
    lessons: [
      L(79, "rls-fundamentals", "Row-Level Security Fundamentals", { contentDir: "ch11/79-rls-fundamentals", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/rls-fundamentals.mp4", durationLabel: "1 min 54 s" }),
      L(80, "rls-roles", "Creating RLS Roles", { contentDir: "ch11/80-rls-roles", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/rls-roles.mp4", durationLabel: "2 min 0 s" }),
      L(81, "rls-in-service", "RLS in Power BI Service", { contentDir: "ch11/81-rls-in-service", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/rls-in-service.mp4", durationLabel: "1 min 44 s" }),
      L(82, "dynamic-rls", "Dynamic Row-Level Security", { contentDir: "ch11/82-dynamic-rls", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/dynamic-rls.mp4", durationLabel: "2 min 0 s" }),
      L(83, "rls-complex-models", "RLS With Complex Data Models", { contentDir: "ch11/83-rls-complex-models", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/rls-complex-models.mp4", durationLabel: "1 min 35 s" }),
    ],
  },
  {
    n: 12,
    title: "Capstone Project",
    lessons: [
      L(84, "capstone-requirements", "Business Requirements", { contentDir: "ch12/84-capstone-requirements", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/capstone-requirements.mp4", durationLabel: "1 min 36 s" }),
      L(85, "capstone-import", "Import the Raw Data", { contentDir: "ch12/85-capstone-import", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/capstone-import.mp4", durationLabel: "1 min 49 s" }),
      L(86, "capstone-power-query", "Clean & Transform With Power Query", { contentDir: "ch12/86-capstone-power-query", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/capstone-power-query.mp4", durationLabel: "1 min 41 s" }),
      L(87, "capstone-star-schema", "Build the Star Schema", { contentDir: "ch12/87-capstone-star-schema", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/capstone-star-schema.mp4", durationLabel: "1 min 29 s" }),
      L(88, "capstone-dax", "Create DAX Measures", { contentDir: "ch12/88-capstone-dax", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/capstone-dax.mp4", durationLabel: "1 min 35 s" }),
      L(89, "capstone-report", "Build the Report", { contentDir: "ch12/89-capstone-report", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/capstone-report.mp4", durationLabel: "1 min 41 s" }),
      L(90, "capstone-interactivity", "Add Interactivity", { contentDir: "ch12/90-capstone-interactivity", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/capstone-interactivity.mp4", durationLabel: "1 min 45 s" }),
      L(91, "capstone-publish", "Publish to Power BI Service", { contentDir: "ch12/91-capstone-publish", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/capstone-publish.mp4", durationLabel: "1 min 35 s" }),
      L(92, "capstone-security-refresh", "Configure Security & Refresh", { contentDir: "ch12/92-capstone-security-refresh", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/capstone-security-refresh.mp4", durationLabel: "1 min 39 s" }),
      L(93, "capstone-present", "Present the Final Dashboard", { contentDir: "ch12/93-capstone-present", videoUrl: "https://ltvacademyvideos.b-cdn.net/ltv-powerbi/capstone-present.mp4", durationLabel: "1 min 25 s" }),
    ],
  },
];
