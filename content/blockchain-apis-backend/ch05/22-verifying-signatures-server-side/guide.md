# Lesson 22 — Verifying Signatures Server-Side

**Chapter 5 · Wallets & Sessions on the Backend · Lesson 22 of 24**

## What you'll learn

- Why a signature alone, without re-checking the message, isn't enough
- The real, current `siwe` library `.verify()` API and what it returns
- The three specific things a correct server-side check has to confirm
- What goes wrong, concretely, if any one of those checks is skipped

## Verification is more than "does the signature match"

It's tempting to think server-side verification is just cryptography:
recover the address from the signature, compare it to the claimed
address, done. That's necessary but nowhere near sufficient. Lesson 21's
entire point was that the message's *fields* — domain, nonce, chain ID,
expiration — are what make SIWE safe, and none of that safety exists if
the server checks the signature but never checks whether those fields
are actually correct for this request.

## The real verify() API

The `siwe` library's `SiweMessage.verify()` does both halves at once —
signature recovery and field validation — against the parameters you
give it:

```javascript
import { SiweMessage } from "siwe";

app.post("/login", async (req, res) => {
  const { message, signature } = req.body;
  const siweMessage = new SiweMessage(message);

  const { success, data, error } = await siweMessage.verify({
    signature,
    nonce: req.session.nonce,
  });

  if (!success) {
    return res.status(401).json({ error: error.type });
  }

  req.session.siwe = data;
  res.json({ address: data.address });
});
```

`verify()` resolves to an object with `success` (boolean), `data` (the
parsed `SiweMessage`, available on success), and `error` (populated on
failure). Passing `nonce: req.session.nonce` is what connects this check
back to the nonce the backend itself issued before the user ever signed
anything — without it, `verify()` would only be confirming the signature
is valid, not that it's valid *for this specific login attempt*.

## The three things a correct check actually confirms

1. **The signature recovers to the claimed address.** Standard
   cryptographic verification — this part is what most people assume
   "verification" means in full, and it's only a third of it.
2. **The nonce matches what the server issued for this session.** This
   is the replay check from Lesson 21 — skip it, and a signature
   captured once (through a compromised frontend, a malicious proxy, or
   simple logging) can be replayed to log in again later.
3. **The domain in the message matches this server.** Skip this, and a
   phishing site that got a user to sign *its own* SIWE message could
   take that signed message and submit it to the real site's backend,
   since the signature itself would still be cryptographically valid.

Each of these is a distinct failure mode with a distinct fix — "the
signature is valid" alone covers none of the other two.

## What happens if you skip the nonce check

This is worth making concrete: imagine a backend that verifies the
signature and the domain, but never checks the nonce against anything
server-issued — it just accepts whatever nonce shows up in the message.
A signed message a user produced once could then be replayed by anyone
who ever saw it (in a log file, a browser history, a compromised
analytics script) to log in as that user indefinitely, since nothing
ever expires or gets consumed. The nonce isn't a formality; it's the
entire mechanism that turns a signature into a one-time credential
instead of a permanent one.

## Key terms

| Term | Meaning |
|---|---|
| `SiweMessage.verify()` | The real siwe library method checking both signature validity and message fields |
| `success` / `data` / `error` | The three-part shape verify() resolves to |
| Nonce check | Confirming the message's nonce matches what the server itself issued |
| Domain check | Confirming the message's domain matches this server, preventing cross-site replay |

## Check yourself

You're ready for Lesson 23 when you can explain: after `verify()`
succeeds, what has actually been proven about the user — and what
*hasn't* been proven yet, that a session still needs to handle?
