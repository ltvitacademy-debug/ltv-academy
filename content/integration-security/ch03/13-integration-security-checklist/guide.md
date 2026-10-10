# Lesson 13 — Integration Security Checklist

**Chapter 3 · Practice · Lesson 13 of 13**

## What you'll learn

- A consolidated, lesson-by-lesson checklist covering every control this course built up
- How to apply the checklist to both a new integration (design time) and an existing one (review time)
- Where the checklist items depend on each other, so you fix things in a sensible order rather than randomly
- How this checklist connects into the recurring review discipline from Lesson 10, rather than being a one-time gate

## The checklist

Organized by the chapter and lesson that introduced each item, so you can go back to the full reasoning behind any line:

**Identity and authentication (Lessons 2, 3, 5, 6)**
- [ ] The integration uses a flow matched to its shape: JWT Bearer or Client Credentials for unattended service-to-service integrations, Authorization Code only where an individual human must explicitly consent.
- [ ] If certificates are used, they're CA-signed for any production path, not self-signed.
- [ ] The integration authenticates as a dedicated integration user (or a per-integration Run As user/principal) -- never a real employee's personal login.
- [ ] That identity's profile and permission sets are scoped to exactly what this integration does, mapped from its actual behavior, not cloned from a convenient existing profile.
- [ ] API Only is enabled on the integration user's profile where the integration never needs UI login.
- [ ] The integration user has a named, accountable owner.

**Credential storage (Lessons 4, 7)**
- [ ] No credential, API key, or secret is hardcoded in Apex, Flow, or any config screen.
- [ ] Callout authentication goes through Named Credentials / External Credentials, with the Named Principal vs. Per-User choice made deliberately.
- [ ] Any secret Apex must read directly (not handled by Named Credentials) lives in an encrypted custom field, not a Protected Custom Metadata Type (unless this is genuinely a managed package) and not a plain custom setting.
- [ ] A rotation cadence is defined for every integration secret, scaled to the sensitivity of what it unlocks.

**Network controls (Lesson 8)**
- [ ] The integration's actual source IPs (or destination IPs, for outbound) are known and documented.
- [ ] Profile Login IP Range is scoped to those known IPs where the integration's infrastructure is stable enough to support it.
- [ ] The connected app's IP relaxation setting is set deliberately, with the JWT/SAML Bearer always-enforced exception accounted for.

**Inbound-specific controls (Lesson 10)**
- [ ] Every inbound endpoint (Apex REST, webhook listener) verifies a signature on the raw request body before running any business logic.
- [ ] Replay protection (timestamp or nonce) is in place where the sender supports it.
- [ ] Any guest user profile behind a public endpoint is scoped to exactly what that endpoint needs, not cloned from a broader existing profile.

**Monitoring and review (Lessons 9, 10)**
- [ ] A documented baseline of normal activity exists for this integration (volume, timing, scope).
- [ ] Event monitoring (historical and/or real-time, as appropriate) and Setup Audit Trail are actually being watched by someone, not just technically available.
- [ ] This integration is on a recurring review calendar, not just reviewed once at launch.

## Applying it at design time versus review time

At design time, the checklist is mostly forward-looking: you're choosing the flow, building the permission set, and setting up Named Credentials before anything goes live, so most items are "build it this way" decisions. At review time (Lesson 10's recurring discipline), the same checklist becomes a set of verification questions against something already running: has the profile drifted, is the certificate still valid, does documented access still match actual behavior. The checklist doesn't change between the two contexts — only whether you're using it to build correctly the first time or to catch drift afterward.

## Order matters: fix in a sensible sequence

When a review turns up multiple gaps at once, Lesson 11's case study is the model for how to prioritize: identity and credential-storage gaps (a hardcoded, over-privileged, unrotated credential) generally carry the largest blast radius and come first; inbound signature verification is urgent whenever a public endpoint is exposed and unverified, because that gap is actively exploitable by anyone who finds the URL; network and monitoring improvements are valuable but rarely the single most urgent fix on their own, since they reduce exposure or shorten detection time rather than closing an active hole. This isn't a rigid rule for every situation, but it's the right default ordering when you don't have a reason to deviate from it.

## This course's whole arc, in one sentence

Every control in this checklist answers one of four questions from Lesson 1: who or what is really making this call, is the credential behind it safe at rest, can the network path and the endpoint itself be trusted, and would anyone notice if something went wrong. An integration that can answer all four well is a secure integration, regardless of which specific Salesforce feature happens to implement the answer.

## Key terms

| Term | Meaning |
|---|---|
| Design-time check | Applying the checklist while building a new integration, before it goes live |
| Review-time check | Applying the same checklist to an existing, running integration to catch drift |
| Remediation ordering | Prioritizing which checklist gaps to fix first based on actual exploitability and blast radius, not the order they were discovered |

## Lab

Pick any integration you have access to (a Developer Edition org's own connected app setup is fine if you don't have a live production integration to review), or reuse the Meridian Parts scenario from Lesson 11. Walk the full checklist against it line by line, marking each item pass/fail/not-applicable, and for every failing item, write the specific remediation and where it would rank in your fix order using this lesson's prioritization logic.

## Check yourself

Without looking back at the checklist, can you name at least one item from each of the five sections (identity, credential storage, network, inbound-specific, monitoring)? Can you explain, in one sentence, the four underlying questions this entire course's checklist is really answering?
