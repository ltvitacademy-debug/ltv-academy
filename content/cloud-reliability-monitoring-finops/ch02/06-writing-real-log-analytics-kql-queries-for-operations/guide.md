# Lesson 6 — Writing Real Log Analytics KQL Queries for Operations

**Chapter 2 · Azure Monitor & Log Analytics in Depth · Lesson 2 of 4**

## What you'll learn

- The basic shape of a KQL (Kusto Query Language) query: start with a
  table, pipe operators left to right
- How to filter on time and fields with `where`, aggregate with
  `summarize`, bucket time with `bin()`, and chart results with
  `render`
- How to join two tables together to answer a question neither one
  can answer alone
- Three real operational queries, against real Log Analytics tables
  (`AzureActivity`, `Perf`, `Heartbeat`), that you'd actually run
  during an incident

## The shape of a KQL query

Every KQL query starts with a table name and reads top to bottom as a
pipeline: each `|` takes the previous step's output and transforms it
further. There's no `SELECT` keyword, no "from" clause buried in the
middle — the table comes first, and everything after it narrows,
reshapes, or summarizes that data.

```kql
AzureActivity
| where TimeGenerated > ago(24h)
| where ActivityStatusValue == "Failure"
| summarize FailureCount = count() by Caller, OperationNameValue
| order by FailureCount desc
```

Read it the way you'd read the pipeline itself: start with every row
in `AzureActivity` (the control-plane record from Lesson 5), keep only
the last 24 hours, keep only failed operations, group what's left by
who did it and what they tried to do, count each group, and sort the
biggest offenders to the top. That's a real query you could paste into
Log Analytics right now to answer "who's been failing operations on
this subscription today."

## `summarize` and `bin()`: turning raw rows into a time series

`summarize` is KQL's aggregation operator — it collapses many rows
into one row per group, the way `GROUP BY` works in SQL. Paired with
`bin()`, which rounds a timestamp down into fixed-width buckets, it's
how you turn a flood of individual performance-counter rows into a
usable time series:

```kql
Perf
| where ObjectName == "Processor" and CounterName == "% Processor Time"
| where TimeGenerated > ago(6h)
| summarize AvgCPU = avg(CounterValue) by bin(TimeGenerated, 5m), Computer
| render timechart
```

`bin(TimeGenerated, 5m)` groups every row into 5-minute buckets;
`summarize ... by` produces one average-CPU value per computer per
bucket; `render timechart` draws the result directly in the query
editor — genuinely useful when you're staring at an incident and don't
want to export anything to a separate charting tool first.

## Joining across tables

The real power of Log Analytics shows up once you join tables, because
most useful operational questions need data that lives in more than
one place. Here's a question neither `Perf` nor `Heartbeat` alone can
answer: "which computers are both running hot on CPU *and* still
reporting in healthy?"

```kql
Perf
| where CounterName == "% Processor Time"
| where TimeGenerated > ago(1h)
| summarize AvgCPU = avg(CounterValue) by Computer
| where AvgCPU > 80
| join kind=inner (
    Heartbeat
    | summarize LastHeartbeat = max(TimeGenerated) by Computer
) on Computer
| where LastHeartbeat > ago(10m)
```

The left side computes high-CPU machines from `Perf`; the inner
parenthesized query computes each machine's most recent heartbeat;
`join kind=inner ... on Computer` matches rows where the `Computer`
field agrees, keeping only machines present in both results. `kind`
controls the join behavior (`inner`, `leftouter`, `rightouter`, and
others) exactly the way it does in T-SQL — if you've written a SQL
`JOIN`, the concept transfers directly, even though the syntax is
different.

## `let` statements and saving a query as a function

For anything you'll run more than once, `let` names a reusable value
or sub-query at the top of a script, and a query you lean on
repeatedly can be saved as a **function** in the workspace, callable by
name from any other query — turning a one-off investigation into a
reusable building block for the next incident, and the foundation a
**scheduled query rule** (a log-based alert) runs on its own cadence.

## Key terms

| Term | Meaning |
|---|---|
| KQL | Kusto Query Language — the pipe-based query language for Log Analytics, Application Insights, and Container Insights data |
| `summarize` | The aggregation operator; collapses rows into one row per group, like SQL's `GROUP BY` |
| `bin()` | Rounds a timestamp into fixed-width time buckets, the standard way to build a time series in KQL |
| `render` | Draws the current result set as a chart (e.g. `timechart`) directly in the query editor |
| `join` | Combines rows from two tables on a matching field; `kind` controls inner/outer behavior, same concept as SQL joins |

## Check yourself

You're ready for Lesson 7 when you can write, from memory, a query
that filters `AzureActivity` to failed operations in the last 24
hours and groups the failure count by caller — and explain what
changing `kind=inner` to `kind=leftouter` would do to a join's result.
