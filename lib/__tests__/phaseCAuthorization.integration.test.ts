// Phase C — authorization (spec requirement 9). Invokes the REAL Netlify
// Function handlers (same Request/Response contract Netlify itself uses),
// same pattern as lib/__tests__/sessionConcurrency.test.ts, to prove
// ownership is enforced at the actual HTTP boundary, not just in a helper
// function nobody calls.
import { describe, it, expect, afterAll, afterEach, beforeAll } from "vitest";
import { prisma } from "../db";
import { hashPassword, signAdminSessionToken } from "../adminAuth";
// @ts-expect-error — .ts extension import, consistent with how Netlify Functions import each other in this project
import sessionHandler from "../../netlify/functions/mock-interview-session.ts";
// @ts-expect-error
import turnHandler from "../../netlify/functions/mock-interview-turn.ts";
// @ts-expect-error
import reportHandler from "../../netlify/functions/mock-interview-report.ts";
// @ts-expect-error
import certificateHandler from "../../netlify/functions/mock-interview-certificate.ts";
// @ts-expect-error
import adminReviewHandler from "../../netlify/functions/mock-interview-admin-review.ts";
// @ts-expect-error
import adminLoginHandler from "../../netlify/functions/admin-login.ts";

function getReq(url: string): Request {
  return new Request(`http://localhost${url}`, { method: "GET" });
}
function postReq(url: string, body: unknown, headers: Record<string, string> = {}): Request {
  return new Request(`http://localhost${url}`, {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body: JSON.stringify(body),
  });
}

const createdStudentIds: string[] = [];

async function cleanupStudent(studentId: string) {
  const sessions = await prisma.mockInterviewSession.findMany({ where: { studentId } });
  for (const s of sessions) {
    await prisma.certificate.deleteMany({ where: { sessionId: s.id } });
    await prisma.interviewTurn.deleteMany({ where: { sessionId: s.id } });
    await prisma.competencyResult.deleteMany({ where: { sessionId: s.id } });
    await prisma.interviewReport.deleteMany({ where: { sessionId: s.id } });
  }
  await prisma.mockInterviewSession.deleteMany({ where: { studentId } });
  await prisma.interviewCredit.deleteMany({ where: { studentId } });
  await prisma.student.deleteMany({ where: { id: studentId } });
}

async function createSession() {
  const email = `authz-${Date.now()}-${Math.random().toString(36).slice(2, 8)}@example.com`;
  const res = await sessionHandler(
    postReq("/api/mock-interview-session", { careerPath: "snowflake-data-engineer", difficulty: "beginner", devStudentEmail: email })
  );
  const data = await res.json();
  const student = await prisma.student.findUniqueOrThrow({ where: { wixMemberId: `dev:${email}` } });
  createdStudentIds.push(student.id);
  return { sessionId: data.session.id as string, accessToken: data.accessToken as string };
}

describe("ownership — mock-interview-session GET (spec requirement 9)", () => {
  afterAll(async () => {
    for (const id of createdStudentIds) await cleanupStudent(id);
  });

  it("404s with no accessToken at all", async () => {
    const { sessionId } = await createSession();
    const res = await sessionHandler(getReq(`/api/mock-interview-session?id=${sessionId}`));
    expect(res.status).toBe(404);
  });

  it("404s with the WRONG accessToken", async () => {
    const { sessionId } = await createSession();
    const res = await sessionHandler(getReq(`/api/mock-interview-session?id=${sessionId}&accessToken=wrong-token-value`));
    expect(res.status).toBe(404);
  });

  it("200s with the correct accessToken", async () => {
    const { sessionId, accessToken } = await createSession();
    const res = await sessionHandler(getReq(`/api/mock-interview-session?id=${sessionId}&accessToken=${accessToken}`));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.session.id).toBe(sessionId);
  });
});

describe("ownership — mock-interview-turn POST (spec requirement 9)", () => {
  afterAll(async () => {
    for (const id of createdStudentIds) await cleanupStudent(id);
  });

  it("404s submitting a turn with no accessToken", async () => {
    const { sessionId } = await createSession();
    const res = await turnHandler(postReq("/api/mock-interview-turn", { sessionId, studentResponse: "hi" }));
    expect(res.status).toBe(404);
  });

  it("404s submitting a turn with the WRONG accessToken", async () => {
    const { sessionId } = await createSession();
    const res = await turnHandler(postReq("/api/mock-interview-turn", { sessionId, studentResponse: "hi", accessToken: "wrong" }));
    expect(res.status).toBe(404);
  });
});

describe("ownership — mock-interview-report GET (spec requirement 9)", () => {
  afterAll(async () => {
    for (const id of createdStudentIds) await cleanupStudent(id);
  });

  it("404s with no/wrong accessToken", async () => {
    const { sessionId } = await createSession();
    const res = await reportHandler(getReq(`/api/mock-interview-report?sessionId=${sessionId}&accessToken=wrong`));
    expect(res.status).toBe(404);
  });

  it("returns { report: null } for the owner when grading hasn't run yet", async () => {
    const { sessionId, accessToken } = await createSession();
    const res = await reportHandler(getReq(`/api/mock-interview-report?sessionId=${sessionId}&accessToken=${accessToken}`));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.report).toBeNull();
  });
});

describe("ownership — mock-interview-certificate GET (spec requirement 9)", () => {
  afterAll(async () => {
    for (const id of createdStudentIds) await cleanupStudent(id);
  });

  it("404s with no/wrong accessToken", async () => {
    const { sessionId } = await createSession();
    const res = await certificateHandler(getReq(`/api/mock-interview-certificate?sessionId=${sessionId}&accessToken=wrong`));
    expect(res.status).toBe(404);
  });

  it("404s for the real owner when no certificate has been issued yet", async () => {
    const { sessionId, accessToken } = await createSession();
    const res = await certificateHandler(getReq(`/api/mock-interview-certificate?sessionId=${sessionId}&accessToken=${accessToken}`));
    expect(res.status).toBe(404);
  });
});

describe("authenticated, role-based admin access — mock-interview-admin-review (spec requirements 8 & 9, Phase D follow-up)", () => {
  const ORIGINAL_SECRET = process.env.ADMIN_SESSION_SECRET;
  const email = `test-admin-${Date.now()}@example.com`;
  const password = "a reasonably strong test password";

  beforeAll(async () => {
    process.env.ADMIN_SESSION_SECRET = "test-admin-session-secret";
    await prisma.admin.upsert({
      where: { email },
      update: { passwordHash: hashPassword(password), role: "admin" },
      create: { email, passwordHash: hashPassword(password), role: "admin" },
    });
  });
  afterAll(async () => {
    process.env.ADMIN_SESSION_SECRET = ORIGINAL_SECRET;
    await prisma.admin.deleteMany({ where: { email } });
  });

  it("403s a GET with no token at all", async () => {
    const res = await adminReviewHandler(getReq("/api/mock-interview-admin-review"));
    expect(res.status).toBe(403);
  });

  it("403s a GET with a well-formed but bogus token", async () => {
    const res = await adminReviewHandler(new Request("http://localhost/api/mock-interview-admin-review", { headers: { authorization: "Bearer not-a-real-token" } }));
    expect(res.status).toBe(403);
  });

  it("403s even a well-formed resolve POST without a token", async () => {
    const res = await adminReviewHandler(postReq("/api/mock-interview-admin-review", { sessionId: "x", resolutions: [], adminName: "Bill" }));
    expect(res.status).toBe(403);
  });

  it("401s admin-login with the wrong password", async () => {
    const res = await adminLoginHandler(postReq("/api/admin-login", { email, password: "wrong password" }));
    expect(res.status).toBe(401);
  });

  it("401s admin-login for an email that doesn't exist, with the SAME message as a wrong password (no account enumeration)", async () => {
    const wrongPasswordRes = await adminLoginHandler(postReq("/api/admin-login", { email, password: "wrong password" }));
    const noSuchEmailRes = await adminLoginHandler(postReq("/api/admin-login", { email: "no-such-admin@example.com", password: "anything" }));
    expect(noSuchEmailRes.status).toBe(wrongPasswordRes.status);
    expect(await noSuchEmailRes.json()).toEqual(await wrongPasswordRes.json());
  });

  it("logs in with the real password and uses the resulting token to reach the review queue", async () => {
    const loginRes = await adminLoginHandler(postReq("/api/admin-login", { email, password }));
    expect(loginRes.status).toBe(200);
    const { token, role } = await loginRes.json();
    expect(role).toBe("admin");

    const res = await adminReviewHandler(new Request("http://localhost/api/mock-interview-admin-review", { headers: { authorization: `Bearer ${token}` } }));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data.sessions)).toBe(true);
  });

  it("a non-'admin' role is logged in successfully but still denied review access (role-based, not just 'any valid login')", async () => {
    const reviewerEmail = `test-reviewer-${Date.now()}@example.com`;
    await prisma.admin.create({ data: { email: reviewerEmail, passwordHash: hashPassword(password), role: "reviewer" } });
    try {
      const loginRes = await adminLoginHandler(postReq("/api/admin-login", { email: reviewerEmail, password }));
      expect(loginRes.status).toBe(200);
      const { token } = await loginRes.json();

      const res = await adminReviewHandler(new Request("http://localhost/api/mock-interview-admin-review", { headers: { authorization: `Bearer ${token}` } }));
      expect(res.status).toBe(403);
    } finally {
      await prisma.admin.deleteMany({ where: { email: reviewerEmail } });
    }
  });

  it("403s a token signed under a DIFFERENT secret than the server is currently configured with", async () => {
    const previous = process.env.ADMIN_SESSION_SECRET;
    process.env.ADMIN_SESSION_SECRET = "a-different-secret-entirely";
    const forgedElsewhere = signAdminSessionToken({ adminId: "fake", email, role: "admin" });
    process.env.ADMIN_SESSION_SECRET = previous; // restore the real secret before the handler checks it
    const res = await adminReviewHandler(new Request("http://localhost/api/mock-interview-admin-review", { headers: { authorization: `Bearer ${forgedElsewhere}` } }));
    expect(res.status).toBe(403);
  });
});
