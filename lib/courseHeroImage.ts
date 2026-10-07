import fs from "fs";
import path from "path";
import { CAREER_PATHS } from "./career-paths";

// Reuses an existing /careers/<path-slug>.jpg — the same photo already used
// on that career path's card and detail-page hero — as a course's hero
// image. No new images are created; this only derives, from data that
// already exists (CAREER_PATHS' own course lists), which career path's
// photo a given course should borrow. A course not referenced by any path
// gets no image and falls back to the plain hero.
//
// Selection: the first career path (in CAREER_PATHS' own order) whose
// stages include this course, preferring a non-destination ("first choice")
// path over a destination path — a student browsing a course is more
// likely thinking of the direct path to a first job than an advanced
// destination further down the line. Deterministic and stable as long as
// CAREER_PATHS itself doesn't reorder.
let cachedImages: Set<string> | null = null;
function availableCareerImages(): Set<string> {
  if (cachedImages) return cachedImages;
  const dir = path.join(process.cwd(), "public", "careers");
  const files = fs.existsSync(dir) ? fs.readdirSync(dir) : [];
  cachedImages = new Set(
    files.filter((f) => f.endsWith(".jpg")).map((f) => f.replace(/\.jpg$/, ""))
  );
  cachedImages.delete("hero");
  return cachedImages;
}

export function getCourseHeroImage(courseSlug: string): string | undefined {
  const images = availableCareerImages();
  for (const preferNonDestination of [true, false]) {
    for (const p of CAREER_PATHS) {
      if (preferNonDestination ? p.isDestination : !p.isDestination) continue;
      if (!images.has(p.slug)) continue;
      if (p.stages.some((st) => st.courseSlugs?.includes(courseSlug))) return p.slug;
    }
  }
  return undefined;
}
