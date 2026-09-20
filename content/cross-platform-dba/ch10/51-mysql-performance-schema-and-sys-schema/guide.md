# The MySQL Performance Schema & sys Schema

SQL Server DBAs lean on DMVs and Query Store to see what's actually happening inside the
engine. MySQL's equivalent-purpose tooling is the Performance Schema and the `sys` schema
built on top of it — genuinely different in architecture, worth understanding on its own
terms rather than as "MySQL's version of a DMV."

## What you'll learn

- What the Performance Schema actually instruments, and how it differs architecturally from
  SQL Server's DMVs
- Why the `sys` schema exists as a separate, friendlier layer rather than being the same
  thing
- How to use both together for a real investigation

## Performance Schema: low-level instrumentation

The Performance Schema is a dedicated schema (`performance_schema`) containing tables that
expose low-level server execution details: statement execution statistics, wait events
(time spent waiting on locks, I/O, and other resources), memory usage, and much more. It
works by instrumenting the server's internal code paths and recording events as they
happen, with configurable overhead — you can enable or disable specific instruments and
consumers depending on what you're investigating, trading detail for overhead.

This is architecturally different from SQL Server's DMVs, which are largely queried
on-demand against the engine's current in-memory state. Performance Schema is closer to a
configurable, ongoing instrumentation and event-collection system that you query after the
fact — you decide in advance what to instrument, and it accumulates data over time in memory
tables.

```
-- Example: find the top statements by total execution time
SELECT digest_text, count_star, sum_timer_wait
FROM performance_schema.events_statements_summary_by_digest
ORDER BY sum_timer_wait DESC
LIMIT 10;
```

Performance Schema is genuinely low-level — its table and column names are precise but not
always immediately readable, and its raw output often needs interpretation (timer values in
picoseconds, digest hashes instead of readable query text in some views) before it's
directly useful.

## sys schema: the friendlier view layer

The `sys` schema is a set of views, functions, and procedures built *on top of* Performance
Schema (and some Information Schema data), designed to present that same underlying data in
a human-readable, pre-aggregated way. Where Performance Schema gives you raw instrumentation
data you often need to process further, `sys` schema views tend to already answer common
questions directly:

```
-- Which queries are actually consuming the most time, human-readable
SELECT query, exec_count, total_latency
FROM sys.statement_analysis
ORDER BY total_latency DESC
LIMIT 10;

-- Which indexes exist but are never used
SELECT * FROM sys.schema_unused_indexes;
```

The relationship is deliberate: Performance Schema is the raw instrumentation layer, `sys`
schema is the readable layer on top, similar in spirit to how a DBA might build a friendlier
reporting view on top of raw DMV output on SQL Server — except on MySQL, that friendlier
layer ships built in.

## Using both together

A real investigation typically starts with `sys` schema for a fast, readable answer (which
queries or indexes are the problem), then drops down to Performance Schema directly when
`sys` doesn't expose the specific granularity needed — for example, examining wait events
for a specific thread during an active lock investigation.

## Key terms

| Term | Meaning |
|---|---|
| Performance Schema | Low-level MySQL instrumentation exposing statement stats, wait events, and memory usage |
| `sys` schema | Human-readable views/functions built on top of Performance Schema for common questions |
| Instrument | A specific thing Performance Schema can be configured to track (a statement type, a wait event class, etc.) |
| Digest | A normalized representation of a SQL statement (literals stripped) used to group similar queries together |

## Check yourself

You want a quick, readable list of unused indexes across your database, and separately, the
raw wait-event timing for a specific query that's blocking others right now. Which of the
two schemas would you reach for first for each task, and why?
