# Lesson 37 — Spark DataFrames

**Chapter 3 · Apache Spark Fundamentals · Lesson 37 of 62**

## What you'll learn

- What a Spark DataFrame is, compared directly to Lesson 21's Pandas
  DataFrame
- Three real differences: distributed, lazy, and immutable
- Why "immutable" surprises people coming from Pandas
- What carries over cleanly from everything you already know

## Same idea, same word — genuinely different implementation

Both a Pandas DataFrame (Lesson 21) and a Spark DataFrame represent
rows and columns with a schema. That's where the similarity mostly ends:

| | Pandas DataFrame | Spark DataFrame |
|---|---|---|
| Where it lives | One machine's memory | Partitioned (Lesson 33) across Executors |
| When operations run | Immediately (Lesson 34's "eager") | Only when an action runs (Lesson 34's "lazy") |
| Can you modify it in place? | Yes, in practice | No — every transformation returns a new one |

## Distributed: it's not really "one thing"

A Spark DataFrame is really a *description* of data spread across many
partitions, on many Executors — nothing requires all of it to ever sit
in one place at the same time, which is precisely what let it grow
beyond Lesson 28's "too big for one machine" limit in the first place.

## Lazy: already covered, still worth repeating here

Creating a Spark DataFrame, and every transformation on it, builds a
plan (Lesson 34) — nothing runs until an action.

## Immutable: the real surprise for Pandas users

```python
df = spark.read.parquet("cleansed/yellow_tripdata_2024-01.parquet")

df_filtered = df.filter(df["fare_amount"] > 0)
# df is completely unchanged. df_filtered is a NEW DataFrame.

print(df.count())            # the original row count
print(df_filtered.count())   # a different, smaller row count
```

In Pandas, `df = df[df["fare_amount"] > 0]` *feels* like modifying `df`
in place (Lesson 26) — Spark makes this explicit and unavoidable: a
transformation **never** modifies the DataFrame it's called on. It
always returns a distinct new one, and the original is still sitting
there, completely untouched, unless you deliberately discard it by
reassigning the same variable name.

## What carries over cleanly

Rows, columns, a schema, filtering, grouping — the *concepts* you built
in Chapter 2's Pandas work transfer directly. Chapter 4 is mostly about
learning the specific PySpark **syntax** for ideas you already
understand, not learning new ideas from scratch.

## Key terms

| Term | Meaning |
|---|---|
| Distributed | Spread across partitions on multiple Executors, not one machine |
| Immutable | A transformation never modifies the original — it returns a new DataFrame |

## Lab

```python
df = spark.range(10)          # a tiny built-in DataFrame, 0-9
df2 = df.filter(df["id"] > 5)

print(df.count())    # still 10 -- df is unchanged
print(df2.count())   # 4 -- a genuinely separate DataFrame
```

Confirm both counts print as described, proving `df` was never modified.

## Check yourself

You're ready for Lesson 38 when you can explain, without looking: what
does "immutable" mean for a Spark DataFrame, and why does that surprise
people coming from Pandas?
