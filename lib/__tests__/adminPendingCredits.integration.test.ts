// Payment-recovery admin endpoint — authenticated, role-based access
// (same pattern as adminAuth.test.ts), listing, and the retry action,
// exercised through the real Netlify Function handler.
import { describe, it, expect, afterAll, afterEach, beforeEach } from "vitest";
import { prisma } from "../db";
import { signAdminSessionToken } from "../adminAuth";
import { processOrderPurchaseWithRecovery } from "../pendingCreditVerification";
import type { ParsedWixOrderEvent } from "../interviewCreditGrant";
// @ts-expect-error — .ts extension import, consistent with other Netlify Function tests in this project
import adminPendingCreditsHandler from "../../netlify/functions/mock-interview-admin-pending-credits.ts";

const TEST_PLAN_ID = "test-mock-interview-plan-id";
const pendingOrderIds: string[] = [];
const createdStudentIds: string[] = [];

function fakeOrderId(label: string) {
  return `admin-pc-${label}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function paidClaimEvent(orderId: string): ParsedWixOrderEvent {
  return {
    wixOrderId: orderId,
    wixMemberId: `member-${orderId}`,
    email: `student-${orderId}@wix-member.invalid`,
    planId: TEST_PLAN_ID,
    paymentStatus: "paid",
  };
}

describe("mock-interview-admin-pending-credits endpoint", () => {
  const ORIGINAL_SECRET = process.env.ADMIN_SESSION_SECRET;
  const ORIGINAL_PLAN = process.env.WIX_MOCK_INTERVIEW_PLAN_ID;

  beforeEach(() => {
    process.env.ADMIN_SESSION_SECRET = "test-admin-session-secret";
    process.env.WIX_MOCK_INTERVIEW_PLAN_ID = TEST_PLAN_ID;
    process.env.WIX_API_KEY = ""; // force "unavailable" so attempts produce real pending rows
    process.env.WIX_SITE_ID = "";
  });
  afterEach(() => {
    process.env.ADMIN_SESSION_SECRET = ORIGINAL_SECRET;
    process.env.WIX_MOCK_INTERVIEW_PLAN_ID = ORIGINAL_PLAN;
    delete process.env.WIX_API_KEY;
    delete process.env.WIX_SITE_ID;
  });
  afterAll(async () => {
    if (pendingOrderIds.length) await prisma.pendingCreditVerification.deleteMany({ where: { wixOrderId: { in: pendingOrderIds } } });
    for (const id of createdStudentIds) {
      await prisma.interviewCredit.deleteMany({ where: { studentId: id } });
      await prisma.student.deleteMany({ where: { id } });
    }
  });

  function adminToken() {
    const token = signAdminSessionToken({ adminId: "admin-1", email: "bill@ltvacademy.com", role: "admin" });
    if (!token) throw new Error("expected a token");
    return token;
  }

  it("403s without a valid admin session token", async () => {
    const res = await adminPendingCreditsHandler(new Request("http://localhost/api/mock-interview-admin-pending-credits"));
    expect(res.status).toBe(403);
  });

  it("GET lists pending and exhausted rows, but not resolved ones", async () => {
    const pendingId = fakeOrderId("list-pending");
    const resolvedId = fakeOrderId("list-resolved");
    pendingOrderIds.push(pendingId, resolvedId);

    await processOrderPurchaseWithRecovery(paidClaimEvent(pendingId)); // stays pending (WIX_API_KEY unset)
    // Manufacture a resolved row directly — exercising the DB state rather
    // than re-deriving it through a second verification path here.
    await prisma.pendingCreditVerification.create({
      data: {
        wixOrderId: resolvedId,
        wixMemberId: `member-${resolvedId}`,
        email: `student-${resolvedId}@wix-member.invalid`,
        planId: TEST_PLAN_ID,
        payloadStatus: "paid",
        status: "resolved",
        resolution: "granted",
        attempts: 1,
        nextAttemptAt: new Date(),
      },
    });

    const res = await adminPendingCreditsHandler(
      new Request("http://localhost/api/mock-interview-admin-pending-credits", { headers: { authorization: `Bearer ${adminToken()}` } })
    );
    expect(res.status).toBe(200);
    const data = await res.json();
    const ids: string[] = data.items.map((i: { wixOrderId: string }) => i.wixOrderId);
    expect(ids).toContain(pendingId);
    expect(ids).not.toContain(resolvedId);
    // The listed shape never includes an email field — see
    // listPendingCreditsNeedingAttention's own comment on why.
    expect(data.items.every((i: Record<string, unknown>) => !("email" in i))).toBe(true);
  });

  it("POST retries a specific order and reports the outcome", async () => {
    const orderId = fakeOrderId("retry-action");
    pendingOrderIds.push(orderId);
    await processOrderPurchaseWithRecovery(paidClaimEvent(orderId));

    const res = await adminPendingCreditsHandler(
      new Request("http://localhost/api/mock-interview-admin-pending-credits", {
        method: "POST",
        headers: { "content-type": "application/json", authorization: `Bearer ${adminToken()}` },
        body: JSON.stringify({ wixOrderId: orderId }),
      })
    );
    expect(res.status).toBe(200);
    const data = await res.json();
    // Still no WIX_API_KEY configured in this test — expect another
    // verification-unavailable, proving the action actually re-ran
    // verification rather than just echoing back old state.
    expect(data.result).toEqual({ granted: false, reason: "verification-unavailable" });

    const row = await prisma.pendingCreditVerification.findUniqueOrThrow({ where: { wixOrderId: orderId } });
    expect(row.attempts).toBe(2); // incremented by this retry, on top of the original failure
  });

  it("POST 404s for an order with no pending/exhausted record", async () => {
    const res = await adminPendingCreditsHandler(
      new Request("http://localhost/api/mock-interview-admin-pending-credits", {
        method: "POST",
        headers: { "content-type": "application/json", authorization: `Bearer ${adminToken()}` },
        body: JSON.stringify({ wixOrderId: fakeOrderId("never-existed") }),
      })
    );
    expect(res.status).toBe(404);
  });

  it("POST 400s with a missing wixOrderId", async () => {
    const res = await adminPendingCreditsHandler(
      new Request("http://localhost/api/mock-interview-admin-pending-credits", {
        method: "POST",
        headers: { "content-type": "application/json", authorization: `Bearer ${adminToken()}` },
        body: JSON.stringify({}),
      })
    );
    expect(res.status).toBe(400);
  });
});
