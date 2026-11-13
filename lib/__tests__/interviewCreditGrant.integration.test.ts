// Phase D, priorities 2-4 — exactly one credit per ACTUALLY-PAID order,
// never for the wrong Plan, never for a pending/failed/canceled one, and
// duplicate/concurrent webhook deliveries for the SAME order never produce
// a second credit. Real DB, same pattern as the other integration tests.
import { describe, it, expect, afterAll, beforeEach, afterEach, vi } from "vitest";
import { prisma } from "../db";
import {
  parseWixOrderPurchasedEvent,
  grantInterviewCreditForOrder,
  isMockInterviewPlan,
  type ParsedWixOrderEvent,
  type WixOrderPaymentStatus,
} from "../interviewCreditGrant";
import { wixStudentKey } from "../wixMemberToken";

const TEST_PLAN_ID = "test-mock-interview-plan-id";
const OTHER_PLAN_ID = "the-297-per-month-subscription-plan-id";

const createdStudentIds: string[] = [];

async function cleanupStudent(studentId: string) {
  const sessions = await prisma.mockInterviewSession.findMany({ where: { studentId } });
  for (const s of sessions) await prisma.mockInterviewSession.deleteMany({ where: { id: s.id } });
  await prisma.interviewCredit.deleteMany({ where: { studentId } });
  await prisma.student.deleteMany({ where: { id: studentId } });
}

function fakeOrderId() {
  return `wix-order-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function paidEvent(overrides: Partial<ParsedWixOrderEvent> = {}): ParsedWixOrderEvent {
  const orderId = fakeOrderId();
  return {
    wixOrderId: orderId,
    wixMemberId: `member-${orderId}`,
    email: `student-${orderId}@wix-member.invalid`,
    planId: TEST_PLAN_ID,
    paymentStatus: "paid",
    ...overrides,
  };
}

describe("parseWixOrderPurchasedEvent — confirmed real payload shapes", () => {
  it("extracts order id, member id, plan id, and lastPaymentStatus from the REST webhook shape (actionEvent.body.order)", () => {
    const event = parseWixOrderPurchasedEvent({
      id: "evt-1",
      entityFqdn: "wix.pricing_plans.v2.order",
      slug: "purchased",
      actionEvent: { body: { order: { id: "order-1", planId: "plan-1", lastPaymentStatus: "PAID", status: "ACTIVE", buyer: { memberId: "member-1" } } } },
    });
    expect(event).toEqual({ wixOrderId: "order-1", wixMemberId: "member-1", email: "member-1@wix-member.invalid", planId: "plan-1", paymentStatus: "paid" });
  });

  it("also accepts the JS SDK shape (data.order, with _id)", () => {
    const event = parseWixOrderPurchasedEvent({
      data: { order: { _id: "order-2", planId: "plan-2", lastPaymentStatus: "PENDING", buyer: { contactId: "contact-2" } } },
    });
    expect(event?.wixOrderId).toBe("order-2");
    expect(event?.wixMemberId).toBe("contact-2");
    expect(event?.paymentStatus).toBe("pending");
  });

  it("order.status (ACTIVE/ENDED/etc) is never mistaken for a payment signal — only lastPaymentStatus counts", () => {
    // A real documented example: a fully-paid single-payment order has
    // status:"ACTIVE" but lastPaymentStatus:"NOT_APPLICABLE" (not "PAID").
    const event = parseWixOrderPurchasedEvent({
      data: { order: { _id: "order-3", planId: "plan-1", status: "ACTIVE", lastPaymentStatus: "NOT_APPLICABLE", buyer: { memberId: "member-3" } } },
    });
    expect(event?.paymentStatus).toBe("unknown"); // NOT "paid", despite status: ACTIVE
  });

  it("maps every documented lastPaymentStatus value correctly", () => {
    const statuses: [string, WixOrderPaymentStatus][] = [
      ["PAID", "paid"],
      ["REFUNDED", "refunded"],
      ["FAILED", "failed"],
      ["UNPAID", "unpaid"],
      ["PENDING", "pending"],
      ["NOT_APPLICABLE", "unknown"],
    ];
    for (const [raw, expected] of statuses) {
      const event = parseWixOrderPurchasedEvent({ data: { order: { _id: "x", lastPaymentStatus: raw, buyer: { memberId: "m" } } } });
      expect(event?.paymentStatus).toBe(expected);
    }
  });

  it("returns null rather than throwing on an unrecognized shape or missing memberId", () => {
    expect(parseWixOrderPurchasedEvent({ something: "else" })).toBeNull();
    expect(parseWixOrderPurchasedEvent(null)).toBeNull();
    expect(parseWixOrderPurchasedEvent("a string")).toBeNull();
    expect(parseWixOrderPurchasedEvent({ data: { order: { _id: "order-4" } } })).toBeNull(); // no buyer at all
  });

});

describe("isMockInterviewPlan — plan-id gating (spec priority 3: never touch the existing $297/mo subscription)", () => {
  const ORIGINAL = process.env.WIX_MOCK_INTERVIEW_PLAN_ID;
  afterEach(() => {
    process.env.WIX_MOCK_INTERVIEW_PLAN_ID = ORIGINAL;
  });

  it("fails closed (rejects everything) when unconfigured — never 'accept any plan' by default", () => {
    delete process.env.WIX_MOCK_INTERVIEW_PLAN_ID;
    expect(isMockInterviewPlan(TEST_PLAN_ID)).toBe(false);
    expect(isMockInterviewPlan(undefined)).toBe(false);
  });

  it("accepts only the exact configured plan id", () => {
    process.env.WIX_MOCK_INTERVIEW_PLAN_ID = TEST_PLAN_ID;
    expect(isMockInterviewPlan(TEST_PLAN_ID)).toBe(true);
    expect(isMockInterviewPlan(OTHER_PLAN_ID)).toBe(false); // the $297/mo plan's own purchase event
  });
});

describe("grantInterviewCreditForOrder — fail-closed authoritative verification (hardened) + plan gating (spec priority 2)", () => {
  const ORIGINAL_PLAN = process.env.WIX_MOCK_INTERVIEW_PLAN_ID;

  // Everything below stubs global.fetch (what verifyOrderPaidWithWixApi
  // calls) rather than mocking the module — this exercises the REAL
  // verifyOrderPaidWithWixApi code path (real header construction, real
  // null-vs-false-vs-true branching), not a stand-in for it.
  function mockWixOrderAsPaid() {
    vi.stubEnv("WIX_API_KEY", "test-wix-api-key");
    vi.stubEnv("WIX_SITE_ID", "test-wix-site-id");
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response(JSON.stringify({ order: { lastPaymentStatus: "PAID" } }), { status: 200 }))
    );
  }
  function mockWixOrderAsUnpaid() {
    vi.stubEnv("WIX_API_KEY", "test-wix-api-key");
    vi.stubEnv("WIX_SITE_ID", "test-wix-site-id");
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response(JSON.stringify({ order: { lastPaymentStatus: "UNPAID" } }), { status: 200 }))
    );
  }
  function mockWixApiHttpError() {
    vi.stubEnv("WIX_API_KEY", "test-wix-api-key");
    vi.stubEnv("WIX_SITE_ID", "test-wix-site-id");
    vi.stubGlobal("fetch", vi.fn(async () => new Response("", { status: 500 })));
  }
  function mockWixApiNetworkFailure() {
    vi.stubEnv("WIX_API_KEY", "test-wix-api-key");
    vi.stubEnv("WIX_SITE_ID", "test-wix-site-id");
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new Error("ECONNREFUSED (simulated)");
      })
    );
  }
  function mockMissingWixCredentials() {
    vi.stubEnv("WIX_API_KEY", "");
    vi.stubEnv("WIX_SITE_ID", "");
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new Error("fetch should never be called when credentials are missing");
      })
    );
  }

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
  });

  it("refuses an order for a DIFFERENT plan (e.g. the $297/mo subscription) — grants nothing, never even calls Wix", async () => {
    mockMissingWixCredentials(); // fetch throws if called — proves plan-gating short-circuits before any verification attempt
    const result = await grantInterviewCreditForOrder(paidEvent({ planId: OTHER_PLAN_ID }));
    expect(result).toEqual({ granted: false, reason: "wrong-plan" });
    const credits = await prisma.interviewCredit.findMany({ where: { wixOrderId: paidEvent({ planId: OTHER_PLAN_ID }).wixOrderId } });
    expect(credits).toHaveLength(0);
  });

  it("refuses when WIX_API_KEY/WIX_SITE_ID are not configured — NEVER falls back to trusting the webhook payload", async () => {
    mockMissingWixCredentials();
    // The payload itself claims "paid" — the whole point of the fix is that
    // this must no longer be enough on its own.
    const event = paidEvent({ paymentStatus: "paid" });
    const result = await grantInterviewCreditForOrder(event);
    expect(result).toEqual({ granted: false, reason: "verification-unavailable" });
    const credits = await prisma.interviewCredit.findMany({ where: { wixOrderId: event.wixOrderId } });
    expect(credits).toHaveLength(0);
  });

  it("refuses when Wix's API returns a non-OK HTTP response — fails closed, not crashed", async () => {
    mockWixApiHttpError();
    const event = paidEvent({ paymentStatus: "paid" });
    const result = await grantInterviewCreditForOrder(event);
    expect(result).toEqual({ granted: false, reason: "verification-unavailable" });
  });

  it("refuses when Wix's API is unreachable (network error) — fails closed, not crashed", async () => {
    mockWixApiNetworkFailure();
    const event = paidEvent({ paymentStatus: "paid" });
    const result = await grantInterviewCreditForOrder(event);
    expect(result).toEqual({ granted: false, reason: "verification-unavailable" });
  });

  it("refuses when Wix authoritatively reports the order unpaid — even if the webhook payload itself claims paid", async () => {
    mockWixOrderAsUnpaid();
    // This is the crux of the fix: the payload says "paid", Wix's own API
    // says otherwise, and Wix's API must win.
    const event = paidEvent({ paymentStatus: "paid" });
    const result = await grantInterviewCreditForOrder(event);
    expect(result).toEqual({ granted: false, reason: "not-paid" });
    const credits = await prisma.interviewCredit.findMany({ where: { wixOrderId: event.wixOrderId } });
    expect(credits).toHaveLength(0);
  });

  it("grants exactly one credit when Wix authoritatively confirms the order is paid", async () => {
    mockWixOrderAsPaid();
    const event = paidEvent();
    const result = await grantInterviewCreditForOrder(event);
    expect(result.granted).toBe(true);
    if (!result.granted) throw new Error("unreachable");
    expect(result.alreadyExisted).toBe(false);

    const credit = await prisma.interviewCredit.findUniqueOrThrow({ where: { id: result.creditId } });
    expect(credit.status).toBe("unused");
    expect(credit.difficulty).toBeNull(); // chosen later, not baked into the purchase
    expect(credit.careerPath).toBeNull(); // shared credit — career path also chosen later, not baked into the purchase

    const student = await prisma.student.findUniqueOrThrow({ where: { wixMemberId: wixStudentKey(event.wixMemberId) } });
    createdStudentIds.push(student.id);
  });

  it("redelivering the SAME already-granted order never creates a second credit, and never needs Wix reachable again", async () => {
    mockWixOrderAsPaid();
    const event = paidEvent();
    const first = await grantInterviewCreditForOrder(event);
    if (!first.granted) throw new Error("expected granted");
    expect(first.alreadyExisted).toBe(false);

    // Now simulate Wix's verification API being completely unreachable —
    // a redelivery of an order we ALREADY granted must still succeed as a
    // no-op, not get newly blocked by a transient outage.
    mockMissingWixCredentials();
    const second = await grantInterviewCreditForOrder(event);
    const third = await grantInterviewCreditForOrder(event);

    if (!second.granted || !third.granted) throw new Error("expected all three to be granted (idempotent)");
    expect(second.alreadyExisted).toBe(true);
    expect(third.alreadyExisted).toBe(true);
    expect(second.creditId).toBe(first.creditId);
    expect(third.creditId).toBe(first.creditId);

    const credits = await prisma.interviewCredit.findMany({ where: { wixOrderId: event.wixOrderId } });
    expect(credits).toHaveLength(1);

    const student = await prisma.student.findUniqueOrThrow({ where: { wixMemberId: wixStudentKey(event.wixMemberId) } });
    createdStudentIds.push(student.id);
  });

  it("truly concurrent duplicate deliveries for the same order still only create one credit", async () => {
    mockWixOrderAsPaid();
    const event = paidEvent();
    const results = await Promise.all([grantInterviewCreditForOrder(event), grantInterviewCreditForOrder(event), grantInterviewCreditForOrder(event)]);

    const creditIds = new Set(results.map((r) => (r.granted ? r.creditId : "not-granted")));
    expect(creditIds.size).toBe(1);
    expect(results.every((r) => r.granted)).toBe(true);

    const credits = await prisma.interviewCredit.findMany({ where: { wixOrderId: event.wixOrderId } });
    expect(credits).toHaveLength(1);

    const student = await prisma.student.findUniqueOrThrow({ where: { wixMemberId: wixStudentKey(event.wixMemberId) } });
    createdStudentIds.push(student.id);
  });

  it("a duplicate notification never mutates an already-consumed credit back to unused", async () => {
    mockWixOrderAsPaid();
    const event = paidEvent();
    const granted = await grantInterviewCreditForOrder(event);
    if (!granted.granted) throw new Error("expected granted");

    // Simulate the credit having already been spent on a real interview.
    await prisma.interviewCredit.update({ where: { id: granted.creditId }, data: { status: "consumed", consumedAt: new Date() } });

    const redelivered = await grantInterviewCreditForOrder(event);
    if (!redelivered.granted) throw new Error("expected granted");
    expect(redelivered.creditId).toBe(granted.creditId);

    const credit = await prisma.interviewCredit.findUniqueOrThrow({ where: { id: granted.creditId } });
    expect(credit.status).toBe("consumed"); // untouched by the redelivery

    const student = await prisma.student.findUniqueOrThrow({ where: { wixMemberId: wixStudentKey(event.wixMemberId) } });
    createdStudentIds.push(student.id);
  });
});
