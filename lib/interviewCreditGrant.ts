// Phase D, priorities 2-4 (and the follow-up hardening pass) — turning a
// verified, ACTUALLY-PAID Wix Pricing Plans order into exactly one
// InterviewCredit, no matter how many times Wix redelivers the
// notification, and never for the wrong Plan (the existing $297/mo
// subscription Plan must never trigger this at all).
//
// Field paths below are now grounded in a CONFIRMED real "Order Purchased"
// payload (dev.wix.com/docs/api-reference/business-solutions/pricing-plans/orders/order-purchased),
// not guessed — see the Phase D follow-up report for the research. Two
// REST-vs-SDK payload shapes exist:
//   - REST webhook (what Wix POSTs to an external URL, our case):
//     { id, entityFqdn, slug, entityId, eventTime, actionEvent: { body: { order: {...} } } }
//   - JS SDK event shape: { data: { order: {...} }, metadata: {...} } — order
//     keys use "_id" instead of "id" here.
import { prisma } from "./db";
import { wixStudentKey } from "./wixMemberToken";

// Only one career path exists today (the Snowflake pilot — see
// CLAUDE.md/app/app/mock-interview/page.tsx's PILOT_PATHS). If/when more
// paths sell their own $19.97 interview, map Wix's planId to a careerPath
// here instead of adding a branch anywhere else.
const DEFAULT_CAREER_PATH = "snowflake-data-engineer";
export function mapWixPlanIdToCareerPath(_planId: string | undefined): string {
  return DEFAULT_CAREER_PATH;
}

// The ONE Plan this webhook is allowed to act on. Every OTHER Plan on the
// site — including the existing $297/mo subscription — fires the exact same
// "Order Purchased" webhook event type, so without this check a monthly
// subscription renewal would ALSO grant a free interview credit. Required:
// an event whose planId doesn't match this is ignored (spec priority 3 —
// the one-time purchase must never touch/affect existing subscriptions,
// and that cuts both ways: existing subscriptions must never touch this).
export function isMockInterviewPlan(planId: string | undefined): boolean {
  const configuredPlanId = process.env.WIX_MOCK_INTERVIEW_PLAN_ID;
  if (!configuredPlanId) return false; // fail closed: unconfigured means "grant nothing", never "grant everything"
  return planId === configuredPlanId;
}

// CONFIRMED enum (Wix docs): PAID | REFUNDED | FAILED | UNPAID | PENDING |
// NOT_APPLICABLE. Only "PAID" authorizes a grant. Order.status (a SEPARATE
// field: DRAFT | PENDING | ACTIVE | PAUSED | ENDED | CANCELED) is NOT a
// payment signal — a confirmed real example shows status:"ACTIVE" with
// lastPaymentStatus:"NOT_APPLICABLE", so status must never be used as a
// stand-in for payment confirmation.
export type WixOrderPaymentStatus = "paid" | "refunded" | "failed" | "unpaid" | "pending" | "unknown";

export type ParsedWixOrderEvent = {
  wixOrderId: string;
  wixMemberId: string;
  // Confirmed: the order payload carries NO email field (only
  // buyer.memberId / buyer.contactId). A real email requires a separate
  // Wix Members API call (GET /members/v1/members/{memberId}) that isn't
  // wired up yet — see resolveMemberEmail below. Until then this is a
  // placeholder, never used for anything security-sensitive (wixMemberId,
  // not email, is the actual identity key everywhere in this feature).
  email: string;
  planId?: string;
  paymentStatus: WixOrderPaymentStatus;
};

export function parseWixOrderPurchasedEvent(decodedPayload: unknown): ParsedWixOrderEvent | null {
  // console.log("RAW WIX WEBHOOK PAYLOAD:", JSON.stringify(decodedPayload)); // uncomment only while verifying field paths against a real test delivery
  if (!decodedPayload || typeof decodedPayload !== "object") return null;
  const root = decodedPayload as Record<string, unknown>;

  const order =
    (root.actionEvent as Record<string, unknown> | undefined)?.body &&
    ((root.actionEvent as Record<string, unknown>).body as Record<string, unknown>).order
      ? ((root.actionEvent as Record<string, unknown>).body as Record<string, unknown>).order
      : (root.data as Record<string, unknown> | undefined)?.order ?? root.order ?? root.entity ?? null;
  if (!order || typeof order !== "object") return null;
  const o = order as Record<string, unknown>;

  const orderId = o.id ?? o._id;
  const buyer = (o.buyer as Record<string, unknown> | undefined) ?? {};
  const memberId = buyer.memberId ?? buyer.contactId;

  if (typeof orderId !== "string" && typeof orderId !== "number") return null;
  if (typeof memberId !== "string" || !memberId) return null;

  const planId = o.planId;

  return {
    wixOrderId: String(orderId),
    wixMemberId: memberId,
    email: `${memberId}@wix-member.invalid`, // placeholder — see resolveMemberEmail
    planId: typeof planId === "string" ? planId : undefined,
    paymentStatus: parsePaymentStatus(o),
  };
}

function parsePaymentStatus(order: Record<string, unknown>): WixOrderPaymentStatus {
  const raw = order.lastPaymentStatus;
  if (typeof raw !== "string") return "unknown";
  switch (raw.toUpperCase()) {
    case "PAID":
      return "paid";
    case "REFUNDED":
      return "refunded";
    case "FAILED":
      return "failed";
    case "UNPAID":
      return "unpaid";
    case "PENDING":
      return "pending";
    default:
      return "unknown"; // includes NOT_APPLICABLE — never treated as paid
  }
}

// NOT YET IMPLEMENTED — resolving a real email requires a Wix Members API
// call (GET https://www.wixapis.com/members/v1/members/{memberId}) that
// needs its own app auth, not yet wired up. Returns null until then; every
// caller must treat email as optional/best-effort, never as the actual
// identity key (wixMemberId already is).
export async function resolveMemberEmail(_memberId: string): Promise<string | null> {
  return null;
}

// Authoritative re-verification against Wix's own API — CONFIRMED (browsed
// Wix's live REST reference) endpoint, headers, and scope:
//   GET https://www.wixapis.com/pricing-plans/v2/orders/{orderId}
//   Authorization: <WIX_API_KEY>, wix-site-id: <WIX_SITE_ID>
//   Permission scope: READ ORDERS
// Returns null ("couldn't check" — missing credentials, non-OK response, or
// a network/timeout failure) rather than false ("checked, and it's
// definitely not paid"), so the caller can tell the two apart.
// grantInterviewCreditForOrder treats BOTH null and false as "do not grant"
// — it is fail-closed, never falling back to trusting the webhook payload's
// own claimed status. A null result instead goes to
// lib/pendingCreditVerification.ts for durable, bounded, backed-off retry
// (Wix's own webhook retries, a scheduled function, and an admin "retry
// now" action), so a genuinely-paid order isn't lost just because
// verification wasn't possible on the very first attempt. No network call
// happens while WIX_API_KEY/WIX_SITE_ID are unset — this never spends
// anything or reaches Wix without your configured credentials.
// Wix's own webhook delivery times out (and queues a retry) if OUR server
// doesn't respond within 1250ms total (CONFIRMED: Wix "About Webhooks" docs,
// last updated 4 Oct 2026) — so a slow upstream call to Wix's OWN API here
// must never be allowed to eat that whole budget itself. 900ms leaves
// headroom for JWT verification, JSON parsing, and our own DB writes before
// hitting Wix's wall; if Wix's API hasn't responded by then, aborting and
// returning null (same as any other "couldn't verify" outcome) is far
// better than risking an out-of-order resend caused by OUR OWN timeout.
const WIX_VERIFY_FETCH_TIMEOUT_MS = 900;

export async function verifyOrderPaidWithWixApi(wixOrderId: string): Promise<boolean | null> {
  const apiKey = process.env.WIX_API_KEY;
  const siteId = process.env.WIX_SITE_ID;
  if (!apiKey || !siteId) return null;

  const abortController = new AbortController();
  const timeout = setTimeout(() => abortController.abort(), WIX_VERIFY_FETCH_TIMEOUT_MS);

  let res: Response;
  try {
    res = await fetch(`https://www.wixapis.com/pricing-plans/v2/orders/${encodeURIComponent(wixOrderId)}`, {
      headers: { Authorization: apiKey, "wix-site-id": siteId },
      signal: abortController.signal,
    });
  } catch (error) {
    // A network-level failure OR our own 900ms abort (DNS, timeout,
    // connection refused, AbortError, ...) is just as much "couldn't check"
    // as a non-OK HTTP response — must not throw out of here, or an outage
    // would crash the webhook handler instead of just failing the grant
    // closed.
    console.error(`verifyOrderPaidWithWixApi: network error or timeout fetching order ${wixOrderId}:`, error);
    return null;
  } finally {
    clearTimeout(timeout);
  }
  if (!res.ok) {
    console.error(`verifyOrderPaidWithWixApi: Wix returned ${res.status} fetching order ${wixOrderId}`);
    return null;
  }
  const body = (await res.json()) as { order?: { lastPaymentStatus?: string } };
  return body.order?.lastPaymentStatus === "PAID";
}

export type GrantCreditResult =
  | { granted: true; creditId: string; alreadyExisted: boolean }
  | { granted: false; reason: "not-paid" | "wrong-plan" | "verification-unavailable" };

// Idempotent by construction: the InterviewCredit.wixOrderId unique
// constraint means `upsert` can only ever create ONE row for a given order,
// no matter how many times Wix redelivers the same "Order Purchased" event
// — and it's atomic at the database level, so two truly concurrent
// deliveries for the SAME order can't race into two rows.
export async function grantInterviewCreditForOrder(event: ParsedWixOrderEvent): Promise<GrantCreditResult> {
  if (!isMockInterviewPlan(event.planId)) {
    return { granted: false, reason: "wrong-plan" };
  }

  // A redelivery of an order we already granted a credit for is a pure
  // no-op success. It already proved payment once — that's what created
  // this row — so a retry/redelivery never needs to re-prove it, and in
  // particular must never be blocked just because Wix's verification API
  // happens to be unreachable on THIS specific delivery.
  const existing = await prisma.interviewCredit.findUnique({ where: { wixOrderId: event.wixOrderId } });
  if (existing) {
    return { granted: true, creditId: existing.id, alreadyExisted: true };
  }

  // Fail CLOSED: a credit is only ever granted on Wix's own authoritative
  // confirmation. The webhook payload's own lastPaymentStatus field is
  // NEVER sufficient by itself — a forged, replayed, or simply stale
  // webhook delivery could claim any status it likes, and the payload is
  // not a trusted source of truth on its own. If WIX_API_KEY/WIX_SITE_ID
  // aren't configured, or Wix's API is unreachable, this refuses to grant
  // rather than falling back to trusting the payload.
  const authoritative = await verifyOrderPaidWithWixApi(event.wixOrderId);
  if (authoritative === null) {
    console.error(
      `interviewCreditGrant: no authoritative Wix payment verification available for order ${event.wixOrderId} (WIX_API_KEY/WIX_SITE_ID missing, or Wix's API was unreachable) — refusing to grant without independent confirmation.`
    );
    return { granted: false, reason: "verification-unavailable" };
  }
  if (!authoritative) {
    return { granted: false, reason: "not-paid" };
  }

  const careerPath = mapWixPlanIdToCareerPath(event.planId);
  const resolvedEmail = (await resolveMemberEmail(event.wixMemberId)) ?? event.email;

  const student = await prisma.student.upsert({
    where: { wixMemberId: wixStudentKey(event.wixMemberId) },
    update: { email: resolvedEmail },
    create: { wixMemberId: wixStudentKey(event.wixMemberId), email: resolvedEmail },
  });

  const credit = await prisma.interviewCredit.upsert({
    where: { wixOrderId: event.wixOrderId },
    update: {}, // a concurrent duplicate racing in after our own findUnique above is a pure no-op — never touch an existing credit's state from here
    create: {
      studentId: student.id,
      wixOrderId: event.wixOrderId,
      careerPath,
      difficulty: null, // chosen by the student at session start, not baked into the Wix purchase
      status: "unused",
    },
  });

  return { granted: true, creditId: credit.id, alreadyExisted: false };
}
