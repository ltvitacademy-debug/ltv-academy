// Phase D — receives Wix's Pricing Plans "Order Purchased" webhook for the
// $19.97 Professional Mock Interview purchase and grants exactly one
// InterviewCredit per verified order.
//
// POST /api/wix-interview-purchase-webhook
//   body: the raw JWT string Wix sends (the whole request body IS the JWT —
//   see lib/wixWebhookVerification.ts)
//   -> 200 { creditId, alreadyExisted } on success (always 200 once
//      verified, even for a duplicate delivery — Wix should not retry a
//      "duplicate, already handled" outcome as if it were a failure)
//   -> 401 if the signature doesn't verify
//   -> 400 if the payload doesn't parse into the fields we need
//
// This endpoint's URL is what you register in Wix Dev Center as the
// webhook target for Pricing Plans "Order Purchased" — see the Phase D
// report for the exact Wix-side configuration steps (creating the Plan,
// registering the webhook, retrieving the public key).
import type { Config } from "@netlify/functions";
import { verifyWixWebhookJWT, getWixWebhookPublicKey } from "../../lib/wixWebhookVerification";
import { parseWixOrderPurchasedEvent } from "../../lib/interviewCreditGrant";
import { processOrderPurchaseWithRecovery } from "../../lib/pendingCreditVerification";

export default async (req: Request) => {
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const publicKey = getWixWebhookPublicKey();
  if (!publicKey) {
    console.error("wix-interview-purchase-webhook: WIX_WEBHOOK_PUBLIC_KEY is not configured — refusing all events.");
    return json({ error: "Webhook not configured." }, 503);
  }

  const token = (await req.text()).trim();
  if (!token) return json({ error: "Empty request body." }, 400);

  const payload = verifyWixWebhookJWT(token, publicKey);
  if (!payload) {
    return json({ error: "Signature verification failed." }, 401);
  }

  const event = parseWixOrderPurchasedEvent(payload);
  if (!event) {
    console.error("wix-interview-purchase-webhook: verified payload didn't match the expected order shape:", JSON.stringify(payload).slice(0, 2000));
    return json({ error: "Unrecognized payload shape." }, 400);
  }

  try {
    const result = await processOrderPurchaseWithRecovery(event);
    if (!result.granted) {
      if (result.reason === "verification-unavailable") {
        // 502, deliberately — this is the ONE outcome Wix should actually
        // retry. Confirmed (Wix "About Webhooks" docs, 4 Oct 2026): a
        // non-200 response gets up to 12 automatic redeliveries over ~2
        // days, which is a real, substantial recovery window on top of our
        // own durable PendingCreditVerification record (recorded already,
        // above, inside processOrderPurchaseWithRecovery) and the scheduled
        // retry function. "not paid" and "wrong plan" are both legitimate,
        // terminal outcomes (a pending offline order, or the $297/mo
        // subscription's own purchase event) and stay 200 — Wix must never
        // retry those.
        return json({ granted: false, reason: result.reason }, 502);
      }
      return json({ granted: false, reason: result.reason }, 200);
    }
    return json({ granted: true, creditId: result.creditId, alreadyExisted: result.alreadyExisted }, 200);
  } catch (error) {
    console.error("wix-interview-purchase-webhook: credit grant failed:", error);
    return json({ error: "Could not process this order." }, 500);
  }
};

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
}

export const config: Config = {
  path: "/api/wix-interview-purchase-webhook",
};
