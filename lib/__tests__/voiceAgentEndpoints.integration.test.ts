// Phase F — Fish Audio Agents (hands-free voice): session start/reconnect,
// concurrency safeguards, the Custom-LLM webhook's own authorization and
// OpenAI-shaped streaming contract, and the explicit end-session
// cost-control cleanup. Real DB, real handlers; every network call (Fish
// Audio's HTTP API, Anthropic's Claude API) is stubbed per test so even
// the "feature enabled" tests never make a live or paid call.
//
// Contracts here match Fish Audio's VERIFIED documentation (see the Phase
// F report): session creation only ever sends {agent_id}, the response is
// {session_id, expires_at, max_duration_seconds, transport, livekit_url,
// token, ...}, and the Custom LLM webhook is authorized by ONE shared
// secret (Authorization: Bearer) with session_id in the request body —
// not a per-session secret in the URL, which an earlier, uncorrected
// version of this file (and the code it tested) had guessed.
import { describe, it, expect, afterAll, afterEach, vi } from "vitest";
import { prisma } from "../db";
import { generateAccessToken } from "../mockInterviewAuth";
import { countActiveVoiceAgentSessions } from "../voiceAgentLimits";

// The turn engine calls `new Anthropic().messages.create(...)` directly
// (same as the pre-existing text-mode endpoint always has) — mocked here
// so the "full happy path" tests get a deterministic interviewer message
// instead of depending on a live, paid Claude call succeeding.
const mockCreate = vi.fn(async () => ({
  content: [{ type: "text", text: JSON.stringify({ message: "Can you walk me through how you'd model a slowly changing dimension?", competencyId: null, questionId: null }) }],
}));
vi.mock("@anthropic-ai/sdk", () => {
  class MockAnthropic {
    messages = { create: mockCreate };
  }
  class MockAPIError extends Error {}
  return { default: Object.assign(MockAnthropic, { APIError: MockAPIError }) };
});

// @ts-expect-error — .ts extension import, consistent with other Netlify Function tests in this project
import startHandler from "../../netlify/functions/mock-interview-voice-agent-start.ts";
// @ts-expect-error
import llmHandler from "../../netlify/functions/mock-interview-agent-llm.ts";
// @ts-expect-error
import endHandler from "../../netlify/functions/mock-interview-voice-agent-end.ts";

const createdStudentIds: string[] = [];
async function cleanupStudent(studentId: string) {
  await prisma.interviewTurn.deleteMany({ where: { session: { studentId } } });
  await prisma.mockInterviewSession.deleteMany({ where: { studentId } });
  await prisma.interviewCredit.deleteMany({ where: { studentId } });
  await prisma.student.deleteMany({ where: { id: studentId } });
}

async function createSession() {
  const email = `agent-test-${Date.now()}-${Math.random().toString(36).slice(2, 8)}@example.com`;
  const student = await prisma.student.create({ data: { wixMemberId: `dev:${email}`, email } });
  createdStudentIds.push(student.id);
  const credit = await prisma.interviewCredit.create({
    data: { studentId: student.id, wixOrderId: `agent-test-${Date.now()}-${Math.random()}`, careerPath: "snowflake-data-engineer", difficulty: "beginner", status: "consumed", consumedAt: new Date() },
  });
  const accessToken = generateAccessToken();
  const session = await prisma.mockInterviewSession.create({
    data: { studentId: student.id, creditId: credit.id, careerPath: "snowflake-data-engineer", difficulty: "beginner", accessToken, status: "in-progress" },
  });
  return { session, accessToken };
}

function postReq(path: string, body: unknown) {
  return new Request(`http://localhost${path}`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
}

// Matches Fish Audio's confirmed /v1/agent/sessions response shape.
function fakeFishAgentsResponse(sessionId: string) {
  return new Response(
    JSON.stringify({ session_id: sessionId, expires_at: "2099-01-01T00:00:00Z", max_duration_seconds: 3600, transport: "livekit", livekit_url: "wss://fake.livekit.fish.audio", token: `tok-${sessionId}` }),
    { status: 200 }
  );
}

describe("mock-interview-voice-agent-start", () => {
  const ORIGINAL_FLAG = process.env.MOCK_INTERVIEW_ENABLE_LIVE_VOICE_AGENTS;
  const ORIGINAL_MAX = process.env.MOCK_INTERVIEW_MAX_CONCURRENT_VOICE_AGENTS;
  afterEach(async () => {
    process.env.MOCK_INTERVIEW_ENABLE_LIVE_VOICE_AGENTS = ORIGINAL_FLAG;
    process.env.MOCK_INTERVIEW_MAX_CONCURRENT_VOICE_AGENTS = ORIGINAL_MAX;
    vi.unstubAllGlobals();
    // Each test's own active session (if any) is ended immediately after
    // that test, so the concurrency count the NEXT test sees reflects only
    // what IT creates — mirrors mock-interview-voice-agent-end.ts's real
    // cost-control cleanup, and keeps these tests isolated from each other.
    await prisma.mockInterviewSession.updateMany({ where: { studentId: { in: createdStudentIds }, voiceAgentStatus: "active" }, data: { voiceAgentStatus: "ended" } });
  });
  afterAll(async () => {
    for (const id of createdStudentIds) await cleanupStudent(id);
  });

  it("503s and never calls Fish Audio when the flag is unset", async () => {
    delete process.env.MOCK_INTERVIEW_ENABLE_LIVE_VOICE_AGENTS;
    const { session, accessToken } = await createSession();
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);
    const res = await startHandler(postReq("/api/mock-interview-voice-agent-start", { sessionId: session.id, accessToken }));
    expect(res.status).toBe(503);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("503s when the flag is on but no Fish Agent has been configured yet", async () => {
    process.env.MOCK_INTERVIEW_ENABLE_LIVE_VOICE_AGENTS = "true";
    delete process.env.FISH_AGENT_ID;
    const { session, accessToken } = await createSession();
    const res = await startHandler(postReq("/api/mock-interview-voice-agent-start", { sessionId: session.id, accessToken }));
    expect(res.status).toBe(503);
  });

  it("404s for the wrong accessToken", async () => {
    process.env.MOCK_INTERVIEW_ENABLE_LIVE_VOICE_AGENTS = "true";
    process.env.FISH_API_KEY = "test-key";
    process.env.FISH_AGENT_ID = "agent-config-1";
    const { session } = await createSession();
    const res = await startHandler(postReq("/api/mock-interview-voice-agent-start", { sessionId: session.id, accessToken: "wrong" }));
    expect(res.status).toBe(404);
  });

  it("creates a Fish Agents session from {agent_id} alone, persists its session_id/status, and never leaks FISH_API_KEY to the response", async () => {
    process.env.MOCK_INTERVIEW_ENABLE_LIVE_VOICE_AGENTS = "true";
    process.env.FISH_API_KEY = "super-secret-key";
    process.env.FISH_AGENT_ID = "agent-config-1";
    const fetchSpy = vi.fn(async (_url: string, init?: RequestInit) => {
      const body = JSON.parse((init?.body as string) ?? "{}");
      expect(body).toEqual({ agent_id: "agent-config-1" }); // no inline voice/llm/conversation config
      return fakeFishAgentsResponse("agent-sess-1");
    });
    vi.stubGlobal("fetch", fetchSpy);
    const { session, accessToken } = await createSession();

    const res = await startHandler(postReq("/api/mock-interview-voice-agent-start", { sessionId: session.id, accessToken }));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.agentSession.session_id).toBe("agent-sess-1");
    expect(data.agentSession.token).toBe("tok-agent-sess-1");
    expect(JSON.stringify(data)).not.toContain("super-secret-key");

    const stored = await prisma.mockInterviewSession.findUniqueOrThrow({ where: { id: session.id } });
    expect(stored.voiceAgentSessionId).toBe("agent-sess-1");
    expect(stored.voiceAgentStatus).toBe("active");
  });

  it("passes an explicit voice override through when MOCK_INTERVIEW_FISH_VOICE_ID is set", async () => {
    process.env.MOCK_INTERVIEW_ENABLE_LIVE_VOICE_AGENTS = "true";
    process.env.FISH_API_KEY = "test-key";
    process.env.FISH_AGENT_ID = "agent-config-1";
    process.env.MOCK_INTERVIEW_FISH_VOICE_ID = "student-custom-voice";
    const fetchSpy = vi.fn(async (_url: string, init?: RequestInit) => {
      const body = JSON.parse((init?.body as string) ?? "{}");
      expect(body.overrides).toEqual({ voice_id: "student-custom-voice" });
      return fakeFishAgentsResponse("agent-sess-voice-override");
    });
    vi.stubGlobal("fetch", fetchSpy);
    const { session, accessToken } = await createSession();
    const res = await startHandler(postReq("/api/mock-interview-voice-agent-start", { sessionId: session.id, accessToken }));
    expect(res.status).toBe(200);
    delete process.env.MOCK_INTERVIEW_FISH_VOICE_ID;
  });

  it("ends the stale Fish session and mints a FRESH one on reconnect — Fish only returns a connection token once, so there is nothing to reuse", async () => {
    process.env.MOCK_INTERVIEW_ENABLE_LIVE_VOICE_AGENTS = "true";
    process.env.FISH_API_KEY = "test-key";
    process.env.FISH_AGENT_ID = "agent-config-1";
    let createCount = 0;
    const calledUrls: string[] = [];
    const fetchSpy = vi.fn(async (url: string) => {
      calledUrls.push(url);
      if (url.endsWith("/end")) return new Response("{}", { status: 200 });
      createCount += 1;
      return fakeFishAgentsResponse(`agent-sess-reconnect-${createCount}`);
    });
    vi.stubGlobal("fetch", fetchSpy);
    const { session, accessToken } = await createSession();

    const first = await startHandler(postReq("/api/mock-interview-voice-agent-start", { sessionId: session.id, accessToken }));
    const firstData = await first.json();
    expect(firstData.agentSession.session_id).toBe("agent-sess-reconnect-1");

    const second = await startHandler(postReq("/api/mock-interview-voice-agent-start", { sessionId: session.id, accessToken }));
    const secondData = await second.json();
    expect(secondData.agentSession.session_id).toBe("agent-sess-reconnect-2"); // a genuinely NEW session, not the same one handed back
    expect(calledUrls.some((u) => u.includes("agent-sess-reconnect-1/end"))).toBe(true); // the stale one was cleaned up

    const stored = await prisma.mockInterviewSession.findUniqueOrThrow({ where: { id: session.id } });
    expect(stored.voiceAgentSessionId).toBe("agent-sess-reconnect-2");
  });

  it("503s once the concurrency cap is reached, protecting against unbounded cost", async () => {
    process.env.MOCK_INTERVIEW_ENABLE_LIVE_VOICE_AGENTS = "true";
    process.env.FISH_API_KEY = "test-key";
    process.env.FISH_AGENT_ID = "agent-config-1";
    // The cap is account-wide by design (Fish Audio's own concurrency limit
    // isn't per-student), so this computes the cap relative to whatever is
    // ALREADY active in the DB from other tests in this file, rather than
    // assuming a clean slate — the thing actually under test is "one more
    // than the cap gets refused", not any particular absolute count.
    const alreadyActive = await countActiveVoiceAgentSessions();
    process.env.MOCK_INTERVIEW_MAX_CONCURRENT_VOICE_AGENTS = String(alreadyActive + 1);
    let n = 0;
    vi.stubGlobal("fetch", vi.fn(async () => fakeFishAgentsResponse(`agent-sess-cap-${++n}`)));

    const first = await createSession();
    const firstStart = await startHandler(postReq("/api/mock-interview-voice-agent-start", { sessionId: first.session.id, accessToken: first.accessToken }));
    expect(firstStart.status).toBe(200);

    const second = await createSession();
    const secondStart = await startHandler(postReq("/api/mock-interview-voice-agent-start", { sessionId: second.session.id, accessToken: second.accessToken }));
    expect(secondStart.status).toBe(503);
  });

  it("502s (never a crash) when Fish Audio's session-create call itself fails", async () => {
    process.env.MOCK_INTERVIEW_ENABLE_LIVE_VOICE_AGENTS = "true";
    process.env.FISH_API_KEY = "test-key";
    process.env.FISH_AGENT_ID = "agent-config-1";
    vi.stubGlobal("fetch", vi.fn(async () => new Response("down", { status: 500 })));
    const { session, accessToken } = await createSession();
    const res = await startHandler(postReq("/api/mock-interview-voice-agent-start", { sessionId: session.id, accessToken }));
    expect(res.status).toBe(502);
  });
});

describe("mock-interview-agent-llm — the Custom LLM webhook Fish Audio calls", () => {
  const ORIGINAL_FLAG = process.env.MOCK_INTERVIEW_ENABLE_LIVE_VOICE_AGENTS;
  const SHARED_SECRET = "test-shared-secret-abc123";
  afterEach(() => {
    process.env.MOCK_INTERVIEW_ENABLE_LIVE_VOICE_AGENTS = ORIGINAL_FLAG;
  });
  afterAll(async () => {
    for (const id of createdStudentIds) await cleanupStudent(id);
  });

  async function startAgentSession() {
    process.env.MOCK_INTERVIEW_ENABLE_LIVE_VOICE_AGENTS = "true";
    process.env.FISH_API_KEY = "test-key";
    process.env.FISH_AGENT_ID = "agent-config-1";
    process.env.FISH_AGENT_LLM_SHARED_SECRET = SHARED_SECRET;
    vi.stubGlobal("fetch", vi.fn(async () => fakeFishAgentsResponse(`agent-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`)));
    const { session, accessToken } = await createSession();
    await startHandler(postReq("/api/mock-interview-voice-agent-start", { sessionId: session.id, accessToken }));
    vi.unstubAllGlobals();
    const stored = await prisma.mockInterviewSession.findUniqueOrThrow({ where: { id: session.id } });
    return { session: stored, accessToken };
  }

  function llmRequest(fishSessionId: string, bearerSecret: string, messages: { role: string; content: string }[]) {
    return new Request("http://localhost/api/mock-interview-agent-llm/chat/completions", {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${bearerSecret}` },
      body: JSON.stringify({ session_id: fishSessionId, messages, stream: true }),
    });
  }

  it("503s when the flag is unset", async () => {
    delete process.env.MOCK_INTERVIEW_ENABLE_LIVE_VOICE_AGENTS;
    const res = await llmHandler(llmRequest("whatever", SHARED_SECRET, []));
    expect(res.status).toBe(503);
  });

  it("401s for a wrong or missing shared secret — Fish Audio's calls are authorized by ONE Bearer secret, never accessToken/Wix identity", async () => {
    process.env.MOCK_INTERVIEW_ENABLE_LIVE_VOICE_AGENTS = "true";
    process.env.FISH_AGENT_LLM_SHARED_SECRET = SHARED_SECRET;
    const { session } = await startAgentSession();
    const res = await llmHandler(llmRequest(session.voiceAgentSessionId!, "totally-wrong-secret", [{ role: "user", content: "hi" }]));
    expect(res.status).toBe(401);
  });

  it("404s for an unrecognized session_id, even with a valid shared secret", async () => {
    process.env.MOCK_INTERVIEW_ENABLE_LIVE_VOICE_AGENTS = "true";
    process.env.FISH_AGENT_LLM_SHARED_SECRET = SHARED_SECRET;
    const res = await llmHandler(llmRequest("no-such-fish-session-id", SHARED_SECRET, [{ role: "user", content: "hi" }]));
    expect(res.status).toBe(404);
  });

  it("streams back a valid OpenAI chat-completion-chunk SSE response, and records the student's last message via the SAME engine as text mode", async () => {
    const { session } = await startAgentSession();

    // First turn (greeting + first question) — no prior studentResponse to record.
    const first = await llmHandler(llmRequest(session.voiceAgentSessionId!, SHARED_SECRET, []));
    expect(first.status).toBe(200);
    expect(first.headers.get("content-type")).toBe("text/event-stream");
    const firstText = await first.text();
    expect(firstText).toContain("chat.completion.chunk");
    expect(firstText).toContain("Can you walk me through how you'd model a slowly changing dimension?");
    expect(firstText).toContain("data: [DONE]");

    const turnsAfterFirst = await prisma.interviewTurn.findMany({ where: { sessionId: session.id }, orderBy: { turnIndex: "asc" } });
    expect(turnsAfterFirst).toHaveLength(1);
    expect(turnsAfterFirst[0].studentResponse).toBeNull();

    // Second turn — Fish's own ASR produced this as the last "user" message
    // in the OpenAI-shaped history it sends; the webhook must record it
    // onto the PRIOR (still-unanswered) turn exactly like push-to-talk and
    // text mode do.
    const second = await llmHandler(
      llmRequest(session.voiceAgentSessionId!, SHARED_SECRET, [
        { role: "assistant", content: turnsAfterFirst[0].aiMessage },
        { role: "user", content: "I'd add an effective-date and a current-flag column, and version the row on update." },
      ])
    );
    expect(second.status).toBe(200);

    const turnsAfterSecond = await prisma.interviewTurn.findMany({ where: { sessionId: session.id }, orderBy: { turnIndex: "asc" } });
    expect(turnsAfterSecond[0].studentResponse).toBe("I'd add an effective-date and a current-flag column, and version the row on update.");
    expect(turnsAfterSecond).toHaveLength(2); // the engine asked a new question too
  });
});

describe("mock-interview-voice-agent-end — cost-control cleanup", () => {
  afterAll(async () => {
    for (const id of createdStudentIds) await cleanupStudent(id);
  });

  it("404s for the wrong accessToken", async () => {
    const { session } = await createSession();
    const res = await endHandler(postReq("/api/mock-interview-voice-agent-end", { sessionId: session.id, accessToken: "wrong" }));
    expect(res.status).toBe(404);
  });

  it("is a harmless no-op when no agent session was ever started", async () => {
    const { session, accessToken } = await createSession();
    const res = await endHandler(postReq("/api/mock-interview-voice-agent-end", { sessionId: session.id, accessToken }));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.alreadyEnded).toBe(true);
  });

  it("calls Fish Audio's end-session endpoint and frees the concurrency slot, even if that call itself fails", async () => {
    process.env.MOCK_INTERVIEW_ENABLE_LIVE_VOICE_AGENTS = "true";
    process.env.FISH_API_KEY = "test-key";
    process.env.FISH_AGENT_ID = "agent-config-1";
    vi.stubGlobal("fetch", vi.fn(async () => fakeFishAgentsResponse("agent-to-end")));
    const { session, accessToken } = await createSession();
    await startHandler(postReq("/api/mock-interview-voice-agent-start", { sessionId: session.id, accessToken }));

    vi.stubGlobal("fetch", vi.fn(async () => new Response("fish is down", { status: 500 })));
    const res = await endHandler(postReq("/api/mock-interview-voice-agent-end", { sessionId: session.id, accessToken }));
    expect(res.status).toBe(200);

    const stored = await prisma.mockInterviewSession.findUniqueOrThrow({ where: { id: session.id } });
    expect(stored.voiceAgentStatus).toBe("ended"); // never stuck "active" just because Fish's own cleanup call failed

    vi.unstubAllGlobals();
    delete process.env.MOCK_INTERVIEW_ENABLE_LIVE_VOICE_AGENTS;
  });
});
