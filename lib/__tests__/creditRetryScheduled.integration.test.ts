// The scheduled function itself, exercised directly (Netlify's own
// platform-level access control — confirmed unreachable by direct URL,
// see the function's own file comment — isn't something a unit test can
// exercise; this only verifies the handler's own logic runs correctly).
import { describe, it, expect, afterAll, afterEach, beforeEach, vi } from "vitest";
import { prisma } from "../db";
import { processOrderPurchaseWithRecovery } from "../pendingCreditVerification";
import type { ParsedWixOrderEvent } from "../interviewCreditGrant";
import { wixStudentKey } from "../wixMemberToken";
// @ts-expect-error — .ts extension import, consistent with other Netlify Function tests in this project
import scheduledHandler from "../../netlify/functions/mock-interview-credit-retry-scheduled.ts";

const TEST_PLAN_ID = "test-mock-interview-plan-id";
const pendingOrderIds: string[] = [];
const createdStudentIds: string[] = [];

function fakeOrderId(label: string) {
  return `sched-${label}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
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

describe("mock-interview-credit-retry-scheduled handler", () => {
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
    if (pendingOrderIds.length) await prisma.pendingCreditVerification.deleteMany({ where: { wixOrderId: { in: pendingOrderIds } } });
    for (const id of createdStudentIds) {
      await prisma.interviewCredit.deleteMany({ where: { studentId: id } });
      await prisma.student.deleteMany({ where: { id } });
    }
  });

  it("runs without throwing and resolves a due, now-verifiable pending row", async () => {
    const orderId = fakeOrderId("auto-recover");
    pendingOrderIds.push(orderId);

    vi.stubEnv("WIX_API_KEY", "");
    vi.stubEnv("WIX_SITE_ID", "");
    await processOrderPurchaseWithRecovery(paidClaimEvent(orderId));
    await prisma.pendingCreditVerification.update({ where: { wixOrderId: orderId }, data: { nextAttemptAt: new Date(Date.now() - 1000) } });

    vi.stubEnv("WIX_API_KEY", "test-key");
    vi.stubEnv("WIX_SITE_ID", "test-site");
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response(JSON.stringify({ order: { lastPaymentStatus: "PAID" } }), { status: 200 }))
    );

    await expect(scheduledHandler(new Request("http://localhost/.netlify/functions/mock-interview-credit-retry-scheduled"))).resolves.not.toThrow();

    const row = await prisma.pendingCreditVerification.findUniqueOrThrow({ where: { wixOrderId: orderId } });
    expect(row.status).toBe("resolved");
    expect(row.resolution).toBe("granted");

    const student = await prisma.student.findUniqueOrThrow({ where: { wixMemberId: wixStudentKey(`member-${orderId}`) } });
    createdStudentIds.push(student.id);
  });
});
