# Lesson 8 — Date and Time Types Across Platforms

**Chapter 2 · Data Types Across Dialects · Lesson 3 of 6**

## What you'll learn

- SQL Server's modern date/time types as your baseline
- Oracle's unusual DATE type — it always includes a time component
- MySQL's DATETIME vs. TIMESTAMP gotcha — a real, documented range and timezone difference
- PostgreSQL's TIMESTAMPTZ and how it compares to SQL Server's DATETIMEOFFSET

## SQL Server — your baseline

```sql
-- SQL Server
CREATE TABLE Events (
    EventDate DATE,                    -- date only
    EventTime TIME,                    -- time only
    CreatedAt DATETIME2,                -- modern, higher precision timestamp
    ScheduledAt DATETIMEOFFSET          -- timezone-aware timestamp
);
```

`DATETIME2` is the modern, recommended timestamp type (higher precision than the legacy
`DATETIME`). `DATETIMEOFFSET` carries an explicit UTC offset, making it timezone-aware.

## Oracle — DATE always includes a time, down to the second

Here's Oracle's genuine quirk: its `DATE` type is **not** date-only. Unlike every other platform
in this lesson, Oracle's `DATE` always stores a time component, down to the second, even if you
never think about it that way:

```sql
-- Oracle
CREATE TABLE events (
    event_date DATE,        -- NOT date-only! Includes time to the second.
    created_at TIMESTAMP    -- higher precision (fractional seconds)
);
```

A developer coming from SQL Server, where `DATE` is genuinely date-only, will be surprised the
first time a comparison or sort on an Oracle `DATE` column behaves as if hidden time values are
present — because they are.

## MySQL — DATETIME vs. TIMESTAMP, a real documented gotcha

MySQL has `DATE`, `DATETIME`, and `TIMESTAMP`. The gotcha: MySQL's `TIMESTAMP` is **timezone-
aware** (it's stored in UTC and converted on retrieval) and has a **narrower range** than
`DATETIME` — this is real, documented MySQL behavior, not a minor implementation detail.

```sql
-- MySQL
CREATE TABLE events (
    event_date DATE,
    created_at DATETIME,     -- wider range, NOT timezone-aware
    logged_at TIMESTAMP       -- narrower range, IS timezone-aware
);
```

If you need a wide date range with no timezone conversion behavior, use `DATETIME`. If you
specifically want automatic UTC storage/conversion and can live with the narrower range, use
`TIMESTAMP`.

## PostgreSQL — TIMESTAMP and TIMESTAMPTZ

PostgreSQL has `DATE`, `TIME`, `TIMESTAMP`, and `TIMESTAMPTZ` (timezone-aware):

```sql
-- PostgreSQL
CREATE TABLE events (
    event_date DATE,
    event_time TIME,
    created_at TIMESTAMP,       -- no timezone awareness
    scheduled_at TIMESTAMPTZ    -- timezone-aware, similar role to DATETIMEOFFSET
);
```

`TIMESTAMPTZ` fills a similar role to SQL Server's `DATETIMEOFFSET` — both store/handle timezone
information explicitly rather than leaving it implicit.

## Key terms

| Term | Meaning |
|---|---|
| Oracle `DATE` | Always includes a time component down to the second — not date-only |
| MySQL `TIMESTAMP` | Timezone-aware (UTC-converting), narrower range than `DATETIME` |
| `TIMESTAMPTZ` | PostgreSQL's timezone-aware timestamp, comparable to SQL Server's `DATETIMEOFFSET` |

## Lab

Write a query comparing two Oracle `DATE` values that you'd expect to be "equal" if you were
thinking of `DATE` as date-only. Predict whether they'll actually compare as equal, given that
Oracle's `DATE` always carries time-to-the-second.

## Check yourself

You're ready for Lesson 9 when you can explain Oracle's `DATE` quirk in one sentence, and state
which MySQL type you'd choose for a wide date range with no timezone conversion.
