import fs from "fs";
import path from "path";
import { marked } from "marked";
import { TRACKS } from "./copy";
import { POWERBI_CHAPTERS, type ChapterMeta, type LessonMeta } from "./powerbi-outline";
import { PYTHON_CHAPTERS } from "./python-outline";
import { DATA_FACTORY_CHAPTERS } from "./data-factory-outline";
import { BLOCKCHAIN_CHAPTERS } from "./blockchain-outline";
import { TSQL_CHAPTERS } from "./t-sql-outline";
import { DE_FOUNDATIONS_CHAPTERS } from "./de-foundations-outline";
import { DATABRICKS_DELTA_CHAPTERS } from "./databricks-delta-outline";
import { FABRIC_REALTIME_CHAPTERS } from "./fabric-realtime-outline";
import { CAREER_CAPSTONE_CHAPTERS } from "./career-capstone-outline";

// Every external link in a lesson guide should open in a new tab, so a
// student never loses their place in the course. Applied once, here, so
// guide.md files just use normal markdown links — no per-lesson HTML needed.
// Self-hosted sample-data downloads (see LessonBuilder skill / ATTRIBUTION.md)
// get a "download-link" class so CSS can call them out visually (bold, in
// addition to every link's underline) — students kept missing plain-text
// links entirely.
marked.use({
  renderer: {
    link({ href, title, tokens }) {
      const text = this.parser.parseInline(tokens);
      const isExternal = /^https?:\/\//i.test(href);
      const isDownload = href.startsWith("/downloads/");
      const titleAttr = title ? ` title="${title}"` : "";
      const targetAttr = isExternal ? ` target="_blank" rel="noopener noreferrer"` : "";
      const classAttr = isDownload ? ` class="download-link"` : "";
      return `<a href="${href}"${titleAttr}${targetAttr}${classAttr}>${text}</a>`;
    },
  },
});

export type CourseMeta = {
  slug: string;
  title: string;
  tagline: string;
  status: "available" | "coming-soon";
  chapters?: ChapterMeta[];
  // Folder name under content/ and public/courses/. Defaults to slug —
  // only power-bi overrides this, since its content folder predates the
  // slug-matching convention (content/powerbi/, not content/power-bi/).
  contentBase?: string;
};

// The catalog the learning center renders. Power BI is the first live course;
// the nine LTV tracks appear as coming soon until their content is produced.
export const COURSES: CourseMeta[] = [
  {
    slug: "power-bi",
    title: "Power BI",
    tagline:
      "From raw data to published, secured dashboards — twelve chapters ending in a full capstone project.",
    status: "available",
    chapters: POWERBI_CHAPTERS,
    contentBase: "powerbi",
  },
  {
    slug: "python-for-power-bi",
    title: "Python for Power BI",
    tagline:
      "Twenty micro-lessons, three minutes or less each — the Python skills that actually move a Power BI project forward.",
    status: "available",
    chapters: PYTHON_CHAPTERS,
  },
  {
    slug: "data-factory",
    title: "Data Factory",
    tagline:
      "Move and transform data at scale — from Azure Data Factory pipelines to Fabric Data Factory, ending in a full capstone pipeline.",
    status: "available",
    chapters: DATA_FACTORY_CHAPTERS,
  },
  {
    slug: "blockchain",
    title: "Blockchain Development",
    tagline:
      "Ethereum, Solidity, and decentralized applications — plus the uses for blockchain beyond cryptocurrency.",
    status: "available",
    chapters: BLOCKCHAIN_CHAPTERS,
  },
  {
    slug: "t-sql-development",
    title: "T-SQL Development",
    tagline:
      "From your first SELECT to performance tuning and data warehousing — 118 lessons in real SQL Server Management Studio, working against AdventureWorks2012 and AdventureWorksDW2014.",
    status: "available",
    chapters: TSQL_CHAPTERS,
    contentBase: "t-sql",
  },
  {
    slug: "data-engineering-foundations",
    title: "Data Engineering Foundations",
    tagline:
      "Storage, Python, and Spark — the 62-lesson foundation for Azure data engineering, working hands-on with real NYC Taxi trip data.",
    status: "available",
    chapters: DE_FOUNDATIONS_CHAPTERS,
    contentBase: "de-foundations",
  },
  {
    slug: "azure-databricks-and-delta-lake",
    title: "Azure Databricks & Delta Lake",
    tagline:
      "Clusters, notebooks, Delta tables, medallion pipelines, Unity Catalog, and Lakeflow — 57 lessons continuing straight from Data Engineering Foundations.",
    status: "available",
    chapters: DATABRICKS_DELTA_CHAPTERS,
    contentBase: "databricks-delta",
  },
  {
    slug: "microsoft-fabric-and-real-time-analytics",
    title: "Microsoft Fabric & Real-Time Analytics",
    tagline:
      "OneLake, lakehouses and warehouses, real-time Eventstreams and KQL, and the production practices that keep a data platform running — 70 lessons continuing straight from Azure Databricks & Delta Lake.",
    status: "available",
    chapters: FABRIC_REALTIME_CHAPTERS,
    contentBase: "fabric-realtime",
  },
  {
    slug: "data-engineering-career-and-capstone",
    title: "Data Engineering Career & Capstone",
    tagline:
      "System design, DP-700 certification prep, AI for data engineers, and three full capstone projects — 81 lessons closing out the Data Engineering track.",
    status: "available",
    chapters: CAREER_CAPSTONE_CHAPTERS,
    contentBase: "career-capstone",
  },
  ...TRACKS.filter((t) => t.slug !== "blockchain").map((t) => ({
    slug: t.slug,
    title: t.title,
    tagline: t.line,
    status: "coming-soon" as const,
  })),
];

export const getCourse = (slug: string) => COURSES.find((c) => c.slug === slug);

export function findLesson(course: CourseMeta, lessonSlug: string) {
  for (const ch of course.chapters ?? []) {
    const lesson = ch.lessons.find((l) => l.slug === lessonSlug);
    if (lesson) return { chapter: ch, lesson };
  }
  return null;
}

export function lessonCount(course: CourseMeta) {
  return (course.chapters ?? []).reduce((n, ch) => n + ch.lessons.length, 0);
}

export type Quiz = {
  questions: { q: string; options: string[]; answer: number; explain: string }[];
};

// Lesson content lives on disk under content/<contentBase>/ (moves to the
// database when the backend lands). Only lessons with a contentDir have content.
export function loadLessonContent(lesson: LessonMeta, contentBase: string) {
  if (!lesson.contentDir) return null;
  const dir = path.join(process.cwd(), "content", contentBase, lesson.contentDir);
  const guidePath = path.join(dir, "guide.md");
  const quizPath = path.join(dir, "quiz.json");
  const guideHtml = fs.existsSync(guidePath)
    ? (marked.parse(fs.readFileSync(guidePath, "utf8")) as string)
    : null;
  const quiz: Quiz | null = fs.existsSync(quizPath)
    ? JSON.parse(fs.readFileSync(quizPath, "utf8"))
    : null;
  return { guideHtml, quiz };
}
