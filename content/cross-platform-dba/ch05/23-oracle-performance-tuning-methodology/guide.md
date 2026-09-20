# Oracle Performance Tuning Methodology

SQL Server Performance Tuning taught a discipline, not a tool: measure before you touch
anything, identify the actual bottleneck, make one change, then verify it helped. That
discipline doesn't change when the engine underneath it is Oracle. What changes is the
toolset you use to run the loop — and Oracle's toolset is built around a different core
idea than SQL Server's wait-stats-plus-DMVs approach: Oracle expresses almost everything
in terms of **DB Time**.

## What you'll learn

- Why Oracle centers its whole tuning story on DB Time and wait events, not ratios
- The four-step loop — measure, identify, change, verify — expressed with Oracle's tools
- ADDM, Oracle's automated first pass at diagnosis
- Why "buffer cache hit ratio" tuning was abandoned as a primary methodology

## Oracle's wait interface: DB Time and wait events

Older Oracle tuning advice chased ratios — buffer cache hit ratio, library cache hit
ratio — and tried to push them toward 99%+. Oracle itself moved away from that approach
starting with the wait interface and, from Oracle 10g on, the time model built around
**DB Time**: the total time the database spent servicing user requests, broken into CPU
time and wait time. A session that's waiting is recorded against a specific **wait
event** — `db file sequential read`, `log file sync`, `enq: TX - row lock contention`,
and hundreds of others — visible in `V$SESSION`, `V$SESSION_WAIT`, and
`V$ACTIVE_SESSION_HISTORY`. Instead of asking "is my hit ratio healthy," the Oracle DBA
asks "where is DB Time actually going," which is a direct, evidence-based answer rather
than an indirect proxy.

## The measure → identify → change → verify loop, with Oracle's tools

The loop is identical to the one this path already trained on SQL Server; only the
instrumentation changes:

- **Measure** — pull an AWR report or query `V$ACTIVE_SESSION_HISTORY` / `V$SESSION` to
  see where DB Time is going right now or over a recent window.
- **Identify** — find the top wait events and the SQL statements driving them (AWR's
  "SQL ordered by ..." sections, or `V$SQL` joined to session activity).
- **Change** — make one change: add an index, rewrite a query, adjust an initialization
  parameter, gather fresh statistics. One change, not five at once.
- **Verify** — take a new AWR snapshot or re-run the query and confirm DB Time or the
  specific wait event actually dropped. If it didn't, the diagnosis was wrong — go back
  to measure.

## ADDM: Oracle's automated first pass

The **Automatic Database Diagnostic Monitor (ADDM)** runs automatically after every AWR
snapshot and analyzes the time model data for you, producing findings ranked by how much
DB Time they cost and specific recommendations (an index, a SQL tuning task, a
configuration change). ADDM is a genuinely useful starting point, but it's still a
starting point — it doesn't replace understanding *why* a wait event dominates DB Time,
and its recommendations still go through the same change-then-verify discipline before
they're trusted.

## Key terms

| Term | Meaning |
|---|---|
| DB Time | Total time the database spent on user work: CPU time plus wait time |
| Wait event | A named reason a session was waiting instead of running (e.g., `db file sequential read`) |
| ADDM | Automatic Database Diagnostic Monitor — automated analysis of AWR data with ranked findings |
| V$ACTIVE_SESSION_HISTORY | View exposing recent per-second samples of active session activity |
| Time model | Oracle's framework for accounting for all database time as CPU or a specific wait |

## Check yourself

A query is slow. Name the first thing you'd check in Oracle to find out where its time is
actually going, and explain why that's a better starting point than assuming it's a
missing index.
