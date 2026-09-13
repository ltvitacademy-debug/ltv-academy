# Lesson 24 — Error Handling & Retries

**Chapter 5 · Practical Data Pipelines With Airflow · Lesson 24 of 30**

## What you'll learn

- What a real failed task actually looks like in Airflow's log — not
  a hypothetical, the actual exception and traceback
- The two settings that control retries: `retries` and `retry_delay`
- How to back off retries over time instead of hammering a flaky
  system immediately, three times in a row
- `on_failure_callback` — running your own code the moment a task
  gives up

## What a real failure looks like first

Before configuring anything, it's worth seeing what Airflow shows you
when a task fails, because retry settings exist entirely to respond to
this:

![Airflow's task Logs tab for a failed task instance: a red "Failed" status banner, and real log lines ending in an ERROR line "Task failed with exception", followed by a full Python traceback through Airflow's own execution stack, ending in "Exception: Random failure".](/courses/airflow/ch05/24-error-handling-and-retries/airflow-failed-task-log.png)
*This is a genuine raised exception and full traceback — not a mockup. Every failed task in Airflow produces a log exactly like this, with the real Python error at the bottom.*
Source: [Apache Airflow Documentation — Task Logs](https://airflow.apache.org/docs/apache-airflow/stable/ui.html)

Nothing about retries changes what gets logged here. What retries
control is what Airflow *does next*, after a failure like this one.

## `retries` and `retry_delay`

Set on any task (or on every task at once, via `default_args`):

```python
from datetime import timedelta

load_to_snowflake = SQLExecuteQueryOperator(
    task_id="load_to_snowflake",
    conn_id="snowflake_default",
    sql="copy_into_raw_sales.sql",
    retries=3,
    retry_delay=timedelta(minutes=5),
)
```

`retries=3` means: if this task fails, try it up to 3 more times before
marking the task instance as permanently `failed`. `retry_delay` is
the wait between attempts — here, 5 minutes. This matters because a
lot of real failures (a transient network blip, a warehouse briefly
out of capacity, a source system mid-deploy) resolve themselves within
minutes — a retry is often the entire fix.

## Backing off instead of hammering

Retrying the exact same way, 5 minutes apart, 3 times, isn't always
the right shape — if the problem is a struggling downstream system,
retrying quickly can make it worse. Airflow supports exponential
backoff on the same two settings:

```python
load_to_snowflake = SQLExecuteQueryOperator(
    task_id="load_to_snowflake",
    conn_id="snowflake_default",
    sql="copy_into_raw_sales.sql",
    retries=5,
    retry_delay=timedelta(minutes=2),
    retry_exponential_backoff=True,
    max_retry_delay=timedelta(minutes=30),
)
```

With `retry_exponential_backoff=True`, each retry waits longer than
the last (roughly doubling from `retry_delay`), capped at
`max_retry_delay` so it never waits forever between attempts.

## Setting it for every task at once: `default_args`

Repeating `retries` and `retry_delay` on every task in a DAG gets
tedious fast. `default_args` sets them once, for every task in the
DAG — any task can still override a specific value if it needs to:

```python
default_args = {
    "retries": 3,
    "retry_delay": timedelta(minutes=5),
}

with DAG(
    dag_id="sales_elt_pipeline",
    default_args=default_args,
    schedule="0 6 * * *",
    start_date=datetime(2026, 1, 1),
    catchup=False,
) as dag:
    ...
```

## `on_failure_callback`: running code the moment a task gives up

`on_failure_callback` runs a function of your own the instant a task
instance is marked `failed` — after all its retries are exhausted, not
after each individual attempt:

```python
def notify_data_team(context):
    task_id = context["task_instance"].task_id
    dag_id = context["dag"].dag_id
    print(f"{dag_id}.{task_id} failed after all retries.")
    # Lesson 25 replaces this print with a real email or Slack alert.

load_to_snowflake = SQLExecuteQueryOperator(
    task_id="load_to_snowflake",
    conn_id="snowflake_default",
    sql="copy_into_raw_sales.sql",
    retries=3,
    retry_delay=timedelta(minutes=5),
    on_failure_callback=notify_data_team,
)
```

`context` is a dictionary Airflow hands the callback with everything
about the failed run — which task, which DAG, which execution date —
so the callback can report exactly what broke. This lesson just prints
it; Lesson 25 turns it into a real alert.

## Key terms

| Term | Meaning |
|---|---|
| `retries` | How many times a failed task automatically re-attempts before being marked permanently failed |
| `retry_delay` | The wait time between retry attempts |
| `retry_exponential_backoff` | Makes each retry wait longer than the last, instead of a fixed delay |
| `default_args` | A dict of settings (like `retries`) applied to every task in a DAG at once |
| `on_failure_callback` | A function that runs the moment a task instance is finally marked failed, after retries are exhausted |

## Lab

1. Take the `load_to_snowflake` task from Lesson 21 and add `retries`
   and `retry_delay` to it directly.
2. Move those two settings into `default_args` instead, so every task
   in the DAG gets them.
3. Write a one-line `on_failure_callback` function that just prints
   which task and DAG failed — wire it onto one task.

## Check yourself

You're ready for Lesson 25 when you can explain the difference between
what `retries` does and what `on_failure_callback` does — specifically,
at what point each one actually runs.
