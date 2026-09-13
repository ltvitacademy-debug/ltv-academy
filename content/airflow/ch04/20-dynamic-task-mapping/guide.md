# Lesson 20 — Dynamic Task Mapping

**Chapter 4 · Sensors, Branching & Trigger Rules · Lesson 20 of 30**

## What you'll learn

- The problem dynamic task mapping solves — a variable, run-time-known
  number of tasks, not a hardcoded count
- `.expand()` and how one task definition becomes N task instances
- Reading mapped task instances in the Grid view — Map Index
- A real map-then-reduce shape: `.expand()` feeding into one
  aggregating task

## The problem: you don't always know the count upfront

Every DAG so far has had a fixed, hardcoded number of tasks — three
staging models, one load step. Real pipelines often don't know the
count until run time: process however many files landed today,
however many customer regions exist right now, however many chunks a
large export got split into.

**Dynamic task mapping** solves this: instead of writing N nearly-
identical tasks by hand, you write *one* task definition and call
`.expand()` on it with a list — Airflow creates one task instance per
item, at run time, with no code change needed when the count changes.

## .expand() in practice

```python
from airflow.sdk import task

@task
def add_one(x: int):
    return x + 1

@task
def sum_it(values):
    return sum(values)

added = add_one.expand(x=[1, 2, 3])
sum_it(added)
```

`add_one.expand(x=[1, 2, 3])` doesn't run `add_one` once with a list
argument — it creates **three separate task instances** of `add_one`,
each running with one element: `x=1`, `x=2`, `x=3`. If the list had
20 items instead of 3, there would be 20 task instances, with no code
change.

## Reading mapped tasks in the Grid view

Each mapped task instance gets its own row, with its own **Map
Index** identifying which element it processed:

![A mapped task 'add_one [3]' in the Grid view, expanded into 3 task instances with Map Index 0, 1, and 2, each Success, each shown as a real _PythonDecoratedOperator with its own duration and try number.](/courses/airflow/ch04/20-dynamic-task-mapping/grid_mapped_task.png)
*The [3] next to the task name means it expanded into 3 instances this run — that number is determined by the length of the list at run time, not hardcoded anywhere.*
Source: [Apache Airflow Documentation — Dynamic Task Mapping](https://airflow.apache.org/docs/apache-airflow/stable/authoring-and-scheduling/dynamic-task-mapping.html)

Map Index `0`, `1`, `2` map directly to `x=1`, `x=2`, `x=3` from the
example above — if one specific mapped instance fails, you can see
exactly which input element caused it.

## The map-then-reduce shape

Calling `sum_it(added)` — passing the *entire mapped output* into a
single downstream task — is exactly the "reduce" half of map-reduce:

![The Graph view: 'add_one [3]' (three mapped instances) feeding into a single 'sum_it' task — a classic map-then-reduce shape.](/courses/airflow/ch04/20-dynamic-task-mapping/mapping_simple_graph.png)
*sum_it doesn't run three times — it runs once, automatically receiving all three of add_one's results as a list.*
Source: [Apache Airflow Documentation — Dynamic Task Mapping](https://airflow.apache.org/docs/apache-airflow/stable/authoring-and-scheduling/dynamic-task-mapping.html)

This pattern — expand to process each item individually, then reduce
back to one task that aggregates the results — covers a huge fraction
of real dynamic-mapping use cases: processing N files, then one task
that logs a summary; validating N tables, then one task that reports
overall pass/fail.

## Key terms

| Term | Meaning |
|---|---|
| Dynamic task mapping | Creating a variable number of task instances at run time from a list, instead of a hardcoded count |
| `.expand()` | The method that turns one task definition into N instances, one per list item |
| Map Index | The index identifying which specific mapped instance a task run represents |
| Map-then-reduce | Expanding to process items individually, then a single task aggregating all the results |

## Lab

1. Write a `.expand()`-based task processing a hardcoded list of 4-5
   items, and a downstream task that aggregates the results.
2. Run it and confirm the Grid view shows one row per mapped instance,
   each with the correct Map Index.
3. Change the list's length and re-run — confirm the number of
   mapped instances changes automatically, with no other code change.

## Check yourself

This chapter is complete when you can explain, in one sentence, what
`.expand()` actually does differently from calling a task once with a
list as its argument.
