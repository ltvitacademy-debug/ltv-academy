// Phase E — the ONLY interface the interview engine is allowed to know
// about for voice (spec requirement 3: keep the voice layer independent of
// the interview/scoring engine). lib/fishAudioProvider.ts is the one
// concrete implementation today; swapping providers later means writing a
// new file that implements this same interface, never touching
// netlify/functions/mock-interview-turn.ts or lib/interviewScoring.ts.
//
// Important, research-grounded design constraint: Fish Audio has NO
// unified real-time conversational (speech-to-speech) API — it offers
// separate text-to-speech and speech-to-text endpoints, with no built-in
// turn-taking, voice-activity-detection, or interruption handling. This
// interface reflects that honestly: it's a TTS+ASR pair, not a "start a
// live call" API. Turn-taking and interruption are therefore a CLIENT-SIDE
// concern (stop audio playback, start recording) layered on top of these
// two calls — see components/app/VoiceInterviewControls.tsx — not
// something any VoiceProvider implementation can promise by itself.
export type SynthesizeSpeechInput = {
  text: string;
  voiceId: string;
};

export type SynthesizeSpeechResult = {
  audio: Buffer;
  contentType: string; // e.g. "audio/mpeg"
};

export type TranscribeSpeechInput = {
  audio: Buffer;
  contentType: string; // whatever format the browser's recorder produced (e.g. "audio/webm")
};

export type TranscribeSpeechResult = {
  text: string;
};

export interface VoiceProvider {
  synthesizeSpeech(input: SynthesizeSpeechInput): Promise<SynthesizeSpeechResult>;
  transcribeSpeech(input: TranscribeSpeechInput): Promise<TranscribeSpeechResult>;
}

// Thrown by a VoiceProvider implementation for ANY failure (network,
// auth, rate limit, unsupported format) — callers (the two voice Netlify
// Functions) catch exactly this type to decide when to tell the client to
// fall back to text mode (spec requirement 7), rather than pattern-matching
// on provider-specific error shapes.
export class VoiceProviderError extends Error {
  constructor(message: string, public readonly cause?: unknown) {
    super(message);
    this.name = "VoiceProviderError";
  }
}
