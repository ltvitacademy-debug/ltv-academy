# Lesson 78 — Snowpark UDFs, Stored Procedures, and Where the Code Actually Runs

**Chapter 18 · Snowpark & the Native Apps Framework · Lesson 78 of 79**

This lesson is a written case study, not a recording, researched and verified directly against
current Snowflake Snowpark documentation. Lesson 77 covered the DataFrame API. This lesson covers
the two ways Snowpark logic becomes a reusable, callable object inside Snowflake — a user-defined
function you call inside a query, and a stored procedure you call (or schedule) to run a whole
piece of logic.

## What you'll learn

- How to register a Python UDF two different ways, and what "temporary vs. permanent" actually
  controls
- How packages and local files get into a UDF's execution environment
- Why a Snowpark stored procedure is the natural thing to hand to a Task from Chapter 8
- The version-pinning gotcha that causes a UDF to behave differently on different days

## Registering a Python UDF

Snowpark gives you two equivalent ways to turn a Python function into a callable SQL function.
The decorator form:

```python
from snowflake.snowpark.functions import udf

@udf(name="minus_one", is_permanent=True, stage_location="@my_stage", replace=True)
def minus_one(x: int) -> int:
    return x - 1
```

And the explicit registration form, useful when the function is defined elsewhere or you want to
keep registration logic separate from the function body:

```python
from snowflake.snowpark.types import StringType

session.udf.register(
    add_suffix,
    return_type=StringType(),
    input_types=[StringType()],
)
```

Once registered, you call it exactly like any built-in SQL function:

```sql
SELECT minus_one(order_count) FROM daily_summary;
```

## Temporary vs. permanent — and why the default matters

**Temporary is the default.** Calling `register()` or `udf()` without `is_permanent=True` creates
a UDF scoped to your current session — it disappears when the session ends, which is exactly
right for development and ad hoc exploration. A **permanent** UDF needs `is_permanent=True` and a
`stage_location`, because Snowflake has to upload the Python file and its dependencies somewhere
durable so the UDF still exists in the next session, and the next person's session, and a
scheduled Task's session.

## Getting packages and files into the UDF

A UDF's Python code often needs dependencies, and Snowpark gives you two mechanisms:

- **Anaconda packages** — pass `packages=[...]` to the decorator, or call
  `session.add_packages(...)` to make packages available for the whole session. (Inside a Python
  worksheet in Snowsight, common Anaconda packages are already available without this step.)
- **Local files and resources** — call `session.add_import(...)` to ship a local file or a file
  already sitting on a stage. The Snowpark library itself is not uploaded automatically, and
  Python's own built-in standard library modules don't need to be listed either.

## The version-pinning gotcha

If you don't pin a specific version in `packages=[...]`, Snowflake resolves to the latest
available version at the time dependencies are resolved. For a **permanent** UDF, that resolution
happens once, when the UDF is created — so it keeps running against whatever version was latest
back then. For a **temporary** UDF, resolution happens fresh every time it's registered in a new
session — meaning the exact same code can quietly pick up a newer package version from one day to
the next, with no code change on your end. For anything running in production, pin the version
explicitly; "it worked yesterday" is a real, specific failure mode here, not a hypothetical one.

## Stored procedures: the natural fit for Chapter 8's Tasks

A UDF processes data one row (or batch) at a time inside a query. A **stored procedure** is a
different shape entirely — a whole piece of procedural logic you call as its own statement, that
can run multiple queries, make decisions, and orchestrate a sequence of steps. This is exactly
what Chapter 8's Tasks are built to schedule: instead of a Task running one hardcoded SQL
statement, it can call a Snowpark stored procedure that does something considerably more
sophisticated — reading a Stream's changed rows, transforming them with DataFrame logic, writing
the result, and logging what happened — all as one schedulable unit.

```sql
-- A Task (from Chapter 8) calling a Snowpark stored procedure, rather
-- than a single hardcoded SQL statement
CREATE OR REPLACE TASK process_orders_incremental
  WAREHOUSE = etl_wh
  SCHEDULE = 'USING CRON 0 * * * * America/New_York'
AS
  CALL process_orders_stream_proc();
```

## Key terms

| Term | Meaning |
|---|---|
| UDF (user-defined function) | A callable function, written in Python, invoked inside a SQL query like a built-in function |
| Temporary vs. permanent UDF | Temporary (the default) lives only for the current session; permanent persists and needs a stage location |
| `add_packages` / `add_import` | The two mechanisms for giving a UDF its Anaconda package dependencies or local files |
| Stored procedure | A callable unit of procedural Snowpark logic that can run multiple steps, not just transform one row |

## Check yourself

Why does a permanent UDF with an unpinned package version risk behaving differently months after
it was created, while the same unpinned temporary UDF risks behaving differently from one session
to the next?
