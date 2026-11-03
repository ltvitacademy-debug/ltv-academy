// Phase C orchestration — ties lib/interviewScoring.ts (pure grading/scoring)
// to the database: loads a session's transcript and content, runs the
// (injected) AI grading pass, persists the result, and issues a certificate
// if eligible. This is the ONLY place that writes InterviewReport,
// CompetencyResult rows, or (indirectly, via lib/certificateIssuance.ts)
// Certificate rows for the mock interview feature — every other reader goes
// through the Netlify Functions, never writes here directly.
//
// Live wiring into netlify/functions/mock-interview-turn.ts's coaching
// transition is still pending the administrator's approval to make a real
// paid Anthropic call (Phase B/C instruction: no live calls without
// sign-off) — runFormalAssessmentGrading itself is complete and only ever
// exercised with an injected mock `callModel` in tests until that happens.
import { prisma } from "./db";
import { loadCompetencyFramework, loadSeedQuestions, loadScenarioBank, loadProjectOwnershipPlaybook } from "./mockInterview";
import { buildLessonLinkSources } from "./interviewReport";
import { issueCertificateIfEligible } from "./certificateIssuance";
import {
  buildGradableItems,
  gradeFormalAssessment,
  scoreGradedItems,
  getConfiguredMinimumSkillAreaScore,
  type ScorableTurn,
} from "./interviewScoring";
import {
  FORMAL_ASSESSMENT_MINUTES,
  type InterviewDifficulty,
  type GradedItem,
  type GradingVerdict,
  type ScoredSessionResult,
  type AdminResolutionInput,
} from "./mockInterviewTypes";

type StoredReportJson = {
  criteria: ScoredSessionResult["criteria"];
  categoryScores: ScoredSessionResult["categoryScores"];
  gradedItems: GradedItem[];
  itemsNeedingReview: GradedItem[];
  competencyGate: ScoredSessionResult["competencyGate"];
};

function toScoredSessionResult(outcome: ScoredSessionResult["outcome"], stored: StoredReportJson): ScoredSessionResult {
  return { outcome, ...stored };
}

async function loadGradableContext(careerPath: string, difficulty: InterviewDifficulty) {
  const framework = loadCompetencyFramework(careerPath);
  return {
    framework,
    competencies: framework?.competencies[difficulty] ?? [],
    seedQuestions: loadSeedQuestions(careerPath, difficulty) as { id: string; prompt?: string; title?: string; modelAnswer?: string }[],
    scenarios: loadScenarioBank(careerPath).scenarios.filter((s) => s.difficulty === difficulty),
    projectOwnershipProbe: loadProjectOwnershipPlaybook(careerPath).probes[difficulty]?.[0] ?? null,
  };
}

async function persistCompetencyResults(sessionId: string, gradedItems: GradedItem[]) {
  const competencyItems = gradedItems.filter((i) => i.itemType === "competency");
  for (const item of competencyItems) {
    const met = item.verdict === "needs-review" ? null : item.verdict === "met";
    await prisma.competencyResult.upsert({
      where: { sessionId_competencyId: { sessionId, competencyId: item.itemId } },
      update: { met, evidence: item.explanation },
      create: { sessionId, competencyId: item.itemId, met, evidence: item.explanation },
    });
  }
}

async function persistReportAndCertificate(args: {
  sessionId: string;
  careerPath: string;
  difficulty: InterviewDifficulty;
  scored: ScoredSessionResult;
}) {
  const reportJson: StoredReportJson = {
    criteria: args.scored.criteria,
    categoryScores: args.scored.categoryScores,
    gradedItems: args.scored.gradedItems,
    itemsNeedingReview: args.scored.itemsNeedingReview,
    competencyGate: args.scored.competencyGate,
  };

  await prisma.interviewReport.upsert({
    where: { sessionId: args.sessionId },
    update: {
      overallScore: args.scored.criteria.overallScore,
      outcome: args.scored.outcome,
      sectionScores: JSON.stringify(args.scored.categoryScores),
      reportJson: JSON.stringify(reportJson),
      disputed: args.scored.outcome === "needs-review",
      adminReviewedAt: args.scored.outcome === "needs-review" ? null : new Date(),
    },
    create: {
      sessionId: args.sessionId,
      overallScore: args.scored.criteria.overallScore,
      outcome: args.scored.outcome,
      sectionScores: JSON.stringify(args.scored.categoryScores),
      reportJson: JSON.stringify(reportJson),
      disputed: args.scored.outcome === "needs-review",
    },
  });

  await persistCompetencyResults(args.sessionId, args.scored.gradedItems);

  if (args.scored.outcome === "pass") {
    const session = await prisma.mockInterviewSession.findUniqueOrThrow({
      where: { id: args.sessionId },
      include: { student: true },
    });
    await issueCertificateIfEligible({
      sessionId: args.sessionId,
      difficulty: args.difficulty,
      outcome: args.scored.outcome,
      studentName: session.student.fullName ?? session.student.email,
      careerPath: args.careerPath,
      overallScore: args.scored.criteria.overallScore,
    });
  }
}

// Runs the ONE AI grading pass over a session's formal-assessment
// transcript (spec requirement 4/11 — call this at the 45-minute mark,
// before coaching) and persists everything. `callModel` is injected so every
// automated test supplies a fixture/mock — see
// lib/__tests__/formalAssessmentPipeline.test.ts.
export async function runFormalAssessmentGrading(
  sessionId: string,
  callModel: (system: string, user: string) => Promise<string>
): Promise<ScoredSessionResult> {
  const session = await prisma.mockInterviewSession.findUniqueOrThrow({
    where: { id: sessionId },
    include: { turns: { orderBy: { turnIndex: "asc" } } },
  });

  const difficulty = session.difficulty as InterviewDifficulty;
  const content = await loadGradableContext(session.careerPath, difficulty);

  const turns: ScorableTurn[] = session.turns.map((t) => ({
    id: t.id,
    section: t.section as ScorableTurn["section"],
    competencyId: t.competencyId,
    questionId: t.questionId,
    aiMessage: t.aiMessage,
    studentResponse: t.studentResponse,
  }));

  const gradableItems = buildGradableItems({
    turns,
    difficulty,
    competencies: content.competencies,
    seedQuestions: content.seedQuestions,
    scenarios: content.scenarios,
    projectOwnershipProbe: content.projectOwnershipProbe,
  });

  const gradedItems = await gradeFormalAssessment(gradableItems, session.careerPath, difficulty, callModel);

  const elapsedMinutes = (Date.now() - session.startedAt.getTime()) / 60000;
  const wasFullyAssessed = elapsedMinutes >= FORMAL_ASSESSMENT_MINUTES;

  const scored = scoreGradedItems(gradedItems, content.framework, wasFullyAssessed, {
    minimumSkillAreaScore: getConfiguredMinimumSkillAreaScore(),
  });

  await persistReportAndCertificate({ sessionId, careerPath: session.careerPath, difficulty, scored });

  return scored;
}

// Administrator resolution (spec requirement 8) — applies the admin's
// verdict/score/note to the specific items they reviewed, re-scores
// deterministically from the FULL updated item set (never re-grades with
// AI), and persists the result. Any item the admin didn't address stays
// exactly as the AI left it — including "needs-review", which keeps the
// session in the review queue until every ambiguous item is resolved.
export async function resolveAdminReview(args: {
  sessionId: string;
  resolutions: AdminResolutionInput[];
  adminName: string;
}): Promise<ScoredSessionResult> {
  const session = await prisma.mockInterviewSession.findUniqueOrThrow({ where: { id: args.sessionId } });
  const report = await prisma.interviewReport.findUniqueOrThrow({ where: { sessionId: args.sessionId } });
  const stored = JSON.parse(report.reportJson) as StoredReportJson;
  const difficulty = session.difficulty as InterviewDifficulty;

  const resolutionByItemId = new Map(args.resolutions.map((r) => [r.itemId, r]));
  const updatedItems: GradedItem[] = stored.gradedItems.map((item) => {
    const resolution = resolutionByItemId.get(item.itemId);
    if (!resolution) return item;
    const verdict: GradingVerdict = resolution.verdict;
    const score = typeof resolution.score === "number" ? Math.max(0, Math.min(100, Math.round(resolution.score))) : item.score;
    const explanation = resolution.adminNote
      ? `${item.explanation}\n[Admin review by ${args.adminName}: ${resolution.adminNote}]`
      : item.explanation;
    return { ...item, verdict, score, explanation };
  });

  const framework = loadCompetencyFramework(session.careerPath);
  const scored = scoreGradedItems(updatedItems, framework, true, { minimumSkillAreaScore: getConfiguredMinimumSkillAreaScore() });

  await persistReportAndCertificate({ sessionId: args.sessionId, careerPath: session.careerPath, difficulty, scored });

  return scored;
}

// Re-hydrates a stored report back into the same ScoredSessionResult shape
// runFormalAssessmentGrading returns, for readers (the report/history/admin
// Netlify Functions) that only need to READ what was already graded.
export function readStoredReport(reportJson: string, outcome: ScoredSessionResult["outcome"]): ScoredSessionResult {
  return toScoredSessionResult(outcome, JSON.parse(reportJson) as StoredReportJson);
}

export { buildLessonLinkSources };
