// Payment-recovery follow-up to the fail-closed fix in interviewCreditGrant.ts.
//
// grantInterviewCreditForOrder() never grants a credit without Wix's own
// authoritative confirmation — that's correct and non-negotiable, but it
// means a genuinely-paid order delivered while WIX_API_KEY/WIX_SITE_ID are
// briefly missing, or while Wix's own API is down, would otherwise be lost
// forever the instant the webhook returns 200. This module is what keeps
// that from happening, via three recovery paths that all funnel through
// the SAME processOrderPurchaseWithRecovery() -> grantInterviewCreditForOrder()
// call, so none of them can ever create a duplicate credit:
//
//   1. Wix's own webhook retries — up to 12 attempts over ~2 days (CONFIRMED
//      from Wix's "About Webhooks" docs, last updated 4 Oct 2026), triggered
//      by the webhook returning a 5xx for "verification-unavailable"
//      specifically (never for "not-paid"/"wrong-plan", which are legitimate
//      terminal outcomes Wix should not retry).
//   2. A scheduled Netlify Function (mock-interview-credit-retry-scheduled.ts)
//      that periodically re-attempts rows that are due, as a backstop that
//      doesn't depend on Wix's retry window.
//   3. An admin "retry now" action (mock-interview-admin-pending-credits.ts)
//      for exhausted rows needing manual attention, or for an immediate
//      re-check without waiting for the next scheduled pass.
import { prisma } from "./db";
import {
  grantInterviewCreditForOrder,
  type ParsedWixOrderEvent,
  type GrantCreditResult,
  type WixOrderPaymentStatus,
} from "./interviewCreditGrant";

// Bounded: after this many failed verification attempts, a row stops being
// auto-retried and flips to "exhausted" for manual admin review instead of
// retrying forever.
export const MAX_RETRY_ATTEMPTS = 6;

// Exponential-ish backoff, in ms, indexed by the attempt number that just
// failed (1-based). The last entry repeats for any attempt beyond its index.
const BACKOFF_SCHEDULE_MS = [
  60_000, // after attempt 1: retry in 1 min
  5 * 60_000, // after attempt 2: 5 min
  15 * 60_000, // after attempt 3: 15 min
  60 * 60_000, // after attempt 4: 1 hr
  6 * 60 * 60_000, // after attempt 5: 6 hr
  24 * 60 * 60_000, // after attempt 6 (the last bounded attempt): 24 hr, though attempt 6 itself flips the row to "exhausted" rather than scheduling a 7th
];

function backoffDelayMsForAttempt(attemptNumber: number): number {
  const idx = Math.min(attemptNumber - 1, BACKOFF_SCHEDULE_MS.length - 1);
  return BACKOFF_SCHEDULE_MS[Math.max(idx, 0)];
}

// Reconstructs the same ParsedWixOrderEvent shape grantInterviewCreditForOrder
// expects, from a row this module itself stored — the row's payloadStatus is
// carried through only for audit/debugging; it is never what the retry's
// grant decision is based on (that's still verifyOrderPaidWithWixApi, fresh,
// every time).
function eventFromPendingRow(row: {
  wixOrderId: string;
  wixMemberId: string;
  email: string;
  planId: string | null;
  payloadStatus: string;
}): ParsedWixOrderEvent {
  return {
    wixOrderId: row.wixOrderId,
    wixMemberId: row.wixMemberId,
    email: row.email,
    planId: row.planId ?? undefined,
    paymentStatus: row.payloadStatus as WixOrderPaymentStatus,
  };
}

// Records a verification-unavailable outcome as a durable, retryable row.
// Never called for "not-paid" or "wrong-plan" — both are terminal, legitimate
// outcomes with nothing to retry.
async function recordVerificationFailure(event: ParsedWixOrderEvent, errorReason: string): Promise<void> {
  const existing = await prisma.pendingCreditVerification.findUnique({ where: { wixOrderId: event.wixOrderId } });
  if (existing?.status === "resolved") return; // never resurrect a row that already reached a terminal outcome

  const attempts = (existing?.attempts ?? 0) + 1;
  const exhausted = attempts >= MAX_RETRY_ATTEMPTS;
  const nextAttemptAt = new Date(Date.now() + backoffDelayMsForAttempt(attempts));

  await prisma.pendingCreditVerification.upsert({
    where: { wixOrderId: event.wixOrderId },
    create: {
      wixOrderId: event.wixOrderId,
      wixMemberId: event.wixMemberId,
      email: event.email,
      planId: event.planId ?? null,
      payloadStatus: event.paymentStatus,
      attempts,
      nextAttemptAt,
      lastError: errorReason,
      status: exhausted ? "exhausted" : "pending",
    },
    update: {
      attempts,
      nextAttemptAt,
      lastError: errorReason,
      status: exhausted ? "exhausted" : "pending",
    },
  });
}

// Marks any existing pending/exhausted row for this order as terminally
// resolved. A no-op (updateMany matching zero rows) when no row exists —
// the common case, since most orders verify successfully on the very first
// attempt and never create a row at all.
async function resolveVerification(wixOrderId: string, resolution: "granted" | "not-paid"): Promise<void> {
  await prisma.pendingCreditVerification.updateMany({
    where: { wixOrderId, status: { not: "resolved" } },
    data: { status: "resolved", resolution },
  });
}

// THE single entry point every recovery path (webhook, scheduled retry,
// admin retry) calls. Delegates the actual grant decision entirely to
// grantInterviewCreditForOrder (same fail-closed rule, same idempotent
// InterviewCredit.wixOrderId-unique upsert) and only adds the
// PendingCreditVerification bookkeeping around it.
export async function processOrderPurchaseWithRecovery(event: ParsedWixOrderEvent): Promise<GrantCreditResult> {
  const result = await grantInterviewCreditForOrder(event);

  if (result.granted) {
    await resolveVerification(event.wixOrderId, "granted");
  } else if (result.reason === "not-paid") {
    await resolveVerification(event.wixOrderId, "not-paid");
  } else if (result.reason === "verification-unavailable") {
    await recordVerificationFailure(event, "wix-api-unavailable");
  }
  // "wrong-plan" intentionally touches no PendingCreditVerification row —
  // it's not a verification problem, it's a different plan entirely.

  return result;
}

export type RetryBatchSummary = {
  processed: number;
  granted: number;
  notPaid: number;
  stillPending: number;
  exhausted: number;
};

// Used by the scheduled function. Bounded by `limit` (Netlify scheduled
// functions have a 30s execution ceiling — a small batch per run, run
// frequently, stays comfortably inside that) and only picks up rows whose
// backoff has actually elapsed.
export async function retryDuePendingVerifications(limit = 25): Promise<RetryBatchSummary> {
  const due = await prisma.pendingCreditVerification.findMany({
    where: { status: "pending", nextAttemptAt: { lte: new Date() } },
    orderBy: { nextAttemptAt: "asc" },
    take: limit,
  });

  const summary: RetryBatchSummary = { processed: due.length, granted: 0, notPaid: 0, stillPending: 0, exhausted: 0 };

  for (const row of due) {
    const result = await processOrderPurchaseWithRecovery(eventFromPendingRow(row));
    if (result.granted) {
      summary.granted++;
    } else if (result.reason === "not-paid") {
      summary.notPaid++;
    } else if (result.reason === "verification-unavailable") {
      const after = await prisma.pendingCreditVerification.findUnique({ where: { wixOrderId: row.wixOrderId } });
      if (after?.status === "exhausted") summary.exhausted++;
      else summary.stillPending++;
    }
  }

  return summary;
}

// Used by the admin "retry now" action. Unlike retryDuePendingVerifications,
// this deliberately ignores both `status` (works on "pending" AND
// "exhausted" rows — an admin overriding exhaustion is the whole point) and
// `nextAttemptAt` (an admin asking for an immediate check shouldn't have to
// wait out the backoff).
export async function retrySpecificPendingOrder(wixOrderId: string): Promise<GrantCreditResult | { error: "not-found" }> {
  const row = await prisma.pendingCreditVerification.findUnique({ where: { wixOrderId } });
  if (!row || row.status === "resolved") return { error: "not-found" };
  return processOrderPurchaseWithRecovery(eventFromPendingRow(row));
}

export type PendingCreditVerificationSummaryDTO = {
  id: string;
  wixOrderId: string;
  wixMemberId: string;
  planId: string | null;
  status: string;
  attempts: number;
  nextAttemptAt: string;
  lastError: string | null;
  resolution: string | null;
  createdAt: string;
  updatedAt: string;
};

// Admin-visibility list (requirement 7) — deliberately omits `email` even
// though the field only ever holds a synthetic placeholder today
// (<memberId>@wix-member.invalid, see interviewCreditGrant.ts's
// resolveMemberEmail) — if that's ever wired up to a real address, this
// list shouldn't need to change to stay safe.
export async function listPendingCreditsNeedingAttention(): Promise<PendingCreditVerificationSummaryDTO[]> {
  const rows = await prisma.pendingCreditVerification.findMany({
    where: { status: { in: ["pending", "exhausted"] } },
    orderBy: [{ status: "asc" }, { nextAttemptAt: "asc" }],
  });
  return rows.map((r) => ({
    id: r.id,
    wixOrderId: r.wixOrderId,
    wixMemberId: r.wixMemberId,
    planId: r.planId,
    status: r.status,
    attempts: r.attempts,
    nextAttemptAt: r.nextAttemptAt.toISOString(),
    lastError: r.lastError,
    resolution: r.resolution,
    createdAt: r.createdAt.toISOString(),
    updatedAt: r.updatedAt.toISOString(),
  }));
}
