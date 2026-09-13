# Lesson 36 — Tasks: Scheduled Processing

**Chapter 8 · Streams & Tasks · Lesson 36 of 60**

## What you'll learn

- What a `TASK` object is: Snowflake's native scheduler for running
  SQL or a stored procedure, on a schedule or triggered by a stream
- How to create a task with `CREATE TASK ... SCHEDULE ...`, and how to
  actually turn it on (tasks are created suspended)
- How to inspect a task's run history in Snowsight — what succeeded,
  what failed, and how long each run took
- How `WHEN SYSTEM$STREAM_HAS_DATA(...)` lets a task skip its own run
  when there's nothing new to process

## TASK: Snowflake's built-in scheduler

A `TASK` runs a single SQL statement or a stored procedure call, on a
schedule you define, with no external scheduler (no cron job, no
Airflow DAG needed) required:

```sql
CREATE OR REPLACE TASK refresh_orders_summary
    WAREHOUSE = analytics_wh
    SCHEDULE = '60 MINUTE'
AS
    INSERT INTO orders_summary
    SELECT customer_id, SUM(amount) AS total
    FROM orders
    GROUP BY customer_id;
```

That task re-runs its `INSERT` every 60 minutes, using the specified
warehouse. Schedules also accept standard cron syntax
(`'USING CRON 0 * * * * UTC'`) when you need something more specific
than a fixed interval.

## Tasks are created suspended

This trips up almost everyone the first time: a newly created task
does **not** start running. It's created in a `SUSPENDED` state, and
you have to explicitly turn it on:

```sql
ALTER TASK refresh_orders_summary RESUME;
```

`ALTER TASK ... SUSPEND` turns it back off. This matters for cost
control (Chapter 11) as much as correctness — a suspended task costs
nothing, so it's the safe default while you're still building and
testing one.

## Inspecting task runs in Snowsight

Once a task has run at least once, Snowsight gives you a real run
history — every scheduled execution, its status, and how long it took:

![A Snowsight task's detail page, Run History tab: a bar chart of runs per day, and a table listing each run's scheduled time, status (Succeeded), duration, and a link to its query.](/courses/snowflake/ch08/36-tasks-scheduled-processing/task-run-history.png)
*This is exactly where you'd look to confirm a task actually ran on schedule, and how long each run took.*
Source: [Snowflake Quickstarts — Data Engineering Pipelines with Snowpark Python](https://quickstarts.snowflake.com/guide/data_engineering_pipelines_with_snowpark_python/index.html)

This view is where you'd notice a task that's silently been failing —
Status would show `Failed` instead of `Succeeded`, right alongside the
run that caused it.

## Skipping a run when there's nothing to do

Running a task's full logic every hour is wasteful if the underlying
data hasn't changed. Pairing a task with a stream (Lesson 35) lets you
skip the run entirely when the stream is empty:

```sql
CREATE OR REPLACE TASK process_orders_stream
    WAREHOUSE = analytics_wh
    SCHEDULE = '5 MINUTE'
    WHEN SYSTEM$STREAM_HAS_DATA('orders_stream')
AS
    INSERT INTO orders_summary
    SELECT * FROM orders_stream;
```

`SYSTEM$STREAM_HAS_DATA()` is a cheap check — the task's warehouse
only spins up and does real work when there's actually something new
in the stream to consume. Lesson 37 builds this exact pattern out into
a full incremental pipeline.

## Key terms

| Term | Meaning |
|---|---|
| TASK | A Snowflake object that runs a SQL statement or procedure on a schedule |
| SCHEDULE | Either a fixed interval (`'60 MINUTE'`) or cron syntax (`'USING CRON ...'`) |
| SUSPENDED / RESUME | A task's default off state, and the command to turn it on |
| `SYSTEM$STREAM_HAS_DATA()` | A cheap check used in `WHEN` to skip a task's run when a paired stream is empty |

## Lab

1. Create a task on a small table that runs every minute and inserts a
   row into a log table (something harmless and easy to watch).
2. Resume it with `ALTER TASK ... RESUME;` and wait a few minutes.
3. Open the task in Snowsight and check its Run History tab — confirm
   you see multiple `Succeeded` runs at roughly the interval you set.
4. Suspend it with `ALTER TASK ... SUSPEND;` and confirm no new runs
   appear after that.

## Check yourself

You're ready for Lesson 37 when you can explain, in one sentence, why
tasks start suspended by default, and you've located a task's Run
History tab in Snowsight yourself.
