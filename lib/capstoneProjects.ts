import { getCareerPath, type CareerPath } from "./career-paths";
import { getCourse, lessonCount } from "./courses";

export type CapstoneTier = {
  level: "Beginner" | "Intermediate" | "Advanced";
  courseSlug: string;
  title: string;
  tagline: string;
  lessons: number;
};

// Resolves a path's capstoneProjects field (if set) into real, live course
// data for each tier that's actually been built — so the chooser page never
// shows a tier whose course doesn't exist yet. Built tiers only; Beginner/
// Intermediate are optional on the path until their courses are registered.
export function getCapstoneTiers(pathSlug: string): CapstoneTier[] {
  const path: CareerPath | undefined = getCareerPath(pathSlug);
  const cp = path?.capstoneProjects;
  if (!cp) return [];

  const tiers: { level: CapstoneTier["level"]; slug?: string }[] = [
    { level: "Beginner", slug: cp.beginnerCourseSlug },
    { level: "Intermediate", slug: cp.intermediateCourseSlug },
    { level: "Advanced", slug: cp.advancedCourseSlug },
  ];

  const out: CapstoneTier[] = [];
  for (const t of tiers) {
    if (!t.slug) continue;
    const course = getCourse(t.slug);
    if (!course) continue;
    out.push({
      level: t.level,
      courseSlug: t.slug,
      title: course.title,
      tagline: course.tagline,
      lessons: lessonCount(course),
    });
  }
  return out;
}

export function hasCapstoneTiers(pathSlug: string): boolean {
  return getCapstoneTiers(pathSlug).length > 0;
}
