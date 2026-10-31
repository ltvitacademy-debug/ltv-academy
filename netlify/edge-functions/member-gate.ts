// Gates every page under /app/* (the member portal — dashboards, course
// pages, lessons, flashcards, tests, etc). There is no server-rendered Next.js
// here (next.config.ts sets output: "export"), so this is the only layer that
// can stop someone who has a bare lesson URL from loading it directly —
// without this, the static HTML is served to anyone, logged in or not.
//
// The real membership check happens on the Wix side (wixUsers.currentUser.loggedIn,
// verified server-side in Velo backend code): Wix mints a short-lived signed
// token and appends it to the embedded iframe's src as ?k=. This function just
// verifies that token was signed with the shared secret and hasn't expired —
// it never talks to Wix directly.
//
// Companion piece: the Wix Velo backend code that mints tokens with the same
// secret (kept in Wix Secrets Manager, mirrored here as LESSON_GATE_SECRET).

const TOKEN_TTL_MS = 6 * 60 * 60 * 1000; // 6 hours — comfortably covers a study session; Wix refreshes the token periodically while the page is open

export default async (request: Request) => {
  const url = new URL(request.url);
  const token = url.searchParams.get("k") ?? "";
  const secret = Deno.env.get("LESSON_GATE_SECRET");

  if (secret && (await isValidToken(token, secret))) {
    return; // let the real static page through
  }

  return lockedResponse();
};

async function isValidToken(token: string, secret: string): Promise<boolean> {
  const dot = token.indexOf(".");
  if (dot < 1) return false;
  const tsStr = token.slice(0, dot);
  const sigHex = token.slice(dot + 1);
  if (!/^[0-9]+$/.test(tsStr) || !/^[0-9a-f]{64}$/i.test(sigHex)) return false;

  const ts = Number(tsStr);
  const age = Date.now() - ts;
  if (!Number.isFinite(age) || age < 0 || age > TOKEN_TTL_MS) return false;

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sigBuf = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(tsStr));
  const expectedHex = toHex(new Uint8Array(sigBuf));

  return timingSafeEqual(expectedHex, sigHex.toLowerCase());
}

function toHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function lockedResponse(): Response {
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Members only &middot; Lifting the Veil Academy</title>
<style>
  body { margin: 0; min-height: 100vh; display: flex; align-items: center; justify-content: center;
         background: #5e0f0f; color: #f4efe4; font-family: Georgia, 'Times New Roman', serif; padding: 24px; box-sizing: border-box; }
  .card { max-width: 420px; text-align: center; }
  h1 { font-weight: 400; font-size: 1.6rem; margin: 0 0 12px; }
  p { color: #f1dfb4; line-height: 1.5; margin: 0 0 24px; }
  a { display: inline-block; background: #c4952e; color: #1e1a16; text-decoration: none;
      font-weight: 600; padding: 12px 24px; border-radius: 2px; }
</style>
</head>
<body>
  <div class="card">
    <h1>This page is for logged-in members</h1>
    <p>Please go to ltvacademy.com and log in to your account to continue.</p>
    <a href="https://www.ltvacademy.com">Go to ltvacademy.com</a>
  </div>
</body>
</html>`;
  return new Response(html, {
    status: 401,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

export const config = { path: ["/app", "/app/*"] };
