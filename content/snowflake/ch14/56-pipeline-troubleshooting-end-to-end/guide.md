# Lesson 56 — Pipeline Troubleshooting, End to End

**Chapter 14 · Monitoring & Troubleshooting · Lesson 56 of 60**

## What you'll learn

- A realistic scenario — "the daily load didn't run" — worked end to
  end
- How to check each link in a Snowpipe → Stream → Task chain, in order
- Why walking the chain in order beats guessing which piece broke

## The scenario

It's 9 a.m. The reporting table that's supposed to refresh every
night is still showing yesterday's numbers. Nobody got paged, there's
no red banner anywhere — it just quietly didn't happen. This is the
single most common real troubleshooting scenario in a Snowflake shop
running Snowpipe (Ch. 4) feeding Streams and Tasks (Ch. 8). Walking
the chain in order, from raw file to reporting table, finds the break
faster than guessing:

## Step 1: did the file even load?

Start at the beginning, not the end. Check whether Snowpipe actually
picked up and processed the file:

```sql
SELECT SYSTEM$PIPE_STATUS('raw_orders_pipe');
-- returns JSON: executionState, pendingFileCount, lastIngestedTimestamp

SELECT file_name, status, first_error_message
FROM TABLE(INFORMATION_SCHEMA.COPY_HISTORY(
  table_name => 'RAW.ORDERS',
  start_time => DATEADD(hours, -24, CURRENT_TIMESTAMP())
));
```

If `pendingFileCount` is stuck above zero, or `COPY_HISTORY` shows the
file with an error status, the problem never got past ingestion — fix
it here (Lesson 54's `COPY_HISTORY` query) before looking anywhere
else downstream.

## Step 2: did the Stream actually capture the change?

If the file loaded fine, check whether the Stream on the raw table has
anything in it — an empty stream means nothing downstream had reason
to run:

```sql
SELECT SYSTEM$STREAM_HAS_DATA('raw_orders_stream');
-- TRUE/FALSE

SELECT COUNT(*) FROM raw_orders_stream;  -- peek at what it's holding
```

A `FALSE` here, with rows clearly loaded in Step 1, points at the
Stream itself — most often it was consumed by an earlier run (Streams
reset once read inside a committed transaction) or was recreated and
lost its offset.

## Step 3: did the Task run, and did it succeed?

Tasks fail silently unless someone checks `TASK_HISTORY` — there's no
popup, just a table's timestamp quietly not moving:

```sql
SELECT name, state, scheduled_time, completed_time, error_message
FROM TABLE(INFORMATION_SCHEMA.TASK_HISTORY(
  task_name => 'refresh_orders_summary',
  scheduled_time_range_start => DATEADD(hours, -24, CURRENT_TIMESTAMP())
))
ORDER BY scheduled_time DESC;
```

`state` will be `SUCCEEDED`, `FAILED`, or — easy to miss —
**`SKIPPED`**, which happens when a Task's `WHEN` condition (often
tied to `SYSTEM$STREAM_HAS_DATA`) evaluated false. A string of
`SKIPPED` rows, not `FAILED` ones, is exactly what you'd see if Step 2
came back empty: the whole chain is consistent, just stalled one link
back.

## Step 4: did the downstream table actually update?

Confirm the fix landed, not just that the Task ran:

```sql
SELECT MAX(loaded_at) AS last_refresh, COUNT(*) AS row_count
FROM reporting.orders_summary;
```

## The chain, in order

1. **Pipe** — did the file load? (`SYSTEM$PIPE_STATUS`, `COPY_HISTORY`)
2. **Stream** — did it capture a change? (`SYSTEM$STREAM_HAS_DATA`)
3. **Task** — did it run and succeed? (`TASK_HISTORY`)
4. **Table** — did the result actually land? (`MAX(loaded_at)`)

Checking these in order — not jumping straight to "the Task must be
broken" — is what turns a vague "the load didn't run" into a specific,
one-sentence root cause every time.

## Key terms

| Term | Meaning |
|---|---|
| `SYSTEM$PIPE_STATUS` | JSON status of a Snowpipe, including pending files and last ingest time |
| `SYSTEM$STREAM_HAS_DATA` | Whether a Stream currently holds unconsumed change data |
| `TASK_HISTORY` | Table function showing a Task's run history, including SKIPPED runs from a false WHEN condition |
| Chain-walking | Diagnosing a multi-step pipeline by checking each link in order, not guessing which one broke |

## Lab

1. Using your own Snowpipe/Stream/Task setup from Chapters 4 and 8 (or
   rebuild a small version), run all four diagnostic queries above in
   order against it.
2. Deliberately let a Stream go empty (consume it once, don't reload
   data), then check `TASK_HISTORY` — confirm you see `SKIPPED`, not
   `FAILED`.
3. Write out, in one sentence per step, what each of the four checks
   would show if the *file* never arrived at the stage at all versus if
   the *Task* itself had a SQL error.

## Check yourself

You're ready for Lesson 57 when, given "the daily load didn't run,"
you can walk pipe → stream → task → table in order and name the exact
link that broke, using SQL rather than guessing.
