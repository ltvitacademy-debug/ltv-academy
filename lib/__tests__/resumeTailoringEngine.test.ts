// Pure, deterministic tests against parseTailoringOutput — never a live
// Anthropic call (same philosophy as interviewTurnEngine.test.ts). The model
// response is untrusted input: a fenced code block, a truncated response, or
// a missing field must never surface broken JSON to a student.
import { describe, it, expect } from "vitest";
import { parseTailoringOutput } from "../resumeTailoringEngine";

const BASE_RESUME = "Jordan Alvarez\nData Engineer\n- Built ETL pipelines with ADF.";

describe("parseTailoringOutput", () => {
  it("parses a clean JSON response", () => {
    const raw = JSON.stringify({
      matchScore: 82,
      tailoredResumeText: "Jordan Alvarez — tailored for this role.",
      coverLetterText: "Dear hiring manager, ...",
    });
    const result = parseTailoringOutput(raw, BASE_RESUME);
    expect(result).toEqual({
      matchScore: 82,
      tailoredResumeText: "Jordan Alvarez — tailored for this role.",
      coverLetterText: "Dear hiring manager, ...",
    });
  });

  it("strips a ```json fence despite the system prompt asking for none", () => {
    const raw = "```json\n" + JSON.stringify({ matchScore: 70, tailoredResumeText: "Tailored text.", coverLetterText: "" }) + "\n```";
    const result = parseTailoringOutput(raw, BASE_RESUME);
    expect(result.tailoredResumeText).toBe("Tailored text.");
    expect(result.matchScore).toBe(70);
  });

  it("clamps an out-of-range matchScore into 0-100", () => {
    const raw = JSON.stringify({ matchScore: 140, tailoredResumeText: "Tailored.", coverLetterText: "" });
    expect(parseTailoringOutput(raw, BASE_RESUME).matchScore).toBe(100);
  });

  it("falls back to the base resume, never raw JSON scaffolding, on malformed output", () => {
    const raw = '{"matchScore": 60, "tailoredResumeText": "cut off mid-stri';
    const result = parseTailoringOutput(raw, BASE_RESUME);
    expect(result.tailoredResumeText).toBe(BASE_RESUME);
    expect(result.matchScore).toBe(50);
  });

  it("falls back to the base resume when tailoredResumeText is missing", () => {
    const raw = JSON.stringify({ matchScore: 90 });
    const result = parseTailoringOutput(raw, BASE_RESUME);
    expect(result.tailoredResumeText).toBe(BASE_RESUME);
  });
});
