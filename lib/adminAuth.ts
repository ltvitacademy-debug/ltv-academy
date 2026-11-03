// Phase D follow-up — real authenticated, role-based administrator access
// (replaces MOCK_INTERVIEW_ADMIN_SECRET, which any holder of the one secret
// could use indistinguishably from Bill himself, with no login, no
// password, no way to revoke just one compromised credential). An Admin
// row (email + scrypt-hashed password + role) is seeded locally via
// scripts/create-admin.js — never through an HTTP endpoint, so there is no
// "create the first admin" network attack surface at all.
import crypto from "crypto";

const SESSION_TTL_MS = 12 * 60 * 60 * 1000; // an admin reviewing a queue needs longer than a 6h member session, not indefinite

export type AdminIdentity = { adminId: string; email: string; role: string };

// scrypt is deliberately slow/memory-hard — that slowness itself is a real
// brute-force throttle, which matters more here than it would for a
// high-traffic login (this is a single-admin site; a fast, cheap hash
// would make offline guessing against a leaked DB far more practical).
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hashHex] = stored.split(":");
  if (!salt || !hashHex) return false;
  const candidate = crypto.scryptSync(password, salt, 64);
  const actual = Buffer.from(hashHex, "hex");
  if (candidate.length !== actual.length) return false;
  return crypto.timingSafeEqual(candidate, actual);
}

function timingSafeEqualStrings(a: string, b: string): boolean {
  const bufA = Buffer.from(a, "utf8");
  const bufB = Buffer.from(b, "utf8");
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

function hmacHex(data: string, secret: string): string {
  return crypto.createHmac("sha256", secret).update(data).digest("hex");
}

// Session-token secret: deliberately a SEPARATE env var from
// WIX_MEMBER_TOKEN_SECRET — an admin session and a student identity must
// never be verifiable with the same key, so a leak of one secret can never
// be used to forge the other.
function getAdminSessionSecret(): string | null {
  return process.env.ADMIN_SESSION_SECRET || null;
}

export function signAdminSessionToken(admin: AdminIdentity): string | null {
  const secret = getAdminSessionSecret();
  if (!secret) return null;
  const payload = JSON.stringify({ ...admin, iat: Date.now() });
  const payloadB64 = Buffer.from(payload, "utf8").toString("base64url");
  return `${payloadB64}.${hmacHex(payloadB64, secret)}`;
}

export function verifyAdminSessionToken(token: string | null | undefined): AdminIdentity | null {
  if (!token) return null;
  const secret = getAdminSessionSecret();
  if (!secret) return null;

  const dot = token.indexOf(".");
  if (dot < 1) return null;
  const payloadB64 = token.slice(0, dot);
  const sigHex = token.slice(dot + 1);
  if (!/^[0-9a-f]{64}$/i.test(sigHex)) return null;
  if (!timingSafeEqualStrings(hmacHex(payloadB64, secret), sigHex.toLowerCase())) return null;

  let payload: { adminId?: unknown; email?: unknown; role?: unknown; iat?: unknown };
  try {
    payload = JSON.parse(Buffer.from(payloadB64, "base64url").toString("utf8"));
  } catch {
    return null;
  }
  if (typeof payload.adminId !== "string" || !payload.adminId) return null;
  if (typeof payload.email !== "string" || !payload.email) return null;
  if (typeof payload.role !== "string" || !payload.role) return null;
  if (typeof payload.iat !== "number") return null;

  const age = Date.now() - payload.iat;
  if (!Number.isFinite(age) || age < 0 || age > SESSION_TTL_MS) return null;

  return { adminId: payload.adminId, email: payload.email, role: payload.role };
}

// The ONE role that may use the review queue today. A second role (e.g.
// "reviewer", read-only) could check against a different set here without
// touching anything else — this is the actual "role-based" decision point,
// kept in one place rather than inlined at every call site.
export function hasAdminReviewAccess(identity: AdminIdentity | null): boolean {
  return identity?.role === "admin";
}

export function extractAdminSessionToken(req: Request): string | null {
  const auth = req.headers.get("authorization");
  if (auth?.startsWith("Bearer ")) return auth.slice("Bearer ".length).trim();
  return null;
}
