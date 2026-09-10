# Lesson 26 — KQL: Time Series Functions

**Chapter 2 · Real-Time Data Engineering · Lesson 26 of 70**

## What you'll learn

- `bin()`, properly — the real interval options, not just `1h`
- `ago()` — a moving reference point, relative to right now
- `make-series` — turning grouped counts into an actual time series
- Why time-series indexing is the real reason a KQL Database exists

## bin() — the real interval options

```kql
| summarize TripCount = count() by bin(pickup_time, 5m)   -- 5-minute buckets
| summarize TripCount = count() by bin(pickup_time, 1h)   -- hourly buckets
| summarize TripCount = count() by bin(pickup_time, 1d)   -- daily buckets
```

Lesson 24 introduced `bin()` with a single example; the real
interval syntax accepts any duration — minutes (`m`), hours (`h`),
days (`d`). Choosing the right bucket size is a real, practical
decision: 5-minute buckets for a live dashboard tracking the last
hour, daily buckets for a trend chart spanning months.

## ago() — relative to right now

```kql
RawTripEvents
| where pickup_time > ago(1h)
```

`ago(1h)` means "one hour before the moment this query actually
runs" — a genuinely moving reference point, unlike a fixed
timestamp literal. This is the real mechanism behind "show me
everything from the last hour" on a live dashboard (Lesson 28):
the query's `where` clause recalculates what "one hour ago" means
every time it runs, automatically staying current.

## make-series — a real time series, not just grouped counts

```kql
RawTripEvents
| make-series TripCount = count() on pickup_time from ago(6h) to now() step 15m
```

`summarize ... by bin(...)` (Lesson 24) only returns buckets that
actually have data. `make-series` explicitly fills in **every**
interval in a range — including zero-count intervals with no
events at all — which matters for a real time-series chart, where
a gap in the x-axis (a bucket silently missing because it had zero
events) would otherwise look like missing data rather than a
genuine zero.

## Why this is the real reason a KQL Database exists

Recall Lesson 21's point that a KQL Database is optimized
differently from a Delta table. `bin()`, `ago()`, and `make-series`
are the concrete syntax behind that optimization — real,
first-class time-series operations that a general-purpose
DataFrame engine (or T-SQL) can express, but nowhere near this
directly or this efficiently at scale.

## Key terms

| Term | Meaning |
|---|---|
| `bin(column, interval)` | Rounds a timestamp to a chosen interval — `5m`, `1h`, `1d` |
| `ago(duration)` | A moving reference point, relative to when the query runs |
| `make-series` | Fills in every interval in a range, including genuine zeros |

## Check yourself

You're ready for Lesson 27 when you can explain, without looking: why
might `make-series` show a bucket that `summarize ... by bin(...)`
would have silently omitted?
