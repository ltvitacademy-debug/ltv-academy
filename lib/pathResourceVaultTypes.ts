// Pure types for the Career Path Resource Vault — no fs/path, safe to import
// client-side. This is the path-wide sibling of lib/resourceVaultTypes.ts:
// a course's Resource Vault holds files specific to THAT course; a path's
// Resource Vault holds files that apply across every course in the path
// (e.g. a pipeline-architecture reference diagram that's relevant whether
// the student is on the Databricks, AWS, or Snowflake course right now).
//
// Content lives as static JSON per path (content/path-resources/<pathSlug>/
// resource-vault.json), loaded server-side by lib/pathResourceVault.ts.
// Actual downloadable files live under public/downloads/path/<pathSlug>/ —
// never under a course's own download folder, so the same reference file
// can be shared by several paths without being tied to one course.

import type { ResourceFileType } from "./resourceVaultTypes";

export type { ResourceFileType };

export type PathResource = {
  id: string; // unique within the path, e.g. "afde-res-01"
  chapterTitle?: string; // reused here as a category label, e.g. "Pipeline Architecture"
  title: string;
  description: string;
  fileType: ResourceFileType;
  fileName: string; // file name under public/downloads/path/<pathSlug>/
  relatedCourseSlugs?: string[]; // which of the path's courses this applies to
};

export type PathResourceVaultBank = {
  resources: PathResource[];
};
