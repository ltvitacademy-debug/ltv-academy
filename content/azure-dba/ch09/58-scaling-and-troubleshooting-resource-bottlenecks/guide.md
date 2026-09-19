# Lesson 58 — Scaling Compute/Storage & Troubleshooting Resource Bottlenecks

**Chapter 9 · Database Performance & Maintenance · Lesson 58 of 95**

## What you'll learn

- The three real bottleneck categories: CPU-bound, IO-bound, memory-bound
- The DMVs and metrics that tell you which one you actually have
- Why scaling compute fixes some bottlenecks and does nothing for others
- How this lesson closes out Chapter 9, and what Chapter 10 automates next

## Scaling is not a diagnosis

"The database feels slow" is not a bottleneck category — it's a
symptom that could come from three genuinely different resource
constraints, and each one has a different fix. Scaling compute
(more vCores, a higher DTU tier) throws money and capacity at the
problem without first asking *which* resource is actually exhausted.
Sometimes that's the right call. Often it just makes an underlying
query-design problem more expensive to keep ignoring.

## CPU-bound

Signs: high `signal_wait_time_ms` relative to total wait time in
`sys.dm_os_wait_stats`, sustained high CPU in Azure Monitor metrics,
and query plans with expensive operators (sorts, hash joins, scalar
UDFs called row-by-row) running constantly.

```sql
SELECT wait_type, wait_time_ms, signal_wait_time_ms
FROM sys.dm_os_wait_stats
ORDER BY signal_wait_time_ms DESC;
```

A high signal wait relative to resource wait means queries are ready
to run and just waiting for a free CPU — that's genuinely CPU-bound.
Scaling to more vCores helps here, but so might fixing the plan that's
burning CPU needlessly (Chapter 8's territory) — check both before
assuming the fix is "bigger tier."

## IO-bound

Signs: high `PAGEIOLATCH_*` waits, high average disk latency in
Azure Monitor storage metrics, `sys.dm_io_virtual_file_stats` showing
long `io_stall` relative to reads/writes on specific files.

```sql
SELECT database_id, file_id, io_stall_read_ms, io_stall_write_ms,
       num_of_reads, num_of_writes
FROM sys.dm_io_virtual_file_stats(DB_ID(), NULL);
```

Scaling storage tier (or moving to a higher-IOPS configuration) helps
genuine IO-bound workloads. It does nothing for an IO problem caused
by a missing index forcing full scans instead of seeks — that's a
Chapter 8 problem wearing an IO-bound costume, and no amount of
storage scaling fixes a query reading ten million unnecessary rows.

## Memory-bound

Signs: high `RESOURCE_SEMAPHORE` waits (queries waiting for memory
grants), low buffer cache hit ratio, and plan cache churn from
constant recompiles competing for the same memory.

```sql
SELECT counter_name, cntr_value
FROM sys.dm_os_performance_counters
WHERE counter_name IN ('Buffer cache hit ratio', 'Page life expectancy');
```

A falling **page life expectancy** means pages are getting evicted
from cache faster than expected — either genuinely too little memory
for the working data set, or (again) a query pattern reading far more
data than it needs to, forcing constant cache churn.

## The pattern across all three

Every one of these bottleneck categories has the same fork: a
genuine resource shortage, where scaling actually helps, or a
query-design problem dressed up as a resource symptom, where scaling
just delays the real fix and raises the bill while doing it. The DMVs
above are how you tell which one you're looking at *before* reaching
for the scale-up button — not proof you never need to scale, but
proof you're scaling for the right reason.

## Chapter 9 close-out

Chapter 9 covered the maintenance and configuration work that keeps a
database healthy day to day: index and statistics maintenance,
integrity checking, database-scoped tuning, Resource Governor, and
now, telling a real bottleneck from a query problem before scaling.
Chapter 10, next, automates the parts of this you'd otherwise have to
remember to do by hand every week — SQL Server Agent jobs, schedules,
alerts, and the real troubleshooting that keeps automated maintenance
actually running.

## Key terms

| Term | Meaning |
|---|---|
| CPU-bound | High signal wait relative to total wait — queries ready, waiting on a free core |
| IO-bound | High `PAGEIOLATCH_*` waits or disk latency — storage is the constraint |
| Memory-bound | High `RESOURCE_SEMAPHORE` waits, falling page life expectancy |
| Query-design bottleneck | A resource symptom actually caused by a bad plan, not a real shortage |

## Check yourself

You're ready for Chapter 10 when you can explain, without looking: why
does scaling compute sometimes fail to fix a "resource bottleneck,"
and which DMVs would you check first to tell CPU-, IO-, and
memory-bound apart?
