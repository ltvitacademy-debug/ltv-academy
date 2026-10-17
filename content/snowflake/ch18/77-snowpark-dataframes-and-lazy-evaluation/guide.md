# Lesson 77 — Snowpark for Python: DataFrames That Run Inside Snowflake

**Chapter 18 · Snowpark & the Native Apps Framework · Lesson 77 of 79**

This lesson is a written case study, not a recording — added after this course's video was
produced, researched and verified directly against current Snowflake Snowpark documentation.
Every lesson before this one worked in SQL. Snowpark is the piece a growing share of current
Snowflake job postings ask for by name: a Python API that builds and runs real data
transformations without ever pulling the data out of Snowflake.

## What you'll learn

- What Snowpark actually is, and the one sentence that makes it click: the data never leaves
  Snowflake
- The DataFrame API: `session.table`, `session.sql`, `filter`, `select`, `group_by`, `agg`
- Lazy evaluation — the real distinction between a transformation and an action, and why it
  matters for when a query actually runs
- How this connects back to the SQL you already know from Chapter 2

## The one sentence that matters

Snowpark for Python lets you write transformation logic in Python, but that code doesn't run in
a Python process on your laptop pulling rows across the network — it gets translated and pushed
down to execute inside Snowflake's own engine, against the data where it already sits. This is
the detail that separates Snowpark from "I used the Python connector to pull data into pandas."
With Snowpark, the data genuinely never leaves Snowflake's governance boundary — the same RBAC,
masking policies, and warehouse billing from Chapters 9-11 still apply to every Snowpark
operation, because it's still Snowflake doing the work.

## Creating a DataFrame

A Snowpark `DataFrame` can come from an existing table or from a raw SQL string — and either way,
nothing runs yet:

```python
from snowflake.snowpark.functions import col

# From a table -- no query runs yet
df_table = session.table("sample_product_data")

# From a SQL query -- also no query runs yet
df_sql = session.sql("SELECT name FROM sample_product_data")

# From literal Python values, useful for small lookups and testing
df_literal = session.create_dataframe([1, 2, 3, 4]).to_df("a")
```

## Filtering, selecting, and grouping — the same shape as SQL, different syntax

If Chapter 2 already taught you `WHERE`, `SELECT`, and `GROUP BY`, this is the same logic with
Python method calls instead of SQL clauses:

```python
from snowflake.snowpark.functions import col, sum as sp_sum

# WHERE id = 1
df = session.table("sample_product_data").filter(col("id") == 1)

# SELECT id, name, serial_number
df = session.table("sample_product_data").select(col("id"), col("name"), col("serial_number"))

# GROUP BY category_id ... SUM(id)
df_totals = (
    session.table("sample_product_data")
    .group_by(col("category_id"))
    .agg(sp_sum(col("id")).alias("total_id"))
)
```

Note the Python API uses snake_case (`group_by`, not `groupBy`) — a detail worth getting right
from the start if you've seen Spark's camelCase DataFrame API before, since the two look similar
but aren't identical.

## Lazy evaluation: transformations vs. actions

This is the single most important mechanical detail in Snowpark, and it's genuinely easy to get
wrong at first: **calling `filter`, `select`, `group_by`, or `agg` does not run anything against
Snowflake.** Each of these is a **transformation** — it only builds up a query plan and returns a
new DataFrame describing that plan. No SQL is sent to the server yet.

A query only actually executes when you call an **action**:

| Action | What it does |
|---|---|
| `collect()` | Runs the query, returns rows as a list of `Row` objects |
| `count()` | Runs the query, returns the row count |
| `show()` | Runs the query, prints up to 10 rows |
| `save_as_table()` (via `df.write.mode(...)`) | Runs the query, writes the result to a table |

```python
# Nothing has executed yet -- this is still just a query plan
df = session.table("sample_product_data").filter(col("id") == 1)

rows = df.collect()   # NOW the query actually runs against Snowflake
print(df.count())     # this runs a second, separate query
```

Chaining five `filter`/`select`/`group_by` calls in a row costs nothing extra — Snowflake only
ever sees and optimizes the final combined query once you call an action. This is also why
calling `.count()` and then `.collect()` on the same DataFrame runs the underlying query twice,
not once — each action is its own round trip, unless you explicitly cache the result yourself.

## Key terms

| Term | Meaning |
|---|---|
| Snowpark | Snowflake's Python (and Java/Scala) API for building data transformations that execute inside Snowflake's engine |
| DataFrame | Snowpark's core object representing a query plan over Snowflake data |
| Transformation | A DataFrame method (`filter`, `select`, `group_by`, `agg`) that only builds the query plan — no execution |
| Action | A DataFrame method (`collect`, `count`, `show`, `save_as_table`) that actually sends SQL to Snowflake and runs it |

## Check yourself

Given `df = session.table("orders").filter(col("status") == "refunded").select(col("order_id"))`,
has any query run against Snowflake yet at this line? What's the first line of code that would
actually cause one to run?
