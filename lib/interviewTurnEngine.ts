// Shared "what does the interviewer say next" engine — extracted in Phase F
// (hands-free voice via Fish Audio Agents) so that BOTH the text-mode
// endpoint (netlify/functions/mock-interview-turn.ts) and the Fish Audio
// Agents Custom-LLM webhook (netlify/functions/mock-interview-agent-llm.ts)
// produce IDENTICAL questions, section timing, grading-at-the-45-minute
// boundary, and coaching behavior. "Maintain the existing interview scoring
// and certificate rules" is true by construction — one engine, not two
// copies kept in sync by hand.
//
// This file has ZERO knowledge of voice, Fish Audio, or HTTP. It takes a
// sessionId and the student's latest response TEXT — already transcribed,
// whether by typed input, push-to-talk's Fish ASR call, or Fish Audio
// Agents' own built-in speech recognition — and returns what the
// interviewer says next. That is what "keep the voice layer independent of
// the interview engine" (every phase's spec) means in practice.
import Anthropic from "@anthropic-ai/sdk";
import { prisma } from "./db";
import {
  loadCompetencyFramework,
  loadSeedQuestions,
  loadScenarioBank,
  loadProjectOwnershipPlaybook,
  competenciesAreEnforceable,
} from "./mockInterview";
import { selectUnaskedQuestions, selectUnaskedCompetencies } from "./interviewScoring";
import { runFormalAssessmentGrading, readStoredReport } from "./formalAssessmentPipeline";
import {
  SECTION_SCHEDULE,
  TOTAL_INTERVIEW_MINUTES,
  resultLabel,
  type InterviewSectionId,
  type InterviewDifficulty,
  type InterviewOutcome,
  type ScenarioQuestion,
  type ProjectOwnershipProbe,
  type ScoredSessionResult,
} from "./mockInterviewTypes";

const MAX_RESPONSE_LENGTH = 4000;
const MAX_HISTORY_TURNS = 16; // caps context growth over a long session

export type InterviewTurnResult =
  | { kind: "turn"; aiMessage: string; sectionChanged: boolean }
  | { kind: "complete"; aiMessage: string }
  // Session was already complete when this was called — not an error, just
  // nothing left to say. Callers decide how to surface this (HTTP 409 for
  // the text endpoint, a plain closing line for the Agents webhook, which
  // has no HTTP-status concept to hand back to Fish).
  | { kind: "no-op"; aiMessage: string };

function sectionForElapsedMinutes(minutes: number): InterviewSectionId {
  let cumulative = 0;
  for (const s of SECTION_SCHEDULE) {
    cumulative += s.minutes;
    if (minutes < cumulative) return s.id;
  }
  return "complete";
}

// Always reloads the session fresh rather than trusting a caller-held copy
// — Agents webhook calls can arrive seconds apart from different Fish
// infrastructure nodes, so there is no safe "I already have it in memory"
// shortcut the way a single Netlify Function invocation might assume.
export async function generateInterviewTurn(sessionId: string, studentResponseRaw: string | null): Promise<InterviewTurnResult> {
  const session = await prisma.mockInterviewSession.findUniqueOrThrow({
    where: { id: sessionId },
    include: { turns: { orderBy: { turnIndex: "asc" } } },
  });

  if (session.status === "complete") {
    return { kind: "no-op", aiMessage: "This interview has already ended." };
  }

  const studentResponse = (studentResponseRaw ?? "").trim().slice(0, MAX_RESPONSE_LENGTH);
  const isFirstTurn = session.turns.length === 0;

  // Record the student's answer to the most recent (unanswered) turn. Only
  // overwrites when non-empty — an empty/no-op response (e.g. the student
  // said nothing intelligible, or this really is the first turn) leaves the
  // prior turn's studentResponse as null rather than clobbering it with "".
  if (!isFirstTurn) {
    const lastTurn = session.turns[session.turns.length - 1];
    if (lastTurn.studentResponse === null && studentResponse) {
      await prisma.interviewTurn.update({ where: { id: lastTurn.id }, data: { studentResponse } });
    }
  }

  const elapsedSeconds = Math.floor((Date.now() - session.startedAt.getTime()) / 1000);
  const elapsedMinutes = elapsedSeconds / 60;
  const computedSection = sectionForElapsedMinutes(elapsedMinutes);
  const sectionChanged = computedSection !== session.currentSection;

  // The formal assessment just ended — grade BEFORE coaching begins, and
  // coaching must never change the score (guaranteed structurally, since
  // buildGradableItems() only ever reads formal-assessment-section turns,
  // which can't change after this point). Reading an existing report (e.g.
  // one an admin already resolved) is always free and always happens;
  // running a NEW live grading call only happens if explicitly enabled.
  let formalAssessmentReport: ScoredSessionResult | null = null;
  if (computedSection === "coaching" || computedSection === "complete") {
    const existingReport = await prisma.interviewReport.findUnique({ where: { sessionId: session.id } });
    if (existingReport) {
      formalAssessmentReport = readStoredReport(existingReport.reportJson, existingReport.outcome as InterviewOutcome);
    } else if (
      session.currentSection !== "coaching" &&
      session.currentSection !== "complete" &&
      process.env.MOCK_INTERVIEW_ENABLE_LIVE_GRADING === "true"
    ) {
      try {
        formalAssessmentReport = await runFormalAssessmentGrading(session.id, callClaudeForGrading);
      } catch (error) {
        console.error("interviewTurnEngine: formal assessment grading failed, coaching will fall back to generic guidance", error);
      }
    }
  }

  if (computedSection === "complete") {
    await prisma.mockInterviewSession.update({
      where: { id: session.id },
      data: { currentSection: "complete", status: "complete", completedAt: new Date() },
    });
    const closing = formalAssessmentReport
      ? `That's time — thank you for completing the Professional Mock Interview. Result: ${resultLabel(session.difficulty as InterviewDifficulty, formalAssessmentReport.outcome)} (overall score ${formalAssessmentReport.criteria.overallScore}/100). Your full report is ready in the student portal.`
      : "That's time — thank you for completing the Professional Mock Interview. Your detailed performance report is being prepared.";
    return { kind: "complete", aiMessage: closing };
  }

  const framework = loadCompetencyFramework(session.careerPath);
  const enforceable = competenciesAreEnforceable(framework);
  const difficulty = session.difficulty as InterviewDifficulty;

  // Adaptive question selection: never resurface a competency or seed
  // question this student has already been asked in this session —
  // computed fresh from persisted turn history every time, so it's correct
  // even across a resumed session or a reconnected Fish Agents call.
  const askedCompetencyIds = new Set(session.turns.map((t) => t.competencyId).filter((id): id is string => !!id));
  const askedQuestionIds = new Set(session.turns.map((t) => t.questionId).filter((id): id is string => !!id));

  const competenciesForDifficulty = selectUnaskedCompetencies(framework?.competencies?.[difficulty] ?? [], askedCompetencyIds, 4);
  const allSeedQuestions = loadSeedQuestions(session.careerPath, difficulty) as {
    id: string;
    title?: string;
    prompt: string;
    category?: string;
  }[];
  const seedQuestions = selectUnaskedQuestions({
    pool: allSeedQuestions,
    askedIds: askedQuestionIds,
    limit: 15,
    preferredCategories: ["technical-knowledge", "hands-on", "architecture"],
  });

  const projectOwnershipProbe: ProjectOwnershipProbe | null =
    computedSection === "project-ownership" ? loadProjectOwnershipPlaybook(session.careerPath).probes[difficulty]?.[0] ?? null : null;

  const scenarioQuestions: ScenarioQuestion[] =
    computedSection === "scenario-problem-solving"
      ? selectUnaskedQuestions({
          pool: loadScenarioBank(session.careerPath).scenarios.filter((s) => s.difficulty === difficulty),
          askedIds: askedQuestionIds,
          limit: 3,
        })
      : [];

  const history = session.turns.slice(-MAX_HISTORY_TURNS).flatMap((t) => {
    const msgs: Anthropic.MessageParam[] = [{ role: "assistant", content: t.aiMessage }];
    if (t.studentResponse) msgs.push({ role: "user", content: t.studentResponse });
    return msgs;
  });
  // The response we just recorded above may not be on `session.turns` yet
  // (loaded before the update), so append it explicitly when present.
  if (!isFirstTurn && studentResponse) {
    const lastRecorded = history[history.length - 1];
    if (!lastRecorded || lastRecorded.content !== studentResponse) {
      history.push({ role: "user", content: studentResponse });
    }
  }

  const sectionMeta = SECTION_SCHEDULE.find((s) => s.id === computedSection)!;

  const systemPrompt = buildSystemPrompt({
    careerPath: session.careerPath,
    difficulty,
    section: computedSection,
    sectionLabel: sectionMeta.label,
    elapsedMinutes,
    totalMinutes: TOTAL_INTERVIEW_MINUTES,
    isFirstTurn,
    competencies: competenciesForDifficulty,
    enforceable,
    seedQuestions,
    projectOwnershipProbe,
    scenarioQuestions,
    formalAssessmentReport,
  });

  const client = new Anthropic();
  const response = await client.messages.create({
    model: "claude-sonnet-5-5",
    max_tokens: 600,
    output_config: { effort: "medium" },
    system: systemPrompt,
    messages: isFirstTurn ? [{ role: "user", content: "Begin the interview." }] : history,
  });

  const textBlock = response.content.find((b) => b.type === "text");
  const raw = textBlock && textBlock.type === "text" ? textBlock.text : "";
  const parsed = parseTurnOutput(raw);

  const turnIndex = session.turns.length;
  await prisma.interviewTurn.create({
    data: {
      sessionId: session.id,
      turnIndex,
      section: computedSection,
      competencyId: parsed.competencyId,
      questionId: parsed.questionId,
      aiMessage: parsed.message,
      studentResponse: null,
      elapsedSeconds,
    },
  });

  if (sectionChanged) {
    await prisma.mockInterviewSession.update({ where: { id: session.id }, data: { currentSection: computedSection } });
  }

  return { kind: "turn", aiMessage: parsed.message, sectionChanged };
}

function buildSystemPrompt(args: {
  careerPath: string;
  difficulty: InterviewDifficulty;
  section: InterviewSectionId;
  sectionLabel: string;
  elapsedMinutes: number;
  totalMinutes: number;
  isFirstTurn: boolean;
  competencies: { id: string; name: string; description: string; assessmentQuestions: string[] }[];
  enforceable: boolean;
  seedQuestions: { id: string; prompt: string; title?: string }[];
  projectOwnershipProbe: ProjectOwnershipProbe | null;
  scenarioQuestions: ScenarioQuestion[];
  formalAssessmentReport: ScoredSessionResult | null;
}): string {
  const competencyBlock = args.competencies.length
    ? args.competencies
        .map((c) => `- [${c.id}] ${c.name}: ${c.description}\n  Example prompts: ${c.assessmentQuestions.join(" | ")}`)
        .join("\n")
    : "(No competency framework has been drafted for this career path yet — ask strong general technical questions for the difficulty level instead.)";

  const enforceableNote = args.enforceable
    ? "The Critical Competency Framework above has been administrator-approved. You may treat these as must-demonstrate competencies, but you must still offer ONE neutral clarification question before treating any single competency as unmet — never declare a failure outright mid-interview."
    : "IMPORTANT: The Critical Competency Framework above is still a DRAFT and has NOT been approved by an administrator. Use it only to choose good, relevant questions — do NOT tell the student they have failed, passed, or are at risk of failing anything. Never mention scoring, passing, or failing during the interview itself. Just ask strong questions and let their answers speak for themselves; scoring happens separately, after approval.";

  const seedBlock = args.seedQuestions.length
    ? args.seedQuestions.map((q) => `- [${q.id}] ${q.title ?? ""}: ${q.prompt}`).join("\n").slice(0, 6000)
    : "(No seed question bank found for this path/difficulty.)";

  const sectionSpecificBlock = buildSectionSpecificBlock(args.section, args.projectOwnershipProbe, args.scenarioQuestions, args.formalAssessmentReport);

  return `You are the AI interviewer conducting the "LTV Academy Professional Mock Interview" — a premium, realistic technical interview simulation for the "${args.careerPath}" career path at "${args.difficulty}" difficulty.

This is a REAL professional-interview experience, not a quiz. Ask one clear, natural question or follow-up at a time. Listen to what the student actually says and adapt — do not simply read questions off a list verbatim. You may draw inspiration from the seed questions below, but phrase things conversationally, the way a real senior interviewer would. Every question or competency you've already used in this session is excluded from the lists below — never ask about the same thing twice.

Schedule (54 minutes total, you are currently in the "${args.sectionLabel}" section, ~${Math.round(args.elapsedMinutes)} of ${args.totalMinutes} minutes elapsed):
${SECTION_SCHEDULE.map((s) => `- ${s.label} (${s.minutes} min)`).join("\n")}
There is no separate introduction section — the clock starts at the first technical-competency question. The first 45 minutes are the formal assessment. The final 9 minutes ("Corrections and coaching") happen only after the formal assessment — if you are in that section, shift tone: explain what was strong/weak, give stronger example answers, and recommend specific LTV Academy lessons, instead of asking new assessment questions. Nothing you say in the coaching section affects the score — that has already been finalized from the formal assessment alone.

${args.isFirstTurn ? "This is the very first message of the interview. Give a brief, warm, professional greeting (a sentence or two — do NOT spend time on a separate introduction/background phase), then move directly into your first technical-competency question for this difficulty. The greeting itself doesn't use up assessment time, but don't pad it — get to the first real question quickly." : "Continue the interview naturally from the conversation so far."}

Critical Competency Framework for this difficulty (for question selection — see enforcement note below):
${competencyBlock}

${enforceableNote}

Seed question bank for this path/difficulty (for inspiration/grounding — adapt, don't recite):
${seedBlock}

${sectionSpecificBlock}

Respond with ONLY a single JSON object, no other text, in this exact shape:
{"message": "<what you say to the student next>", "competencyId": "<id from the framework above if this message is probing one, else null>", "questionId": "<id from the seed bank, the project-ownership probe, or the scenario bank if this message is drawn from one of those, else null>"}`;
}

function buildSectionSpecificBlock(
  section: InterviewSectionId,
  probe: ProjectOwnershipProbe | null,
  scenarios: ScenarioQuestion[],
  formalAssessmentReport: ScoredSessionResult | null
): string {
  if (section === "coaching") {
    if (!formalAssessmentReport) {
      return "Coaching section: the formal assessment's score has already been finalized (or grading is pending) — you don't have the detailed breakdown available right now, so coach generically: review the overall flow of the interview from the conversation above, call out anything you noticed that was strong or weak, and recommend they revisit the LTV Academy lessons most relevant to whatever seemed shakiest. Do not invent a specific score or pass/fail result you don't actually have.";
    }
    const weak = formalAssessmentReport.gradedItems.filter((i) => i.verdict === "not-met").map((i) => `- ${i.itemId}: ${i.explanation}`);
    const strong = formalAssessmentReport.gradedItems.filter((i) => i.verdict === "met").map((i) => `- ${i.itemId}: ${i.explanation}`);
    return `Coaching section — the formal assessment is FINALIZED and scored (overall ${formalAssessmentReport.criteria.overallScore}/100, category scores: technical ${formalAssessmentReport.categoryScores.technicalKnowledge}, project ownership ${formalAssessmentReport.categoryScores.projectOwnership}, scenario reasoning ${formalAssessmentReport.categoryScores.scenarioReasoning}, communication ${formalAssessmentReport.categoryScores.communication}). Use this REAL evidence to coach — do not ask new assessment questions, and nothing you say here can change the score, which is already locked in:
Strengths to acknowledge:
${strong.length ? strong.join("\n") : "(none scored as a clear strength)"}
Weaknesses to coach on — be specific and constructive, and point them toward revisiting the relevant LTV Academy lesson(s) when one is available from the context above:
${weak.length ? weak.join("\n") : "(no clear weaknesses — focus coaching on polish and interview presence)"}`;
  }

  if (section === "project-ownership") {
    if (!probe) {
      return "Project-ownership section: no playbook has been drafted for this path/difficulty yet — ask the student to walk you through a real project they built and press for specifics (what exactly they did, why, what broke) using your own judgment.";
    }
    return `Project-ownership section — use this playbook (id: ${probe.id}). Open with the prompt, then use the follow-ups ADAPTIVELY based on what the student actually says — you don't have to ask every follow-up, and you can reorder them, but your goal is genuinely separating hands-on ownership from a rehearsed or team-credited answer:
Opening prompt: ${probe.prompt}
Follow-ups available: ${probe.followUps.map((f) => `"${f}"`).join(" | ")}
What a passing answer looks like: ${probe.passingCriteria}
What a failing answer looks like: ${probe.failingCriteria}
Set questionId to "${probe.id}" for every message in this section.`;
  }

  if (section === "scenario-problem-solving") {
    if (!scenarios.length) {
      return "Scenario-based problem-solving section: no scenario bank has been drafted for this path/difficulty yet — pose a realistic workplace problem for this role using your own judgment and probe their reasoning process.";
    }
    return `Scenario-based problem-solving section — pose ONE of these realistic workplace scenarios at a time (pick one not yet used), let the student reason through it out loud, and ask natural follow-ups about their reasoning (don't just accept a one-line answer):
${scenarios.map((s) => `- [${s.id}] ${s.title}: ${s.prompt}`).join("\n")}
Set questionId to the scenario's id (e.g. "${scenarios[0].id}") when you pose or follow up on one of these.`;
  }

  return "";
}

function parseTurnOutput(raw: string): { message: string; competencyId: string | null; questionId: string | null } {
  try {
    const cleaned = raw.trim().replace(/^```json\s*/i, "").replace(/```\s*$/, "");
    const obj = JSON.parse(cleaned);
    if (typeof obj.message === "string" && obj.message.trim()) {
      return {
        message: obj.message.trim(),
        competencyId: typeof obj.competencyId === "string" ? obj.competencyId : null,
        questionId: typeof obj.questionId === "string" ? obj.questionId : null,
      };
    }
  } catch {
    // fall through — treat the raw text as the message so a malformed JSON
    // response never breaks the interview for the student
  }
  return { message: raw.trim() || "Could you tell me more about that?", competencyId: null, questionId: null };
}

// The real production grading call — only ever reached when
// MOCK_INTERVIEW_ENABLE_LIVE_GRADING=true. Every automated test exercises
// the pipeline with a mock `callModel` instead and never imports this.
async function callClaudeForGrading(system: string, user: string): Promise<string> {
  const client = new Anthropic();
  const response = await client.messages.create({
    model: "claude-sonnet-5-5",
    max_tokens: 4096,
    output_config: { effort: "medium" },
    system,
    messages: [{ role: "user", content: user }],
  });
  const textBlock = response.content.find((b) => b.type === "text");
  return textBlock && textBlock.type === "text" ? textBlock.text : "{}";
}

export async function reloadSessionDTO(sessionId: string) {
  const session = await prisma.mockInterviewSession.findUniqueOrThrow({
    where: { id: sessionId },
    include: { turns: { orderBy: { turnIndex: "asc" } } },
  });
  return {
    id: session.id,
    careerPath: session.careerPath,
    difficulty: session.difficulty,
    mode: session.mode,
    currentSection: session.currentSection,
    status: session.status,
    startedAt: session.startedAt.toISOString(),
    turns: session.turns.map((t) => ({
      id: t.id,
      turnIndex: t.turnIndex,
      section: t.section,
      competencyId: t.competencyId,
      questionId: t.questionId,
      aiMessage: t.aiMessage,
      studentResponse: t.studentResponse,
      elapsedSeconds: t.elapsedSeconds,
    })),
  };
}
