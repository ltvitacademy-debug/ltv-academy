# Script — The MySQL Performance Schema & sys Schema

## Segment 1 (title)

SQL Server DBAs lean on DMVs and Query Store to see what's happening inside the engine. MySQL's equivalent-purpose tooling is the Performance Schema and the sys schema built on top of it — genuinely different in architecture, worth learning on its own terms.

## Segment 2 (code: Performance Schema)

Performance Schema is a dedicated schema exposing low-level execution details — statement statistics, wait events, memory usage — by instrumenting the server's internal code paths. It's configurable, ongoing instrumentation you query after the fact, architecturally different from SQL Server's on-demand DMVs.

## Segment 3 (code: sys schema — the readable layer)

The sys schema is a set of views and functions built on top of Performance Schema, presenting the same underlying data in a human-readable, pre-aggregated way — answering common questions like which queries are slowest or which indexes are never used directly.

## Segment 4 (steps: using both together)

A real investigation typically starts with sys schema for a fast, readable answer, then drops down to Performance Schema directly when finer granularity is needed, like examining wait events for a specific blocking query.

## Segment 5 (outro)

Together, Performance Schema and sys schema give MySQL the same visibility SQL Server gets from DMVs and Query Store, through a genuinely different architecture. Next up: configuration tuning, starting with the buffer pool and other key variables.
