// Pure types for the LTV Technical Communication Trainer — no fs/path, so this
// is safe to import from client-side components. Content lives as static JSON
// per career path (content/communication-trainer/<path-slug>.json), loaded
// server-side by lib/communicationTrainer.ts, mirroring the Interview Prep
// Center's split between interviewPrepTypes.ts (pure) and interviewPrep.ts
// (fs-based).
//
// The point isn't "is the answer technically correct" (that's Interview Prep)
// — it's "does it sound like a working professional explaining it," using the
// SCOPE framework (Situation, Clarify, Observe, Plan & Perform, Evaluate) and
// real vocabulary from the actual coursework. No AI grading, no code
// execution — students self-assess against a revealed professional answer,
// same deliberate scoping as Guided Practice and Interview Prep.

export type CommunicationScenario = {
  id: string; // e.g. "msbi-comm-01" — unique within the path
  title: string; // short label, e.g. "A stored procedure that's suddenly slow"
  skillTag: string; // e.g. "T-SQL Performance Tuning"
  situation: string; // the scenario prompt, as it would be asked out loud
  beginnerAnswer: string; // a real, thin, technically-not-wrong answer — the contrast case
  professionalAnswer: string; // the structured, precise answer a working professional gives
  vocabulary: { term: string; usage: string }[]; // terms the professional answer actually uses, with a usage example
  whyStronger: string; // what specifically separates the two answers
  lessonLink?: { courseSlug: string; lessonSlug: string; label: string }; // "review this lesson"
};

export type CommunicationBank = {
  scenarios: CommunicationScenario[];
};
