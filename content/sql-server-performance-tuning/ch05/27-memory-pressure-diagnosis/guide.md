# Memory Pressure Diagnosis

Memory pressure is quieter than CPU or I/O pressure — there's no single dramatic wait
type that screams "out of memory." Instead, it shows up as a slow erosion of a specific
performance counter and, when it gets severe, as queued memory-grant waits. This lesson
covers both signals.

## What you'll learn

- Page Life Expectancy (PLE) as the headline memory-health indicator
- Where to actually read PLE from, and why the DMV name is easy to get wrong
- `RESOURCE_SEMAPHORE` waits and what they mean for memory grants
- How buffer pool size vs. database size mismatch shows up in practice

## Page Life Expectancy: how long a page survives in the buffer pool

Page Life Expectancy is the average number of seconds a data page stays in the buffer
pool before being evicted to make room for another page. Read it from the performance-
counter DMV (not, despite the name similarity, from a wait-stats DMV):

```sql
SELECT object_name, counter_name, cntr_value AS ple_seconds
FROM sys.dm_os_performance_counters
WHERE object_name LIKE '%Buffer Manager%'
  AND counter_name = 'Page life expectancy';
```

A falling or consistently low PLE means pages are being evicted quickly — the buffer pool
is under pressure and doesn't have enough room to keep the working set in memory, so
SQL Server ends up re-reading from disk (which shows up as the `PAGEIOLATCH_*` waits from
Lesson 26) more often than it should.

## PLE thresholds: the old "300 seconds" rule is outdated

For years, "PLE below 300 seconds is bad" was the standard rule of thumb — but it dates
from an era of servers with a few gigabytes of RAM. On a modern server with a large
buffer pool, a PLE of 300 seconds would mean the *entire* buffer pool churns over every 5
minutes, which is a much more severe problem than the old rule implied. A commonly used
modern scaling guideline is roughly `(buffer pool size in GB / 4) * 300` seconds as a
rough healthy floor — the honest takeaway is that there's no single universal number;
PLE has to be judged against your specific buffer pool size and, more importantly,
against its own trend over time on that server. A sudden drop from a stable baseline
matters more than the absolute value.

## RESOURCE_SEMAPHORE: memory grants queuing up

Certain query operations (sorts, hash joins) request a chunk of memory — a memory grant
— before they can execute. When too many such requests compete for a limited memory-grant
pool, requests queue, and the waiting sessions accumulate the `RESOURCE_SEMAPHORE` wait
type:

```sql
SELECT wait_type, waiting_tasks_count, wait_time_ms, max_wait_time_ms
FROM sys.dm_os_wait_stats
WHERE wait_type = 'RESOURCE_SEMAPHORE';
```

A nonzero, growing `RESOURCE_SEMAPHORE` total means queries are stacking up waiting for
memory to become available for their grants — a much more acute symptom than a slowly
declining PLE, and one that directly stalls query execution rather than just adding
extra disk reads. Lesson 30 goes deep on memory grants specifically; here, it's enough to
recognize `RESOURCE_SEMAPHORE` as the wait-stats-level signal that grants are contended.

## Buffer pool size vs. database size mismatch

The most straightforward form of memory pressure is simple: the buffer pool (bounded by
`max server memory` and physical RAM) is smaller than the active working set of the
databases it serves. This doesn't require the whole database to fit in memory — it
requires the *actively touched* portion to fit. A 500 GB database where daily queries
only ever touch a 20 GB "hot" slice can run comfortably in a much smaller buffer pool
than the raw database size suggests; the problem arises when the hot working set itself
exceeds available memory, which you can approximate by comparing PLE trends against
`sys.dm_os_buffer_descriptors` page counts per database, or more simply, by watching PLE
after a large ad hoc reporting query runs against cold data.

## Key terms

| Term | Meaning |
|---|---|
| Page Life Expectancy (PLE) | Average seconds a data page survives in the buffer pool before eviction, from `sys.dm_os_performance_counters` |
| `RESOURCE_SEMAPHORE` | Wait type recorded when a query's memory grant request is queued behind memory-grant contention |
| Memory grant | Memory reserved for a query operation (sort, hash join) before it can execute |
| Working set | The subset of a database's pages actually touched by the current workload |

## Check yourself

A server's PLE has been a stable 4,000 seconds for weeks, then drops to 800 seconds
right after a new nightly reporting job was added, and stays there. Per this lesson, is
800 seconds automatically "bad," and what's the more useful way to interpret this
specific drop?
