# Lesson 16 — Connecting to Snowflake & Other Databases

**Chapter 3 · Connections, Hooks & Providers · Lesson 16 of 30**

## What you'll learn

- How Connections, Hooks, and the Snowflake provider package fit together in one real DAG
- What actually goes in a Snowflake Connection's fields
- A working `SnowflakeOperator` example running SQL you already know
- When to drop down to `SnowflakeHook` instead, for the same connection

## The three lessons, combined

Lessons 13–15 covered three separate pieces: Connections store
credentials, Hooks turn a Connection into a live session, and
provider packages are where a system's Hooks/Operators/connection
type come from in the first place. Connecting Airflow to Snowflake is
just those three pieces used together — nothing new to learn
conceptually, only the specific fields Snowflake needs.

## What goes in a Snowflake Connection

You already know Snowflake's own vocabulary — account, warehouse,
database, role — from the Snowflake course earlier in this catalog.
Airflow's Snowflake Connection just asks for that same information,
split across the standard fields and the Extra JSON field:

| Field | Value |
|---|---|
| Login | Your Snowflake username |
| Password | Your Snowflake password (or a Programmatic Access Token) |
| Schema | The default schema to use (optional) |
| Extra → `account` | Your Snowflake account name |
| Extra → `warehouse` | The warehouse to run queries on |
| Extra → `database` | The default database |
| Extra → `role` | The Snowflake role to assume |

Nothing about the SQL you write changes because Airflow is involved
— it's the exact same account/warehouse/role model you already
learned, just referenced by `conn_id` instead of typed into a
worksheet each time.

## A real SnowflakeOperator example

```python
from airflow import DAG
from airflow.providers.snowflake.operators.snowflake import SnowflakeOperator
from datetime import datetime

with DAG(
    dag_id="daily_orders_refresh",
    schedule="0 6 * * *",
    start_date=datetime(2024, 1, 1),
    catchup=False,
) as dag:

    refresh_orders_summary = SnowflakeOperator(
        task_id="refresh_orders_summary",
        snowflake_conn_id="snowflake_default",
        sql="""
            CREATE OR REPLACE TABLE analytics.orders_summary AS
            SELECT
                order_date,
                COUNT(*) AS order_count,
                SUM(order_total) AS revenue
            FROM raw.orders
            GROUP BY order_date;
        """,
    )
```

Every day at 6 AM, this task connects to Snowflake using
`snowflake_default`, and rebuilds a summary table with plain SQL —
the same `CREATE OR REPLACE TABLE ... AS SELECT` you'd run by hand,
just scheduled and tracked by Airflow now instead of run manually or
by a separate cron job.

## Dropping down to SnowflakeHook when you need more

`SnowflakeOperator` covers "run this SQL." When a task needs to check
a query result before deciding what to do next, use `SnowflakeHook`
directly inside a `PythonOperator` or `@task`:

```python
from airflow.providers.snowflake.hooks.snowflake import SnowflakeHook

def check_orders_landed(**context):
    hook = SnowflakeHook(snowflake_conn_id="snowflake_default")
    count = hook.get_first("SELECT COUNT(*) FROM raw.orders WHERE order_date = CURRENT_DATE;")[0]
    if count == 0:
        raise ValueError("No orders landed today — failing before downstream tasks run.")
```

Same Connection, same underlying Snowflake account — just a different
level of control over what happens with the result.

## Key terms

| Term | Meaning |
|---|---|
| Snowflake Connection | An Airflow Connection whose Extra field holds account, warehouse, database, and role |
| SnowflakeOperator | Runs one SQL statement against Snowflake as a task |
| SnowflakeHook | The lower-level object for custom logic beyond a single SQL statement |
| Programmatic Access Token (PAT) | A token-based credential option for the Password field, as an alternative to a plain password |

## Lab

1. Create (or reuse) a Snowflake Connection with your account,
   warehouse, database, and role filled in under Extra.
2. Write a small DAG with one `SnowflakeOperator` task that runs a
   `SELECT COUNT(*)` against a table you already know from the
   Snowflake course.
3. Trigger the DAG manually and confirm the task succeeds and the
   row count shows up in the task log.

## Check yourself

You're ready for Lesson 17 when you can explain, in one sentence,
what's different about running SQL against Snowflake through Airflow
versus running it directly in a Snowflake worksheet — and what stays
exactly the same.
