# Lesson 23 — Adaptive Query Execution

**Chapter 5 · Performance at Scale · Lesson 23 of 34**

## What you'll learn

- Why Spark's upfront query plan is a guess, not a guarantee
- Dynamic partition coalescing — fixing too-many-tiny-partitions after the fact
- Join strategy switching — changing the join algorithm mid-query
- Skew join handling — splitting the one partition that's wrecking everything else

## The upfront plan is a guess

Spark's query planner picks a physical plan — how to join, how many
shuffle partitions to use — **before the query runs**, based on
table statistics that are often stale, incomplete, or simply wrong
for a filtered subquery. Adaptive Query Execution (AQE) doesn't
trust that upfront guess all the way through. It re-optimizes the
plan using real, measured statistics from completed stages, at
runtime, while the same query is still running.

```text
spark.sql.adaptive.enabled = true
-- on by default in Databricks Runtime
```

## Dynamic partition coalescing

A shuffle (from a `GROUP BY` or a join) is planned with a fixed
number of output partitions, set upfront. If the actual data after
filtering is much smaller than the planner assumed, that produces a
pile of tiny, mostly-empty partitions — each one still costs a task,
with per-task overhead dwarfing the actual work.

```text
Before AQE:  200 shuffle partitions planned, most nearly empty
             after a WHERE clause filtered out 95% of the rows

After AQE:   actual partition sizes measured post-shuffle,
             tiny ones merged into a handful of right-sized
             partitions -- fewer tasks, less overhead
```

## Join strategy switching

The planner has to pick a join algorithm before it knows the real
size of either side. AQE can switch a planned sort-merge join to a
broadcast join **after the shuffle**, once the actual size of one
side turns out small enough to broadcast — a strategy the upfront
plan couldn't safely choose without real numbers.

```text
Planned (upfront, on estimated stats):  sort-merge join
Actual (after shuffle, real stats):     one side is only 40MB
AQE switches to:                        broadcast join
                                         -- avoids the full shuffle-based join entirely
```

## Skew join handling

Real data is rarely evenly distributed. One customer ID, one date,
one region can dominate a table, producing one shuffle partition
many times larger than the rest — that single oversized partition
becomes a straggler task that the whole job waits on, no matter how
many other cores sit idle.

```text
Without skew handling:  1 partition has 50x the rows of the others
                         -- 1 task runs for an hour while every
                            other task finished in a minute

With AQE skew handling: that oversized partition is split into
                         several smaller sub-partitions, processed
                         in parallel across multiple tasks instead
                         of one
```

This is the direct answer to a problem Lesson 25 raises again from
the cluster-sizing side: adding more nodes doesn't fix a skewed
partition, because one task still can't be split across nodes on
its own — AQE's skew handling is what actually splits the work,
not more hardware.

## Key terms

| Term | Meaning |
|---|---|
| Adaptive Query Execution (AQE) | Re-optimizing a Spark query plan at runtime using real, measured statistics |
| Partition coalescing | Merging too-many-tiny post-shuffle partitions into fewer, right-sized ones |
| Skew join handling | Splitting one disproportionately large partition into smaller sub-partitions |

## Check yourself

You're ready for Lesson 24 when you can explain, without looking: why
can AQE switch a sort-merge join to a broadcast join mid-query, when
the upfront planner couldn't make that same choice?
