# PostgreSQL Performance Tuning Methodology

Every platform in this path has used the same discipline for performance work: measure
first, identify the real bottleneck, make one change, then verify it actually helped. This
chapter applies that discipline to PostgreSQL — the methodology doesn't change, but the
tools you measure with are PostgreSQL's own.

## What you'll learn

- Why the measure-identify-change-verify loop still applies here
- The PostgreSQL-specific tools that fill each step of that loop
- Why guessing at a fix before measuring wastes time on every platform, not just this one

## The loop doesn't change — the instruments do

"Just add an index" or "just increase memory" is guessing, whether it's SQL Server or
PostgreSQL on the receiving end. The discipline that actually works is the same four-step
loop:

1. **Measure** — find out what's actually slow and by how much, using real data, not
   assumption.
2. **Identify** — trace the slow thing to a specific cause: a bad plan, a missing index, a
   lock wait, insufficient memory for a sort.
3. **Change** — make one targeted change addressing that specific cause.
4. **Verify** — measure again, confirm the change actually helped, and confirm it didn't
   make something else worse.

## PostgreSQL's tools for each step

- **Measure**: `EXPLAIN ANALYZE` shows real execution time and row counts for one query;
  `pg_stat_statements` (covered later in this chapter) aggregates execution statistics
  across every query PostgreSQL has run, so you find your worst offenders instead of
  guessing which query to look at.
- **Identify**: `EXPLAIN ANALYZE`'s plan output shows exactly which operator is expensive —
  a sequential scan on a large table, a nested loop that should be a hash join, a sort
  spilling to disk. `pg_stat_activity` shows what's running right now, including anything
  waiting on a lock.
- **Change**: an index, a rewritten query, an updated `ANALYZE` of stale statistics, or a
  configuration parameter like `work_mem` — the later lessons in this chapter cover each of
  these on its own terms.
- **Verify**: re-run `EXPLAIN ANALYZE` on the same query and compare, or watch
  `pg_stat_statements` for the query's mean execution time trending down after the change.

## Why this matters before the tool-specific lessons

The rest of this chapter goes deep on `EXPLAIN ANALYZE`, PostgreSQL's index types, VACUUM
and bloat, `pg_stat_statements`, and configuration parameters. Each of those is a specific
instrument. Without the measure-first discipline holding them together, it's easy to
reach for the flashiest-looking tool — add a GIN index because it sounds advanced, bump
`shared_buffers` because bigger sounds better — without confirming there was ever a real
problem there to begin with. That's exactly the trap this discipline exists to prevent, on
PostgreSQL just as much as it did on SQL Server, Oracle, and MySQL earlier in this path.

## Key terms

| Term | Meaning |
|---|---|
| EXPLAIN ANALYZE | Runs a query and reports its actual execution plan, timing, and row counts |
| pg_stat_statements | Extension that aggregates execution statistics across all queries run on the server |
| pg_stat_activity | View showing currently running queries and what they're waiting on |
| Measure-identify-change-verify | The tuning discipline: confirm the problem, find its cause, make one change, confirm the fix |

## Check yourself

A colleague wants to add an index to "speed things up" without having looked at a single
execution plan first. Using this lesson's loop, what's the first thing you'd ask them to do
instead, and why does skipping straight to "change" risk making things worse?
