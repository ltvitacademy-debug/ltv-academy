// Phase F — the "Custom LLM" webhook Fish Audio Agents calls on every
// conversational turn once hands-free voice mode is live.
//
// CORRECTED after verifying Fish Audio's actual docs
// (docs.fish.audio/agents/build/custom-llm.md):
//   - Fish calls POST {base_url}/chat/completions — the path MUST end in
//     exactly that suffix, which is why this function's route is
//     "/api/mock-interview-agent-llm/chat/completions", not a bare
//     "/api/mock-interview-agent-llm". base_url (everything before that
//     suffix) is configured ONCE on the Fish Agent itself (see the Phase F
//     report's one-time setup steps), not per session.
//   - Auth is ONE shared secret, configured as the Agent's llm.custom.api_key
//     and echoed back by Fish as `Authorization: Bearer <that secret>` on
//     every call — not a per-session secret in the URL (the earlier design
//     this replaces). The matching value lives in FISH_AGENT_LLM_SHARED_SECRET.
//   - The request body is OpenAI chat/completions-shaped PLUS a top-level
//     `session_id` field — that's how a call is matched back to a
//     MockInterviewSession row, via its voiceAgentSessionId.
//
// This is the ONLY place Fish Audio's own servers talk to ours during a
// live call — the browser never calls this endpoint. The actual "what
// should the interviewer say next" decision is made by
// lib/interviewTurnEngine.ts, the SAME engine the text-mode endpoint
// (mock-interview-turn.ts) uses, so a hands-free voice interview asks the
// same questions, follows the same 54-minute schedule, and feeds the same
// formal-assessment grading pipeline as every other mode.
//
// Latency caveat, flagged honestly: Fish Audio recommends a sub-800ms
// time-to-first-token for Custom LLM responses. The underlying Claude call
// here is NOT streamed token-by-token — the turn engine's output is a
// single JSON object that can't be safely parsed until fully received —
// so this endpoint waits for the complete response and emits it as ONE
// streamed SSE chunk rather than true incremental tokens. Worth testing
// against a live call before launch; not required for the mocked tests
// below to pass.
import type { Config } from "@netlify/functions";
import crypto from "crypto";
import { prisma } from "../../lib/db";
import { generateInterviewTurn } from "../../lib/interviewTurnEngine";

function timingSafeEqualStrings(a: string, b: string): boolean {
  const bufA = Buffer.from(a, "utf8");
  const bufB = Buffer.from(b, "utf8");
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

type OpenAIChatMessage = { role: string; content: string };

export default async (req: Request) => {
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);
  if (process.env.MOCK_INTERVIEW_ENABLE_LIVE_VOICE_AGENTS !== "true") {
    return json({ error: "Hands-free voice mode is not enabled." }, 503);
  }

  const sharedSecret = process.env.FISH_AGENT_LLM_SHARED_SECRET;
  const authHeader = req.headers.get("authorization") ?? "";
  const providedSecret = authHeader.replace(/^Bearer\s+/i, "");
  if (!sharedSecret || !providedSecret || !timingSafeEqualStrings(providedSecret, sharedSecret)) {
    // 401, not a Fish-specific error shape — this is a generic "you're not
    // authorized to call this endpoint" the same way any bearer-token API
    // would respond; there's no session yet to protect the identity of.
    return json({ error: "Unauthorized" }, 401);
  }

  let body: { messages?: OpenAIChatMessage[]; session_id?: string };
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const fishSessionId = (body.session_id ?? "").trim();
  if (!fishSessionId) return json({ error: "Missing session_id" }, 400);

  const session = await prisma.mockInterviewSession.findUnique({ where: { voiceAgentSessionId: fishSessionId } });
  // 404, not 403 — same reasoning as every other session-scoped endpoint:
  // an unrecognized session_id must not be distinguishable from a real one
  // this caller simply isn't allowed to see (there's no "caller identity"
  // concept here beyond the shared secret already checked above).
  if (!session || session.voiceAgentStatus !== "active") {
    return json({ error: "Session not found" }, 404);
  }

  const messages = Array.isArray(body.messages) ? body.messages : [];
  const lastUserMessage = [...messages].reverse().find((m) => m && m.role === "user");
  const studentResponse = typeof lastUserMessage?.content === "string" ? lastUserMessage.content.trim() : "";

  try {
    const result = await generateInterviewTurn(session.id, studentResponse || null);

    if (result.kind === "complete") {
      // The formal 54-minute schedule ended — stop billing this Agents
      // session immediately rather than leaving it to idle out against its
      // own max_duration_seconds ceiling (cost safeguard).
      await prisma.mockInterviewSession.update({ where: { id: session.id }, data: { voiceAgentStatus: "ended" } });
    }

    return streamOpenAIChunks(result.aiMessage);
  } catch (error) {
    console.error("mock-interview-agent-llm error:", error);
    return streamOpenAIChunks("I'm having trouble with that — could you give me a moment and repeat your last answer?");
  }
};

// Hand-rolled rather than the Anthropic or OpenAI SDK — this endpoint only
// ever needs to PRODUCE this exact wire format for Fish Audio to consume,
// never to parse one, so a dependency buys nothing here.
function streamOpenAIChunks(content: string): Response {
  const id = `chatcmpl-${crypto.randomBytes(12).toString("hex")}`;
  const created = Math.floor(Date.now() / 1000);
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      const contentChunk = {
        id,
        object: "chat.completion.chunk",
        created,
        model: "ltv-mock-interview-engine",
        choices: [{ index: 0, delta: { role: "assistant", content }, finish_reason: null }],
      };
      const doneChunk = {
        id,
        object: "chat.completion.chunk",
        created,
        model: "ltv-mock-interview-engine",
        choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
      };
      controller.enqueue(encoder.encode(`data: ${JSON.stringify(contentChunk)}\n\n`));
      controller.enqueue(encoder.encode(`data: ${JSON.stringify(doneChunk)}\n\n`));
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });
  return new Response(stream, { status: 200, headers: { "content-type": "text/event-stream" } });
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
}

export const config: Config = {
  path: "/api/mock-interview-agent-llm/chat/completions",
};
