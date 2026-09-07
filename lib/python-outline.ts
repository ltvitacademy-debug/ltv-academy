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
      L(1, "what-is-python", "What Is Python & Why Use It in Power BI?", {
        contentDir: "ch01/01-what-is-python",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788813628/ltv-python/ch01-01-what-is-python.mp4",
        durationLabel: "2 min 10 s",
      }),
      L(2, "installing-python", "Installing Python for Power BI", {
        contentDir: "ch01/02-installing-python",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788815638/ltv-python/ch01-02-installing-python.mp4",
        durationLabel: "2 min 30 s",
      }),
      L(3, "connecting-python", "Connecting Power BI to Python", {
        contentDir: "ch01/03-connecting-python",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788815640/ltv-python/ch01-03-connecting-python.mp4",
        durationLabel: "2 min 8 s",
      }),
    ],
  },
  {
    n: 2,
    title: "Python Fundamentals",
    lessons: [
      L(4, "python-syntax", "Python Syntax in 3 Minutes", {
        contentDir: "ch02/04-python-syntax",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788815643/ltv-python/ch02-04-python-syntax.mp4",
        durationLabel: "2 min 33 s",
      }),
      L(5, "lists-dictionaries", "Lists & Dictionaries", {
        contentDir: "ch02/05-lists-dictionaries",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788815646/ltv-python/ch02-05-lists-dictionaries.mp4",
        durationLabel: "2 min 2 s",
      }),
    ],
  },
  {
    n: 3,
    title: "Pandas Basics",
    lessons: [
      L(6, "intro-to-pandas", "Introduction to Pandas", {
        contentDir: "ch03/06-intro-to-pandas",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788815653/ltv-python/ch03-06-intro-to-pandas.mp4",
        durationLabel: "2 min 10 s",
      }),
      L(7, "dataframes", "Understanding DataFrames", {
        contentDir: "ch03/07-dataframes",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788815657/ltv-python/ch03-07-dataframes.mp4",
        durationLabel: "2 min 6 s",
      }),
      L(8, "importing-csv", "Importing CSV Data with Python", {
        contentDir: "ch03/08-importing-csv",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788815660/ltv-python/ch03-08-importing-csv.mp4",
        durationLabel: "2 min 3 s",
      }),
    ],
  },
  {
    n: 4,
    title: "Cleaning & Preparing Data",
    lessons: [
      L(9, "selecting-filtering", "Selecting & Filtering Data", {
        contentDir: "ch04/09-selecting-filtering",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788818518/ltv-python/ch04-09-selecting-filtering.mp4",
        durationLabel: "2 min 38 s",
      }),
      L(10, "cleaning-text-data", "Cleaning Text Data", {
        contentDir: "ch04/10-cleaning-text-data",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788818521/ltv-python/ch04-10-cleaning-text-data.mp4",
        durationLabel: "2 min 35 s",
      }),
      L(11, "nulls-missing-data", "NULLs & Missing Data", {
        contentDir: "ch04/11-nulls-missing-data",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788818524/ltv-python/ch04-11-nulls-missing-data.mp4",
        durationLabel: "2 min 56 s",
      }),
      L(12, "removing-duplicates", "Removing Duplicate Data", {
        contentDir: "ch04/12-removing-duplicates",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788818527/ltv-python/ch04-12-removing-duplicates.mp4",
        durationLabel: "2 min 1 s",
      }),
      L(13, "fixing-data-types", "Fixing Data Types", {
        contentDir: "ch04/13-fixing-data-types",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788818536/ltv-python/ch04-13-fixing-data-types.mp4",
        durationLabel: "2 min 2 s",
      }),
      L(14, "working-with-dates", "Working with Dates", {
        contentDir: "ch04/14-working-with-dates",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788818539/ltv-python/ch04-14-working-with-dates.mp4",
        durationLabel: "2 min 29 s",
      }),
    ],
  },
  {
    n: 5,
    title: "Transforming & Analyzing Data",
    lessons: [
      L(15, "calculated-columns", "Creating Calculated Columns", {
        contentDir: "ch05/15-calculated-columns",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788818541/ltv-python/ch05-15-calculated-columns.mp4",
        durationLabel: "2 min 1 s",
      }),
      L(16, "grouping-aggregating", "Grouping & Aggregating", {
        contentDir: "ch05/16-grouping-aggregating",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788818543/ltv-python/ch05-16-grouping-aggregating.mp4",
        durationLabel: "2 min 8 s",
      }),
      L(17, "joining-data", "Joining Data with Pandas", {
        contentDir: "ch05/17-joining-data",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788818552/ltv-python/ch05-17-joining-data.mp4",
        durationLabel: "2 min 10 s",
      }),
    ],
  },
  {
    n: 6,
    title: "Python Inside Power BI",
    lessons: [
      L(18, "python-in-power-query", "Python Scripts in Power Query", {
        contentDir: "ch06/18-python-in-power-query",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788818555/ltv-python/ch06-18-python-in-power-query.mp4",
        durationLabel: "2 min 5 s",
      }),
      L(19, "python-visual", "Creating a Python Visual", {
        contentDir: "ch06/19-python-visual",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788818557/ltv-python/ch06-19-python-visual.mp4",
        durationLabel: "2 min 8 s",
      }),
      L(20, "python-vs-power-query-vs-dax", "Python vs. Power Query vs. DAX", {
        contentDir: "ch06/20-python-vs-power-query-vs-dax",
        videoUrl:
          "https://res.cloudinary.com/gmgfbpxh/video/upload/v1788818560/ltv-python/ch06-20-python-vs-power-query-vs-dax.mp4",
        durationLabel: "2 min 44 s",
      }),
    ],
  },
];
