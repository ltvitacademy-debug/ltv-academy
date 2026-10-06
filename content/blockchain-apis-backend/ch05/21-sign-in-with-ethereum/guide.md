# Lesson 21 — Sign-In With Ethereum

**Chapter 5 · Wallets & Sessions on the Backend · Lesson 21 of 24**

## What you'll learn

- What problem Sign-In with Ethereum (SIWE) actually solves
- The real EIP-4361 message format, verbatim
- Why the message itself, not just the signature, has to be structured and checked
- What a SIWE flow looks like end to end, before Lesson 22 covers server-side verification

## The problem: proving wallet control without a password

Every chapter so far has sent transactions or read data using a wallet
the backend itself controls. A login flow is the opposite case: a user
shows up with *their own* wallet and needs to prove to your backend that
they actually control it — without typing a password, and without your
server ever touching their private key. The mechanism every wallet
already supports is message signing: sign an arbitrary piece of text
with your private key, and anyone can verify that signature came from
your address without ever seeing the key itself.

The problem SIWE actually solves isn't "can a wallet sign a message" —
every wallet could already do that. It's that an unstructured signed
message is replayable and ambiguous: nothing stops a malicious site from
capturing a signature meant for `service.org` and replaying it against a
different site, and nothing in a free-text message guarantees the user
actually knew what they were agreeing to. SIWE is a standard, specified
in **EIP-4361**, defining exactly what that message has to contain so
wallets and servers can handle it safely and consistently.

## The real message format

This is the actual example message from the EIP-4361 specification
itself, not a paraphrase:

```
service.org wants you to sign in with your Ethereum account:
0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2

I accept the ServiceOrg Terms of Service: https://service.org/tos

URI: https://service.org/login
Version: 1
Chain ID: 1
Nonce: 32891756
Issued At: 2021-09-30T16:25:24Z
```

Every field is load-bearing. `domain` (the first line) is what lets a
wallet detect phishing — EIP-4361 requires wallets to check that the
domain requesting the signature actually matches where the request came
from, so a malicious site can't silently request a signature claiming to
be `service.org`. `nonce` is what stops replay: a fresh, server-issued
value the backend checks against, so a captured signature can't be
reused for a second login. `chain-id` and `issued-at` scope the
signature further, to a specific network and a specific window of time.

## The flow, end to end

```
1. Frontend asks the backend for a nonce
2. Backend generates one, stores it against the pending login
3. Frontend builds the SIWE message with that nonce and asks
   the wallet to sign it
4. Wallet shows the user the message and signs it
5. Frontend sends the message + signature back to the backend
6. Backend verifies both (Lesson 22) and starts a session (Lesson 23)
```

Step 4 matters for more than UX: EIP-4361 requires wallets to actually
display the domain, address, and any statement to the user before
signing, specifically so a user can see "service.org" in the message and
catch it if something looks wrong — the human check is part of the
security model, not just the cryptographic one.

## Building the message in code

The reference `siwe` library builds and formats this message for you
from a plain object — current, real usage:

```javascript
import { SiweMessage } from "siwe";

const message = new SiweMessage({
  domain: "service.org",
  address: userAddress,
  statement: "Sign in with Ethereum to the app.",
  uri: "https://service.org/login",
  version: "1",
  chainId: 1,
  nonce: serverIssuedNonce,
});

const preparedMessage = message.prepareMessage();
// preparedMessage is the exact string the wallet signs
```

`prepareMessage()` is what turns the structured fields into the exact
ABNF-conformant string from the spec — matching that format exactly is
what Lesson 22's server-side verification depends on.

## Key terms

| Term | Meaning |
|---|---|
| EIP-4361 | The Sign-In with Ethereum specification defining the message format |
| Domain binding | A wallet checking the signing request's domain matches the actual requester, preventing phishing |
| Nonce | A server-issued, one-time value preventing a captured signature from being replayed |
| `prepareMessage()` | The `siwe` library method producing the exact spec-conformant string to sign |

## Check yourself

You're ready for Lesson 22 when you can explain: if a malicious site
copied a real SIWE message's text and asked a user's wallet to sign it
again, what specifically in EIP-4361 is supposed to stop that from
working?
