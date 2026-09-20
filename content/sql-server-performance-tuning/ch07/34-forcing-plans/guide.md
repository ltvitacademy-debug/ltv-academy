# Forcing Plans

Lesson 33 gave you the architecture — plans and their runtime stats, both retained in Query
Store. Now you'll use that history to do something you can't do with the plan cache alone:
pin a specific, known-good plan in place so SQL Server stops re-deciding how to run a query
every time it recompiles.

## What you'll learn

- The real syntax for `sp_query_store_force_plan` and `sp_query_store_unforce_plan`
- How plan forcing differs from a permanent plan guide or hint
- When forcing a plan is the right call — and when it's a band-aid over a real problem

## Forcing a plan, for real

Once you've identified, via Query Store's runtime stats, that one particular `plan_id` for a
`query_id` consistently outperforms the others, you can force it:

```sql
EXEC sys.sp_query_store_force_plan
    @query_id = 5821,
    @plan_id  = 6103;
```

From that point forward, whenever the optimizer produces a plan for that query, SQL Server
checks whether a forced plan exists and uses it instead — skipping the normal
cost-based plan selection for that query entirely. This isn't a hint that nudges the
optimizer; it's a directive that overrides it, short of the forced plan becoming truly
unusable (a dropped index it depends on, for instance), in which case SQL Server falls back
to normal compilation and marks the forcing as failed.

To check what's currently forced, and whether forcing is succeeding:

```sql
SELECT q.query_id, p.plan_id, p.is_forced_plan, p.last_force_failure_reason_desc
FROM sys.query_store_query q
JOIN sys.query_store_plan p ON q.query_id = p.query_id
WHERE p.is_forced_plan = 1;
```

`last_force_failure_reason_desc` is worth checking regularly — a forced plan that's silently
failing to apply gives you none of the protection you think you have.

To release a forced plan:

```sql
EXEC sys.sp_query_store_unforce_plan
    @query_id = 5821,
    @plan_id  = 6103;
```

## Forcing vs. a plan guide vs. a query hint

SQL Server actually has three overlapping mechanisms for influencing plan choice, and it's
easy to conflate them:

- **Query Store plan forcing** — reuses a plan Query Store already captured. Simple to set
  up because you're pointing at a real, already-compiled plan, and easy to audit through the
  Query Store views. Tied to Query Store being enabled on that database.
- **Plan guides** (`sp_create_plan_guide`) — attach hints to a query pattern without
  modifying application code, independent of Query Store. More flexible in *what* they can
  attach (any hint, not just "use this exact plan") but more work to set up and match
  correctly against the query text.
- **Query hints** (`OPTION (...)` in the query itself, or `USE HINT`) — the most direct, but
  require touching the query text, which isn't always possible for third-party application
  code.

For a query where Query Store has already captured a demonstrably better historical plan,
plan forcing is almost always the lowest-effort, most auditable choice of the three.

## When forcing is the right call — and when it's a band-aid

Forcing a plan is the right call when you have clear evidence — from Query Store's runtime
stats — that one specific plan is reliably faster across representative parameter values,
and the query's underlying data and schema aren't expected to change much. It's a legitimate,
permanent fix for a query where parameter sniffing keeps flipping it between a good and a bad
plan.

It's a band-aid when you force a plan instead of fixing the actual cause of plan
instability — missing statistics, an index that would remove the need for a scan, or a
query written in a way that makes cardinality estimation unreliable. A forced plan doesn't
adapt as data grows; a table that doubles in size might make yesterday's "good" plan the
wrong choice today, and forcing means SQL Server won't notice. Treat forcing as a deliberate,
monitored decision — not something you set once and forget, which is exactly why Lesson 37
covers Query Store in ongoing production use.

## Key terms

| Term | Meaning |
|---|---|
| Plan forcing | Directing the optimizer to reuse one specific, already-captured plan for a query |
| `sp_query_store_force_plan` | Procedure that forces a given `plan_id` for a given `query_id` |
| `is_forced_plan` | Column on `sys.query_store_plan` indicating a plan is currently forced |
| Force failure | When a forced plan can no longer be used (e.g., a dependent index was dropped) and SQL Server falls back to normal compilation |

## Check yourself

You force a plan for a query because it was reliably faster last month. Six months later, the
underlying table has grown tenfold. What risk does forcing introduce here that a query hint
addressing the actual cardinality-estimation problem wouldn't?
