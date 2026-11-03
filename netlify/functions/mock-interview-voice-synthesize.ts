// Phase E — text-to-speech for the Professional Mock Interview's voice mode.
// Deliberately thin: this function's only job is turning AI text (already
// produced by the existing, voice-independent turn engine) into audio.
// It never talks to Claude, never touches scoring — the interview/scoring
// engine stays completely unaware voice exists (spec requirement 3).
//
// POST /api/mock-interview-voice-synthesize  { sessionId, accessToken, text }
//   -> audio/mpeg bytes, or a JSON error (the client falls back to text
//      mode on ANY non-200 — spec requirement 7)
//
// Gated behind MOCK_INTERVIEW_ENABLE_LIVE_VOICE (default OFF) — no paid
// Fish Audio call happens until you explicitly enable it (spec requirement
// 9/"no live calls without approval"), mirroring the
// MOCK_INTERVIEW_ENABLE_LIVE_GRADING pattern from Phase B/C.
import type { Config } from "@netlify/functions";
import { prisma } from "../../lib/db";
import { authorizeSessionAccess } from "../../lib/mockInterviewAuth";
import { FishAudioProvider, getFishVoiceId } from "../../lib/fishAudioProvider";
import { VoiceProviderError } from "../../lib/voiceProvider";

const MAX_TEXT_LENGTH = 2000;

export default async (req: Request) => {
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  if (process.env.MOCK_INTERVIEW_ENABLE_LIVE_VOICE !== "true") {
    return json({ error: "Voice mode is not enabled yet. Use text mode." }, 503);
  }

  let body: { sessionId?: string; accessToken?: string; text?: string };
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const sessionId = (body.sessionId ?? "").trim();
  const text = (body.text ?? "").trim().slice(0, MAX_TEXT_LENGTH);
  if (!sessionId || !text) return json({ error: "Missing sessionId or text" }, 400);

  const session = await prisma.mockInterviewSession.findUnique({ where: { id: sessionId } });
  if (!session || !(await authorizeSessionAccess({ req, providedAccessToken: body.accessToken, session }))) {
    return json({ error: "Session not found" }, 404);
  }

  const voiceId = getFishVoiceId();
  if (!voiceId) {
    return json({ error: "No Fish Audio voice is configured (MOCK_INTERVIEW_FISH_VOICE_ID / FISH_REFERENCE_ID)." }, 503);
  }

  try {
    const provider = new FishAudioProvider();
    const result = await provider.synthesizeSpeech({ text, voiceId });
    return new Response(new Blob([new Uint8Array(result.audio)]), { status: 200, headers: { "content-type": result.contentType } });
  } catch (error) {
    if (error instanceof VoiceProviderError) {
      console.error("mock-interview-voice-synthesize:", error.message);
      return json({ error: "Voice synthesis failed. Use text mode." }, 502);
    }
    console.error("mock-interview-voice-synthesize: unexpected error:", error);
    return json({ error: "Something went wrong." }, 500);
  }
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
}

export const config: Config = {
  path: "/api/mock-interview-voice-synthesize",
};
