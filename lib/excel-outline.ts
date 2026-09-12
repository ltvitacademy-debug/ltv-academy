// The full Advanced Excel for Data Analysts course outline. Only lessons
// with a contentDir + videoUrl are playable; everything else renders as
// "in production". A focused module, not a 100-video Excel monster —
// PivotTables, lookups, dynamic arrays, and Power Query, aimed squarely at
// analyst work.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/excel/
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

export const EXCEL_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Excel Fundamentals Refresher",
    lessons: [
      L(1, "interface-and-shortcuts-for-speed", "Interface & Shortcuts for Speed", { contentDir: "ch01/01-interface-and-shortcuts-for-speed" }),
      L(2, "data-types-and-formatting", "Data Types & Formatting", { contentDir: "ch01/02-data-types-and-formatting" }),
      L(3, "excel-tables", "Excel Tables", { contentDir: "ch01/03-excel-tables" }),
      L(4, "named-ranges", "Named Ranges", { contentDir: "ch01/04-named-ranges" }),
    ],
  },
  {
    n: 2,
    title: "Lookup & Reference Functions",
    lessons: [
      L(5, "vlookup-vs-xlookup", "VLOOKUP vs. XLOOKUP", { contentDir: "ch02/05-vlookup-vs-xlookup" }),
      L(6, "index-match", "INDEX/MATCH", { contentDir: "ch02/06-index-match" }),
      L(7, "combining-lookups", "Combining Lookups", { contentDir: "ch02/07-combining-lookups" }),
      L(8, "error-handling-with-iferror", "Error Handling With IFERROR", { contentDir: "ch02/08-error-handling-with-iferror" }),
    ],
  },
  {
    n: 3,
    title: "Aggregation & Logic Functions",
    lessons: [
      L(9, "sumifs-countifs-averageifs", "SUMIFS, COUNTIFS & AVERAGEIFS", { contentDir: "ch03/09-sumifs-countifs-averageifs" }),
      L(10, "if-and-nested-if", "IF & Nested IF", { contentDir: "ch03/10-if-and-nested-if" }),
      L(11, "logical-functions-and-or-ifs", "Logical Functions: AND, OR & IFS", { contentDir: "ch03/11-logical-functions-and-or-ifs" }),
      L(12, "date-and-text-functions", "Date & Text Functions", { contentDir: "ch03/12-date-and-text-functions" }),
    ],
  },
  {
    n: 4,
    title: "PivotTables & PivotCharts",
    lessons: [
      L(13, "building-a-pivottable", "Building a PivotTable", { contentDir: "ch04/13-building-a-pivottable" }),
      L(14, "pivottable-calculated-fields", "PivotTable Calculated Fields", { contentDir: "ch04/14-pivottable-calculated-fields" }),
      L(15, "slicers-and-timelines", "Slicers & Timelines", { contentDir: "ch04/15-slicers-and-timelines" }),
      L(16, "pivotcharts", "PivotCharts", { contentDir: "ch04/16-pivotcharts" }),
    ],
  },
  {
    n: 5,
    title: "Dynamic Arrays & Modern Excel",
    lessons: [
      L(17, "dynamic-array-functions", "Dynamic Array Functions", { contentDir: "ch05/17-dynamic-array-functions" }),
      L(18, "filter-sort-unique", "FILTER, SORT & UNIQUE", { contentDir: "ch05/18-filter-sort-unique" }),
      L(19, "spilled-ranges", "Spilled Ranges", { contentDir: "ch05/19-spilled-ranges" }),
      L(20, "the-let-function", "The LET Function", { contentDir: "ch05/20-the-let-function" }),
    ],
  },
  {
    n: 6,
    title: "Power Query in Excel",
    lessons: [
      L(21, "power-query-basics", "Power Query Basics", { contentDir: "ch06/21-power-query-basics" }),
      L(22, "cleaning-data-with-power-query", "Cleaning Data With Power Query", { contentDir: "ch06/22-cleaning-data-with-power-query" }),
      L(23, "combining-and-appending-queries", "Combining & Appending Queries", { contentDir: "ch06/23-combining-and-appending-queries" }),
    ],
  },
  {
    n: 7,
    title: "Charts & Data Analysis",
    lessons: [
      L(24, "choosing-the-right-chart", "Choosing the Right Chart", { contentDir: "ch07/24-choosing-the-right-chart" }),
      L(25, "what-if-analysis-and-goal-seek", "What-If Analysis & Goal Seek", { contentDir: "ch07/25-what-if-analysis-and-goal-seek" }),
    ],
  },
];
