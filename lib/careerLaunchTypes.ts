// Shared types/DTOs for the Career Launch feature — one place both the
// Netlify Functions and the frontend pages import from, same convention as
// lib/mockInterviewTypes.ts for the Mock Interview feature.

export type ApplicationStatus =
  | "discovered"
  | "tailored"
  | "staff_review"
  | "submitted"
  | "response"
  | "interview"
  | "rejected";

export type CareerProfileDTO = {
  targetRoles: string[];
  locations: string[];
  compFloor: number | null;
  workAuth: string;
  excludedCompanies: string[];
  weeklyTarget: number;
  startAvailability: string;
  baseResumeText: string | null;
  baseResumeApprovedAt: string | null;
};

export type CareerProfileInput = {
  targetRoles: string[];
  locations: string[];
  compFloor: number | null;
  workAuth: string;
  excludedCompanies: string[];
  weeklyTarget: number;
  startAvailability: string;
};

export type JobPostingDTO = {
  id: string;
  sourceSite: string;
  sourceUrl: string;
  company: string;
  title: string;
  location: string;
  remote: boolean;
  salaryRange: string | null;
  rawSummary: string;
};

export type JobApplicationDTO = {
  id: string;
  status: ApplicationStatus;
  matchScore: number | null;
  tailoredResumeText: string | null;
  coverLetterText: string | null;
  staffNote: string | null;
  createdAt: string;
  posting: JobPostingDTO;
};

export type AdminJobApplicationDTO = JobApplicationDTO & {
  studentEmail: string;
  studentName: string | null;
};

// DB stores lists as plain delimited strings (same reasoning as every other
// "plain string, not an enum/array column" choice in this schema — see
// prisma/schema.prisma's comments). These two helpers are the ONLY place
// that (de)serialization happens so it can't drift between call sites.
// Delimiter is "|", not ",": a location like "Atlanta, GA" or a company name
// can contain a comma, and splitting on one would silently corrupt it into
// two separate list items on every read.
const LIST_DELIMITER = "|";

export function splitCsv(value: string): string[] {
  return value
    .split(LIST_DELIMITER)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function joinCsv(items: string[]): string {
  return items.map((item) => item.trim()).filter(Boolean).join(LIST_DELIMITER);
}
