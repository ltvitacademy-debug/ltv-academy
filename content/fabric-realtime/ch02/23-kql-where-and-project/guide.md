# Lesson 23 — KQL: Basic Queries With where and project

**Chapter 2 · Real-Time Data Engineering · Lesson 23 of 70**

## What you'll learn

- `where` — real filtering, with real KQL operators
- `project` — choosing and renaming columns, in one step
- `extend` — adding a computed column, without removing any others
- The exact PySpark and T-SQL equivalents, named directly

## where — real filtering

```kql
RawTripEvents
| where fare_amount > 0 and trip_distance > 0
| where VendorID == "2"
```

`where` filters rows exactly like Foundations Lesson 45's
`.filter()` or T-SQL's `WHERE` — `and`/`or` combine conditions, and
(genuinely convenient) multiple `where` steps in sequence behave
like one combined `and` condition, each one narrowing what the next
step sees.

## project — choosing and renaming, in one step

```kql
RawTripEvents
| project VendorID, fare_amount, pickup_time = tpep_pickup_datetime
```

`project` is `select()` (Foundations Lesson 44) and `.alias()`
combined into one operator: name the columns to keep, and
optionally rename one inline with `new_name = old_column`. Columns
not listed are simply dropped from the result, same as a
Foundations `select()` that only names some columns.

## extend — adding a column, keeping everything else

```kql
RawTripEvents
| extend fare_per_mile = fare_amount / trip_distance
```

`extend` is the real KQL equivalent of Foundations Lesson 46's
`withColumn()` — it adds a new computed column while keeping every
existing column, unlike `project`, which keeps only what's
explicitly named. Mixing the two: `extend` first to compute
something, then `project` to select down to just the columns
actually needed downstream.

## Putting it together

```kql
RawTripEvents
| where fare_amount > 0 and trip_distance > 0
| extend fare_per_mile = fare_amount / trip_distance
| project VendorID, fare_per_mile
| take 10
```

This single pipe chain does real filtering, a real computed column,
a real column selection, and a real row limit — the same shape as
chaining `.filter().withColumn().select().limit()` in PySpark, just
written with pipes instead of method dots.

## Key terms

| Term | Meaning |
|---|---|
| `where` | Filters rows — same idea as `.filter()`/`WHERE` |
| `project` | Selects and optionally renames columns, dropping the rest |
| `extend` | Adds a computed column, keeping every existing one — like `withColumn()` |

## Check yourself

You're ready for Lesson 24 when you can explain, without looking: why
would you use `extend` before `project` rather than the other way
around, when both a new column and a narrower column list are
needed?
