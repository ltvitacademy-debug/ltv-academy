import fs from "fs";
import path from "path";
import type { CommunicationExercise } from "./communicationTrainerTypes";

export * from "./communicationTrainerTypes";

// A path's communication-lab bank lives as a single file —
// content/communication-trainer/<pathSlug>.json, {"exercises": CommunicationExercise[]}.
// One file per path, since a realistic bank is a handful of deeply-worked
// exercises (eventually 25), not hundreds of questions like Interview Prep.
export function loadCommunicationExercises(pathSlug: string): CommunicationExercise[] {
  const file = path.join(process.cwd(), "content", "communication-trainer", `${pathSlug}.json`);
  if (!fs.existsSync(file)) return [];
  try {
    const bank: { exercises: CommunicationExercise[] } = JSON.parse(fs.readFileSync(file, "utf8"));
    return Array.isArray(bank.exercises) ? bank.exercises : [];
  } catch {
    return [];
  }
}

export function hasCommunicationExercises(pathSlug: string): boolean {
  const file = path.join(process.cwd(), "content", "communication-trainer", `${pathSlug}.json`);
  return fs.existsSync(file);
}
