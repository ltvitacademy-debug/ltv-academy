import fs from "fs";
import path from "path";
import { InterviewDifficulty, InterviewQuestion } from "./interviewPrepTypes";

export * from "./interviewPrepTypes";

const DIFFICULTY_FILES: InterviewDifficulty[] = ["beginner", "intermediate", "advanced", "expert"];

// A path's interview bank lives as content/interview-prep/<pathSlug>/<difficulty>.json,
// each {"questions": InterviewQuestion[]} — split by difficulty so each file stays a
// manageable size to author/review (~30-55 questions) rather than one 175-question file.
export function loadInterviewBank(pathSlug: string): InterviewQuestion[] {
  const dir = path.join(process.cwd(), "content", "interview-prep", pathSlug);
  if (!fs.existsSync(dir)) return [];

  const all: InterviewQuestion[] = [];
  for (const difficulty of DIFFICULTY_FILES) {
    const file = path.join(dir, `${difficulty}.json`);
    if (!fs.existsSync(file)) continue;
    try {
      const bank: { questions: InterviewQuestion[] } = JSON.parse(fs.readFileSync(file, "utf8"));
      if (Array.isArray(bank.questions)) all.push(...bank.questions);
    } catch {
      // skip malformed file rather than failing the whole build
    }
  }
  return all;
}

export function hasInterviewBank(pathSlug: string): boolean {
  const dir = path.join(process.cwd(), "content", "interview-prep", pathSlug);
  return fs.existsSync(dir);
}
