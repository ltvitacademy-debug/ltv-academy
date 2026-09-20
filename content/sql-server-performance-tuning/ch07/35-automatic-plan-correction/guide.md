# Automatic Plan Correction

Lesson 34 had you manually finding a good plan and forcing it. SQL Server can do a version
of that job itself. Automatic Tuning watches Query Store's own data for plan regressions and
can automatically force the last known-good plan back — no DBA intervention required.

## What you'll learn

- The real `AUTOMATIC_TUNING` database option and `FORCE_LAST_GOOD_PLAN`
- How SQL Server actually detects a plan regression before acting
- Where to see what Automatic Tuning has done, and how to review or reverse it

## Turning it on

```sql
ALTER DATABASE CURRENT
SET AUTOMATIC_TUNING (FORCE_LAST_GOOD_PLAN = ON);
```

This requires Query Store to be enabled on the database — Automatic Tuning is built directly
on top of the plan and runtime-stats history Lesson 33 covered. Without that history, there's
nothing for it to compare against.

## How detection actually works

Automatic Tuning doesn't guess. It continuously compares a query's current plan's runtime
statistics against its own recent history, already captured in Query Store. When a plan
change is followed by a statistically significant regression — meaningfully higher CPU time
or duration compared to the previous plan for the same query — SQL Server:

1. Detects the regression using Query Store's runtime stats, comparing the new plan against
   the previous one for the same query.
2. Automatically forces the last known-good plan — the same underlying mechanism as
   `sp_query_store_force_plan` from Lesson 34, just triggered by SQL Server itself.
3. Keeps monitoring. If forcing the old plan doesn't actually help (data or schema has
   genuinely changed), SQL Server can un-force it and let the optimizer try again.

This is meaningfully different from just "always use the oldest plan" — it's a closed loop
that measures the outcome of its own intervention, which is exactly the systematic loop this
whole course is built around, just automated for one specific failure mode.

## Reviewing what Automatic Tuning has done

Every recommendation and action Automatic Tuning takes is visible and auditable — this isn't
a black box:

```sql
SELECT
    reason,
    score,
    state,
    JSON_VALUE(details, '$.planForcingDetails.query_id') AS query_id,
    JSON_VALUE(details, '$.planForcingDetails.regressedPlanId') AS regressed_plan_id,
    JSON_VALUE(details, '$.planForcingDetails.recommendedPlanId') AS recommended_plan_id
FROM sys.dm_db_tuning_recommendations;
```

`sys.dm_db_tuning_recommendations` shows both recommendations that were automatically
applied and, if you leave `FORCE_LAST_GOOD_PLAN` off, recommendations SQL Server is *offering*
without acting on them — useful if you want visibility without ceding control. The `state`
column tells you whether a recommendation is active, reverted, or expired.

## Where this fits with manual forcing

Automatic Tuning is not a replacement for the judgment Lesson 34 covered — it's a safety net
for the specific, common case of a sudden plan regression (a classic parameter-sniffing
flip). It won't fix a query that's slow because of a missing index, and it won't catch a
gradual performance drift that isn't a clean before/after plan-change event. Many production
systems run both: Automatic Tuning catching sudden regressions automatically, and a DBA still
manually reviewing Query Store's regressed-queries report (Lesson 36) for the slower-moving
problems it can't detect.

## Key terms

| Term | Meaning |
|---|---|
| Automatic Tuning | SQL Server feature that detects and can automatically correct query plan regressions |
| `FORCE_LAST_GOOD_PLAN` | The database option that enables automatic plan-regression correction |
| Plan regression | A new plan performing meaningfully worse than the query's previous plan |
| `sys.dm_db_tuning_recommendations` | DMV listing Automatic Tuning's recommendations and actions, applied or offered |

## Check yourself

`FORCE_LAST_GOOD_PLAN` is off, but Automatic Tuning is still showing recommendations in
`sys.dm_db_tuning_recommendations`. What does that tell you about what's currently happening
to your queries, and what would turning the option on actually change?
