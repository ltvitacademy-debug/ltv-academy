# Lesson 38 — Task Dependencies & Automating Transformations

**Chapter 8 · Streams & Tasks · Lesson 38 of 60**

## What you'll learn

- Why one task is rarely enough — real transformation chains are
  multiple steps that must run in a specific order
- `AFTER` — how one task declares it depends on another
- Task Graphs: how Snowsight visualizes a whole chain of dependent
  tasks as a DAG, and where to find it
- How to trigger and monitor a whole chain at once, not one task at a
  time

## One task is rarely the whole pipeline

Lesson 37's pipeline was one task doing one `MERGE`. Real
transformation chains are rarely that simple — staging needs to load
before the warehouse layer transforms it, and the warehouse layer
needs to finish before the reporting layer aggregates it (the
staging → warehouse → reporting layering from Lesson 30). Each step
depends on the one before it finishing first.

## AFTER: declaring a dependency

A task declares its dependency with `AFTER`, naming the task (or
tasks) that must complete before it runs:

```sql
CREATE OR REPLACE TASK load_staging
    WAREHOUSE = etl_wh
    SCHEDULE = '60 MINUTE'
AS
    COPY INTO staging.orders FROM @raw_stage;

CREATE OR REPLACE TASK transform_warehouse
    WAREHOUSE = etl_wh
    AFTER load_staging
AS
    MERGE INTO warehouse.orders_dim ...;

CREATE OR REPLACE TASK refresh_reporting
    WAREHOUSE = etl_wh
    AFTER transform_warehouse
AS
    INSERT INTO reporting.orders_summary ...;
```

Only the root task (`load_staging`) has a `SCHEDULE`. The two tasks
after it have no schedule of their own — they run when the task they
depend on finishes, not on a clock. This whole structure — one root
task with a schedule, and a chain of dependents underneath it — is
called a **Task Graph**.

## Seeing the graph in Snowsight

Once a task has dependents, Snowsight's Graph tab visualizes the whole
chain — which tasks feed into which, and where you are in the
hierarchy:

![A Snowsight task's Graph tab, showing a root task (MYROOTTASK) with several sibling and child tasks, and one grandchild task further down the chain — plus the object browser showing Tasks nested under a schema.](/courses/snowflake/ch08/38-task-dependencies-and-automating-transformations/task-graph-dag.png)
*Every box is one task; the lines are AFTER dependencies. This is the same shape as an Airflow DAG or an ADF pipeline (Lesson 52) — Snowflake just builds it out of TASK objects.*
Source: [Snowflake Quickstarts — Data Engineering Pipelines with Snowpark Python](https://quickstarts.snowflake.com/guide/data_engineering_pipelines_with_snowpark_python/index.html)

That "Execute Task Graph" option available from this view lets you
manually trigger the entire chain on demand — useful while you're
testing, before you trust the schedule alone to run it correctly.

## Resuming a whole graph

Just like a single task, every task in a graph is created suspended.
Resuming only the root task isn't enough — every task in the chain
needs to be resumed for the graph to actually run end to end:

```sql
ALTER TASK refresh_reporting RESUME;
ALTER TASK transform_warehouse RESUME;
ALTER TASK load_staging RESUME;
```

Resume from the bottom of the chain up (as shown above) — Snowflake
requires a dependent task to already be resumable before its
predecessor will let you resume the graph cleanly.

## Key terms

| Term | Meaning |
|---|---|
| AFTER | Declares that a task should run only after another named task completes |
| Task Graph | A root task (with a schedule) plus a chain of dependent tasks connected by AFTER |
| Root task | The one task in a graph with its own SCHEDULE — everything else triggers off it |
| Execute Task Graph | Snowsight's option to manually trigger an entire task chain on demand |

## Lab

1. Build a three-task chain: a root task with a schedule that loads
   or updates a staging table, a second task `AFTER` it that
   transforms into a warehouse-shaped table, and a third `AFTER` that
   one that refreshes a reporting table.
2. Resume all three tasks (bottom of the chain up).
3. Open the root task in Snowsight and view its Graph tab — confirm
   you see all three tasks connected in the order you defined.
4. Use "Execute Task Graph" to trigger the whole chain manually, then
   check each task's Run History to confirm it ran in the right order.

## Check yourself

You're ready for Chapter 9 when you can explain, in one sentence, why
only the root task in a Task Graph has its own `SCHEDULE`, and you've
built and manually triggered a real multi-task chain in Snowsight.
