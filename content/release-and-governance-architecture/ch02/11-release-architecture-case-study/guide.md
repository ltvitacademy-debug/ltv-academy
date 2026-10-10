# Lesson 11 — Release Architecture Case Study

**Chapter 2 · Enterprise Deployment · Lesson 11 of 16**

## What you'll learn

- How to trace a single realistic release through every concept covered in Lessons 1-10
- Where a weak release and governance practice actually breaks down in a believable scenario
- How to connect a specific failure back to the specific governance mechanism that should have caught it
- How to read a case study analytically rather than just as a story

## The scenario: Meridian Outfitters

Meridian Outfitters is a mid-size retail company running one shared Salesforce org across a sales team, a customer service team, and an e-commerce operations team — about 400 internal users. The org has grown fast over two years, from a single admin to three admins (one per business unit) and two developers, with no formal release strategy ever written down (Lesson 1) and governance handled informally by whichever admin or developer happens to own a given area (Lesson 3).

The customer service admin wants to deploy a new Flow on the Case object that automatically escalates any case tagged "high value customer" to a senior queue. It's a declarative change, built and tested in the admin's own developer sandbox over two days, and the admin plans to deploy it directly to production the same afternoon it's finished, the way most changes have gone out for the past year.

## Where this already goes wrong, before deployment

Walking Meridian's situation against this chapter's concepts surfaces several gaps at once:

- **No risk-tiering (Lesson 4).** Because the org has no change-control policy distinguishing declarative changes by actual risk, this Flow — which touches live customer escalation and could affect response-time commitments to high-value accounts — is on track for the same no-review path as a trivial picklist edit. A risk-based gating approach would have flagged this: it touches a customer-facing process, not just internal reporting.
- **No CAB (Lesson 5).** Nobody outside the customer service admin's own head reviews this change. The sales team, which has a separate automated process that also updates the Case queue field for a different reason, never gets a chance to flag the conflict.
- **No environment path beyond one sandbox (Lesson 7).** The change skips any integration or UAT stage entirely — there's no QA sandbox where it would run alongside other teams' in-flight work before reaching production.
- **No rollback plan (Lesson 6).** Nobody has asked what happens if the new Flow starts mis-escalating cases at scale, or whether reverting it would also need to address any case records it already changed.

## What actually happens

The Flow deploys directly to production. Within an hour, cases are escalating correctly for most records — but a second automated process, built by the sales team months earlier and unknown to the customer service admin, also writes to the Case queue field under certain conditions, and the two processes now race against each other on a subset of records, occasionally leaving a high-value case sitting unescalated in the wrong queue. This is a textbook **metadata conflict** (Lesson 8) that a shared release calendar and any cross-team visibility would have had a chance to catch — not because either Flow was badly built, but because nobody coordinated them.

Nobody notices for three days, because customer service doesn't have a mechanism to verify a declarative change actually behaved as intended after go-live, and nobody told the support team that anything had changed in the first place (Lesson 10) — so the first signal is a frustrated high-value customer escalating a complaint about a complaint.

## What Meridian needs, mapped to this chapter

Fixing this isn't about blaming the customer service admin for a bad Flow — the Flow's own logic was fine. It's about the missing governance machinery around it: a release strategy that classifies this kind of change correctly (Lesson 1, Lesson 4), a CAB that would have surfaced the sales team's competing process before deployment (Lesson 5), an environment path with at least one shared-visibility stage before production (Lesson 7), a rollback plan prepared in advance (Lesson 6), and a communication step that would have had support watching for exactly this kind of symptom in the days after go-live (Lesson 10).

## Key terms

| Term | Meaning |
|---|---|
| Case study | A worked, realistic scenario used to practice connecting a specific failure to the specific governance mechanism that should have caught it |

## Lab

Meridian's leadership asks you, acting as the newly hired platform architect, to prevent this exact failure pattern from recurring. Write a short memo (one page or less) proposing the three governance mechanisms from this chapter you'd implement first, in priority order, with a one-sentence justification for the order you chose.

## Check yourself

Can you trace each specific failure in the Meridian scenario back to the specific lesson and governance concept that would have caught or prevented it? Can you explain why this was a metadata-conflict failure, not a code-quality failure? If you were prioritizing fixes with limited time, which single governance mechanism would you implement first, and why?
