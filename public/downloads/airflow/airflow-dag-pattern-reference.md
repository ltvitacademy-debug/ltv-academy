# Airflow DAG Pattern Reference

Every pattern below is real code from this course, collected chapter by
chapter so you can grab the shape you need without hunting back through
lesson guides. Replace the placeholder table/connection names with your
own — the structure is what to reuse.

## Chapter 1 — The minimal DAG skeleton

```python
from datetime import datetime

from airflow.sdk import DAG, task
from airflow.providers.standard.operators.bash import BashOperator

with DAG(dag_id="demo", start_date=datetime(2022, 1, 1), schedule="0 0 * * *") as dag:
    hello = BashOperator(task_id="hello", bash_command="echo hello")

    @task()
    def world():
        print("world")

    hello >> world()
```

Four required pieces: an import for `DAG`, a `with DAG(...)` block with an
ID and schedule, at least one task, and a dependency line if there's more
than one task.

## Chapter 2 — Dependencies and XComs

```python
@task()
def get_row_count():
    return 4213  # automatically pushed to XCom

@task()
def log_row_count(count):
    print(f"Processed {count} rows")

log_row_count(get_row_count())  # pulls the XCom automatically
```

`@task`'s return value becomes an XCom automatically — no explicit
`xcom_push`/`xcom_pull` needed when using the TaskFlow API. XComs are for
small values only (a row count, a file path, a status) — pass a
*reference* for real data, never the data itself.

## Chapter 3 — Connections, Hooks, and Snowflake

```python
from airflow.providers.common.sql.operators.sql import SQLExecuteQueryOperator

refresh_orders_summary = SQLExecuteQueryOperator(
    task_id="refresh_orders_summary",
    conn_id="snowflake_default",
    sql="""
        CREATE OR REPLACE TABLE analytics.orders_summary AS
        SELECT order_date, COUNT(*) AS order_count, SUM(order_total) AS revenue
        FROM raw.orders
        GROUP BY order_date;
    """,
)
```

When a task needs to inspect a query result before deciding what to do
next, drop down to the Hook directly:

```python
from airflow.providers.snowflake.hooks.snowflake import SnowflakeHook

def check_orders_landed(**context):
    hook = SnowflakeHook(snowflake_conn_id="snowflake_default")
    count = hook.get_first("SELECT COUNT(*) FROM raw.orders WHERE order_date = CURRENT_DATE;")[0]
    if count == 0:
        raise ValueError("No orders landed today.")
```

`SQLExecuteQueryOperator` is the current, general-purpose SQL operator —
not a Snowflake-specific one. Use it for any Snowflake SQL, including
`COPY INTO` loads.

## Chapter 4 — Branching, trigger rules, and dynamic task mapping

```python
from airflow.sdk import DAG, task, TriggerRule
from airflow.providers.standard.operators.empty import EmptyOperator

join = EmptyOperator(
    task_id="join",
    trigger_rule=TriggerRule.NONE_FAILED_MIN_ONE_SUCCESS,
)
```

Any task converging after a branch needs a non-default trigger rule —
`all_success` (the default) skips it, because exactly one upstream path
was skipped, not succeeded.

```python
TABLES = ["orders", "customers", "products"]

@task()
def load_table(table_name: str) -> int:
    ...  # COPY INTO for this one table, return its row count

load_table.expand(table_name=TABLES)
```

`.expand()` creates one real, independently-retryable task instance per
list item — not one task looping internally over all of them.

## Chapter 5 — Full ELT, dbt, retries, and alerting

```python
from datetime import timedelta
from airflow.providers.slack.notifications.slack import send_slack_notification

def alert_on_failure(context):
    task_id = context["task_instance"].task_id
    dag_id = context["dag"].dag_id
    log_url = context["task_instance"].log_url
    send_slack_notification(
        slack_conn_id="slack_alerts",
        text=f":red_circle: {dag_id}.{task_id} failed — {log_url}",
    )(context)

default_args = {
    "retries": 3,
    "retry_delay": timedelta(minutes=5),
    "retry_exponential_backoff": True,
    "max_retry_delay": timedelta(minutes=30),
    "on_failure_callback": alert_on_failure,
}
```

Set `retries`, backoff, and alerting once in `default_args` at the DAG
level — every task inherits them, and any task can still override a
specific value if it genuinely needs to.

```python
trigger_dbt_build = BashOperator(
    task_id="trigger_dbt_build",
    bash_command="cd /opt/dbt/sales_project && dbt build --profiles-dir /opt/dbt/profiles",
)
```

`BashOperator` running `dbt build` is the right default for most teams —
dbt's own internal dependency graph (every `ref()` in the project) runs
correctly inside that one task. Reach for `astronomer-cosmos` only when a
team specifically needs one Airflow task per dbt model.
