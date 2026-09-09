# Lesson 35 — Transformations vs. Actions

**Chapter 3 · Apache Spark Fundamentals · Lesson 35 of 62**

## What you'll learn

- The formal names for what Lessons 31 and 34 already showed you
- A real list of common transformations and actions
- Why a chain of ten transformations followed by one action runs
  everything in a single pass
- How to tell which is which, when you're not sure

## Transformations — build the plan, run nothing

A **transformation** takes a DataFrame and returns a **new** DataFrame,
describing one more step in the plan — and, per Lesson 34, doesn't
actually run anything:

| Transformation | What it describes |
|---|---|
| `.filter()` / `.where()` | Keep only matching rows |
| `.select()` | Keep only certain columns |
| `.withColumn()` | Add or replace a column |
| `.groupBy()` | Group rows for aggregation |
| `.join()` | Combine two DataFrames |

## Actions — trigger real execution, return a result

An **action** is what actually runs the plan — every transformation
that led up to it, all at once:

| Action | What it returns |
|---|---|
| `.show()` | Prints rows to the console |
| `.count()` | Returns the number of rows, as a plain number |
| `.collect()` | Returns all rows to the Driver as a Python list |
| `.write.parquet(...)` | Writes the result to storage |
| `.take(n)` | Returns the first `n` rows to the Driver |

## Chaining transformations, one action

```python
result = (
    df.filter(df["fare_amount"] > 0)
      .withColumn("fare_per_mile", df["fare_amount"] / df["trip_distance"])
      .groupBy("VendorID")
      .avg("fare_per_mile")
)
# Still nothing has run — four transformations, zero execution.

result.show()   # NOW all four run together, in one pass over the data
```

Because none of the transformations ran individually, Spark can combine
all four into a single, optimized pass over the data when `.show()`
finally triggers it — genuinely more efficient than running each step
separately, which is exactly Lesson 34's point about why lazy evaluation
matters.

## A simple test: is it a transformation or an action?

Ask: *does it return a new DataFrame (transformation), or does it return
a plain value, print something, or write to storage (action)?* If a
method's return type is "another DataFrame you could keep chaining
onto," it's a transformation. If calling it seems to actually *finish*
something, it's an action.

## Key terms

| Term | Meaning |
|---|---|
| Transformation | Returns a new DataFrame, describing a plan step, runs nothing |
| Action | Triggers execution of the whole plan, returns a result or writes output |

## Lab

For each of the following, decide transformation or action, before
checking: `.dropDuplicates()`, `.orderBy()`, `.first()`, `.printSchema()`.
(Hint: does each one return a DataFrame you could keep chaining, or does
it finish something and give you back a concrete result?)

## Check yourself

You're ready for Lesson 36 when you can explain, without looking: what's
the test for telling a transformation apart from an action, and why does
chaining several transformations before one action run more efficiently
than running each step separately?
