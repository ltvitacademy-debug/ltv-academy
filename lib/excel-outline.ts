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
      L(1, "interface-and-shortcuts-for-speed", "Interface & Shortcuts for Speed", { contentDir: "ch01/01-interface-and-shortcuts-for-speed", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792117781/ltv-advanced-excel/interface-and-shortcuts-for-speed.mp4", durationLabel: "1 min 16 s" }),
      L(2, "data-types-and-formatting", "Data Types & Formatting", { contentDir: "ch01/02-data-types-and-formatting", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792117824/ltv-advanced-excel/data-types-and-formatting.mp4", durationLabel: "1 min 26 s" }),
      L(3, "excel-tables", "Excel Tables", { contentDir: "ch01/03-excel-tables", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792117863/ltv-advanced-excel/excel-tables.mp4", durationLabel: "1 min 14 s" }),
      L(4, "named-ranges", "Named Ranges", { contentDir: "ch01/04-named-ranges", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792117900/ltv-advanced-excel/named-ranges.mp4", durationLabel: "1 min 7 s" }),
    ],
  },
  {
    n: 2,
    title: "Lookup & Reference Functions",
    lessons: [
      L(5, "vlookup-vs-xlookup", "VLOOKUP vs. XLOOKUP", { contentDir: "ch02/05-vlookup-vs-xlookup", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792117942/ltv-advanced-excel/vlookup-vs-xlookup.mp4", durationLabel: "1 min 23 s" }),
      L(6, "index-match", "INDEX/MATCH", { contentDir: "ch02/06-index-match", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792117981/ltv-advanced-excel/index-match.mp4", durationLabel: "1 min 20 s" }),
      L(7, "combining-lookups", "Combining Lookups", { contentDir: "ch02/07-combining-lookups", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792118021/ltv-advanced-excel/combining-lookups.mp4", durationLabel: "1 min 20 s" }),
      L(8, "error-handling-with-iferror", "Error Handling With IFERROR", { contentDir: "ch02/08-error-handling-with-iferror", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792118059/ltv-advanced-excel/error-handling-with-iferror.mp4", durationLabel: "1 min 11 s" }),
    ],
  },
  {
    n: 3,
    title: "Aggregation & Logic Functions",
    lessons: [
      L(9, "sumifs-countifs-averageifs", "SUMIFS, COUNTIFS & AVERAGEIFS", { contentDir: "ch03/09-sumifs-countifs-averageifs", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792118094/ltv-advanced-excel/sumifs-countifs-averageifs.mp4", durationLabel: "1 min 9 s" }),
      L(10, "if-and-nested-if", "IF & Nested IF", { contentDir: "ch03/10-if-and-nested-if", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792118130/ltv-advanced-excel/if-and-nested-if.mp4", durationLabel: "1 min 14 s" }),
      L(11, "logical-functions-and-or-ifs", "Logical Functions: AND, OR & IFS", { contentDir: "ch03/11-logical-functions-and-or-ifs", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792118164/ltv-advanced-excel/logical-functions-and-or-ifs.mp4", durationLabel: "1 min 5 s" }),
      L(12, "date-and-text-functions", "Date & Text Functions", { contentDir: "ch03/12-date-and-text-functions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792118202/ltv-advanced-excel/date-and-text-functions.mp4", durationLabel: "1 min 16 s" }),
    ],
  },
  {
    n: 4,
    title: "PivotTables & PivotCharts",
    lessons: [
      L(13, "building-a-pivottable", "Building a PivotTable", { contentDir: "ch04/13-building-a-pivottable", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792118246/ltv-advanced-excel/building-a-pivottable.mp4", durationLabel: "1 min 27 s" }),
      L(14, "pivottable-calculated-fields", "PivotTable Calculated Fields", { contentDir: "ch04/14-pivottable-calculated-fields", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792118289/ltv-advanced-excel/pivottable-calculated-fields.mp4", durationLabel: "1 min 24 s" }),
      L(15, "slicers-and-timelines", "Slicers & Timelines", { contentDir: "ch04/15-slicers-and-timelines", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792118827/ltv-advanced-excel/slicers-and-timelines.mp4", durationLabel: "1 min 19 s" }),
      L(16, "pivotcharts", "PivotCharts", { contentDir: "ch04/16-pivotcharts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792118317/ltv-advanced-excel/pivotcharts.mp4", durationLabel: "51 s" }),
    ],
  },
  {
    n: 5,
    title: "Dynamic Arrays & Modern Excel",
    lessons: [
      L(17, "dynamic-array-functions", "Dynamic Array Functions", { contentDir: "ch05/17-dynamic-array-functions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792118358/ltv-advanced-excel/dynamic-array-functions.mp4", durationLabel: "1 min 21 s" }),
      L(18, "filter-sort-unique", "FILTER, SORT & UNIQUE", { contentDir: "ch05/18-filter-sort-unique", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792118893/ltv-advanced-excel/filter-sort-unique.mp4", durationLabel: "2 min 17 s" }),
      L(19, "spilled-ranges", "Spilled Ranges", { contentDir: "ch05/19-spilled-ranges", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792118406/ltv-advanced-excel/spilled-ranges.mp4", durationLabel: "1 min 26 s" }),
      L(20, "the-let-function", "The LET Function", { contentDir: "ch05/20-the-let-function", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792118456/ltv-advanced-excel/the-let-function.mp4", durationLabel: "1 min 42 s" }),
    ],
  },
  {
    n: 6,
    title: "Power Query in Excel",
    lessons: [
      L(21, "power-query-basics", "Power Query Basics", { contentDir: "ch06/21-power-query-basics", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792118515/ltv-advanced-excel/power-query-basics.mp4", durationLabel: "1 min 60 s" }),
      L(22, "cleaning-data-with-power-query", "Cleaning Data With Power Query", { contentDir: "ch06/22-cleaning-data-with-power-query", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792118567/ltv-advanced-excel/cleaning-data-with-power-query.mp4", durationLabel: "1 min 44 s" }),
      L(23, "combining-and-appending-queries", "Combining & Appending Queries", { contentDir: "ch06/23-combining-and-appending-queries", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792118617/ltv-advanced-excel/combining-and-appending-queries.mp4", durationLabel: "1 min 42 s" }),
    ],
  },
  {
    n: 7,
    title: "Charts & Data Analysis",
    lessons: [
      L(24, "choosing-the-right-chart", "Choosing the Right Chart", { contentDir: "ch07/24-choosing-the-right-chart", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792118669/ltv-advanced-excel/choosing-the-right-chart.mp4", durationLabel: "1 min 45 s" }),
      L(25, "what-if-analysis-and-goal-seek", "What-If Analysis & Goal Seek", { contentDir: "ch07/25-what-if-analysis-and-goal-seek", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792118727/ltv-advanced-excel/what-if-analysis-and-goal-seek.mp4", durationLabel: "1 min 58 s" }),
    ],
  },
];
