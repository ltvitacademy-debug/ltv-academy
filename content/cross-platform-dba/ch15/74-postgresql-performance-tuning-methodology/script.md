# Script — PostgreSQL Performance Tuning Methodology

## Segment 1 (title)

Every platform in this path has used the same discipline for performance work: measure
first, identify the real bottleneck, make one change, then verify it helped. This chapter
applies that discipline to PostgreSQL, with PostgreSQL's own tools.

## Segment 2 (steps: measure, identify, change, verify)

The loop is four steps: measure what's actually slow using real data, identify the specific
cause, make one targeted change addressing that cause, and verify it actually helped
without breaking something else.

## Segment 3 (code: PostgreSQL's instruments)

PostgreSQL fills each step with its own instruments. EXPLAIN ANALYZE and pg_stat_statements
measure. Plan operators and pg_stat_activity identify the cause. Indexes, rewrites, and
parameters like work_mem are the change. Re-running EXPLAIN ANALYZE verifies it.

## Segment 4 (outro)

Skipping straight to a change — adding an index because it sounds advanced, bumping a
parameter because bigger sounds better — is exactly the trap this discipline prevents. Next
up: reading EXPLAIN ANALYZE output for real.
