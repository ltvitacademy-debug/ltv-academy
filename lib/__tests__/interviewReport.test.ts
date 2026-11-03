// Phase C — Student Results (spec requirements 1, 2, 4). resolveLessonLink
// and buildLessonLinkSources read the real content files + lib/courses.ts,
// so these tests prove "reuse actual lesson identifiers... rather than
// inventing recommendations" against the REAL Snowflake catalog, not a mock.
import { describe, it, expect } from "vitest";
import { resolveLessonLink, resolveLessonLinks, buildLessonLinkSources, buildStudentReport } from "../interviewReport";
import type { GradedItem } from "../mockInterviewTypes";

describe("resolveLessonLink — only ever returns a lesson that really exists (spec requirement 4)", () => {
  it("resolves a real lesson from the real Snowflake course", () => {
    const resolved = resolveLessonLink({
      courseSlug: "snowflake",
      lessonSlug: "warehouse-sizing-and-expensive-queries",
      label: "Warehouse Sizing",
    });
    expect(resolved).not.toBeNull();
    expect(resolved?.url).toBe("/app/courses/snowflake/warehouse-sizing-and-expensive-queries");
  });

  it("drops a reference to a course that doesn't exist, rather than fabricating a link", () => {
    expect(resolveLessonLink({ courseSlug: "not-a-real-course", lessonSlug: "whatever", label: "x" })).toBeNull();
  });

  it("drops a reference to a lesson slug that doesn't exist in a real course (a stale/typo'd content reference)", () => {
    expect(resolveLessonLink({ courseSlug: "snowflake", lessonSlug: "this-lesson-does-not-exist", label: "x" })).toBeNull();
  });

  it("resolveLessonLinks silently filters out invalid refs instead of throwing", () => {
    const resolved = resolveLessonLinks([
      { courseSlug: "snowflake", lessonSlug: "warehouse-sizing-and-expensive-queries", label: "real" },
      { courseSlug: "snowflake", lessonSlug: "fake-lesson-slug", label: "fake" },
    ]);
    expect(resolved).toHaveLength(1);
    expect(resolved[0].label).toBe("real");
  });
});

describe("buildLessonLinkSources — loads real content for a real career path", () => {
  it("resolves competencies, scenarios, and seed questions for snowflake-data-engineer beginner", () => {
    const sources = buildLessonLinkSources("snowflake-data-engineer", "beginner");
    expect(sources.competencies.get("snowflake-beg-warehouse-vs-database")).toBeDefined();
    expect(sources.scenarioLessonLinks.get("snde-scn-beg-dashboard-slow")?.length).toBeGreaterThan(0);
  });

  it("returns empty maps (not an error) for a career path with no mock-interview content yet", () => {
    const sources = buildLessonLinkSources("not-a-real-path", "beginner");
    expect(sources.competencies.size).toBe(0);
    expect(sources.scenarioLessonLinks.size).toBe(0);
  });
});

function item(overrides: Partial<GradedItem> & { itemId: string; itemType: GradedItem["itemType"] }): GradedItem {
  return { section: "technical-competency", questionAsked: "Q", studentAnswer: "A", rubric: "R", verdict: "met", score: 100, explanation: "ok", ...overrides };
}

describe("buildStudentReport — assembles the full student-facing report (spec requirements 1 & 2)", () => {
  const sources = buildLessonLinkSources("snowflake-data-engineer", "beginner");

  it("sorts strengths highest-first and weaknesses lowest-first, and attaches real lesson recommendations to a failed competency", () => {
    const report = buildStudentReport({
      sessionId: "s1",
      careerPath: "snowflake-data-engineer",
      difficulty: "beginner",
      completedAt: "2026-11-09T00:00:00.000Z",
      scored: {
        outcome: "fail",
        criteria: { overallScore: 60, correctAnswerRatio: 0.5, allCriticalCompetenciesMet: false, projectOwnershipPassed: true, allSkillAreasAboveMinimum: false },
        categoryScores: { technicalKnowledge: 40, projectOwnership: 100, scenarioReasoning: 80, communication: 90 },
        gradedItems: [
          item({ itemId: "snowflake-beg-warehouse-vs-database", itemType: "competency", verdict: "not-met", score: 10, explanation: "Conflated compute and storage." }),
          item({ itemId: "snde-beg-001", itemType: "technical-question", verdict: "met", score: 95 }),
          item({ itemId: "snde-scn-beg-dashboard-slow", itemType: "scenario", section: "scenario-problem-solving", verdict: "met", score: 80 }),
          item({ itemId: "snde-proj-beg-main", itemType: "project-ownership", section: "project-ownership", verdict: "met", score: 100 }),
          item({ itemId: "communication-overall", itemType: "communication", score: 90 }),
        ],
        itemsNeedingReview: [],
        competencyGate: { enforced: false, note: "disabled" },
      },
      lessonLinkSources: sources,
      certificate: null,
      verifyUrlBase: "https://example.com/verify?number=",
    });

    expect(report.weaknesses.map((w) => w.itemId)).toEqual(["snowflake-beg-warehouse-vs-database"]);
    expect(report.weaknesses[0].recommendedLessons.length).toBeGreaterThan(0);
    expect(report.strengths[0].score).toBeGreaterThanOrEqual(report.strengths[report.strengths.length - 1].score);
    expect(report.resultLabel).toBe("Not Passed");
    expect(report.certificate).toBeNull();
  });

  it("surfaces needs-review items separately and labels the result 'Pending Review'", () => {
    const report = buildStudentReport({
      sessionId: "s2",
      careerPath: "snowflake-data-engineer",
      difficulty: "advanced",
      completedAt: null,
      scored: {
        outcome: "needs-review",
        criteria: { overallScore: 90, correctAnswerRatio: 0.9, allCriticalCompetenciesMet: true, projectOwnershipPassed: true, allSkillAreasAboveMinimum: true },
        categoryScores: { technicalKnowledge: 90, projectOwnership: 90, scenarioReasoning: 90, communication: 90 },
        gradedItems: [item({ itemId: "snde-scn-beg-dashboard-slow", itemType: "scenario", section: "scenario-problem-solving", verdict: "needs-review", score: 50 })],
        itemsNeedingReview: [item({ itemId: "snde-scn-beg-dashboard-slow", itemType: "scenario", section: "scenario-problem-solving", verdict: "needs-review", score: 50 })],
        competencyGate: { enforced: true, note: "enforced" },
      },
      lessonLinkSources: sources,
      certificate: null,
      verifyUrlBase: "https://example.com/verify?number=",
    });

    expect(report.resultLabel).toBe("Pending Review");
    expect(report.itemsNeedingReview).toHaveLength(1);
  });

  it("includes a working verifyUrl when a certificate exists", () => {
    const report = buildStudentReport({
      sessionId: "s3",
      careerPath: "snowflake-data-engineer",
      difficulty: "advanced",
      completedAt: "2026-11-09T00:00:00.000Z",
      scored: {
        outcome: "pass",
        criteria: { overallScore: 95, correctAnswerRatio: 1, allCriticalCompetenciesMet: true, projectOwnershipPassed: true, allSkillAreasAboveMinimum: true },
        categoryScores: { technicalKnowledge: 95, projectOwnership: 95, scenarioReasoning: 95, communication: 95 },
        gradedItems: [],
        itemsNeedingReview: [],
        competencyGate: { enforced: true, note: "enforced" },
      },
      lessonLinkSources: sources,
      certificate: { certificateNumber: "LTV-PMI-TEST123", issuedAt: "2026-11-09T00:00:00.000Z" },
      verifyUrlBase: "https://example.com/verify?number=",
    });

    expect(report.certificate?.verifyUrl).toBe("https://example.com/verify?number=LTV-PMI-TEST123");
    expect(report.resultLabel).toBe("Passed — Certificate Earned");
  });
});
