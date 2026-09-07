// The full Python for Power BI course outline. Only lessons with a
// contentDir + videoUrl are playable; everything else renders as
// "in production". Mirrors the pattern in powerbi-outline.ts.

import type { ChapterMeta, LessonMeta } from "./powerbi-outline";

const L = (n: number, slug: string, title: string, extra?: Partial<LessonMeta>): LessonMeta => ({
  n,
  slug,
  title,
  ...extra,
});

export const PYTHON_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Getting Started",
    lessons: [
      L(1, "what-is-python", "What Is Python & Why Use It in Power BI?"),
      L(2, "installing-python", "Installing Python for Power BI"),
      L(3, "connecting-python", "Connecting Power BI to Python"),
    ],
  },
  {
    n: 2,
    title: "Python Fundamentals",
    lessons: [
      L(4, "python-syntax", "Python Syntax in 3 Minutes"),
      L(5, "lists-dictionaries", "Lists & Dictionaries"),
    ],
  },
  {
    n: 3,
    title: "Pandas Basics",
    lessons: [
      L(6, "intro-to-pandas", "Introduction to Pandas"),
      L(7, "dataframes", "Understanding DataFrames"),
      L(8, "importing-csv", "Importing CSV Data with Python"),
    ],
  },
  {
    n: 4,
    title: "Cleaning & Preparing Data",
    lessons: [
      L(9, "selecting-filtering", "Selecting & Filtering Data"),
      L(10, "cleaning-text-data", "Cleaning Text Data"),
      L(11, "nulls-missing-data", "NULLs & Missing Data"),
      L(12, "removing-duplicates", "Removing Duplicate Data"),
      L(13, "fixing-data-types", "Fixing Data Types"),
      L(14, "working-with-dates", "Working with Dates"),
    ],
  },
  {
    n: 5,
    title: "Transforming & Analyzing Data",
    lessons: [
      L(15, "calculated-columns", "Creating Calculated Columns"),
      L(16, "grouping-aggregating", "Grouping & Aggregating"),
      L(17, "joining-data", "Joining Data with Pandas"),
    ],
  },
  {
    n: 6,
    title: "Python Inside Power BI",
    lessons: [
      L(18, "python-in-power-query", "Python Scripts in Power Query"),
      L(19, "python-visual", "Creating a Python Visual"),
      L(20, "python-vs-power-query-vs-dax", "Python vs. Power Query vs. DAX"),
    ],
  },
];
