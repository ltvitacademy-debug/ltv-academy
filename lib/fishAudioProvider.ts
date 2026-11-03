// Phase E — Fish Audio implementation of lib/voiceProvider.ts's
// VoiceProvider interface. Uses the user's EXISTING custom voice via
// `reference_id` (spec requirement 1: never creates/clones a new voice —
// this file has no code path that could).
//
// Endpoints below are grounded in Fish Audio's documented API (see the
// Phase E report for the research): TTS is well-confirmed; the ASR
// request's exact encoding (multipart vs. raw body, the precise model
// header value) is a best read of inconsistent third-party docs and is
// NOT verified against a live call from this environment (spec
// requirement 9: no paid API calls without approval) — flagged clearly
// below, and the one thing to confirm with a single real test call before
// relying on it for real students.
import { VoiceProviderError, type VoiceProvider, type SynthesizeSpeechInput, type SynthesizeSpeechResult, type TranscribeSpeechInput, type TranscribeSpeechResult } from "./voiceProvider";

const FISH_TTS_URL = "https://api.fish.audio/v1/tts";
const FISH_ASR_URL = "https://api.fish.audio/v1/asr";

// The user's existing custom voice id, configurable independently of the
// narration pipeline's own FISH_REFERENCE_ID (spec requirement 8 — "make
// the voice ID... configurable") but defaulting to it, since by default
// it's the SAME "existing voice, don't create another" the user means.
export function getFishVoiceId(): string | null {
  return process.env.MOCK_INTERVIEW_FISH_VOICE_ID || process.env.FISH_REFERENCE_ID || null;
}

function getFishApiKey(): string | null {
  return process.env.FISH_API_KEY || null;
}

// Injectable so lib/__tests__/fishAudioProvider.test.ts never makes a real
// network call — every test passes a mock implementing this same shape.
export type FetchLike = typeof fetch;

export class FishAudioProvider implements VoiceProvider {
  constructor(private readonly fetchImpl: FetchLike = fetch) {}

  async synthesizeSpeech(input: SynthesizeSpeechInput): Promise<SynthesizeSpeechResult> {
    const apiKey = getFishApiKey();
    if (!apiKey) throw new VoiceProviderError("FISH_API_KEY is not configured.");

    let res: Response;
    try {
      res = await this.fetchImpl(FISH_TTS_URL, {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
        body: JSON.stringify({ text: input.text, reference_id: input.voiceId }),
      });
    } catch (error) {
      throw new VoiceProviderError("Network error calling Fish Audio TTS.", error);
    }
    if (!res.ok) {
      throw new VoiceProviderError(`Fish Audio TTS returned ${res.status}.`);
    }
    const contentType = res.headers.get("content-type") ?? "audio/mpeg";
    const arrayBuffer = await res.arrayBuffer();
    return { audio: Buffer.from(arrayBuffer), contentType };
  }

  async transcribeSpeech(input: TranscribeSpeechInput): Promise<TranscribeSpeechResult> {
    const apiKey = getFishApiKey();
    if (!apiKey) throw new VoiceProviderError("FISH_API_KEY is not configured.");

    // NOT YET VERIFIED against a live Fish Audio ASR call — this is the
    // single piece of Phase E that most needs a real test request before
    // going live. Sending as multipart/form-data with the raw audio bytes,
    // which is the most common shape for this kind of endpoint and matches
    // what Fish's own SDK examples suggest, but confirm before relying on it.
    const form = new FormData();
    form.append("audio", new Blob([new Uint8Array(input.audio)], { type: input.contentType }), "response.webm");

    let res: Response;
    try {
      res = await this.fetchImpl(FISH_ASR_URL, {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}` },
        body: form,
      });
    } catch (error) {
      throw new VoiceProviderError("Network error calling Fish Audio ASR.", error);
    }
    if (!res.ok) {
      throw new VoiceProviderError(`Fish Audio ASR returned ${res.status}.`);
    }
    const body = (await res.json()) as { text?: string };
    if (typeof body.text !== "string") {
      throw new VoiceProviderError("Fish Audio ASR response didn't include a text field.");
    }
    return { text: body.text };
  }
}
