# Lesson 6 — Your First DAG

**Chapter 1 · Airflow Fundamentals · Lesson 6 of 30**

## What you'll learn

- Every piece a minimal DAG file actually needs, and nothing more
- How to mix a classic Operator and the newer `@task` decorator in
  the same DAG
- Where you save the file so Airflow finds it
- How to confirm it worked by reading the real Code tab

## The minimal pieces

A DAG file is ordinary Python. Strip away everything optional and
four things remain: an import for `DAG`, a `with DAG(...)` block that
gives it an ID and a schedule, at least one task inside that block,
and (if you have more than one task) a line wiring their order.

## The worked example

Here's a real, complete DAG — small enough to type from scratch, and
this is exactly the source Airflow parsed for the DAG you'll see in
the screenshot below:

```python
from datetime import datetime

from airflow.sdk import DAG, task
from airflow.providers.standard.operators.bash import BashOperator

# A DAG represents a workflow, a collection of tasks
with DAG(dag_id="demo", start_date=datetime(2022, 1, 1), schedule="0 0 * * *") as dag:
    # Tasks are represented as operators
    hello = BashOperator(task_id="hello", bash_command="echo hello")

    @task()
    def world():
        print("world")

    # Set dependencies between tasks
    hello >> world()
```

Walk it line by line: `dag_id="demo"` is the DAG's unique name,
`start_date` is when its schedule window begins, and
`schedule="0 0 * * *"` is a cron expression meaning "once a day at
midnight" (cron gets its own full lesson soon). Inside the block,
`hello` is a classic Operator-based task; `world` is the newer
`@task`-decorated way to turn a plain Python function into a task
without wrapping it in `PythonOperator` yourself. The last line,
`hello >> world()`, is the dependency you already saw in Lesson 2 —
`hello` must finish before `world` runs.

## Confirming it, in the real UI

Save a file like this one anywhere Airflow is configured to look (by
default, the `dags/` folder under `$AIRFLOW_HOME`), and within a
minute or two it appears in your DAGs list. Trigger it, then open that
run's Code tab to confirm Airflow parsed exactly what you wrote:

![Airflow's Code tab for a run of the "demo" DAG, showing the real parsed Python source: the datetime and airflow imports, the `with DAG(...)` block, the `hello` BashOperator task, the `@task`-decorated `world` function, and the `hello >> world()` dependency line at the bottom.](/courses/airflow/ch01/06-your-first-dag/dag-run-code-hello-world.png)
*This is the exact file above, as Airflow parsed it — not a summary or a diagram, the literal source.*
Source: [Apache Airflow Documentation — UI Overview](https://airflow.apache.org/docs/apache-airflow/stable/ui.html)

If your file has a typo, this is also where you'd find out — the Code
tab (or the DAGs list, with an import-error indicator) is where
Airflow tells you it couldn't parse a file at all.

## Key terms

| Term | Meaning |
|---|---|
| `dag_id` | The DAG's unique name across your whole Airflow instance |
| `start_date` | When the DAG's scheduling window begins |
| `schedule` | A cron expression (or preset) controlling when the DAG runs |
| `@task` | A decorator that turns a plain Python function into a task, without instantiating PythonOperator by hand |
| `dags/` folder | Where Airflow looks for DAG files, under `$AIRFLOW_HOME` by default |

## Lab

1. Write the DAG above into a file named `demo_dag.py`, and place it
   in your `$AIRFLOW_HOME/dags/` folder.
2. Wait for it to appear in the DAGs list (or trigger a manual refresh
   from the UI), then unpause it and trigger a run.
3. Open that run's Code tab and confirm it matches what you typed,
   character for character.
4. Open the Grid or Graph tab and confirm you see exactly two tasks,
   `hello` and `world`, with `hello` first.

## Check yourself

You're ready for Lesson 7 when you've written and successfully run
your own DAG file with at least two tasks and one dependency between
them.
