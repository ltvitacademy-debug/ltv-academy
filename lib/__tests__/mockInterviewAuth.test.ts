// Phase C — access-control primitives (spec requirement 9). Pure unit tests
// for the building blocks every ownership check in this feature is built on.
import { describe, it, expect, afterEach } from "vitest";
import { generateAccessToken, isValidAccessToken, getSiteUrl } from "../mockInterviewAuth";

describe("generateAccessToken", () => {
  it("generates a long, high-entropy, unique token each time", () => {
    const a = generateAccessToken();
    const b = generateAccessToken();
    expect(a).not.toBe(b);
    expect(a.length).toBeGreaterThanOrEqual(32);
    expect(a).toMatch(/^[0-9a-f]+$/);
  });
});

describe("isValidAccessToken", () => {
  const actual = generateAccessToken();

  it("accepts the exact matching token", () => {
    expect(isValidAccessToken(actual, actual)).toBe(true);
  });

  it("rejects a wrong token", () => {
    expect(isValidAccessToken(generateAccessToken(), actual)).toBe(false);
  });

  it("rejects a missing/null/empty provided token", () => {
    expect(isValidAccessToken(null, actual)).toBe(false);
    expect(isValidAccessToken(undefined, actual)).toBe(false);
    expect(isValidAccessToken("", actual)).toBe(false);
  });

  it("rejects when the actual stored token is somehow empty (never silently 'valid')", () => {
    expect(isValidAccessToken("anything", "")).toBe(false);
  });

  it("is not fooled by a token that merely starts with the same prefix (length-sensitive comparison)", () => {
    expect(isValidAccessToken(actual.slice(0, -1), actual)).toBe(false);
  });
});

// Admin authorization is no longer a shared secret — see
// lib/__tests__/adminAuth.test.ts for the real (role-based, login-backed)
// mechanism that replaced it.

describe("getSiteUrl", () => {
  const ORIGINAL = process.env.MOCK_INTERVIEW_SITE_URL;
  afterEach(() => {
    process.env.MOCK_INTERVIEW_SITE_URL = ORIGINAL;
  });

  it("falls back to the known Netlify URL when unset", () => {
    delete process.env.MOCK_INTERVIEW_SITE_URL;
    expect(getSiteUrl()).toBe("https://ltv-it-academy.netlify.app");
  });

  it("strips a trailing slash from a configured override", () => {
    process.env.MOCK_INTERVIEW_SITE_URL = "https://www.ltvacademy.com/";
    expect(getSiteUrl()).toBe("https://www.ltvacademy.com");
  });
});
