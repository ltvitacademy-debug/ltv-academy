// Phase D — the actual HTTP endpoint Wix calls, exercised end-to-end: a
// real RS256-signed JWT in, signature verification, parsing, and the
// idempotent credit grant, all through the real Netlify Function handler.
import { describe, it, expect, afterAll, afterEach, beforeAll, vi } from "vitest";
import crypto from "crypto";
import { prisma } from "../db";
import { wixStudentKey } from "../wixMemberToken";
// @ts-expect-error — .ts extension import, consistent with other Netlify Function tests in this project
import webhookHandler from "../../netlify/functions/wix-interview-purchase-webhook.ts";

let publicKeyPem: string;
let privateKeyPem: string;
const createdStudentIds: string[] = [];
const pendingVerificationOrderIds: string[] = [];

function signToken(payload: unknown, privateKey: string): string {
  const header = Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" }), "utf8").toString("base64url");
  const body = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  const signingInput = `${header}.${body}`;
  const signer = crypto.createSign("RSA-SHA256");
  signer.update(signingInput);
  signer.end();
  return `${signingInput}.${signer.sign(privateKey).toString("base64url")}`;
}

const TEST_PLAN_ID = "test-mock-interview-plan-id";

function orderEvent(orderId: string, memberId: string, planId = TEST_PLAN_ID, lastPaymentStatus = "PAID") {
  return { data: { order: { _id: orderId, planId, lastPaymentStatus, buyer: { memberId } } } };
}

async function cleanupStudent(studentId: string) {
  await prisma.interviewCredit.deleteMany({ where: { studentId } });
  await prisma.student.deleteMany({ where: { id: studentId } });
}

beforeAll(() => {
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: { type: "spki", format: "pem" },
    privateKeyEncoding: { type: "pkcs8", format: "pem" },
  });
  publicKeyPem = publicKey;
  privateKeyPem = privateKey;
});

describe("wix-interview-purchase-webhook endpoint", () => {
  const ORIGINAL_KEY = process.env.WIX_WEBHOOK_PUBLIC_KEY;
  const ORIGINAL_PLAN = process.env.WIX_MOCK_INTERVIEW_PLAN_ID;

  afterEach(() => {
    process.env.WIX_WEBHOOK_PUBLIC_KEY = ORIGINAL_KEY;
    process.env.WIX_MOCK_INTERVIEW_PLAN_ID = ORIGINAL_PLAN;
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  // Stubs global.fetch — what verifyOrderPaidWithWixApi calls — so these
  // end-to-end tests exercise the real fail-closed verification path
  // instead of the old (removed) payload-trust fallback.
  function mockWixOrderAs(lastPaymentStatus: "PAID" | "UNPAID") {
    vi.stubEnv("WIX_API_KEY", "test-wix-api-key");
    vi.stubEnv("WIX_SITE_ID", "test-wix-site-id");
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response(JSON.stringify({ order: { lastPaymentStatus } }), { status: 200 }))
    );
  }
  afterAll(async () => {
    for (const id of createdStudentIds) await cleanupStudent(id);
    if (pendingVerificationOrderIds.length) {
      await prisma.pendingCreditVerification.deleteMany({ where: { wixOrderId: { in: pendingVerificationOrderIds } } });
    }
  });

  it("503s if the server has no public key configured — fails closed, never accepts an unverifiable event", async () => {
    delete process.env.WIX_WEBHOOK_PUBLIC_KEY;
    const token = signToken(orderEvent("o1", "m1"), privateKeyPem);
    const res = await webhookHandler(new Request("http://localhost/api/wix-interview-purchase-webhook", { method: "POST", body: token }));
    expect(res.status).toBe(503);
  });

  it("401s a request signed with the wrong key (not really from Wix)", async () => {
    process.env.WIX_WEBHOOK_PUBLIC_KEY = publicKeyPem;
    const { privateKey: wrongKey } = crypto.generateKeyPairSync("rsa", {
      modulusLength: 2048,
      publicKeyEncoding: { type: "spki", format: "pem" },
      privateKeyEncoding: { type: "pkcs8", format: "pem" },
    });
    const token = signToken(orderEvent("o2", "m2"), wrongKey);
    const res = await webhookHandler(new Request("http://localhost/api/wix-interview-purchase-webhook", { method: "POST", body: token }));
    expect(res.status).toBe(401);
  });

  it("400s a genuinely-signed token whose payload doesn't match the expected order shape", async () => {
    process.env.WIX_WEBHOOK_PUBLIC_KEY = publicKeyPem;
    const token = signToken({ nothing: "useful" }, privateKeyPem);
    const res = await webhookHandler(new Request("http://localhost/api/wix-interview-purchase-webhook", { method: "POST", body: token }));
    expect(res.status).toBe(400);
  });

  it("200s with granted:false for a genuinely-signed order on the WRONG plan (e.g. the $297/mo subscription) — never grants, never errors", async () => {
    process.env.WIX_WEBHOOK_PUBLIC_KEY = publicKeyPem;
    process.env.WIX_MOCK_INTERVIEW_PLAN_ID = TEST_PLAN_ID;
    const token = signToken(orderEvent(`wrong-plan-${Date.now()}`, `member-${Date.now()}`, "some-other-plan-id"), privateKeyPem);
    const res = await webhookHandler(new Request("http://localhost/api/wix-interview-purchase-webhook", { method: "POST", body: token }));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data).toEqual({ granted: false, reason: "wrong-plan" });
  });

  it("200s with granted:false for an order Wix authoritatively reports as unpaid — even though the payload itself says PAID", async () => {
    process.env.WIX_WEBHOOK_PUBLIC_KEY = publicKeyPem;
    process.env.WIX_MOCK_INTERVIEW_PLAN_ID = TEST_PLAN_ID;
    mockWixOrderAs("UNPAID");
    // The webhook payload claims PAID — proving the fix no longer trusts it.
    const token = signToken(orderEvent(`pending-${Date.now()}`, `member-${Date.now()}`, TEST_PLAN_ID, "PAID"), privateKeyPem);
    const res = await webhookHandler(new Request("http://localhost/api/wix-interview-purchase-webhook", { method: "POST", body: token }));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data).toEqual({ granted: false, reason: "not-paid" });
  });

  it("502s (so Wix retries) and records a durable pending row when WIX_API_KEY/WIX_SITE_ID aren't configured — never falls back to the payload", async () => {
    process.env.WIX_WEBHOOK_PUBLIC_KEY = publicKeyPem;
    process.env.WIX_MOCK_INTERVIEW_PLAN_ID = TEST_PLAN_ID;
    vi.stubEnv("WIX_API_KEY", "");
    vi.stubEnv("WIX_SITE_ID", "");
    // Payload says PAID — must still be refused without independent confirmation.
    const orderId = `unverifiable-${Date.now()}`;
    const token = signToken(orderEvent(orderId, `member-${Date.now()}`, TEST_PLAN_ID, "PAID"), privateKeyPem);
    const res = await webhookHandler(new Request("http://localhost/api/wix-interview-purchase-webhook", { method: "POST", body: token }));
    expect(res.status).toBe(502); // deliberately non-200 so Wix's own ~2-day retry schedule kicks in
    const data = await res.json();
    expect(data).toEqual({ granted: false, reason: "verification-unavailable" });

    const pending = await prisma.pendingCreditVerification.findUniqueOrThrow({ where: { wixOrderId: orderId } });
    expect(pending.status).toBe("pending");
    expect(pending.attempts).toBe(1);
    pendingVerificationOrderIds.push(orderId);
  });

  it("200s and grants a credit for a genuinely-signed, well-formed, PAID order on the right plan, authoritatively confirmed by Wix", async () => {
    process.env.WIX_WEBHOOK_PUBLIC_KEY = publicKeyPem;
    process.env.WIX_MOCK_INTERVIEW_PLAN_ID = TEST_PLAN_ID;
    mockWixOrderAs("PAID");
    const orderId = `webhook-order-${Date.now()}`;
    const memberId = `webhook-member-${Date.now()}`;
    const token = signToken(orderEvent(orderId, memberId), privateKeyPem);

    const res = await webhookHandler(new Request("http://localhost/api/wix-interview-purchase-webhook", { method: "POST", body: token }));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.granted).toBe(true);
    expect(data.alreadyExisted).toBe(false);

    const credit = await prisma.interviewCredit.findUniqueOrThrow({ where: { id: data.creditId } });
    expect(credit.wixOrderId).toBe(orderId);
    expect(credit.status).toBe("unused");

    const student = await prisma.student.findUniqueOrThrow({ where: { wixMemberId: wixStudentKey(memberId) } });
    createdStudentIds.push(student.id);

    // Redelivering the identical signed event is still a 200, and still idempotent.
    const replay = await webhookHandler(new Request("http://localhost/api/wix-interview-purchase-webhook", { method: "POST", body: token }));
    expect(replay.status).toBe(200);
    const replayData = await replay.json();
    expect(replayData.granted).toBe(true);
    expect(replayData.alreadyExisted).toBe(true);
    expect(replayData.creditId).toBe(data.creditId);
  });

  it("405s a non-POST request", async () => {
    const res = await webhookHandler(new Request("http://localhost/api/wix-interview-purchase-webhook", { method: "GET" }));
    expect(res.status).toBe(405);
  });
});
