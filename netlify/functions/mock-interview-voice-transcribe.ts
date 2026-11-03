// Phase E — speech-to-text for the Professional Mock Interview's voice
// mode: turns the student's recorded answer into text, which is then
// submitted through the EXACT SAME /api/mock-interview-turn endpoint text
// mode already uses — voice never bypasses the transcript/scoring
// pipeline, it only feeds it (spec requirements 3 & 4: the interview engine
// stays voice-independent, and the transcript is identical either way).
//
// POST /api/mock-interview-voice-transcribe  multipart/form-data:
//   sessionId, accessToken, audio (a Blob/File)
//   -> { text } on success, or a JSON error (client falls back to typing —
//      spec requirement 7)
//
// Gated behind MOCK_INTERVIEW_ENABLE_LIVE_VOICE (default OFF) — see
// mock-interview-voice-synthesize.ts for why.
import type { Config } from "@netlify/functions";
import { prisma } from "../../lib/db";
import { authorizeSessionAccess } from "../../lib/mockInterviewAuth";
import { FishAudioProvider } from "../../lib/fishAudioProvider";
import { VoiceProviderError } from "../../lib/voiceProvider";

const MAX_AUDIO_BYTES = 25 * 1024 * 1024; // 25MB — a 54-minute interview's longest single answer is nowhere near this

export default async (req: Request) => {
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  if (process.env.MOCK_INTERVIEW_ENABLE_LIVE_VOICE !== "true") {
    return json({ error: "Voice mode is not enabled yet. Use text mode." }, 503);
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return json({ error: "Invalid multipart form body" }, 400);
  }

  const sessionId = String(form.get("sessionId") ?? "").trim();
  const accessToken = String(form.get("accessToken") ?? "").trim();
  const audio = form.get("audio");
  if (!sessionId || !(audio instanceof Blob)) {
    return json({ error: "Missing sessionId or audio" }, 400);
  }
  if (audio.size === 0) return json({ error: "Empty audio" }, 400);
  if (audio.size > MAX_AUDIO_BYTES) return json({ error: "Audio too large" }, 413);

  const session = await prisma.mockInterviewSession.findUnique({ where: { id: sessionId } });
  if (!session || !(await authorizeSessionAccess({ req, providedAccessToken: accessToken, session }))) {
    return json({ error: "Session not found" }, 404);
  }

  try {
    const provider = new FishAudioProvider();
    const arrayBuffer = await audio.arrayBuffer();
    const result = await provider.transcribeSpeech({ audio: Buffer.from(arrayBuffer), contentType: audio.type || "audio/webm" });
    return json({ text: result.text });
  } catch (error) {
    if (error instanceof VoiceProviderError) {
      console.error("mock-interview-voice-transcribe:", error.message);
      return json({ error: "Transcription failed. Please type your answer instead." }, 502);
    }
    console.error("mock-interview-voice-transcribe: unexpected error:", error);
    return json({ error: "Something went wrong." }, 500);
  }
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
}

export const config: Config = {
  path: "/api/mock-interview-voice-transcribe",
};
