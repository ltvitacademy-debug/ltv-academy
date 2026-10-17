# Orchestrating With Airflow

Loading into Snowflake (Lesson 3) and transforming with dbt (Lessons 4-5) both work when run by
hand. Driftwood needs them to run automatically, in the right order, every single day, with a
failure in one step actually stopping the next one from running on bad data. That's this lesson.

## What you'll learn

- The real shape of the `driftwood_daily_elt` DAG — tasks, dependencies, and why the order matters
- How this DAG calls dbt directly, the same pattern the Airflow course's own "Airflow + dbt"
  lesson teaches
- Why a validation task runs before the real load, not after

## The DAG, task by task

```python
from airflow import DAG
from airflow.operators.bash import BashOperator
from airflow.providers.snowflake.operators.snowflake import SnowflakeOperator
from datetime import datetime

with DAG(
    dag_id="driftwood_daily_elt",
    schedule="0 6 * * *",     # 6 AM daily -- leadership opens the dashboard by 9
    start_date=datetime(2026, 1, 1),
    catchup=False,
) as dag:

    validate_billing_load = SnowflakeOperator(
        task_id="validate_billing_load",
        snowflake_conn_id="driftwood_snowflake",
        sql="""
            COPY INTO driftwood_analytics.raw.billing_events
            FROM @driftwood_analytics.raw.driftwood_raw_stage/billing/dt={{ ds }}/
            FILE_FORMAT = (FORMAT_NAME = driftwood_analytics.raw.csv_format)
            VALIDATION_MODE = 'RETURN_ERRORS';
        """,
    )

    load_billing = SnowflakeOperator(
        task_id="load_billing",
        snowflake_conn_id="driftwood_snowflake",
        sql="""
            COPY INTO driftwood_analytics.raw.billing_events
            FROM @driftwood_analytics.raw.driftwood_raw_stage/billing/dt={{ ds }}/
            FILE_FORMAT = (FORMAT_NAME = driftwood_analytics.raw.csv_format)
            ON_ERROR = 'ABORT_STATEMENT';
        """,
    )

    load_usage = SnowflakeOperator(
        task_id="load_usage",
        snowflake_conn_id="driftwood_snowflake",
        sql="""
            COPY INTO driftwood_analytics.raw.usage_events
            FROM @driftwood_analytics.raw.driftwood_raw_stage/usage/dt={{ ds }}/
            FILE_FORMAT = (FORMAT_NAME = driftwood_analytics.raw.csv_format)
            ON_ERROR = 'ABORT_STATEMENT';
        """,
    )

    dbt_run = BashOperator(
        task_id="dbt_run",
        bash_command="dbt run --project-dir /opt/dbt/driftwood_analytics --target prod",
    )

    dbt_test = BashOperator(
        task_id="dbt_test",
        bash_command="dbt test --project-dir /opt/dbt/driftwood_analytics --target prod",
    )

    validate_billing_load >> [load_billing, load_usage] >> dbt_run >> dbt_test
```

## Why validate before load, and why both loads before dbt

`validate_billing_load` runs Lesson 3's `VALIDATION_MODE = 'RETURN_ERRORS'` check first, as its
own task, before `load_billing` actually commits anything. If the day's billing export is
malformed, the DAG fails here — at the very first task, with a specific "validation found bad
rows" signal — instead of either loading bad data or failing confusingly three tasks later.

`load_billing` and `load_usage` both run (in parallel, since they don't depend on each other)
*before* `dbt_run`, and both must succeed first: Lesson 4's `int_subscriber_activity` model joins
billing and usage data together, so running `dbt_run` against only half the day's raw data would
produce a wrong, half-populated join — not an error, just quietly wrong numbers.

## Calling dbt directly — the Airflow + dbt pattern

`dbt_run` and `dbt_test` as separate tasks (rather than one combined step) is deliberate, the same
separation the Airflow course's own "Airflow + dbt" lesson teaches: if `dbt_test` fails, Airflow's
task-level status shows exactly that the models built successfully but a test caught a real data
problem — a materially different, more actionable failure than "something in the dbt run broke."

## Key terms

| Term | Meaning |
|---|---|
| `driftwood_daily_elt` | This capstone's DAG ID — the orchestrated daily load/transform/test sequence |
| `>>` | Airflow's operator for declaring task dependency order |
| Parallel tasks | `load_billing` and `load_usage` run concurrently since neither depends on the other |

## Check yourself

Why does the DAG require both `load_billing` and `load_usage` to succeed before `dbt_run` starts,
rather than letting `dbt_run` begin as soon as either one finishes?
