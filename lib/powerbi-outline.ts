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
      L(2, "installing-power-bi-desktop", "Installing Power BI Desktop"),
      L(3, "desktop-interface-tour", "Power BI Desktop Interface Tour"),
      L(4, "your-first-report", "Your First Power BI Report"),
      L(5, "the-power-bi-workflow", "The Power BI Workflow: Get → Transform → Model → Visualize → Publish"),
    ],
  },
  {
    n: 2,
    title: "Connecting to Data",
    lessons: [
      L(6, "data-sources", "Understanding Power BI Data Sources"),
      L(7, "connecting-to-excel", "Connecting to Excel"),
      L(8, "connecting-to-csv", "Connecting to CSV/Text Files"),
      L(9, "connecting-to-sql", "Connecting to SQL Databases"),
      L(10, "web-json-rest", "Connecting to Web, JSON & REST API Data"),
      L(11, "import-vs-directquery", "Import vs. DirectQuery"),
    ],
  },
  {
    n: 3,
    title: "Power Query & Data Cleaning",
    lessons: [
      L(12, "power-query-editor", "Power Query Editor Explained"),
      L(13, "changing-data-types", "Changing Data Types"),
      L(14, "rows", "Removing, Filtering & Editing Rows"),
      L(15, "replacing-values-errors", "Replacing Values and Handling Errors"),
      L(16, "columns", "Splitting, Merging & Extracting Columns"),
      L(17, "conditional-columns", "Conditional Columns & Columns From Examples"),
      L(18, "pivot-unpivot", "Pivoting & Unpivoting"),
      L(19, "group-by", "Group By & Aggregations"),
      L(20, "merging-queries", "Merging Queries"),
      L(21, "appending-queries", "Appending Queries"),
      L(22, "parameters", "Parameters"),
      L(23, "power-query-best-practices", "Power Query Best Practices & Performance"),
    ],
  },
  {
    n: 4,
    title: "Data Modeling",
    lessons: [
      L(24, "why-modeling-matters", "Why Data Modeling Matters"),
      L(25, "fact-vs-dimension", "Fact Tables vs. Dimension Tables"),
      L(26, "star-schema", "Star Schema"),
      L(27, "creating-relationships", "Creating Relationships"),
      L(28, "cardinality", "One-to-Many, One-to-One & Many-to-Many"),
      L(29, "filter-direction", "Filter Direction"),
      L(30, "active-inactive", "Active vs. Inactive Relationships"),
      L(31, "complete-data-model", "Building a Complete Power BI Data Model"),
    ],
  },
  {
    n: 5,
    title: "DAX Fundamentals",
    lessons: [
      L(32, "what-is-dax", "What Is DAX?"),
      L(33, "measures-vs-columns", "Measures vs. Calculated Columns"),
      L(34, "basic-aggregations", "SUM, COUNT, DISTINCTCOUNT & Basic Aggregations"),
      L(35, "iterators", "Iterator Functions — SUMX and Friends"),
      L(36, "calculate", "CALCULATE Explained"),
      L(37, "filter-context", "Filter Context & FILTER"),
      L(38, "all-functions", "ALL, ALLSELECTED & ALLEXCEPT"),
      L(39, "variables-best-practices", "Variables & DAX Best Practices"),
    ],
  },
  {
    n: 6,
    title: "Dates & Time Intelligence",
    lessons: [
      L(40, "date-table", "Building a Date Table"),
      L(41, "calendar-functions", "CALENDAR and Date Functions"),
      L(42, "dateadd", "DATEADD"),
      L(43, "ytd-mtd-qtd", "YTD, MTD & QTD"),
      L(44, "datesytd-totalytd", "DATESYTD, TOTALYTD & DATESBETWEEN"),
    ],
  },
  {
    n: 7,
    title: "Building Reports & Visualizations",
    lessons: [
      L(45, "choosing-the-right-visual", "Choosing the Right Visual"),
      L(46, "tables-matrices", "Tables & Matrices"),
      L(47, "core-charts", "Bar, Column, Line & Pie Charts"),
      L(48, "cards-kpis-slicers", "Cards, KPIs & Slicers"),
      L(49, "formatting", "Formatting & Conditional Formatting"),
      L(50, "filter-pane", "Filters & the Filter Pane"),
      L(51, "interactions", "Cross Filtering & Visual Interactions"),
      L(52, "drill-down-through", "Drill Down & Drill Through"),
      L(53, "buttons-bookmarks", "Buttons, Bookmarks & Navigation"),
      L(54, "analytics-forecasting", "Analytics, Forecasting & Advanced Visuals"),
    ],
  },
  {
    n: 8,
    title: "Dashboard Design & Storytelling",
    lessons: [
      L(55, "business-requirements", "Gathering Business Requirements"),
      L(56, "choosing-kpis", "Choosing KPIs"),
      L(57, "layout-hierarchy", "Dashboard Layout & Visual Hierarchy"),
      L(58, "storytelling", "Storytelling With Data"),
      L(59, "executive-dashboard", "Building a Professional Executive Dashboard"),
    ],
  },
  {
    n: 9,
    title: "Power BI Service & Fabric",
    lessons: [
      L(60, "service-vs-desktop", "Power BI Service vs. Desktop"),
      L(61, "licenses-fabric", "Understanding Power BI Licenses & Fabric"),
      L(62, "workspaces", "Workspaces"),
      L(63, "publishing", "Publishing Reports"),
      L(64, "semantic-models", "Semantic Models"),
      L(65, "sharing-access", "Sharing Reports & Managing Access"),
      L(66, "apps", "Power BI Apps"),
      L(67, "service-dashboards", "Dashboards in Power BI Service"),
    ],
  },
  {
    n: 10,
    title: "Refresh & Gateways",
    lessons: [
      L(68, "how-refresh-works", "How Power BI Refresh Works"),
      L(69, "data-gateway", "Installing & Configuring the Data Gateway"),
      L(70, "scheduled-refresh", "Scheduled Refresh"),
      L(71, "troubleshooting-refresh", "Troubleshooting Refresh Problems"),
    ],
  },
  {
    n: 11,
    title: "Security",
    lessons: [
      L(72, "rls-fundamentals", "Row-Level Security Fundamentals"),
      L(73, "rls-roles", "Creating RLS Roles"),
      L(74, "rls-in-service", "RLS in Power BI Service"),
      L(75, "dynamic-rls", "Dynamic Row-Level Security"),
      L(76, "rls-complex-models", "RLS With Complex Data Models"),
    ],
  },
  {
    n: 12,
    title: "Capstone Project",
    lessons: [
      L(77, "capstone-requirements", "Business Requirements"),
      L(78, "capstone-import", "Import the Raw Data"),
      L(79, "capstone-power-query", "Clean & Transform With Power Query"),
      L(80, "capstone-star-schema", "Build the Star Schema"),
      L(81, "capstone-dax", "Create DAX Measures"),
      L(82, "capstone-report", "Build the Report"),
      L(83, "capstone-interactivity", "Add Interactivity"),
      L(84, "capstone-publish", "Publish to Power BI Service"),
      L(85, "capstone-security-refresh", "Configure Security & Refresh"),
      L(86, "capstone-present", "Present the Final Dashboard"),
    ],
  },
];
