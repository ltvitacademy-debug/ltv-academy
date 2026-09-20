# Hardware Considerations

Every tuning technique in this course — query rewrites, indexes, wait analysis,
configuration — assumes some underlying hardware. This lesson closes Chapter 8, and the
configuration half of the course, by looking directly at that hardware: what actually
matters about it for SQL Server performance, and where the real tradeoffs sit.

## What you'll learn

- NUMA awareness: what it means for SQL Server, and why it's already largely automatic
- Why storage latency, not just throughput, is the number that matters for OLTP
- The real tradeoff between CPU core count and SQL Server licensing cost

## NUMA: SQL Server already accounts for it, mostly automatically

**NUMA (Non-Uniform Memory Access)** describes multi-socket servers where each CPU socket
has its own local bank of memory; a CPU can access its own local memory quickly, but
reaching across to another socket's memory is slower. SQL Server's scheduler is NUMA-aware
by default — it tries to keep a session's worker threads and memory access on the same
NUMA node whenever possible, without any configuration required. This matters mostly as
*context* for other lessons: Lesson 31 covered reading Page Life Expectancy per NUMA node
specifically because instance-wide PLE can hide one node under real pressure while the
rest look fine. There isn't a single `sp_configure` switch that "turns on" NUMA awareness
— it's built into the scheduler — but **soft-NUMA** (splitting one large physical node into
multiple smaller logical nodes) is a real, if narrow, tuning lever on servers with very
high core counts and heavy `tempdb`/latch contention that per-node scheduling helps spread
out.

## Storage latency: the number that actually predicts OLTP pain

Storage vendors advertise throughput (MB/sec) and IOPS, but for an OLTP workload doing many
small, random reads and writes, **latency per I/O** — how long a single read or write
request takes to complete — is the number that actually predicts user-visible pain, more
than raw throughput does. A spinning disk's latency is dominated by mechanical seek time;
an SSD's latency is meaningfully lower because there's no physical seek at all. This is
exactly why `PAGEIOLATCH_*` waits (Lesson 26) are worth watching specifically for their
*average wait time per wait*, not just total wait time — a high total with a low per-wait
average points somewhere else entirely; a high per-wait average against storage is a real
sign the underlying storage's actual latency, not just its labeled throughput spec, is the
bottleneck.

```sql
SELECT wait_type, waiting_tasks_count, wait_time_ms,
       wait_time_ms * 1.0 / waiting_tasks_count AS avg_wait_ms
FROM sys.dm_os_wait_stats
WHERE wait_type LIKE 'PAGEIOLATCH%' AND waiting_tasks_count > 0;
```

## CPU core count vs. licensing: a real, non-technical tradeoff

More CPU cores mean more parallel query capacity — but SQL Server's per-core licensing
model means every additional physical core is a direct, ongoing cost, not a free
performance upgrade. This creates a genuine tradeoff that pure technical tuning can't
resolve on its own: a server with fewer, faster cores can be the more cost-effective choice
for a workload that's mostly single-threaded or only lightly parallel, while a workload
that's actually CPU-bound with real parallel headroom — something Chapter 5's wait analysis
would show directly, via high `SOS_SCHEDULER_YIELD` or `CXPACKET`/`CXCONSUMER` wait
patterns — might genuinely justify the extra licensed cores. The right call depends on
measuring the actual workload's parallelism, not on defaulting to "more cores is always
better" — the same discipline as everywhere else in this course, applied to a hardware
purchasing decision instead of a query.

## Key terms

| Term | Meaning |
|---|---|
| NUMA | Multi-socket architecture where each CPU has faster access to its own local memory bank |
| Soft-NUMA | Configuration splitting one large physical NUMA node into multiple smaller logical nodes |
| Latency (storage) | Time for a single I/O request to complete; the number that predicts OLTP pain, not raw throughput |
| Per-core licensing | SQL Server's licensing model charging by physical/virtual core, making core count a direct cost |

## Check yourself

A server shows high total `PAGEIOLATCH_SH` wait time, but the average wait time per wait
is low. Per this lesson, does that point primarily at storage latency being the bottleneck?
Why or why not — and what would a genuinely storage-latency-bound signature look like
instead?
