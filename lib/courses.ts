import fs from "fs";
import path from "path";
import { marked } from "marked";
import { TRACKS } from "./copy";
import { POWERBI_CHAPTERS, type ChapterMeta, type LessonMeta } from "./powerbi-outline";
import { PYTHON_CHAPTERS } from "./python-outline";

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
  ...TRACKS.map((t) => ({
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
