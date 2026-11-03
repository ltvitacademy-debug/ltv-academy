// LTV Academy Professional Mock Interview — Phase B "Interview Intelligence".
//
// Second-round revision per the administrator's approval: grading project
// ownership and scenario answers is now an AI reading job (reasoning,
// accuracy, ability to explain decisions), never literal keyword/phrase
// matching — that approach was explicitly removed. What stays deterministic,
// and is what makes this module fully unit-testable without a live model
// call, is everything AROUND the AI judgment:
//   1. buildGradableItems()   — assembles exactly what needs grading, with
//      its rubric, from the transcript. Pure.
//   2. buildGradingPrompt()   — turns that into the one prompt sent after the
//      45-minute formal assessment ends (spec requirement 11). Pure.
//   3. gradeFormalAssessment()/parseGradingResponse() — calls an INJECTED
//      model function and turns its JSON reply into GradedItem[], defaulting
//      anything malformed or missing to "needs-review" rather than guessing.
//      Every automated test in lib/__tests__ injects a fixture/mock function
//      here — never a live Anthropic call (spec requirement 13).
//   4. scoreGradedItems()     — the ONLY place PASS/FAIL/INCOMPLETE/
//      needs-review is decided, from already-judged items. Pure, and the
//      sole place computeOutcome() (mockInterviewTypes.ts) is invoked.
import {
  type InterviewDifficulty,
  type InterviewSectionId,
  type InterviewOutcome,
  type CompetencyFramework,
  type CriticalCompetency,
  type ScenarioQuestion,
  type ProjectOwnershipProbe,
  type GradableItem,
  type GradedItem,
  type AIGradingJudgment,
  type GradingVerdict,
  type CategoryScores,
  type PassingCriteria,
  type ScoredSessionResult,
  type TurnDTO,
  isFormalAssessmentSection,
  computeOutcome,
} from "./mockInterviewTypes";

// A category score below this is a failed mandatory requirement
// (PassingCriteria.allSkillAreasAboveMinimum) — administrator-approved as a
// PROVISIONAL default (spec requirement 2): callers pass
// ScoreGradedItemsOptions.minimumSkillAreaScore to override it per-call, and
// getConfiguredMinimumSkillAreaScore() below reads an env var so it can be
// tuned in production without a code change.
export const MINIMUM_SKILL_AREA_SCORE = 60;

export function getConfiguredMinimumSkillAreaScore(): number {
  const raw = process.env.MOCK_INTERVIEW_MIN_SKILL_SCORE;
  const parsed = raw ? Number(raw) : NaN;
  return Number.isFinite(parsed) && parsed >= 0 && parsed <= 100 ? parsed : MINIMUM_SKILL_AREA_SCORE;
}

// Administrator-approved overall-score weighting (spec requirement 1):
// Technical Knowledge 40 / Project Ownership 30 / Scenario Reasoning 20 /
// Professional Communication 10, out of 100.
export const CATEGORY_WEIGHTS: Readonly<CategoryScores> = {
  technicalKnowledge: 0.4,
  projectOwnership: 0.3,
  scenarioReasoning: 0.2,
  communication: 0.1,
};

const VALID_VERDICTS: readonly GradingVerdict[] = ["met", "not-met", "needs-review"];

// ---------------------------------------------------------------------------
// 1. Gradable-item assembly — deterministic, no AI. Groups multi-turn
// exchanges (a clarification follow-up on the same competency, a scenario's
// follow-up, every project-ownership follow-up) into ONE item per thing
// actually being assessed, so the grader sees — and scores — the whole
// exchange rather than double-counting a question across two turns.
// ---------------------------------------------------------------------------

export type ScorableTurn = Pick<TurnDTO, "id" | "section" | "competencyId" | "questionId" | "aiMessage" | "studentResponse">;

function formatRubric(passingCriteria: string, failingCriteria: string): string {
  return `Passing looks like: ${passingCriteria}\nFailing looks like: ${failingCriteria}`;
}

function concatenateExchange(turns: ScorableTurn[]): { questionAsked: string; studentAnswer: string } {
  return {
    questionAsked: turns.map((t) => t.aiMessage).join("\n---\n"),
    studentAnswer: turns
      .map((t) => t.studentResponse ?? "")
      .filter((r) => r.trim().length > 0)
      .join("\n---\n"),
  };
}

function groupByKey(turns: ScorableTurn[], keyOf: (t: ScorableTurn) => string): Map<string, ScorableTurn[]> {
  const groups = new Map<string, ScorableTurn[]>();
  for (const t of turns) {
    const key = keyOf(t);
    groups.set(key, [...(groups.get(key) ?? []), t]);
  }
  return groups;
}

export function buildGradableItems(args: {
  turns: ScorableTurn[];
  difficulty: InterviewDifficulty;
  competencies: CriticalCompetency[]; // framework.competencies[difficulty] ?? []
  seedQuestions: { id: string; prompt?: string; title?: string; modelAnswer?: string }[];
  scenarios: ScenarioQuestion[];
  projectOwnershipProbe: ProjectOwnershipProbe | null;
}): GradableItem[] {
  // Only formal-assessment turns with an actual student response are
  // gradable — coaching is excluded here structurally (spec requirement 11:
  // coaching must never change the score), same as Phase B's first draft.
  const gradable = args.turns.filter((t) => isFormalAssessmentSection(t.section) && !!t.studentResponse?.trim());

  const competencyById = new Map(args.competencies.map((c) => [c.id, c]));
  const seedById = new Map(args.seedQuestions.map((q) => [q.id, q]));
  const scenarioById = new Map(args.scenarios.map((s) => [s.id, s]));

  const items: GradableItem[] = [];

  const techTurns = gradable.filter((t) => t.section === "technical-competency");
  const techGroups = groupByKey(techTurns, (t) => t.competencyId ?? t.questionId ?? t.id);
  for (const turns of techGroups.values()) {
    const { questionAsked, studentAnswer } = concatenateExchange(turns);
    const competency = turns[0].competencyId ? competencyById.get(turns[0].competencyId) : undefined;
    if (competency) {
      items.push({
        itemId: competency.id,
        itemType: "competency",
        section: "technical-competency",
        questionAsked,
        studentAnswer,
        rubric: formatRubric(competency.passingCriteria, competency.failingCriteria),
      });
      continue;
    }
    const seed = turns[0].questionId ? seedById.get(turns[0].questionId) : undefined;
    items.push({
      itemId: seed?.id ?? turns[0].questionId ?? turns[0].id,
      itemType: "technical-question",
      section: "technical-competency",
      questionAsked,
      studentAnswer,
      rubric: seed?.modelAnswer
        ? `A strong answer covers: ${seed.modelAnswer}`
        : `General ${args.difficulty}-level technical question for this career path — judge factual accuracy and depth of understanding.`,
    });
  }

  const projectTurns = gradable.filter((t) => t.section === "project-ownership");
  if (projectTurns.length > 0) {
    const { questionAsked, studentAnswer } = concatenateExchange(projectTurns);
    items.push({
      itemId: args.projectOwnershipProbe?.id ?? "project-ownership-holistic",
      itemType: "project-ownership",
      section: "project-ownership",
      questionAsked,
      studentAnswer,
      rubric: args.projectOwnershipProbe
        ? formatRubric(args.projectOwnershipProbe.passingCriteria, args.projectOwnershipProbe.failingCriteria)
        : "Judge whether the student demonstrated genuine, first-person technical ownership of a real project, reasoning about real tradeoffs — versus a vague, rehearsed, or team-credited description.",
    });
  }

  const scenarioTurns = gradable.filter((t) => t.section === "scenario-problem-solving");
  const scenarioGroups = groupByKey(scenarioTurns, (t) => t.questionId ?? t.id);
  for (const turns of scenarioGroups.values()) {
    const { questionAsked, studentAnswer } = concatenateExchange(turns);
    const scenario = turns[0].questionId ? scenarioById.get(turns[0].questionId) : undefined;
    items.push({
      itemId: scenario?.id ?? turns[0].questionId ?? turns[0].id,
      itemType: "scenario",
      section: "scenario-problem-solving",
      questionAsked,
      studentAnswer,
      rubric: scenario
        ? formatRubric(scenario.passingCriteria, scenario.failingCriteria)
        : `Judge the student's problem-solving reasoning against the scenario they were asked: ${turns[0].aiMessage}`,
    });
  }

  // Communication is judged holistically across every formal-assessment
  // response, not per-turn, so one rough moment can't singlehandedly gate it
  // and one polished moment can't singlehandedly carry it.
  if (gradable.length > 0) {
    const { studentAnswer } = concatenateExchange(gradable);
    items.push({
      itemId: "communication-overall",
      itemType: "communication",
      section: "technical-competency",
      questionAsked: "(Holistic judgment of professional communication across every formal-assessment response in this session.)",
      studentAnswer,
      rubric: formatRubric(
        "Clear, organized, professional communication throughout — explanations a colleague or stakeholder could actually follow.",
        "Rambling, unclear, or unprofessional responses that would confuse a real audience, regardless of technical content."
      ),
    });
  }

  return items;
}

// ---------------------------------------------------------------------------
// 2. Grading prompt — pure string-building, no network. Explicitly tells the
// model to judge reasoning/accuracy/understanding, never literal wording,
// to never decide pass/fail, and to return "needs-review" rather than guess.
// ---------------------------------------------------------------------------

export function buildGradingPrompt(
  items: GradableItem[],
  careerPath: string,
  difficulty: InterviewDifficulty
): { system: string; user: string } {
  const system = `You are grading the completed formal assessment portion of the "LTV Academy Professional Mock Interview" for the "${careerPath}" career path at "${difficulty}" difficulty.

You will receive a numbered list of items. Each item has: the question(s) asked, the student's full answer, and a rubric describing what a passing answer looks like and what a failing answer looks like.

For EACH item, judge demonstrated technical understanding, reasoning, and accuracy — never whether the student used particular words or phrases from the rubric. A technically correct answer expressed in unusual, informal, or non-textbook wording must score as well as one using precise terminology. An answer that happens to contain rubric-sounding keywords but shows no real understanding, is factually wrong, or doesn't actually answer what was asked must NOT pass on the strength of those keywords alone.

You are NOT deciding whether the student passes or fails the interview, and you are NOT deciding certificate eligibility — that decision is made separately and deterministically from your per-item verdicts. Your only job is an honest, evidence-based judgment of each individual item, grounded in what the student actually said.

If an answer is genuinely ambiguous, too incomplete to judge fairly, or you are not confident you can assess it reliably, return verdict "needs-review" instead of guessing "met" or "not-met" — a human will review it. Only use "needs-review" when you truly cannot tell; an imperfect but clearly-gradable answer should get a real verdict and a score that reflects it.

Respond with ONLY a single JSON object, no other text, in this exact shape:
{"judgments": [{"itemId": "<the item's id, copied exactly>", "verdict": "met" | "not-met" | "needs-review", "score": <0-100 integer>, "explanation": "<grounded in what the student actually said>"}, ...]}
Return exactly one judgment per item given, in any order, matched by itemId.`;

  const user = items
    .map(
      (item, i) =>
        `Item ${i + 1} — id: ${item.itemId} (${item.itemType})\nQuestion asked: ${item.questionAsked}\nStudent's answer: ${
          item.studentAnswer || "(no response recorded)"
        }\nRubric:\n${item.rubric}`
    )
    .join("\n\n");

  return { system, user };
}

// ---------------------------------------------------------------------------
// 3. Response parsing + the (injected-model) grading call. Every automated
// test calls parseGradingResponse / gradeFormalAssessment with a fixture or
// mock callModel — never a real Anthropic call (spec requirement 13). Any
// item the model's JSON omits, or returns malformed, defaults to
// "needs-review" rather than silently becoming a pass or a fail.
// ---------------------------------------------------------------------------

export function parseGradingResponse(raw: string, items: GradableItem[]): GradedItem[] {
  let judgments: Partial<AIGradingJudgment>[] = [];
  try {
    const cleaned = raw.trim().replace(/^```json\s*/i, "").replace(/```\s*$/, "");
    const parsed = JSON.parse(cleaned);
    if (Array.isArray(parsed?.judgments)) judgments = parsed.judgments;
  } catch {
    judgments = [];
  }

  const byId = new Map(
    judgments.filter((j): j is Partial<AIGradingJudgment> & { itemId: string } => typeof j?.itemId === "string").map((j) => [j.itemId, j])
  );

  return items.map((item) => {
    const j = byId.get(item.itemId);
    if (!j) {
      return {
        ...item,
        verdict: "needs-review",
        score: 0,
        explanation: "The grader's response did not include a judgment for this item — flagged for manual review.",
      };
    }
    const verdict: GradingVerdict = VALID_VERDICTS.includes(j.verdict as GradingVerdict) ? (j.verdict as GradingVerdict) : "needs-review";
    const scoreNum = typeof j.score === "number" ? j.score : NaN;
    const score = Number.isFinite(scoreNum) ? Math.max(0, Math.min(100, Math.round(scoreNum))) : 0;
    const explanation =
      typeof j.explanation === "string" && j.explanation.trim()
        ? j.explanation.trim()
        : "The grader did not return a usable explanation for this item — flagged for manual review.";
    return { ...item, verdict, score, explanation };
  });
}

// `callModel` is injected so every test can supply a fixture/mock instead of
// a live Anthropic call. Production wiring (not yet connected — spec
// requirement 13) would pass a thin wrapper around `client.messages.create`,
// the same pattern netlify/functions/mock-interview-turn.ts already uses for
// the conversational turns.
export async function gradeFormalAssessment(
  items: GradableItem[],
  careerPath: string,
  difficulty: InterviewDifficulty,
  callModel: (system: string, user: string) => Promise<string>
): Promise<GradedItem[]> {
  if (items.length === 0) return [];
  const { system, user } = buildGradingPrompt(items, careerPath, difficulty);
  const raw = await callModel(system, user);
  return parseGradingResponse(raw, items);
}

// ---------------------------------------------------------------------------
// 4. Deterministic aggregation — the ONLY place PASS/FAIL/INCOMPLETE/
// needs-review is decided. computeOutcome() (mockInterviewTypes.ts) remains
// the single source of truth for the AND-logic pass/fail rule; this function
// decides the two things that sit in front of it: "incomplete" (session
// wasn't finished) and "needs-review" (spec requirement 9 — an unreliable
// judgment must never silently become an auto-fail).
// ---------------------------------------------------------------------------

export type ScoreGradedItemsOptions = {
  minimumSkillAreaScore?: number; // spec requirement 2 — configurable, defaults to MINIMUM_SKILL_AREA_SCORE
};

function averageScore(items: GradedItem[]): number {
  if (items.length === 0) return 0;
  return Math.round(items.reduce((sum, i) => sum + i.score, 0) / items.length);
}

export function scoreGradedItems(
  gradedItems: GradedItem[],
  framework: CompetencyFramework | null,
  wasFullyAssessed: boolean,
  options: ScoreGradedItemsOptions = {}
): ScoredSessionResult {
  const minimumSkillAreaScore = options.minimumSkillAreaScore ?? MINIMUM_SKILL_AREA_SCORE;
  // Spec requirement 7: the Critical Competency Framework's auto-fail gate
  // stays OFF until the administrator explicitly approves it, independent
  // of anything else in this session.
  const gateEnforced = framework !== null && framework.approved === true;

  const itemsNeedingReview = gradedItems.filter((i) => i.verdict === "needs-review");

  const competencyItems = gradedItems.filter((i) => i.itemType === "competency");
  const technicalItems = gradedItems.filter((i) => i.itemType === "technical-question");
  const scenarioItems = gradedItems.filter((i) => i.itemType === "scenario");
  const projectItems = gradedItems.filter((i) => i.itemType === "project-ownership");
  const communicationItems = gradedItems.filter((i) => i.itemType === "communication");

  const categoryScores: CategoryScores = {
    technicalKnowledge: averageScore([...competencyItems, ...technicalItems]),
    projectOwnership: averageScore(projectItems),
    scenarioReasoning: averageScore(scenarioItems),
    communication: averageScore(communicationItems),
  };

  const overallScore = Math.round(
    categoryScores.technicalKnowledge * CATEGORY_WEIGHTS.technicalKnowledge +
      categoryScores.projectOwnership * CATEGORY_WEIGHTS.projectOwnership +
      categoryScores.scenarioReasoning * CATEGORY_WEIGHTS.scenarioReasoning +
      categoryScores.communication * CATEGORY_WEIGHTS.communication
  );

  // "Majority of assessed questions correct" (spec requirement 6) spans
  // every item with a real right/wrong verdict — competencies, plain
  // technical questions, and scenarios. Project ownership and communication
  // are gated/scored separately, not folded into this ratio.
  const answeredItems = [...competencyItems, ...technicalItems, ...scenarioItems];
  const metCount = answeredItems.filter((i) => i.verdict === "met").length;
  const correctAnswerRatio = answeredItems.length > 0 ? metCount / answeredItems.length : 0;

  const allCriticalCompetenciesMet = !gateEnforced || competencyItems.every((i) => i.verdict === "met");
  const projectOwnershipPassed = projectItems.length > 0 && projectItems.every((i) => i.verdict === "met");

  const allSkillAreasAboveMinimum =
    categoryScores.technicalKnowledge >= minimumSkillAreaScore &&
    categoryScores.scenarioReasoning >= minimumSkillAreaScore &&
    categoryScores.communication >= minimumSkillAreaScore;

  const criteria: PassingCriteria = {
    overallScore,
    correctAnswerRatio,
    allCriticalCompetenciesMet,
    projectOwnershipPassed,
    allSkillAreasAboveMinimum,
  };

  // Priority: incomplete (the session itself wasn't finished) > needs-review
  // (we have a finished session but can't reliably grade part of it) >
  // the normal deterministic pass/fail AND-logic.
  let outcome: InterviewOutcome;
  if (!wasFullyAssessed) {
    outcome = "incomplete";
  } else if (itemsNeedingReview.length > 0) {
    outcome = "needs-review";
  } else {
    outcome = computeOutcome(criteria, wasFullyAssessed);
  }

  const competencyGate = gateEnforced
    ? {
        enforced: true,
        note: "Critical Competency Framework is administrator-approved — unmet competencies can fail this session.",
      }
    : {
        enforced: false,
        note:
          framework === null
            ? "No Critical Competency Framework has been drafted for this career path — the gate was never evaluated."
            : "Critical Competency Framework is still a DRAFT (approved: false) — the auto-fail gate is disabled per spec requirements 2 & 7; unmet competencies are recorded but cannot fail this session.",
      };

  return { outcome, criteria, categoryScores, gradedItems, itemsNeedingReview, competencyGate };
}

// ---------------------------------------------------------------------------
// Adaptive question selection (spec requirement 1, unchanged from the first
// Phase B draft) — deterministic, no model call: never resurface a question
// or competency the student already got in this session.
// ---------------------------------------------------------------------------

export function selectUnaskedQuestions<T extends { id: string; category?: string }>(args: {
  pool: T[];
  askedIds: ReadonlySet<string>;
  limit: number;
  preferredCategories?: string[];
}): T[] {
  const unused = args.pool.filter((q) => !args.askedIds.has(q.id));
  const preferred = args.preferredCategories?.length
    ? unused.filter((q) => q.category !== undefined && args.preferredCategories!.includes(q.category))
    : [];
  const ranked = preferred.length >= args.limit ? preferred : [...preferred, ...unused.filter((q) => !preferred.includes(q))];
  return ranked.slice(0, args.limit);
}

export function selectUnaskedCompetencies<T extends { id: string }>(pool: T[], askedIds: ReadonlySet<string>, limit: number): T[] {
  return pool.filter((c) => !askedIds.has(c.id)).slice(0, limit);
}
