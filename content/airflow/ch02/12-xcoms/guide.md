# Lesson 12 — XComs: Passing Data Between Tasks

**Chapter 2 · Building DAGs · Lesson 12 of 30**

## What you'll learn

- What an XCom actually is, and the specific problem it solves
- How a `@task` function's return value becomes an XCom automatically
- Reading a real XCom in the Airflow UI
- Why XComs are for small values, not large data

## The problem: tasks run in isolation

Each task in a DAG can run on a different worker, potentially a
different machine entirely. There's no shared Python variable one
task can just read from another — task B can't reach into task A's
local variables, because by the time task B runs, task A's process may
not even exist anymore.

**XCom** ("cross-communication") is Airflow's mechanism for passing
small pieces of data between tasks anyway — a key-value store, scoped
to a specific DAG Run, that any task in that run can write to and
read from.

## The easy case: @task's automatic XCom

With the TaskFlow API (`@task`, from Lesson 8), passing data between
tasks looks almost like normal Python — a function's return value
becomes an XCom automatically, and calling one task's result as
another task's input wires up the XCom push/pull for you:

```python
@task()
def get_row_count():
    return 4213  # automatically pushed to XCom

@task()
def log_row_count(count):
    print(f"Processed {count} rows")

log_row_count(get_row_count())  # pulls the XCom automatically
```

No explicit `xcom_push`/`xcom_pull` calls needed — the dependency
itself (`log_row_count(get_row_count())`) tells Airflow to wire the
data through.

## Reading a real XCom

Every XCom a task pushes is visible directly in the UI, under that
Task Instance's XCom tab:

![A real Task Instance's XCom tab, showing a table with Key, Dag, Run ID, Task ID, Map Index, and Value columns — including a 'return_value' row with 3 items.](/courses/airflow/ch02/12-xcoms/dag-run-task-instance-xcom.png)
*The `return_value` key is what `@task`'s automatic push uses by default — this is the exact value the next task's function call actually received.*
Source: [Apache Airflow Documentation — UI Overview](https://airflow.apache.org/docs/apache-airflow/stable/ui.html)

This is one of the most useful debugging views in Airflow: when a
downstream task behaves unexpectedly, checking what it actually
received via XCom — not what you assume it received — is often the
fastest way to find the real problem.

## Small values only

XComs are stored in Airflow's own metadata database by default, which
means they're genuinely meant for small values — a row count, a file
path, a status string, an ID. Passing an entire DataFrame or a large
JSON payload through XCom is a real anti-pattern: it bloats the
metadata database and defeats the purpose of a distributed system
where tasks don't share memory. For real data, pass a *reference* (a
file path in cloud storage, a table name) through XCom, and let the
downstream task read the actual data itself.

## Key terms

| Term | Meaning |
|---|---|
| XCom | Airflow's key-value mechanism for passing small data between tasks in the same DAG Run |
| `xcom_push` / `xcom_pull` | The explicit, classic-operator way to write/read an XCom |
| `return_value` | The default XCom key a `@task` function's return value is automatically stored under |
| Reference passing | Passing a pointer to data (a file path, a table name) through XCom instead of the data itself |

## Lab

1. Write two `@task`-decorated functions where the second takes the
   first's return value as an argument.
2. Run the DAG, then open the first task's XCom tab in the UI and
   confirm the value you see matches what the second task actually
   used.
3. Write one sentence explaining why you shouldn't push a 500MB
   DataFrame through XCom, and what you'd do instead.

## Check yourself

You're ready for Lesson 13 when you can explain, in one sentence, why
tasks need XCom at all instead of just sharing a Python variable.
