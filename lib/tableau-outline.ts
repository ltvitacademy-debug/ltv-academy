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
      L(1, "welcome-what-is-tableau", "Welcome! What Is Tableau & Course Overview", { contentDir: "ch01/01-welcome-what-is-tableau", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792131415/ltv-tableau/welcome-what-is-tableau.mp4", durationLabel: "1 min 45 s" }),
      L(2, "installing-tableau-desktop-and-public", "Installing Tableau Desktop & Tableau Public", { contentDir: "ch01/02-installing-tableau-desktop-and-public", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792131467/ltv-tableau/installing-tableau-desktop-and-public.mp4", durationLabel: "1 min 37 s" }),
      L(3, "course-datasets", "Downloading and Understanding the Course Datasets", { contentDir: "ch01/03-course-datasets", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792131521/ltv-tableau/course-datasets.mp4", durationLabel: "1 min 46 s" }),
      L(4, "navigating-tableau-desktop", "Navigating Tableau Desktop", { contentDir: "ch01/04-navigating-tableau-desktop", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792131577/ltv-tableau/navigating-tableau-desktop.mp4", durationLabel: "1 min 50 s" }),
      L(5, "dimensions-measures-discrete-continuous", "Dimensions, Measures, Discrete & Continuous Fields", { contentDir: "ch01/05-dimensions-measures-discrete-continuous", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792131633/ltv-tableau/dimensions-measures-discrete-continuous.mp4", durationLabel: "1 min 47 s" }),
      L(6, "exercise-first-visualization", "Exercise: Build Your First Tableau Visualization", { contentDir: "ch01/06-exercise-first-visualization", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792131669/ltv-tableau/exercise-first-visualization.mp4", durationLabel: "1 min 6 s" }),
    ],
  },
  {
    n: 2,
    title: "Connecting & Preparing Data",
    lessons: [
      L(7, "connecting-to-excel-and-csv", "Connecting to Excel & CSV Files", { contentDir: "ch02/07-connecting-to-excel-and-csv", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792131723/ltv-tableau/connecting-to-excel-and-csv.mp4", durationLabel: "1 min 43 s" }),
      L(8, "connecting-to-sql-server", "Connecting Tableau to SQL Server", { contentDir: "ch02/08-connecting-to-sql-server", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792131774/ltv-tableau/connecting-to-sql-server.mp4", durationLabel: "1 min 41 s" }),
      L(9, "live-connections-vs-extracts", "Live Connections vs. Extracts", { contentDir: "ch02/09-live-connections-vs-extracts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792131821/ltv-tableau/live-connections-vs-extracts.mp4", durationLabel: "1 min 27 s" }),
      L(10, "creating-refreshing-managing-extracts", "Creating, Refreshing & Managing Extracts", { contentDir: "ch02/10-creating-refreshing-managing-extracts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792131872/ltv-tableau/creating-refreshing-managing-extracts.mp4", durationLabel: "1 min 40 s" }),
      L(11, "data-types-metadata-field-properties", "Data Types, Metadata & Field Properties", { contentDir: "ch02/11-data-types-metadata-field-properties", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792131926/ltv-tableau/data-types-metadata-field-properties.mp4", durationLabel: "1 min 46 s" }),
      L(12, "cleaning-data-interpreter-splits-pivots-nulls", "Cleaning Data: Data Interpreter, Splits, Pivots & NULLs", { contentDir: "ch02/12-cleaning-data-interpreter-splits-pivots-nulls", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792131989/ltv-tableau/cleaning-data-interpreter-splits-pivots-nulls.mp4", durationLabel: "2 min 4 s" }),
      L(13, "wide-vs-long-data", "Wide vs. Long Data & Preparing Data for Tableau", { contentDir: "ch02/13-wide-vs-long-data", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792132030/ltv-tableau/wide-vs-long-data.mp4", durationLabel: "1 min 23 s" }),
    ],
  },
  {
    n: 3,
    title: "Visualization Fundamentals",
    lessons: [
      L(14, "bar-charts-and-show-me", "Bar Charts & Using Show Me", { contentDir: "ch03/14-bar-charts-and-show-me", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792132076/ltv-tableau/bar-charts-and-show-me.mp4", durationLabel: "1 min 27 s" }),
      L(15, "line-and-area-charts", "Line Charts & Area Charts", { contentDir: "ch03/15-line-and-area-charts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792132121/ltv-tableau/line-and-area-charts.mp4", durationLabel: "1 min 31 s" }),
      L(16, "pie-donut-treemap-charts", "Pie, Donut & Tree Map Charts", { contentDir: "ch03/16-pie-donut-treemap-charts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792132174/ltv-tableau/pie-donut-treemap-charts.mp4", durationLabel: "1 min 48 s" }),
      L(17, "highlight-tables-and-heat-maps", "Highlight Tables & Heat Maps", { contentDir: "ch03/17-highlight-tables-and-heat-maps", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792132213/ltv-tableau/highlight-tables-and-heat-maps.mp4", durationLabel: "1 min 15 s" }),
      L(18, "scatter-plots", "Scatter Plots", { contentDir: "ch03/18-scatter-plots", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792132255/ltv-tableau/scatter-plots.mp4", durationLabel: "1 min 20 s" }),
      L(19, "histograms-bins-distributions", "Histograms, Bins & Distributions", { contentDir: "ch03/19-histograms-bins-distributions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792132296/ltv-tableau/histograms-bins-distributions.mp4", durationLabel: "1 min 21 s" }),
      L(20, "box-and-whisker-plots", "Box-and-Whisker Plots", { contentDir: "ch03/20-box-and-whisker-plots", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792132339/ltv-tableau/box-and-whisker-plots.mp4", durationLabel: "1 min 26 s" }),
      L(21, "choosing-the-right-visualization", "Choosing the Right Visualization", { contentDir: "ch03/21-choosing-the-right-visualization", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792132383/ltv-tableau/choosing-the-right-visualization.mp4", durationLabel: "1 min 29 s" }),
    ],
  },
  {
    n: 4,
    title: "Formatting & Visual Design",
    lessons: [
      L(22, "the-marks-card", "The Marks Card: Color, Size, Detail & Shape", { contentDir: "ch04/22-the-marks-card", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792132439/ltv-tableau/the-marks-card.mp4", durationLabel: "1 min 52 s" }),
      L(23, "labels-tooltips-viz-in-tooltip", "Labels, Tooltips & Viz in Tooltip", { contentDir: "ch04/23-labels-tooltips-viz-in-tooltip", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792132493/ltv-tableau/labels-tooltips-viz-in-tooltip.mp4", durationLabel: "1 min 52 s" }),
      L(24, "formatting-numbers-dates-axes-headers", "Formatting Numbers, Dates, Axes & Headers", { contentDir: "ch04/24-formatting-numbers-dates-axes-headers", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792132553/ltv-tableau/formatting-numbers-dates-axes-headers.mp4", durationLabel: "1 min 58 s" }),
      L(25, "titles-captions-reference-lines-annotations", "Titles, Captions, Reference Lines & Annotations", { contentDir: "ch04/25-titles-captions-reference-lines-annotations", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792132608/ltv-tableau/titles-captions-reference-lines-annotations.mp4", durationLabel: "1 min 50 s" }),
      L(26, "professional-design-avoiding-clutter", "Professional Visualization Design & Avoiding Clutter", { contentDir: "ch04/26-professional-design-avoiding-clutter", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792132669/ltv-tableau/professional-design-avoiding-clutter.mp4", durationLabel: "1 min 58 s" }),
    ],
  },
  {
    n: 5,
    title: "Filters, Sorting & Analytics",
    lessons: [
      L(27, "sorting-basic-and-quick-filters", "Sorting, Basic Filters & Quick Filters", { contentDir: "ch05/27-sorting-basic-and-quick-filters", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792132719/ltv-tableau/sorting-basic-and-quick-filters.mp4", durationLabel: "1 min 35 s" }),
      L(28, "dimension-measure-date-filters", "Dimension, Measure & Date Filters", { contentDir: "ch05/28-dimension-measure-date-filters", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792132761/ltv-tableau/dimension-measure-date-filters.mp4", durationLabel: "1 min 18 s" }),
      L(29, "relative-dates-top-n-conditional-filters", "Relative Dates, Top N & Conditional Filters", { contentDir: "ch05/29-relative-dates-top-n-conditional-filters", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792132813/ltv-tableau/relative-dates-top-n-conditional-filters.mp4", durationLabel: "1 min 35 s" }),
      L(30, "context-filters", "Context Filters", { contentDir: "ch05/30-context-filters", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792132856/ltv-tableau/context-filters.mp4", durationLabel: "1 min 13 s" }),
      L(31, "tableaus-order-of-operations", "Understanding Tableau's Order of Operations", { contentDir: "ch05/31-tableaus-order-of-operations", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792132890/ltv-tableau/tableaus-order-of-operations.mp4", durationLabel: "59 s" }),
      L(32, "analytics-pane-trend-lines-forecasting", "Analytics Pane: Trend Lines, Forecasting & Reference Lines", { contentDir: "ch05/32-analytics-pane-trend-lines-forecasting", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792132939/ltv-tableau/analytics-pane-trend-lines-forecasting.mp4", durationLabel: "1 min 30 s" }),
    ],
  },
  {
    n: 6,
    title: "Calculated Fields",
    lessons: [
      L(33, "intro-to-calculated-fields", "Introduction to Calculated Fields", { contentDir: "ch06/33-intro-to-calculated-fields", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792133017/ltv-tableau/intro-to-calculated-fields.mp4", durationLabel: "2 min 34 s" }),
      L(34, "arithmetic-and-kpi-calculations", "Arithmetic & KPI Calculations", { contentDir: "ch06/34-arithmetic-and-kpi-calculations", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792133095/ltv-tableau/arithmetic-and-kpi-calculations.mp4", durationLabel: "2 min 41 s" }),
      L(35, "string-calculations", "String Calculations", { contentDir: "ch06/35-string-calculations", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792133162/ltv-tableau/string-calculations.mp4", durationLabel: "2 min 19 s" }),
      L(36, "date-calculations", "Date Calculations", { contentDir: "ch06/36-date-calculations", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792133231/ltv-tableau/date-calculations.mp4", durationLabel: "2 min 23 s" }),
      L(37, "if-then-else-case", "IF, THEN, ELSE & CASE", { contentDir: "ch06/37-if-then-else-case", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792133298/ltv-tableau/if-then-else-case.mp4", durationLabel: "2 min 25 s" }),
      L(38, "null-handling-and-data-type-calculations", "NULL Handling & Data-Type Calculations", { contentDir: "ch06/38-null-handling-and-data-type-calculations", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792133367/ltv-tableau/null-handling-and-data-type-calculations.mp4", durationLabel: "2 min 15 s" }),
      L(39, "aggregate-vs-non-aggregate-calculations", "Aggregate vs. Non-Aggregate Calculations & Common Errors", { contentDir: "ch06/39-aggregate-vs-non-aggregate-calculations", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792133450/ltv-tableau/aggregate-vs-non-aggregate-calculations.mp4", durationLabel: "2 min 57 s" }),
    ],
  },
  {
    n: 7,
    title: "Time Series & Table Calculations",
    lessons: [
      L(40, "dates-year-quarter-month-week-day", "Dates: Year, Quarter, Month, Week & Day", { contentDir: "ch07/40-dates-year-quarter-month-week-day", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792133501/ltv-tableau/dates-year-quarter-month-week-day.mp4", durationLabel: "1 min 44 s" }),
      L(41, "continuous-vs-discrete-dates", "Continuous vs. Discrete Dates & Time-Series Analysis", { contentDir: "ch07/41-continuous-vs-discrete-dates", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792133556/ltv-tableau/continuous-vs-discrete-dates.mp4", durationLabel: "1 min 54 s" }),
      L(42, "intro-to-table-calculations", "Introduction to Table Calculations", { contentDir: "ch07/42-intro-to-table-calculations", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792133598/ltv-tableau/intro-to-table-calculations.mp4", durationLabel: "1 min 24 s" }),
      L(43, "percent-of-total-difference-percent-difference", "Percent of Total, Difference & Percent Difference", { contentDir: "ch07/43-percent-of-total-difference-percent-difference", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792133645/ltv-tableau/percent-of-total-difference-percent-difference.mp4", durationLabel: "1 min 36 s" }),
      L(44, "running-totals-and-moving-averages", "Running Totals & Moving Averages", { contentDir: "ch07/44-running-totals-and-moving-averages", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792133688/ltv-tableau/running-totals-and-moving-averages.mp4", durationLabel: "1 min 26 s" }),
      L(45, "rank-and-quick-table-calculations", "Rank & Other Quick Table Calculations", { contentDir: "ch07/45-rank-and-quick-table-calculations", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792133738/ltv-tableau/rank-and-quick-table-calculations.mp4", durationLabel: "1 min 43 s" }),
      L(46, "compute-using-addressing-partitioning", "Compute Using: Addressing & Partitioning", { contentDir: "ch07/46-compute-using-addressing-partitioning", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792133794/ltv-tableau/compute-using-addressing-partitioning.mp4", durationLabel: "1 min 49 s" }),
    ],
  },
  {
    n: 8,
    title: "Data Modeling",
    lessons: [
      L(47, "tableaus-data-model", "Understanding Tableau's Data Model", { contentDir: "ch08/47-tableaus-data-model", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792133836/ltv-tableau/tableaus-data-model.mp4", durationLabel: "1 min 22 s" }),
      L(48, "relationships-vs-joins", "Relationships vs. Joins", { contentDir: "ch08/48-relationships-vs-joins", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792133876/ltv-tableau/relationships-vs-joins.mp4", durationLabel: "1 min 12 s" }),
      L(49, "creating-joins-and-multi-field-joins", "Creating Joins & Joining on Multiple Fields", { contentDir: "ch08/49-creating-joins-and-multi-field-joins", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792133915/ltv-tableau/creating-joins-and-multi-field-joins.mp4", durationLabel: "1 min 16 s" }),
      L(50, "duplicate-records-granularity-join-problems", "Duplicate Records, Granularity & Join Problems", { contentDir: "ch08/50-duplicate-records-granularity-join-problems", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792133955/ltv-tableau/duplicate-records-granularity-join-problems.mp4", durationLabel: "1 min 17 s" }),
      L(51, "unions-combining-data-vertically", "Unions & Combining Data Vertically", { contentDir: "ch08/51-unions-combining-data-vertically", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792133992/ltv-tableau/unions-combining-data-vertically.mp4", durationLabel: "1 min 10 s" }),
      L(52, "data-blending-cross-database-analysis", "Data Blending & Cross-Database Analysis", { contentDir: "ch08/52-data-blending-cross-database-analysis", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792134028/ltv-tableau/data-blending-cross-database-analysis.mp4", durationLabel: "1 min 5 s" }),
      L(53, "relationships-vs-joins-vs-blending", "Relationships vs. Joins vs. Blending — Which Should You Use?", { contentDir: "ch08/53-relationships-vs-joins-vs-blending", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792134068/ltv-tableau/relationships-vs-joins-vs-blending.mp4", durationLabel: "1 min 16 s" }),
    ],
  },
  {
    n: 9,
    title: "Maps & Geographic Analysis",
    lessons: [
      L(54, "geographic-roles-and-creating-maps", "Geographic Roles & Creating Maps", { contentDir: "ch09/54-geographic-roles-and-creating-maps", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792134106/ltv-tableau/geographic-roles-and-creating-maps.mp4", durationLabel: "1 min 9 s" }),
      L(55, "symbol-maps-vs-filled-maps", "Symbol Maps vs. Filled Maps", { contentDir: "ch09/55-symbol-maps-vs-filled-maps", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792134151/ltv-tableau/symbol-maps-vs-filled-maps.mp4", durationLabel: "1 min 21 s" }),
      L(56, "fixing-geographic-data-errors", "Fixing Geographic Data Errors", { contentDir: "ch09/56-fixing-geographic-data-errors", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792134196/ltv-tableau/fixing-geographic-data-errors.mp4", durationLabel: "1 min 21 s" }),
      L(57, "geographic-hierarchies-groups-custom-territories", "Geographic Hierarchies, Groups & Custom Territories", { contentDir: "ch09/57-geographic-hierarchies-groups-custom-territories", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792134235/ltv-tableau/geographic-hierarchies-groups-custom-territories.mp4", durationLabel: "1 min 14 s" }),
      L(58, "spatial-data-and-advanced-mapping", "Spatial Data & Advanced Mapping", { contentDir: "ch09/58-spatial-data-and-advanced-mapping", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792134278/ltv-tableau/spatial-data-and-advanced-mapping.mp4", durationLabel: "1 min 18 s" }),
    ],
  },
  {
    n: 10,
    title: "Groups, Sets, Bins & Hierarchies",
    lessons: [
      L(59, "groups-and-hierarchies", "Groups & Hierarchies", { contentDir: "ch10/59-groups-and-hierarchies", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792134343/ltv-tableau/groups-and-hierarchies.mp4", durationLabel: "1 min 59 s" }),
      L(60, "sets-and-dynamic-sets", "Sets & Dynamic Sets", { contentDir: "ch10/60-sets-and-dynamic-sets", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792134405/ltv-tableau/sets-and-dynamic-sets.mp4", durationLabel: "1 min 58 s" }),
      L(61, "combined-sets-and-set-analysis", "Combined Sets & Set Analysis", { contentDir: "ch10/61-combined-sets-and-set-analysis", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792134459/ltv-tableau/combined-sets-and-set-analysis.mp4", durationLabel: "1 min 43 s" }),
      L(62, "bins-distributions-segmentation", "Bins, Distributions & Segmentation", { contentDir: "ch10/62-bins-distributions-segmentation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792134515/ltv-tableau/bins-distributions-segmentation.mp4", durationLabel: "1 min 50 s" }),
    ],
  },
  {
    n: 11,
    title: "Parameters",
    lessons: [
      L(63, "understanding-and-creating-parameters", "Understanding & Creating Parameters", { contentDir: "ch11/63-understanding-and-creating-parameters", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792134563/ltv-tableau/understanding-and-creating-parameters.mp4", durationLabel: "1 min 37 s" }),
      L(64, "parameters-with-calculated-fields", "Parameters with Calculated Fields", { contentDir: "ch11/64-parameters-with-calculated-fields", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792134613/ltv-tableau/parameters-with-calculated-fields.mp4", durationLabel: "1 min 39 s" }),
      L(65, "dynamic-measure-and-dimension-selection", "Dynamic Measure & Dimension Selection", { contentDir: "ch11/65-dynamic-measure-and-dimension-selection", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792134661/ltv-tableau/dynamic-measure-and-dimension-selection.mp4", durationLabel: "1 min 33 s" }),
      L(66, "what-if-analysis-with-parameters", "What-If Analysis with Parameters", { contentDir: "ch11/66-what-if-analysis-with-parameters", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792134716/ltv-tableau/what-if-analysis-with-parameters.mp4", durationLabel: "1 min 43 s" }),
      L(67, "parameter-actions-and-interactive-analysis", "Parameter Actions & Interactive Analysis", { contentDir: "ch11/67-parameter-actions-and-interactive-analysis", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792134768/ltv-tableau/parameter-actions-and-interactive-analysis.mp4", durationLabel: "1 min 44 s" }),
    ],
  },
  {
    n: 12,
    title: "Level of Detail Expressions",
    lessons: [
      L(68, "understanding-lod-expressions", "Understanding Level of Detail Expressions", { contentDir: "ch12/68-understanding-lod-expressions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792134816/ltv-tableau/understanding-lod-expressions.mp4", durationLabel: "1 min 34 s" }),
      L(69, "fixed-lod", "FIXED LOD", { contentDir: "ch12/69-fixed-lod", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792134864/ltv-tableau/fixed-lod.mp4", durationLabel: "1 min 37 s" }),
      L(70, "include-and-exclude-lod", "INCLUDE & EXCLUDE LOD", { contentDir: "ch12/70-include-and-exclude-lod" }),
      L(71, "lod-expressions-and-filters", "LOD Expressions and Filters", { contentDir: "ch12/71-lod-expressions-and-filters" }),
      L(72, "lod-vs-table-calculations", "LOD vs. Table Calculations", { contentDir: "ch12/72-lod-vs-table-calculations" }),
      L(73, "real-world-lod-analysis", "Real-World LOD Analysis: Customer Lifetime Sales & First Purchase", { contentDir: "ch12/73-real-world-lod-analysis" }),
    ],
  },
  {
    n: 13,
    title: "Advanced Visualizations",
    lessons: [
      L(74, "dual-axis-and-combined-axis-charts", "Dual-Axis & Combined-Axis Charts", { contentDir: "ch13/74-dual-axis-and-combined-axis-charts" }),
      L(75, "kpi-cards-bullet-charts-sparklines", "KPI Cards, Bullet Charts & Sparklines", { contentDir: "ch13/75-kpi-cards-bullet-charts-sparklines" }),
      L(76, "waterfall-funnel-pareto-charts", "Waterfall, Funnel & Pareto Charts", { contentDir: "ch13/76-waterfall-funnel-pareto-charts" }),
      L(77, "advanced-reference-lines-bands-dynamic-targets", "Advanced Reference Lines, Bands & Dynamic Targets", { contentDir: "ch13/77-advanced-reference-lines-bands-dynamic-targets" }),
      L(78, "advanced-chart-challenge", "Advanced Chart Challenge", { contentDir: "ch13/78-advanced-chart-challenge" }),
    ],
  },
  {
    n: 14,
    title: "Dashboards",
    lessons: [
      L(79, "your-first-professional-dashboard", "Building Your First Professional Dashboard", { contentDir: "ch14/79-your-first-professional-dashboard" }),
      L(80, "dashboard-layout-containers-tiled-floating", "Dashboard Layout: Containers, Tiled & Floating Objects", { contentDir: "ch14/80-dashboard-layout-containers-tiled-floating" }),
      L(81, "kpi-headers-and-executive-summary", "Building KPI Headers & Executive Summary Sections", { contentDir: "ch14/81-kpi-headers-and-executive-summary" }),
      L(82, "filter-and-highlight-actions", "Filter & Highlight Actions", { contentDir: "ch14/82-filter-and-highlight-actions" }),
      L(83, "url-parameter-and-set-actions", "URL, Parameter & Set Actions", { contentDir: "ch14/83-url-parameter-and-set-actions" }),
      L(84, "navigation-show-hide-dynamic-titles", "Navigation, Show/Hide Containers & Dynamic Titles", { contentDir: "ch14/84-navigation-show-hide-dynamic-titles" }),
      L(85, "designing-for-desktop-and-mobile", "Designing Dashboards for Desktop & Mobile", { contentDir: "ch14/85-designing-for-desktop-and-mobile" }),
      L(86, "dashboard-design-storytelling-performance", "Dashboard Design, Storytelling & Performance", { contentDir: "ch14/86-dashboard-design-storytelling-performance" }),
    ],
  },
  {
    n: 15,
    title: "Tableau Server, Cloud & Public",
    lessons: [
      L(87, "desktop-vs-public-vs-cloud-vs-server", "Tableau Desktop vs. Public vs. Cloud vs. Server", { contentDir: "ch15/87-desktop-vs-public-vs-cloud-vs-server" }),
      L(88, "publishing-workbooks-data-sources-dashboards", "Publishing Workbooks, Data Sources & Dashboards", { contentDir: "ch15/88-publishing-workbooks-data-sources-dashboards" }),
      L(89, "permissions-refreshes-subscriptions-alerts", "Permissions, Refreshes, Subscriptions, Alerts & Sharing", { contentDir: "ch15/89-permissions-refreshes-subscriptions-alerts" }),
    ],
  },
  {
    n: 16,
    title: "Performance Optimization",
    lessons: [
      L(90, "troubleshooting-slow-workbooks", "Troubleshooting Slow Tableau Workbooks", { contentDir: "ch16/90-troubleshooting-slow-workbooks" }),
      L(91, "optimizing-extracts-queries-calculations-dashboards", "Optimizing Extracts, Queries, Calculations & Dashboards", { contentDir: "ch16/91-optimizing-extracts-queries-calculations-dashboards" }),
    ],
  },
  {
    n: 17,
    title: "Portfolio Projects",
    lessons: [
      L(92, "project-1-executive-sales-dashboard", "Project 1 — Executive Sales Dashboard", { contentDir: "ch17/92-project-1-executive-sales-dashboard" }),
      L(93, "project-2-customer-segmentation-dashboard", "Project 2 — Customer Segmentation Dashboard", { contentDir: "ch17/93-project-2-customer-segmentation-dashboard" }),
      L(94, "project-3-enterprise-performance-dashboard", "Project 3 — Enterprise Performance Dashboard", { contentDir: "ch17/94-project-3-enterprise-performance-dashboard" }),
    ],
  },
  {
    n: 18,
    title: "Interview & Portfolio",
    lessons: [
      L(95, "tableau-interview-prep-and-portfolio-strategy", "Tableau Interview Preparation & Portfolio Strategy", { contentDir: "ch18/95-tableau-interview-prep-and-portfolio-strategy" }),
    ],
  },
];
