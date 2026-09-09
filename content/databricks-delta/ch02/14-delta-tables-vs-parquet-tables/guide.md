# Lesson 14 — Delta Tables vs. Parquet Tables

**Chapter 2 · Delta Lake · Lesson 14 of 57**

## What you'll learn

- The same write, done two ways, side by side
- What breaks with plain Parquet that doesn't break with Delta
- `DESCRIBE HISTORY` — a command that only makes sense for one of them
- Why "just add `.format("delta")`" undersells how much actually changes

## The same data, two formats

```python
# Plain Parquet
trips.write.mode("overwrite").parquet("/data/nyc_taxi/parquet_trips")

# Delta
trips.write.mode("overwrite").format("delta").save("/data/nyc_taxi/delta_trips")
```

One extra `.format("delta")` call. The data looks identical if you
inspect the actual Parquet files inside either folder — Lesson 13's
point that Delta is Parquet underneath, made completely literal
here.

## What Delta adds — visible in what you can now do

```python
# This works on the Delta table:
spark.sql("DESCRIBE HISTORY delta.`/data/nyc_taxi/delta_trips`").show()

# This has no equivalent for the plain Parquet folder --
# there's no log to describe the history OF.
```

`DESCRIBE HISTORY` reads directly from the `_delta_log/` Lesson 13
introduced — every version, every operation, every timestamp. A
plain Parquet folder has nothing like this available, because it
has no log at all to ask.

## What breaks with plain Parquet that doesn't break with Delta

```python
# Two jobs writing to the same Parquet folder at once:
# a real risk of half-written, inconsistent files.

# The same two jobs, writing to a Delta table at once:
# Delta's transaction log resolves the conflict --
# one write succeeds cleanly, or fails cleanly. Never half-written.
```

This is the direct, practical payoff of Lesson 13's atomicity point:
concurrent writes to Delta either fully succeed or fully fail — never
the silent partial-write risk that's possible with bare Parquet.

## Reading either one back

```python
parquet_df = spark.read.parquet("/data/nyc_taxi/parquet_trips")
delta_df = spark.read.format("delta").load("/data/nyc_taxi/delta_trips")
```

Reading looks almost identical too — `.format("delta")` on the read
side, same as the write side. Everything from Foundations' Chapter 4
(`select`, `filter`, `groupBy`, joins) works completely unchanged on
either DataFrame once it's loaded — Delta doesn't change how you
work with the data, only how safely it got written and how much you
can ask about its history.

## Key terms

| Term | Meaning |
|---|---|
| `.format("delta")` | The one addition that turns a plain write/read into a Delta one |
| `DESCRIBE HISTORY` | Reads the transaction log — has no equivalent for plain Parquet |
| Concurrent write safety | Delta resolves conflicts cleanly; Parquet has no mechanism to |

## Check yourself

You're ready for Lesson 15 when you can explain, without looking: why
does `DESCRIBE HISTORY` have no equivalent for a plain Parquet
folder?
