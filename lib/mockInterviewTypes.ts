// Pure types for the LTV Academy Professional Mock Interview — no fs/path,
// so this is safe to import from client components, following the same
// split as interviewPrepTypes.ts / lib/interviewPrep.ts and
// finalTestTypes.ts / lib/finalTest.ts: types + pure logic here,
// fs-based content loading in lib/mockInterview.ts.
//
// Voice provider is intentionally not referenced anywhere in this file —
// per the approved spec, the interview logic layer must stay provider-
// independent until a voice provider is selected (Phase E).

export type InterviewDifficulty = "beginner" | "intermediate" | "advanced";

// "introduction" was removed per the administrator's timing revision
// (2026-11): there is no separate, timed introduction/background section
// any more. The interview opens with a brief, untimed greeting folded into
// the very first "technical-competency" message — see the isFirstTurn
// branch in netlify/functions/mock-interview-turn.ts's buildSystemPrompt —
// so the greeting consumes no section's clock, by construction: there's no
// bucket for it to consume.
export type InterviewSectionId =
  | "technical-competency"
  | "project-ownership"
  | "scenario-problem-solving"
  | "coaching"
  | "complete";

// Minutes are the administrator-approved schedule (revised 2026-11; 54 min
// total, 45 of which are the formal scored assessment, the last 9 are
// coaching).
export const SECTION_SCHEDULE: { id: InterviewSectionId; label: string; minutes: number }[] = [
  { id: "technical-competency", label: "Core technical competency questions", minutes: 20 },
  { id: "project-ownership", label: "Project explanation and technical ownership", minutes: 15 },
  { id: "scenario-problem-solving", label: "Scenario-based problem solving", minutes: 10 },
  { id: "coaching", label: "Corrections and coaching", minutes: 9 },
];

export const FORMAL_ASSESSMENT_MINUTES = 45; // everything before "coaching"
export const TOTAL_INTERVIEW_MINUTES = 54;

export function sectionEndMinute(sectionId: InterviewSectionId): number {
  let total = 0;
  for (const s of SECTION_SCHEDULE) {
    total += s.minutes;
    if (s.id === sectionId) return total;
  }
  return TOTAL_INTERVIEW_MINUTES;
}

// The formal, scored portion of the interview — everything up to but not
// including "coaching". Spec requirement 11: coaching must not change the
// formal assessment score, so this is the single gate every evidence-
// assembly step (lib/interviewScoring.ts's buildGradableItems) filters
// turns through before any judgment is counted. "complete" is excluded too
// — it's a terminal marker, never a section a turn is asked in.
export const FORMAL_ASSESSMENT_SECTIONS: readonly InterviewSectionId[] = [
  "technical-competency",
  "project-ownership",
  "scenario-problem-solving",
];

export function isFormalAssessmentSection(section: InterviewSectionId): boolean {
  return FORMAL_ASSESSMENT_SECTIONS.includes(section);
}

// ---------------------------------------------------------------------------
// Critical Competency Framework (spec section 5). Drafted per career path +
// difficulty, stored as content/mock-interview/<pathSlug>/competencies.json,
// and MUST be explicitly approved (approved: true) before a session is
// allowed to apply automatic-fail logic against it — see
// lib/mockInterview.ts's loadCompetencyFramework().
// ---------------------------------------------------------------------------

// A reference to a real lesson in the existing course catalog (lib/courses.ts)
// — never an invented recommendation. lib/interviewReport.ts resolves these
// against the actual catalog before showing them to a student (spec
// requirement 4); a stale/typo'd reference is dropped, never faked into
// looking valid.
export type LessonLinkRef = { courseSlug: string; lessonSlug: string; label: string };

export type CriticalCompetency = {
  id: string; // e.g. "snowflake-beg-warehouse-vs-db"
  name: string;
  description: string;
  difficulty: InterviewDifficulty;
  assessmentQuestions: string[]; // the question(s) used to probe this competency
  expectedKnowledge: string; // what a competent answer actually demonstrates
  passingCriteria: string; // observable, not vibes-based
  failingCriteria: string; // observable, not vibes-based
  clarificationPrompt: string; // the one neutral follow-up allowed before scoring a fail
  lessonLinks: LessonLinkRef[];
};

export type CompetencyFramework = {
  careerPath: string;
  // Explicit admin gate (spec: "Do not activate automatic critical-failure
  // decisions until I approve the competency framework."). A session must
  // refuse to apply auto-fail logic while this is false — see
  // lib/mockInterview.ts.
  approved: boolean;
  approvedAt: string | null;
  approvedBy: string | null;
  competencies: Record<InterviewDifficulty, CriticalCompetency[]>;
};

// ---------------------------------------------------------------------------
// Scenario bank (spec section 6) — same shape pattern as competencies, one
// file per career path.
// ---------------------------------------------------------------------------

export type ScenarioQuestion = {
  id: string;
  title: string;
  prompt: string;
  difficulty: InterviewDifficulty;
  skills: string[];
  assessmentFocus: string[]; // e.g. ["troubleshooting methodology", "communication"]
  modelApproach: string; // what a strong answer's reasoning process looks like
  // Observable rubric, same shape/spirit as CriticalCompetency's — judged by
  // an AI reader against reasoning and accuracy, never by matching literal
  // words (spec requirement 3, Phase B revision: keyword/phrase matching was
  // removed as a grading basis).
  passingCriteria: string;
  failingCriteria: string;
  lessonLinks: LessonLinkRef[];
};

export type ScenarioBank = {
  careerPath: string;
  scenarios: ScenarioQuestion[];
};

// ---------------------------------------------------------------------------
// Project Ownership playbook (Phase B, spec requirement 3) — the 15-minute
// "project explanation and technical ownership" section. Same per-career-path
// file pattern as competencies/scenarios. Each probe pairs an opening prompt
// with follow-ups designed to separate genuine hands-on ownership from a
// rehearsed or team-credited answer — the follow-ups are what actually test
// understanding, not the opening question.
// ---------------------------------------------------------------------------

export type ProjectOwnershipProbe = {
  id: string;
  prompt: string; // the opening, open-ended "tell me about a project" style question
  followUps: string[]; // asked adaptively based on what the student actually says
  // Observable rubric an AI reader judges the WHOLE project-ownership
  // conversation (opening + follow-ups together) against — reasoning and
  // demonstrated understanding, not literal phrasing (spec requirement 3,
  // Phase B revision: keyword/phrase matching was removed as a grading basis).
  passingCriteria: string; // what genuine, first-person technical ownership actually sounds like
  failingCriteria: string; // what a shallow, rehearsed, or team-credited answer actually sounds like
};

export type ProjectOwnershipPlaybook = {
  careerPath: string;
  probes: Record<InterviewDifficulty, ProjectOwnershipProbe[]>;
};

// ---------------------------------------------------------------------------
// Session + turn shapes mirrored from the Prisma models (prisma/schema.prisma)
// for use in API request/response bodies and client components, without
// importing @prisma/client (which is server-only) into client code.
// ---------------------------------------------------------------------------

export type InterviewMode = "text" | "voice";

export type SessionStatus = "in-progress" | "interrupted" | "complete";

// ---------------------------------------------------------------------------
// Scoring + certificate eligibility (spec section 7, and the certificate-
// gating update: ONLY Advanced-difficulty passes are certificate-eligible —
// Beginner/Intermediate always get their score, coaching, and full report,
// but never a certificate, regardless of score. This is the single source
// of truth for that rule; every place that might issue a certificate or
// display a result MUST go through these functions, not reimplement the
// check — see lib/certificateIssuance.ts for the backend enforcement point.
// ---------------------------------------------------------------------------

// "needs-review" (Phase B revision, spec requirement 9): when the AI grader
// could not reliably judge one or more answers, the session must land here
// instead of being auto-failed (or auto-passed). It is decided BEFORE
// computeOutcome ever runs — see lib/interviewScoring.ts's scoreGradedItems
// — so computeOutcome itself is untouched and still only ever returns the
// original three values; "needs-review" is a value the outcome variable can
// hold, not a value this function produces.
export type InterviewOutcome = "pass" | "fail" | "incomplete" | "needs-review";

export type PassingCriteria = {
  overallScore: number; // 0-100
  correctAnswerRatio: number; // 0-1 (fraction of assessed questions answered correctly)
  allCriticalCompetenciesMet: boolean;
  projectOwnershipPassed: boolean;
  allSkillAreasAboveMinimum: boolean;
};

// All five requirements are AND-ed — a high overall score can never override
// a failed mandatory requirement (spec section 7, explicit).
export function computeOutcome(criteria: PassingCriteria, wasFullyAssessed: boolean): InterviewOutcome {
  if (!wasFullyAssessed) return "incomplete";
  const passed =
    criteria.overallScore >= 80 &&
    criteria.correctAnswerRatio > 0.5 &&
    criteria.allCriticalCompetenciesMet &&
    criteria.projectOwnershipPassed &&
    criteria.allSkillAreasAboveMinimum;
  return passed ? "pass" : "fail";
}

// Only Advanced is certificate-eligible. Changing this list is the ONLY
// sanctioned way to change which difficulties can earn a certificate —
// never special-case a difficulty check anywhere else in the codebase.
export const CERTIFICATE_ELIGIBLE_DIFFICULTIES: readonly InterviewDifficulty[] = ["advanced"];

export function isCertificateEligible(difficulty: InterviewDifficulty, outcome: InterviewOutcome): boolean {
  return outcome === "pass" && CERTIFICATE_ELIGIBLE_DIFFICULTIES.includes(difficulty);
}

// The exact, student-facing result label — distinguishes "passed the
// assessment" from "earned a certificate" per spec: a Beginner/Intermediate
// pass must read "Passed — Certificate Not Eligible," never look like a
// plain pass or imply a certificate is coming.
export function resultLabel(difficulty: InterviewDifficulty, outcome: InterviewOutcome): string {
  if (outcome === "incomplete") return "Incomplete";
  if (outcome === "needs-review") return "Pending Review";
  if (outcome === "fail") return "Not Passed";
  return isCertificateEligible(difficulty, outcome) ? "Passed — Certificate Earned" : "Passed — Certificate Not Eligible";
}

export type TurnDTO = {
  id: string;
  turnIndex: number;
  section: InterviewSectionId;
  competencyId: string | null;
  questionId: string | null;
  aiMessage: string;
  studentResponse: string | null;
  elapsedSeconds: number;
};

// ---------------------------------------------------------------------------
// Interview Intelligence — structured scoring (Phase B, spec requirements
// 4–9, revised per the administrator's second-round approval). See
// lib/interviewScoring.ts for:
//   - buildGradableItems(): deterministically walks the formal-assessment
//     transcript and attaches the right rubric to each thing that needs grading.
//   - buildGradingPrompt() / gradeFormalAssessment(): the ONE AI pass over the
//     whole formal transcript (run at the 48-minute mark, before coaching —
//     requirement 11) that returns structured per-item judgments. The AI
//     never decides pass/fail/certificate — only verdict+score+explanation
//     per item (requirement 4).
//   - scoreGradedItems(): the deterministic aggregator that turns those
//     judgments into PassingCriteria/InterviewOutcome. This is the only
//     place pass/fail is decided, and it's pure — fully testable with
//     fixture judgments standing in for "mock AI responses" (requirement 13),
//     never a live model call.
// This file only holds the shapes — no logic.
// ---------------------------------------------------------------------------

export type CategoryScores = {
  technicalKnowledge: number; // 0-100
  projectOwnership: number; // 0-100
  scenarioReasoning: number; // 0-100
  communication: number; // 0-100
};

export type GradingItemType = "competency" | "technical-question" | "project-ownership" | "scenario" | "communication";

// A verdict the AI is explicitly told it's allowed to return when an answer
// is ambiguous or it cannot reliably judge it (spec requirement 9) — this is
// NOT a third way to fail; scoreGradedItems() routes any "needs-review" item
// to the whole-session "needs-review" outcome instead of auto-failing it.
export type GradingVerdict = "met" | "not-met" | "needs-review";

// Everything needed to grade ONE thing, assembled deterministically from the
// transcript + content BEFORE the AI ever sees it — the AI only has to
// return a verdict, not transcribe the question/answer/rubric back, which
// would risk drift from the real record (spec requirement 8 wants the exact
// question/answer/rubric preserved, so our own code attaches them, not the model).
export type GradableItem = {
  itemId: string;
  itemType: GradingItemType;
  section: InterviewSectionId;
  questionAsked: string;
  studentAnswer: string;
  rubric: string; // human-readable: passing + failing criteria, flattened to one string for the prompt and the report
};

// What the AI grader itself returns per item — deliberately minimal (spec
// requirement 4: structured evidence-based judgments, not a pass/fail call).
export type AIGradingJudgment = {
  itemId: string;
  verdict: GradingVerdict;
  score: number; // 0-100
  explanation: string; // must be grounded in the student's actual answer
};

// A GradableItem merged with its AIGradingJudgment — the full record spec
// requirement 8 demands: question asked, student's answer, rubric, score,
// and an explanation supported by the answer, all in one place.
export type GradedItem = GradableItem & Pick<AIGradingJudgment, "verdict" | "score" | "explanation">;

export type ScoredSessionResult = {
  outcome: InterviewOutcome;
  criteria: PassingCriteria;
  categoryScores: CategoryScores;
  gradedItems: GradedItem[];
  // Items the AI marked "needs-review" — surfaced separately so an admin
  // reviewing a "needs-review" session knows exactly what to look at,
  // without re-deriving it from gradedItems.
  itemsNeedingReview: GradedItem[];
  // Explains whether the Critical Competency Framework's auto-fail gate
  // actually ran, so a report (or an admin) never mistakes "framework not
  // yet approved, so this never could have failed" for "this student
  // demonstrated every competency."
  competencyGate: { enforced: boolean; note: string };
};

export type SessionDTO = {
  id: string;
  careerPath: string;
  difficulty: InterviewDifficulty;
  mode: InterviewMode;
  currentSection: InterviewSectionId;
  status: SessionStatus;
  startedAt: string;
  turns: TurnDTO[];
};

export type StartSessionRequest = {
  careerPath: string;
  difficulty: InterviewDifficulty;
  mode?: InterviewMode;
  // Dev-mode only (Phase A/B, before Wix payment wiring lands in Phase D):
  // a stand-in for the real wixOrderId/member-token flow, so the session +
  // credit machinery can be built and tested before payments are connected.
  devStudentEmail?: string;
};

export type SubmitTurnRequest = {
  sessionId: string;
  studentResponse: string;
  accessToken: string; // spec requirement 9 — required on every turn, not just at creation
};

export type SubmitTurnResponse = {
  session: SessionDTO;
  aiMessage: string;
  sectionChanged: boolean;
};

// ---------------------------------------------------------------------------
// Phase C — Student Results, Coaching, and Certificates. Pure DTO shapes
// only; lib/interviewReport.ts (requirements 1, 2, 4) and
// lib/formalAssessmentPipeline.ts (orchestration, requirements 3, 8, 11)
// build these from ScoredSessionResult + the transcript + the course catalog.
// ---------------------------------------------------------------------------

export type ResolvedLessonLink = LessonLinkRef & { url: string };

// One fully-explained graded item, student-facing (spec requirement 2):
// the question asked, the student's answer, the rubric, the score, and the
// explanation — plus any real lesson(s) it maps to (requirement 4).
export type DetailedAnswerDTO = GradedItem & { recommendedLessons: ResolvedLessonLink[] };

export type CompetencyResultDTO = {
  competencyId: string;
  name: string;
  met: boolean | null; // null = not yet scored (needs-review, or never graded)
  evidence: string | null;
  recommendedLessons: ResolvedLessonLink[];
};

export type CertificateSummaryDTO = {
  certificateNumber: string;
  issuedAt: string;
  verifyUrl: string;
};

// The full student-facing report (requirement 1). outcome stays
// InterviewOutcome ("needs-review" included) so the UI can show "pending
// administrator review" honestly instead of guessing at a pass/fail.
export type StudentReportDTO = {
  sessionId: string;
  careerPath: string;
  difficulty: InterviewDifficulty;
  outcome: InterviewOutcome;
  resultLabel: string;
  overallScore: number;
  categoryScores: CategoryScores;
  criteria: PassingCriteria;
  strengths: DetailedAnswerDTO[]; // verdict "met", highest-scoring first
  weaknesses: DetailedAnswerDTO[]; // verdict "not-met", lowest-scoring first
  detailedAnswers: DetailedAnswerDTO[]; // every graded item, transcript order (requirement 2)
  competencyResults: CompetencyResultDTO[];
  projectOwnershipEvaluation: DetailedAnswerDTO | null;
  itemsNeedingReview: DetailedAnswerDTO[];
  competencyGateNote: string;
  certificate: CertificateSummaryDTO | null;
  completedAt: string | null;
};

// One row in a student's interview history (requirement 5). Deliberately
// thin — the history list is not the place to show full transcripts; a
// student opens a specific entry to reach the full StudentReportDTO.
export type HistoryEntryDTO = {
  sessionId: string;
  careerPath: string;
  difficulty: InterviewDifficulty;
  status: SessionStatus;
  outcome: InterviewOutcome | null; // null: session isn't complete, or grading hasn't run yet
  overallScore: number | null;
  startedAt: string;
  completedAt: string | null;
  hasCertificate: boolean;
};

// The ONLY thing a public, unauthenticated visitor may ever see about a
// certificate (spec requirement 7) — no score, no transcript, no email.
export type PublicCertificateVerificationDTO =
  | { valid: true; certificateNumber: string; studentName: string; careerPath: string; difficulty: InterviewDifficulty; issuedAt: string }
  | { valid: false; certificateNumber: string };

// One session awaiting the administrator's resolution (requirement 8) — the
// admin sees exactly the evidence the AI grader saw (and produced), so a
// decision is made from the same record a student could later ask about.
export type AdminReviewSessionDTO = {
  sessionId: string;
  careerPath: string;
  difficulty: InterviewDifficulty;
  studentEmail: string;
  startedAt: string;
  categoryScores: CategoryScores;
  criteria: PassingCriteria;
  allGradedItems: GradedItem[];
  itemsNeedingReview: GradedItem[];
};

export type AdminResolutionInput = {
  itemId: string;
  verdict: GradingVerdict; // the admin's final call for this one item
  score?: number; // optional override; keeps the AI's score if omitted
  adminNote?: string;
};

export type AdminResolveRequest = {
  sessionId: string;
  resolutions: AdminResolutionInput[];
  adminName: string;
};
