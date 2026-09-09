# Lesson 34 — Lazy Evaluation

**Chapter 3 · Apache Spark Fundamentals · Lesson 34 of 62**

## What you'll learn

- **Lazy evaluation** — why Spark doesn't run anything until you
  explicitly ask it to
- How this is fundamentally different from Pandas
- Why Lesson 31's "Driver builds the whole plan first" is only possible
  *because* of lazy evaluation
- A real example showing the difference

## Pandas: eager, line by line

```python
import pandas as pd

df = pd.read_csv("yellow_tripdata_2024-01.csv")   # runs immediately
df = df[df["fare_amount"] > 0]                      # runs immediately
df = df.groupby("VendorID").size()                  # runs immediately
```

Pandas is **eager** — every line executes the moment Python reaches it.
By the time you're on line 3, lines 1 and 2 have already fully run.

## Spark: lazy, until you ask for a result

```python
df = spark.read.parquet("cleansed/yellow_tripdata_2024-01.parquet")
df = df.filter(df["fare_amount"] > 0)
df = df.groupBy("VendorID").count()
# Nothing has actually run yet. Not the read, not the filter, not the groupBy.

df.show()   # THIS line triggers everything above it, all at once
```

Every one of those first three lines just adds a step to a **plan** —
Spark doesn't touch a single row of real data until `.show()` (an
**action**, Lesson 35) actually asks for a result.

## Why this is possible — and why it matters

Recall Lesson 31: the Driver builds the entire plan before any Executor
starts working. Lazy evaluation is *why* that's possible — since nothing
has run yet, Spark can look at your **whole** sequence of operations at
once and optimize it: skip a filter that would produce zero rows,
combine several operations into a single pass over the data, reorder
steps for efficiency. Pandas can't do any of this, because by the time
it would want to optimize, each line has already run.

## A common surprise for people coming from Pandas

```python
df = spark.read.parquet("cleansed/yellow_tripdata_2024-01.parquet")
df.filter(df["fare_amount"] < 0)   # looks like it should print something
# ...nothing happens, and no error either. filter() just built a plan
# that nothing ever asked to run.
```

This trips up almost everyone coming from Pandas the first time — a
transformation on its own does genuinely nothing observable, by design,
until an action triggers it.

## Key terms

| Term | Meaning |
|---|---|
| Lazy evaluation | Operations build a plan; nothing runs until an action requests a result |
| Eager evaluation | Pandas' approach — every line runs immediately |
| Plan | The sequence of operations Spark has recorded but not yet executed |

## Lab

No cluster needed — predict, then check your reasoning: in the second
code example above (the "common surprise"), why does nothing print and
no error occur? What single change would make it actually run?

## Check yourself

You're ready for Lesson 35 when you can explain, without looking: why
doesn't Spark run a `.filter()` call immediately, and what does that
delay actually enable?
