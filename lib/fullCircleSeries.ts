import fs from "fs";
import path from "path";
import type { FullCircleSeries } from "./fullCircleSeriesTypes";

export * from "./fullCircleSeriesTypes";

function filePath(pathSlug: string) {
  return path.join(process.cwd(), "content", "full-circle-series", `${pathSlug}.json`);
}

export function loadFullCircleSeries(pathSlug: string): FullCircleSeries | null {
  const file = filePath(pathSlug);
  if (!fs.existsSync(file)) return null;
  try {
    return JSON.parse(fs.readFileSync(file, "utf8")) as FullCircleSeries;
  } catch {
    return null;
  }
}

export function hasFullCircleSeries(pathSlug: string): boolean {
  return fs.existsSync(filePath(pathSlug));
}

export function findFullCircleLesson(pathSlug: string, lessonSlug: string) {
  const series = loadFullCircleSeries(pathSlug);
  if (!series) return null;
  const idx = series.lessons.findIndex((l) => l.slug === lessonSlug);
  if (idx === -1) return null;
  return { series, lesson: series.lessons[idx], index: idx };
}
