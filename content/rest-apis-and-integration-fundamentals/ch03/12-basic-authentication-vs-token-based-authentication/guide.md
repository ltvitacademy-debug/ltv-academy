# Lesson 12 — Basic Authentication vs. Token-Based Authentication

**Chapter 3 · Authentication and Security · Lesson 12 of 19**

## What you'll learn

- How Basic Authentication and OAuth 2.0 both use the same Authorization header, differently
- Why base64 encoding is not the same thing as encryption
- The practical advantages of a revocable, expiring token over a reusable password
- Why Basic Authentication conflicts with multi-factor authentication

## Same header, different contents

Both methods send credentials in the `Authorization` header — what
differs is what's encoded there and how long it stays valid.

```
Basic:
Authorization: Basic aW50ZWdyYXRpb24udXNlcjpwYXNz

OAuth 2.0 / Bearer token:
Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6...
```

- **Basic Authentication** base64-encodes `username:password` into
  one string, and that *exact same string* is sent again on every
  single call.
- **OAuth 2.0** exchanges credentials once for a short-lived
  **bearer token**, and that token — never the raw password — rides
  in the header on every subsequent call.

## Base64 is encoding, not encryption

A common misunderstanding: base64 is **reversible encoding**, not
encryption. Anyone who intercepts a Basic Auth header can decode it
back to the original username and password almost instantly. The
actual protection on either method comes from sending every call over
HTTPS — encoding alone protects nothing.

## Why the difference matters in practice

| | Basic Authentication | OAuth 2.0 token |
|---|---|---|
| What's exposed if leaked | The actual password | A token, not the password |
| Can it be revoked independently? | No — you'd have to change the password | Yes — the token can be revoked on its own |
| Does it expire on its own? | No | Yes, after a set lifetime |
| Works with MFA-enabled users? | No | Yes |

That last row is a hard constraint, not a preference: Oracle Fusion
REST calls **cannot** be made using Basic Authentication for a user
set up with multi-factor authentication. This is part of why Oracle
recommends OAuth 2.0 for integration scenarios.
## Key terms

| Term | Meaning |
|---|---|
| Bearer token | A credential string sent in the Authorization header after a one-time OAuth exchange |
| Base64 | A reversible text encoding — not encryption — used to format Basic Auth credentials |
| Revocation | Invalidating a specific token without changing the underlying account password |
| MFA | Multi-factor authentication; incompatible with Basic Authentication for Fusion REST calls |

## Check yourself

A security review flags that an integration is still using Basic Authentication. Explain, using what you learned this lesson, two concrete reasons that's riskier than switching it to OAuth 2.0.
