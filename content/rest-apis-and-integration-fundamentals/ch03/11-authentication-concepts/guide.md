# Lesson 11 — Authentication Concepts

**Chapter 3 · Authentication and Security · Lesson 11 of 19**

## What you'll learn

- The difference between authentication ("who are you") and authorization ("what can you do")
- Why both checks happen on every single stateless REST call
- What a 401 response means versus what it doesn't mean
- The two authentication methods Oracle Fusion's REST API supports

## Two different questions

- **Authentication** — "Who are you?" Proving your identity to the
  server.
- **Authorization** — "What are you allowed to do?" What that proven
  identity is permitted to see or change.

These are genuinely separate checks. A fully authenticated, valid user
can still be denied access to a specific resource, business unit, or
action — that's an authorization failure, not an authentication one.

## Every call, both checks, no memory

Because Oracle Fusion's REST API is stateless (Lesson 2), neither
check is ever assumed from a previous request. Every call proves
identity and gets evaluated for permissions independently, even if the
previous call a second earlier succeeded.

## Authentication failing stops everything else

```
GET /fscmRestApi/resources/11.13.18.05/invoices
(no Authorization header)

-> 401 Unauthorized
{ "title": "Unauthorized", "status": 401 }
```

A missing or invalid credential fails **before** Fusion ever evaluates
what that identity would be allowed to see. A `401` means
authentication failed; a `403` (covered more in Lesson 13) means
authentication succeeded but authorization did not.

## What Oracle Fusion supports

| Method | How it works |
|---|---|
| **Basic Authentication** | Username and password, base64-encoded, sent on every call |
| **OAuth 2.0** | Credentials exchanged once for a short-lived, revocable bearer token |

Oracle's own documentation recommends OAuth 2.0 over Basic
Authentication because it is more secure — and Basic Authentication
cannot be used at all for users set up with multi-factor
authentication (MFA).
## Key terms

| Term | Meaning |
|---|---|
| Authentication | Proving identity — "who are you" |
| Authorization | Determining permitted actions for a proven identity — "what can you do" |
| 401 Unauthorized | Authentication failed or is missing |
| 403 Forbidden | Authentication succeeded, but authorization denied the action |

## Check yourself

A request comes back with a 401. A different request, from a different user, comes back with a 403. Explain what each status code tells you about where in the authentication/authorization chain the request failed.
