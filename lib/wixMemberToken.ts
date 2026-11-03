// Phase D, priority 1 — secure Wix member authentication for the Professional
// Mock Interview feature. Carries a REAL member identity (memberId + email),
// unlike the existing netlify/edge-functions/member-gate.ts token, which only
// proves "someone logged in is viewing /app/*" with no identity payload.
//
// This is a token WE mint and WE verify (both sides controlled by LTV
// Academy), so the existing lightweight HMAC-signed-timestamp pattern from
// member-gate.ts is extended with a payload rather than switched to
// something heavier — there's no third party to interoperate with here. The
// Velo backend code that mints it is listed in the Phase D report; it must
// call currentMember.getMember() SERVER-SIDE (never trust a client-supplied
// member id) to get the real, logged-in member's id and email, then sign
// { memberId, email, iat } with WIX_MEMBER_TOKEN_SECRET (a secret ONLY Wix's
// backend and this app know — never the browser).
//
// Contrast with lib/wixWebhookVerification.ts: THAT verifies a token Wix
// itself signs with WIX's RSA key for the payment webhook — a different
// trust relationship (third party -> us), which is why it needs RS256/JWT
// rather than this shared-secret HMAC scheme.
import crypto from "crypto";

const TOKEN_TTL_MS = 6 * 60 * 60 * 1000; // matches member-gate.ts's existing convention

export type WixMemberIdentity = { memberId: string; email: string };

function timingSafeEqualStrings(a: string, b: string): boolean {
  const bufA = Buffer.from(a, "utf8");
  const bufB = Buffer.from(b, "utf8");
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

function hmacHex(data: string, secret: string): string {
  return crypto.createHmac("sha256", secret).update(data).digest("hex");
}

// For the Velo side: given a real member id + email (from
// currentMember.getMember() — never from client input), produce the signed
// token string to hand to the embedded app. Exported so a Node-based test
// (or a future admin tool) can mint tokens identically to how Velo must;
// Velo itself runs its own HMAC-SHA256 over the same payloadB64, since Velo
// code can't import this file — see the Phase D report for the equivalent
// Velo snippet.
export function signWixMemberToken(identity: WixMemberIdentity, secret: string): string {
  const payload = JSON.stringify({ memberId: identity.memberId, email: identity.email, iat: Date.now() });
  const payloadB64 = Buffer.from(payload, "utf8").toString("base64url");
  return `${payloadB64}.${hmacHex(payloadB64, secret)}`;
}

export function verifyWixMemberToken(token: string | null | undefined): WixMemberIdentity | null {
  if (!token) return null;
  const secret = process.env.WIX_MEMBER_TOKEN_SECRET;
  if (!secret) return null;

  const dot = token.indexOf(".");
  if (dot < 1) return null;
  const payloadB64 = token.slice(0, dot);
  const sigHex = token.slice(dot + 1);
  if (!/^[0-9a-f]{64}$/i.test(sigHex)) return null;

  const expected = hmacHex(payloadB64, secret);
  if (!timingSafeEqualStrings(expected, sigHex.toLowerCase())) return null;

  let payload: { memberId?: unknown; email?: unknown; iat?: unknown };
  try {
    payload = JSON.parse(Buffer.from(payloadB64, "base64url").toString("utf8"));
  } catch {
    return null;
  }
  if (typeof payload.memberId !== "string" || !payload.memberId) return null;
  if (typeof payload.email !== "string" || !payload.email) return null;
  if (typeof payload.iat !== "number") return null;

  const age = Date.now() - payload.iat;
  if (!Number.isFinite(age) || age < 0 || age > TOKEN_TTL_MS) return null;

  return { memberId: payload.memberId, email: payload.email };
}

// Student.wixMemberId format for a REAL Wix-authenticated student — parallel
// to the existing "dev:<email>" format used by the Phase A/B devStudentEmail
// path, which stays as a local/testing-only fallback (see
// lib/mockInterviewAuth.ts's resolveStudentIdentity).
export function wixStudentKey(memberId: string): string {
  return `wix:${memberId}`;
}
