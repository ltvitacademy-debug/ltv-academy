# Lesson 7 — Scheduling the Task

**Chapter 1 · Intermediate Capstone: Support and Finance, One Shared Model · Lesson 7 of 16**

## What you'll learn

- The real `ALTER TASK ... RESUME` syntax that actually starts a Task running
- Confirming a Task is live with `SHOW TASKS`
- Watching a scheduled run happen, end to end, using `TASK_HISTORY`
- Why resuming a Task is a moment worth treating carefully, not casually

## Resuming both Tasks

A Task created in Lesson 6 sits `SUSPENDED` until explicitly resumed:

```sql
ALTER TASK driftwood_analytics.raw.ticket_facts_sync_task RESUME;
ALTER TASK driftwood_analytics.raw.finance_refund_task RESUME;
```

From this moment, each Task checks its schedule and `WHEN` condition every 5 minutes, and runs
its `MERGE` whenever `tickets_stream` actually has unconsumed data.

## Confirming both are live

```sql
SHOW TASKS LIKE '%ticket%' IN SCHEMA driftwood_analytics.raw;
```

Check the `state` column for both rows — each should now read `started`, not `suspended`.

## Why this moment deserves care, not a shrug

Resuming a Task isn't a one-time switch you flip and forget. A Task that's already running,
resumed again by accident — or a second, slightly-renamed copy of the same Task created during
testing and never cleaned up — doesn't throw an error. It just quietly becomes a second active
consumer of the same Stream, doing the same job the original Task was already doing. That's not a
hypothetical: it's the exact root cause this chapter's bug traces back to in Lesson 14. Treat
`ALTER TASK ... RESUME` as a real, deliberate action worth double-checking with `SHOW TASKS` first
— not a command to run reflexively "just in case."

## Watching a real scheduled run happen

Load a new batch of sample ticket JSON into `tickets_api_raw` (repeat Lesson 3's `COPY INTO`
with a second file), then wait for the next scheduled tick — or trigger an immediate run manually
for testing:

```sql
EXECUTE TASK driftwood_analytics.raw.ticket_facts_sync_task;
EXECUTE TASK driftwood_analytics.raw.finance_refund_task;
```

Then check what actually happened:

```sql
SELECT *
FROM TABLE(INFORMATION_SCHEMA.TASK_HISTORY(
    TASK_NAME => 'TICKET_FACTS_SYNC_TASK',
    RESULT_LIMIT => 10
))
ORDER BY SCHEDULED_TIME DESC;
```

`TASK_HISTORY` shows every run's state (`SUCCEEDED`, `FAILED`, `SKIPPED`), start and end time, and
any error message. `SKIPPED` runs are expected and healthy — they mean the `WHEN` clause correctly
found no new Stream data and didn't bother running the `MERGE`. This exact function is what
Lesson 14 reaches for again, when something has actually gone wrong.

## Confirming the data actually moved

```sql
SELECT COUNT(*) FROM driftwood_analytics.marts.ticket_facts;
SELECT COUNT(*) FROM driftwood_analytics.marts.refund_events;
SELECT SYSTEM$STREAM_HAS_DATA('driftwood_analytics.raw.tickets_stream');
```

After a successful run, both target tables should show new rows, and `SYSTEM$STREAM_HAS_DATA`
should now return `FALSE` — the Stream's offset advanced, so there's nothing left unconsumed until
the next JSON file lands.

## Key terms

| Term | Meaning |
|---|---|
| `ALTER TASK ... RESUME` | Moves a Task from SUSPENDED to actively running on its schedule |
| `TASK_HISTORY` | An Information Schema function showing every past run of a Task, and its outcome |
| `SKIPPED` | A healthy TASK_HISTORY outcome meaning the WHEN clause found no work to do |

## Lab

Resume both Tasks on your own Snowflake trial account. Load a second batch of sample JSON, wait
for (or manually `EXECUTE`) both Tasks, and confirm via `TASK_HISTORY` that both show
`SUCCEEDED`. Confirm the row counts in `ticket_facts` and `refund_events` both grew by the
expected amount, and that `SYSTEM$STREAM_HAS_DATA` returns `FALSE` afterward.

## Check yourself

You're ready for Lesson 8 when you can answer, without looking: why does this lesson treat
`ALTER TASK ... RESUME` as something worth double-checking with `SHOW TASKS` first, rather than a
routine command to run without thinking about it?
