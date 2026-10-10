# Lesson 13 — Batch Data Synchronization Patterns

**Chapter 2 · Integration Design · Lesson 13 of 28**

## What you'll learn

- What batch data synchronization is, and why volume alone makes it a fundamentally different problem than the per-record patterns covered so far
- Full sync vs. delta (incremental) sync, and why delta sync is almost always the better long-term choice
- Salesforce's Bulk API at a conceptual level: what it's for, and the real, current allocation figures an architect should verify before designing against them
- Common batch-sync failure modes: partial failures mid-batch, and why batch windows need headroom

## Batch sync: moving a lot of data, on a schedule, not a record at a time

**Batch data synchronization** moves data between systems in scheduled, large-volume chunks — nightly, hourly, or on some other fixed cadence — rather than reacting to each individual record change as it happens. It's the right pattern when Lesson 1's four questions point toward high volume and tolerant timing: a finance reconciliation that only needs yesterday's data by 6 a.m., a data warehouse load that aggregates the previous day's activity, or an initial data migration moving years of historical records into a new system before cutover.

## Full sync vs. delta sync

- **Full sync** re-sends every record in the dataset on every run, regardless of whether it changed. It's simple to reason about and tolerant of bugs in change-tracking (there's no change-tracking to get wrong, because everything is sent every time), but it gets expensive fast: a nightly full sync of a million-record table that only changes 2,000 rows a day is moving 998,000 unnecessary records every single night, straining both systems' processing capacity and the integration's runtime window for no benefit.
- **Delta (incremental) sync** sends only records that changed since the last successful run, tracked by a last-modified timestamp, a change-tracking table, or a mechanism like Change Data Capture (Lesson 7). Delta sync is almost always the better long-term choice once a dataset is large enough that full sync's unnecessary volume becomes a real cost — but it requires the sync process to reliably know what "changed since last time" means, including correctly handling a run that failed partway through and needs to resume from the right point rather than either skipping records or re-sending ones that already succeeded.

## Salesforce's Bulk API, conceptually, with real limits checked rather than assumed

Salesforce's **Bulk API** (and its newer Bulk API 2.0 interface) is purpose-built for exactly this pattern: rather than one API call per record, it accepts data as a job, splits the work into batches behind the scenes, and processes it asynchronously, checking back for status rather than holding a connection open. Per Salesforce's own Bulk API limits documentation, ingest jobs share a daily batch allocation, with each internal batch capped at 10,000 records, a per-upload file size cap of 150 MB, and a documented ceiling on total records processed across a rolling 24-hour period. These exact numbers vary across API versions and can change in future releases, so an architect sizing a batch-sync design against Bulk API should check Salesforce's current Bulk API limits page for the org's actual API version rather than designing against a number remembered from a prior project or an older course. What doesn't change version to version is the underlying design intent: Bulk API exists specifically so that moving very large record volumes doesn't require (or allow) the same per-record, synchronous call pattern that works fine at small scale and fails outright at large scale.

## Failure modes specific to batch sync

A batch job that fails partway through — say, record 340,000 of 500,000 hits a validation error — needs an explicit answer to "what happens to the other 499,999 records, and what happens on the next run." Some batch frameworks fail the whole job atomically; others process what they can and report which records failed, leaving the sync in a partially-applied state that the next run has to reconcile correctly. Neither answer is automatically right — it depends on whether partial application is acceptable for that specific dataset — but the sync design has to pick one explicitly rather than discover the behavior by accident during an incident. A second recurring failure mode is a batch window with no headroom: a nightly job sized to just barely finish in the available window works fine until data volume grows 20%, at which point it starts running past its window and colliding with the next scheduled job or the start of business hours.

## Key terms

| Term | Meaning |
|---|---|
| Batch data synchronization | Moving data between systems in scheduled, large-volume chunks rather than per-record in real time |
| Full sync | Re-sending every record in a dataset on every run, regardless of whether it changed |
| Delta (incremental) sync | Sending only records that changed since the last successful run |
| Bulk API | Salesforce's API purpose-built for large-volume, asynchronous, batch-oriented data movement |

## Lab

A retailer's nightly sync currently does a full sync of its 3-million-row product catalog to an external e-commerce platform every night, even though only a few hundred products actually change price or inventory on a typical day. The job now regularly runs past its overnight window into business hours. Recommend a redesign using delta sync, name what mechanism you'd use to track "what changed since last run," and describe one specific failure scenario your redesign needs to explicitly handle (a run that fails partway through) and what should happen on the next run as a result.

## Check yourself

Can you explain the trade-off between full sync and delta sync in your own words, including why delta sync requires more careful failure-handling design? Can you explain why this lesson tells you to check Salesforce's current Bulk API limits page rather than memorize a specific number from this lesson?
