// Phase D follow-up — authenticated, role-based administrator access
// (replaces the shared-secret-only gate). Pure unit tests.
import { describe, it, expect, afterEach } from "vitest";
import crypto from "crypto";
import { hashPassword, verifyPassword, signAdminSessionToken, verifyAdminSessionToken, hasAdminReviewAccess } from "../adminAuth";
import { hashPasswordForScript } from "../../scripts/admin-password-hash.js";

describe("hashPassword / verifyPassword", () => {
  it("round-trips a correct password", () => {
    const stored = hashPassword("a reasonably strong password");
    expect(verifyPassword("a reasonably strong password", stored)).toBe(true);
  });

  it("rejects a wrong password", () => {
    const stored = hashPassword("correct password");
    expect(verifyPassword("wrong password", stored)).toBe(false);
  });

  it("never reuses the same salt twice, so identical passwords hash differently", () => {
    const a = hashPassword("same password");
    const b = hashPassword("same password");
    expect(a).not.toBe(b);
    expect(verifyPassword("same password", a)).toBe(true);
    expect(verifyPassword("same password", b)).toBe(true);
  });

  it("rejects a malformed stored hash without throwing", () => {
    expect(verifyPassword("anything", "not-a-real-hash")).toBe(false);
    expect(verifyPassword("anything", "")).toBe(false);
  });

  it("scripts/create-admin.js's CLI hasher produces a hash verifyPassword accepts (the two can never silently diverge)", () => {
    const stored = hashPasswordForScript("a password set from the CLI");
    expect(verifyPassword("a password set from the CLI", stored)).toBe(true);
    expect(verifyPassword("wrong", stored)).toBe(false);
  });
});

describe("signAdminSessionToken / verifyAdminSessionToken", () => {
  const ORIGINAL = process.env.ADMIN_SESSION_SECRET;
  afterEach(() => {
    process.env.ADMIN_SESSION_SECRET = ORIGINAL;
  });

  it("round-trips a real admin identity", () => {
    process.env.ADMIN_SESSION_SECRET = "test-admin-session-secret";
    const token = signAdminSessionToken({ adminId: "admin-1", email: "bill@ltvacademy.com", role: "admin" });
    expect(token).not.toBeNull();
    expect(verifyAdminSessionToken(token)).toEqual({ adminId: "admin-1", email: "bill@ltvacademy.com", role: "admin" });
  });

  it("refuses to sign (returns null) when no secret is configured — never issues an unverifiable session", () => {
    delete process.env.ADMIN_SESSION_SECRET;
    expect(signAdminSessionToken({ adminId: "admin-1", email: "bill@ltvacademy.com", role: "admin" })).toBeNull();
  });

  it("rejects a token verified against a different secret than it was signed with", () => {
    process.env.ADMIN_SESSION_SECRET = "secret-a";
    const token = signAdminSessionToken({ adminId: "admin-1", email: "bill@ltvacademy.com", role: "admin" })!;
    process.env.ADMIN_SESSION_SECRET = "secret-b";
    expect(verifyAdminSessionToken(token)).toBeNull();
  });

  it("rejects a tampered role (e.g. escalating from a lesser role to 'admin')", () => {
    process.env.ADMIN_SESSION_SECRET = "test-admin-session-secret";
    const token = signAdminSessionToken({ adminId: "admin-1", email: "bill@ltvacademy.com", role: "reviewer" })!;
    const [payloadB64, sig] = token.split(".");
    const tamperedPayload = Buffer.from(JSON.stringify({ adminId: "admin-1", email: "bill@ltvacademy.com", role: "admin", iat: Date.now() })).toString(
      "base64url"
    );
    expect(verifyAdminSessionToken(`${tamperedPayload}.${sig}`)).toBeNull();
    expect(verifyAdminSessionToken(`${payloadB64}.${sig}`)).not.toBeNull(); // sanity: the real one still works
  });

  it("rejects an expired session (past the 12h TTL)", () => {
    process.env.ADMIN_SESSION_SECRET = "test-admin-session-secret";
    const thirteenHoursAgo = Date.now() - 13 * 60 * 60 * 1000;
    const payload = JSON.stringify({ adminId: "admin-1", email: "bill@ltvacademy.com", role: "admin", iat: thirteenHoursAgo });
    const payloadB64 = Buffer.from(payload, "utf8").toString("base64url");
    const sig = crypto.createHmac("sha256", "test-admin-session-secret").update(payloadB64).digest("hex");
    expect(verifyAdminSessionToken(`${payloadB64}.${sig}`)).toBeNull();
  });

  it("rejects malformed tokens without throwing", () => {
    process.env.ADMIN_SESSION_SECRET = "test-admin-session-secret";
    expect(verifyAdminSessionToken(null)).toBeNull();
    expect(verifyAdminSessionToken("")).toBeNull();
    expect(verifyAdminSessionToken("not-a-token")).toBeNull();
  });
});

describe("hasAdminReviewAccess — role check", () => {
  it("grants access only to role 'admin'", () => {
    expect(hasAdminReviewAccess({ adminId: "1", email: "a@b.com", role: "admin" })).toBe(true);
    expect(hasAdminReviewAccess({ adminId: "1", email: "a@b.com", role: "reviewer" })).toBe(false);
    expect(hasAdminReviewAccess(null)).toBe(false);
  });
});
