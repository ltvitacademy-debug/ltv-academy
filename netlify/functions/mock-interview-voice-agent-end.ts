// Phase F — explicitly ends a live Fish Audio Agents session: called by the
// browser when the student finishes early, switches back to push-to-talk
// or text mode, or the client detects the call has dropped and isn't
// coming back.
//
// This is a COST safeguard as much as cleanup — Fish Audio Agents bills by
// the minute ($0.06/min), so a session no longer actually in use should
// stop being billed immediately rather than idling until its
// max_duration_seconds ceiling (lib/voiceAgentLimits.ts) eventually cuts it
// off on its own. It also frees a concurrency slot for the next student.
//
// Interview progress is never at risk here: every turn is already
// persisted to InterviewTurn as it happens (via
// mock-interview-agent-llm.ts), independent of which Fish Agents session
// happens to be attached — ending this one, or starting a fresh one later
// via mock-interview-voice-agent-start.ts, never loses anything.
import type { Config } from "@netlify/functions";
import { prisma } from "../../lib/db";
import { authorizeSessionAccess } from "../../lib/mockInterviewAuth";
import { FishAgentsProvider, FishAgentsProviderError } from "../../lib/fishAgentsProvider";

export default async (req: Request) => {
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  let body: { sessionId?: string; accessToken?: string };
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const sessionId = (body.sessionId ?? "").trim();
  if (!sessionId) return json({ error: "Missing sessionId" }, 400);

  const session = await prisma.mockInterviewSession.findUnique({ where: { id: sessionId } });
  if (!session || !(await authorizeSessionAccess({ req, providedAccessToken: body.accessToken, session }))) {
    return json({ error: "Session not found" }, 404);
  }

  if (session.voiceAgentStatus !== "active" || !session.voiceAgentSessionId) {
    return json({ ended: true, alreadyEnded: true });
  }

  try {
    const provider = new FishAgentsProvider();
    await provider.endSession(session.voiceAgentSessionId);
  } catch (error) {
    // Still mark it ended locally even if Fish's own end-call failed (e.g.
    // it already timed out on its own) — our DB state must never get stuck
    // "active" forever just because one cleanup call failed, since that
    // would wrongly count against the concurrency cap for a session that
    // isn't really running any more.
    if (!(error instanceof FishAgentsProviderError)) {
      console.error("mock-interview-voice-agent-end: unexpected error:", error);
    }
  }

  await prisma.mockInterviewSession.update({ where: { id: session.id }, data: { voiceAgentStatus: "ended" } });
  return json({ ended: true });
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
}

export const config: Config = {
  path: "/api/mock-interview-voice-agent-end",
};
