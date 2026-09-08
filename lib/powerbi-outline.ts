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
      L(1, "what-is-power-bi", "What Is Power BI?", {
        contentDir: "ch01/01-what-is-power-bi",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788733128/ltv-powerbi/ch01-01-what-is-power-bi.mp4",
        durationLabel: "3 min 18 s",
      }),
      L(2, "installing-power-bi-desktop", "Installing Power BI Desktop", {
        contentDir: "ch01/02-installing-power-bi-desktop",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788737301/ltv-powerbi/ch01-02-installing-power-bi-desktop.mp4",
        durationLabel: "2 min 48 s",
      }),
      L(3, "desktop-interface-tour", "Power BI Desktop Interface Tour", {
        contentDir: "ch01/03-desktop-interface-tour",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788738811/ltv-powerbi/ch01-03-desktop-interface-tour.mp4",
        durationLabel: "2 min 47 s",
      }),
      L(4, "your-first-report", "Your First Power BI Report", {
        contentDir: "ch01/04-your-first-report",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788740412/ltv-powerbi/ch01-04-your-first-report.mp4",
        durationLabel: "2 min 44 s",
      }),
      L(5, "the-power-bi-workflow", "The Power BI Workflow: Get → Transform → Model → Visualize → Publish", {
        contentDir: "ch01/05-power-bi-workflow",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788740416/ltv-powerbi/ch01-05-power-bi-workflow.mp4",
        durationLabel: "3 min 3 s",
      }),
    ],
  },
  {
    n: 2,
    title: "Connecting to Data",
    lessons: [
      L(6, "data-sources", "Understanding Power BI Data Sources", {
        contentDir: "ch02/06-data-sources",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788741491/ltv-powerbi/ch02-06-data-sources.mp4",
        durationLabel: "2 min 30 s",
      }),
      L(7, "connecting-to-excel", "Connecting to Excel", {
        contentDir: "ch02/07-connecting-to-excel",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788746010/ltv-powerbi/ch02-07-connecting-to-excel.mp4",
        durationLabel: "1 min 58 s",
      }),
      L(8, "connecting-to-csv", "Connecting to CSV/Text Files", {
        contentDir: "ch02/08-connecting-to-csv-text",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788746259/ltv-powerbi/ch02-08-connecting-to-csv-text.mp4",
        durationLabel: "2 min 9 s",
      }),
      L(9, "connecting-to-sql", "Connecting to SQL Databases", {
        contentDir: "ch02/09-connecting-to-sql",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788746568/ltv-powerbi/ch02-09-connecting-to-sql.mp4",
        durationLabel: "2 min 18 s",
      }),
      L(10, "web-json-rest", "Connecting to Web, JSON & REST API Data", {
        contentDir: "ch02/10-connecting-to-web-json-rest",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788746852/ltv-powerbi/ch02-10-connecting-to-web-json-rest.mp4",
        durationLabel: "2 min 30 s",
      }),
      L(11, "import-vs-directquery", "Import vs. DirectQuery", {
        contentDir: "ch02/11-import-vs-directquery",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788747141/ltv-powerbi/ch02-11-import-vs-directquery.mp4",
        durationLabel: "2 min 32 s",
      }),
    ],
  },
  {
    n: 3,
    title: "Power Query & Data Cleaning",
    lessons: [
      L(12, "power-query-editor", "Power Query Editor Explained", {
        contentDir: "ch03/12-power-query-editor",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788748070/ltv-powerbi/ch03-12-power-query-editor.mp4",
        durationLabel: "2 min 45 s",
      }),
      L(13, "changing-data-types", "Changing Data Types", {
        contentDir: "ch03/13-changing-data-types",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788748314/ltv-powerbi/ch03-13-changing-data-types.mp4",
        durationLabel: "2 min 8 s",
      }),
      L(14, "rows", "Removing, Filtering & Editing Rows", {
        contentDir: "ch03/14-rows",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788748561/ltv-powerbi/ch03-14-rows.mp4",
        durationLabel: "2 min 18 s",
      }),
      L(15, "replacing-values-errors", "Replacing Values and Handling Errors", {
        contentDir: "ch03/15-replacing-values-errors",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788748790/ltv-powerbi/ch03-15-replacing-values-errors.mp4",
        durationLabel: "2 min 10 s",
      }),
      L(16, "columns", "Splitting, Merging & Extracting Columns", {
        contentDir: "ch03/16-columns",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788749055/ltv-powerbi/ch03-16-columns.mp4",
        durationLabel: "2 min 12 s",
      }),
      L(17, "conditional-columns", "Conditional Columns & Columns From Examples", {
        contentDir: "ch03/17-conditional-columns",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788749306/ltv-powerbi/ch03-17-conditional-columns.mp4",
        durationLabel: "2 min 20 s",
      }),
      L(18, "pivot-unpivot", "Pivoting & Unpivoting", {
        contentDir: "ch03/18-pivot-unpivot",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788749548/ltv-powerbi/ch03-18-pivot-unpivot.mp4",
        durationLabel: "2 min 6 s",
      }),
      L(19, "group-by", "Group By & Aggregations", {
        contentDir: "ch03/19-group-by",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788749764/ltv-powerbi/ch03-19-group-by.mp4",
        durationLabel: "1 min 55 s",
      }),
      L(20, "merging-queries", "Merging Queries", {
        contentDir: "ch03/20-merging-queries",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788749990/ltv-powerbi/ch03-20-merging-queries.mp4",
        durationLabel: "2 min 9 s",
      }),
      L(21, "appending-queries", "Appending Queries", {
        contentDir: "ch03/21-appending-queries",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788750212/ltv-powerbi/ch03-21-appending-queries.mp4",
        durationLabel: "2 min 2 s",
      }),
      L(22, "parameters", "Parameters", {
        contentDir: "ch03/22-parameters",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788750459/ltv-powerbi/ch03-22-parameters.mp4",
        durationLabel: "2 min",
      }),
      L(23, "power-query-best-practices", "Power Query Best Practices & Performance", {
        contentDir: "ch03/23-power-query-best-practices",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788750922/ltv-powerbi/ch03-23-power-query-best-practices.mp4",
        durationLabel: "2 min",
      }),
    ],
  },
  {
    n: 4,
    title: "Data Modeling",
    lessons: [
      L(24, "why-modeling-matters", "Why Data Modeling Matters", {
        contentDir: "ch04/24-why-modeling-matters",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788754890/ltv-powerbi/ch04-24-why-modeling-matters.mp4",
        durationLabel: "1 min",
      }),
      L(25, "fact-vs-dimension", "Fact Tables vs. Dimension Tables", {
        contentDir: "ch04/25-fact-vs-dimension",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788755021/ltv-powerbi/ch04-25-fact-vs-dimension.mp4",
        durationLabel: "2 min",
      }),
      L(26, "star-schema", "Star Schema", {
        contentDir: "ch04/26-star-schema",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788755136/ltv-powerbi/ch04-26-star-schema.mp4",
        durationLabel: "1 min",
      }),
      L(27, "creating-relationships", "Creating Relationships", {
        contentDir: "ch04/27-creating-relationships",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788755265/ltv-powerbi/ch04-27-creating-relationships.mp4",
        durationLabel: "2 min",
      }),
      L(28, "cardinality", "One-to-Many, One-to-One & Many-to-Many", {
        contentDir: "ch04/28-cardinality",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788755391/ltv-powerbi/ch04-28-cardinality.mp4",
        durationLabel: "1 min",
      }),
      L(29, "filter-direction", "Filter Direction", {
        contentDir: "ch04/29-filter-direction",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788755526/ltv-powerbi/ch04-29-filter-direction.mp4",
        durationLabel: "1 min",
      }),
      L(30, "active-inactive", "Active vs. Inactive Relationships", {
        contentDir: "ch04/30-active-inactive",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788755655/ltv-powerbi/ch04-30-active-inactive.mp4",
        durationLabel: "1 min",
      }),
      L(31, "complete-data-model", "Building a Complete Power BI Data Model", {
        contentDir: "ch04/31-complete-data-model",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788755792/ltv-powerbi/ch04-31-complete-data-model.mp4",
        durationLabel: "1 min",
      }),
    ],
  },
  {
    n: 5,
    title: "DAX Fundamentals",
    lessons: [
      L(32, "what-is-dax", "What Is DAX?", {
        contentDir: "ch05/32-what-is-dax",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788826090/ltv-powerbi/ch05-32-what-is-dax.mp4",
        durationLabel: "2 min 29 s",
      }),
      L(33, "dax-syntax", "DAX Syntax Basics", {
        contentDir: "ch05/33-dax-syntax",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788826093/ltv-powerbi/ch05-33-dax-syntax.mp4",
        durationLabel: "2 min 23 s",
      }),
      L(34, "calculated-columns", "Calculated Columns", {
        contentDir: "ch05/34-calculated-columns",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788826095/ltv-powerbi/ch05-34-calculated-columns.mp4",
        durationLabel: "2 min 5 s",
      }),
      L(35, "measures", "Measures", {
        contentDir: "ch05/35-measures",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788826098/ltv-powerbi/ch05-35-measures.mp4",
        durationLabel: "2 min 18 s",
      }),
      L(36, "measures-vs-columns", "Measures vs. Calculated Columns", {
        contentDir: "ch05/36-measures-vs-columns",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788826101/ltv-powerbi/ch05-36-measures-vs-columns.mp4",
        durationLabel: "1 min 49 s",
      }),
      L(37, "basic-aggregations", "SUM, COUNT, DISTINCTCOUNT & Basic Aggregations", {
        contentDir: "ch05/37-basic-aggregations",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788826109/ltv-powerbi/ch05-37-basic-aggregations.mp4",
        durationLabel: "2 min 4 s",
      }),
      L(38, "row-vs-filter-context", "Row Context vs. Filter Context", {
        contentDir: "ch05/38-row-vs-filter-context",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788826112/ltv-powerbi/ch05-38-row-vs-filter-context.mp4",
        durationLabel: "2 min 9 s",
      }),
      L(39, "calculate", "CALCULATE Explained", {
        contentDir: "ch05/39-calculate",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788826114/ltv-powerbi/ch05-39-calculate.mp4",
        durationLabel: "2 min 1 s",
      }),
      L(40, "context-transition", "Context Transition", {
        contentDir: "ch05/40-context-transition",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788826116/ltv-powerbi/ch05-40-context-transition.mp4",
        durationLabel: "1 min 54 s",
      }),
      L(41, "iterators", "Iterator Functions — SUMX and Friends", {
        contentDir: "ch05/41-iterators",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788826125/ltv-powerbi/ch05-41-iterators.mp4",
        durationLabel: "2 min 7 s",
      }),
      L(42, "calculate-modifiers", "CALCULATE Filter Modifiers", {
        contentDir: "ch05/42-calculate-modifiers",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788826128/ltv-powerbi/ch05-42-calculate-modifiers.mp4",
        durationLabel: "1 min 55 s",
      }),
      L(43, "filter-function", "FILTER & Table Filter Expressions", {
        contentDir: "ch05/43-filter-function",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788826130/ltv-powerbi/ch05-43-filter-function.mp4",
        durationLabel: "2 min 4 s",
      }),
      L(44, "all-allexcept", "ALL & ALLEXCEPT", {
        contentDir: "ch05/44-all-allexcept",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788826133/ltv-powerbi/ch05-44-all-allexcept.mp4",
        durationLabel: "1 min 52 s",
      }),
      L(45, "allselected", "ALLSELECTED", {
        contentDir: "ch05/45-allselected",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788826142/ltv-powerbi/ch05-45-allselected.mp4",
        durationLabel: "2 min 6 s",
      }),
      L(46, "variables-best-practices", "Variables & DAX Best Practices", {
        contentDir: "ch05/46-variables-best-practices",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788826144/ltv-powerbi/ch05-46-variables-best-practices.mp4",
        durationLabel: "1 min 58 s",
      }),
    ],
  },
  {
    n: 6,
    title: "Dates & Time Intelligence",
    lessons: [
      L(47, "date-table", "Building a Date Table", {
        contentDir: "ch06/47-date-table",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788797520/ltv-powerbi/ch06-47-date-table.mp4",
        durationLabel: "1 min",
      }),
      L(48, "calendar-functions", "CALENDAR and Date Functions", {
        contentDir: "ch06/48-calendar-functions",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788797655/ltv-powerbi/ch06-48-calendar-functions.mp4",
        durationLabel: "1 min",
      }),
      L(49, "dateadd", "DATEADD", {
        contentDir: "ch06/49-dateadd",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788797794/ltv-powerbi/ch06-49-dateadd.mp4",
        durationLabel: "1 min",
      }),
      L(50, "ytd-mtd-qtd", "YTD, MTD & QTD", {
        contentDir: "ch06/50-ytd-mtd-qtd",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788797925/ltv-powerbi/ch06-50-ytd-mtd-qtd.mp4",
        durationLabel: "1 min",
      }),
      L(51, "datesytd-totalytd", "DATESYTD, TOTALYTD & DATESBETWEEN", {
        contentDir: "ch06/51-datesytd-totalytd",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788798077/ltv-powerbi/ch06-51-datesytd-totalytd.mp4",
        durationLabel: "1 min",
      }),
    ],
  },
  {
    n: 7,
    title: "Building Reports & Visualizations",
    lessons: [
      L(52, "choosing-the-right-visual", "Choosing the Right Visual", {
        contentDir: "ch07/52-choosing-the-right-visual",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788798623/ltv-powerbi/ch07-52-choosing-the-right-visual.mp4",
        durationLabel: "1 min",
      }),
      L(53, "tables-matrices", "Tables & Matrices", {
        contentDir: "ch07/53-tables-matrices",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788798765/ltv-powerbi/ch07-53-tables-matrices.mp4",
        durationLabel: "1 min",
      }),
      L(54, "core-charts", "Bar, Column, Line & Pie Charts", {
        contentDir: "ch07/54-core-charts",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788798924/ltv-powerbi/ch07-54-core-charts.mp4",
        durationLabel: "1 min",
      }),
      L(55, "cards-kpis-slicers", "Cards, KPIs & Slicers", {
        contentDir: "ch07/55-cards-kpis-slicers",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788799083/ltv-powerbi/ch07-55-cards-kpis-slicers.mp4",
        durationLabel: "1 min",
      }),
      L(56, "formatting", "Formatting & Conditional Formatting", {
        contentDir: "ch07/56-formatting",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788799237/ltv-powerbi/ch07-56-formatting.mp4",
        durationLabel: "1 min",
      }),
      L(57, "filter-pane", "Filters & the Filter Pane", {
        contentDir: "ch07/57-filter-pane",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788799404/ltv-powerbi/ch07-57-filter-pane.mp4",
        durationLabel: "1 min",
      }),
      L(58, "interactions", "Cross Filtering & Visual Interactions", {
        contentDir: "ch07/58-interactions",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788799576/ltv-powerbi/ch07-58-interactions.mp4",
        durationLabel: "1 min",
      }),
      L(59, "drill-down-through", "Drill Down & Drill Through", {
        contentDir: "ch07/59-drill-down-through",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788799753/ltv-powerbi/ch07-59-drill-down-through.mp4",
        durationLabel: "1 min",
      }),
      L(60, "buttons-bookmarks", "Buttons, Bookmarks & Navigation", {
        contentDir: "ch07/60-buttons-bookmarks",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788799904/ltv-powerbi/ch07-60-buttons-bookmarks.mp4",
        durationLabel: "1 min",
      }),
      L(61, "analytics-forecasting", "Analytics, Forecasting & Advanced Visuals", {
        contentDir: "ch07/61-analytics-forecasting",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788800068/ltv-powerbi/ch07-61-analytics-forecasting.mp4",
        durationLabel: "2 min",
      }),
    ],
  },
  {
    n: 8,
    title: "Dashboard Design & Storytelling",
    lessons: [
      L(62, "business-requirements", "Gathering Business Requirements", {
        contentDir: "ch08/62-business-requirements",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788800379/ltv-powerbi/ch08-62-business-requirements.mp4",
        durationLabel: "1 min",
      }),
      L(63, "choosing-kpis", "Choosing KPIs", {
        contentDir: "ch08/63-choosing-kpis",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788800516/ltv-powerbi/ch08-63-choosing-kpis.mp4",
        durationLabel: "1 min",
      }),
      L(64, "layout-hierarchy", "Dashboard Layout & Visual Hierarchy", {
        contentDir: "ch08/64-layout-hierarchy",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788800674/ltv-powerbi/ch08-64-layout-hierarchy.mp4",
        durationLabel: "1 min",
      }),
      L(65, "storytelling", "Storytelling With Data", {
        contentDir: "ch08/65-storytelling",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788800848/ltv-powerbi/ch08-65-storytelling.mp4",
        durationLabel: "2 min",
      }),
      L(66, "executive-dashboard", "Building a Professional Executive Dashboard", {
        contentDir: "ch08/66-executive-dashboard",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788801008/ltv-powerbi/ch08-66-executive-dashboard.mp4",
        durationLabel: "2 min",
      }),
    ],
  },
  {
    n: 9,
    title: "Power BI Service & Fabric",
    lessons: [
      L(67, "service-vs-desktop", "Power BI Service vs. Desktop", {
        contentDir: "ch09/67-service-vs-desktop",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788802181/ltv-powerbi/ch09-67-service-vs-desktop.mp4",
        durationLabel: "1 min",
      }),
      L(68, "licenses-fabric", "Understanding Power BI Licenses & Fabric", {
        contentDir: "ch09/68-licenses-fabric",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788802183/ltv-powerbi/ch09-68-licenses-fabric.mp4",
        durationLabel: "1 min",
      }),
      L(69, "workspaces", "Workspaces", {
        contentDir: "ch09/69-workspaces",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788802189/ltv-powerbi/ch09-69-workspaces.mp4",
        durationLabel: "1 min",
      }),
      L(70, "publishing", "Publishing Reports", {
        contentDir: "ch09/70-publishing",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788802191/ltv-powerbi/ch09-70-publishing.mp4",
        durationLabel: "1 min",
      }),
      L(71, "semantic-models", "Semantic Models", {
        contentDir: "ch09/71-semantic-models",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788802193/ltv-powerbi/ch09-71-semantic-models.mp4",
        durationLabel: "1 min",
      }),
      L(72, "sharing-access", "Sharing Reports & Managing Access", {
        contentDir: "ch09/72-sharing-access",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788802201/ltv-powerbi/ch09-72-sharing-access.mp4",
        durationLabel: "1 min",
      }),
      L(73, "apps", "Power BI Apps", {
        contentDir: "ch09/73-apps",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788802204/ltv-powerbi/ch09-73-apps.mp4",
        durationLabel: "1 min",
      }),
      L(74, "service-dashboards", "Dashboards in Power BI Service", {
        contentDir: "ch09/74-service-dashboards",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788802208/ltv-powerbi/ch09-74-service-dashboards.mp4",
        durationLabel: "1 min",
      }),
    ],
  },
  {
    n: 10,
    title: "Refresh & Gateways",
    lessons: [
      L(75, "how-refresh-works", "How Power BI Refresh Works", {
        contentDir: "ch10/75-how-refresh-works",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788804696/ltv-powerbi/ch10-75-how-refresh-works.mp4",
        durationLabel: "1 min",
      }),
      L(76, "data-gateway", "Installing & Configuring the Data Gateway", {
        contentDir: "ch10/76-data-gateway",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788804698/ltv-powerbi/ch10-76-data-gateway.mp4",
        durationLabel: "1 min",
      }),
      L(77, "scheduled-refresh", "Scheduled Refresh", {
        contentDir: "ch10/77-scheduled-refresh",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788804700/ltv-powerbi/ch10-77-scheduled-refresh.mp4",
        durationLabel: "1 min",
      }),
      L(78, "troubleshooting-refresh", "Troubleshooting Refresh Problems", {
        contentDir: "ch10/78-troubleshooting-refresh",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788804702/ltv-powerbi/ch10-78-troubleshooting-refresh.mp4",
        durationLabel: "1 min",
      }),
    ],
  },
  {
    n: 11,
    title: "Security",
    lessons: [
      L(79, "rls-fundamentals", "Row-Level Security Fundamentals", {
        contentDir: "ch11/79-rls-fundamentals",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788804709/ltv-powerbi/ch11-79-rls-fundamentals.mp4",
        durationLabel: "1 min",
      }),
      L(80, "rls-roles", "Creating RLS Roles", {
        contentDir: "ch11/80-rls-roles",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788804710/ltv-powerbi/ch11-80-rls-roles.mp4",
        durationLabel: "1 min",
      }),
      L(81, "rls-in-service", "RLS in Power BI Service", {
        contentDir: "ch11/81-rls-in-service",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788804713/ltv-powerbi/ch11-81-rls-in-service.mp4",
        durationLabel: "1 min",
      }),
      L(82, "dynamic-rls", "Dynamic Row-Level Security", {
        contentDir: "ch11/82-dynamic-rls",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788804715/ltv-powerbi/ch11-82-dynamic-rls.mp4",
        durationLabel: "1 min",
      }),
      L(83, "rls-complex-models", "RLS With Complex Data Models", {
        contentDir: "ch11/83-rls-complex-models",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788804717/ltv-powerbi/ch11-83-rls-complex-models.mp4",
        durationLabel: "1 min",
      }),
    ],
  },
  {
    n: 12,
    title: "Capstone Project",
    lessons: [
      L(84, "capstone-requirements", "Business Requirements", {
        contentDir: "ch12/84-capstone-requirements",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788805684/ltv-powerbi/ch12-84-capstone-requirements.mp4",
        durationLabel: "1 min",
      }),
      L(85, "capstone-import", "Import the Raw Data", {
        contentDir: "ch12/85-capstone-import",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788805688/ltv-powerbi/ch12-85-capstone-import.mp4",
        durationLabel: "1 min",
      }),
      L(86, "capstone-power-query", "Clean & Transform With Power Query", {
        contentDir: "ch12/86-capstone-power-query",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788805690/ltv-powerbi/ch12-86-capstone-power-query.mp4",
        durationLabel: "1 min",
      }),
      L(87, "capstone-star-schema", "Build the Star Schema", {
        contentDir: "ch12/87-capstone-star-schema",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788805693/ltv-powerbi/ch12-87-capstone-star-schema.mp4",
        durationLabel: "1 min",
      }),
      L(88, "capstone-dax", "Create DAX Measures", {
        contentDir: "ch12/88-capstone-dax",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788805695/ltv-powerbi/ch12-88-capstone-dax.mp4",
        durationLabel: "1 min",
      }),
      L(89, "capstone-report", "Build the Report", {
        contentDir: "ch12/89-capstone-report",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788805701/ltv-powerbi/ch12-89-capstone-report.mp4",
        durationLabel: "1 min",
      }),
      L(90, "capstone-interactivity", "Add Interactivity", {
        contentDir: "ch12/90-capstone-interactivity",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788805704/ltv-powerbi/ch12-90-capstone-interactivity.mp4",
        durationLabel: "1 min",
      }),
      L(91, "capstone-publish", "Publish to Power BI Service", {
        contentDir: "ch12/91-capstone-publish",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788805706/ltv-powerbi/ch12-91-capstone-publish.mp4",
        durationLabel: "1 min",
      }),
      L(92, "capstone-security-refresh", "Configure Security & Refresh", {
        contentDir: "ch12/92-capstone-security-refresh",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788805708/ltv-powerbi/ch12-92-capstone-security-refresh.mp4",
        durationLabel: "1 min",
      }),
      L(93, "capstone-present", "Present the Final Dashboard", {
        contentDir: "ch12/93-capstone-present",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788805710/ltv-powerbi/ch12-93-capstone-present.mp4",
        durationLabel: "1 min",
      }),
    ],
  },
];
