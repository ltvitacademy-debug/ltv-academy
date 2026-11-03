// Phase D, priority 2 — RS256 JWT verification for Wix's own payment
// webhook signature. Generates a real RSA keypair at test time (standing in
// for Wix's actual key pair) so this exercises genuine RSA-SHA256
// signing/verification, not a mocked crypto call.
import { describe, it, expect, afterEach, beforeAll } from "vitest";
import crypto from "crypto";
import { verifyWixWebhookJWT, getWixWebhookPublicKey } from "../wixWebhookVerification";

let publicKeyPem: string;
let privateKeyPem: string;

function makeJWT(payload: Record<string, unknown>, privateKey: string, alg = "RS256"): string {
  const header = Buffer.from(JSON.stringify({ alg, typ: "JWT" }), "utf8").toString("base64url");
  const body = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  const signingInput = `${header}.${body}`;
  const signer = crypto.createSign("RSA-SHA256");
  signer.update(signingInput);
  signer.end();
  const signature = signer.sign(privateKey).toString("base64url");
  return `${signingInput}.${signature}`;
}

beforeAll(() => {
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: { type: "spki", format: "pem" },
    privateKeyEncoding: { type: "pkcs8", format: "pem" },
  });
  publicKeyPem = publicKey;
  privateKeyPem = privateKey;
});

describe("verifyWixWebhookJWT", () => {
  it("verifies a genuinely RS256-signed token and returns its decoded payload", () => {
    const token = makeJWT({ data: { order: { id: "order-1" } } }, privateKeyPem);
    const payload = verifyWixWebhookJWT(token, publicKeyPem);
    expect(payload).toEqual({ data: { order: { id: "order-1" } } });
  });

  it("rejects a token signed with a DIFFERENT private key than our stored public key", () => {
    const { privateKey: otherPrivateKey } = crypto.generateKeyPairSync("rsa", {
      modulusLength: 2048,
      publicKeyEncoding: { type: "spki", format: "pem" },
      privateKeyEncoding: { type: "pkcs8", format: "pem" },
    });
    const token = makeJWT({ data: { order: { id: "order-1" } } }, otherPrivateKey);
    expect(verifyWixWebhookJWT(token, publicKeyPem)).toBeNull();
  });

  it("rejects a payload tampered with after signing", () => {
    const token = makeJWT({ data: { order: { id: "order-1" } } }, privateKeyPem);
    const [header, , signature] = token.split(".");
    const tamperedBody = Buffer.from(JSON.stringify({ data: { order: { id: "order-999-free-credit" } } }), "utf8").toString("base64url");
    expect(verifyWixWebhookJWT(`${header}.${tamperedBody}.${signature}`, publicKeyPem)).toBeNull();
  });

  it("rejects a non-RS256 algorithm even if otherwise well-formed", () => {
    const header = Buffer.from(JSON.stringify({ alg: "none", typ: "JWT" }), "utf8").toString("base64url");
    const body = Buffer.from(JSON.stringify({ data: {} }), "utf8").toString("base64url");
    expect(verifyWixWebhookJWT(`${header}.${body}.`, publicKeyPem)).toBeNull();
  });

  it("rejects malformed tokens without throwing", () => {
    expect(verifyWixWebhookJWT("not.a.jwt", publicKeyPem)).toBeNull();
    expect(verifyWixWebhookJWT("", publicKeyPem)).toBeNull();
    expect(verifyWixWebhookJWT("only.two", publicKeyPem)).toBeNull();
  });

  it("rejects when verified against a garbage/invalid PEM key rather than throwing", () => {
    const token = makeJWT({ data: {} }, privateKeyPem);
    expect(verifyWixWebhookJWT(token, "not a real pem key")).toBeNull();
  });
});

describe("getWixWebhookPublicKey", () => {
  const ORIGINAL = process.env.WIX_WEBHOOK_PUBLIC_KEY;
  afterEach(() => {
    process.env.WIX_WEBHOOK_PUBLIC_KEY = ORIGINAL;
  });

  it("returns null when unconfigured", () => {
    delete process.env.WIX_WEBHOOK_PUBLIC_KEY;
    expect(getWixWebhookPublicKey()).toBeNull();
  });

  it("unescapes literal \\n sequences (how a key usually has to be pasted into a UI env var field)", () => {
    process.env.WIX_WEBHOOK_PUBLIC_KEY = "-----BEGIN PUBLIC KEY-----\\nABC\\n-----END PUBLIC KEY-----";
    expect(getWixWebhookPublicKey()).toBe("-----BEGIN PUBLIC KEY-----\nABC\n-----END PUBLIC KEY-----");
  });

  it("passes through a key that already has real newlines unchanged", () => {
    process.env.WIX_WEBHOOK_PUBLIC_KEY = publicKeyPem;
    expect(getWixWebhookPublicKey()).toBe(publicKeyPem);
  });
});
