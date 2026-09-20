# Script — Reading PostgreSQL EXPLAIN ANALYZE Plans

## Segment 1 (title)

EXPLAIN shows PostgreSQL's planned strategy without running the query. EXPLAIN ANALYZE
actually runs it and reports what really happened, next to what the planner estimated — and
that gap is often the most useful thing in the whole plan.

## Segment 2 (code: EXPLAIN ANALYZE output)

Each line shows a cost estimate in planner units, and with ANALYZE, an actual time and row
count. A Nested Loop's inner scan running once per outer row shows up right there as loops
equal to the outer row count.

## Segment 3 (steps: common operators)

Seq Scan reads every row. Index Scan jumps straight to matches. Nested Loop probes one side
per row from the other, efficient when the outer side is small. Hash Join builds an
in-memory hash table for larger, similarly-sized inputs.

## Segment 4 (outro)

When actual rows differs wildly from the estimate, that's usually stale statistics or a
misprediction, and it's often the real root cause behind a bad plan. Next up: PostgreSQL's
richer index type ecosystem.
