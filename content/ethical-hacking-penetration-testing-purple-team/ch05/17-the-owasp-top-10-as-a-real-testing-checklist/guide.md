# Lesson 17 — The OWASP Top 10 as a Real Testing Checklist

**Chapter 5 · Web Application Penetration Testing · Lesson 1 of 4**

## What you'll learn

- Why the OWASP Top 10 is a prioritized list of *risk categories*, not a
  literal ten-item test plan — and how a real tester turns each category
  into concrete checks
- The current **OWASP Top 10:2025** list, in order, and what each
  category actually means for a web application under authorized test
- How this list changed from the 2021 edition you may have seen
  referenced elsewhere, so you're not caught testing against a stale
  checklist
- Where this chapter's other three lessons (injection/XSS, authentication
  and session flaws, and API security) fit inside this bigger checklist

## A checklist, not a scoreboard

The OWASP Top 10 gets misread constantly as "the ten vulnerabilities a
pentester looks for." That's backwards. Each entry is a **risk
category** — a bucket covering dozens of specific, testable weaknesses
that share a root cause. "Injection" isn't one test; it's a category you
walk through every input field, every API parameter, and every header
checking for. A real engagement report never cites "A05" as a finding —
it cites a specific SQL injection in a specific parameter, and then maps
that finding back to the category for the client's risk conversation.
Treat the Top 10 as the skeleton of your methodology, not the whole
methodology.

## The current list: OWASP Top 10:2025

OWASP revises this list roughly every few years from real incident and
survey data contributed by organizations worldwide. The 2025 edition
replaced the long-standing 2021 list and reshuffled several categories —
so if your own notes still say "A03 Injection" or "A10 SSRF," you're
reading the outdated 2021 ordering. Here is the current list, each one
paired with what you'd actually go check in an authorized assessment:

```
A01:2025  Broken Access Control
          (now absorbs SSRF) — test every endpoint with a lower-
          privileged or unauthenticated session; try forcing
          outbound requests from server-side fetch features

A02:2025  Security Misconfiguration
          default creds, verbose error pages, open admin panels,
          permissive CORS, unnecessary services exposed

A03:2025  Software Supply Chain Failures
          outdated/unverified dependencies, unsigned build
          artifacts, compromised CI/CD pipeline steps

A04:2025  Cryptographic Failures
          weak/missing TLS, hardcoded keys, reversible password
          storage, predictable tokens

A05:2025  Injection
          SQL, OS command, LDAP, and XSS — anywhere untrusted
          input reaches an interpreter unsanitized

A06:2025  Insecure Design
          missing threat model, business logic that trusts the
          client, no rate limiting by design

A07:2025  Authentication Failures
          weak lockout policy, session fixation, broken password
          reset flows, missing MFA on sensitive actions

A08:2025  Software or Data Integrity Failures
          unsigned updates, insecure deserialization, CI/CD
          artifacts that can be tampered with in transit

A09:2025  Logging & Alerting Failures
          auth failures and admin actions that generate no log,
          or logs nobody is alerted on

A10:2025  Mishandling of Exceptional Conditions
          error states and edge cases that leak data, skip
          authorization checks, or open a denial-of-service path
```

Two changes are worth remembering on their own. First, **Server-Side
Request Forgery** — its own category in some older material — now lives
inside A01 Broken Access Control, because SSRF is fundamentally a
server making a request it shouldn't have been allowed to make. Second,
**A03 Software Supply Chain Failures** is new and broader than the old
"vulnerable components" idea: it covers your entire build and
distribution pipeline, not just outdated libraries.

## Turning categories into a scoped checklist

Inside a signed Rules of Engagement, each category becomes a set of
concrete test cases scoped to the in-scope application: authenticated
and unauthenticated access-control matrices for A01; a configuration
review of headers, CORS, and default accounts for A02; a dependency and
pipeline audit for A03; and so on through the list. You don't test every
category with equal depth on every engagement — scope, time budget, and
the application's own architecture decide where to spend the hours. A
static content site barely has an A07 Authentication surface; a banking
API lives or dies on A01, A04, and A07.

## Key terms

| Term | Meaning |
|---|---|
| OWASP Top 10 | A prioritized list of web application risk *categories*, revised periodically from real-world incident and survey data |
| OWASP Top 10:2025 | The current edition, replacing the 2021 list; folds SSRF into Broken Access Control and adds Software Supply Chain Failures and Mishandling of Exceptional Conditions |
| Risk category | A bucket of related, specific weaknesses sharing a root cause — not itself a single test |
| Broken Access Control (A01:2025) | Failures letting a user act outside their intended permissions, now including SSRF |

## Check yourself

You're ready for Lesson 18 when you can explain, without looking: why is
citing "A05" alone not a real finding, and which two categories moved or
merged between the 2021 and 2025 editions?
