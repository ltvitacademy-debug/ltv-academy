import fs from "fs";
import path from "path";
import type { CommunicationScenario } from "./communicationTrainerTypes";

export * from "./communicationTrainerTypes";

// A path's communication-trainer bank lives as a single file —
// content/communication-trainer/<pathSlug>.json, {"scenarios": CommunicationScenario[]}.
// Kept as one file per path (not split like Interview Prep's difficulty-tier
// files) since a realistic bank here is a handful of deeply-worked scenarios,
// not hundreds of questions.
export function loadCommunicationScenarios(pathSlug: string): CommunicationScenario[] {
  const file = path.join(process.cwd(), "content", "communication-trainer", `${pathSlug}.json`);
  if (!fs.existsSync(file)) return [];
  try {
    const bank: { scenarios: CommunicationScenario[] } = JSON.parse(fs.readFileSync(file, "utf8"));
    return Array.isArray(bank.scenarios) ? bank.scenarios : [];
  } catch {
    return [];
  }
}

export function hasCommunicationScenarios(pathSlug: string): boolean {
  const file = path.join(process.cwd(), "content", "communication-trainer", `${pathSlug}.json`);
  return fs.existsSync(file);
}
