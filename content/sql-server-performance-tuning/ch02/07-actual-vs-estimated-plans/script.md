# Script — Actual vs. Estimated Plans

## Segment 1 (title)

Lesson 6 read a plan's shape. This lesson focuses on one number pair inside that shape — estimated rows versus actual rows — and why a large gap between them is one of the most reliable diagnostic signals in tuning.

## Segment 2 (code: two different plans, one query)

The estimated plan is a guess, compiled from statistics, without ever running the query. The actual plan requires running it, and includes real row counts, real execution counts, and per-operator time since SQL Server 2016.

## Segment 3 (code: script-based equivalents)

SET STATISTICS PROFILE or STATISTICS XML give you script-based equivalents of the actual plan — the same underlying data SSMS's graphical actual-plan view is built from.

## Segment 4 (steps: reading the mismatch)

When estimated and actual rows are close, trust the rest of the plan's decisions. When an estimate of 12 rows meets an actual of 1.2 million, the optimizer built its whole plan around a wrong picture of the data.

## Segment 5 (outro)

The two usual root causes are stale statistics and parameter sniffing — and telling them apart matters, because the fix is completely different. Next up: the specific operators worth watching for once you've found the mismatch.
