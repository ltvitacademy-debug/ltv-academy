// Shared types for sample resumes. Actual resume content lives one file per
// career path under lib/sample-resumes-data/<slug>.ts (kept separate so many
// paths can be authored in parallel without touching a shared file), and is
// aggregated by lib/sampleResumes.ts.

export type ResumeEntry = {
  lead?: string;
  left?: string;
  right?: string;
  sub?: string;
  bullets?: string[];
};

export type ResumeSection = {
  heading: string;
  entries: ResumeEntry[];
};

export type ResumeData = {
  levelLabel: string; // e.g. "Job Ready", "Foundation", "Advanced" — shown on the tab/page, matches the path's own stage label
  name: string;
  contact: string[];
  summary: string;
  skills: string[];
  tools?: string;
  sections: ResumeSection[];
};

// One career path's resumes, keyed by a level slug (used in the URL) — a path
// may define as many levels as it has real stages worth a resume, not just two.
export type PathResumes = Record<string, ResumeData>;
