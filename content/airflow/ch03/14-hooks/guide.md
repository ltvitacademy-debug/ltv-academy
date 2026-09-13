# Lesson 14 — Hooks

**Chapter 3 · Connections, Hooks & Providers · Lesson 14 of 30**

## What you'll learn

- What a Hook actually is, as a Python class
- How a Hook turns a `conn_id` into a real, usable connection object
- How Hooks and Operators relate — an Operator often uses a Hook internally
- When to reach for a Hook directly instead of an existing Operator

## What a Hook is

A **Connection** (Lesson 13) is just a stored record — a `conn_id`
and some fields. Something still has to turn that record into an
actual, live connection your Python code can use: opening a network
connection, authenticating, and handing back an object you can run
queries or calls against.

That "something" is a **Hook**. A Hook is a Python class that:

1. Looks up a Connection by `conn_id`
2. Reads its fields (host, login, password, extra)
3. Uses them to establish a real connection to that system
4. Exposes methods for actually doing work over that connection

Every system with an Airflow integration — Postgres, Snowflake, S3,
HTTP APIs — has a matching Hook class: `PostgresHook`,
`SnowflakeHook`, `S3Hook`, `HttpHook`.

## A concrete example: SnowflakeHook

```python
from airflow.providers.snowflake.hooks.snowflake import SnowflakeHook

def run_row_count(**context):
    hook = SnowflakeHook(snowflake_conn_id="snowflake_default")
    df = hook.get_pandas_df("SELECT COUNT(*) AS n FROM orders;")
    print(df)
```

Nothing here is Airflow-specific SQL — `hook.get_pandas_df(...)` runs
real SQL against real Snowflake, using the exact same query you'd
type in the Snowflake worksheet. `SnowflakeHook` did the work of
turning `snowflake_conn_id="snowflake_default"` into an authenticated
Snowflake session; your code just asks it to run a query.

## Hooks vs. Operators

This is the distinction worth being precise about:

- A **Hook** is the low-level interface to a system — "give me a
  working connection to Snowflake, and let me run arbitrary commands
  against it."
- An **Operator** is a higher-level, task-shaped wrapper — "run this
  one SQL statement as a task, with retries, logging, and templating
  already handled."

Many Operators are thin wrappers *around* a Hook. `SnowflakeOperator`,
for instance, creates a `SnowflakeHook` internally and calls its `run`
method — the Operator exists so you don't have to write that
Hook-calling code yourself for the common case of "just run this SQL."

```python
# Roughly what SnowflakeOperator does internally:
class SnowflakeOperator(SQLExecuteQueryOperator):
    def execute(self, context):
        hook = self.get_db_hook()   # a SnowflakeHook, built from conn_id
        hook.run(self.sql)
```

## When to reach for a Hook directly

Use an existing Operator whenever one already does what you need —
that's most of the time. Reach for a Hook directly inside a
`PythonOperator` (or a `@task`-decorated function) when the logic is
more than "run this SQL" — branching on a query result, pulling data
into pandas for a transformation, calling several methods in sequence,
or combining two systems in one task. The Hook gives you the raw
connection; what you do with it is regular Python.

## Key terms

| Term | Meaning |
|---|---|
| Hook | A Python class that turns a Connection's stored fields into a real, usable connection object |
| SnowflakeHook | The Hook class for Snowflake — `get_conn()`, `run()`, `get_pandas_df()`, etc. |
| Operator | A task-shaped wrapper, often built on top of a Hook, for a specific unit of work |
| get_conn() | A common Hook method that returns the raw underlying connection object |

## Lab

1. Using the Connection you created in Lesson 13's lab, write a small
   Python function that instantiates the matching Hook class for that
   connection type and calls one of its methods (e.g. `get_conn()`).
2. Run that function outside of a full DAG first — a plain script or
   the Airflow shell — to confirm the Hook resolves your Connection
   correctly before wiring it into a task.
3. Note which Operator (if any) exists for that same system, and
   compare: what does the Operator do for you that calling the Hook
   directly would not?

## Check yourself

You're ready for Lesson 15 when you can explain, in one sentence, the
difference between a Hook and an Operator, and why an Operator often
contains one.
