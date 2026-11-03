// fs-based content loaders for the Professional Mock Interview — server-only
// (imported from Netlify Functions, never from client components), mirroring
// the interviewPrepTypes.ts/interviewPrep.ts split used across this codebase.
import fs from "fs";
import path from "path";
import type { CompetencyFramework, ScenarioBank, ProjectOwnershipPlaybook, InterviewDifficulty } from "./mockInterviewTypes";

export * from "./mockInterviewTypes";

// content/mock-interview/<pathSlug>/competencies.json — see
// content/mock-interview/snowflake-data-engineer/competencies.json for the
// Snowflake draft. Returns null if the path has no framework yet.
export function loadCompetencyFramework(pathSlug: string): CompetencyFramework | null {
  const file = path.join(process.cwd(), "content", "mock-interview", pathSlug, "competencies.json");
  if (!fs.existsSync(file)) return null;
  try {
    return JSON.parse(fs.readFileSync(file, "utf8")) as CompetencyFramework;
  } catch {
    return null;
  }
}

// content/mock-interview/<pathSlug>/scenarios.json — optional; falls back to
// an empty bank so a session can still run (just without scenario-section
// grounding) rather than hard-failing on a missing file.
export function loadScenarioBank(pathSlug: string): ScenarioBank {
  const file = path.join(process.cwd(), "content", "mock-interview", pathSlug, "scenarios.json");
  if (!fs.existsSync(file)) return { careerPath: pathSlug, scenarios: [] };
  try {
    return JSON.parse(fs.readFileSync(file, "utf8")) as ScenarioBank;
  } catch {
    return { careerPath: pathSlug, scenarios: [] };
  }
}

// content/mock-interview/<pathSlug>/project-ownership.json — the 15-minute
// Project Explanation and Technical Ownership playbook (Phase B, spec
// requirement 3). Falls back to an empty probe set per difficulty rather
// than hard-failing, same pattern as loadScenarioBank.
export function loadProjectOwnershipPlaybook(pathSlug: string): ProjectOwnershipPlaybook {
  const file = path.join(process.cwd(), "content", "mock-interview", pathSlug, "project-ownership.json");
  const empty: ProjectOwnershipPlaybook = {
    careerPath: pathSlug,
    probes: { beginner: [], intermediate: [], advanced: [] },
  };
  if (!fs.existsSync(file)) return empty;
  try {
    const parsed = JSON.parse(fs.readFileSync(file, "utf8"));
    return {
      careerPath: parsed.careerPath ?? pathSlug,
      probes: { beginner: [], intermediate: [], advanced: [], ...parsed.probes },
    };
  } catch {
    return empty;
  }
}

// A session must never apply automatic critical-failure logic against a
// framework an administrator hasn't approved (spec section 5). Every
// scoring/turn-generation code path that touches competencies should gate
// through this, not just check `framework !== null`.
export function competenciesAreEnforceable(framework: CompetencyFramework | null): boolean {
  return framework !== null && framework.approved === true;
}

// Reuses the existing, already-built Career Interview Prep Center question
// bank (content/interview-prep/<pathSlug>/<difficulty>.json) as the seed
// question pool for the mock interview's technical-competency and
// scenario-based sections, per spec section 4 ("use our existing... interview
// preparation banks" — not a second, duplicate question bank).
export function loadSeedQuestions(pathSlug: string, difficulty: InterviewDifficulty) {
  const file = path.join(process.cwd(), "content", "interview-prep", pathSlug, `${difficulty}.json`);
  if (!fs.existsSync(file)) return [];
  try {
    const bank = JSON.parse(fs.readFileSync(file, "utf8"));
    return Array.isArray(bank.questions) ? bank.questions : [];
  } catch {
    return [];
  }
}
