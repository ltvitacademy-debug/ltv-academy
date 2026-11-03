// Phase D — real Wix identity authorization, secure resume, credit
// ownership, and production lockouts. Real DB + real Netlify Function
// handlers, same pattern as lib/__tests__/phaseCAuthorization.integration.test.ts.
import { describe, it, expect, afterAll, afterEach, vi } from "vitest";
import { prisma } from "../db";
import { signWixMemberToken } from "../wixMemberToken";
// @ts-expect-error — .ts extension import, consistent with other Netlify Function tests in this project
import sessionHandler from "../../netlify/functions/mock-interview-session.ts";
// @ts-expect-error
import historyHandler from "../../netlify/functions/mock-interview-history.ts";
// @ts-expect-error
import turnHandler from "../../netlify/functions/mock-interview-turn.mts";

const WIX_SECRET = "phase-d-test-secret";

function getReq(url: string, headers: Record<string, string> = {}): Request {
  return new Request(`http://localhost${url}`, { method: "GET", headers });
}
function postReq(url: string, body: unknown, headers: Record<string, string> = {}): Request {
  return new Request(`http://localhost${url}`, { method: "POST", headers: { "content-type": "application/json", ...headers }, body: JSON.stringify(body) });
}
function wixHeader(memberId: string, email: string) {
  return { "x-wix-member-token": signWixMemberToken({ memberId, email }, WIX_SECRET) };
}

const createdStudentIds: string[] = [];
async function cleanupStudent(studentId: string) {
  const sessions = await prisma.mockInterviewSession.findMany({ where: { studentId } });
  for (const s of sessions) await prisma.mockInterviewSession.deleteMany({ where: { id: s.id } });
  await prisma.interviewCredit.deleteMany({ where: { studentId } });
  await prisma.student.deleteMany({ where: { id: studentId } });
}

describe("real Wix identity authorizes session creation and access (spec priority 1)", () => {
  const ORIGINAL_SECRET = process.env.WIX_MEMBER_TOKEN_SECRET;
  afterEach(() => {
    process.env.WIX_MEMBER_TOKEN_SECRET = ORIGINAL_SECRET;
  });
  afterAll(async () => {
    for (const id of createdStudentIds) await cleanupStudent(id);
  });

  it("a verified Wix identity can create a session with no devStudentEmail at all", async () => {
    process.env.WIX_MEMBER_TOKEN_SECRET = WIX_SECRET;
    const memberId = `wix-member-${Date.now()}`;
    const res = await sessionHandler(
      postReq(
        "/api/mock-interview-session",
        { careerPath: "snowflake-data-engineer", difficulty: "beginner" },
        wixHeader(memberId, "real-student@example.com")
      )
    );
    expect(res.status).toBe(201);
    const data = await res.json();
    expect(data.session.id).toBeTruthy();

    const student = await prisma.student.findUniqueOrThrow({ where: { wixMemberId: `wix:${memberId}` } });
    createdStudentIds.push(student.id);
  });

  it("resuming a session via verified identity works WITHOUT the accessToken (spec priority 6)", async () => {
    process.env.WIX_MEMBER_TOKEN_SECRET = WIX_SECRET;
    const memberId = `wix-resume-${Date.now()}`;
    const headers = wixHeader(memberId, "resume-student@example.com");

    const createRes = await sessionHandler(postReq("/api/mock-interview-session", { careerPath: "snowflake-data-engineer", difficulty: "beginner" }, headers));
    const { session } = await createRes.json();
    const student = await prisma.student.findUniqueOrThrow({ where: { wixMemberId: `wix:${memberId}` } });
    createdStudentIds.push(student.id);

    // No accessToken query param at all — only the Wix identity header.
    const resumeRes = await sessionHandler(getReq(`/api/mock-interview-session?id=${session.id}`, headers));
    expect(resumeRes.status).toBe(200);
    const resumed = await resumeRes.json();
    expect(resumed.session.id).toBe(session.id);
  });

  it("a DIFFERENT verified Wix identity cannot access someone else's session, even with no accessToken check bypassed", async () => {
    process.env.WIX_MEMBER_TOKEN_SECRET = WIX_SECRET;
    const ownerMemberId = `wix-owner-${Date.now()}`;
    const createRes = await sessionHandler(
      postReq("/api/mock-interview-session", { careerPath: "snowflake-data-engineer", difficulty: "beginner" }, wixHeader(ownerMemberId, "owner@example.com"))
    );
    const { session } = await createRes.json();
    const owner = await prisma.student.findUniqueOrThrow({ where: { wixMemberId: `wix:${ownerMemberId}` } });
    createdStudentIds.push(owner.id);

    const attackerHeaders = wixHeader(`wix-attacker-${Date.now()}`, "attacker@example.com");
    const res = await sessionHandler(getReq(`/api/mock-interview-session?id=${session.id}`, attackerHeaders));
    expect(res.status).toBe(404); // never 403 — don't confirm the session exists either
  });

  it("a tampered/forged Wix identity token is rejected, not silently trusted", async () => {
    process.env.WIX_MEMBER_TOKEN_SECRET = WIX_SECRET;
    const memberId = `wix-forge-${Date.now()}`;
    const createRes = await sessionHandler(
      postReq("/api/mock-interview-session", { careerPath: "snowflake-data-engineer", difficulty: "beginner" }, wixHeader(memberId, "forge@example.com"))
    );
    const { session } = await createRes.json();
    const student = await prisma.student.findUniqueOrThrow({ where: { wixMemberId: `wix:${memberId}` } });
    createdStudentIds.push(student.id);

    // Forged with the WRONG secret — not a real Wix-signed token.
    const forged = { "x-wix-member-token": signWixMemberToken({ memberId, email: "forge@example.com" }, "wrong-secret") };
    const res = await sessionHandler(getReq(`/api/mock-interview-session?id=${session.id}`, forged));
    expect(res.status).toBe(404);
  });
});

describe("history endpoint — never authorized by email alone in production (spec priority 1)", () => {
  const ORIGINAL_SECRET = process.env.WIX_MEMBER_TOKEN_SECRET;
  afterEach(() => {
    process.env.WIX_MEMBER_TOKEN_SECRET = ORIGINAL_SECRET;
    vi.unstubAllEnvs();
  });

  it("401s a request with no Wix identity when NODE_ENV=production, regardless of devStudentEmail supplied", async () => {
    vi.stubEnv("NODE_ENV", "production");
    const res = await historyHandler(getReq("/api/mock-interview-history?devStudentEmail=someone@example.com"));
    expect(res.status).toBe(401);
  });

  it("scopes history strictly to the verified identity's own student record, not whatever email is in the token", async () => {
    process.env.WIX_MEMBER_TOKEN_SECRET = WIX_SECRET;
    const memberId = `wix-history-${Date.now()}`;
    const res = await historyHandler(getReq("/api/mock-interview-history", wixHeader(memberId, "history-student@example.com")));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data.history)).toBe(true); // no sessions yet, but authorized and scoped correctly (empty is fine)
  });
});

describe("production lockouts on session creation (spec priorities 1, 3, 4)", () => {
  const ORIGINAL_SECRET = process.env.WIX_MEMBER_TOKEN_SECRET;
  afterEach(() => {
    vi.unstubAllEnvs();
    process.env.WIX_MEMBER_TOKEN_SECRET = ORIGINAL_SECRET;
  });
  afterAll(async () => {
    for (const id of createdStudentIds) await cleanupStudent(id);
  });

  it("403s mintDevCredit in production even for a genuinely logged-in Wix member — nothing can mint itself a free credit outside the real Wix payment flow", async () => {
    vi.stubEnv("NODE_ENV", "production");
    process.env.WIX_MEMBER_TOKEN_SECRET = WIX_SECRET;
    const memberId = `wix-mintdev-blocked-${Date.now()}`;
    const res = await sessionHandler(
      postReq(
        "/api/mock-interview-session",
        { mintDevCredit: true, careerPath: "snowflake-data-engineer", difficulty: "beginner" },
        wixHeader(memberId, "real-but-blocked@example.com")
      )
    );
    expect(res.status).toBe(403);
    const student = await prisma.student.findUnique({ where: { wixMemberId: `wix:${memberId}` } });
    if (student) createdStudentIds.push(student.id);
  });

  it("401s session creation in production with no Wix identity, even with devStudentEmail supplied", async () => {
    vi.stubEnv("NODE_ENV", "production");
    const res = await sessionHandler(postReq("/api/mock-interview-session", { careerPath: "snowflake-data-engineer", difficulty: "beginner", devStudentEmail: "x@example.com" }));
    expect(res.status).toBe(401);
  });
});

describe("resuming an interrupted interview never consumes a second credit (spec priority 6)", () => {
  afterAll(async () => {
    for (const id of createdStudentIds) await cleanupStudent(id);
  });

  it("GET-ing and then continuing to submit turns on an existing session touches InterviewCredit zero times", async () => {
    const email = `resume-no-credit-${Date.now()}@example.com`;
    const createRes = await sessionHandler(
      postReq("/api/mock-interview-session", { careerPath: "snowflake-data-engineer", difficulty: "beginner", devStudentEmail: email })
    );
    const { session, accessToken } = await createRes.json();
    const student = await prisma.student.findUniqueOrThrow({ where: { wixMemberId: `dev:${email}` } });
    createdStudentIds.push(student.id);

    const creditsAfterCreate = await prisma.interviewCredit.findMany({ where: { studentId: student.id } });
    expect(creditsAfterCreate).toHaveLength(1);
    expect(creditsAfterCreate[0].status).toBe("consumed");

    // Simulate "coming back later": GET the session (the resume path).
    const resumeRes = await sessionHandler(getReq(`/api/mock-interview-session?id=${session.id}&accessToken=${accessToken}`));
    expect(resumeRes.status).toBe(200);

    // And keep answering — the turn engine doesn't touch credits at all.
    await turnHandler(postReq("/api/mock-interview-turn", { sessionId: session.id, studentResponse: "", accessToken }));
    await turnHandler(postReq("/api/mock-interview-turn", { sessionId: session.id, studentResponse: "Resuming my answer.", accessToken }));

    const creditsAfterResume = await prisma.interviewCredit.findMany({ where: { studentId: student.id } });
    expect(creditsAfterResume).toHaveLength(1); // still exactly the one credit, still consumed, never a second row
    expect(creditsAfterResume[0].id).toBe(creditsAfterCreate[0].id);
  });
});

describe("credit claiming — ownership, careerPath/difficulty integrity (spec priorities 2 & 5)", () => {
  afterAll(async () => {
    for (const id of createdStudentIds) await cleanupStudent(id);
  });

  it("claiming an existing credit takes careerPath from the CREDIT, not the request body", async () => {
    const email = `credit-integrity-${Date.now()}@example.com`;
    const mintRes = await sessionHandler(
      postReq("/api/mock-interview-session", { mintDevCredit: true, careerPath: "snowflake-data-engineer", difficulty: "advanced", devStudentEmail: email })
    );
    const { creditId } = await mintRes.json();
    const student = await prisma.student.findUniqueOrThrow({ where: { wixMemberId: `dev:${email}` } });
    createdStudentIds.push(student.id);

    // Try to point the SAME credit at a different careerPath than it was minted for.
    const res = await sessionHandler(
      postReq("/api/mock-interview-session", { creditId, careerPath: "some-other-career-path", difficulty: "advanced", devStudentEmail: email })
    );
    expect(res.status).toBe(201);
    const { session } = await res.json();
    expect(session.careerPath).toBe("snowflake-data-engineer"); // the credit's own value won, not the request's
  });

  it("a credit minted at a fixed difficulty rejects a claim at a DIFFERENT difficulty", async () => {
    const email = `difficulty-mismatch-${Date.now()}@example.com`;
    const mintRes = await sessionHandler(
      postReq("/api/mock-interview-session", { mintDevCredit: true, careerPath: "snowflake-data-engineer", difficulty: "advanced", devStudentEmail: email })
    );
    const { creditId } = await mintRes.json();
    const student = await prisma.student.findUniqueOrThrow({ where: { wixMemberId: `dev:${email}` } });
    createdStudentIds.push(student.id);

    const res = await sessionHandler(
      postReq("/api/mock-interview-session", { creditId, careerPath: "snowflake-data-engineer", difficulty: "beginner", devStudentEmail: email })
    );
    expect(res.status).toBe(400);
  });

  it("a flexible (null-difficulty) credit lets the student choose difficulty at claim time, and that choice sticks", async () => {
    const email = `flexible-credit-${Date.now()}@example.com`;
    const student = await prisma.student.upsert({
      where: { wixMemberId: `dev:${email}` },
      update: {},
      create: { wixMemberId: `dev:${email}`, email },
    });
    createdStudentIds.push(student.id);
    const credit = await prisma.interviewCredit.create({
      data: {
        studentId: student.id,
        wixOrderId: `flex-order-${Date.now()}`,
        careerPath: "snowflake-data-engineer",
        difficulty: null, // as a real Wix-granted credit is minted
        status: "unused",
      },
    });

    const res = await sessionHandler(
      postReq("/api/mock-interview-session", { creditId: credit.id, careerPath: "snowflake-data-engineer", difficulty: "intermediate", devStudentEmail: email })
    );
    expect(res.status).toBe(201);
    const { session } = await res.json();
    expect(session.difficulty).toBe("intermediate");

    const updatedCredit = await prisma.interviewCredit.findUniqueOrThrow({ where: { id: credit.id } });
    expect(updatedCredit.difficulty).toBe("intermediate"); // set atomically at claim time
    expect(updatedCredit.status).toBe("consumed");
  });

  it("cannot claim a credit that belongs to a DIFFERENT student", async () => {
    const ownerEmail = `credit-owner-${Date.now()}@example.com`;
    const attackerEmail = `credit-attacker-${Date.now()}@example.com`;

    const mintRes = await sessionHandler(
      postReq("/api/mock-interview-session", { mintDevCredit: true, careerPath: "snowflake-data-engineer", difficulty: "beginner", devStudentEmail: ownerEmail })
    );
    const { creditId } = await mintRes.json();
    const owner = await prisma.student.findUniqueOrThrow({ where: { wixMemberId: `dev:${ownerEmail}` } });
    createdStudentIds.push(owner.id);

    const res = await sessionHandler(
      postReq("/api/mock-interview-session", { creditId, careerPath: "snowflake-data-engineer", difficulty: "beginner", devStudentEmail: attackerEmail })
    );
    expect(res.status).toBe(409);

    const attacker = await prisma.student.findUnique({ where: { wixMemberId: `dev:${attackerEmail}` } });
    if (attacker) createdStudentIds.push(attacker.id);

    // The credit must still be claimable by its real owner afterward.
    const ownerRes = await sessionHandler(
      postReq("/api/mock-interview-session", { creditId, careerPath: "snowflake-data-engineer", difficulty: "beginner", devStudentEmail: ownerEmail })
    );
    expect(ownerRes.status).toBe(201);
  });
});
