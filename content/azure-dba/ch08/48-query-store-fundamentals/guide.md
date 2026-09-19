# Lesson 48 — Query Store Fundamentals

**Chapter 8 · Query Performance Tuning · Lesson 48 of 95**

## What you'll learn

- What Query Store actually is: SQL Server's own built-in "flight data recorder" for queries and plans
- How to turn it on, and what it captures automatically once it's running
- How to read the Plan Summary view for a single query, across multiple plans over time
- How to find the top resource-consuming queries on a database without guessing

## The problem Query Store solves

Every tool so far in this chapter — execution plans (Lesson 45), plan
operators (Lesson 46), missing-index DMVs (Lesson 47) — looks at a
query **right now**. None of them, by themselves, answer "was this
query always this slow, or did something change?" Wait stats and DMVs
like `sys.dm_exec_query_stats` also reset on restart. **Query Store**
is different: once enabled, it persists query text, every plan a
query has used, and runtime statistics for each plan, to disk, across
restarts, going back as far as its retention window allows.

## Turning it on

```sql
ALTER DATABASE CURRENT SET QUERY_STORE = ON;
ALTER DATABASE CURRENT SET QUERY_STORE
  (OPERATION_MODE = READ_WRITE, DATA_FLUSH_INTERVAL_SECONDS = 900,
   MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO);
```

On Azure SQL Database, Query Store is **on by default** — this is
one of the platform differences worth knowing for the exam. On SQL
Server on-prem or on a VM, you turn it on per database, same as
above. `QUERY_CAPTURE_MODE = AUTO` tells it to only capture
"relevant" queries (skipping one-off ad hoc queries that ran once and
never again), which keeps the store from filling up with noise.

## Reading the Plan Summary view

Once Query Store has history, SSMS gives you a **Query Store** node
per database with several built-in reports. **Regressed Queries**,
**Top Resource Consuming Queries**, and **Overall Resource
Consumption** are the three you'll use constantly — this lesson
covers reading the plan-level detail underneath any of them:

![SSMS Query Store's Plan Summary view for a single query, showing a scatter chart plotting average duration over five-minute intervals with two different plan IDs, and a tooltip open showing plan id, whether it's forced, execution count, and average/min/max/std-dev duration.](/courses/azure-dba/ch08/48-query-store-fundamentals/query-store-usage-1.png)

This is the **Plan Summary for Query 1** view. Each dot is one time
interval; the color and legend (`plan id`) show which of this query's
*multiple* plans ran during that interval. The tooltip on the
selected point shows exactly what you need for triage: `plan id`,
whether it's `forced`, `execution count`, and average/min/max/std-dev
duration for that plan in that window. Seeing two clusters of dots at
very different heights — like the ~10,000 and ~30,000 clusters here —
is Query Store visually telling you this query has run under two
meaningfully different plans.

## Finding the top resource consumers

The other constant question — "which queries are actually costing me
the most right now?" — has its own built-in report:

![SSMS's Top Resource Consumers report for a database, showing the top 25 queries ranked by a chosen metric (a dropdown listing CPU Time, Duration, Execution Count, Logical Reads, Logical Writes, Memory Consumption, and Physical Reads), a bar chart of the top queries, and a plan summary chart plus query text for the selected query.](/courses/azure-dba/ch08/48-query-store-fundamentals/query-store-usage-2.png)

**Top Resource Consumers** ranks the top 25 queries on the database
by whichever metric you pick from that dropdown — Duration, CPU Time,
Logical Reads, and so on — over a chosen time window. This replaces
guessing which query to tune first with an actual, measured ranking.
Selecting a bar drills into that query's own Plan Summary view,
exactly like the one above, and its underlying query text and plan.

## Why this matters before Lesson 49

Lesson 49 uses these exact same views to find a query that
**regressed** — went from a good plan to a bad one — and force a fix.
None of that is possible without first knowing how to read a single
query's Plan Summary and how to identify which queries are worth
looking at in the first place. That's this lesson.

## Key terms

| Term | Meaning |
|---|---|
| Query Store | SQL Server's built-in feature that persists query text, plans, and runtime stats to disk over time |
| Plan Summary | The per-query view showing every plan that query has used, plotted over time |
| Top Resource Consumers | A built-in report ranking queries by a chosen metric (duration, CPU, reads, etc.) |
| `QUERY_CAPTURE_MODE = AUTO` | Setting that skips capturing one-off ad hoc queries to reduce noise |

## Check yourself

You're ready for Lesson 49 when you can explain, without looking: what
does Query Store persist that DMVs like `sys.dm_exec_query_stats`
don't survive, and what does seeing two separate clusters of dots in
a Plan Summary chart usually mean?
