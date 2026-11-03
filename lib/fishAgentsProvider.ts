// Phase F — Fish Audio "Agents": hosted, continuous two-way voice sessions
// over LiveKit. A DIFFERENT product from lib/fishAudioProvider.ts (the raw
// file-in/file-out TTS+ASR endpoints) — Agents owns the live call
// end-to-end (voice activity detection, turn-taking, interruption, the
// LiveKit transport to the browser) and only calls OUT to us for the
// "brain" (Custom LLM, see netlify/functions/mock-interview-agent-llm.ts).
//
// CORRECTED after verifying Fish Audio's actual documentation
// (docs.fish.audio/agents/*) — an earlier version of this file guessed an
// inline-per-session config shape (voice/llm/conversation objects on the
// session-create call) that does NOT match the real API:
//
//   - An Agent is a PERSISTENT, PUBLISHED resource, configured once
//     (Fish's Builder UI, or PATCH /v1/agent/agents/$AGENT_ID/config) with
//     its voice_id, its Custom LLM base_url/model/api_key/headers, and its
//     conversation settings (max_duration_seconds, interruptible, etc.) —
//     see the Phase F report for the one-time setup steps. That one-time
//     setup is NOT done by this code; FISH_AGENT_ID just points at an
//     already-configured, already-published Agent.
//   - Creating a SESSION only takes {agent_id, timezone?} (confirmed:
//     docs.fish.audio/agents/quickstart.md) — an optional
//     {overrides: {voice_id}} lets a single session use a different voice
//     than the Agent's own default, which this project doesn't need but
//     supports for the existing "voice id independently configurable"
//     requirement.
//   - The response — {session_id, expires_at, max_duration_seconds,
//     transport, livekit_url, token, ...} — must be handed to the
//     browser's AgentSession.start({sessionToken: ...}) AS-IS, unmodified.
//     This type is deliberately an open index signature rather than a
//     narrow interface, so nothing here risks dropping a field the
//     browser SDK secretly needs.
export type CreateAgentSessionInput = {
  agentId: string;
  timezone?: string;
  voiceIdOverride?: string;
};

export type FishAgentSessionResponse = {
  session_id: string;
  expires_at?: string;
  max_duration_seconds?: number;
  transport?: string;
  livekit_url?: string;
  token?: string;
  [key: string]: unknown;
};

export type FetchLike = typeof fetch;

const FISH_AGENTS_BASE = "https://api.fish.audio/v1/agent";

export class FishAgentsProviderError extends Error {
  constructor(message: string, public readonly cause?: unknown) {
    super(message);
    this.name = "FishAgentsProviderError";
  }
}

function getFishApiKey(): string | null {
  return process.env.FISH_API_KEY || null;
}

export class FishAgentsProvider {
  constructor(private readonly fetchImpl: FetchLike = fetch) {}

  async createSession(input: CreateAgentSessionInput): Promise<FishAgentSessionResponse> {
    const apiKey = getFishApiKey();
    if (!apiKey) throw new FishAgentsProviderError("FISH_API_KEY is not configured.");

    const body: Record<string, unknown> = { agent_id: input.agentId };
    if (input.timezone) body.timezone = input.timezone;
    if (input.voiceIdOverride) body.overrides = { voice_id: input.voiceIdOverride };

    let res: Response;
    try {
      res = await this.fetchImpl(`${FISH_AGENTS_BASE}/sessions`, {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (error) {
      throw new FishAgentsProviderError("Network error creating a Fish Audio Agents session.", error);
    }
    if (!res.ok) {
      throw new FishAgentsProviderError(`Fish Audio Agents session create returned ${res.status}.`);
    }
    const data = (await res.json()) as FishAgentSessionResponse;
    if (!data.session_id) {
      throw new FishAgentsProviderError("Fish Audio Agents response was missing session_id.");
    }
    return data;
  }

  // Honesty flag: the exact "end a live session early" endpoint was NOT
  // re-confirmed against docs in the pass that corrected createSession
  // above (that research focused on the browser SDK and Custom LLM
  // contract). This is a best-effort cost-control call — failures here are
  // caught by the caller (mock-interview-voice-agent-end.ts /
  // mock-interview-voice-agent-start.ts's reconnect path) and never block
  // the student; worth a one-time live check before relying on it to
  // actually stop billing.
  async endSession(sessionId: string): Promise<void> {
    const apiKey = getFishApiKey();
    if (!apiKey) throw new FishAgentsProviderError("FISH_API_KEY is not configured.");
    try {
      await this.fetchImpl(`${FISH_AGENTS_BASE}/sessions/${sessionId}/end`, {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}` },
      });
    } catch (error) {
      throw new FishAgentsProviderError("Network error ending a Fish Audio Agents session.", error);
    }
  }
}
