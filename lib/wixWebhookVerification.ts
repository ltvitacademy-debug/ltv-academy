// Phase D, priority 2 — verifying that a payment webhook really came from
// Wix. Per Wix's own docs (dev.wix.com/docs/build-apps/build-your-app/
// authentication/verify-wix-requests), an app-webhook request body IS a
// JWT, signed RS256 with a key pair Wix controls — verify it against the
// PUBLIC half, retrieved once from Dev Center -> your app -> Webhooks ->
// "Get Public Key" (or "View ID & Keys") and stored as WIX_WEBHOOK_PUBLIC_KEY.
// This is deliberately NOT the shared-secret HMAC scheme in
// lib/wixMemberToken.ts: that's a token WE mint and WE verify (both ends
// ours); this is a token WIX mints and WE verify (an external party's
// signature), which is exactly what asymmetric signing is for — we only
// ever hold the public half, never anything that could let us FORGE a Wix
// webhook.
//
// No JWT library dependency: RS256 verification is a handful of lines with
// Node's own crypto module, and for something this security-sensitive,
// fewer moving parts (and full visibility into exactly what's checked) beat
// pulling in a dependency.
import crypto from "crypto";

export function getWixWebhookPublicKey(): string | null {
  const key = process.env.WIX_WEBHOOK_PUBLIC_KEY;
  if (!key) return null;
  // Netlify's env var UI often can't hold literal newlines in a pasted PEM
  // key — accept the common escaped-\n convention too.
  return key.includes("\\n") ? key.replace(/\\n/g, "\n") : key;
}

// Returns the decoded JWT payload if (and only if) the signature verifies
// against the given RS256 public key — null for anything malformed,
// wrong-algorithm, or signed by someone else. Deliberately does NOT check
// expiry/issued-at claims itself (Wix's webhook payloads don't document a
// standard exp claim the same way a login JWT would) — the caller's own
// idempotency-by-orderId check is what makes a replayed-but-genuine webhook
// harmless, not a freshness window here.
export function verifyWixWebhookJWT(token: string, publicKeyPem: string): Record<string, unknown> | null {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [headerB64, payloadB64, sigB64] = parts;

  let header: { alg?: unknown };
  try {
    header = JSON.parse(Buffer.from(headerB64, "base64url").toString("utf8"));
  } catch {
    return null;
  }
  if (header.alg !== "RS256") return null;

  let signature: Buffer;
  try {
    signature = Buffer.from(sigB64, "base64url");
  } catch {
    return null;
  }
  if (signature.length === 0) return null;

  const signingInput = `${headerB64}.${payloadB64}`;
  let valid: boolean;
  try {
    const verifier = crypto.createVerify("RSA-SHA256");
    verifier.update(signingInput);
    verifier.end();
    valid = verifier.verify(publicKeyPem, signature);
  } catch {
    return null; // a malformed PEM key or signature throws rather than returning false
  }
  if (!valid) return null;

  try {
    return JSON.parse(Buffer.from(payloadB64, "base64url").toString("utf8"));
  } catch {
    return null;
  }
}
