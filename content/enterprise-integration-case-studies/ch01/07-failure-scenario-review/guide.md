# Lesson 7 — Failure Scenario Review

**Chapter 1 · Enterprise Integration Case Studies · Lesson 7 of 20**

## What you'll learn

- How to do root-cause analysis on an integration failure instead of just patching the symptom
- A recognized real-world failure mode: synchronous callouts under load stalling Salesforce transaction threads
- How a missing or misused External ID produces silent duplicate records
- Why a bidirectional sync without loop protection can turn a single update into an infinite update cycle

## Three failures, one landscape

Doverfield's integration landscape from Lessons 1-6 has been running for six months. None of it failed all at once — each of these three incidents happened separately, months apart, and each one traces back to a specific design decision from earlier lessons, not bad luck.

## Failure 1: the ERP outage that stalled Salesforce itself

During a seasonal sales surge, Doverfield's ERP slowed down under its own load. Reps trying to close Opportunities started seeing their saves hang and time out — not because anything was wrong with Salesforce, but because the Opportunity-close trigger from Lesson 1's early design made a **synchronous** callout to check inventory before allowing the close, and that callout was now waiting on a slow ERP. As more reps tried to close deals simultaneously, more transaction threads sat blocked waiting on the same slow dependency, and the org as a whole degraded for everyone — including people doing nothing related to the ERP at all. This is a documented, recognized failure pattern in real Salesforce integration incidents: a surge of synchronous callouts to a struggling external system backing up and locking Salesforce transaction threads.

**Root cause**: a synchronous, blocking dependency was placed on the critical path of a common, high-frequency user action. **Fix**: move the inventory check off the synchronous close path — either accept a slightly stale cached inventory number updated by a scheduled job, or move the live check to a point in the flow where a timeout degrades gracefully (e.g., showing "inventory check unavailable" rather than blocking the close) instead of hanging the save itself.

## Failure 2: duplicate ERP customer records

Doverfield's warehouse team noticed the same customer appearing twice in reconciliation reports, once under slightly different name casing. Investigation found that an early version of the ERP sync, built before Lesson 1's External ID discipline was formalized, matched records by customer name as a shortcut during a rushed go-live. A customer whose name was entered with different capitalization in the ERP than in Salesforce didn't match, so the sync created a second record instead of updating the first.

**Root cause**: matching logic relying on a non-stable, human-entered field instead of a dedicated External ID. **Fix**: backfill a proper External ID field on both sides using each system's actual stable key, run a one-time deduplication pass to merge the records the bad matching already created, and remove the name-based matching path entirely so it can't recreate the problem.

## Failure 3: the sync loop

Doverfield later added a second, return-direction sync so that ERP-side customer-address corrections would flow back into Salesforce. Shortly after launch, a support rep noticed an Account's Last Modified timestamp updating every few minutes with no one touching it. The Salesforce-to-ERP sync (Lesson 1) and the new ERP-to-Salesforce sync were both configured to fire on "record changed," with no check for whether the change had actually originated from the other side of the sync — so a Salesforce update triggered a sync to the ERP, which triggered the ERP's own "record changed" sync back to Salesforce, which re-triggered the first sync again, in a loop that never naturally stopped.

**Root cause**: a bidirectional sync with no loop-prevention mechanism. **Fix**: a well-known pattern for exactly this problem is tagging sync-originated updates (e.g., a "last changed by sync" flag or a dedicated integration user whose changes are excluded from re-triggering the opposite-direction sync) so each side can recognize and skip a change it only just caused itself.

## Key terms

| Term | Meaning |
|---|---|
| Root cause | The actual underlying design decision that produced a failure, as distinct from its visible symptom |
| Blocking dependency | A synchronous call that holds a transaction open while waiting on an external system's response |
| Loop prevention | A mechanism that lets a bidirectional sync recognize and skip a change it only just caused on the other side |

## Lab

Pick one of the three failures above and write a short incident postmortem: what the symptom looked like to an end user, what the actual root cause was, what immediate mitigation would stop the bleeding that day, and what structural fix (not just a patch) would prevent the same category of failure from recurring elsewhere in Doverfield's landscape.

## Check yourself

Can you explain, for each of the three failures, the specific design decision from an earlier lesson that caused it? Can you distinguish, in your own words, an immediate mitigation from a structural fix for at least one of these failures?
