// Pure types for the LTV Technical Communication Lab — no fs/path, so this is
// safe to import from client-side components. Content lives as static JSON
// per career path (content/communication-trainer/<path-slug>.json), loaded
// server-side by lib/communicationTrainer.ts.
//
// This is deliberately NOT another Interview Prep / Guided Practice clone.
// Those test whether a student can answer or recall a technical question.
// This teaches HOW to explain technical work the way an experienced
// professional does — structure (the SCOPE framework), precise vocabulary,
// and the reasoning behind a diagnostic approach, not just a correct answer.
//
// Vocabulary is split into two honest categories:
//  - "prerequisite": actually taught in this path's own coursework — gets a
//    real lessonLink.
//  - "enrichment": a legitimate, real professional-level concept that goes
//    beyond what the course curriculum covers — gets a full, self-contained
//    explanation instead of a lesson link, so a student isn't left guessing
//    at an unfamiliar term. The point is to expand real vocabulary, not to
//    pretend the course taught something it didn't.
//
// No AI grading, no code execution — students self-assess their own
// constructed response against a rubric and the professional model answer.

export type CommunicationCompetency =
  | "vocabulary-terminology"
  | "troubleshooting"
  | "architecture"
  | "business-communication"
  | "performance-validation";

export type VocabularyTerm = {
  term: string;
  kind: "prerequisite" | "enrichment";
  definition: string; // plain-English definition
  whyItMatters: string; // why/when this concept actually gets used
  example: string; // the term used naturally in a professional sentence
  lessonLink?: { courseSlug: string; lessonSlug: string; label: string }; // prerequisite terms only
};

export type ScopeBreakdownItem = {
  letter: "S" | "C" | "O" | "P" | "E";
  label: string;
  explanation: string; // how THIS specific professional response embodies this step
};

export type LanguageUpgrade = {
  weak: string;
  professional: string;
  whyStronger: string;
};

// The five fixed qualities every exercise explains, each tied to how THIS
// exercise's own professional response actually demonstrates it — not a
// generic list repeated unchanged across exercises.
export type SeniorQuality = {
  quality: "Technical precision" | "Structured reasoning" | "Business awareness" | "Professional judgment" | "Validation";
  description: string; // the fixed, general definition of this quality
  howThisResponseShowsIt: string; // specific to this exercise's professional response
};

// "Say It Like a Senior": a student attempts their own upgrade of a beginner
// statement BEFORE seeing the suggested professional version — distinct from
// languageUpgrades above, which are presented as already-worked examples to
// study, not a blind-attempt-first exercise.
export type SayItLikeASeniorPrompt = {
  beginnerStatement: string;
  suggestedProfessionalVersion: string;
};

export type CommunicationExercise = {
  id: string; // e.g. "msbi-comm-01" — unique within the path
  title: string;
  competency: CommunicationCompetency;
  skillTag: string;
  situation: string; // the scenario prompt, as it would be asked out loud
  beginnerResponse: string; // technically plausible, but thin and unstructured
  whyBeginnerIsWeak: string; // specifically what's missing — terminology, method, reasoning, validation
  professionalResponse: string; // the full senior-level explanation
  scopeBreakdown: ScopeBreakdownItem[]; // 5 items, S/C/O/P/E, mapped to the professional response above
  whatMakesThisSoundSenior: SeniorQuality[]; // 5 items, fixed qualities explained against this response
  vocabulary: VocabularyTerm[]; // 5-8 terms, a mix of prerequisite and enrichment
  languageUpgrades: LanguageUpgrade[]; // 3+ already-worked weak -> professional pairs, to study
  sayItLikeASenior: SayItLikeASeniorPrompt[]; // 3+ blind-attempt-first prompts
  selfAssessmentRubric: string[]; // checklist a student compares their own practice response against
  verbalRehearsalPrompt: string; // instructions for the self-guided speaking practice
};

export type CommunicationBank = {
  exercises: CommunicationExercise[];
};

export const COMPETENCY_LABELS: Record<CommunicationCompetency, string> = {
  "vocabulary-terminology": "Professional vocabulary & terminology",
  troubleshooting: "Troubleshooting & root-cause analysis",
  architecture: "Architecture & technical decisions",
  "business-communication": "Business requirements & stakeholder communication",
  "performance-validation": "Performance, tradeoffs & validation",
};
