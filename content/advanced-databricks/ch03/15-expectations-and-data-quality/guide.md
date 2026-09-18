# Lesson 15 — Expectations & Data Quality in Lakeflow

**Chapter 3 · Lakeflow & Declarative Pipelines · Lesson 15 of 34**

## What you'll learn

- Databricks & Delta Lake Lesson 52 already covered `@dp.expect*` in Python, in full — this is not a re-teach
- The SQL side: `CONSTRAINT ... EXPECT (...) ON VIOLATION DROP ROW / FAIL UPDATE`
- Why Expectations are a genuinely different mechanism from a separate manual quality-check step
- Where a rejected row actually goes for each of the three actions

## What Lesson 52 already covered

Lesson 52 built this exact pattern in Python: `@dp.expect` (warn),
`@dp.expect_or_drop` (drop the row), and `@dp.expect_or_fail` (stop the whole
pipeline run) — three enforcement levels, one line each, replacing Lesson
36's manual `.filter()` and separate quarantine table. If that's unfamiliar,
Lesson 52 is the place to learn it; this lesson assumes it and adds the SQL
equivalent.

## The same three levels, in SQL

Every `CREATE STREAMING TABLE` and `CREATE MATERIALIZED VIEW` statement
(Lesson 13) can declare a `CONSTRAINT` clause directly, inline with the
column list:

```sql
CREATE OR REFRESH STREAMING TABLE silver_trips (
  CONSTRAINT valid_fare EXPECT (fare_amount > 0),
  CONSTRAINT valid_distance EXPECT (trip_distance > 0) ON VIOLATION DROP ROW,
  CONSTRAINT valid_vendor EXPECT (VendorID IS NOT NULL) ON VIOLATION FAIL UPDATE
)
AS SELECT * FROM STREAM(bronze_trips);
```

`EXPECT (...)` alone, with no `ON VIOLATION` clause, defaults to the same
behavior as Python's bare `@dp.expect`: **warn** — the row is kept, the
violation is just counted. Add `ON VIOLATION DROP ROW` for Lesson 52's
`expect_or_drop` behavior, or `ON VIOLATION FAIL UPDATE` for
`expect_or_fail`. Same three outcomes, same underlying engine, SQL syntax
instead of a decorator.

## Why this is a genuinely different mechanism

A manual quality-check step (Lesson 36) is a separate query, run after the
transformation, that you have to remember to write and keep in sync with
whatever the transformation actually does. A `CONSTRAINT`/`@dp.expect` rule
lives *inside* the table's own definition — the check and the transformation
can never drift out of sync, because they're the same statement. The
enforcement, the row-counting, and the metrics are the framework's job, not
a second query you maintain.

## Where a rejected row actually goes

| Action | SQL | What happens to the row |
|---|---|---|
| Warn (default) | `EXPECT (...)` | Kept in the table; violation counted only |
| Drop | `... ON VIOLATION DROP ROW` | Filtered out before it reaches the table |
| Fail | `... ON VIOLATION FAIL UPDATE` | The entire pipeline update stops; nothing is written |

A dropped or failed row isn't quietly redirected to a quarantine table the
way Lesson 36's manual split worked — it's either kept with a count against
it, or excluded entirely. A real quarantine pattern is still possible, but
it's a separate, deliberate design (a second table capturing violating
rows), not something `ON VIOLATION DROP ROW` gives you for free.

## Key terms

| Term | Meaning |
|---|---|
| `CONSTRAINT name EXPECT (expr)` | SQL syntax for a data-quality rule, declared inline in the table definition |
| `ON VIOLATION DROP ROW` | The SQL equivalent of Lesson 52's `expect_or_drop` |
| `ON VIOLATION FAIL UPDATE` | The SQL equivalent of Lesson 52's `expect_or_fail` |

## Check yourself

You're ready for Lesson 16 when you can explain, without looking: what
happens to a row that violates a `CONSTRAINT` with no `ON VIOLATION` clause
at all?
