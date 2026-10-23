# Lesson 1 — Defense in Depth on the Now Platform

**Chapter 1 · The Platform Security Model · Lesson 1 of 24**

## What you'll learn

- What "defense in depth" means as a real security principle, not a buzzword
- The five security layers you've already built, scattered across nine courses in this path, named explicitly
- Why a security architect's actual job is making those layers work together — not perfecting any one of them
- How to recognize an instance that's quietly over-relying on a single layer
- Why this chapter exists: everything from here on assumes you can see the whole model at once

## No single control is the whole story

"Defense in depth" is a standard security principle borrowed from physical and military security: don't rely on one wall, one lock, one checkpoint. Build several independent layers, each catching a different category of failure, so that one layer breaking doesn't mean the whole system is compromised. A castle with only a moat and no gate guard is one clever raft away from falling. A castle with a moat, a gate guard, an inner wall, and a keep survives a single breach.

ServiceNow Administration taught you Access Control Lists in isolation — how a table-level or field-level ACL decides whether one request succeeds. That's correct, and necessary. But "configure ACLs well" is not the same job as "secure an instance." An instance can have flawless ACLs and still be insecure, because ACLs are only one of several independent layers the platform actually relies on. This lesson names all of them, together, for the first time in this path — because a security architect has to see the whole model, not just the layer they configured most recently.

## The five layers you've already built — named explicitly

You've touched every layer below in an earlier course. None of this is new material. What's new is seeing them as one coherent model instead of five separate topics you learned months apart.

**Layer 1 — Access Control Lists.** ServiceNow System Administration's "How ACLs Actually Evaluate Access" and "Table-Level & Field-Level ACLs" covered the core mechanism: every read, write, create, and delete against a table or field is checked against an ACL rule before it's allowed. This is the layer most administrators think of as "the" security model. It's actually just one layer of five.

**Layer 2 — UI Policies and Data Policies.** That same course's "UI Policy vs. Data Policy: When to Use Each" drew the line between client-side enforcement (a UI Policy hiding or requiring a field in the browser — fast, but trivially bypassed by anyone who can call the API directly) and server-side enforcement (a Data Policy, which re-checks the same rule no matter how the record was submitted). ServiceNow Scripting & Application Development reinforced that same client-vs-server split from the other direction: a Client Script runs in the browser and can be skipped by a direct API call, while a Business Rule runs on the server and cannot. Defense in depth means never trusting the client-side half alone.

**Layer 3 — Application Scope isolation.** ServiceNow Scripting & Application Development's "What an Application Scope Actually Protects" covered this: a scoped application's tables and APIs are invisible to other applications by default, unless a cross-scope access record explicitly allows it. This layer has nothing to do with ACLs — it protects against a completely different failure mode, a well-intentioned custom application accidentally (or maliciously) reaching into data it was never meant to touch.

**Layer 4 — MID Server network isolation.** ServiceNow IntegrationHub & REST APIs' "What a MID Server Does & Why It's Needed" covered a layer most administrators never think of as "security" at all: the MID Server lets the instance reach an on-premises system through an outbound-only connection, so your firewall never needs an inbound port open to the ServiceNow cloud. That's a network-security layer, sitting entirely outside the application layers above it.

**Layer 5 — Authentication.** This course's own Chapter 3 (Local vs. SSO Authentication, SAML-Based SSO, Multi-Factor Authentication) covers the layer that decides who gets to make a request at all, before any ACL, policy, or scope check ever runs. A perfect ACL means nothing if the authentication layer in front of it is weak.

## Why naming all five together is the actual point

Each layer alone answers a narrow question: who can see this field, can this app reach that table, can this request even reach the instance. None of those questions is "is this instance secure?" That question only has an answer when you can trace what happens to a single request as it passes through all five layers in sequence — and notice where a gap in one layer isn't actually fatal, because a different layer catches it anyway.

This is the real difference between an administrator and a security architect. An administrator asks, "did I configure this ACL correctly?" An architect asks, "if this ACL were slightly wrong, which of the other four layers would still contain the damage — and if the answer is none of them, that ACL needs to be bulletproof, because nothing is backing it up." The rest of this course goes deep into each layer individually. This lesson is the map you'll keep referring back to.

## Key terms

| Term | Meaning |
|---|---|
| Defense in depth | Multiple independent security layers, so one layer's failure doesn't mean total compromise |
| Client-side vs. server-side enforcement | A UI Policy/Client Script runs in the browser and can be bypassed by a direct API call; a Data Policy/Business Rule runs on the server and cannot |
| Application scope isolation | A scoped app's tables and APIs are invisible to other apps unless cross-scope access is explicitly granted |
| Layered failure containment | Designing so that one layer's gap is caught by a different, independent layer |

## Check yourself

You're ready for Lesson 2 when you can name, without looking: the five security layers covered in this lesson, which course and lesson covered each one, and why a flawless ACL configuration alone does not make an instance secure.
