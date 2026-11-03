// Phase F — mints a Fish Audio Agents session for a student's interview:
// hands-free, continuous, two-way voice with automatic turn-taking and
// interruption, using the student's existing custom Fish Audio voice.
//
// Called by the BROWSER, authorized exactly like every other
// session-scoped endpoint (accessToken or a verified Wix identity) — never
// called by Fish Audio itself (that's mock-interview-agent-llm.ts, a
// different endpoint authenticated by a single shared secret, since Fish's
// servers have neither an accessToken nor a Wix login).
//
// CORRECTED after verifying Fish Audio's docs: an Agent (voice, Custom LLM,
// conversation settings) is a persistent, published resource configured
// ONCE outside of this code (see FISH_AGENT_ID below and the Phase F
// report's setup steps) — this endpoint only ever sends {agent_id} (plus
// an optional voice override), never inline voice/llm/conversation config.
//
// Gated behind MOCK_INTERVIEW_ENABLE_LIVE_VOICE_AGENTS (default OFF) — no
// paid Fish Audio Agents call ($0.06/min) happens until explicitly enabled.
//
// Returns the Fish session response OBJECT AS-IS under `agentSession` —
// the raw FISH_API_KEY never leaves the server, and the browser's
// AgentSession.start({sessionToken: ...}) needs that whole object
// unmodified (confirmed via docs.fish.audio/agents/deploy/web-sdk.md), not
// a hand-picked subset of its fields.
import type { Config } from "@netlify/functions";
import { prisma } from "../../lib/db";
import { authorizeSessionAccess } from "../../lib/mockInterviewAuth";
import { FishAgentsProvider, FishAgentsProviderError } from "../../lib/fishAgentsProvider";
import { getFishVoiceId } from "../../lib/fishAudioProvider";
import { getMaxConcurrentVoiceAgentSessions, countActiveVoiceAgentSessions } from "../../lib/voiceAgentLimits";

export default async (req: Request) => {
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  if (process.env.MOCK_INTERVIEW_ENABLE_LIVE_VOICE_AGENTS !== "true") {
    return json({ error: "Hands-free voice mode is not enabled yet. Use push-to-talk or text mode." }, 503);
  }

  const agentId = process.env.FISH_AGENT_ID;
  if (!agentId) {
    return json({ error: "Hands-free voice mode isn't configured yet (no Fish Agent set up). Use push-to-talk or text mode." }, 503);
  }

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
  if (session.status === "complete") {
    return json({ error: "This interview has already ended." }, 409);
  }

  const provider = new FishAgentsProvider();

  // A stale "active" row from an earlier call this browser tab can no
  // longer talk to (a reload, a hard reconnect) is replaced, not reused —
  // Fish only ever returns a session's connection token ONCE, at creation,
  // so there is nothing usable to hand back a second time anyway. This is
  // what makes "secure reconnection without consuming another interview
  // credit" true: the CREDIT was already consumed when the interview
  // itself started (mock-interview-session.ts), never by this endpoint, so
  // minting a fresh Fish session here costs nothing extra on that front —
  // only a fresh ~$0.06/min Fish Agents meter, same as any reconnect would.
  if (session.voiceAgentStatus === "active" && session.voiceAgentSessionId) {
    try {
      await provider.endSession(session.voiceAgentSessionId);
    } catch {
      // Best-effort — it may already be gone on Fish's side. Proceed to
      // mint a fresh session regardless; never let a cleanup failure block
      // the student from reconnecting.
    }
  } else {
    const activeCount = await countActiveVoiceAgentSessions();
    if (activeCount >= getMaxConcurrentVoiceAgentSessions()) {
      return json({ error: "All hands-free voice interview slots are busy right now. Please use push-to-talk, or try again shortly." }, 503);
    }
  }

  try {
    const result = await provider.createSession({ agentId, voiceIdOverride: getFishVoiceId() ?? undefined });

    await prisma.mockInterviewSession.update({
      where: { id: session.id },
      data: { voiceAgentSessionId: result.session_id, voiceAgentStatus: "active" },
    });

    return json({ agentSession: result });
  } catch (error) {
    if (error instanceof FishAgentsProviderError) {
      console.error("mock-interview-voice-agent-start:", error.message);
      return json({ error: "Could not start hands-free voice mode. Use push-to-talk or text mode." }, 502);
    }
    console.error("mock-interview-voice-agent-start: unexpected error:", error);
    return json({ error: "Something went wrong." }, 500);
  }
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
}

export const config: Config = {
  path: "/api/mock-interview-voice-agent-start",
};
