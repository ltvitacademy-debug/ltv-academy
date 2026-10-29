# Lesson 20 — API Security Testing for Modern Applications

**Chapter 5 · Web Application Penetration Testing · Lesson 4 of 4**

## What you'll learn

- Why the **OWASP API Security Top 10** exists as a separate list from
  the main OWASP Top 10, and when a tester reaches for it
- How to test for **Broken Object Level Authorization (BOLA)**, the
  single most common and most severe API finding
- How **mass assignment** lets an attacker set fields they were never
  shown a form field for, and how to test both REST and GraphQL for it
- How to test whether rate limiting actually exists, and why its
  absence is its own exploitable category, not just a performance
  concern

## Why APIs get their own checklist

A REST or GraphQL API has no page layout, no visible forms, and often
no rendered HTML at all — most of the OWASP Top 10's web-focused
language (reflected XSS in a rendered page, for instance) doesn't map
cleanly onto a JSON request/response cycle. OWASP maintains a separate
**API Security Top 10** (currently the 2023 edition) precisely because
APIs fail in their own characteristic ways, mostly centered on
**authorization at the object and function level**, not at the page
level. Every technique below assumes the same signed, authorized scope
as the rest of this chapter — API testing just as easily crosses into
systems that weren't authorized if you follow an endpoint somewhere
your ROE didn't cover.

## Broken Object Level Authorization (BOLA)

BOLA — **API1:2023**, consistently the most-cited API vulnerability in
real engagements — happens when an API checks that a user is
*authenticated*, but never checks that the specific object they're
requesting actually *belongs to them*. The test is almost always the
same shape: authenticate as User A, note an object's ID in a request
like `GET /api/orders/4471`, then replay that exact request while
authenticated as User B. If User B's session can read (or modify)
User A's order, invoice, or document, that's BOLA — full stop, no
further cleverness required. This single test, repeated across every
object-returning endpoint in the API, finds a disproportionate share of
an engagement's critical findings, which is exactly why it tops the
list two editions running.

## Mass assignment (now Broken Object Property Level Authorization)

Mass assignment happens when an API endpoint blindly binds every field
in a submitted JSON body to a backend object, instead of allowing only
specific fields. A profile-update endpoint intended to let a user change
their display name might accept:

```json
PATCH /api/users/me
{
  "displayName": "jordan",
  "role": "admin",
  "accountBalance": 999999
}
```

If the backend naively maps the whole body onto the user record, fields
the UI never exposed — `role`, `accountBalance`, `isVerified` — get set
anyway. The test is simple: capture a legitimate request, then add
fields you have no business reason to know about, drawn from other
parts of the API's schema (error messages, documentation, or other
endpoints' responses often leak field names). If any of them take
effect, that's a mass-assignment finding. **GraphQL** needs the same
scrutiny on mutations — a `updateUser` mutation's input type may expose
far more settable fields than any client UI ever sends.

## Rate limiting gaps

Missing or weak rate limiting isn't just a performance nice-to-have —
OWASP tracks it as **Unrestricted Resource Consumption (API4:2023)**
because its absence directly enables brute-forcing a password reset
code, enumerating every valid user ID on a BOLA-vulnerable endpoint at
scale, or running up real cost on a metered backend (AI inference calls,
SMS sends, cloud compute) until the bill itself becomes the attack. The
test is straightforward: fire a realistic burst of requests at a
sensitive endpoint — login, OTP verification, password reset — and
confirm the API actually throttles, locks out, or rejects after a
defined threshold, not just that a `429 Too Many Requests` response
exists *somewhere* in the documentation.

## Key terms

| Term | Meaning |
|---|---|
| BOLA (API1:2023) | An API checks that a request is authenticated but not that the specific object requested belongs to that user — tested by swapping object IDs between two authenticated sessions |
| Mass assignment | An endpoint binds every field in a submitted body to a backend object instead of an allow-list, letting unexposed fields (role, balance) be set directly |
| Unrestricted Resource Consumption (API4:2023) | Missing or weak rate limiting, enabling brute-force, mass enumeration, or cost-based abuse of metered backend resources |
| OWASP API Security Top 10 | A separate list from the main OWASP Top 10, addressing authorization failures specific to REST and GraphQL APIs |

## Check yourself

That closes Chapter 5. You're ready for Chapter 6 when you can explain,
without looking: what is the exact two-session test that confirms BOLA,
and why is missing rate limiting classified as its own vulnerability
category rather than just a performance issue?
