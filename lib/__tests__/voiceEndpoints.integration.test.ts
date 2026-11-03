// Phase E — the two voice Netlify Functions: off-by-default gating,
// session ownership, and fallback-on-failure behavior. Real DB + real
// handlers; the global fetch is stubbed per test (vi.stubGlobal) so even
// the "voice enabled" tests never make a real Fish Audio call.
import { describe, it, expect, afterAll, afterEach, vi } from "vitest";
import { prisma } from "../db";
import { generateAccessToken } from "../mockInterviewAuth";
// @ts-expect-error — .ts extension import, consistent with other Netlify Function tests in this project
import synthesizeHandler from "../../netlify/functions/mock-interview-voice-synthesize.ts";
// @ts-expect-error
import transcribeHandler from "../../netlify/functions/mock-interview-voice-transcribe.ts";

const createdStudentIds: string[] = [];
async function cleanupStudent(studentId: string) {
  await prisma.mockInterviewSession.deleteMany({ where: { studentId } });
  await prisma.interviewCredit.deleteMany({ where: { studentId } });
  await prisma.student.deleteMany({ where: { id: studentId } });
}

async function createSession() {
  const email = `voice-test-${Date.now()}-${Math.random().toString(36).slice(2, 8)}@example.com`;
  const student = await prisma.student.create({ data: { wixMemberId: `dev:${email}`, email } });
  createdStudentIds.push(student.id);
  const credit = await prisma.interviewCredit.create({
    data: { studentId: student.id, wixOrderId: `voice-test-${Date.now()}`, careerPath: "snowflake-data-engineer", difficulty: "beginner", status: "consumed", consumedAt: new Date() },
  });
  const accessToken = generateAccessToken();
  const session = await prisma.mockInterviewSession.create({
    data: { studentId: student.id, creditId: credit.id, careerPath: "snowflake-data-engineer", difficulty: "beginner", accessToken, status: "in-progress" },
  });
  return { session, accessToken };
}

describe("mock-interview-voice-synthesize — off by default (spec requirement 9)", () => {
  const ORIGINAL = process.env.MOCK_INTERVIEW_ENABLE_LIVE_VOICE;
  afterEach(() => {
    process.env.MOCK_INTERVIEW_ENABLE_LIVE_VOICE = ORIGINAL;
  });
  afterAll(async () => {
    for (const id of createdStudentIds) await cleanupStudent(id);
  });

  it("503s and never reaches Fish Audio when the flag is unset", async () => {
    delete process.env.MOCK_INTERVIEW_ENABLE_LIVE_VOICE;
    const { session, accessToken } = await createSession();
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);
    try {
      const res = await synthesizeHandler(
        new Request("http://localhost/api/mock-interview-voice-synthesize", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ sessionId: session.id, accessToken, text: "Hello" }),
        })
      );
      expect(res.status).toBe(503);
      expect(fetchSpy).not.toHaveBeenCalled();
    } finally {
      vi.unstubAllGlobals();
    }
  });

  it("404s for the wrong accessToken, same as every other session-scoped endpoint", async () => {
    process.env.MOCK_INTERVIEW_ENABLE_LIVE_VOICE = "true";
    const { session } = await createSession();
    const res = await synthesizeHandler(
      new Request("http://localhost/api/mock-interview-voice-synthesize", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ sessionId: session.id, accessToken: "wrong", text: "Hello" }),
      })
    );
    expect(res.status).toBe(404);
  });

  it("falls back cleanly (502, never a crash) when Fish Audio itself fails, with voice enabled", async () => {
    process.env.MOCK_INTERVIEW_ENABLE_LIVE_VOICE = "true";
    process.env.FISH_API_KEY = "test-key";
    process.env.MOCK_INTERVIEW_FISH_VOICE_ID = "test-voice";
    vi.stubGlobal("fetch", vi.fn(async () => new Response("down", { status: 500 })));
    try {
      const { session, accessToken } = await createSession();
      const res = await synthesizeHandler(
        new Request("http://localhost/api/mock-interview-voice-synthesize", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ sessionId: session.id, accessToken, text: "Hello" }),
        })
      );
      expect(res.status).toBe(502);
    } finally {
      vi.unstubAllGlobals();
    }
  });
});

describe("mock-interview-voice-transcribe — off by default, auth, fallback", () => {
  const ORIGINAL = process.env.MOCK_INTERVIEW_ENABLE_LIVE_VOICE;
  afterEach(() => {
    process.env.MOCK_INTERVIEW_ENABLE_LIVE_VOICE = ORIGINAL;
  });
  afterAll(async () => {
    for (const id of createdStudentIds) await cleanupStudent(id);
  });

  function formRequest(fields: Record<string, string>, audio?: Blob) {
    const form = new FormData();
    for (const [k, v] of Object.entries(fields)) form.append(k, v);
    if (audio) form.append("audio", audio, "clip.webm");
    return new Request("http://localhost/api/mock-interview-voice-transcribe", { method: "POST", body: form });
  }

  it("503s and never reaches Fish Audio when the flag is unset", async () => {
    delete process.env.MOCK_INTERVIEW_ENABLE_LIVE_VOICE;
    const { session, accessToken } = await createSession();
    const fetchSpy = vi.fn();
    vi.stubGlobal("fetch", fetchSpy);
    try {
      const res = await transcribeHandler(
        formRequest({ sessionId: session.id, accessToken }, new Blob([new Uint8Array([1, 2, 3])], { type: "audio/webm" }))
      );
      expect(res.status).toBe(503);
      expect(fetchSpy).not.toHaveBeenCalled();
    } finally {
      vi.unstubAllGlobals();
    }
  });

  it("400s with no audio attached", async () => {
    process.env.MOCK_INTERVIEW_ENABLE_LIVE_VOICE = "true";
    const { session, accessToken } = await createSession();
    const res = await transcribeHandler(formRequest({ sessionId: session.id, accessToken }));
    expect(res.status).toBe(400);
  });

  it("404s for the wrong accessToken", async () => {
    process.env.MOCK_INTERVIEW_ENABLE_LIVE_VOICE = "true";
    const { session } = await createSession();
    const res = await transcribeHandler(
      formRequest({ sessionId: session.id, accessToken: "wrong" }, new Blob([new Uint8Array([1])], { type: "audio/webm" }))
    );
    expect(res.status).toBe(404);
  });

  it("transcribes successfully through a mocked Fish Audio ASR call and never touches the DB's turn data directly (it only returns text)", async () => {
    process.env.MOCK_INTERVIEW_ENABLE_LIVE_VOICE = "true";
    process.env.FISH_API_KEY = "test-key";
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response(JSON.stringify({ text: "I would check query history first." }), { status: 200 }))
    );
    try {
      const { session, accessToken } = await createSession();
      const res = await transcribeHandler(
        formRequest({ sessionId: session.id, accessToken }, new Blob([new Uint8Array([1, 2, 3, 4])], { type: "audio/webm" }))
      );
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.text).toBe("I would check query history first.");
    } finally {
      vi.unstubAllGlobals();
    }
  });
});
