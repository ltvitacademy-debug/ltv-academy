// Phase C — Student Results (spec requirements 1, 2, 4, 5). Server-only:
// resolveLessonLink reads the real course catalog (lib/courses.ts, fs-based)
// to verify a lesson reference is real before it's ever shown to a student
// — "reuse actual lesson identifiers and links rather than inventing
// recommendations" is enforced HERE, structurally, not by trusting content
// authors to never typo a slug.
import { getCourse, findLesson } from "./courses";
import { loadCompetencyFramework, loadScenarioBank, loadSeedQuestions } from "./mockInterview";
import {
  resultLabel,
  type ScoredSessionResult,
  type GradedItem,
  type DetailedAnswerDTO,
  type ResolvedLessonLink,
  type LessonLinkRef,
  type StudentReportDTO,
  type HistoryEntryDTO,
  type CompetencyResultDTO,
  type CriticalCompetency,
  type InterviewDifficulty,
  type SessionStatus,
  type InterviewOutcome,
} from "./mockInterviewTypes";

export function resolveLessonLink(ref: LessonLinkRef): ResolvedLessonLink | null {
  const course = getCourse(ref.courseSlug);
  if (!course) return null;
  if (!findLesson(course, ref.lessonSlug)) return null;
  return { ...ref, url: `/app/courses/${ref.courseSlug}/${ref.lessonSlug}` };
}

export function resolveLessonLinks(refs: LessonLinkRef[]): ResolvedLessonLink[] {
  return refs.map(resolveLessonLink).filter((l): l is ResolvedLessonLink => l !== null);
}

export type LessonLinkSources = {
  // competencyId -> its CriticalCompetency (for name + lessonLinks)
  competencies: Map<string, CriticalCompetency>;
  // scenario/technical-question itemId -> the lesson refs authored for it
  scenarioLessonLinks: Map<string, LessonLinkRef[]>;
  seedQuestionLessonLinks: Map<string, LessonLinkRef[]>;
};

// Loads every content source a report (or the grading pipeline, for
// building gradable items) needs for one careerPath+difficulty, in one call.
export function buildLessonLinkSources(pathSlug: string, difficulty: InterviewDifficulty): LessonLinkSources {
  const framework = loadCompetencyFramework(pathSlug);
  const competencies = new Map((framework?.competencies[difficulty] ?? []).map((c) => [c.id, c]));

  const scenarioLessonLinks = new Map(loadScenarioBank(pathSlug).scenarios.map((s) => [s.id, s.lessonLinks]));

  const seedQuestions = loadSeedQuestions(pathSlug, difficulty) as {
    id: string;
    lessonLink?: { courseSlug: string; lessonSlug: string; label: string };
  }[];
  const seedQuestionLessonLinks = new Map(seedQuestions.map((q) => [q.id, q.lessonLink ? [q.lessonLink] : []]));

  return { competencies, scenarioLessonLinks, seedQuestionLessonLinks };
}

function lessonRefsForItem(item: GradedItem, sources: LessonLinkSources): LessonLinkRef[] {
  if (item.itemType === "competency") return sources.competencies.get(item.itemId)?.lessonLinks ?? [];
  if (item.itemType === "scenario") return sources.scenarioLessonLinks.get(item.itemId) ?? [];
  if (item.itemType === "technical-question") return sources.seedQuestionLessonLinks.get(item.itemId) ?? [];
  return []; // project-ownership and communication are holistic — no single lesson fits
}

function toDetailedAnswer(item: GradedItem, sources: LessonLinkSources): DetailedAnswerDTO {
  return { ...item, recommendedLessons: resolveLessonLinks(lessonRefsForItem(item, sources)) };
}

export function buildStudentReport(args: {
  sessionId: string;
  careerPath: string;
  difficulty: InterviewDifficulty;
  completedAt: string | null;
  scored: ScoredSessionResult;
  lessonLinkSources: LessonLinkSources;
  certificate: { certificateNumber: string; issuedAt: string } | null;
  verifyUrlBase: string; // e.g. "/verify?number="
}): StudentReportDTO {
  const detailedAnswers = args.scored.gradedItems.map((item) => toDetailedAnswer(item, args.lessonLinkSources));

  const strengths = detailedAnswers.filter((a) => a.verdict === "met").sort((a, b) => b.score - a.score);
  const weaknesses = detailedAnswers.filter((a) => a.verdict === "not-met").sort((a, b) => a.score - b.score);
  const itemsNeedingReview = detailedAnswers.filter((a) => a.verdict === "needs-review");

  const competencyResults: CompetencyResultDTO[] = detailedAnswers
    .filter((a) => a.itemType === "competency")
    .map((a) => {
      const competency = args.lessonLinkSources.competencies.get(a.itemId);
      return {
        competencyId: a.itemId,
        name: competency?.name ?? a.itemId,
        met: a.verdict === "needs-review" ? null : a.verdict === "met",
        evidence: a.explanation,
        recommendedLessons: a.recommendedLessons,
      };
    });

  const projectOwnershipEvaluation = detailedAnswers.find((a) => a.itemType === "project-ownership") ?? null;

  return {
    sessionId: args.sessionId,
    careerPath: args.careerPath,
    difficulty: args.difficulty,
    outcome: args.scored.outcome,
    resultLabel: resultLabel(args.difficulty, args.scored.outcome),
    overallScore: args.scored.criteria.overallScore,
    categoryScores: args.scored.categoryScores,
    criteria: args.scored.criteria,
    strengths,
    weaknesses,
    detailedAnswers,
    competencyResults,
    projectOwnershipEvaluation,
    itemsNeedingReview,
    competencyGateNote: args.scored.competencyGate.note,
    certificate: args.certificate
      ? { certificateNumber: args.certificate.certificateNumber, issuedAt: args.certificate.issuedAt, verifyUrl: `${args.verifyUrlBase}${args.certificate.certificateNumber}` }
      : null,
    completedAt: args.completedAt,
  };
}

export function buildHistoryEntry(args: {
  sessionId: string;
  careerPath: string;
  difficulty: InterviewDifficulty;
  status: SessionStatus;
  startedAt: string;
  completedAt: string | null;
  outcome: InterviewOutcome | null;
  overallScore: number | null;
  hasCertificate: boolean;
}): HistoryEntryDTO {
  return { ...args };
}
