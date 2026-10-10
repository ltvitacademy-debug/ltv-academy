# Lesson 8 — Record Locking and Lock Contention

**Chapter 2 · Skew and Locking · Lesson 8 of 16**

## What you'll learn

- Why Salesforce locks records at all, and what a lock is actually protecting
- How parent skew (Lesson 7) directly causes lock contention during updates
- What happens, mechanically, when a transaction can't get a lock it needs
- The difference between a lock timeout and a lock failure that's never retried automatically

## What a record lock protects

Salesforce locks a record for the duration of a transaction that's modifying it, to guarantee that two concurrent transactions can't both change the same record (or its related records, where locking cascades to a parent) in ways that would corrupt data or produce an inconsistent result — the same basic guarantee most transactional databases provide. For most day-to-day usage this is invisible: a user editing a record briefly locks it, releases the lock when the transaction finishes, and the next transaction proceeds normally.

The behavior becomes visible, and painful, specifically under concentrated write load — which is exactly what parent skew and ownership skew (Lesson 7) produce. Certain operations on a child record require briefly locking its parent, so that the platform can safely evaluate sharing or update aggregate data tied to the parent. That's a reasonable cost when child records are spread across many different parents, because different transactions are locking different parents and rarely collide. It becomes a real bottleneck when tens of thousands of child records sit under one parent, because now a large share of concurrent transactions are all trying to lock the *same* parent at the *same* time.

## What happens when a lock can't be acquired

When a transaction needs a lock that's currently held by another in-flight transaction, it doesn't fail instantly. The platform waits a short period for the lock to be released. If the lock is released in time, the waiting transaction proceeds normally — this is the common case, and it's why moderate skew doesn't necessarily cause visible failures, just a bit of extra latency. If the wait period expires and the lock still hasn't been released, the operation fails with a lock-related error, commonly surfaced as `UNABLE_TO_LOCK_ROW`.

A critical detail for anyone running bulk data loads: a record that fails because of a lock timeout is **not automatically retried as part of the same batch**. It's marked failed and has to be resubmitted — either by re-running the failed records in a separate batch, or by whatever retry logic the integration or data-load tool provides. This is different from how the platform handles a batch that keeps failing for other reasons, where the job itself may be requeued a limited number of times before being marked permanently failed — a lock timeout on an individual record is specifically the kind of failure that needs its own explicit resubmission.

## Why bulk updates expose this more than everyday usage

Everyday, one-record-at-a-time usage rarely surfaces lock contention, because the odds of two users simultaneously editing children of the exact same heavily-skewed parent, at the exact same moment, are low. Bulk data loads change that math completely: a load processing thousands of records per minute, where a meaningful share of those records share a handful of heavily-skewed parents, creates exactly the concentrated, simultaneous contention that triggers lock failures at scale. This is why record locking gets treated as a Large Data Volumes topic specifically — it's not that locking behaves differently at scale, it's that skewed data at scale creates far more opportunities for the same, ordinary locking behavior to collide.

## The fix starts with the cause, not the symptom

Because lock contention is a downstream effect of skew, the most durable fix is addressing the skew itself where possible — redistributing ownership, splitting an overloaded parent's children across multiple parents where the business model allows it. Where the skew can't be eliminated (a genuinely large key account, a necessary integration-owned bucket of records), the next lesson covers how to restructure the *load itself* — sequencing, batching, and processing-mode choices — to reduce how often concurrent transactions actually collide on the same lock, rather than trying to eliminate the skew that's causing the contention.

## Key terms

| Term | Meaning |
|---|---|
| Record lock | A temporary hold Salesforce places on a record during a transaction to prevent concurrent, conflicting changes |
| Lock contention | Multiple transactions competing for the same record's lock at the same time |
| UNABLE_TO_LOCK_ROW | The common error surfaced when a transaction's lock wait period expires before the needed lock is released |
| Lock timeout | The short wait period a transaction gets before it gives up on acquiring a currently-held lock |

## Lab

A nightly batch job updates 50,000 Opportunity records belonging to one heavily-skewed Account (120,000 total child records). The job fails intermittently with `UNABLE_TO_LOCK_ROW` errors on roughly 3% of records each run. Explain, mechanically, why this specific error is happening given what you know about parent skew and locking. Then explain why simply re-running the exact same batch immediately is unlikely to fully solve the problem, even though the failed records themselves are valid and were not corrupted.

## Check yourself

Can you explain, in your own words, what a record lock is protecting against, and why parent skew specifically makes lock contention worse? Can you describe what happens, step by step, when a transaction can't acquire a lock it needs within the timeout window?
