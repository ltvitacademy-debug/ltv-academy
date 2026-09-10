// The full Tableau course outline. Only lessons with a contentDir + videoUrl
// are playable; everything else renders as "in production". Assumes prior
// SQL knowledge from the T-SQL Development course elsewhere in the catalog —
// lessons on joins, filtering, etc. teach how those already-known concepts
// behave inside Tableau specifically, not the concepts from scratch.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/tableau/
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

export const TABLEAU_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Getting Started",
    lessons: [
      L(1, "welcome-what-is-tableau", "Welcome! What Is Tableau & Course Overview"),
      L(2, "installing-tableau-desktop-and-public", "Installing Tableau Desktop & Tableau Public"),
      L(3, "course-datasets", "Downloading and Understanding the Course Datasets"),
      L(4, "navigating-tableau-desktop", "Navigating Tableau Desktop"),
      L(5, "dimensions-measures-discrete-continuous", "Dimensions, Measures, Discrete & Continuous Fields"),
      L(6, "exercise-first-visualization", "Exercise: Build Your First Tableau Visualization"),
    ],
  },
  {
    n: 2,
    title: "Connecting & Preparing Data",
    lessons: [
      L(7, "connecting-to-excel-and-csv", "Connecting to Excel & CSV Files"),
      L(8, "connecting-to-sql-server", "Connecting Tableau to SQL Server"),
      L(9, "live-connections-vs-extracts", "Live Connections vs. Extracts"),
      L(10, "creating-refreshing-managing-extracts", "Creating, Refreshing & Managing Extracts"),
      L(11, "data-types-metadata-field-properties", "Data Types, Metadata & Field Properties"),
      L(12, "cleaning-data-interpreter-splits-pivots-nulls", "Cleaning Data: Data Interpreter, Splits, Pivots & NULLs"),
      L(13, "wide-vs-long-data", "Wide vs. Long Data & Preparing Data for Tableau"),
    ],
  },
  {
    n: 3,
    title: "Visualization Fundamentals",
    lessons: [
      L(14, "bar-charts-and-show-me", "Bar Charts & Using Show Me"),
      L(15, "line-and-area-charts", "Line Charts & Area Charts"),
      L(16, "pie-donut-treemap-charts", "Pie, Donut & Tree Map Charts"),
      L(17, "highlight-tables-and-heat-maps", "Highlight Tables & Heat Maps"),
      L(18, "scatter-plots", "Scatter Plots"),
      L(19, "histograms-bins-distributions", "Histograms, Bins & Distributions"),
      L(20, "box-and-whisker-plots", "Box-and-Whisker Plots"),
      L(21, "choosing-the-right-visualization", "Choosing the Right Visualization"),
    ],
  },
  {
    n: 4,
    title: "Formatting & Visual Design",
    lessons: [
      L(22, "the-marks-card", "The Marks Card: Color, Size, Detail & Shape"),
      L(23, "labels-tooltips-viz-in-tooltip", "Labels, Tooltips & Viz in Tooltip"),
      L(24, "formatting-numbers-dates-axes-headers", "Formatting Numbers, Dates, Axes & Headers"),
      L(25, "titles-captions-reference-lines-annotations", "Titles, Captions, Reference Lines & Annotations"),
      L(26, "professional-design-avoiding-clutter", "Professional Visualization Design & Avoiding Clutter"),
    ],
  },
  {
    n: 5,
    title: "Filters, Sorting & Analytics",
    lessons: [
      L(27, "sorting-basic-and-quick-filters", "Sorting, Basic Filters & Quick Filters"),
      L(28, "dimension-measure-date-filters", "Dimension, Measure & Date Filters"),
      L(29, "relative-dates-top-n-conditional-filters", "Relative Dates, Top N & Conditional Filters"),
      L(30, "context-filters", "Context Filters"),
      L(31, "tableaus-order-of-operations", "Understanding Tableau's Order of Operations"),
      L(32, "analytics-pane-trend-lines-forecasting", "Analytics Pane: Trend Lines, Forecasting & Reference Lines"),
    ],
  },
  {
    n: 6,
    title: "Calculated Fields",
    lessons: [
      L(33, "intro-to-calculated-fields", "Introduction to Calculated Fields"),
      L(34, "arithmetic-and-kpi-calculations", "Arithmetic & KPI Calculations"),
      L(35, "string-calculations", "String Calculations"),
      L(36, "date-calculations", "Date Calculations"),
      L(37, "if-then-else-case", "IF, THEN, ELSE & CASE"),
      L(38, "null-handling-and-data-type-calculations", "NULL Handling & Data-Type Calculations"),
      L(39, "aggregate-vs-non-aggregate-calculations", "Aggregate vs. Non-Aggregate Calculations & Common Errors"),
    ],
  },
  {
    n: 7,
    title: "Time Series & Table Calculations",
    lessons: [
      L(40, "dates-year-quarter-month-week-day", "Dates: Year, Quarter, Month, Week & Day"),
      L(41, "continuous-vs-discrete-dates", "Continuous vs. Discrete Dates & Time-Series Analysis"),
      L(42, "intro-to-table-calculations", "Introduction to Table Calculations"),
      L(43, "percent-of-total-difference-percent-difference", "Percent of Total, Difference & Percent Difference"),
      L(44, "running-totals-and-moving-averages", "Running Totals & Moving Averages"),
      L(45, "rank-and-quick-table-calculations", "Rank & Other Quick Table Calculations"),
      L(46, "compute-using-addressing-partitioning", "Compute Using: Addressing & Partitioning"),
    ],
  },
  {
    n: 8,
    title: "Data Modeling",
    lessons: [
      L(47, "tableaus-data-model", "Understanding Tableau's Data Model"),
      L(48, "relationships-vs-joins", "Relationships vs. Joins"),
      L(49, "creating-joins-and-multi-field-joins", "Creating Joins & Joining on Multiple Fields"),
      L(50, "duplicate-records-granularity-join-problems", "Duplicate Records, Granularity & Join Problems"),
      L(51, "unions-combining-data-vertically", "Unions & Combining Data Vertically"),
      L(52, "data-blending-cross-database-analysis", "Data Blending & Cross-Database Analysis"),
      L(53, "relationships-vs-joins-vs-blending", "Relationships vs. Joins vs. Blending — Which Should You Use?"),
    ],
  },
  {
    n: 9,
    title: "Maps & Geographic Analysis",
    lessons: [
      L(54, "geographic-roles-and-creating-maps", "Geographic Roles & Creating Maps"),
      L(55, "symbol-maps-vs-filled-maps", "Symbol Maps vs. Filled Maps"),
      L(56, "fixing-geographic-data-errors", "Fixing Geographic Data Errors"),
      L(57, "geographic-hierarchies-groups-custom-territories", "Geographic Hierarchies, Groups & Custom Territories"),
      L(58, "spatial-data-and-advanced-mapping", "Spatial Data & Advanced Mapping"),
    ],
  },
  {
    n: 10,
    title: "Groups, Sets, Bins & Hierarchies",
    lessons: [
      L(59, "groups-and-hierarchies", "Groups & Hierarchies"),
      L(60, "sets-and-dynamic-sets", "Sets & Dynamic Sets"),
      L(61, "combined-sets-and-set-analysis", "Combined Sets & Set Analysis"),
      L(62, "bins-distributions-segmentation", "Bins, Distributions & Segmentation"),
    ],
  },
  {
    n: 11,
    title: "Parameters",
    lessons: [
      L(63, "understanding-and-creating-parameters", "Understanding & Creating Parameters"),
      L(64, "parameters-with-calculated-fields", "Parameters with Calculated Fields"),
      L(65, "dynamic-measure-and-dimension-selection", "Dynamic Measure & Dimension Selection"),
      L(66, "what-if-analysis-with-parameters", "What-If Analysis with Parameters"),
      L(67, "parameter-actions-and-interactive-analysis", "Parameter Actions & Interactive Analysis"),
    ],
  },
  {
    n: 12,
    title: "Level of Detail Expressions",
    lessons: [
      L(68, "understanding-lod-expressions", "Understanding Level of Detail Expressions"),
      L(69, "fixed-lod", "FIXED LOD"),
      L(70, "include-and-exclude-lod", "INCLUDE & EXCLUDE LOD"),
      L(71, "lod-expressions-and-filters", "LOD Expressions and Filters"),
      L(72, "lod-vs-table-calculations", "LOD vs. Table Calculations"),
      L(73, "real-world-lod-analysis", "Real-World LOD Analysis: Customer Lifetime Sales & First Purchase"),
    ],
  },
  {
    n: 13,
    title: "Advanced Visualizations",
    lessons: [
      L(74, "dual-axis-and-combined-axis-charts", "Dual-Axis & Combined-Axis Charts"),
      L(75, "kpi-cards-bullet-charts-sparklines", "KPI Cards, Bullet Charts & Sparklines"),
      L(76, "waterfall-funnel-pareto-charts", "Waterfall, Funnel & Pareto Charts"),
      L(77, "advanced-reference-lines-bands-dynamic-targets", "Advanced Reference Lines, Bands & Dynamic Targets"),
      L(78, "advanced-chart-challenge", "Advanced Chart Challenge"),
    ],
  },
  {
    n: 14,
    title: "Dashboards",
    lessons: [
      L(79, "your-first-professional-dashboard", "Building Your First Professional Dashboard"),
      L(80, "dashboard-layout-containers-tiled-floating", "Dashboard Layout: Containers, Tiled & Floating Objects"),
      L(81, "kpi-headers-and-executive-summary", "Building KPI Headers & Executive Summary Sections"),
      L(82, "filter-and-highlight-actions", "Filter & Highlight Actions"),
      L(83, "url-parameter-and-set-actions", "URL, Parameter & Set Actions"),
      L(84, "navigation-show-hide-dynamic-titles", "Navigation, Show/Hide Containers & Dynamic Titles"),
      L(85, "designing-for-desktop-and-mobile", "Designing Dashboards for Desktop & Mobile"),
      L(86, "dashboard-design-storytelling-performance", "Dashboard Design, Storytelling & Performance"),
    ],
  },
  {
    n: 15,
    title: "Tableau Server, Cloud & Public",
    lessons: [
      L(87, "desktop-vs-public-vs-cloud-vs-server", "Tableau Desktop vs. Public vs. Cloud vs. Server"),
      L(88, "publishing-workbooks-data-sources-dashboards", "Publishing Workbooks, Data Sources & Dashboards"),
      L(89, "permissions-refreshes-subscriptions-alerts", "Permissions, Refreshes, Subscriptions, Alerts & Sharing"),
    ],
  },
  {
    n: 16,
    title: "Performance Optimization",
    lessons: [
      L(90, "troubleshooting-slow-workbooks", "Troubleshooting Slow Tableau Workbooks"),
      L(91, "optimizing-extracts-queries-calculations-dashboards", "Optimizing Extracts, Queries, Calculations & Dashboards"),
    ],
  },
  {
    n: 17,
    title: "Portfolio Projects",
    lessons: [
      L(92, "project-1-executive-sales-dashboard", "Project 1 — Executive Sales Dashboard"),
      L(93, "project-2-customer-segmentation-dashboard", "Project 2 — Customer Segmentation Dashboard"),
      L(94, "project-3-enterprise-performance-dashboard", "Project 3 — Enterprise Performance Dashboard"),
    ],
  },
  {
    n: 18,
    title: "Interview & Portfolio",
    lessons: [
      L(95, "tableau-interview-prep-and-portfolio-strategy", "Tableau Interview Preparation & Portfolio Strategy"),
    ],
  },
];
