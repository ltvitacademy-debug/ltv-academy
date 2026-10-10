# Lesson 19 — Request and Reply, Fire and Forget, Batch Sync

**Chapter 4 · Patterns and Practice · Lesson 19 of 23**

## What you'll learn

- A deeper, scenario-grounded look at the three process/data-oriented patterns from Lesson 18
- Concrete Salesforce examples for each, tied to real governor-limit constraints from Chapters 1 and 3
- The specific risk each pattern carries if misapplied
- How to tell, from a requirement's wording, which of the three you're looking at
- Why these three specifically (not Remote Call-In or UI Update) recur the most in practice

## Request-Reply: the synchronous answer you can't proceed without

**Scenario:** a checkout flow needs a tax amount calculated by an external tax engine before the order can be saved with a final total. The user is waiting on screen; there's no sensible way to show them a total before the tax calculation returns.

**Implementation:** a synchronous Apex HTTP callout (Chapter 1) or a Flow HTTP Callout (Lesson 16), made *before* any DML that depends on the result — directly honoring the transaction-ordering rule from Lesson 7.

**Risk if misapplied:** because Request-Reply blocks the user's transaction until the remote system answers, a slow or flaky external tax engine directly becomes the checkout flow's own slowness. This pattern should be reserved for calls that are genuinely required before the next step can happen, and ideally to systems with a track record of fast, reliable responses — not used reflexively for anything that happens to need an external answer eventually.

## Fire and Forget: kick it off, don't wait

**Scenario:** when an Order is marked "Confirmed," a warehouse system should be notified so it can begin picking and packing. Salesforce doesn't need to wait for the warehouse's internal processing to finish — it just needs to successfully hand off the notification.

**Implementation:** `@future(callout=true)` for a simple one-shot handoff, or Queueable Apex (Chapter 3) when retry logic or chained follow-up work is needed, as in Lesson 6's retry pattern. Outbound Messaging (Lesson 16) is also a legitimate Fire and Forget implementation for SOAP-based legacy endpoints, since it hands off and moves on with its own built-in retry.

**Risk if misapplied:** because the caller doesn't wait for or inspect a detailed result, a Fire and Forget call can silently fail unnoticed unless you specifically build in result-checking (checking the async job's own outcome) and/or a callback mechanism for the remote system to report back later. "Fire and forget" should never mean "fire and never find out if it worked."

## Batch Data Synchronization: bulk, scheduled, not real-time

**Scenario:** a nightly reconciliation job compares every Account updated in the last 24 hours against an ERP's customer master data, resolving discrepancies in bulk rather than reacting to each individual change as it happens.

**Implementation:** Batch Apex (`Database.Batchable<sObject>`) for the scoped-chunk processing, kicked off by Scheduled Apex on a cron-like timer (both from Lesson 13). Each `execute` chunk gets its own fresh governor limits, which is exactly why Batch Apex — not a single synchronous transaction — is the right tool for volumes too large to process in one pass.

**Risk if misapplied:** Batch Sync trades real-time accuracy for throughput and reliability at scale. If a requirement actually needs near-instant consistency between systems (like inventory availability at checkout), Batch Sync's nightly or hourly cadence will produce stale, wrong answers exactly when it matters most — that's a sign the requirement is actually Request-Reply or event-driven, not Batch Sync.

## Spotting the pattern from the requirement's own wording

A practical tell: words like "before," "needs the result to," or "can't proceed without" point to Request-Reply. Words like "notify," "kick off," or "doesn't need to wait" point to Fire and Forget. Words like "nightly," "reconcile," or "in bulk" point to Batch Sync. Learning to hear these cues in a stakeholder's own description of a requirement — before you've written a line of code — is a core Technical Architect skill.

## Key terms

| Term | Meaning |
|---|---|
| Request-Reply | Synchronous call-and-wait, used when the next step depends on the answer |
| Fire and Forget | Asynchronous handoff with no wait for completion, risking silent failure if unmonitored |
| Batch Data Synchronization | Bulk, scheduled sync trading real-time accuracy for throughput at scale |
| Pattern-spotting cues | Specific wording in a requirement that signals which pattern actually fits |

## Lab

Take the four requirements from Lesson 18's Lab and, for each, write one or two sentences identifying the specific wording (per the "spotting the pattern" section above) that told you which pattern fit. Then pick one of the three patterns in this lesson and write a short paragraph describing a real risk scenario where misapplying that specific pattern to the wrong requirement would cause a visible production problem.

## Check yourself

For each of the three patterns in this lesson, state its defining scenario trait and its specific risk if misapplied, without looking back. Then give one wording cue that would tip you off to each pattern in a stakeholder's requirement description.
