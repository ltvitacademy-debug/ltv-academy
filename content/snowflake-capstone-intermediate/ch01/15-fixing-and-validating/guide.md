# Lesson 15 — Fixing and Validating

**Chapter 1 · Intermediate Capstone: Support and Finance, One Shared Model · Lesson 15 of 16**

## What you'll learn

- Removing the duplicate Task correctly: suspend first, confirm, then drop
- Cleaning up the duplicate rows already sitting in `refund_events`
- Re-validating that Finance's and Support's numbers actually reconcile
- A real safeguard that makes this specific mistake easier to catch sooner next time

## Step 1: suspend the duplicate Task first, don't drop it immediately

```sql
ALTER TASK driftwood_analytics.raw.finance_refund_task_v2 SUSPEND;
```

Suspend before dropping, even though the end goal is removal. Suspending stops the bleeding
immediately — no further duplicate rows get written — while leaving the object available a moment
longer in case anything about it needs double-checking first (a reasonable caution any time you're
about to permanently remove something from a production pipeline).

## Step 2: confirm only one Task remains active

```sql
SHOW TASKS IN SCHEMA driftwood_analytics.raw;
```

Confirm `finance_refund_task` still shows `started`, and `finance_refund_task_v2` now shows
`suspended`. Once confirmed, drop the duplicate for good:

```sql
DROP TASK driftwood_analytics.raw.finance_refund_task_v2;
```

## Step 3: find and remove the duplicate rows already written

```sql
SELECT ticket_id, updated_at, COUNT(*) AS row_count
FROM driftwood_analytics.marts.refund_events
GROUP BY ticket_id, updated_at
HAVING COUNT(*) > 1;
```

This confirms exactly which rows duplicated, and how many extra copies exist. Remove the extras,
keeping exactly one row per genuine event:

```sql
DELETE FROM driftwood_analytics.marts.refund_events
WHERE (ticket_id, updated_at, loaded_at) IN (
    SELECT ticket_id, updated_at, loaded_at
    FROM (
        SELECT ticket_id, updated_at, loaded_at,
               ROW_NUMBER() OVER (
                   PARTITION BY ticket_id, updated_at
                   ORDER BY loaded_at
               ) AS rn
        FROM driftwood_analytics.marts.refund_events
    )
    WHERE rn > 1
);
```

`ROW_NUMBER() OVER (PARTITION BY ticket_id, updated_at ORDER BY loaded_at)` numbers each duplicate
group's rows in the order they were loaded; keeping only `rn = 1` and deleting the rest leaves
exactly one row per genuine refund event, discarding the extras without guessing which copy to
keep.

## Step 4: re-validate both pages reconcile

Refresh Power BI (or wait for its next scheduled refresh), then recheck the exact comparison from
Lesson 13: `refund_event_count` on Finance's page against the count of distinct refunded
`ticket_id`s for the same week. They should now match exactly, for every week — not just the one
that was originally reported.

## A real safeguard, not just a one-time cleanup

Cleaning up this one incident doesn't prevent the same mistake from happening again the next time
someone touches this pipeline. Add a lightweight ongoing check:

```sql
CREATE OR REPLACE VIEW driftwood_analytics.marts.vw_refund_events_duplicate_check AS
SELECT ticket_id, updated_at, COUNT(*) AS row_count
FROM driftwood_analytics.marts.refund_events
GROUP BY ticket_id, updated_at
HAVING COUNT(*) > 1;
```

An empty result from this view is the expected, healthy state. Checking it periodically — or
wiring it into a scheduled alert, a real production pattern beyond this capstone's scope — turns
"someone notices the dashboards disagree weeks later" into "a short, specific SQL check catches it
immediately," which is a meaningfully better place for a pipeline to fail from.

## Key terms

| Term | Meaning |
|---|---|
| Suspend before drop | Stop a Task from running first, confirm, then remove it permanently |
| `ROW_NUMBER() OVER (PARTITION BY ...)` | Numbers rows within each duplicate group, used to identify and remove extras |
| Ongoing duplicate check | A standing query that should always return empty, used to catch a recurrence early |

## Lab

On your own model, suspend and drop the duplicate Task, run the duplicate-detection query, and
delete the extra rows using the `ROW_NUMBER()` pattern above. Re-run the comparison from Lesson 13
across at least three weeks and confirm Finance's and Support's numbers now agree. Create the
`vw_refund_events_duplicate_check` view and confirm it returns zero rows.

## Check yourself

You're ready for Lesson 16 when you can answer, without looking: why does this fix suspend the
duplicate Task before dropping it, rather than dropping it directly, and what does the
`vw_refund_events_duplicate_check` view protect against that cleaning up this one incident alone
does not?
