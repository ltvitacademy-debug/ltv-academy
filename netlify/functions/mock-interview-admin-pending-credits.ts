// Payment-recovery admin surface (requirement: "keep exhausted orders
// visible for manual review and retry"). Same authenticated, role-based
// admin gate as mock-interview-admin-review.ts — nothing new invented here.
//
// GET  /api/mock-interview-admin-pending-credits
//   headers: { "authorization": "Bearer <token from /api/admin-login>" }
//   -> { items: PendingCreditVerificationSummaryDTO[] } — every "pending" or
//      "exhausted" row, exhausted ones needing the most attention first.
// POST /api/mock-interview-admin-pending-credits
//   headers: { "authorization": "Bearer ..." }
//   body: { wixOrderId: string }
//   -> { result: GrantCreditResult } — an immediate, authoritative re-check
//      against Wix, bypassing the normal backoff wait. Works on BOTH
//      "pending" and "exhausted" rows (an admin overriding exhaustion on a
//      row that should still be retried is the whole point of this action).
import type { Config } from "@netlify/functions";
import { extractAdminSessionToken, verifyAdminSessionToken, hasAdminReviewAccess } from "../../lib/adminAuth";
import { listPendingCreditsNeedingAttention, retrySpecificPendingOrder } from "../../lib/pendingCreditVerification";

export default async (req: Request) => {
  const identity = verifyAdminSessionToken(extractAdminSessionToken(req));
  if (!hasAdminReviewAccess(identity)) {
    return json({ error: "Not authorized." }, 403);
  }

  if (req.method === "GET") {
    const items = await listPendingCreditsNeedingAttention();
    return json({ items });
  }

  if (req.method === "POST") {
    let body: { wixOrderId?: unknown };
    try {
      body = await req.json();
    } catch {
      return json({ error: "Invalid JSON body" }, 400);
    }
    if (typeof body.wixOrderId !== "string" || !body.wixOrderId) {
      return json({ error: "Missing wixOrderId" }, 400);
    }
    try {
      const result = await retrySpecificPendingOrder(body.wixOrderId);
      if ("error" in result) {
        return json({ error: "No pending or exhausted record found for that order." }, 404);
      }
      return json({ result });
    } catch (error) {
      console.error("mock-interview-admin-pending-credits: retry failed:", error);
      return json({ error: "Could not retry this order." }, 500);
    }
  }

  return json({ error: "Method not allowed" }, 405);
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
}

export const config: Config = {
  path: "/api/mock-interview-admin-pending-credits",
};
