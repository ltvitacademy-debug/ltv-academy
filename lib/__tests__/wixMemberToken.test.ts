// Phase D, priority 1 — the signed Wix member-IDENTITY token. Pure unit
// tests: sign with the test secret, verify, confirm tampering/expiry/wrong
// secret all fail closed.
import { describe, it, expect, afterEach } from "vitest";
import crypto from "crypto";
import { signWixMemberToken, verifyWixMemberToken, wixStudentKey } from "../wixMemberToken";

describe("signWixMemberToken / verifyWixMemberToken", () => {
  const ORIGINAL = process.env.WIX_MEMBER_TOKEN_SECRET;
  afterEach(() => {
    process.env.WIX_MEMBER_TOKEN_SECRET = ORIGINAL;
  });

  it("round-trips a real identity", () => {
    process.env.WIX_MEMBER_TOKEN_SECRET = "test-secret-value";
    const token = signWixMemberToken({ memberId: "abc-123", email: "student@example.com" }, "test-secret-value");
    const identity = verifyWixMemberToken(token);
    expect(identity).toEqual({ memberId: "abc-123", email: "student@example.com" });
  });

  it("rejects a token signed with a DIFFERENT secret than the server is configured with", () => {
    process.env.WIX_MEMBER_TOKEN_SECRET = "server-secret";
    const token = signWixMemberToken({ memberId: "abc-123", email: "student@example.com" }, "attacker-guessed-secret");
    expect(verifyWixMemberToken(token)).toBeNull();
  });

  it("rejects a tampered payload even if the signature format still looks valid", () => {
    process.env.WIX_MEMBER_TOKEN_SECRET = "test-secret-value";
    const token = signWixMemberToken({ memberId: "victim-id", email: "victim@example.com" }, "test-secret-value");
    const [payloadB64, sig] = token.split(".");
    const tamperedPayload = Buffer.from(JSON.stringify({ memberId: "attacker-id", email: "attacker@example.com", iat: Date.now() })).toString(
      "base64url"
    );
    expect(verifyWixMemberToken(`${tamperedPayload}.${sig}`)).toBeNull();
    expect(verifyWixMemberToken(`${payloadB64}.${sig}`)).not.toBeNull(); // sanity: the original is still valid
  });

  it("rejects an expired token", () => {
    process.env.WIX_MEMBER_TOKEN_SECRET = "test-secret-value";
    const sevenHoursAgo = Date.now() - 7 * 60 * 60 * 1000;
    const payload = JSON.stringify({ memberId: "abc-123", email: "student@example.com", iat: sevenHoursAgo });
    const payloadB64 = Buffer.from(payload, "utf8").toString("base64url");
    const sig = crypto.createHmac("sha256", "test-secret-value").update(payloadB64).digest("hex");
    expect(verifyWixMemberToken(`${payloadB64}.${sig}`)).toBeNull();
  });

  it("rejects when the server has no secret configured at all", () => {
    delete process.env.WIX_MEMBER_TOKEN_SECRET;
    const token = signWixMemberToken({ memberId: "abc-123", email: "student@example.com" }, "whatever");
    expect(verifyWixMemberToken(token)).toBeNull();
  });

  it("rejects malformed tokens without throwing", () => {
    process.env.WIX_MEMBER_TOKEN_SECRET = "test-secret-value";
    expect(verifyWixMemberToken(null)).toBeNull();
    expect(verifyWixMemberToken("")).toBeNull();
    expect(verifyWixMemberToken("not-a-real-token")).toBeNull();
    expect(verifyWixMemberToken("missingdot")).toBeNull();
  });
});

describe("wixStudentKey", () => {
  it("namespaces a Wix member id distinctly from the dev-mode email key", () => {
    expect(wixStudentKey("abc-123")).toBe("wix:abc-123");
    expect(wixStudentKey("abc-123")).not.toBe("dev:abc-123");
  });
});
