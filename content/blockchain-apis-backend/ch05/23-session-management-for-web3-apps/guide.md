# Lesson 23 — Session Management for Web3 Apps

**Chapter 5 · Wallets & Sessions on the Backend · Lesson 23 of 24**

## What you'll learn

- Why a verified signature alone doesn't keep a user logged in
- The two real session strategies — server-side session vs. JWT — and the actual tradeoff
- Web3-specific session invalidation: what to do when a wallet disconnects or switches accounts
- Why session expiry matters even though wallet signatures don't expire on their own

## Verification is a moment, not a state

Lesson 22 ended on this exact gap: `verify()` succeeding proves the user
controlled that address *at the moment they signed*. It says nothing
about the next request, five minutes or five days later. HTTP is
stateless — without something tying subsequent requests back to that
proven identity, the user would have to sign a new SIWE message on every
single request, which defeats the entire point. A session is that
missing piece, and it's the same session-management problem any backend
has, SIWE just supplies a different way of establishing who's behind it.

## Two real strategies, and the actual tradeoff

**Server-side session (cookie + store):** after `verify()` succeeds, the
backend writes the verified address into a session store (Redis, a
database, or in-memory for small cases) and sets a cookie referencing
it. Every later request looks up the cookie's session ID in that store.

```javascript
req.session.siwe = data; // data.address, from Lesson 22's verify()
req.session.save();
```

This is what Lesson 22's example already used. Its advantage is real,
immediate revocation — delete the session from the store, and the user
is logged out on their very next request, no matter how many devices or
tabs are using it.

**JWT (signed, stateless token):** the backend issues a signed token
containing the address and an expiry, and the client sends it on every
request. Nothing is stored server-side.

```javascript
const token = jwt.sign(
  { address: data.address },
  process.env.JWT_SECRET,
  { expiresIn: "24h" }
);
```

This scales without a shared session store across multiple backend
instances, but it trades away real-time revocation — a JWT is valid
until it expires, full stop, unless you add a separate revocation list
back in, which erases most of the simplicity that made JWTs attractive
in the first place. There's no universally correct choice; a session
store is usually the better default unless you have a specific
multi-instance scaling reason to reach for JWTs.

## Web3-specific invalidation: disconnects and account switches

A traditional web session only has to worry about logout. A Web3 session
has two more triggers a frontend has to actually listen for and act on:

```
Wallet disconnects → frontend clears local wallet state
                   → calls backend to destroy the session

Wallet switches account → frontend detects the new address
                        → the OLD session must be invalidated
                        → user must SIWE-sign again as the new address
```

Skipping the second case is a real, exploitable bug: if a frontend just
silently starts using a new address for display while the backend
session still references the old, verified address, requests appear to
come from the new account's UI but are still authorized as the old
one — a session that's quietly authorizing the wrong wallet. Both
MetaMask and WalletConnect emit account-change events specifically so
frontends can react to this correctly instead of missing it.

## Why sessions still need expiry

A SIWE signature itself doesn't expire unless the message included an
`expirationTime` field — but the *session* built from it should expire
regardless, the same way any login session should. A long-lived,
never-expiring session is a long-lived target: if a session cookie or
JWT leaks, an expiry window is what bounds how long that leak stays
useful to whoever has it.

## Key terms

| Term | Meaning |
|---|---|
| Server-side session | A session store (cookie references a server-held record) — real-time revocable |
| JWT | A signed, stateless token — scales easily, but can't be revoked before it expires |
| Account-change event | The wallet-emitted signal a frontend must handle to invalidate a stale session |
| Session expiry | A time bound limiting how long a leaked session or token stays exploitable |

## Check yourself

You're ready for Lesson 24 when you can explain: if a user switches
accounts in their wallet but the frontend doesn't destroy the old
session, what specifically becomes possible that shouldn't be?
