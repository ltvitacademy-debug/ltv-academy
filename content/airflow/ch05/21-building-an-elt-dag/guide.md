# Lesson 21 — Building an ELT DAG

**Chapter 5 · Practical Data Pipelines With Airflow · Lesson 21 of 30**

## What you'll learn

- The shape almost every real Airflow pipeline in a warehouse takes:
  extract (or check for new data), load, then trigger transform
- How to write that shape as one real DAG, using operators and
  dependencies you already know from Chapters 1-4
- What that DAG actually looks like once it's running, in the real
  Graph view
- Where the "load" and "transform" steps are headed next — real
  Snowflake and dbt integration, in Lessons 22 and 23

## The shape of a real ELT pipeline

Every DAG you've built so far in this course has been built to teach
one mechanism at a time — one operator, one dependency, one trigger
rule. A real pipeline in a warehouse-based business almost always
collapses into the same three-step shape:

1. **Extract, or check for new data.** Is there anything new to
   process since the last run? (A file landed in storage, a table has
   new rows, an API has new records.)
2. **Load.** Land that raw data into the warehouse — Snowflake, in
   this catalog's stack (Lesson 23 covers the real mechanics: `COPY
   INTO`).
3. **Transform.** Trigger the modeling layer that turns raw data into
   something usable — dbt, in this catalog's stack (Lesson 22 covers
   triggering it from Airflow specifically).

This isn't a new concept — it's Chapters 1 through 4 applied together:
operators to do the work, `>>` to declare the order, a schedule to run
it automatically, and (starting next chapter) retries and alerting so
you know when a step in that chain breaks.

## The DAG, tying it together

```python
from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.operators.bash import BashOperator
from airflow.providers.common.sql.operators.sql import SQLExecuteQueryOperator
from datetime import datetime

with DAG(
    dag_id="sales_elt_pipeline",
    schedule="0 6 * * *",       # every day at 6 AM — Chapter 2
    start_date=datetime(2026, 1, 1),
    catchup=False,
) as dag:

    check_for_new_data = PythonOperator(
        task_id="check_for_new_data",
        python_callable=check_source_for_new_files,   # your own function
    )

    load_to_snowflake = SQLExecuteQueryOperator(
        task_id="load_to_snowflake",
        conn_id="snowflake_default",                  # Chapter 3: Connections
        sql="sql/copy_into_raw_sales.sql",             # real COPY INTO — Lesson 23
    )

    trigger_dbt_build = BashOperator(
        task_id="trigger_dbt_build",
        bash_command="cd /opt/dbt/sales_project && dbt build",  # Lesson 22
    )

    check_for_new_data >> load_to_snowflake >> trigger_dbt_build
```

Nothing here is a new mechanism. `PythonOperator` and `BashOperator`
are from Chapter 2, `SQLExecuteQueryOperator` and `conn_id` are from
Chapter 3's Connections lesson, `schedule` is Chapter 2's scheduling
lesson, and `>>` is the same dependency operator from Lesson 7. What's
new is putting all four together into one pipeline that reflects an
actual job: check, load, transform.

![Airflow's Graph view for a real multi-task DAG run: dozens of chained task boxes colored by state (green success, red failed, orange upstream_failed), with a Task Instances panel on the right listing each task's State and Try Number.](/courses/airflow/ch05/21-building-an-elt-dag/airflow-elt-dag-graph.png)
*This is what a dependency chain like `check_for_new_data >> load_to_snowflake >> trigger_dbt_build` actually renders as once Airflow runs it — every box is one task, and the lines are the exact order your code declared.*
Source: [Apache Airflow Documentation — Graph View](https://airflow.apache.org/docs/apache-airflow/stable/ui.html)

A real pipeline usually has more than three tasks — branches for
different data sources, a sensor waiting on an upstream file, a
dynamic set of per-table load tasks — but it's still the same
extract → load → transform shape underneath, just wider.

## What this DAG does *not* yet handle

This version has no retry configuration and no failure notification —
if `load_to_snowflake` fails at 3 AM, nobody finds out until someone
happens to check. That's deliberate: Lesson 24 adds `retries` and
`retry_delay`, and Lesson 25 adds alerting on top of that. Right now,
the goal is just the correct shape and order.

## Key terms

| Term | Meaning |
|---|---|
| ELT | Extract, Load, Transform — load raw data first, transform it inside the warehouse afterward (as opposed to ETL, which transforms before loading) |
| `SQLExecuteQueryOperator` | Runs a SQL statement against a connection — used here to run a `COPY INTO` load |
| `conn_id` | The Connection (Chapter 3) a task uses to reach an external system, like Snowflake |
| Dependency chain | The `>>` sequence that fixes the order tasks must run in |

## Lab

1. Sketch (on paper or in a text file, not necessarily runnable yet)
   a DAG for a pipeline you've actually worked with — pick any source
   you've loaded data from in this catalog.
2. Name each task by its real job (`check_for_new_orders`,
   `load_orders_to_snowflake`, `trigger_dbt_build`), not `task_1`,
   `task_2`, `task_3`.
3. Write the one dependency line (`>>` chain) that encodes the correct
   order.

## Check yourself

You're ready for Lesson 22 when you can explain why the `>>` chain in
this lesson's DAG has to run in that exact order — what would actually
break if `trigger_dbt_build` ran before `load_to_snowflake` finished.
