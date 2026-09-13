# Lesson 23 — Airflow + Snowflake COPY INTO

**Chapter 5 · Practical Data Pipelines With Airflow · Lesson 23 of 30**

## What you'll learn

- How to trigger a Snowflake `COPY INTO` load from an Airflow task, on
  a real schedule
- Which operator Airflow's own Snowflake provider actually recommends
  today — and why the older, Snowflake-specific operator isn't it
  anymore
- How this fits next to Snowpipe, which you already know from the
  Snowflake course, and when you'd pick one over the other
- What actually shows up in the task log when the load runs

## `COPY INTO`, from Airflow instead of a worksheet

You already know `COPY INTO` from the Snowflake course — the statement
that loads staged files (in an internal or external stage) into a
table. The only thing that changes here is *what runs it*: instead of
pasting it into a Snowflake worksheet by hand, an Airflow task runs it
on a schedule, as part of a larger pipeline (the `load_to_snowflake`
task from Lesson 21).

```sql
-- copy_into_raw_sales.sql
COPY INTO raw.sales.orders
FROM @raw.sales.orders_stage
FILE_FORMAT = (TYPE = 'CSV', SKIP_HEADER = 1)
ON_ERROR = 'ABORT_STATEMENT';
```

## The operator: `SQLExecuteQueryOperator`, not a Snowflake-only one

Airflow's Snowflake provider used to ship a dedicated
`SnowflakeOperator`. Its own current documentation has since replaced
that operator's page with **`SQLExecuteQueryOperator`** — the same
general-purpose SQL operator used for any database connection,
pointed at a Snowflake `conn_id`. This matters practically: if you're
following a tutorial that still shows `SnowflakeOperator`, it's
outdated — write new DAGs against `SQLExecuteQueryOperator`.

```python
from airflow import DAG
from airflow.providers.common.sql.operators.sql import SQLExecuteQueryOperator
from datetime import datetime

with DAG(
    dag_id="load_orders_hourly",
    schedule="0 * * * *",          # every hour
    start_date=datetime(2026, 1, 1),
    catchup=False,
) as dag:

    copy_into_orders = SQLExecuteQueryOperator(
        task_id="copy_into_orders",
        conn_id="snowflake_default",
        sql="copy_into_raw_sales.sql",
    )
```

The `.sql` file is loaded from the DAG's own SQL templates folder
(same pattern as Lesson 21's `load_to_snowflake` task) — nothing new
mechanically, just a real `COPY INTO` statement instead of a
placeholder.

## Where this sits next to Snowpipe

The Snowflake course also covers **Snowpipe** — Snowflake's own
continuous, event-driven loading, triggered automatically the moment a
file lands in a stage. That's a genuinely different tool for a
genuinely different situation:

- **Snowpipe**: files arrive unpredictably throughout the day, and you
  want them loaded within seconds to minutes, with no external
  scheduler involved at all.
- **Airflow + scheduled `COPY INTO`**: loads happen in predictable
  batches (hourly, nightly), and — critically — you want that load to
  be one step in a larger pipeline Airflow already controls: wait for
  a check, load, then trigger the dbt build (Lesson 22), with retries
  and alerting (Lessons 24-25) wrapped around the whole thing.

Airflow doesn't replace Snowpipe; it's the right tool when the load
needs to be *coordinated* with other steps, not just fast.

## What the task log actually shows

When `copy_into_orders` runs, its Airflow task log shows the real
`COPY INTO` result Snowflake returns — file name, rows parsed, rows
loaded, and any errors, exactly as if you'd run it in a worksheet
yourself. That output is what you'd read first if this task ever
fails — which Lesson 24 covers next.

## Key terms

| Term | Meaning |
|---|---|
| `COPY INTO` | The Snowflake statement that loads staged files into a table (from the Snowflake course) |
| `SQLExecuteQueryOperator` | Airflow's current, general-purpose SQL operator — the recommended way to run `COPY INTO` against a Snowflake `conn_id` |
| Snowpipe | Snowflake's own continuous, event-driven loading — a different tool from a scheduled Airflow load |

## Lab

1. Write a `COPY INTO` statement for a table you've loaded before in
   the Snowflake course.
2. Wrap it in a `SQLExecuteQueryOperator` task, exactly as shown above,
   with a `conn_id` and a `sql` reference to that statement.
3. In one sentence, decide: for that specific table, would Snowpipe or
   a scheduled Airflow load be the better fit — and why?

## Check yourself

You're ready for Lesson 24 when you can explain why `SQLExecuteQueryOperator`
is the current recommended way to run Snowflake SQL from Airflow, not
a Snowflake-specific operator.
