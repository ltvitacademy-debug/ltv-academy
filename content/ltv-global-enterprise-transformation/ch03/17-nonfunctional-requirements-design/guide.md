# Lesson 17 — Nonfunctional Requirements Design

**Chapter 3 · Integration and Platform Architecture · Lesson 17 of 33**

## What you'll learn

- Why nonfunctional requirements (NFRs) need to be written down explicitly, not left implicit
- LTV Global's specific NFRs for availability, performance, data residency, and scale
- How this lesson formally documents the LedgerPoint batch tolerance window introduced in Lesson 14
- Why an NFR that isn't measurable isn't actually an NFR yet

## Why "it should be fast and secure" isn't an NFR

A **nonfunctional requirement** describes a quality the system must have — how fast, how available, how scalable, where data may live — as opposed to a functional requirement describing what the system must do. The trap most designs fall into is writing NFRs so vague they can't actually be checked: "the system should be fast" and "the system should be secure" are aspirations, not requirements, because nobody can test whether they've been met. A real NFR is measurable, which is why every LTV Global NFR below has a specific, checkable target attached.

## LTV Global's nonfunctional requirements

| Category | Requirement | Why this specific target |
|---|---|---|
| Availability | The Dealer Portal and Customer Portal must remain available during each region's business hours, with planned maintenance windows scheduled outside them | Parts & Aftermarket (Lesson 3) is the most schedule-sensitive stakeholder; portal downtime during business hours directly costs orders |
| Performance | Portal page response and parts-pricing lookups must stay responsive under peak dealer-ordering load, not just under light testing conditions | The Parts & Aftermarket VP's stated concern (Lesson 3) that the new system must not be slower than today's tools |
| Data residency | EMEA personal data handling must respect GDPR obligations for where and how that data is processed | A fixed regulatory constraint from Lesson 2, addressed in combination with Lesson 11's security design |
| Scale | The platform must support ~10,000 internal users and millions of customer/equipment records without degrading read- or write-path performance | Directly from Lesson 2's stated nonfunctional requirement and Lesson 10's LDV strategy |
| Integration tolerance | Financial visibility in Salesforce may lag LedgerPoint's own system by up to one business day, reflecting LedgerPoint's nightly batch cycle | Formalizes the batch tolerance window Lesson 14 already designed around — not a new decision, a documented one |
| Identity | Workforce SSO login must complete without requiring a user to re-enter Salesforce-specific credentials, and MFA enforcement must be independently confirmed on the Okta side | Formalizes Lesson 12's SSO and MFA design as a checkable requirement, not just an architectural description |

## Why the integration tolerance NFR matters most

Of everything in this table, the integration tolerance requirement is the one most likely to prevent a real support escalation after go-live. Without it written down as an explicit, agreed requirement, "why does my AR balance look out of date" becomes a production incident the first time a finance user notices the lag Lesson 14 always knew would exist. With it written down and agreed before go-live, the same observation is confirmed, expected behavior — the requirement converts a design fact into a shared, documented expectation stakeholders signed off on, rather than a surprise discovered in production.

## How NFRs get tested, not just written

A written NFR is only useful if there's a way to check it was met. LTV Global's performance NFR gets validated through load testing against realistic peak-order volume before go-live, not just functional testing with a handful of sample records — exactly the kind of testing gap Lesson 1's "passes in a sandbox with a few thousand seed records" warning about Large Data Volumes was describing. The scale NFR gets validated the same way, using a data volume that approximates real production growth rather than the much smaller dataset a typical sandbox starts with.

## Key terms

| Term | Meaning |
|---|---|
| Nonfunctional requirement (NFR) | A requirement describing a quality the system must have, rather than a specific function it performs |
| Measurable requirement | A requirement with a specific, checkable target, as opposed to a vague aspiration |
| Batch tolerance window | An accepted, documented delay between a source system's update and its reflection elsewhere |
| Load testing | Testing system performance under realistic peak volume, not just functional correctness |

## Lab

Pick any one NFR from the table above and rewrite it as a vague, unmeasurable aspiration (for example, turning the performance NFR into "the system should be fast"). Then write two or three sentences explaining specifically what got lost in that rewrite — what question the vague version can no longer answer that the original, measurable version could.

## Check yourself

Can you explain, in your own words, why "the system should be secure" fails as a nonfunctional requirement even though security clearly matters to this project? Can you state which NFR in this lesson formalizes a decision already made in Lesson 14, and why writing it down as an NFR (rather than leaving it as an implicit design fact) matters for avoiding a production support escalation?
