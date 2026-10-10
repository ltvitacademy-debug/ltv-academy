# Lesson 11 — Asynchronous Limits

**Chapter 2 · Working With Async Jobs · Lesson 11 of 16**

## What you'll learn

- The shared, org-wide daily limit on asynchronous Apex executions, and what counts against it
- The per-transaction limits that differ between synchronous and asynchronous contexts
- The concurrency caps specific to each of the four asynchronous tools
- How to check limit consumption at runtime with the `Limits` class

## One shared daily pool for all async Apex

Every future method call, Queueable job execution, Batch Apex chunk, and Scheduled Apex run draws from the **same org-wide daily limit**: **250,000 asynchronous Apex method executions per 24-hour period, or the number of user licenses in the org multiplied by 200 — whichever is greater.** This is a shared pool across all four tools combined, not a separate 250,000 for each one. A runaway Queueable chain (Lesson 7) or an oversized Batch Apex job can consume enough of this pool to affect every other asynchronous process in the org for the rest of the day. When the daily limit is exceeded, the platform doesn't simply reject further jobs outright — it throttles additional asynchronous work to roughly one concurrent job per asynchronous Apex type until the 24-hour window resets.

## Per-transaction limits: synchronous vs. asynchronous

Several core per-transaction governor limits are deliberately **higher inside an asynchronous transaction** than inside a synchronous one, since async transactions are expected to do heavier work:

| Limit | Synchronous | Asynchronous |
|---|---|---|
| SOQL queries issued | 100 | 200 |
| Heap size | 6 MB | 12 MB |
| Total records retrieved by SOQL | 50,000 | 50,000 |
| Records retrieved by `Database.getQueryLocator` | 10,000 | 10,000 |
| DML statements | 150 | 150 |
| Callouts per transaction | 100 (cumulative timeout 120 seconds) | 100 (cumulative timeout 120 seconds) |

Doubling the SOQL query and heap-size allowances is exactly why asynchronous Apex is the right tool for work too large to fit a synchronous transaction's budget (Lesson 2) — but notice the limits that **don't** double, like DML statements and total records retrieved. Asynchronous Apex gives you more room, not unlimited room.

## Per-tool concurrency caps

Beyond the shared daily pool and the per-transaction table above, each tool has its own specific ceiling:

- **Future methods**: maximum 50 future method calls queued per Apex invocation. A future method cannot invoke another future method.
- **Queueable Apex**: maximum 50 `System.enqueueJob` calls per transaction when called synchronously; only 1 when called from an already-asynchronous context.
- **Scheduled Apex**: maximum 100 scheduled Apex jobs active in the org at any one time.

## Checking consumption at runtime with `Limits`

The `Limits` class exposes methods to check how much of a given limit the current transaction has already used, which lets code defensively check before doing more work rather than finding out by hitting an exception:

```apex
System.debug('Queueable jobs enqueued so far: ' + Limits.getQueueableJobs());
System.debug('SOQL queries used: ' + Limits.getQueries() + ' of ' + Limits.getLimitQueries());
System.debug('Async calls (future methods) used: ' + Limits.getAsyncCalls() + ' of ' + Limits.getLimitAsyncCalls());
```

`Limits.getQueueableJobs()` was introduced in Lesson 4; `Limits.getAsyncCalls()` and `Limits.getLimitAsyncCalls()` give the same kind of check specifically for future method invocations within the current transaction.

## Designing with a limits budget in mind

The practical lesson underneath all these numbers: asynchronous Apex removes some restrictions (callouts from otherwise-restricted contexts, mixed DML, processing volume) but it does not remove governor limits altogether. Every design — a Queueable chain, a Batch Apex job's chunk size, a Scheduled Apex job that fires nightly — needs to be sized against this lesson's numbers, not against an assumption that "asynchronous" means "unlimited."

## Key terms

| Term | Meaning |
|---|---|
| Shared daily async limit | 250,000 async executions per 24 hours, or licenses × 200, whichever is greater — shared across all four tools |
| Async SOQL/heap allowance | Higher per-transaction SOQL query count (200) and heap size (12 MB) than synchronous (100 / 6 MB) |
| Scheduled job concurrency cap | Maximum 100 scheduled Apex jobs active at once |
| `Limits` class | Exposes methods like `getQueueableJobs()` and `getAsyncCalls()` to check usage at runtime |

## Lab

A client has an org with 150 user licenses. Calculate their shared daily asynchronous Apex execution limit using the rule from this lesson (250,000, or licenses × 200, whichever is greater), and show your arithmetic. Then write a short design note: if this client's nightly Batch Apex job alone needs roughly 40,000 asynchronous executions, what fraction of the daily pool does that consume, and what would you tell them about adding a second large Queueable-chain-driven process to the same org?

## Check yourself

Can you state the shared daily asynchronous Apex execution limit formula from memory? Can you name at least two per-transaction limits that are higher in an asynchronous context than a synchronous one, and two that stay the same?
