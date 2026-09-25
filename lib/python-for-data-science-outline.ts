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
      L(1, "setting-up-python-and-environments", "Setting Up Python & Environments"),
      L(2, "jupyter-notebooks", "Jupyter Notebooks"),
      L(3, "variables-types-and-control-flow", "Variables, Types & Control Flow"),
      L(4, "functions-and-comprehensions", "Functions & Comprehensions"),
      L(5, "core-data-structures", "Core Data Structures"),
      L(6, "errors-and-debugging", "Errors & Debugging"),
    ],
  },
  {
    n: 2,
    title: "NumPy",
    lessons: [
      L(7, "arrays-and-vectorization", "Arrays & Vectorization"),
      L(8, "indexing-slicing-and-broadcasting", "Indexing, Slicing & Broadcasting"),
      L(9, "math-and-statistics-with-numpy", "Math & Statistics With NumPy"),
      L(10, "random-numbers-and-simulation", "Random Numbers & Simulation"),
    ],
  },
  {
    n: 3,
    title: "pandas Fundamentals",
    lessons: [
      L(11, "series-and-dataframes", "Series & DataFrames"),
      L(12, "loading-and-inspecting-data", "Loading & Inspecting Data"),
      L(13, "selecting-and-filtering", "Selecting & Filtering"),
      L(14, "creating-and-transforming-columns", "Creating & Transforming Columns"),
      L(15, "sorting-ranking-and-value-counts", "Sorting, Ranking & Value Counts"),
      L(16, "handling-dates-and-times", "Handling Dates & Times"),
    ],
  },
  {
    n: 4,
    title: "pandas in Depth",
    lessons: [
      L(17, "groupby-and-aggregation", "GroupBy & Aggregation"),
      L(18, "merging-joining-and-concatenating", "Merging, Joining & Concatenating"),
      L(19, "reshaping-pivot-and-melt", "Reshaping: Pivot & Melt"),
      L(20, "window-and-rolling-operations", "Window & Rolling Operations"),
      L(21, "working-with-text-data", "Working With Text Data"),
    ],
  },
  {
    n: 5,
    title: "Data Cleaning",
    lessons: [
      L(22, "missing-data-diagnosis-and-handling", "Missing Data: Diagnosis & Handling"),
      L(23, "duplicates-and-inconsistent-records", "Duplicates & Inconsistent Records"),
      L(24, "data-type-problems-and-parsing", "Data Type Problems & Parsing"),
      L(25, "outliers", "Outliers"),
      L(26, "data-validation-checks", "Data Validation Checks"),
    ],
  },
  {
    n: 6,
    title: "Files, Databases & APIs",
    lessons: [
      L(27, "reading-and-writing-csv-excel-and-json", "Reading & Writing CSV, Excel & JSON"),
      L(28, "querying-sql-databases-from-python", "Querying SQL Databases From Python"),
      L(29, "pulling-data-from-apis", "Pulling Data From APIs"),
      L(30, "web-scraping-basics", "Web Scraping Basics"),
    ],
  },
  {
    n: 7,
    title: "Writing Reliable Data Code",
    lessons: [
      L(31, "clean-code-for-notebooks", "Clean Code for Notebooks"),
      L(32, "refactoring-notebooks-into-scripts", "Refactoring Notebooks Into Scripts"),
      L(33, "testing-data-code", "Testing Data Code"),
      L(34, "reproducibility", "Reproducibility"),
    ],
  },
  {
    n: 8,
    title: "Capstone",
    lessons: [
      L(35, "capstone-kickoff-clean-and-analyze-a-real-dataset-in-python", "Capstone Kickoff: Clean and Analyze a Real Dataset in Python"),
      L(36, "capstone-build-it", "Capstone: Build It"),
      L(37, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation"),
    ],
  },
];
