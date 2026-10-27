# Lesson 14 — Finding the Real Cause

**Chapter 1 · Intermediate Capstone: Support and Finance, One Shared Model · Lesson 14 of 16**

## What you'll learn

- Using real `INFORMATION_SCHEMA.TASK_HISTORY` to check what actually ran against the Stream
- Confirming a hypothesis with a query, not just a hunch
- The precise mechanics of how two Tasks consuming one Stream produced duplicate rows
- Why this is a realistic operational mistake, not a contrived textbook bug

## Step 1: check SHOW TASKS first, not just TASK_HISTORY

Before anything else:

```sql
SHOW TASKS IN SCHEMA driftwood_analytics.raw;
```

This is the single most important diagnostic step, and it's easy to skip because it feels too
obvious: just list every Task that currently exists. If the design from Lesson 2 called for
exactly one Task doing Finance's job, and this list shows **two**, that's not a hypothesis anymore
— it's a fact sitting right in front of you. Recall this is precisely the risk flagged back in
Lesson 7: a duplicate Task, created during an earlier change and never cleaned up, doesn't throw
an error. It just sits there, running.

In this capstone's scenario, that's exactly what `SHOW TASKS` reveals: alongside
`finance_refund_task`, there's a second, almost-identically-named Task —
`finance_refund_task_v2` — created weeks earlier during a tweak to the refund logic, left running
after the original was restored, and never suspended.

## Step 2: confirm with TASK_HISTORY

```sql
SELECT task_name, state, query_start_time, completed_time, error_message
FROM TABLE(INFORMATION_SCHEMA.TASK_HISTORY(
    SCHEDULED_TIME_RANGE_START => DATEADD('day', -7, CURRENT_TIMESTAMP())
))
WHERE task_name IN ('FINANCE_REFUND_TASK', 'FINANCE_REFUND_TASK_V2')
ORDER BY query_start_time DESC;
```

The result confirms it precisely: both Tasks show `SUCCEEDED` runs, on the same 5-minute schedule,
with start times close enough together that their executions genuinely overlapped.

## Step 3: understand exactly why this produced duplicates

Here's the full mechanical explanation:

- Both Tasks reference the same `tickets_stream` and run the same kind of append-only `MERGE`.
- A Stream's offset advances only when a DML statement referencing it **commits**. Until that
  commit happens, the Stream's current unconsumed rows are still visible to *any* transaction that
  reads it — including a second Task's `MERGE`, running in an overlapping window, before the
  first Task's transaction has committed.
- When `finance_refund_task` and `finance_refund_task_v2` both happened to fire within the same
  few seconds, both read the same unconsumed rows from `tickets_stream`, and both independently
  satisfied their own `WHEN NOT MATCHED` condition — because, from each Task's own point of view,
  nothing matching that row existed in `refund_events` *yet*. Both inserted it.
- `ticket_facts_sync_task` was never duplicated — only one copy of it exists — so it never hit this
  problem. That's exactly why Support's numbers, fed from `ticket_facts`, stayed correct the whole
  time, while Finance's, fed from the append-only `refund_events`, did not.

## Why this is a realistic bug, not a contrived one

Nothing about `finance_refund_task_v2`'s `MERGE` logic is wrong on its own — read in isolation,
it's a correctly-written append-only Task, doing exactly what it was written to do. The bug isn't
in anyone's SQL. It's that two copies of the same consumer ended up running against one Stream at
once — an operational leftover from an earlier change, not a formula mistake, and operational
leftovers like this don't show up no matter how many times you review the `MERGE` statement's own
logic.

## Key terms

| Term | Meaning |
|---|---|
| `SHOW TASKS` | Lists every Task that currently exists in a schema — the first check, not an afterthought |
| Overlapping execution | Two Tasks' runs falling close enough together that neither's commit has happened before the other reads the same data |
| Operational leftover | A duplicate or stale object left behind from an earlier change, invisible in any single object's own definition |

## Lab

On your own model (or by reasoning through the scenario if you don't have a second Task to
reproduce it with), write both the `SHOW TASKS` and `TASK_HISTORY` queries above. In your own
words, write one sentence explaining why `ticket_facts_sync_task` staying single-instance is
exactly why Support's numbers never showed this problem.

## Check yourself

You're ready for Lesson 15 when you can answer, without looking: what, specifically, does
`SHOW TASKS` reveal that confirms the hypothesis, and why does `TASK_HISTORY` alone — without
first checking how many Tasks even exist — not tell the full story?
