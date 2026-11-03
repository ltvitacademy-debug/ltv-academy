// Phase E — Fish Audio provider. Every test injects a MOCK fetch
// implementation — no real network call, no money spent (spec requirement:
// "use mocked API responses for development; do not spend money... without
// approval").
import { describe, it, expect, afterEach } from "vitest";
import { FishAudioProvider, getFishVoiceId, type FetchLike } from "../fishAudioProvider";
import { VoiceProviderError } from "../voiceProvider";

function mockFetch(impl: (url: string, init?: RequestInit) => Response | Promise<Response>): FetchLike {
  return (async (url: string | URL | Request, init?: RequestInit) => impl(String(url), init)) as unknown as FetchLike;
}

describe("getFishVoiceId", () => {
  const ORIGINAL_DEDICATED = process.env.MOCK_INTERVIEW_FISH_VOICE_ID;
  const ORIGINAL_NARRATION = process.env.FISH_REFERENCE_ID;
  afterEach(() => {
    process.env.MOCK_INTERVIEW_FISH_VOICE_ID = ORIGINAL_DEDICATED;
    process.env.FISH_REFERENCE_ID = ORIGINAL_NARRATION;
  });

  it("prefers the dedicated interview voice id when set", () => {
    process.env.MOCK_INTERVIEW_FISH_VOICE_ID = "interview-voice";
    process.env.FISH_REFERENCE_ID = "narration-voice";
    expect(getFishVoiceId()).toBe("interview-voice");
  });

  it("falls back to the existing narration voice id (the user's existing custom voice) when unset", () => {
    delete process.env.MOCK_INTERVIEW_FISH_VOICE_ID;
    process.env.FISH_REFERENCE_ID = "narration-voice";
    expect(getFishVoiceId()).toBe("narration-voice");
  });

  it("returns null when neither is configured", () => {
    delete process.env.MOCK_INTERVIEW_FISH_VOICE_ID;
    delete process.env.FISH_REFERENCE_ID;
    expect(getFishVoiceId()).toBeNull();
  });
});

describe("FishAudioProvider.synthesizeSpeech", () => {
  const ORIGINAL_KEY = process.env.FISH_API_KEY;
  afterEach(() => {
    process.env.FISH_API_KEY = ORIGINAL_KEY;
  });

  it("sends the configured voice id as reference_id, with the API key as a Bearer token, and returns the audio bytes", async () => {
    process.env.FISH_API_KEY = "test-fish-key";
    let capturedUrl = "";
    let capturedInit: RequestInit | undefined;
    const provider = new FishAudioProvider(
      mockFetch((url, init) => {
        capturedUrl = url;
        capturedInit = init;
        return new Response(new Uint8Array([1, 2, 3]), { status: 200, headers: { "content-type": "audio/mpeg" } });
      })
    );

    const result = await provider.synthesizeSpeech({ text: "Hello there", voiceId: "existing-voice-123" });

    expect(capturedUrl).toBe("https://api.fish.audio/v1/tts");
    expect(capturedInit?.headers).toMatchObject({ Authorization: "Bearer test-fish-key" });
    expect(JSON.parse(capturedInit!.body as string)).toEqual({ text: "Hello there", reference_id: "existing-voice-123" });
    expect(result.contentType).toBe("audio/mpeg");
    expect(Array.from(result.audio)).toEqual([1, 2, 3]);
  });

  it("throws VoiceProviderError (never a raw/unhandled error) when FISH_API_KEY is unset", async () => {
    delete process.env.FISH_API_KEY;
    const provider = new FishAudioProvider(mockFetch(() => new Response("", { status: 200 })));
    await expect(provider.synthesizeSpeech({ text: "x", voiceId: "v" })).rejects.toBeInstanceOf(VoiceProviderError);
  });

  it("throws VoiceProviderError on a non-2xx response", async () => {
    process.env.FISH_API_KEY = "test-fish-key";
    const provider = new FishAudioProvider(mockFetch(() => new Response("rate limited", { status: 429 })));
    await expect(provider.synthesizeSpeech({ text: "x", voiceId: "v" })).rejects.toBeInstanceOf(VoiceProviderError);
  });

  it("throws VoiceProviderError (not the raw network error) when fetch itself rejects", async () => {
    process.env.FISH_API_KEY = "test-fish-key";
    const provider = new FishAudioProvider(mockFetch(() => Promise.reject(new Error("ECONNRESET"))));
    await expect(provider.synthesizeSpeech({ text: "x", voiceId: "v" })).rejects.toBeInstanceOf(VoiceProviderError);
  });
});

describe("FishAudioProvider.transcribeSpeech", () => {
  const ORIGINAL_KEY = process.env.FISH_API_KEY;
  afterEach(() => {
    process.env.FISH_API_KEY = ORIGINAL_KEY;
  });

  it("returns the transcribed text from a well-formed response", async () => {
    process.env.FISH_API_KEY = "test-fish-key";
    const provider = new FishAudioProvider(mockFetch(() => new Response(JSON.stringify({ text: "I decided to use a MERGE statement." }), { status: 200 })));
    const result = await provider.transcribeSpeech({ audio: Buffer.from([1, 2, 3]), contentType: "audio/webm" });
    expect(result.text).toBe("I decided to use a MERGE statement.");
  });

  it("throws VoiceProviderError when the response has no text field", async () => {
    process.env.FISH_API_KEY = "test-fish-key";
    const provider = new FishAudioProvider(mockFetch(() => new Response(JSON.stringify({ nothing: "useful" }), { status: 200 })));
    await expect(provider.transcribeSpeech({ audio: Buffer.from([1]), contentType: "audio/webm" })).rejects.toBeInstanceOf(VoiceProviderError);
  });

  it("throws VoiceProviderError on a non-2xx response", async () => {
    process.env.FISH_API_KEY = "test-fish-key";
    const provider = new FishAudioProvider(mockFetch(() => new Response("bad audio", { status: 400 })));
    await expect(provider.transcribeSpeech({ audio: Buffer.from([1]), contentType: "audio/webm" })).rejects.toBeInstanceOf(VoiceProviderError);
  });
});
