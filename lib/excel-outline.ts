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
      L(2, "data-types-and-formatting", "Data Types & Formatting"),
      L(3, "excel-tables", "Excel Tables"),
      L(4, "named-ranges", "Named Ranges"),
    ],
  },
  {
    n: 2,
    title: "Lookup & Reference Functions",
    lessons: [
      L(5, "vlookup-vs-xlookup", "VLOOKUP vs. XLOOKUP"),
      L(6, "index-match", "INDEX/MATCH"),
      L(7, "combining-lookups", "Combining Lookups"),
      L(8, "error-handling-with-iferror", "Error Handling With IFERROR"),
    ],
  },
  {
    n: 3,
    title: "Aggregation & Logic Functions",
    lessons: [
      L(9, "sumifs-countifs-averageifs", "SUMIFS, COUNTIFS & AVERAGEIFS"),
      L(10, "if-and-nested-if", "IF & Nested IF"),
      L(11, "logical-functions-and-or-ifs", "Logical Functions: AND, OR & IFS"),
      L(12, "date-and-text-functions", "Date & Text Functions"),
    ],
  },
  {
    n: 4,
    title: "PivotTables & PivotCharts",
    lessons: [
      L(13, "building-a-pivottable", "Building a PivotTable"),
      L(14, "pivottable-calculated-fields", "PivotTable Calculated Fields"),
      L(15, "slicers-and-timelines", "Slicers & Timelines"),
      L(16, "pivotcharts", "PivotCharts"),
    ],
  },
  {
    n: 5,
    title: "Dynamic Arrays & Modern Excel",
    lessons: [
      L(17, "dynamic-array-functions", "Dynamic Array Functions"),
      L(18, "filter-sort-unique", "FILTER, SORT & UNIQUE"),
      L(19, "spilled-ranges", "Spilled Ranges"),
      L(20, "the-let-function", "The LET Function"),
    ],
  },
  {
    n: 6,
    title: "Power Query in Excel",
    lessons: [
      L(21, "power-query-basics", "Power Query Basics"),
      L(22, "cleaning-data-with-power-query", "Cleaning Data With Power Query"),
      L(23, "combining-and-appending-queries", "Combining & Appending Queries"),
    ],
  },
  {
    n: 7,
    title: "Charts & Data Analysis",
    lessons: [
      L(24, "choosing-the-right-chart", "Choosing the Right Chart"),
      L(25, "what-if-analysis-and-goal-seek", "What-If Analysis & Goal Seek"),
    ],
  },
];
