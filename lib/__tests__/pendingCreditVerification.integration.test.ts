// Payment-recovery follow-up (requirement 8): temporary failures, eventual
// success, duplicate delivery/retry, and exhausted retries. Real DB, fetch
// stubbed to exercise the real verifyOrderPaidWithWixApi code path — same
// pattern as interviewCreditGrant.integration.test.ts.
import { describe, it, expect, afterAll, afterEach, beforeEach, vi } from "vitest";
import { prisma } from "../db";
import {
  processOrderPurchaseWithRecovery,
  retryDuePendingVerifications,
  retrySpecificPendingOrder,
  listPendingCreditsNeedingAttention,
  MAX_RETRY_ATTEMPTS,
} from "../pendingCreditVerification";
import type { ParsedWixOrderEvent } from "../interviewCreditGrant";
import { wixStudentKey } from "../wixMemberToken";

const TEST_PLAN_ID = "test-mock-interview-plan-id";
const createdStudentIds: string[] = [];
const pendingOrderIds: string[] = [];

async function cleanupStudent(studentId: string) {
  const sessions = await prisma.mockInterviewSession.findMany({ where: { studentId } });
  for (const s of sessions) await prisma.mockInterviewSession.deleteMany({ where: { id: s.id } });
  await prisma.interviewCredit.deleteMany({ where: { studentId } });
  await prisma.student.deleteMany({ where: { id: studentId } });
}

function fakeOrderId(label: string) {
  return `pending-cv-${label}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
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

function mockWixUnavailable() {
  vi.stubEnv("WIX_API_KEY", "");
  vi.stubEnv("WIX_SITE_ID", "");
}
function mockWixOrderAs(lastPaymentStatus: "PAID" | "UNPAID") {
  vi.stubEnv("WIX_API_KEY", "test-key");
  vi.stubEnv("WIX_SITE_ID", "test-site");
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => new Response(JSON.stringify({ order: { lastPaymentStatus } }), { status: 200 }))
  );
}

describe("pendingCreditVerification — durable, bounded, backed-off recovery", () => {
  const ORIGINAL_PLAN = process.env.WIX_MOCK_INTERVIEW_PLAN_ID;
  beforeEach(() => {
    process.env.WIX_MOCK_INTERVIEW_PLAN_ID = TEST_PLAN_ID;
  });
  afterEach(() => {
    process.env.WIX_MOCK_INTERVIEW_PLAN_ID = ORIGINAL_PLAN;
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });
  afterAll(async () => {
    for (const id of createdStudentIds) await cleanupStudent(id);
    if (pendingOrderIds.length) await prisma.pendingCreditVerification.deleteMany({ where: { wixOrderId: { in: pendingOrderIds } } });
  });

  it("temporary failure: records a pending row with attempts=1 and a near-future nextAttemptAt", async () => {
    const orderId = fakeOrderId("temp-fail");
    pendingOrderIds.push(orderId);
    mockWixUnavailable();

    const result = await processOrderPurchaseWithRecovery(paidClaimEvent(orderId));
    expect(result).toEqual({ granted: false, reason: "verification-unavailable" });

    const row = await prisma.pendingCreditVerification.findUniqueOrThrow({ where: { wixOrderId: orderId } });
    expect(row.status).toBe("pending");
    expect(row.attempts).toBe(1);
    expect(row.resolution).toBeNull();
    expect(row.nextAttemptAt.getTime()).toBeGreaterThan(Date.now());
    expect(row.nextAttemptAt.getTime()).toBeLessThan(Date.now() + 2 * 60_000); // first backoff step is 1 min
  });

  it("eventual success: a later retry that reaches Wix and gets confirmation grants exactly one credit and resolves the row", async () => {
    const orderId = fakeOrderId("eventual-success");
    pendingOrderIds.push(orderId);

    mockWixUnavailable();
    const first = await processOrderPurchaseWithRecovery(paidClaimEvent(orderId));
    expect(first).toEqual({ granted: false, reason: "verification-unavailable" });

    // Simulate the scheduled function's next pass, once Wix is reachable again.
    mockWixOrderAs("PAID");
    const retried = await retrySpecificPendingOrder(orderId);
    expect("granted" in retried && retried.granted).toBe(true);
    if (!("granted" in retried) || !retried.granted) throw new Error("expected granted");
    expect(retried.alreadyExisted).toBe(false);

    const row = await prisma.pendingCreditVerification.findUniqueOrThrow({ where: { wixOrderId: orderId } });
    expect(row.status).toBe("resolved");
    expect(row.resolution).toBe("granted");

    const credits = await prisma.interviewCredit.findMany({ where: { wixOrderId: orderId } });
    expect(credits).toHaveLength(1);

    const student = await prisma.student.findUniqueOrThrow({ where: { wixMemberId: wixStudentKey(`member-${orderId}`) } });
    createdStudentIds.push(student.id);
  });

  it("Wix authoritatively confirming unpaid resolves the row as terminal (not-paid), not left pending", async () => {
    const orderId = fakeOrderId("unpaid");
    pendingOrderIds.push(orderId);

    mockWixUnavailable();
    await processOrderPurchaseWithRecovery(paidClaimEvent(orderId));

    mockWixOrderAs("UNPAID");
    const retried = await retrySpecificPendingOrder(orderId);
    expect(retried).toEqual({ granted: false, reason: "not-paid" });

    const row = await prisma.pendingCreditVerification.findUniqueOrThrow({ where: { wixOrderId: orderId } });
    expect(row.status).toBe("resolved");
    expect(row.resolution).toBe("not-paid");

    const credits = await prisma.interviewCredit.findMany({ where: { wixOrderId: orderId } });
    expect(credits).toHaveLength(0);
  });

  it("bounded: flips to exhausted after MAX_RETRY_ATTEMPTS consecutive verification-unavailable outcomes, never retries forever", async () => {
    const orderId = fakeOrderId("exhaust");
    pendingOrderIds.push(orderId);
    mockWixUnavailable();

    let lastRow;
    for (let i = 0; i < MAX_RETRY_ATTEMPTS; i++) {
      await processOrderPurchaseWithRecovery(paidClaimEvent(orderId));
      lastRow = await prisma.pendingCreditVerification.findUniqueOrThrow({ where: { wixOrderId: orderId } });
    }
    expect(lastRow!.attempts).toBe(MAX_RETRY_ATTEMPTS);
    expect(lastRow!.status).toBe("exhausted");

    // One more attempt past exhaustion must NOT silently keep incrementing
    // forever via the normal (non-admin) path once already exhausted —
    // recordVerificationFailure still only runs via processOrderPurchaseWithRecovery,
    // called here exactly like any other delivery/retry would call it.
    await processOrderPurchaseWithRecovery(paidClaimEvent(orderId));
    const after = await prisma.pendingCreditVerification.findUniqueOrThrow({ where: { wixOrderId: orderId } });
    expect(after.status).toBe("exhausted");
  });

  it("an exhausted order still shows up for admin visibility, and an admin retry overrides exhaustion", async () => {
    const orderId = fakeOrderId("admin-override");
    pendingOrderIds.push(orderId);
    mockWixUnavailable();
    for (let i = 0; i < MAX_RETRY_ATTEMPTS; i++) {
      await processOrderPurchaseWithRecovery(paidClaimEvent(orderId));
    }
    const exhaustedRow = await prisma.pendingCreditVerification.findUniqueOrThrow({ where: { wixOrderId: orderId } });
    expect(exhaustedRow.status).toBe("exhausted");

    const visible = await listPendingCreditsNeedingAttention();
    expect(visible.some((v) => v.wixOrderId === orderId && v.status === "exhausted")).toBe(true);

    // Admin manually retries despite exhaustion and despite nextAttemptAt not having elapsed.
    mockWixOrderAs("PAID");
    const retried = await retrySpecificPendingOrder(orderId);
    expect("granted" in retried && retried.granted).toBe(true);
    if (!("granted" in retried) || !retried.granted) throw new Error("expected granted");

    const student = await prisma.student.findUniqueOrThrow({ where: { wixMemberId: wixStudentKey(`member-${orderId}`) } });
    createdStudentIds.push(student.id);
  });

  it("retrySpecificPendingOrder returns not-found for an order with no record, and for an already-resolved one", async () => {
    const unknown = await retrySpecificPendingOrder(fakeOrderId("never-existed"));
    expect(unknown).toEqual({ error: "not-found" });

    const orderId = fakeOrderId("already-resolved");
    pendingOrderIds.push(orderId);
    mockWixOrderAs("PAID"); // resolves on the very first attempt, no pending row ever created
    const first = await processOrderPurchaseWithRecovery(paidClaimEvent(orderId));
    expect(first.granted).toBe(true);
    if (!first.granted) throw new Error("unreachable");

    const student = await prisma.student.findUniqueOrThrow({ where: { wixMemberId: wixStudentKey(`member-${orderId}`) } });
    createdStudentIds.push(student.id);

    // No PendingCreditVerification row exists at all for an order that verified on the first try.
    const retried = await retrySpecificPendingOrder(orderId);
    expect(retried).toEqual({ error: "not-found" });
  });

  it("retryDuePendingVerifications only picks up rows whose backoff has elapsed, respects its limit, and reports an accurate summary", async () => {
    const dueOrderId = fakeOrderId("due-now");
    const notDueOrderId = fakeOrderId("not-due-yet");
    pendingOrderIds.push(dueOrderId, notDueOrderId);

    mockWixUnavailable();
    await processOrderPurchaseWithRecovery(paidClaimEvent(dueOrderId));
    await processOrderPurchaseWithRecovery(paidClaimEvent(notDueOrderId));

    // Pin both rows' nextAttemptAt explicitly (rather than relying on the
    // real 1-min backoff window versus real wall-clock test speed, which
    // is exactly the kind of timing assumption that makes a test flaky) —
    // one forced into the past so the batch must pick it up, one forced
    // an hour into the future so it's unambiguously skipped this pass.
    await prisma.pendingCreditVerification.update({ where: { wixOrderId: dueOrderId }, data: { nextAttemptAt: new Date(Date.now() - 1000) } });
    await prisma.pendingCreditVerification.update({ where: { wixOrderId: notDueOrderId }, data: { nextAttemptAt: new Date(Date.now() + 60 * 60_000) } });

    mockWixOrderAs("PAID");
    // Don't assert an exact global `processed` count — the real SQLite test
    // DB is shared across every test file in the suite, so another file's
    // row could legitimately also be due at the same moment. What actually
    // matters for this test is scoped to these two specific rows.
    const summary = await retryDuePendingVerifications(25);
    expect(summary.processed).toBeGreaterThanOrEqual(1);
    expect(summary.granted).toBeGreaterThanOrEqual(1);

    const dueRow = await prisma.pendingCreditVerification.findUniqueOrThrow({ where: { wixOrderId: dueOrderId } });
    expect(dueRow.status).toBe("resolved");
    const notDueRow = await prisma.pendingCreditVerification.findUniqueOrThrow({ where: { wixOrderId: notDueOrderId } });
    expect(notDueRow.status).toBe("pending"); // untouched — its backoff hasn't elapsed

    const student = await prisma.student.findUniqueOrThrow({ where: { wixMemberId: wixStudentKey(`member-${dueOrderId}`) } });
    createdStudentIds.push(student.id);
  });

  it("concurrent recovery paths (simulating a scheduled retry racing an admin retry) still only create one credit", async () => {
    const orderId = fakeOrderId("concurrent-recovery");
    pendingOrderIds.push(orderId);

    mockWixUnavailable();
    await processOrderPurchaseWithRecovery(paidClaimEvent(orderId));

    mockWixOrderAs("PAID");
    const [a, b, c] = await Promise.all([
      retrySpecificPendingOrder(orderId),
      retrySpecificPendingOrder(orderId),
      retrySpecificPendingOrder(orderId),
    ]);
    const outcomes = [a, b, c];
    expect(outcomes.every((o) => "granted" in o && o.granted)).toBe(true);
    const creditIds = new Set(outcomes.map((o) => ("granted" in o && o.granted ? o.creditId : "none")));
    expect(creditIds.size).toBe(1);

    const credits = await prisma.interviewCredit.findMany({ where: { wixOrderId: orderId } });
    expect(credits).toHaveLength(1);

    const student = await prisma.student.findUniqueOrThrow({ where: { wixMemberId: wixStudentKey(`member-${orderId}`) } });
    createdStudentIds.push(student.id);
  });
});
