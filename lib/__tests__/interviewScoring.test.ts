// Phase B — Interview Intelligence, second-round revision. Pure/deterministic
// tests against lib/interviewScoring.ts: no DB, and the AI grader itself is
// always a fixture/mock function injected as `callModel` — never a live
// Anthropic call (spec requirement 13, "implement the grader and validate
// its integration with fixtures and mock responses first").
import { describe, it, expect } from "vitest";
import {
  buildGradableItems,
  buildGradingPrompt,
  parseGradingResponse,
  gradeFormalAssessment,
  scoreGradedItems,
  selectUnaskedQuestions,
  selectUnaskedCompetencies,
  MINIMUM_SKILL_AREA_SCORE,
  type ScorableTurn,
} from "../interviewScoring";
import type { CompetencyFramework, CriticalCompetency, ScenarioQuestion, ProjectOwnershipProbe, GradedItem } from "../mockInterviewTypes";

// ---------------------------------------------------------------------------
// Fixtures — one realistic Snowflake beginner session's worth of content,
// mirroring the real content/mock-interview/snowflake-data-engineer files
// closely enough to exercise the real shapes without depending on disk.
// ---------------------------------------------------------------------------

const COMPETENCY: CriticalCompetency = {
  id: "snowflake-beg-warehouse-vs-database",
  name: "Virtual warehouse vs. database",
  description: "Compute vs. storage",
  difficulty: "beginner",
  assessmentQuestions: ["What's the difference between a virtual warehouse and a database?"],
  expectedKnowledge: "Warehouse is compute; database is storage.",
  passingCriteria: "Correctly separates compute from storage.",
  failingCriteria: "Conflates the two.",
  clarificationPrompt: "If a query is slow, do you resize the warehouse or the database?",
  lessonLinks: [],
};

const DRAFT_FRAMEWORK: CompetencyFramework = {
  careerPath: "snowflake-data-engineer",
  approved: false,
  approvedAt: null,
  approvedBy: null,
  competencies: { beginner: [COMPETENCY], intermediate: [], advanced: [] },
};

const APPROVED_FRAMEWORK: CompetencyFramework = { ...DRAFT_FRAMEWORK, approved: true, approvedAt: "2026-11-09", approvedBy: "bill" };

const SCENARIO: ScenarioQuestion = {
  id: "snde-scn-beg-dashboard-slow",
  title: "A dashboard that used to be fast suddenly isn't",
  prompt: "A dashboard query that ran in seconds now takes a minute. How do you figure out why?",
  difficulty: "beginner",
  skills: ["Warehouses"],
  assessmentFocus: ["troubleshooting methodology"],
  modelApproach: "Check query history, warehouse state, and data volume before proposing a fix.",
  passingCriteria: "Checks actual evidence (query history, warehouse state, data volume) before proposing a fix.",
  failingCriteria: "Jumps straight to a fix with no diagnostic step.",
  lessonLinks: [],
};

const PROBE: ProjectOwnershipProbe = {
  id: "snde-proj-beg-main",
  prompt: "Tell me about a Snowflake or SQL project you've built.",
  followUps: ["What piece was genuinely yours?", "What was the hardest part?"],
  passingCriteria: "Identifies a specific personal contribution and a concrete difficulty they personally solved.",
  failingCriteria: "Generic, team-credited, or no identifiable personal contribution.",
};

function turn(overrides: Partial<ScorableTurn> & { id: string }): ScorableTurn {
  return {
    section: "technical-competency",
    competencyId: null,
    questionId: null,
    aiMessage: "",
    studentResponse: null,
    ...overrides,
  };
}

function buildItemsFromFixture(turns: ScorableTurn[]) {
  return buildGradableItems({
    turns,
    difficulty: "beginner",
    competencies: [COMPETENCY],
    seedQuestions: [{ id: "snde-beg-005", prompt: "What's a stage?", modelAnswer: "A stage is where files land before/during loading." }],
    scenarios: [SCENARIO],
    projectOwnershipProbe: PROBE,
  });
}

describe("buildGradableItems — assembly and coaching exclusion (spec requirement 11)", () => {
  it("groups a competency's initial question and its clarification follow-up into ONE item, not two", () => {
    const turns: ScorableTurn[] = [
      turn({ id: "t1", section: "technical-competency", competencyId: COMPETENCY.id, aiMessage: "What's a warehouse vs a database?", studentResponse: "Not totally sure." }),
      turn({ id: "t2", section: "technical-competency", competencyId: COMPETENCY.id, aiMessage: "Let's come at it differently — what would you resize for speed?", studentResponse: "I guess the warehouse." }),
    ];
    const items = buildItemsFromFixture(turns);
    const competencyItems = items.filter((i) => i.itemType === "competency");
    expect(competencyItems).toHaveLength(1);
    expect(competencyItems[0].studentAnswer).toContain("Not totally sure");
    expect(competencyItems[0].studentAnswer).toContain("I guess the warehouse");
  });

  it("excludes coaching-section turns entirely, even ones tagged with a real competencyId", () => {
    const turns: ScorableTurn[] = [
      turn({ id: "t1", section: "technical-competency", competencyId: COMPETENCY.id, aiMessage: "Q", studentResponse: "A" }),
      turn({ id: "coach-1", section: "coaching", competencyId: COMPETENCY.id, aiMessage: "Coaching note", studentResponse: "ok thanks" }),
    ];
    const items = buildItemsFromFixture(turns);
    expect(items.some((i) => i.studentAnswer.includes("ok thanks"))).toBe(false);
  });

  it("builds one holistic project-ownership item spanning the opening and every follow-up", () => {
    const turns: ScorableTurn[] = [
      turn({ id: "p1", section: "project-ownership", questionId: PROBE.id, aiMessage: PROBE.prompt, studentResponse: "I built a loader." }),
      turn({ id: "p2", section: "project-ownership", questionId: PROBE.id, aiMessage: "What piece was genuinely yours?", studentResponse: "The retry logic." }),
    ];
    const items = buildItemsFromFixture(turns);
    const projectItems = items.filter((i) => i.itemType === "project-ownership");
    expect(projectItems).toHaveLength(1);
    expect(projectItems[0].studentAnswer).toContain("I built a loader");
    expect(projectItems[0].studentAnswer).toContain("The retry logic");
    expect(projectItems[0].rubric).toContain(PROBE.passingCriteria);
  });

  it("builds one holistic communication item spanning every formal-assessment answer", () => {
    const turns: ScorableTurn[] = [
      turn({ id: "t1", section: "technical-competency", competencyId: COMPETENCY.id, aiMessage: "Q1", studentResponse: "Answer one." }),
      turn({ id: "s1", section: "scenario-problem-solving", questionId: SCENARIO.id, aiMessage: SCENARIO.prompt, studentResponse: "Answer two." }),
    ];
    const items = buildItemsFromFixture(turns);
    const comm = items.find((i) => i.itemType === "communication");
    expect(comm).toBeDefined();
    expect(comm!.studentAnswer).toContain("Answer one");
    expect(comm!.studentAnswer).toContain("Answer two");
  });

  it("never emits an item for a turn with no student response yet", () => {
    const turns: ScorableTurn[] = [turn({ id: "t1", section: "technical-competency", competencyId: COMPETENCY.id, aiMessage: "Q", studentResponse: null })];
    expect(buildItemsFromFixture(turns)).toHaveLength(0);
  });
});

describe("buildGradingPrompt — instructs the model correctly (spec requirements 3 & 4)", () => {
  const items = buildItemsFromFixture([turn({ id: "t1", section: "technical-competency", competencyId: COMPETENCY.id, aiMessage: "Q", studentResponse: "A" })]);

  it("explicitly tells the grader to judge reasoning/accuracy, not literal wording", () => {
    const { system } = buildGradingPrompt(items, "snowflake-data-engineer", "beginner");
    expect(system).toMatch(/never\s+(on\s+)?whether the student used particular words/i);
  });

  it("explicitly tells the grader it does not decide pass/fail or certificate eligibility", () => {
    const { system } = buildGradingPrompt(items, "snowflake-data-engineer", "beginner");
    expect(system).toMatch(/not deciding whether the student passes or fails/i);
  });

  it("explicitly offers 'needs-review' for ambiguous answers (spec requirement 9)", () => {
    const { system } = buildGradingPrompt(items, "snowflake-data-engineer", "beginner");
    expect(system).toMatch(/needs-review/);
  });

  it("includes each item's question, answer, and rubric in the user content", () => {
    const { user } = buildGradingPrompt(items, "snowflake-data-engineer", "beginner");
    expect(user).toContain(items[0].itemId);
    expect(user).toContain("Rubric:");
  });
});

describe("parseGradingResponse — safe defaults when the grader's output is incomplete (spec requirement 9)", () => {
  const items = buildItemsFromFixture([
    turn({ id: "t1", section: "technical-competency", competencyId: COMPETENCY.id, aiMessage: "Q", studentResponse: "A" }),
  ]);

  it("parses a well-formed response correctly", () => {
    const raw = JSON.stringify({ judgments: [{ itemId: items[0].itemId, verdict: "met", score: 95, explanation: "Correctly separated compute from storage." }] });
    const [graded] = parseGradingResponse(raw, items);
    expect(graded.verdict).toBe("met");
    expect(graded.score).toBe(95);
    expect(graded.explanation).toContain("compute from storage");
  });

  it("defaults to needs-review when the item is missing from the response entirely", () => {
    const raw = JSON.stringify({ judgments: [] });
    const [graded] = parseGradingResponse(raw, items);
    expect(graded.verdict).toBe("needs-review");
    expect(graded.score).toBe(0);
  });

  it("defaults to needs-review on totally malformed (non-JSON) output", () => {
    const [graded] = parseGradingResponse("not json at all", items);
    expect(graded.verdict).toBe("needs-review");
  });

  it("defaults to needs-review when the verdict string is invalid, but keeps a valid score/explanation", () => {
    const raw = JSON.stringify({ judgments: [{ itemId: items[0].itemId, verdict: "sort-of-passed", score: 70, explanation: "Mixed answer." }] });
    const [graded] = parseGradingResponse(raw, items);
    expect(graded.verdict).toBe("needs-review");
    expect(graded.score).toBe(70);
  });

  it("clamps an out-of-range score into 0-100", () => {
    const raw = JSON.stringify({ judgments: [{ itemId: items[0].itemId, verdict: "met", score: 150, explanation: "x" }] });
    const [graded] = parseGradingResponse(raw, items);
    expect(graded.score).toBe(100);
  });
});

describe("gradeFormalAssessment — integration with an injected mock model (spec requirement 13)", () => {
  it("round-trips a mock model call through prompt-building and parsing", async () => {
    const items = buildItemsFromFixture([turn({ id: "t1", section: "technical-competency", competencyId: COMPETENCY.id, aiMessage: "Q", studentResponse: "A" })]);
    const mockModel = async (_system: string, _user: string) =>
      JSON.stringify({ judgments: items.map((i) => ({ itemId: i.itemId, verdict: "met", score: 88, explanation: "Solid." })) });

    const graded = await gradeFormalAssessment(items, "snowflake-data-engineer", "beginner", mockModel);
    expect(graded).toHaveLength(items.length);
    expect(graded[0].verdict).toBe("met");
    expect(graded[0].score).toBe(88);
  });

  it("returns an empty array without calling the model at all when there's nothing to grade", async () => {
    let called = false;
    const mockModel = async () => {
      called = true;
      return "{}";
    };
    const graded = await gradeFormalAssessment([], "snowflake-data-engineer", "beginner", mockModel);
    expect(graded).toEqual([]);
    expect(called).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// scoreGradedItems — the deterministic aggregator. Fixtures below use
// realistic student-answer TEXT (per spec requirement 12) paired with the
// verdict a careful grader would actually give — proving the aggregation
// layer never looks at wording itself, only the structured verdict/score.
// ---------------------------------------------------------------------------

function gradedItem(overrides: Partial<GradedItem> & { itemId: string; itemType: GradedItem["itemType"] }): GradedItem {
  return {
    section: "technical-competency",
    questionAsked: "Q",
    studentAnswer: "A",
    rubric: "R",
    verdict: "met",
    score: 100,
    explanation: "ok",
    ...overrides,
  };
}

function fullyPassingItems(): GradedItem[] {
  return [
    gradedItem({ itemId: COMPETENCY.id, itemType: "competency" }),
    gradedItem({ itemId: "tech-1", itemType: "technical-question" }),
    gradedItem({ itemId: "tech-2", itemType: "technical-question" }),
    gradedItem({ itemId: PROBE.id, itemType: "project-ownership", section: "project-ownership" }),
    gradedItem({ itemId: SCENARIO.id, itemType: "scenario", section: "scenario-problem-solving" }),
    gradedItem({ itemId: "communication-overall", itemType: "communication" }),
  ];
}

describe("scoreGradedItems — realistic answers prove grading is judgment-based, not keyword-based (spec requirement 3 & 12)", () => {
  it("a technically correct answer in unusual, informal wording still scores as 'met' once the grader judges it that way", () => {
    const items = fullyPassingItems().map((i) =>
      i.itemId === COMPETENCY.id
        ? {
            ...i,
            studentAnswer: "oh yeah so like, the warehouse thingy is basically the horsepower that does the work, and the database is just where the stuff sits. totally different buckets.",
            verdict: "met" as const,
            score: 90,
            explanation: "Despite informal phrasing, correctly separates compute ('horsepower that does the work') from storage ('where the stuff sits').",
          }
        : i
    );
    const result = scoreGradedItems(items, DRAFT_FRAMEWORK, true);
    expect(result.criteria.allCriticalCompetenciesMet).toBe(true);
    expect(result.outcome).toBe("pass");
  });

  it("an answer stuffed with rubric keywords but graded as factually wrong still fails that item", () => {
    const items = fullyPassingItems().map((i) =>
      i.itemId === COMPETENCY.id
        ? {
            ...i,
            studentAnswer: "A virtual warehouse and a database and compute and storage are all the same thing really, they're interchangeable.",
            verdict: "not-met" as const,
            score: 10,
            explanation: "Uses the rubric's own terms (compute, storage, warehouse, database) but asserts they're interchangeable, which is factually wrong — the keywords present don't reflect real understanding.",
          }
        : i
    );
    const result = scoreGradedItems(items, APPROVED_FRAMEWORK, true);
    expect(result.criteria.allCriticalCompetenciesMet).toBe(false);
    expect(result.outcome).toBe("fail");
  });

  it("a vague, team-credited project description fails project ownership outright, even with a strong score everywhere else", () => {
    const items = fullyPassingItems().map((i) =>
      i.itemId === PROBE.id
        ? {
            ...i,
            studentAnswer: "We all worked on it together as a team, I don't really remember who did what specifically, it just kind of came together.",
            verdict: "not-met" as const,
            score: 20,
            explanation: "No identifiable personal contribution — entirely team-credited with no specific technical detail.",
          }
        : i
    );
    const result = scoreGradedItems(items, DRAFT_FRAMEWORK, true);
    expect(result.criteria.projectOwnershipPassed).toBe(false);
    expect(result.categoryScores.projectOwnership).toBe(20);
    expect(result.outcome).toBe("fail");
  });
});

describe("scoreGradedItems — needs-review never auto-fails the student (spec requirement 9)", () => {
  it("routes the whole session to 'needs-review' when any item is ambiguous, instead of failing it", () => {
    const items = fullyPassingItems().map((i) =>
      i.itemId === SCENARIO.id ? { ...i, verdict: "needs-review" as const, score: 50, explanation: "Partial answer, cut off — can't reliably judge." } : i
    );
    const result = scoreGradedItems(items, DRAFT_FRAMEWORK, true);
    expect(result.outcome).toBe("needs-review");
    expect(result.itemsNeedingReview).toHaveLength(1);
    expect(result.itemsNeedingReview[0].itemId).toBe(SCENARIO.id);
  });

  it("incomplete still takes priority over needs-review — an unfinished session is 'incomplete', not 'needs-review'", () => {
    const items = fullyPassingItems().map((i) => (i.itemId === SCENARIO.id ? { ...i, verdict: "needs-review" as const } : i));
    const result = scoreGradedItems(items, DRAFT_FRAMEWORK, false);
    expect(result.outcome).toBe("incomplete");
  });
});

describe("scoreGradedItems — Critical Competency gate stays disabled until approved (spec requirement 7)", () => {
  it("a failed critical competency cannot fail the session while the framework is a draft", () => {
    const items = fullyPassingItems().map((i) => (i.itemId === COMPETENCY.id ? { ...i, verdict: "not-met" as const, score: 10 } : i));
    const result = scoreGradedItems(items, DRAFT_FRAMEWORK, true);
    expect(result.criteria.allCriticalCompetenciesMet).toBe(true);
    expect(result.outcome).toBe("pass");
    expect(result.competencyGate.enforced).toBe(false);
  });

  it("the SAME failed competency fails the session once the framework is approved", () => {
    const items = fullyPassingItems().map((i) => (i.itemId === COMPETENCY.id ? { ...i, verdict: "not-met" as const, score: 10 } : i));
    const result = scoreGradedItems(items, APPROVED_FRAMEWORK, true);
    expect(result.criteria.allCriticalCompetenciesMet).toBe(false);
    expect(result.outcome).toBe("fail");
    expect(result.competencyGate.enforced).toBe(true);
  });

  it("with no framework at all, the gate is disabled and says so explicitly", () => {
    const result = scoreGradedItems(fullyPassingItems(), null, true);
    expect(result.competencyGate.enforced).toBe(false);
    expect(result.competencyGate.note).toMatch(/no critical competency framework/i);
  });
});

describe("scoreGradedItems — configurable category minimum (spec requirement 2)", () => {
  it("uses the 60-point default when no override is given", () => {
    const items = fullyPassingItems().map((i) => (i.itemType === "technical-question" ? { ...i, score: 55 } : i));
    // technicalKnowledge = average(competency 100, tech-1 55, tech-2 55) = 70, still >= 60 default — adjust downward to actually breach it
    const breaching = items.map((i) => (i.itemType === "competency" || i.itemType === "technical-question" ? { ...i, score: 40 } : i));
    const result = scoreGradedItems(breaching, DRAFT_FRAMEWORK, true);
    expect(result.categoryScores.technicalKnowledge).toBeLessThan(MINIMUM_SKILL_AREA_SCORE);
    expect(result.criteria.allSkillAreasAboveMinimum).toBe(false);
  });

  it("a session that fails the default 60 floor can pass under a lower configured minimum", () => {
    const items = fullyPassingItems().map((i) => (i.itemType === "competency" || i.itemType === "technical-question" ? { ...i, score: 50 } : i));
    const strict = scoreGradedItems(items, DRAFT_FRAMEWORK, true);
    expect(strict.criteria.allSkillAreasAboveMinimum).toBe(false);

    const lenient = scoreGradedItems(items, DRAFT_FRAMEWORK, true, { minimumSkillAreaScore: 40 });
    expect(lenient.criteria.allSkillAreasAboveMinimum).toBe(true);
  });
});

describe("scoreGradedItems — overall weighting and AND-logic (spec requirements 1 & 6)", () => {
  it("weights categories 40/30/20/10 as approved", () => {
    const items: GradedItem[] = [
      gradedItem({ itemId: "c1", itemType: "competency", score: 100 }),
      gradedItem({ itemId: PROBE.id, itemType: "project-ownership", section: "project-ownership", score: 100, verdict: "met" }),
      gradedItem({ itemId: SCENARIO.id, itemType: "scenario", section: "scenario-problem-solving", score: 50, verdict: "met" }),
      gradedItem({ itemId: "communication-overall", itemType: "communication", score: 0 }),
    ];
    const result = scoreGradedItems(items, DRAFT_FRAMEWORK, true);
    // 100*0.4 + 100*0.3 + 50*0.2 + 0*0.1 = 40 + 30 + 10 + 0 = 80
    expect(result.criteria.overallScore).toBe(80);
  });

  it("a high overall score cannot override a below-minimum skill area", () => {
    const items = fullyPassingItems().map((i) => (i.itemType === "technical-question" ? { ...i, score: 0, verdict: "not-met" as const } : i));
    const result = scoreGradedItems(items, DRAFT_FRAMEWORK, true);
    expect(result.categoryScores.technicalKnowledge).toBeLessThan(MINIMUM_SKILL_AREA_SCORE);
    expect(result.criteria.allSkillAreasAboveMinimum).toBe(false);
    expect(result.outcome).toBe("fail");
  });

  it("fails below the 80 overall-score threshold even when every gate and floor is satisfied", () => {
    const items = fullyPassingItems().map((i) => ({ ...i, score: 65 }));
    const result = scoreGradedItems(items, DRAFT_FRAMEWORK, true);
    expect(result.criteria.overallScore).toBeLessThan(80);
    expect(result.criteria.allSkillAreasAboveMinimum).toBe(true);
    expect(result.outcome).toBe("fail");
  });

  it("passes when every requirement clears its bar", () => {
    const result = scoreGradedItems(fullyPassingItems(), APPROVED_FRAMEWORK, true);
    expect(result.outcome).toBe("pass");
    expect(result.criteria.overallScore).toBe(100);
  });

  it("is 'incomplete', never 'fail' or 'pass', when the session wasn't fully assessed", () => {
    const result = scoreGradedItems(fullyPassingItems(), APPROVED_FRAMEWORK, false);
    expect(result.outcome).toBe("incomplete");
  });
});

describe("adaptive question selection (spec requirement 1, unchanged) — no repeats", () => {
  it("never returns a question the student was already asked", () => {
    const pool = [{ id: "q1" }, { id: "q2" }, { id: "q3" }];
    const selected = selectUnaskedQuestions({ pool, askedIds: new Set(["q1"]), limit: 10 });
    expect(selected.map((q) => q.id)).toEqual(["q2", "q3"]);
  });

  it("selectUnaskedCompetencies drops already-probed competencies and respects the limit", () => {
    const pool = [{ id: "c1" }, { id: "c2" }, { id: "c3" }];
    expect(selectUnaskedCompetencies(pool, new Set(["c2"]), 1)).toEqual([{ id: "c1" }]);
  });
});
