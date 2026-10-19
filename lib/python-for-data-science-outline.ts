// The Python for Data Science course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Step 2 of the Data Scientist path. Teaches Python from the ground up but only what data work needs; distinct from Python for AI Engineering, which targets APIs, async, and OOP. Assumes T-SQL Development from step 1.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/python-for-data-science/
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

export const PYTHON_FOR_DATA_SCIENCE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Python Essentials for Data Work",
    lessons: [
      L(1, "setting-up-python-and-environments", "Setting Up Python & Environments", { contentDir: "ch01/01-setting-up-python-and-environments", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792407873/ltv-python-for-data-science/setting-up-python-and-environments.mp4", durationLabel: "3 min 19 s" }),
      L(2, "jupyter-notebooks", "Jupyter Notebooks", { contentDir: "ch01/02-jupyter-notebooks", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792408211/ltv-python-for-data-science/jupyter-notebooks.mp4", durationLabel: "3 min 32 s" }),
      L(3, "variables-types-and-control-flow", "Variables, Types & Control Flow", { contentDir: "ch01/03-variables-types-and-control-flow", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792408603/ltv-python-for-data-science/variables-types-and-control-flow.mp4", durationLabel: "4 min 5 s" }),
      L(4, "functions-and-comprehensions", "Functions & Comprehensions", { contentDir: "ch01/04-functions-and-comprehensions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792409067/ltv-python-for-data-science/functions-and-comprehensions.mp4", durationLabel: "4 min 6 s" }),
      L(5, "core-data-structures", "Core Data Structures", { contentDir: "ch01/05-core-data-structures", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792409524/ltv-python-for-data-science/core-data-structures.mp4", durationLabel: "3 min 50 s" }),
      L(6, "errors-and-debugging", "Errors & Debugging", { contentDir: "ch01/06-errors-and-debugging", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792409938/ltv-python-for-data-science/errors-and-debugging.mp4", durationLabel: "3 min 55 s" }),
    ],
  },
  {
    n: 2,
    title: "NumPy",
    lessons: [
      L(7, "arrays-and-vectorization", "Arrays & Vectorization", { contentDir: "ch02/07-arrays-and-vectorization", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792410406/ltv-python-for-data-science/arrays-and-vectorization.mp4", durationLabel: "4 min 21 s" }),
      L(8, "indexing-slicing-and-broadcasting", "Indexing, Slicing & Broadcasting", { contentDir: "ch02/08-indexing-slicing-and-broadcasting", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792410932/ltv-python-for-data-science/indexing-slicing-and-broadcasting.mp4", durationLabel: "4 min 29 s" }),
      L(9, "math-and-statistics-with-numpy", "Math & Statistics With NumPy", { contentDir: "ch02/09-math-and-statistics-with-numpy", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792411500/ltv-python-for-data-science/math-and-statistics-with-numpy.mp4", durationLabel: "5 min 12 s" }),
      L(10, "random-numbers-and-simulation", "Random Numbers & Simulation", { contentDir: "ch02/10-random-numbers-and-simulation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792412072/ltv-python-for-data-science/random-numbers-and-simulation.mp4", durationLabel: "5 min 15 s" }),
    ],
  },
  {
    n: 3,
    title: "pandas Fundamentals",
    lessons: [
      L(11, "series-and-dataframes", "Series & DataFrames", { contentDir: "ch03/11-series-and-dataframes", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792412560/ltv-python-for-data-science/series-and-dataframes.mp4", durationLabel: "3 min 28 s" }),
      L(12, "loading-and-inspecting-data", "Loading & Inspecting Data", { contentDir: "ch03/12-loading-and-inspecting-data", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792412968/ltv-python-for-data-science/loading-and-inspecting-data.mp4", durationLabel: "3 min 31 s" }),
      L(13, "selecting-and-filtering", "Selecting & Filtering", { contentDir: "ch03/13-selecting-and-filtering", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792413406/ltv-python-for-data-science/selecting-and-filtering.mp4", durationLabel: "4 min 7 s" }),
      L(14, "creating-and-transforming-columns", "Creating & Transforming Columns", { contentDir: "ch03/14-creating-and-transforming-columns", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792413930/ltv-python-for-data-science/creating-and-transforming-columns.mp4", durationLabel: "4 min 30 s" }),
      L(15, "sorting-ranking-and-value-counts", "Sorting, Ranking & Value Counts", { contentDir: "ch03/15-sorting-ranking-and-value-counts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792414418/ltv-python-for-data-science/sorting-ranking-and-value-counts.mp4", durationLabel: "4 min 8 s" }),
      L(16, "handling-dates-and-times", "Handling Dates & Times", { contentDir: "ch03/16-handling-dates-and-times", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792414900/ltv-python-for-data-science/handling-dates-and-times.mp4", durationLabel: "4 min 14 s" }),
    ],
  },
  {
    n: 4,
    title: "pandas in Depth",
    lessons: [
      L(17, "groupby-and-aggregation", "GroupBy & Aggregation", { contentDir: "ch04/17-groupby-and-aggregation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792415587/ltv-python-for-data-science/groupby-and-aggregation.mp4", durationLabel: "4 min 24 s" }),
      L(18, "merging-joining-and-concatenating", "Merging, Joining & Concatenating", { contentDir: "ch04/18-merging-joining-and-concatenating", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792416356/ltv-python-for-data-science/merging-joining-and-concatenating.mp4", durationLabel: "4 min 57 s" }),
      L(19, "reshaping-pivot-and-melt", "Reshaping: Pivot & Melt", { contentDir: "ch04/19-reshaping-pivot-and-melt", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792417052/ltv-python-for-data-science/reshaping-pivot-and-melt.mp4", durationLabel: "4 min 25 s" }),
      L(20, "window-and-rolling-operations", "Window & Rolling Operations", { contentDir: "ch04/20-window-and-rolling-operations" }),
      L(21, "working-with-text-data", "Working With Text Data", { contentDir: "ch04/21-working-with-text-data" }),
    ],
  },
  {
    n: 5,
    title: "Data Cleaning",
    lessons: [
      L(22, "missing-data-diagnosis-and-handling", "Missing Data: Diagnosis & Handling", { contentDir: "ch05/22-missing-data-diagnosis-and-handling" }),
      L(23, "duplicates-and-inconsistent-records", "Duplicates & Inconsistent Records", { contentDir: "ch05/23-duplicates-and-inconsistent-records" }),
      L(24, "data-type-problems-and-parsing", "Data Type Problems & Parsing", { contentDir: "ch05/24-data-type-problems-and-parsing" }),
      L(25, "outliers", "Outliers", { contentDir: "ch05/25-outliers" }),
      L(26, "data-validation-checks", "Data Validation Checks", { contentDir: "ch05/26-data-validation-checks" }),
    ],
  },
  {
    n: 6,
    title: "Files, Databases & APIs",
    lessons: [
      L(27, "reading-and-writing-csv-excel-and-json", "Reading & Writing CSV, Excel & JSON", { contentDir: "ch06/27-reading-and-writing-csv-excel-and-json" }),
      L(28, "querying-sql-databases-from-python", "Querying SQL Databases From Python", { contentDir: "ch06/28-querying-sql-databases-from-python" }),
      L(29, "pulling-data-from-apis", "Pulling Data From APIs", { contentDir: "ch06/29-pulling-data-from-apis" }),
      L(30, "web-scraping-basics", "Web Scraping Basics", { contentDir: "ch06/30-web-scraping-basics" }),
    ],
  },
  {
    n: 7,
    title: "Writing Reliable Data Code",
    lessons: [
      L(31, "clean-code-for-notebooks", "Clean Code for Notebooks", { contentDir: "ch07/31-clean-code-for-notebooks" }),
      L(32, "refactoring-notebooks-into-scripts", "Refactoring Notebooks Into Scripts", { contentDir: "ch07/32-refactoring-notebooks-into-scripts" }),
      L(33, "testing-data-code", "Testing Data Code", { contentDir: "ch07/33-testing-data-code" }),
      L(34, "reproducibility", "Reproducibility", { contentDir: "ch07/34-reproducibility" }),
    ],
  },
  {
    n: 8,
    title: "Capstone",
    lessons: [
      L(35, "capstone-kickoff-clean-and-analyze-a-real-dataset-in-python", "Capstone Kickoff: Clean and Analyze a Real Dataset in Python", { contentDir: "ch08/35-capstone-kickoff-clean-and-analyze-a-real-dataset-in-python" }),
      L(36, "capstone-build-it", "Capstone: Build It", { contentDir: "ch08/36-capstone-build-it" }),
      L(37, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch08/37-capstone-wrap-up-and-portfolio-presentation" }),
    ],
  },
];
