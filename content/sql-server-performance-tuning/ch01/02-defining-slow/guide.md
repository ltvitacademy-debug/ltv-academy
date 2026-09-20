# Defining "Slow"

"The report feels slow" is where every tuning request starts, and it's not yet something
you can act on. Before you touch anything, "slow" has to become a specific, measured
number — because different kinds of "slow" point to completely different problems, and
fixing the wrong one wastes time while the real bottleneck sits untouched.

## What you'll learn

- The difference between duration, CPU time, and logical reads — and why they can disagree
- Why "the database is slow" isn't a diagnosis, it's a symptom report
- How to turn a vague complaint into a specific, measurable target

## Duration, CPU time, and logical reads aren't the same number

Three metrics get lumped together as "how slow is this query," and they measure
genuinely different things:

- **Duration** (elapsed time) — the wall-clock time from when the query started to when
  it finished. This is what the user experiences, but it includes time spent *waiting* —
  for a lock, for disk I/O, for a parallel thread to catch up — not just time spent
  computing.
- **CPU time** — the time the processor actually spent executing the query. A query can
  have low CPU time and huge duration if it spent most of its life blocked on a lock or
  waiting on I/O. That gap between CPU time and duration is itself a diagnostic clue.
- **Logical reads** — the number of 8 KB pages the query pulled from the buffer pool
  (whether or not those pages required a physical disk read). This is the best proxy for
  "how much work did this query actually ask the engine to do," and it's usually the most
  stable number across runs — duration can swing wildly run to run depending on what else
  is happening on the server, but logical reads for the same plan against the same data
  barely change.

You get all three from the same place: run the query with `SET STATISTICS TIME, IO ON`,
or capture it from `sys.dm_exec_query_stats` / Query Store, which track them per
execution.

```sql
SET STATISTICS TIME ON;
SET STATISTICS IO ON;

SELECT o.SalesOrderID, o.OrderDate, d.LineTotal
FROM Sales.SalesOrderHeader AS o
JOIN Sales.SalesOrderDetail AS d
  ON d.SalesOrderID = o.SalesOrderID
WHERE o.CustomerID = 29825;
```

The messages pane reports CPU time and elapsed time for parse/compile and execution, plus
logical reads, physical reads, and read-ahead reads per table touched.

## Why the gap between duration and CPU time matters

If duration is high but CPU time is low, the query isn't slow because it's doing too much
work — it's slow because it's *waiting* for something. That's a wait-based problem
(blocking, I/O latency, memory grant queuing — Chapter 5 goes deep on this), and no amount
of query rewriting or indexing fixes a lock wait. Conversely, if CPU time is high and
close to duration, the query is genuinely computationally expensive — that's where
indexing, rewriting, or reducing the row count actually pays off. Treating a waiting
problem as a computing problem (or vice versa) is one of the most common wasted-effort
patterns in tuning work.

## Turning a complaint into a target

"The report feels slow" needs to become something like: *"The monthly sales report,
executed with these parameters, took 14 seconds of duration, 2 seconds of CPU time, and
1.2 million logical reads, when the same report last month took 3 seconds."* That sentence
is a target you can chase — you know exactly what to measure before and after any change,
and you already have a clue (duration far exceeds CPU time) about where to look first.
Without that specificity, you're guessing at what "better" even means.

## Key terms

| Term | Meaning |
|---|---|
| Duration | Wall-clock elapsed time for a query, including any time spent waiting |
| CPU time | Time the processor actually spent executing the query, excluding waits |
| Logical reads | Count of 8 KB pages read from the buffer pool; the most stable "how much work" metric |
| STATISTICS TIME / IO | Session settings that report CPU/duration and read counts for each statement |

## Check yourself

A query has a duration of 8 seconds but a CPU time of only 200 milliseconds. What does
that gap suggest about where the problem likely lives, and what kind of fix (from this
lesson's categories) is *not* likely to help?
