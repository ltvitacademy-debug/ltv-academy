// "Realistic interviewer mode" revision (2026-11): the interviewer must
// never evaluate answers out loud during the formal assessment, and the
// coaching section must deliver a real, structured, concise debrief once
// (and only once) the formal assessment is finalized. These are pure,
// deterministic tests against the prompt-building functions in
// lib/interviewTurnEngine.ts — never a live Anthropic call (same
// philosophy as interviewScoring.test.ts: the model's actual behavior
// is steered by this exact prompt text, so testing the text is what's
// actually verifiable without spending real API calls on every test run).
import { describe, it, expect } from "vitest";
import { buildSystemPrompt, buildSectionSpecificBlock, parseTurnOutput, sectionForElapsedMinutes } from "../interviewTurnEngine";
import type { GradedItem, ProjectOwnershipProbe, ScenarioQuestion, ScoredSessionResult } from "../mockInterviewTypes";

function gradedItem(overrides: Partial<GradedItem> & { itemId: string }): GradedItem {
  return {
    itemType: "technical-question",
    section: "technical-competency",
    questionAsked: "What is a virtual warehouse?",
    studentAnswer: "Compute.",
    rubric: "Must separate compute from storage.",
    verdict: "met",
    score: 80,
    explanation: "Correctly separated compute from storage.",
    ...overrides,
  };
}

function report(overrides: Partial<ScoredSessionResult> = {}): ScoredSessionResult {
  return {
    outcome: "pass",
    criteria: {
      overallScore: 88,
      correctAnswerRatio: 0.9,
      allCriticalCompetenciesMet: true,
      projectOwnershipPassed: true,
      allSkillAreasAboveMinimum: true,
    },
    categoryScores: { technicalKnowledge: 90, projectOwnership: 85, scenarioReasoning: 80, communication: 92 },
    gradedItems: [gradedItem({ itemId: "q1" })],
    itemsNeedingReview: [],
    competencyGate: { enforced: true, note: "" },
    ...overrides,
  };
}

const PROBE: ProjectOwnershipProbe = {
  id: "proj-1",
  prompt: "Tell me about a project.",
  followUps: ["What was hardest?"],
  passingCriteria: "Specific personal contribution.",
  failingCriteria: "Generic/team-credited.",
};

const SCENARIO: ScenarioQuestion = {
  id: "scn-1",
  title: "Slow dashboard",
  prompt: "A dashboard got slow. What do you check?",
  difficulty: "beginner",
  skills: [],
  assessmentFocus: [],
  modelApproach: "",
  passingCriteria: "",
  failingCriteria: "",
  lessonLinks: [],
};

function baseSystemPromptArgs(overrides: Partial<Parameters<typeof buildSystemPrompt>[0]> = {}) {
  return {
    careerPath: "snowflake-data-engineer",
    difficulty: "beginner" as const,
    section: "technical-competency" as const,
    sectionLabel: "Core technical competency questions",
    elapsedMinutes: 5,
    totalMinutes: 54,
    isFirstTurn: false,
    competencies: [],
    enforceable: true,
    seedQuestions: [],
    projectOwnershipProbe: null,
    scenarioQuestions: [],
    formalAssessmentReport: null,
    ...overrides,
  };
}

describe("buildSystemPrompt — realistic interviewer mode", () => {
  it("instructs the interviewer never to reveal correctness during a formal-assessment section", () => {
    const prompt = buildSystemPrompt(baseSystemPromptArgs({ section: "technical-competency" }));
    expect(prompt).toMatch(/NEVER tell the candidate whether an answer was correct/i);
    expect(prompt).toMatch(/do not say things like "That's correct/i);
    expect(prompt).toMatch(/never correct, teach, or say outright that it's wrong/i);
  });

  it("instructs the interviewer not to answer the candidate's own questions", () => {
    const prompt = buildSystemPrompt(baseSystemPromptArgs());
    expect(prompt).toMatch(/do not answer or explain it/i);
  });

  it("instructs varied, non-mechanical acknowledgments instead of repeating 'Thank you'", () => {
    const prompt = buildSystemPrompt(baseSystemPromptArgs());
    expect(prompt).toMatch(/don't default to "Thank you" after every answer/i);
  });

  it("instructs professional handling of 'I don't know' without supplying the answer", () => {
    const prompt = buildSystemPrompt(baseSystemPromptArgs());
    expect(prompt).toMatch(/I don't know/);
    expect(prompt).toMatch(/never supply the answer yourself/i);
  });

  it("allows deeper adaptive follow-ups on strong answers without revealing they were good", () => {
    const prompt = buildSystemPrompt(baseSystemPromptArgs());
    expect(prompt).toMatch(/implementation detail, trade-offs, edge cases/i);
    expect(prompt).toMatch(/never as praise that reveals the answer was good/i);
  });

  it("warns against drilling the same subject with automatic follow-ups", () => {
    const prompt = buildSystemPrompt(baseSystemPromptArgs());
    expect(prompt).toMatch(/follow-ups must be purposeful, not automatic/i);
  });

  it("never leaks score/outcome details into a non-coaching section's prompt, even when a report exists", () => {
    const prompt = buildSystemPrompt(baseSystemPromptArgs({ section: "technical-competency", formalAssessmentReport: report() }));
    expect(prompt).not.toContain("88");
    expect(prompt).not.toMatch(/overall score/i);
  });

  it("lifts the strict rules only inside the coaching section's own instructions", () => {
    const interviewing = buildSystemPrompt(baseSystemPromptArgs({ section: "project-ownership", projectOwnershipProbe: PROBE }));
    const coaching = buildSystemPrompt(
      baseSystemPromptArgs({ section: "coaching", sectionLabel: "Corrections and coaching", formalAssessmentReport: report() })
    );
    expect(interviewing).toMatch(/NEVER tell the candidate whether an answer was correct/i);
    expect(coaching).toMatch(/LIFTED for this section only/i);
  });
});

describe("buildSectionSpecificBlock — project ownership & scenario sections", () => {
  it("never indicates whether a project-ownership account sounds genuine", () => {
    const block = buildSectionSpecificBlock("project-ownership", "beginner", PROBE, [], null);
    expect(block).toMatch(/never indicate.*whether their account sounds genuine/i);
    expect(block).toContain(PROBE.prompt);
  });

  it("never indicates whether scenario reasoning is on the right track", () => {
    const block = buildSectionSpecificBlock("scenario-problem-solving", "beginner", null, [SCENARIO], null);
    expect(block).toMatch(/never indicate whether their reasoning is on the right track/i);
  });

  it("returns an empty block outside of coaching/project-ownership/scenario sections", () => {
    expect(buildSectionSpecificBlock("technical-competency", "beginner", null, [], null)).toBe("");
  });
});

describe("buildSectionSpecificBlock — coaching debrief", () => {
  it("does not invent a score when no report is available yet", () => {
    const block = buildSectionSpecificBlock("coaching", "beginner", null, [], null);
    expect(block).toMatch(/do not invent a specific score/i);
    expect(block).not.toMatch(/\/100/);
  });

  it("states the real outcome label and score once the report is finalized", () => {
    const block = buildSectionSpecificBlock("coaching", "advanced", null, [], report({ outcome: "pass" }));
    expect(block).toContain("Passed — Certificate Earned");
    expect(block).toContain("88/100");
    expect(block).toMatch(/technical knowledge 90\/100/);
  });

  it("labels a beginner pass as not certificate-eligible, distinct from an advanced pass", () => {
    const block = buildSectionSpecificBlock("coaching", "beginner", null, [], report({ outcome: "pass" }));
    expect(block).toContain("Passed — Certificate Not Eligible");
  });

  it("flags failed critical competencies explicitly and lists them before other weaknesses", () => {
    const r = report({
      gradedItems: [
        gradedItem({ itemId: "weak-generic", itemType: "scenario", verdict: "not-met", explanation: "Missed the diagnostic step." }),
        gradedItem({ itemId: "weak-competency", itemType: "competency", verdict: "not-met", explanation: "Conflated compute and storage." }),
      ],
    });
    const block = buildSectionSpecificBlock("coaching", "beginner", null, [], r);
    expect(block).toMatch(/FAILED CRITICAL COMPETENCY/);
    const competencyIndex = block.indexOf("Conflated compute and storage.");
    const genericIndex = block.indexOf("Missed the diagnostic step.");
    expect(competencyIndex).toBeGreaterThan(-1);
    expect(competencyIndex).toBeLessThan(genericIndex);
  });

  it("caps the spoken weakness list and tells the model to summarize, not recite, when there are many", () => {
    const manyWeak = Array.from({ length: 9 }, (_, i) =>
      gradedItem({ itemId: `weak-${i}`, verdict: "not-met", explanation: `reason ${i}` })
    );
    const r = report({ gradedItems: manyWeak });
    const block = buildSectionSpecificBlock("coaching", "beginner", null, [], r);
    expect(block).toMatch(/4 more weaker answers/);
    expect(block).toMatch(/do NOT read them all aloud/i);
    expect(block).toContain("reason 0");
    expect(block).not.toContain("reason 8");
  });

  it("never claims a weakness list is incomplete when five or fewer weaknesses exist", () => {
    const r = report({ gradedItems: [gradedItem({ itemId: "only-weak", verdict: "not-met" })] });
    const block = buildSectionSpecificBlock("coaching", "beginner", null, [], r);
    expect(block).not.toMatch(/more weaker answers/);
  });

  it("explains the needs-review outcome instead of presenting it as a plain pass or fail", () => {
    const block = buildSectionSpecificBlock("coaching", "intermediate", null, [], report({ outcome: "needs-review" }));
    expect(block).toContain("Pending Review");
    expect(block).toMatch(/administrator review/i);
  });

  it("keeps the debrief time-bounded and defers full detail to the written report", () => {
    const block = buildSectionSpecificBlock("coaching", "beginner", null, [], report());
    expect(block).toMatch(/2 to 4 minutes/);
    expect(block).toMatch(/capped at 9 minutes/);
    expect(block).toMatch(/complete record is always in the written report/i);
  });

  it("recommends topics rather than exact lesson titles during the live debrief", () => {
    const block = buildSectionSpecificBlock("coaching", "beginner", null, [], report());
    expect(block).toMatch(/speak in terms of topics, not exact lesson titles/i);
  });
});

describe("parseTurnOutput — robust against truncated/malformed model output", () => {
  it("parses a normal well-formed response", () => {
    const parsed = parseTurnOutput('{"message": "What does a clustering key do?", "competencyId": "c1", "questionId": "q1"}');
    expect(parsed).toEqual({ message: "What does a clustering key do?", competencyId: "c1", questionId: "q1" });
  });

  it("strips a ```json fence if the model adds one", () => {
    const parsed = parseTurnOutput('```json\n{"message": "Hello."}\n```');
    expect(parsed.message).toBe("Hello.");
  });

  it("recovers the message text from JSON truncated mid-string, instead of exposing raw JSON", () => {
    const truncated = '{"message": "Thank you for completing the interview. Your result is';
    const parsed = parseTurnOutput(truncated);
    expect(parsed.message).toBe("Thank you for completing the interview. Your result is");
    expect(parsed.message).not.toContain("{");
  });

  it("falls back to a safe generic message when nothing recoverable is found", () => {
    const parsed = parseTurnOutput("not json at all and no message field");
    expect(parsed.message).toBe("Thank you — let's continue.");
    expect(parsed.competencyId).toBeNull();
    expect(parsed.questionId).toBeNull();
  });
});

describe("sectionForElapsedMinutes — time-limit handling", () => {
  it("stays in technical-competency through minute 19, then moves to project-ownership at 20", () => {
    expect(sectionForElapsedMinutes(19.9)).toBe("technical-competency");
    expect(sectionForElapsedMinutes(20)).toBe("project-ownership");
  });

  it("enters coaching at minute 45 and ends at minute 54", () => {
    expect(sectionForElapsedMinutes(44.9)).toBe("scenario-problem-solving");
    expect(sectionForElapsedMinutes(45)).toBe("coaching");
    expect(sectionForElapsedMinutes(53.9)).toBe("coaching");
    expect(sectionForElapsedMinutes(54)).toBe("complete");
  });
});
