# Lesson 7 — Failure Scenarios in Each Design

**Chapter 2 · Reviewing Designs · Lesson 7 of 14**

## What you'll learn

- A short checklist of failure categories that applies to almost any integration design
- How each of Chapter 1's five case studies fails, specifically, and what catches it
- Why "the integration works" and "the integration fails safely" are two separate claims
- How to walk a design through its failure modes the way a review board will

## The failure checklist

Lesson 1 promised this lesson would cover failure in depth. Before walking through each case study, it helps to have a short, reusable checklist of failure categories, because the same handful of failure shapes recur across almost every integration regardless of what it connects:

- **Timeout.** The other system doesn't respond in time.
- **Partial failure.** A batch job processes 8,000 of 10,000 records and then the connection drops.
- **Duplicate delivery.** The same message or event arrives, and gets processed, more than once.
- **Out-of-order delivery.** Events arrive in a different sequence than they occurred.
- **Silent data loss.** A record never arrives and nothing notices.

A design doesn't need a custom answer to a thousand possible failures — it needs a stated answer to each of these five categories, because almost every real incident is one of them wearing a different costume.

## Walking the checklist against each case study

**Meridian Fixtures (ERP, Lesson 1).** The live inventory callout faces timeout risk directly — Lesson 1's fallback (show the last-synced number with a visible "as of" timestamp) is exactly a timeout answer. The batch catalog sync faces partial failure: if the nightly job dies halfway through, the next run needs to pick up where it left off rather than silently leaving half the catalog on old prices, which argues for the batch job being re-runnable and idempotent itself, not just the live callout.

**Harborline Capital (financial system, Lesson 2).** This case study is built almost entirely around duplicate delivery, and Lesson 2's idempotency design is the direct answer. Its remaining open risk is silent data loss — an event published by the ledger but never received by Salesforce's subscriber — which is why that lesson calls for periodic reconciliation, not just a working happy path.

**Cascade Outfitters (data warehouse, Lesson 3).** This case study's defining failure is silent data loss through a scheduled delta sync's blind spot (a record created and deleted between runs), which Lesson 3 solves by switching to Change Data Capture. It still carries partial failure risk if the warehouse-side subscriber crashes mid-stream, which is why a resumable position (a replay marker) matters as much here as a working subscriber.

**Vantage Utilities (external application, Lesson 4).** Because the caller is external, out-of-order delivery is a live risk the first three case studies didn't really face: if the portal fires two updates to the same case in quick succession and a network retry reorders them, the case could end up reflecting the older update. The design needs either a sequence number the receiving side can check, or — more simply — treating each update as a full replacement of state rather than an incremental change, so order stops mattering.

**Bellwood Apparel (marketing platform, Lesson 5).** The case study's signature failure isn't really on this list — it's the update loop from Lesson 5, which behaves like an unbounded, self-inflicted duplicate-delivery storm. It's worth naming as its own category precisely because bidirectional designs can manufacture failure volume that a one-way integration never could.

## Working the pattern vs. working the happy path

A design walkthrough that only shows the successful case — data arrives, gets processed, everyone's happy — hasn't actually been reviewed yet; it's only been demonstrated. The question a review board is actually paid to ask is: what happens when this step doesn't go as planned, and is that handled on purpose or by accident? "The integration works" describes the happy path. "The integration fails safely" describes what it does on a bad day — and a design only earns the second claim once each of the five failure categories above has a named, deliberate answer, not just an assumption that they won't happen.

## Key terms

| Term | Meaning |
|---|---|
| Timeout | A failure where the other system doesn't respond within an acceptable window |
| Partial failure | A batch or bulk operation stopping partway through, leaving some records processed and others not |
| Duplicate delivery | The same message being delivered and processed more than once |
| Out-of-order delivery | Messages arriving in a different sequence than the order they actually occurred |
| Silent data loss | A record or event that never arrives, with nothing in the design noticing |

## Lab

Pick the Bellwood Apparel marketing-platform case study from Lesson 5. Walk it through all five failure categories in this lesson's checklist, one at a time, even the ones that seem like a stretch — for each, either describe a realistic way it could occur in that bidirectional design, or explain concretely why that category genuinely doesn't apply there. Then state which single failure category you'd prioritize fixing first, and why.

## Check yourself

Can you list this lesson's five failure categories from memory, with a one-sentence definition of each? Can you explain, for at least two of Chapter 1's case studies, which specific failure category their design was mainly built to defend against?
