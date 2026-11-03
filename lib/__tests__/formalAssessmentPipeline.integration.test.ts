// Phase C — grading orchestration + administrator review (spec requirements
// 4, 8, 11). Runs against the real local dev database, same pattern as
// certificateIssuance.integration.test.ts and sessionConcurrency.test.ts.
// The AI grader is always a hand-built mock `callModel` — never a live call
// (spec requirement 13).
import { describe, it, expect, afterAll } from "vitest";
import { prisma } from "../db";
import { generateAccessToken } from "../mockInterviewAuth";
import { runFormalAssessmentGrading, resolveAdminReview } from "../formalAssessmentPipeline";
import type { InterviewDifficulty, GradingVerdict } from "../mockInterviewTypes";

const createdStudentIds: string[] = [];

async function cleanupStudent(studentId: string) {
  const sessions = await prisma.mockInterviewSession.findMany({ where: { studentId } });
  for (const s of sessions) {
    await prisma.certificate.deleteMany({ where: { sessionId: s.id } });
    await prisma.competencyResult.deleteMany({ where: { sessionId: s.id } });
    await prisma.interviewReport.deleteMany({ where: { sessionId: s.id } });
    await prisma.interviewTurn.deleteMany({ where: { sessionId: s.id } });
  }
  await prisma.mockInterviewSession.deleteMany({ where: { studentId } });
  await prisma.interviewCredit.deleteMany({ where: { studentId } });
  await prisma.student.deleteMany({ where: { id: studentId } });
}

// Real content ids per difficulty, from content/mock-interview/snowflake-data-engineer/*
// and content/interview-prep/snowflake-data-engineer/*.json — kept consistent
// with session.difficulty so buildGradableItems' content lookups actually match.
const CONTENT_IDS: Record<InterviewDifficulty, { competencyId: string; questionId: string; probeId: string; scenarioId: string }> = {
  beginner: {
    competencyId: "snowflake-beg-warehouse-vs-database",
    questionId: "snde-beg-001",
    probeId: "snde-proj-beg-main",
    scenarioId: "snde-scn-beg-dashboard-slow",
  },
  // Not exercised by name below (only beginner/advanced are), but kept real
  // and complete since CONTENT_IDS is typed over every InterviewDifficulty.
  intermediate: {
    competencyId: "snowflake-int-clustering-keys",
    questionId: "snde-beg-001",
    probeId: "snde-proj-int-main",
    scenarioId: "snde-scn-int-cost-spike",
  },
  advanced: {
    competencyId: "snowflake-adv-snowpark-execution-model",
    questionId: "snde-adv-001",
    probeId: "snde-proj-adv-main",
    scenarioId: "snde-scn-adv-multi-team-contention",
  },
};

async function createFixtureSession(opts: {
  difficulty?: InterviewDifficulty;
  elapsedMinutesAgo?: number;
  includeCoachingTurn?: boolean;
}) {
  const difficulty = opts.difficulty ?? "beginner";
  const ids = CONTENT_IDS[difficulty];
  const email = `pipeline-${difficulty}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}@example.com`;
  const student = await prisma.student.create({ data: { wixMemberId: `test:${email}`, email, fullName: "Pipeline Test Student" } });
  createdStudentIds.push(student.id);
  const credit = await prisma.interviewCredit.create({
    data: {
      studentId: student.id,
      wixOrderId: `test-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      careerPath: "snowflake-data-engineer",
      difficulty,
      status: "consumed",
      consumedAt: new Date(),
    },
  });
  const startedAt = new Date(Date.now() - (opts.elapsedMinutesAgo ?? 50) * 60000);
  const session = await prisma.mockInterviewSession.create({
    data: {
      studentId: student.id,
      creditId: credit.id,
      careerPath: "snowflake-data-engineer",
      difficulty,
      accessToken: generateAccessToken(),
      startedAt,
      currentSection: "scenario-problem-solving",
      status: "in-progress",
    },
  });

  let turnIndex = 0;
  async function makeTurn(section: string, data: { competencyId?: string; questionId?: string; aiMessage: string; studentResponse: string }) {
    await prisma.interviewTurn.create({
      data: {
        sessionId: session.id,
        turnIndex: turnIndex++,
        section,
        competencyId: data.competencyId ?? null,
        questionId: data.questionId ?? null,
        aiMessage: data.aiMessage,
        studentResponse: data.studentResponse,
        elapsedSeconds: turnIndex * 60,
      },
    });
  }

  await makeTurn("technical-competency", {
    competencyId: ids.competencyId,
    aiMessage: "What's the difference between a virtual warehouse and a database in Snowflake?",
    studentResponse: "A warehouse is the compute layer that runs queries; a database is where the data is stored.",
  });
  await makeTurn("technical-competency", {
    questionId: ids.questionId,
    aiMessage: "What's the difference between an INNER JOIN and a LEFT JOIN?",
    studentResponse: "INNER drops rows with no match on either side; LEFT keeps every left-table row, NULL-filled when there's no match.",
  });
  await makeTurn("project-ownership", {
    questionId: ids.probeId,
    aiMessage: "Tell me about a project you built.",
    studentResponse: "I built a loading pipeline; I personally wrote the retry/idempotency logic after a duplicate-row incident.",
  });
  await makeTurn("scenario-problem-solving", {
    questionId: ids.scenarioId,
    aiMessage: "Walk me through how you'd investigate this scenario.",
    studentResponse: "I'd pull actual usage/metering data first to isolate the real driver before recommending anything.",
  });
  if (opts.includeCoachingTurn) {
    await makeTurn("coaching", { aiMessage: "Let's review your performance.", studentResponse: "Sounds good, thanks!" });
  }

  return { student, credit, session, ids };
}

function mockModel(verdicts: Record<string, { verdict: GradingVerdict; score: number; explanation?: string }>) {
  return async () => JSON.stringify({ judgments: Object.entries(verdicts).map(([itemId, v]) => ({ itemId, explanation: "ok", ...v })) });
}

function allPassFor(difficulty: InterviewDifficulty) {
  const ids = CONTENT_IDS[difficulty];
  return {
    [ids.competencyId]: { verdict: "met" as GradingVerdict, score: 95 },
    [ids.questionId]: { verdict: "met" as GradingVerdict, score: 90 },
    [ids.probeId]: { verdict: "met" as GradingVerdict, score: 92 },
    [ids.scenarioId]: { verdict: "met" as GradingVerdict, score: 88 },
    "communication-overall": { verdict: "met" as GradingVerdict, score: 90 },
  };
}

describe("runFormalAssessmentGrading (real DB, mock model) — spec requirements 4 & 11", () => {
  afterAll(async () => {
    for (const id of createdStudentIds) await cleanupStudent(id);
  });

  it("persists a pass report and issues a certificate for an Advanced pass", async () => {
    const { session, ids } = await createFixtureSession({ difficulty: "advanced" });
    const scored = await runFormalAssessmentGrading(session.id, mockModel(allPassFor("advanced")));
    expect(scored.outcome).toBe("pass");

    const report = await prisma.interviewReport.findUnique({ where: { sessionId: session.id } });
    expect(report?.outcome).toBe("pass");
    expect(report?.disputed).toBe(false);

    const competencyResult = await prisma.competencyResult.findUnique({
      where: { sessionId_competencyId: { sessionId: session.id, competencyId: ids.competencyId } },
    });
    expect(competencyResult?.met).toBe(true);

    expect(await prisma.certificate.findUnique({ where: { sessionId: session.id } })).not.toBeNull();
  });

  it("does NOT issue a certificate for a Beginner pass, even at a perfect score", async () => {
    const { session } = await createFixtureSession({ difficulty: "beginner" });
    const scored = await runFormalAssessmentGrading(session.id, mockModel(allPassFor("beginner")));
    expect(scored.outcome).toBe("pass");
    expect(await prisma.certificate.findUnique({ where: { sessionId: session.id } })).toBeNull();
  });

  it("coaching-section turns never reach the grader, even when present in the transcript (spec requirement 11)", async () => {
    const { session } = await createFixtureSession({ difficulty: "beginner", includeCoachingTurn: true });
    const scored = await runFormalAssessmentGrading(session.id, mockModel(allPassFor("beginner")));
    expect(scored.gradedItems.some((i) => i.studentAnswer.includes("Sounds good, thanks"))).toBe(false);
  });

  it("marks the report disputed and skips certificate issuance when an item needs review (spec requirement 9)", async () => {
    const { session, ids } = await createFixtureSession({ difficulty: "advanced" });
    const verdicts = { ...allPassFor("advanced"), [ids.scenarioId]: { verdict: "needs-review" as GradingVerdict, score: 50 } };
    const scored = await runFormalAssessmentGrading(session.id, mockModel(verdicts));
    expect(scored.outcome).toBe("needs-review");

    const report = await prisma.interviewReport.findUnique({ where: { sessionId: session.id } });
    expect(report?.disputed).toBe(true);
    expect(await prisma.certificate.findUnique({ where: { sessionId: session.id } })).toBeNull();
  });

  it("is idempotent — re-running grading upserts the same report/competency rows rather than duplicating them", async () => {
    const { session } = await createFixtureSession({ difficulty: "beginner" });
    await runFormalAssessmentGrading(session.id, mockModel(allPassFor("beginner")));
    await runFormalAssessmentGrading(session.id, mockModel(allPassFor("beginner")));
    expect(await prisma.interviewReport.findMany({ where: { sessionId: session.id } })).toHaveLength(1);
    expect(await prisma.competencyResult.findMany({ where: { sessionId: session.id } })).toHaveLength(1);
  });

  it("is 'incomplete' when the session hasn't actually run the full 48-minute formal assessment yet", async () => {
    const { session } = await createFixtureSession({ difficulty: "beginner", elapsedMinutesAgo: 10 });
    const scored = await runFormalAssessmentGrading(session.id, mockModel(allPassFor("beginner")));
    expect(scored.outcome).toBe("incomplete");
  });
});

describe("resolveAdminReview (real DB) — spec requirement 8", () => {
  afterAll(async () => {
    for (const id of createdStudentIds) await cleanupStudent(id);
  });

  it("resolving the ambiguous item to 'met' flips outcome from needs-review to pass and issues the certificate", async () => {
    const { session, ids } = await createFixtureSession({ difficulty: "advanced" });
    const verdicts = { ...allPassFor("advanced"), [ids.scenarioId]: { verdict: "needs-review" as GradingVerdict, score: 50, explanation: "Cut off mid-answer." } };
    await runFormalAssessmentGrading(session.id, mockModel(verdicts));

    let report = await prisma.interviewReport.findUnique({ where: { sessionId: session.id } });
    expect(report?.disputed).toBe(true);

    const scored = await resolveAdminReview({
      sessionId: session.id,
      resolutions: [{ itemId: ids.scenarioId, verdict: "met", score: 85, adminNote: "Reviewed full transcript, answer was complete." }],
      adminName: "Bill Green",
    });

    expect(scored.outcome).toBe("pass");
    report = await prisma.interviewReport.findUnique({ where: { sessionId: session.id } });
    expect(report?.disputed).toBe(false);
    expect(report?.adminReviewedAt).not.toBeNull();
    expect(await prisma.certificate.findUnique({ where: { sessionId: session.id } })).not.toBeNull();
  });

  it("resolving to 'not-met' keeps the session failed and issues no certificate", async () => {
    const { session, ids } = await createFixtureSession({ difficulty: "advanced" });
    const verdicts = { ...allPassFor("advanced"), [ids.scenarioId]: { verdict: "needs-review" as GradingVerdict, score: 50 } };
    await runFormalAssessmentGrading(session.id, mockModel(verdicts));

    const scored = await resolveAdminReview({
      sessionId: session.id,
      resolutions: [{ itemId: ids.scenarioId, verdict: "not-met", adminNote: "On review, missed the diagnostic step entirely." }],
      adminName: "Bill Green",
    });

    expect(scored.outcome).toBe("fail");
    expect(await prisma.certificate.findUnique({ where: { sessionId: session.id } })).toBeNull();
  });

  it("leaving one item unresolved keeps the session in needs-review, naming exactly that item", async () => {
    const { session, ids } = await createFixtureSession({ difficulty: "beginner" });
    const verdicts = {
      ...allPassFor("beginner"),
      [ids.scenarioId]: { verdict: "needs-review" as GradingVerdict, score: 50 },
      [ids.questionId]: { verdict: "needs-review" as GradingVerdict, score: 50 },
    };
    await runFormalAssessmentGrading(session.id, mockModel(verdicts));

    const scored = await resolveAdminReview({
      sessionId: session.id,
      resolutions: [{ itemId: ids.scenarioId, verdict: "met", score: 80 }],
      adminName: "Bill Green",
    });

    expect(scored.outcome).toBe("needs-review");
    expect(scored.itemsNeedingReview.map((i) => i.itemId)).toEqual([ids.questionId]);
  });
});
