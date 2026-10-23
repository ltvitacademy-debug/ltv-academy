# Lesson 8 — Basic Auth & Why It's Rarely Enough

**Chapter 3 · Authentication for Integrations · Lesson 8 of 29**

## What you'll learn

- How Basic Authentication actually works on the wire: username:password, base64-encoded, sent on the Authorization header
- Why base64 encoding is not encryption, and what that means for every Basic Auth call
- The three real operational weaknesses that make Basic Auth rarely sufficient for production integrations
- Where Basic Auth still shows up legitimately, and the honest rule for when to use it

## How Basic Authentication actually works

Chapter 2 built REST Messages and pointed each one at an Authentication Profile without digging into what that profile actually does under the hood. Basic Authentication is the simplest of the options: it joins a username and a password with a colon — `username:password` — and base64-encodes the result. That encoded string is sent on the Authorization header of every single outbound request, prefixed with the word `Basic`:

```
Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=
```

When you configure a Basic Auth Authentication Profile on a REST Message in ServiceNow, you give it a username and a password, and ServiceNow builds that header automatically on every call the REST Message makes. Your script never touches the raw encoding — it just calls the REST Message, and the header is already attached.

## Base64 is encoding, not encryption

This is the detail that trips people up, and it matters enough to say plainly: base64 is a reversible *encoding* scheme, not a cipher. Anyone who intercepts that Authorization header can decode it straight back to the real username and password in a single line of code, with no key, no password, and no computation beyond a standard library call. Base64 exists to make arbitrary bytes safe to put inside text-based protocols like HTTP — it was never designed to hide anything.

The only thing actually standing between a Basic Auth header and a fully exposed plaintext password is the TLS/HTTPS connection the request travels over. Over HTTPS, the whole request — headers included — is encrypted in transit, so the Basic Auth header is protected the same way the rest of the payload is. Send that identical header over plain HTTP, though, and it is effectively plaintext on the wire: whoever is positioned to see the traffic sees the password, decoded, in seconds.

## Three real reasons Basic Auth is rarely enough

Even when it's used correctly over HTTPS, Basic Auth has structural weaknesses that matter for production integrations:

- **Credentials travel on every request.** OAuth issues a token once and reuses or refreshes it; Basic Auth re-sends the actual username and password on every single call, for as long as the integration runs. Every request is a fresh opportunity for that credential to be logged, cached, or exposed somewhere it shouldn't be.
- **No built-in expiration or rotation.** A Basic Auth credential doesn't expire on its own. If it's ever compromised — leaked in a log, committed to a script by accident — it stays valid indefinitely, until a human notices and manually changes it.
- **Revocation means changing a shared password.** It's common for one service account's username and password to be reused across several integrations built over time. Cutting off access for just one of them means changing that shared password — which breaks every other integration still depending on the old value, and now requires redistributing the new password to each one you actually wanted to keep working.

## Where Basic Auth still fits

None of this makes Basic Auth useless. It remains the fastest Authentication Profile to configure for a quick internal test, a sandbox instance, or a legacy external API that genuinely offers no stronger option at all. The honest rule this lesson leaves you with: reach for Basic Auth when speed matters more than production rigor, and treat it as something to replace — not something to leave in place — before an integration goes live against a partner or vendor that actually supports OAuth.

## Key terms

| Term | Meaning |
|---|---|
| Basic Authentication | An HTTP auth scheme that base64-encodes `username:password` and sends it in the Authorization header on every request |
| Base64 encoding | A reversible, non-secret text encoding — not a form of encryption |
| Authentication Profile | The ServiceNow REST Message component that manages how credentials get attached to outbound requests |
| Credential rotation | Periodically changing a credential so a compromised one doesn't stay valid indefinitely |
| Service account | A non-human account used by an integration, often shared across more than one automation |

## Check yourself

You're ready for Lesson 9 when you can explain, without looking: why does sending a Basic Auth header over plain HTTP expose a password just as completely as sending the password in plain text, and what's the real difference between base64 encoding and encryption?
