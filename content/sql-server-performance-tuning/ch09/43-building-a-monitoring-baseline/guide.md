# Building a Monitoring Baseline

Lesson 3 had you gather a performance baseline: one recorded snapshot of "normal," taken so a
later measurement had something to compare against. That was enough for a single tuning
project. It isn't enough for ongoing production monitoring — a single snapshot tells you what
the server looked like on one Tuesday afternoon, not what "normal" looks like at 2 AM during
the nightly ETL load, or during Monday morning's month-end close. This lesson turns that
one-time baseline into a repeating practice: an automated capture that builds a real
historical record you can compare *any* moment against.

## What you'll learn

- Why a single point-in-time snapshot can't function as a monitoring baseline
- Which DMVs and counters are worth capturing on a recurring schedule
- Why cumulative counters have to be diffed between snapshots, not read as raw totals
- How to store captured metrics in a permanent table instead of just eyeballing them

## A baseline is a range, not a number

"Normal CPU is 40%" is a single number. Real production workloads don't have a single normal —
they have a *pattern*: low overnight, a spike during the 6 AM batch job, moderate through the
business day, another spike at month-end. A monitoring baseline captures that pattern by
recording key metrics on a fixed schedule (every 15 minutes is a common starting point) so that
"is this normal right now" can be answered against the right slice of history — Tuesday at 2 PM
compared to *other* Tuesdays at 2 PM, not against an average that blends business hours with
midnight.

## What to capture

A useful recurring snapshot pulls from a small set of DMVs that together describe the whole
server, not just one query:

- **`sys.dm_os_wait_stats`** — cumulative wait time by wait type since the last restart (or the
  last manual `DBCC SQLPERF('sys.dm_os_wait_stats', CLEAR)`). This is the wait-based methodology
  from Chapter 5, captured on a schedule instead of run once during an incident.
- **`sys.dm_os_performance_counters`** — the same counters PerfMon exposes, queryable in T-SQL:
  Page Life Expectancy, Buffer cache hit ratio, Batch Requests/sec, and dozens more, filtered to
  the `object_name` values that matter (`SQLServer:Buffer Manager`, `SQLServer:SQL Statistics`).
- **`sys.dm_io_virtual_file_stats`** — per-file read/write counts and stall time, useful for
  spotting a specific data or log file becoming an I/O bottleneck over time.

Several of these — wait stats, batch requests, and most PerfMon counters — are **cumulative**
since the last restart. A raw value of "47,000 page life expectancy events" means nothing on its
own; what matters is the *change* between two snapshots. A monitoring process has to store each
raw snapshot and calculate the delta between consecutive rows, the same way Chapter 5's wait
stats methodology subtracted a "before" snapshot from an "after" one — just automated and
running continuously instead of bracketing one troubleshooting session.

## Storing history: a permanent table, not a spreadsheet

The captured values need somewhere durable to live. A simple pattern: a dedicated table in a
utility or admin database, populated by a SQL Server Agent job on a schedule.

```sql
CREATE TABLE dba.PerfBaseline (
    CaptureTime   DATETIME2      NOT NULL DEFAULT SYSDATETIME(),
    CounterName   NVARCHAR(128)  NOT NULL,
    CounterValue  BIGINT         NOT NULL
);
```

An Agent job step running every 15 minutes inserts one row per counter of interest from
`sys.dm_os_performance_counters`, plus a similar capture of current wait stats. Weeks of rows
accumulate into a real historical record: query it by day-of-week and hour-of-day, and you have
an actual answer to "what does Page Life Expectancy normally look like at this time on a
Monday," instead of a guess based on whatever the server happens to be doing right now.

## Key terms

| Term | Meaning |
|---|---|
| Monitoring baseline | A recurring, scheduled capture of key metrics, building a historical record over time |
| Point-in-time baseline | A single snapshot (Lesson 3's version) — useful for one tuning project, not ongoing monitoring |
| Cumulative counter | A metric that only increases since the last restart (or manual clear); must be diffed between snapshots to be meaningful |
| History table | A permanent table that stores each snapshot so later queries can compare against real historical patterns |

## Check yourself

Why can't you look at a single reading of `sys.dm_os_wait_stats` and conclude "this server has a
lot of `PAGEIOLATCH_SH` waits right now" — what would you need to capture instead, and why?
