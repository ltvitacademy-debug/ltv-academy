# Lesson 92 — Project: Performance & Automation

**Chapter 15 · Real-World Azure DBA Project · Lesson 92 of 95**

## What you'll learn

- How to actually diagnose the 7-9am dispatch timeout instead of guessing at a fix
- How to decide a storage strategy for a table that's growing 50 GB a month
- How to replace years of unaudited manual maintenance with real automation and alerting

## Diagnosing the 7-9am timeout — query problem, or capacity problem?

Before touching anything, you need a **baseline**: what does
`OrderManagement` look like outside the 7-9am window, so the window has
something to actually compare against. Without it, "it's slow" is just a
feeling.

With a baseline in hand, the real question is which of two very
different problems you're looking at:

- **A query problem** — the same dispatch query runs fine most days, but
  its execution plan has regressed (stale statistics, a plan that
  stopped using the index it used to), and it's slow every time it runs,
  regardless of load.
- **A capacity problem** — every query gets slower specifically during
  7-9am because the service tier's compute ceiling (DTU or vCore) is
  undersized for the concurrent load every dispatcher creates at once.

**Query Store's regressed-queries view** is what actually tells you
which one you're dealing with: if it shows the same query with a plan
that changed and got worse, that's a query problem — fix the plan, the
statistics, or the index. If Query Store shows normal plans but Azure
Monitor and wait-stats DMVs show the tier maxing out CPU or IO
specifically during that window, that's a capacity problem — the fix is
scaling the tier or spreading the load, not touching a query.
Guessing which one it is, without checking, is how DBAs make things
worse instead of better.

## The Telemetry storage decision

`Telemetry` is append-heavy and growing 50 GB a month. Left alone, that's
a slow-motion storage and performance problem. Two moves apply directly
from Chapter 3: **partition the table by date**, so old telemetry can be
compressed or archived separately from the hot, recent range that
dispatch and reporting actually query; and apply **data compression** to
the partitions that are no longer being actively written to, since
compression trades a small CPU cost for a large storage and I/O
reduction on data that's mostly just sitting there. Doing this now, while
the table is still a manageable size, is materially cheaper than doing
it after it's ten times bigger.

## Automation — replacing "nobody's checked in years"

Recall Meridian's actual problem wasn't a missing script — it was that
nothing was actively watched. Three pieces close that gap:

- **Scheduled maintenance jobs** (SQL Server Agent on the Managed
  Instance side, Elastic Jobs where a task spans multiple databases) for
  index maintenance, statistics updates, and integrity checks — done on
  a schedule, not "whenever someone remembers."
- **Alerts and operators**, so a job that fails pages an actual person
  instead of failing silently for months, which is exactly what happened
  to the permissions review Compliance flagged in Lesson 90.
- **Infrastructure as code (Bicep)** for the environment's configuration
  itself, so it can be rebuilt or audited from a file instead of manual
  portal clicks — which is the concrete answer to the CFO's wish to stop
  treating this environment as a one-off hardware purchase.

## Key terms

| Term | Meaning |
|---|---|
| Baseline | A recorded measurement of normal behavior, taken before diagnosing a problem, so "slow" has something concrete to compare against |
| Regressed query | A query whose execution plan changed for the worse, making it consistently slower than before, regardless of load |
| Elastic Job | An Azure-native scheduled job that can run T-SQL across multiple Azure SQL databases from one place |

## Check yourself

Before Lesson 93: if Query Store showed normal, unchanged plans during
the 7-9am window, but Azure Monitor showed the tier's compute maxed out
at the same time, what would that tell you to do — and what would it
tell you *not* to waste time on?
