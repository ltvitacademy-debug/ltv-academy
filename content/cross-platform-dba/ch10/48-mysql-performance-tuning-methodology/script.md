# Script — MySQL Performance Tuning Methodology

## Segment 1 (title)

The performance tuning discipline built across this path doesn't reset for MySQL: measure before you guess, identify the actual bottleneck, make one change, verify it helped. What changes is the instrumentation — MySQL surfaces its own real data through its own real tools.

## Segment 2 (code: guessing isn't tuning)

Jumping straight to a fix without measuring first is guessing, and it's exactly as dangerous on MySQL as it was on SQL Server. An added index speeds up one query's reads while slowing down every write to that table — without measurement you won't know you traded a bigger problem for a smaller one.

## Segment 3 (steps: the loop)

The loop is measure, identify, change, verify. Capture what's actually happening, find the specific bottleneck, make one targeted change, then re-measure the same thing with the same tool to confirm it actually helped — not just that it feels faster.

## Segment 4 (code: MySQL's real toolset)

MySQL's real toolset for this loop includes the slow query log for finding what's actually slow, EXPLAIN for understanding why, Performance Schema and the sys schema for deeper instrumentation, and SHOW GLOBAL STATUS for quick health counters.

## Segment 5 (outro)

This loop is identical in shape to SQL Server tuning — MySQL's instrumentation is where it genuinely differs. Next up: reading MySQL EXPLAIN plans, turning a slow query into a specific, actionable diagnosis.
