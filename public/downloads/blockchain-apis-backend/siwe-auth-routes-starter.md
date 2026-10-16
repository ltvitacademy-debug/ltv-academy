# Sign-In With Ethereum Auth Routes Starter

A complete, runnable Express route set for the full Chapter 5 flow — nonce
issuance, SIWE message verification, server-side session creation, and
logout — wired together the way Lessons 21 through 23 described them
individually.

## Setup

```js
// app.js
import express from "express";
import session from "express-session";
import crypto from "node:crypto";
import { SiweMessage } from "siwe";

const app = express();
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true, secure: process.env.NODE_ENV === "production", maxAge: 24 * 60 * 60 * 1000 },
  })
);
```

## 1. Issue a nonce (Lesson 21)

```js
app.get("/auth/nonce", (req, res) => {
  const nonce = crypto.randomBytes(16).toString("hex");
  req.session.nonce = nonce;
  res.json({ nonce });
});
```

The nonce lives in the session *before* the user ever signs anything —
this is what Lesson 22's `verify()` call checks against later, and it's
the entire replay-prevention mechanism.

## 2. Verify the signed SIWE message and start a session (Lesson 22 + 23)

```js
app.post("/auth/login", async (req, res) => {
  try {
    const { message, signature } = req.body;
    const siweMessage = new SiweMessage(message);

    const { success, data, error } = await siweMessage.verify({
      signature,
      nonce: req.session.nonce,
      domain: process.env.APP_DOMAIN, // confirms the message was meant for THIS server
    });

    if (!success) {
      return res.status(401).json({ error: error?.type ?? "verification_failed" });
    }

    // Verified — write the proven address into the session (Lesson 23's
    // server-side-session strategy, chosen for real-time revocability).
    req.session.siwe = { address: data.address, chainId: data.chainId };
    delete req.session.nonce; // one-time use — never let it be replayed

    res.json({ address: data.address });
  } catch (err) {
    res.status(401).json({ error: "verification_failed" });
  }
});
```

## 3. A protected route, reading the session

```js
function requireAuth(req, res, next) {
  if (!req.session.siwe) return res.status(401).json({ error: "not_authenticated" });
  next();
}

app.get("/auth/me", requireAuth, (req, res) => {
  res.json({ address: req.session.siwe.address });
});
```

## 4. Logout and wallet-switch invalidation (Lesson 23)

```js
app.post("/auth/logout", (req, res) => {
  req.session.destroy(() => res.json({ ok: true }));
});
```

The frontend is responsible for calling this exact endpoint on two
triggers, not just a logout button click: the wallet's `disconnect` event,
and its `accountsChanged` event (MetaMask/WalletConnect both emit it). On
`accountsChanged`, call `/auth/logout` first and require a fresh
`/auth/nonce` → sign → `/auth/login` cycle for the new address — never
let the frontend just start displaying a new address against an old
session, which is the exact "session that authorizes the wrong wallet"
risk Lesson 23 flags.

```js
// frontend sketch — not part of this backend file
window.ethereum.on("accountsChanged", async () => {
  await fetch("/auth/logout", { method: "POST" });
  // re-run the nonce -> sign -> /auth/login flow for the new address
});
```

## Where to take this next

- Swap the built-in `express-session` memory store for Redis or a database
  table before this goes anywhere near production — the in-memory default
  doesn't survive a server restart or scale past one instance.
- Add the `expirationTime` field to the `SiweMessage` you build on the
  frontend if you want the signed message itself, not just the session
  cookie, to carry a hard expiry.
- The Worked Example Library's *Complete Sign-In With Ethereum Flow*
  walks through wiring this exact file set into a small frontend, end to
  end, including the wallet-switch scenario above.
