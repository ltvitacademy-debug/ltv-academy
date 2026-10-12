import fs from "fs";
import path from "path";
import type { CourseMeta } from "./courses";
import type { WorkedExample, WorkedExampleBank } from "./workedExampleTypes";

export * from "./workedExampleTypes";

export function loadWorkedExamples(course: CourseMeta): WorkedExample[] {
  const contentBase = course.contentBase ?? course.slug;
  const bankPath = path.join(process.cwd(), "content", contentBase, "worked-examples.json");
  if (!fs.existsSync(bankPath)) return [];

  try {
    const bank: WorkedExampleBank = JSON.parse(fs.readFileSync(bankPath, "utf8"));
    return Array.isArray(bank.examples) ? bank.examples : [];
  } catch {
    return [];
  }
}

export function hasWorkedExamples(course: CourseMeta): boolean {
  return loadWorkedExamples(course).length > 0;
}

export function getWorkedExample(course: CourseMeta, id: string): WorkedExample | undefined {
  return loadWorkedExamples(course).find((e) => e.id === id);
}
