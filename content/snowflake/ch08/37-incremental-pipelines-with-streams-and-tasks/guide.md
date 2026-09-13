# Lesson 37 — Building Incremental Pipelines With Streams + Tasks

**Chapter 8 · Streams & Tasks · Lesson 37 of 60**

## What you'll learn

- How Streams (Lesson 35) and Tasks (Lesson 36) combine into one
  self-running incremental pipeline
- The full pattern: a task, gated on `SYSTEM$STREAM_HAS_DATA`, that
  `MERGE`s a stream's changes into a target table on a schedule
- How this replaces the manual incremental-loading pattern from
  Lesson 23, and feeds directly into the SCD Type 1/2 logic from
  Lessons 28–29
- How to confirm, in Snowsight, that a scheduled pipeline is actually
  processing changes incrementally rather than reprocessing everything

## From two pieces to one pipeline

Lesson 23 taught incremental loading with a watermark column you
tracked yourself. Lesson 35 replaced that watermark with a Stream —
Snowflake tracking changes natively. Lesson 36 added Tasks — running
work on a schedule without an external orchestrator. Put the three
ideas together and you get a pipeline that requires no manual
intervention at all:

```sql
CREATE OR REPLACE TASK apply_customer_changes
    WAREHOUSE = analytics_wh
    SCHEDULE = '5 MINUTE'
    WHEN SYSTEM$STREAM_HAS_DATA('customers_stream')
AS
    MERGE INTO customers_dim AS tgt
    USING customers_stream AS src
        ON tgt.customer_id = src.customer_id
    WHEN MATCHED AND src.METADATA$ACTION = 'DELETE' AND src.METADATA$ISUPDATE = FALSE
        THEN DELETE
    WHEN MATCHED AND src.METADATA$ACTION = 'INSERT'
        THEN UPDATE SET tgt.name = src.name, tgt.email = src.email
    WHEN NOT MATCHED AND src.METADATA$ACTION = 'INSERT'
        THEN INSERT (customer_id, name, email)
        VALUES (src.customer_id, src.name, src.email);
```

Notice this is the same `MERGE` pattern from Lesson 9 — the difference
is *what* it merges from: not a full source table, but a stream
containing only what actually changed. The `WHEN` clause means the
task's warehouse doesn't even spin up when there's nothing new.

## Why this matters for SCD, not just plain sync

This pattern isn't limited to keeping a dimension table in perfect
sync (SCD Type 1, Lesson 28). Because a stream tells you exactly
*which* rows changed and whether it was an insert, update, or delete,
you have everything SCD Type 2 (Lesson 29) needs to close out an old
row version and insert a new one — the stream's `METADATA$ACTION` and
`METADATA$ISUPDATE` columns map directly onto "this attribute changed,
start a new version." A Streams+Tasks pipeline is how SCD Type 2 gets
run continuously in production, instead of as a batch job someone
remembers to kick off.

## Verifying it's actually incremental

Once a pipeline like this has been running for a while, verify it's
doing what you think it's doing — processing small incremental
batches, not silently reprocessing everything. Snowsight's Query
History lets you isolate exactly the queries a task ran:

![Snowsight's Query History Filters panel, with the 'Queries executed by user tasks' toggle switched on — isolating queries a scheduled task ran from ad-hoc worksheet activity.](/courses/snowflake/ch08/37-incremental-pipelines-with-streams-and-tasks/query-history-task-filter.png)
*Filtering to task-executed queries only, so you can check each MERGE's row counts without wading through everyone else's worksheet activity.*
Source: [Snowflake Quickstarts — Data Engineering Pipelines with Snowpark Python](https://quickstarts.snowflake.com/guide/data_engineering_pipelines_with_snowpark_python/index.html)

With that filter applied, open one of the task's `MERGE` statements in
Query History and check the rows-affected count — it should track the
size of your actual changes (a handful of rows), not the size of the
whole source table. If it's consistently large, something's wrong
with the stream, not just the schedule.

## Key terms

| Term | Meaning |
|---|---|
| Streams + Tasks pipeline | A task, gated on a stream having data, that MERGEs the stream's changes into a target table on a schedule |
| Queries executed by user tasks | A Query History filter that isolates exactly what a scheduled task ran, separate from manual queries |
| Continuous SCD | Running SCD Type 1/2 logic automatically on each incremental batch, instead of as a manually-triggered batch job |

## Lab

1. Reuse (or rebuild) the stream and target table from Lesson 35's
   lab.
2. Write a `MERGE` statement that applies the stream's `INSERT` and
   `DELETE` actions to the target table, matching the pattern above.
3. Wrap that `MERGE` in a task, gated with `WHEN
   SYSTEM$STREAM_HAS_DATA(...)`, on a short schedule (1–5 minutes).
4. Resume the task, make a handful of changes to the source table, and
   confirm — using Query History filtered to task-executed queries —
   that each run's `MERGE` only affected the rows you actually
   changed.

## Check yourself

You're ready for Lesson 38 when you can explain, in one sentence, how
a stream's `METADATA$ACTION`/`METADATA$ISUPDATE` columns map onto SCD
logic — and you've verified a real Streams+Tasks pipeline processing
incrementally in Query History.
