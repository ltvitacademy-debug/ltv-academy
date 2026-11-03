// Shared access-control helpers for every Netlify Function that can read a
// student's interview data (spec Phase C requirement 9, extended in Phase D).
//
// Two independent credentials now exist:
//   - The per-session accessToken (Phase C): a random, unguessable secret
//     minted at session creation and handed to the creating client exactly
//     once. Works everywhere, including local dev with no Wix login at all.
//   - The signed Wix member-identity token (Phase D, lib/wixMemberToken.ts):
//     a REAL, cryptographically-verified identity from an actual logged-in
//     Wix member, extracted here and checked against who actually owns a
//     session/row in authorizeSessionAccess() below. This is what makes
//     "never authorize using an email address alone" true in production —
//     devStudentEmail remains ONLY as a local-dev fallback (see
//     netlify/functions/mock-interview-history.ts, which hard-disables it
//     outside development).
import crypto from "crypto";
import { prisma } from "./db";
import { verifyWixMemberToken, wixStudentKey, type WixMemberIdentity } from "./wixMemberToken";

export function generateAccessToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

function timingSafeEqualStrings(a: string, b: string): boolean {
  const bufA = Buffer.from(a, "utf8");
  const bufB = Buffer.from(b, "utf8");
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

// Deliberately takes the ACTUAL stored token so a caller can never pass
// `undefined === undefined`-style accidents — the real value must exist.
export function isValidAccessToken(provided: string | null | undefined, actual: string): boolean {
  if (!provided || !actual) return false;
  return timingSafeEqualStrings(provided, actual);
}

const WIX_MEMBER_COOKIE = "ltv_wm";

// Reads the signed Wix member-identity token (lib/wixMemberToken.ts) from
// either a header (same-origin fetch calls from the app itself) or the
// cookie MemberTokenBridge.tsx sets, mirroring how member-gate.ts already
// reads its own simpler token.
export function extractWixMemberToken(req: Request): string | null {
  const header = req.headers.get("x-wix-member-token");
  if (header) return header;
  const cookieHeader = req.headers.get("cookie") ?? "";
  for (const part of cookieHeader.split(";")) {
    const eq = part.indexOf("=");
    if (eq < 0) continue;
    if (part.slice(0, eq).trim() === WIX_MEMBER_COOKIE) return decodeURIComponent(part.slice(eq + 1).trim());
  }
  return null;
}

export function resolveWixIdentity(req: Request): WixMemberIdentity | null {
  return verifyWixMemberToken(extractWixMemberToken(req));
}

// The ONE place a session-scoped endpoint (session/turn/report/certificate)
// decides whether this caller may act on THIS session. Two independent
// paths, either is sufficient:
//   1. The per-session accessToken (works regardless of login state —
//      dev-mode, or a real student who still has it in localStorage).
//   2. A verified Wix member identity whose student record actually owns
//      this session (spec requirement 6: lets a real, logged-in student
//      resume an interrupted session securely even without the token —
//      e.g. a different device, or cleared storage — WITHOUT ever trusting
//      a bare email, since the identity here is cryptographically verified,
//      not client-asserted).
export async function authorizeSessionAccess(args: {
  req: Request;
  providedAccessToken: string | null | undefined;
  session: { accessToken: string; studentId: string };
}): Promise<boolean> {
  if (isValidAccessToken(args.providedAccessToken, args.session.accessToken)) return true;
  const identity = resolveWixIdentity(args.req);
  if (!identity) return false;
  const student = await prisma.student.findUnique({ where: { id: args.session.studentId } });
  return !!student && student.wixMemberId === wixStudentKey(identity.memberId);
}

// Absolute site origin for anything that has to work OFF the site — a
// certificate's QR code / printed verification URL is read by a phone
// camera or typed from paper, not clicked from within the app. See
// CLAUDE.md's Netlify site URL for the fallback.
// Checked at call time, never cached into a module-level constant — Netlify
// Functions are effectively stateless per invocation anyway, but caching
// this once at import time is also what made it impossible for a test to
// exercise the production-only lockouts (mintDevCredit, devStudentEmail,
// minting a credit from nothing) without reimporting the module. Call this,
// don't memoize it.
export function isProductionEnvironment(): boolean {
  return process.env.NODE_ENV === "production";
}

export function getSiteUrl(): string {
  return (process.env.MOCK_INTERVIEW_SITE_URL || "https://ltv-it-academy.netlify.app").replace(/\/$/, "");
}
