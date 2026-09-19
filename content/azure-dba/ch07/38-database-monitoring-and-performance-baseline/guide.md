# Lesson 38 — Understanding Database Monitoring & Creating a Performance Baseline

**Chapter 7 · Monitoring Azure SQL · Lesson 38 of 95**

## What you'll learn

- Why "monitoring" for a DBA means something more specific than just watching a dashboard
- Why you can't recognize abnormal without first knowing normal
- The three things a real performance baseline captures
- When and how often to re-establish a baseline

## Monitoring means comparing against something

Every dashboard in the Azure portal will show you a number — today's CPU is
62%, today's average query duration is 40ms. On its own, a number tells you
nothing. Is 62% CPU high for this database? Is 40ms slow for this query?
You cannot answer either question without already knowing what this
database's CPU and query durations normally look like. That known-normal
is the **performance baseline**, and it is the single most important thing
a DBA builds before anything goes wrong — not after.

Without one, every incident starts with a guess. With one, an incident
starts with a comparison: "CPU is at 95% right now, and this database
normally sits at 60-70% during business hours — something changed."

## What a baseline actually captures

A real baseline is not one number — it's a profile, usually captured over
at least a full business cycle (a week, ideally including a month-end or
other known-heavy period) so it reflects normal variation, not a lucky
quiet Tuesday.

| Category | What to capture | Why it matters |
|---|---|---|
| Resource consumption | Typical CPU% and DTU or vCore utilization, by hour and by day of week | Distinguishes "this is Monday morning batch load" from "this is a leak" |
| Query duration percentiles | p50, p95, p99 duration for the workload's key queries — not just the average | Averages hide the slow tail; p99 is what your angriest user actually experiences |
| Wait statistics | The top wait types and their relative share of total wait time, over the same window | Tells you *what kind* of bottleneck is normal here — I/O-bound vs CPU-bound vs blocking-bound — before you're troubleshooting one at 2 a.m. |

Percentiles matter more than averages for query duration specifically
because a handful of very slow outlier executions can sit inside an
otherwise fine-looking average. A query averaging 50ms with a p99 of
4 seconds is a very different problem than a query steadily at 50ms.

## When to re-baseline

A baseline goes stale the moment the workload changes underneath it — a
new feature ships, a marketing campaign doubles traffic, a table crosses
a size threshold where a plan the optimizer used to pick stops being
chosen. Re-establish the baseline after any of those events, and treat a
baseline older than a quarter with some suspicion even if nothing obvious
changed.

## Key terms

| Term | Meaning |
|---|---|
| Performance baseline | A captured profile of normal resource usage, query duration, and wait statistics for a specific database, used as the comparison point during troubleshooting |
| Percentile (p50/p95/p99) | The duration below which that percentage of executions fall — p99 shows the slow tail an average hides |
| Wait statistics | The accumulated time SQL Server spent waiting on specific resource types while executing queries |

## Check yourself

You're ready for Lesson 39 when you can explain: why is "CPU is at 95%"
meaningless on its own, and what three categories of data does a real
baseline need to capture to make that number meaningful?
