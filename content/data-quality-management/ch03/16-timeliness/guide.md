# Lesson 16 — Timeliness

**Chapter 3 · The Quality Dimensions · Lesson 16 of 30**

## What you'll learn

- What "timeliness" means, and how it's different from every other
  dimension in this chapter
- The two things timeliness actually measures: freshness and latency
- How to check both with T-SQL against timestamp columns
- Why a perfectly accurate value can still fail a quality check, just
  by being old

## What timeliness actually means

Every other dimension in this chapter is about the *data itself* —
is it true, present, agreeing, legal, unique. **Timeliness** is
different: it's about the data's relationship to **time**. A value can
be completely accurate, perfectly valid, fully consistent, and still
fail a timeliness check — because it's stale.

A customer's shipping address, captured correctly a year ago, might no
longer be where they live. The *value* didn't become less accurate in
the database's eyes — nothing about the row changed. But the
real-world fact it represents might have.

## Two things timeliness measures

| Concept | Question it answers | Example |
|---|---|---|
| **Freshness** | How old is this data, relative to how often it should be updated? | Inventory counts refreshed nightly — a count from 9 days ago is stale |
| **Latency** | How long did it take for a real-world event to reach the data? | A sale happens at 2:00 PM; it should appear in reporting by 2:15 PM at the latest |

Freshness is about the data's **age**. Latency is about the data's
**pipeline speed** — the gap between an event happening and that event
being reflected in the system you're querying.

## Checking freshness with SQL

If a table has a `LastUpdated` (or similar) timestamp column, freshness
is a straightforward comparison against the current time:

```sql
SELECT
    ProductId,
    LastUpdated,
    DATEDIFF(HOUR, LastUpdated, GETDATE()) AS HoursSinceUpdate
FROM dbo.Inventory
WHERE DATEDIFF(HOUR, LastUpdated, GETDATE()) > 24;
```

That returns every inventory row that hasn't been refreshed in more
than 24 hours — the specific threshold depends entirely on how often
the business actually expects this data to change (Lesson 21 covers
setting that threshold deliberately, instead of guessing).

## Checking latency with SQL

Latency needs two timestamps: when the event actually happened, and
when it landed in the system you're measuring.

```sql
SELECT
    OrderId,
    OrderPlacedAt,          -- when the event happened, source system
    LoadedIntoWarehouseAt,  -- when it arrived in this system
    DATEDIFF(MINUTE, OrderPlacedAt, LoadedIntoWarehouseAt) AS LatencyMinutes
FROM dbo.OrderLoadLog
WHERE DATEDIFF(MINUTE, OrderPlacedAt, LoadedIntoWarehouseAt) > 15;
```

Rows where `LatencyMinutes` exceeds whatever your service-level
expectation is (15 minutes, in this example) are timeliness failures
— even though every other value in the row might be flawless.

## Turning either into a trackable rate

Same pattern you've now seen for accuracy and completeness — aggregate
across the table to get a single, trackable number:

```sql
SELECT
    CAST(SUM(CASE WHEN DATEDIFF(HOUR, LastUpdated, GETDATE()) <= 24
                  THEN 1 ELSE 0 END) AS DECIMAL(5,2))
        / COUNT(*) * 100 AS FreshnessRatePct
FROM dbo.Inventory;
```

## Key terms

| Term | Meaning |
|---|---|
| Timeliness | Whether data reflects reality closely enough in time to still be trustworthy |
| Freshness | How old a piece of data is relative to its expected update cadence |
| Latency | The delay between a real-world event occurring and it appearing in the system |

## Lab

1. Create a small test table with a `LastUpdated DATETIME` column and
   insert rows with a mix of recent and old timestamps (use
   `DATEADD` to backdate some rows, e.g.
   `DATEADD(DAY, -10, GETDATE())`).
2. Write a freshness query that flags any row older than a threshold
   you choose (justify the threshold in a comment).
3. Create a second small table simulating an event log with two
   timestamp columns (`EventAt` and `LoadedAt`), and write a latency
   query that flags any row exceeding a 15-minute gap.
4. Turn one of the two checks into a percentage rate, the same way the
   lesson's `FreshnessRatePct` example does.

## Check yourself

- In your own words, why can a perfectly accurate value still fail a
  timeliness check?
- What's the difference between freshness and latency, and which
  timestamp(s) does each one need?
- Why does the "right" freshness threshold depend entirely on the
  business, not on SQL Server?
