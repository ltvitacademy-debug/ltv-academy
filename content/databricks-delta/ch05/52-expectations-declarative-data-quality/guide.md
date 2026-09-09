# Lesson 52 — Expectations — Declarative Data Quality

**Chapter 5 · Lakeflow · Lesson 52 of 57**

## What you'll learn

- `@dlt.expect_*` — Lesson 36's quarantine logic, as a one-line decorator
- The three enforcement levels: warn, drop, and fail
- Why this is genuinely less code for the exact same outcome
- Where the rejected-row counts actually show up now

## Lesson 36's logic, as a decorator

```python
@dlt.table
@dlt.expect("valid_fare", "fare_amount > 0")
@dlt.expect("valid_distance", "trip_distance > 0")
def silver_trips():
    return dlt.read_stream("bronze_trips").withColumn(
        "fare_amount", col("fare_amount").cast("double")
    )
```

Compare this to Lesson 36's manual `valid_rows`/`quarantined_rows`
split, built from two separate `.filter()` calls. `@dlt.expect(name,
condition)` declares the same rule — a named check, and a SQL
condition rows must satisfy — but the enforcement (checking every
row, tracking which passed) is handled by the framework, not written
by hand.

## Three enforcement levels

```python
@dlt.expect("valid_fare", "fare_amount > 0")
# Default: WARN -- keeps the row, just logs the violation count

@dlt.expect_or_drop("valid_distance", "trip_distance > 0")
# DROP -- the row is filtered out, like Lesson 36's quarantine

@dlt.expect_or_fail("valid_vendor", "VendorID IS NOT NULL")
# FAIL -- a single violation stops the entire pipeline run
```

`expect` (warn) is the least strict — nothing changes for the data,
just a recorded count. `expect_or_drop` is Lesson 36's quarantine
behavior directly: bad rows never reach this table. `expect_or_fail`
is for a condition so fundamental that continuing at all would be
worse than stopping — a genuinely different failure mode than
either of the other two.

## Genuinely less code, same outcome

Lesson 36 needed a manual `.filter()` for valid rows, a second
`.filter()` for the inverse, a separate `saveAsTable()` for the
quarantine table, and a separate quality-metrics query. Here, three
`@dlt.expect*` decorators replace all of that — the framework tracks
pass/fail counts, handles the drop/fail behavior, and surfaces
metrics automatically, all from a one-line declaration per rule.

## Where the metrics show up now

Lakeflow's pipeline UI shows expectation pass/fail counts per run,
automatically — the same kind of number Lesson 36's
`gold.data_quality_metrics` table tracked by hand, now built into
the platform itself, with zero custom query required to see it.

## Key terms

| Term | Meaning |
|---|---|
| `@dlt.expect` | Declares a data quality rule; violations are logged but rows are kept |
| `@dlt.expect_or_drop` | Violating rows are filtered out — Lesson 36's quarantine, built in |
| `@dlt.expect_or_fail` | A single violation stops the entire pipeline run |

## Check yourself

You're ready for Lesson 53 when you can explain, without looking: what
real difference in outcome separates `expect_or_drop` from
`expect_or_fail`?
