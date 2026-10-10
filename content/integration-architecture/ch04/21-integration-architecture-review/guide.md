# Lesson 21 — Integration Architecture Review

**Chapter 4 · Applying Integration Architecture · Lesson 21 of 28**

## What you'll learn

- How to structure a review of a proposed integration design, pulling together every lesson from Chapters 1 through 3
- A concrete checklist an architect can actually use when reviewing someone else's integration proposal
- Why a review should happen before implementation, and what to do when it doesn't
- A worked review of a flawed sample design, showing the checklist catching real problems

## Why this lesson exists: synthesis, not new material

Every concept needed for a rigorous integration review has already been introduced in this course — pattern choice (Lesson 11), idempotency (Lesson 15), retry and dead-letter handling (Lesson 16), governance (Lesson 17), monitoring (Lesson 18), limits (Lesson 19), and versioning (Lesson 20). This lesson's job is to turn that scattered knowledge into a single, repeatable review checklist an architect actually uses when a team proposes a new integration — the practical skill Chapter 4 is built around, and the direct precursor to the formal review-board practice in Lesson 27.

## A working review checklist

- **Pattern fit.** Does the proposed design's pattern (point-to-point vs. middleware, synchronous vs. asynchronous, fire-and-forget vs. request-reply) actually match the four-question analysis from Lesson 11 — or was the pattern chosen out of habit?
- **Volume and limits.** Has anyone calculated expected volume against Salesforce's actual governor limits and API allocation (Lesson 19) for this org, rather than assuming it'll be fine?
- **Failure semantics.** Is the core operation idempotent, or does it have an idempotency key if not naturally idempotent (Lesson 15)? Does the retry strategy use backoff and jitter rather than naive immediate retry (Lesson 16)? Is there a defined dead-letter destination once retries are exhausted?
- **Interface contract.** Is there an explicit, documented interface — field names, required fields, error response shape — agreed on by both sides, or is one side assuming the other will "figure it out" (the no-agreed-error-contract failure mode from Lesson 2)?
- **Security and credentials.** Are credentials handled through a Named Credential (Lesson 9) rather than hard-coded, and is access scoped to what this specific integration actually needs?
- **Monitoring.** Will this integration's volume, latency, error rate, and (if asynchronous) backlog depth actually be visible somewhere (Lesson 18), or will the first sign of trouble be a business user noticing something's missing?
- **Governance fit.** Will this integration be added to the org's integration inventory with a named owner (Lesson 17), or will it join the pile of undocumented connections nobody will remember exists in two years?
- **Versioning exposure.** If this integration calls an external API, does that provider have a real deprecation policy (Lesson 20), and is the integration pinned to a specific, intentional version rather than an implicit "whatever's latest" that could silently change underneath it?

## A worked review

A team proposes: a synchronous Apex trigger fires on every Opportunity update, calling an external analytics platform's API to log the change, with no retry logic, no idempotency consideration, hard-coded API credentials in the Apex class, and no plan to document the integration anywhere. Running this through the checklist surfaces several real problems at once: pattern fit fails, because logging an analytics event has no business reason to block the Opportunity-saving transaction (this should be fire-and-forget, likely via a Platform Event, not a synchronous callout); failure semantics fail, because there's no retry strategy and no idempotency plan, so a transient failure either silently drops the log entry or, if retried naively, could double-log it; security fails, because hard-coded credentials can't be rotated without a code deployment; and governance fails outright, since nothing about this integration will be inventoried or owned. A real review catches all four problems before a single line of this gets deployed, each one traceable to a specific checklist item and a specific earlier lesson.

## Review earlier is cheaper than review later

Every problem the worked example surfaced is far cheaper to fix on a whiteboard than after the trigger is live, has been running for six months, and a production incident forces an emergency redesign under pressure. This is the core argument for Lesson 11's point that pattern and design decisions belong to the architecture phase: a checklist like this one is only valuable if it's actually run before implementation, not treated as a post-incident retrospective exercise.

## Key terms

| Term | Meaning |
|---|---|
| Integration architecture review | A structured evaluation of a proposed integration design against pattern fit, limits, failure handling, security, monitoring, and governance |
| Interface contract | The explicit, documented agreement between two systems on field names, required fields, and error responses |

## Lab

Apply this lesson's full checklist to a proposed design: a nightly Batch Apex job calls an external vendor's REST API once per record (expected 80,000 records a night) to sync inventory counts, with a fixed 3-second retry delay on failure and no cap on retry attempts, and the vendor's API has no published deprecation policy. Walk through each of the eight checklist items and identify every item this design fails, citing the specific lesson each failure connects back to.

## Check yourself

Can you list all eight checklist categories from this lesson without looking back? Can you explain why running this checklist during the architecture phase is more valuable than running it after an integration has already shipped?
