import fs from "fs";
import path from "path";
import type { CourseMeta } from "./courses";
import type { CourseResource, ResourceVaultBank } from "./resourceVaultTypes";

export * from "./resourceVaultTypes";

export type CourseResourceWithFile = CourseResource & {
  downloadHref: string; // /downloads/<slug>/<fileName>
  fileSizeLabel: string | null; // computed from the real file; null if missing on disk
};

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// Resource metadata lives at content/<contentBase>/resource-vault.json, the
// same per-course convention as final-test.json. The actual downloadable
// FILES, though, follow the convention the Power BI course's
// financial-sample.xlsx already established (see the lesson-builder skill):
// public/downloads/<course SLUG>/ — not contentBase. The two differ for a
// few legacy courses (power-bi's contentBase is "powerbi"), so this
// deliberately uses course.slug for the download path, never contentBase.
export function loadCourseResources(course: CourseMeta): CourseResourceWithFile[] {
  const contentBase = course.contentBase ?? course.slug;
  const bankPath = path.join(process.cwd(), "content", contentBase, "resource-vault.json");
  if (!fs.existsSync(bankPath)) return [];

  let bank: ResourceVaultBank;
  try {
    bank = JSON.parse(fs.readFileSync(bankPath, "utf8"));
  } catch {
    return [];
  }
  if (!Array.isArray(bank.resources)) return [];

  return bank.resources.map((r) => {
    const filePath = path.join(process.cwd(), "public", "downloads", course.slug, r.fileName);
    const exists = fs.existsSync(filePath);
    return {
      ...r,
      downloadHref: `/downloads/${course.slug}/${r.fileName}`,
      fileSizeLabel: exists ? formatFileSize(fs.statSync(filePath).size) : null,
    };
  });
}

export function hasResourceVault(course: CourseMeta): boolean {
  return loadCourseResources(course).length > 0;
}

// The "Download All" zip, when one exists, lives at the same slug-based
// convention: public/downloads/<slug>/<slug>-resource-vault.zip
export function getDownloadAllHref(course: CourseMeta): string | null {
  const zipPath = path.join(
    process.cwd(),
    "public",
    "downloads",
    course.slug,
    `${course.slug}-resource-vault.zip`
  );
  return fs.existsSync(zipPath) ? `/downloads/${course.slug}/${course.slug}-resource-vault.zip` : null;
}
