// Career Launch — AI resume tailoring. Same shape as
// lib/interviewTurnEngine.ts: ZERO knowledge of HTTP or the database, takes
// already-loaded text in, returns a result. Callable from the scheduled
// sweep (career-launch-job-sweep-scheduled.ts) or a future on-demand
// "re-tailor" action without duplicating the Anthropic call/parse logic.
import Anthropic from "@anthropic-ai/sdk";

export type ResumeTailoringInput = {
  baseResumeText: string;
  jobTitle: string;
  company: string;
  jobSummary: string;
};

export type ResumeTailoringResult = {
  matchScore: number;
  tailoredResumeText: string;
  coverLetterText: string;
};

const SYSTEM_PROMPT = `You help a job seeker tailor their resume to one specific job posting.
Given their base resume and the posting, respond with ONLY a JSON object, no prose outside it:
{"matchScore": <0-100 integer, how well the base resume fits this posting>,
 "tailoredResumeText": "<the resume, rewritten to foreground relevant experience for this posting — same facts, no fabricated experience, employers, or dates>",
 "coverLetterText": "<a short 3-paragraph cover letter for this specific role>"}
Never invent employers, titles, dates, or accomplishments not present in the base resume.`;

export async function tailorResumeForPosting(input: ResumeTailoringInput): Promise<ResumeTailoringResult> {
  const client = new Anthropic();
  const response = await client.messages.create({
    model: "claude-sonnet-5-5",
    max_tokens: 1600,
    output_config: { effort: "medium" },
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: `BASE RESUME:\n${input.baseResumeText}\n\nJOB POSTING:\n${input.jobTitle} at ${input.company}\n${input.jobSummary}`,
      },
    ],
  });
  const textBlock = response.content.find((b) => b.type === "text");
  const raw = textBlock && textBlock.type === "text" ? textBlock.text : "";
  return parseTailoringOutput(raw, input.baseResumeText);
}

// Tolerant JSON parsing, same reasoning as interviewTurnEngine.ts's
// parseTurnOutput: a response truncated against max_tokens, or wrapped in a
// ```json fence despite the system prompt, must never surface raw JSON
// scaffolding to a student — fall back to the original resume untouched
// rather than show them something broken.
export function parseTailoringOutput(raw: string, baseResumeText: string): ResumeTailoringResult {
  const cleaned = raw.trim().replace(/^```json\s*/i, "").replace(/```\s*$/, "");
  try {
    const obj = JSON.parse(cleaned) as { matchScore?: unknown; tailoredResumeText?: unknown; coverLetterText?: unknown };
    if (typeof obj.tailoredResumeText === "string" && obj.tailoredResumeText.trim()) {
      const score = typeof obj.matchScore === "number" ? Math.round(obj.matchScore) : 50;
      return {
        matchScore: Math.max(0, Math.min(100, score)),
        tailoredResumeText: obj.tailoredResumeText.trim(),
        coverLetterText: typeof obj.coverLetterText === "string" ? obj.coverLetterText.trim() : "",
      };
    }
  } catch {
    // fall through
  }
  return { matchScore: 50, tailoredResumeText: baseResumeText, coverLetterText: "" };
}
