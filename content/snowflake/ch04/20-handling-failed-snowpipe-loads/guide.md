# Lesson 20 — Handling Failed Snowpipe Loads

**Chapter 4 · Snowpipe & Automated Ingestion · Lesson 20 of 60**

## What you'll learn

- Where to look when a pipe seems to have stopped loading anything
- `COPY_HISTORY` vs. `PIPE_USAGE_HISTORY` — what each one actually tells you
- The most common real causes of a stuck or failing pipe
- How to safely resume a pipe after fixing the underlying problem

> No real Snowsight screenshot exists for this lesson — the dedicated
> Getting Started with Snowpipe quickstart (Lessons 18-19's source) covers
> only the happy-path setup, with no failure or troubleshooting screens
> among its images, and docs.snowflake.com's monitoring pages render no
> screenshots at all. Every example here is real, correct SQL you can run.

## Start with COPY_HISTORY — it works for pipes too

The same `COPY_HISTORY` table function from Lesson 16 reports Snowpipe
loads, not just manual `COPY INTO` — Snowpipe's automatic loads still go
through the same underlying load path and get logged the same way:

```sql
SELECT file_name, status, error_count, first_error_message, last_load_time
FROM TABLE(INFORMATION_SCHEMA.COPY_HISTORY(
  TABLE_NAME => 'my_table',
  START_TIME => DATEADD(hours, -24, CURRENT_TIMESTAMP())
))
WHERE status != 'LOADED'
ORDER BY last_load_time DESC;
```

If a file shows up here with a `PARTIALLY_LOADED` or `LOAD_FAILED`
status, the problem is almost always in the file itself or the pipe's
`ON_ERROR` setting — check `first_error_message` first.

## PIPE_USAGE_HISTORY — for "is the pipe even running"

A pipe that never received the file at all won't show up in
`COPY_HISTORY` — there's nothing to report on a load that never started.
For that, `PIPE_USAGE_HISTORY` reports on the pipe itself: how many files
it's seen, how many bytes, and over what window:

```sql
SELECT *
FROM TABLE(INFORMATION_SCHEMA.PIPE_USAGE_HISTORY(
  DATE_RANGE_START => DATEADD(hours, -24, CURRENT_TIMESTAMP()),
  PIPE_NAME => 'my_db.public.my_pipe'
));
```

Zero rows, or a `credits_used` that stayed at zero while you know files
landed in the bucket, points at the trigger itself — the event
notification never fired, not a data problem inside a file.

## Common real causes, roughly in order of likelihood

1. **Notification ARN mismatch** — the S3/Blob/GCS event notification
   points at the wrong queue, or was never saved (Lesson 19's exact
   failure mode).
2. **Permission gaps** — the pipe's role lacks `INSERT` on the target
   table, or `USAGE` on the stage, after a grant was revoked or the pipe
   was recreated under a different owner.
3. **File format mismatches** — a source system started sending a
   slightly different CSV shape, and rows that used to parse now don't.
4. **A paused pipe** — someone ran `ALTER PIPE ... SET
   PIPE_EXECUTION_PAUSED = TRUE` (often for maintenance) and forgot to
   resume it.

Check `SYSTEM$PIPE_STATUS` (Lesson 19) first — `executionState: PAUSED`
rules out three of these four instantly and points straight at cause 4.

## Resuming a pipe safely

```sql
-- Confirm it's actually paused
SELECT SYSTEM$PIPE_STATUS('my_db.public.my_pipe');

-- Resume it
ALTER PIPE my_db.public.my_pipe SET PIPE_EXECUTION_PAUSED = FALSE;

-- Files that arrived while paused are NOT automatically picked up —
-- refresh explicitly to pick up anything missed:
ALTER PIPE my_db.public.my_pipe REFRESH;
```

`ALTER PIPE ... REFRESH` re-scans the stage for files the pipe missed
while paused (or during any gap) and queues them — without it, files
that landed during the outage sit in the bucket forever, invisible to
Snowflake, since the event that would have triggered them already fired
and passed.

## Key terms

| Term | Meaning |
|---|---|
| COPY_HISTORY | Per-file load outcomes — works for both manual COPY INTO and Snowpipe |
| PIPE_USAGE_HISTORY | Per-pipe activity summary — files seen, bytes, credits used |
| PIPE_EXECUTION_PAUSED | Pipe setting that stops it from processing new events |
| ALTER PIPE ... REFRESH | Re-scans a stage for files missed during a pause or outage |

## Lab

1. Query `PIPE_USAGE_HISTORY` for any pipe you've created, even if it has
   zero activity — confirm the function runs and returns the expected
   columns.
2. Write the exact sequence of statements you'd run to diagnose a pipe
   that seems to have stopped: which function first, what you'd check in
   its output, and what you'd run next depending on the answer.

## Check yourself

You've completed Chapter 4 when you can explain the difference between
"the pipe never received the file" (a `PIPE_USAGE_HISTORY` question) and
"the pipe received the file but couldn't load it" (a `COPY_HISTORY`
question) — and why `ALTER PIPE ... REFRESH` is needed after resuming a
paused pipe, not just unpausing it.
