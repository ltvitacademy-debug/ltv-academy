# Script — Adaptive Query Execution

## Segment 1 (title)

Spark's query planner picks a physical plan before the query runs, based on statistics that are often stale or just wrong for a filtered query. Adaptive Query Execution re-optimizes that plan at runtime, using real measured numbers instead of the upfront guess.

## Segment 2 (code: partition coalescing)

A shuffle plans a fixed number of output partitions upfront. If the real data turns out much smaller — say a WHERE clause filtered out 95% of it — that's a pile of tiny, nearly-empty partitions, each still costing a full task. AQE measures the real sizes after the shuffle and merges the tiny ones into a handful of right-sized partitions.

## Segment 3 (code: join strategy switching)

The planner has to pick a join algorithm before it knows either side's real size. AQE can switch a planned sort-merge join to a broadcast join after the shuffle, once one side turns out small enough — a choice the upfront plan couldn't safely make without real numbers.

## Segment 4 (code: skew join handling)

Real data is rarely even. One oversized partition can become a straggler task the whole job waits on, while every other core sits idle. AQE splits that one big partition into smaller sub-partitions that run in parallel instead — the direct fix for skew, and it's not something more cluster nodes can solve on their own.

## Segment 5 (outro)

Three runtime corrections: coalescing, join switching, skew splitting — all based on real numbers, not the upfront guess. Next up: caching, and which layer actually helps versus which one just wastes memory.
