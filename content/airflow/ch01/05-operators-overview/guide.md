# Lesson 5 — Operators Overview

**Chapter 1 · Airflow Fundamentals · Lesson 5 of 30**

## What you'll learn

- What an Operator actually is: a template for one type of work
- The difference between an Operator (the template) and a Task (one
  use of it inside a DAG)
- The two operators nearly every DAG uses, previewed here in full
  next chapter
- Why there's a much wider operator ecosystem than just those two

## An Operator is a template

An **Operator** is a Python class that knows how to do exactly one
kind of work — run a Python function, run a shell command, run a SQL
query, wait for a file to appear. You don't write the "how" every
time; you instantiate the Operator with the specific details for your
situation, and it handles the rest.

```python
from airflow.providers.standard.operators.bash import BashOperator

run_script = BashOperator(
    task_id="run_script",
    bash_command="python cleanup.py",
)
```

That's it — `BashOperator` already knows how to run a shell command,
capture its output, and report success or failure back to Airflow.
You supplied the one thing it needed: which command to run.

## Operator vs. Task

This distinction matters and it's easy to blur: the **Operator** is
the class (`BashOperator`, `PythonOperator`); a **Task** is what you
get once you instantiate that class inside a DAG, with a `task_id`.
The same Operator class gets instantiated many times across many DAGs
— every instantiation is a separate task with its own identity, logs,
and history, even though they all share the same underlying Operator
code.

## The two you'll use constantly

Two operators cover the large majority of what most DAGs need, and
each gets its own full lesson next chapter:

- **PythonOperator** — wraps any Python callable as a task. If you can
  write it as a function, PythonOperator can run it. (Lesson 8)
- **BashOperator** — wraps a shell command as a task, like the example
  above. (Lesson 9)

## The wider ecosystem

Beyond those two, Airflow ships (and the community maintains) a large
catalog of **provider** operators purpose-built for specific systems —
a `SnowflakeOperator` to run SQL against Snowflake, an operator to
trigger a dbt run, operators for S3, Postgres, and dozens more. Rather
than shelling out to a CLI or writing raw connection code by hand, a
provider operator already knows how to authenticate and talk to that
system correctly. Provider packages get their own lesson (Lesson 15) —
for now, just know that "is there an operator for X" is almost always
worth checking before writing custom Python for it.

## Key terms

| Term | Meaning |
|---|---|
| Operator | A Python class that's a template for one kind of work (run Python, run bash, run SQL, etc.) |
| Task | One instantiation of an Operator inside a DAG, with its own `task_id` and its own run history |
| PythonOperator | Wraps a Python callable as a task |
| BashOperator | Wraps a shell command as a task |
| Provider operator | An Operator purpose-built for a specific external system (Snowflake, S3, dbt, etc.) |

## Lab

1. Open any example DAG's Code tab and find every line that
   instantiates an Operator (look for `Operator(` in the source).
2. For each one, identify: which Operator class is it, and what
   `task_id` was it given?
3. Note whether the same Operator class appears more than once in that
   file — if so, each instantiation is still a separate task.

## Check yourself

You're ready for Lesson 6 when you can explain, in your own words, the
difference between an Operator and a Task.
