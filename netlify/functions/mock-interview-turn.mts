// The conversational engine's HTTP wrapper for TEXT mode and push-to-talk
// voice mode — both submit one already-known studentResponse string per
// call. The actual "what should the interviewer say next" logic lives in
// lib/interviewTurnEngine.ts (extracted in Phase F so the Fish Audio Agents
// hands-free voice webhook, netlify/functions/mock-interview-agent-llm.ts,
// shares the exact same engine rather than a second copy).
//
// POST /api/mock-interview-turn  { sessionId, studentResponse, accessToken? }
//   -> { session: SessionDTO, aiMessage: string, sectionChanged: boolean }
import type { Config } from "@netlify/functions";
import Anthropic from "@anthropic-ai/sdk";
import { prisma } from "../../lib/db";
import { authorizeSessionAccess } from "../../lib/mockInterviewAuth";
import { generateInterviewTurn, reloadSessionDTO } from "../../lib/interviewTurnEngine";

const MAX_RESPONSE_LENGTH = 4000;

export default async (req: Request) => {
  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  let body: { sessionId?: string; studentResponse?: string; accessToken?: string };
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const sessionId = (body.sessionId ?? "").trim();
  const studentResponse = (body.studentResponse ?? "").trim().slice(0, MAX_RESPONSE_LENGTH);
  if (!sessionId) return json({ error: "Missing sessionId" }, 400);

  const session = await prisma.mockInterviewSession.findUnique({
    where: { id: sessionId },
    include: { turns: true },
  });
  // 404, not 403, even for "exists but not authorized" — a guessed
  // sessionId can't be distinguished from a real one belonging to someone else.
  if (!session || !(await authorizeSessionAccess({ req, providedAccessToken: body.accessToken, session }))) {
    return json({ error: "Session not found" }, 404);
  }
  if (session.status === "complete") {
    return json({ error: "This interview has already ended." }, 409);
  }

  const isFirstTurn = session.turns.length === 0;
  if (!isFirstTurn && !studentResponse) {
    return json({ error: "Missing studentResponse" }, 400);
  }

  try {
    const result = await generateInterviewTurn(session.id, studentResponse);
    if (result.kind === "no-op") {
      return json({ error: result.aiMessage }, 409);
    }
    return json({
      session: await reloadSessionDTO(session.id),
      aiMessage: result.aiMessage,
      sectionChanged: result.kind === "turn" ? result.sectionChanged : true,
    });
  } catch (error) {
    console.error("mock-interview-turn error:", error);
    const message =
      error instanceof Anthropic.APIError
        ? "The interviewer is temporarily unavailable. Please try again shortly."
        : "Something went wrong generating the next question.";
    return json({ error: message }, 502);
  }
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

export const config: Config = {
  path: "/api/mock-interview-turn",
};
