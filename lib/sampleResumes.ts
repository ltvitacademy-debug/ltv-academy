// Sample resumes shown on a career path page — a fictional graduate ("John Doe")
// demonstrating what a student can credibly claim after finishing that path's
// stages. Rendered in-site (see components/careers/ResumeView.tsx), not as a
// downloadable file.
//
// Add a path by creating lib/sample-resumes-data/<path-slug>.ts exporting a
// `RESUMES: PathResumes` object (one entry per stage worth a resume, keyed by
// a URL-safe level slug — not limited to "job-ready"/"advanced"; use whatever
// level slugs/labels actually match that path's own stages), then import and
// register it below. Each path's data lives in its own file specifically so
// multiple paths can be authored at once without touching a shared file.

export * from "./sampleResumeTypes";
import type { PathResumes, ResumeData } from "./sampleResumeTypes";

import { RESUMES as MICROSOFT_DATA_BI_DEVELOPER } from "./sample-resumes-data/microsoft-data-bi-developer";

export const SAMPLE_RESUMES: Record<string, PathResumes> = {
  "microsoft-data-bi-developer": MICROSOFT_DATA_BI_DEVELOPER,
};

export function getSampleResume(pathSlug: string, level: string): ResumeData | undefined {
  return SAMPLE_RESUMES[pathSlug]?.[level];
}

export function getSampleResumeLevels(pathSlug: string): { key: string; label: string }[] {
  const entry = SAMPLE_RESUMES[pathSlug];
  if (!entry) return [];
  return Object.entries(entry).map(([key, data]) => ({ key, label: data.levelLabel }));
}

export function getAllSampleResumeParams(): { slug: string; level: string }[] {
  return Object.entries(SAMPLE_RESUMES).flatMap(([slug, levels]) =>
    Object.keys(levels).map((level) => ({ slug, level }))
  );
}
