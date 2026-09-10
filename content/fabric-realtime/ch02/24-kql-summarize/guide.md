# Lesson 24 — KQL: summarize and Aggregations

**Chapter 2 · Real-Time Data Engineering · Lesson 24 of 70**

## What you'll learn

- `summarize` — KQL's real `groupBy()`/`.agg()`, in one operator
- `count()`, `sum()`, `avg()` — the same aggregate functions, KQL's own syntax
- `by` — naming the grouping columns, T-SQL's `GROUP BY` in different clothes
- `bin()` — grouping by a time window, a real KQL-specific idea

## summarize — groupBy() and agg(), combined

```kql
RawTripEvents
| summarize TripCount = count(), AvgFare = avg(fare_amount) by VendorID
```

`summarize ... by ...` is Foundations Lesson 53's `groupBy()` and
Lesson 54's `.agg()`, combined into one operator: `by VendorID` is
the grouping (T-SQL's `GROUP BY VendorID`), and `TripCount =
count()`/`AvgFare = avg(fare_amount)` are named aggregate
expressions, computed per group — the exact same idea as Lesson
54's `count("*").alias("trip_count")`, just KQL's own naming order
(`name = expression`, not `expression.alias(name)`).

## The aggregate functions themselves

```kql
| summarize
    TripCount = count(),
    TotalRevenue = sum(fare_amount),
    AvgFare = avg(fare_amount),
    MaxDistance = max(trip_distance)
    by VendorID
```

`count()`, `sum()`, `avg()`, `max()`, `min()` — genuinely the same
aggregate functions from Foundations Lesson 54's
`pyspark.sql.functions`, just called with KQL's own syntax instead
of Python's. The underlying statistical concept (a value computed
across every row in a group) is identical.

## bin() — grouping by a time window

```kql
RawTripEvents
| summarize TripCount = count() by bin(pickup_time, 1h)
```

`bin()` is a genuinely new idea, without a direct Foundations
equivalent: it rounds a timestamp down to the nearest interval —
here, the start of the hour each event's `pickup_time` falls in —
so `summarize ... by bin(...)` groups events into real time
buckets. This is the actual mechanism behind every time-series
aggregation this chapter builds toward, and Lesson 26 covers it,
and related time functions, properly.

## Why this matters for streaming data specifically

Foundations' `groupBy()` grouped a static, already-loaded
DataFrame. `summarize ... by bin(pickup_time, 1h)` groups a
continuously arriving stream into hourly buckets **as it arrives**
— "how many trips happened in the 2 PM hour, updated live as new
events land" is a genuinely different, streaming-native question
from anything a batch `groupBy()` answers.

## Key terms

| Term | Meaning |
|---|---|
| `summarize ... by ...` | `groupBy()` + `.agg()`, combined into one operator |
| `count()` / `sum()` / `avg()` | The same aggregate functions, KQL's own syntax |
| `bin()` | Rounds a timestamp to an interval — real time-bucket grouping |

## Check yourself

You're ready for Lesson 25 when you can explain, without looking: what
does `bin(pickup_time, 1h)` actually do to a timestamp?
