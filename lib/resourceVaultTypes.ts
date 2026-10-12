// Pure types for the Course Resource Vault — no fs/path, safe to import
// client-side. Content lives as static JSON per course
// (content/<contentBase>/resource-vault.json), loaded server-side by
// lib/resourceVault.ts. Actual downloadable files live under
// public/downloads/<contentBase>/, the same self-hosted-download convention
// the Power BI course's financial-sample.xlsx already established — never a
// link out to a vendor's site.
//
// A resource vault entry is metadata ABOUT a file; the file itself is real
// and lives on disk. The loader computes file size from the real file at
// load time rather than trusting a hand-typed number.

export type ResourceFileType =
  | "sql"
  | "csv"
  | "xlsx"
  | "json"
  | "pdf"
  | "docx"
  | "md"
  | "txt"
  | "zip"
  | "pbix"
  | "config";

export type CourseResource = {
  id: string; // unique within the course, e.g. "tsql-res-01"
  chapterTitle?: string; // which chapter this resource supports, if any
  title: string;
  description: string;
  fileType: ResourceFileType;
  fileName: string; // file name under public/downloads/<contentBase>/
  relatedLessonSlugs?: string[];
  relatedWorkedExampleIds?: string[];
};

export type ResourceVaultBank = {
  resources: CourseResource[];
};

export const FILE_TYPE_LABELS: Record<ResourceFileType, string> = {
  sql: "SQL script",
  csv: "CSV dataset",
  xlsx: "Excel workbook",
  json: "JSON file",
  pdf: "PDF document",
  docx: "Word document",
  md: "Reference document",
  txt: "Text file",
  zip: "ZIP archive",
  pbix: "Power BI file",
  config: "Configuration file",
};
