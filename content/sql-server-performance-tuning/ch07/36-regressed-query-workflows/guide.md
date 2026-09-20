# Regressed Query Workflows

Automatic Tuning (Lesson 35) handles sudden, clear-cut regressions on its own. Most
regressions aren't that clean — a gradual drift, a regression on only some parameter values,
or one you want to review before anything gets forced. This lesson covers the actual manual
workflow in SSMS and in T-SQL for finding and fixing those.

## What you'll learn

- SSMS's built-in "Regressed Queries" Query Store report and how to read it
- How to compare two plan versions for the same query side by side
- The manual regressed-query T-SQL query, for when you want it scripted or automated

## The Regressed Queries report in SSMS

Under a database's **Query Store** folder in Object Explorer, the **Regressed Queries**
report opens showing queries whose performance has gotten measurably worse, ranked by your
choice of metric (duration, CPU time, logical reads, and others). Selecting a query shows a
graph of its plans over time and a plan comparison pane — you can pick two points on the
timeline and see both plans side by side, operator by operator, to spot exactly what
changed (a scan replacing a seek, a different join type, a missing index being worked
around).

This report is doing the same underlying comparison Automatic Tuning does programmatically —
it's just handing you the decision instead of making it for you. From this screen you can
force a specific historical plan directly, which issues the same
`sp_query_store_force_plan` call from Lesson 34 under the hood.

## Finding regressions in T-SQL

For scripting, alerting, or automation, the same comparison can be done directly against
Query Store's catalog views — comparing a query's most recent runtime stats interval against
an earlier one:

```sql
WITH recent AS (
    SELECT rs.plan_id, rs.avg_duration, rs.avg_cpu_time
    FROM sys.query_store_runtime_stats rs
    JOIN sys.query_store_runtime_stats_interval rsi
        ON rs.runtime_stats_interval_id = rsi.runtime_stats_interval_id
    WHERE rsi.start_time > DATEADD(DAY, -1, SYSUTCDATETIME())
),
baseline AS (
    SELECT rs.plan_id, rs.avg_duration, rs.avg_cpu_time
    FROM sys.query_store_runtime_stats rs
    JOIN sys.query_store_runtime_stats_interval rsi
        ON rs.runtime_stats_interval_id = rsi.runtime_stats_interval_id
    WHERE rsi.start_time BETWEEN DATEADD(DAY, -30, SYSUTCDATETIME())
                              AND DATEADD(DAY, -7, SYSUTCDATETIME())
)
SELECT p.query_id, r.plan_id AS recent_plan_id, r.avg_duration AS recent_ms,
       b.avg_duration AS baseline_ms,
       r.avg_duration - b.avg_duration AS regression_ms
FROM recent r
JOIN sys.query_store_plan p ON r.plan_id = p.plan_id
JOIN baseline b ON p.query_id = (SELECT query_id FROM sys.query_store_plan WHERE plan_id = b.plan_id)
WHERE r.avg_duration > b.avg_duration * 1.5
ORDER BY regression_ms DESC;
```

The exact thresholds and windows are yours to tune, but the pattern is the same one the
built-in report uses: define a recent window, define a baseline window, and flag queries
where recent performance is meaningfully worse than the baseline.

## The manual workflow, end to end

1. **Spot it** — the Regressed Queries report or a scripted query like the one above
   surfaces a candidate.
2. **Compare** — look at the plan comparison. Is this the same operator shape with worse
   stats (usually a data-volume or parameter issue), or a genuinely different plan shape
   (usually a plan choice issue)?
3. **Decide** — force the earlier plan if it's demonstrably better and stable (Lesson 34), or
   fix the root cause (a missing index, stale statistics, a rewrite from Chapter 4) if
   forcing would just be papering over it.
4. **Verify** — after acting, come back to Query Store's runtime stats and confirm the metric
   you targeted actually improved. This is the same measure-identify-change-verify loop from
   Lesson 1, applied specifically to Query Store data.

## Key terms

| Term | Meaning |
|---|---|
| Regressed Queries report | SSMS's built-in Query Store report ranking queries by performance decline |
| Plan comparison | Side-by-side operator-level view of two plan versions for the same query |
| Baseline window | An earlier time range used as the "normal" comparison point for detecting regression |
| Regression | A query performing measurably worse now than it did in a prior, comparable period |

## Check yourself

The Regressed Queries report shows a query with the same plan shape throughout, but
`avg_duration` has crept up steadily over three weeks with no single sharp jump. Would
forcing an earlier plan fix this, and what does that pattern suggest about the real cause
instead?
