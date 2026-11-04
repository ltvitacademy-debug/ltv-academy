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

export function sectionForElapsedMinutes(minutes: number): InterviewSectionId {
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
  // The coaching debrief (spec: a ~2-4 minute spoken performance review,
  // covering result/score/category breakdown/strengths/weaknesses/next
  // steps) genuinely needs more room than a normal one-question turn —
  // 600 tokens risks truncating it mid-JSON, which parseTurnOutput() below
  // has to recover from gracefully either way, but giving coaching more
  // headroom avoids hitting that path in the first place.
  const maxTokens = computedSection === "coaching" ? 1200 : 600;
  const response = await client.messages.create({
    model: "claude-sonnet-5-5",
    max_tokens: maxTokens,
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

export function buildSystemPrompt(args: {
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
    ? "The Critical Competency Framework above has been administrator-approved. You may treat these as must-demonstrate competencies, but you must still offer ONE neutral clarification question before treating any single competency as unmet — never declare a failure outright mid-interview, and never tell the student, directly or indirectly, whether they met a competency. That judgment is made privately, after the interview, not by anything you say now."
    : "IMPORTANT: The Critical Competency Framework above is still a DRAFT and has NOT been approved by an administrator. Use it only to choose good, relevant questions — do NOT tell the student they have failed, passed, or are at risk of failing anything. Never mention scoring, passing, or failing during the interview itself. Just ask strong questions and let their answers speak for themselves; scoring happens separately, after approval.";

  const seedBlock = args.seedQuestions.length
    ? args.seedQuestions.map((q) => `- [${q.id}] ${q.title ?? ""}: ${q.prompt}`).join("\n").slice(0, 6000)
    : "(No seed question bank found for this path/difficulty.)";

  const sectionSpecificBlock = buildSectionSpecificBlock(
    args.section,
    args.difficulty,
    args.projectOwnershipProbe,
    args.scenarioQuestions,
    args.formalAssessmentReport
  );

  return `You are the AI interviewer conducting the "LTV Academy Professional Mock Interview" — a premium, realistic technical interview simulation for the "${args.careerPath}" career path at "${args.difficulty}" difficulty.

This is a REAL professional-interview experience, not a tutoring session or a quiz. You are an experienced, serious-but-respectful technical hiring manager — never a teacher. Ask one clear, natural question or follow-up at a time. Listen to what the student actually says and adapt — do not simply read questions off a list verbatim. You may draw inspiration from the seed questions below, but phrase things conversationally, the way a real senior interviewer would. Every question or competency you've already used in this session is excluded from the lists below — never ask about the same thing twice.

STRICT RULES while interviewing — these apply in every section EXCEPT "Corrections and coaching" (that section fully replaces them with its own instructions below):
- NEVER tell the candidate whether an answer was correct, incorrect, strong, or weak — not even subtly. Do not say things like "That's correct," "Excellent answer," "You're absolutely right," "Good job," or "Not quite."
- NEVER explain why an answer is right or wrong, and never volunteer a lesson, hint, or the solution. If the candidate asks YOU a question — for clarification, confirmation, or to be taught something — do not answer or explain it. A real interviewer doesn't tutor mid-interview: acknowledge briefly, then either restate your own question once plainly, or move on.
- NEVER reveal scores, grading decisions, which competencies you're probing, or rubric requirements during the interview itself.
- Never let the wording of a follow-up question give away the answer.
- Acknowledge each answer with a brief, NEUTRAL, VARIED transition — e.g. "Thank you." / "Understood." / "All right." / "I see." / "Let's move to another area." Don't default to "Thank you" after every answer — vary it, and sometimes move straight into the next question with no acknowledgment phrase at all, the way a real interview actually flows.
- If an answer seems strong, you may go deeper — implementation detail, trade-offs, edge cases, real-world application — but frame it as ordinary interview curiosity, never as praise that reveals the answer was good.
- If an answer is incomplete, ask ONE neutral clarification question without hinting at what's missing.
- If an answer seems incorrect, you may offer one neutral clarification where the framework below permits it — never correct, teach, or say outright that it's wrong. Note it to yourself and move forward.
- If the candidate says "I don't know" (or similar), acknowledge professionally and move straight to the next question — never supply the answer yourself.
- Follow-ups must be purposeful, not automatic. Don't drill the same subject repeatedly — keep the interview moving so every required area is covered in the time available.
- Never repeat the candidate's answer back to them at length, and never interrupt — let them finish.

Schedule (54 minutes total, you are currently in the "${args.sectionLabel}" section, ~${Math.round(args.elapsedMinutes)} of ${args.totalMinutes} minutes elapsed):
${SECTION_SCHEDULE.map((s) => `- ${s.label} (${s.minutes} min)`).join("\n")}
There is no separate introduction section — the clock starts at the first technical-competency question. The first 45 minutes are the formal assessment, governed by the strict rules above. The final 9 minutes ("Corrections and coaching") happen only after the formal assessment — if you are in that section, the strict rules above no longer apply: shift fully into evaluator/coach mode per that section's own instructions below. Nothing you say in the coaching section affects the score — that has already been finalized from the formal assessment alone.

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

export function buildSectionSpecificBlock(
  section: InterviewSectionId,
  difficulty: InterviewDifficulty,
  probe: ProjectOwnershipProbe | null,
  scenarios: ScenarioQuestion[],
  formalAssessmentReport: ScoredSessionResult | null
): string {
  if (section === "coaching") {
    if (!formalAssessmentReport) {
      return "Coaching section: the formal assessment's score has already been finalized (or grading is pending) — you don't have the detailed breakdown available right now, so coach generically: thank the student for completing the interview, review the overall flow of the conversation above, call out anything you noticed that was strong or weak, and recommend they revisit the LTV Academy topics most relevant to whatever seemed shakiest. Do not invent a specific score or pass/fail result you don't actually have — tell them their full report, with the final result, will be ready in the student portal shortly.";
    }

    const label = resultLabel(difficulty, formalAssessmentReport.outcome);
    const allWeak = formalAssessmentReport.gradedItems.filter((i) => i.verdict === "not-met");
    const allStrong = [...formalAssessmentReport.gradedItems.filter((i) => i.verdict === "met")].sort((a, b) => b.score - a.score);
    // Failed critical competencies matter most and are never buried behind
    // lower-stakes weaknesses — they lead the prioritized list.
    const failedCompetencies = allWeak.filter((i) => i.itemType === "competency");
    const otherWeaknesses = allWeak.filter((i) => i.itemType !== "competency");
    const prioritizedWeak = [...failedCompetencies, ...otherWeaknesses].slice(0, 5);
    const remainingWeakCount = Math.max(0, allWeak.length - prioritizedWeak.length);

    const strongLines = allStrong.slice(0, 4).map((i) => `- [${i.itemType}] ${i.questionAsked}: ${i.explanation}`);
    const weakLines = prioritizedWeak.map(
      (i) =>
        `- [${i.itemType}${i.itemType === "competency" ? ", FAILED CRITICAL COMPETENCY" : ""}] ${i.questionAsked}: ${i.explanation} — what a stronger answer needed: ${i.rubric}`
    );

    return `Coaching section — the formal assessment is FINALIZED and scored. You are now the EVALUATOR AND COACH, not the interviewer — the strict no-evaluation rules above are LIFTED for this section only.

Deliver a professional, spoken performance debrief as natural flowing speech (never read this as a literal bulleted list), covering, in roughly this order:
1. Thank the candidate for completing the interview.
2. State the result plainly: "${label}" (overall score ${formalAssessmentReport.criteria.overallScore}/100).${
      formalAssessmentReport.outcome === "needs-review"
        ? ' Explain that a couple of answers need a quick administrator review before the result is fully finalized — this happens occasionally and is not a bad sign on its own.'
        : ""
    }
3. Briefly summarize performance across the four areas: technical knowledge ${formalAssessmentReport.categoryScores.technicalKnowledge}/100, project ownership ${formalAssessmentReport.categoryScores.projectOwnership}/100, scenario reasoning ${formalAssessmentReport.categoryScores.scenarioReasoning}/100, communication ${formalAssessmentReport.categoryScores.communication}/100.
4. Call out the strongest demonstrated skills, drawn from this real evidence:
${strongLines.length ? strongLines.join("\n") : "(nothing scored as a clear strength — be honest but constructive about this instead)"}
5. Walk through the most important weaknesses, drawn from this real evidence:
${weakLines.length ? weakLines.join("\n") : "(no clear weaknesses — focus this part on polish and interview presence instead)"}
   Be explicit when something above is marked FAILED CRITICAL COMPETENCY — name it as a required competency, and explain in plain terms what a stronger answer would have included.
${
  remainingWeakCount > 0
    ? `   There are ${remainingWeakCount} more weaker answers beyond the ones listed above — do NOT read them all aloud. Mention briefly that there were a few more (and any recurring pattern you notice), and point the student to their written report in the student portal for the complete question-by-question breakdown.`
    : ""
}
6. Recommend specific topics or skill areas from the LTV Academy coursework worth revisiting, based on the weaknesses above — speak in terms of topics, not exact lesson titles (the written report lists exact lessons).
7. Close with the candidate's single most important next step.

This entire debrief should run roughly 2 to 4 minutes of natural speech, and the coaching section itself is capped at 9 minutes. Prioritize the result, the score, and the most important findings over reciting every detail — nothing you say here can change the score, which is already locked in, and the complete record is always in the written report regardless of what you have time to say out loud.`;
  }

  if (section === "project-ownership") {
    if (!probe) {
      return "Project-ownership section: no playbook has been drafted for this path/difficulty yet — ask the student to walk you through a real project they built and press for specifics (what exactly they did, why, what broke) using your own judgment. Follow the strict rules above — never indicate whether their account of ownership sounds genuine or rehearsed; that judgment happens privately, afterward.";
    }
    return `Project-ownership section — use this playbook (id: ${probe.id}). Open with the prompt, then use the follow-ups ADAPTIVELY based on what the student actually says — you don't have to ask every follow-up, and you can reorder them, but your goal is genuinely separating hands-on ownership from a rehearsed or team-credited answer. Follow the strict rules above throughout — never indicate, during this section, whether their account sounds genuine or rehearsed; that judgment happens privately, afterward.
Opening prompt: ${probe.prompt}
Follow-ups available: ${probe.followUps.map((f) => `"${f}"`).join(" | ")}
What a passing answer looks like: ${probe.passingCriteria}
What a failing answer looks like: ${probe.failingCriteria}
Set questionId to "${probe.id}" for every message in this section.`;
  }

  if (section === "scenario-problem-solving") {
    if (!scenarios.length) {
      return "Scenario-based problem-solving section: no scenario bank has been drafted for this path/difficulty yet — pose a realistic workplace problem for this role using your own judgment and probe their reasoning process. Follow the strict rules above — never indicate whether their reasoning is on the right track.";
    }
    return `Scenario-based problem-solving section — pose ONE of these realistic workplace scenarios at a time (pick one not yet used), let the student reason through it out loud, and ask natural follow-ups about their reasoning (don't just accept a one-line answer). Follow the strict rules above throughout — never indicate whether their reasoning is on the right track; stay curious and neutral regardless of where they're headed:
${scenarios.map((s) => `- [${s.id}] ${s.title}: ${s.prompt}`).join("\n")}
Set questionId to the scenario's id (e.g. "${scenarios[0].id}") when you pose or follow up on one of these.`;
  }

  return "";
}

export function parseTurnOutput(raw: string): { message: string; competencyId: string | null; questionId: string | null } {
  const cleaned = raw.trim().replace(/^```json\s*/i, "").replace(/```\s*$/, "");
  try {
    const obj = JSON.parse(cleaned);
    if (typeof obj.message === "string" && obj.message.trim()) {
      return {
        message: obj.message.trim(),
        competencyId: typeof obj.competencyId === "string" ? obj.competencyId : null,
        questionId: typeof obj.questionId === "string" ? obj.questionId : null,
      };
    }
  } catch {
    // Most often a response truncated mid-sentence against max_tokens (the
    // coaching debrief is the long case this matters for) — recover just
    // the "message" field's text rather than ever showing the student raw
    // JSON scaffolding like `{"message": "Thank you for...`.
    const match = cleaned.match(/"message"\s*:\s*"((?:[^"\\]|\\.)*)/);
    if (match) {
      try {
        const recovered = JSON.parse(`"${match[1]}"`);
        if (typeof recovered === "string" && recovered.trim()) {
          return { message: recovered.trim(), competencyId: null, questionId: null };
        }
      } catch {
        // the partial string itself ended on a dangling escape — fall through
      }
    }
  }
  return { message: "Thank you — let's continue.", competencyId: null, questionId: null };
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
