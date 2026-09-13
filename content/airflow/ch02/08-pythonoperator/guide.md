# Lesson 8 — PythonOperator

**Chapter 2 · Building DAGs · Lesson 8 of 30**

## What you'll learn

- How to wrap an ordinary Python function as a task with
  `PythonOperator`
- How to pass arguments into that function with `op_kwargs`
- How the `@task` decorator (TaskFlow API) does the same thing with
  less boilerplate
- When you'd still reach for classic `PythonOperator` over `@task`

## Wrapping a function, the classic way

You already know how to write a Python function. `PythonOperator`'s
whole job is turning one into a task — you point it at the function
with `python_callable`:

```python
from airflow.providers.standard.operators.python import PythonOperator

def clean_customer_records():
    # real Python you already know how to write
    ...

clean = PythonOperator(
    task_id="clean_customer_records",
    python_callable=clean_customer_records,
)
```

Nothing about `clean_customer_records` needed to change — it's an
ordinary function. `PythonOperator` calls it when the task runs and
reports success or failure based on whether it raised an exception.

## Passing arguments in

Most real functions need inputs. `op_kwargs` passes keyword arguments
into your callable exactly like calling the function directly would:

```python
def clean_customer_records(table_name, batch_size=500):
    ...

clean = PythonOperator(
    task_id="clean_customer_records",
    python_callable=clean_customer_records,
    op_kwargs={"table_name": "stg_customers", "batch_size": 1000},
)
```

`op_args` does the same thing positionally, as a list, if you prefer
that style. Either way, nothing here is Airflow-specific magic — it's
just how the arguments get from your DAG definition into the function
call that actually happens at run time.

## The same thing, with @task

You saw `@task` briefly in Lesson 6. It's part of the **TaskFlow API**,
and it does exactly what `PythonOperator` does — turns a function into
a task — with less setup:

```python
from airflow.sdk import task

@task()
def clean_customer_records(table_name, batch_size=500):
    ...

clean_customer_records(table_name="stg_customers", batch_size=1000)
```

No `task_id` to type (it's inferred from the function name), no
`python_callable` to wire up, and no separate `op_kwargs` dict —
you call the decorated function like a normal function, with normal
arguments, and Airflow turns that call into a task automatically.

## When you'd still use classic PythonOperator

For a brand-new DAG, `@task` is usually the more ergonomic choice, and
you'll see it more in newer code. You'll still run into (and need to
read) classic `PythonOperator` in: existing DAGs written before
TaskFlow existed, DAGs that need dynamic behavior TaskFlow doesn't
cover as cleanly, and any documentation or Stack Overflow answer more
than a few years old. Recognizing both styles matters more than
picking a side.

## Key terms

| Term | Meaning |
|---|---|
| `python_callable` | The function `PythonOperator` will call when the task runs |
| `op_kwargs` | A dict of keyword arguments passed into that function at run time |
| `op_args` | A list of positional arguments, the alternative to `op_kwargs` |
| TaskFlow API | The `@task`-decorator style of defining tasks, introduced as a lighter-weight alternative to instantiating Operators directly |

## Lab

1. Write a plain Python function that takes at least one argument and
   does something observable (prints a value, for example).
2. Wrap it as a task two ways in two small test DAGs: once with
   `PythonOperator` + `op_kwargs`, once with `@task`.
3. Run both and confirm, from the logs, that the argument you passed
   actually arrived inside the function both times.

## Check yourself

You're ready for Lesson 9 when you can write a `PythonOperator` task
from a function that takes arguments, without looking back at this
page.
