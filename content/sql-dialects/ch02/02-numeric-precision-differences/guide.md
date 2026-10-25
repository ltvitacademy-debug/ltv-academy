# Lesson 7 — Numeric Types: Precision Differences That Bite

**Chapter 2 · Data Types Across Dialects · Lesson 2 of 6**

## What you'll learn

- Exact (DECIMAL/NUMERIC) vs. approximate (FLOAT/REAL) numeric types, and why the distinction matters
- Oracle's unusual single NUMBER type, and why it surprises developers from other platforms
- Why relying on floating-point types for money is wrong on every platform here, not just one
- How to translate a T-SQL numeric column definition to each other platform

## SQL Server — exact vs. approximate, two separate families

You already know this split: `DECIMAL`/`NUMERIC` store exact values with fixed precision and
scale — what you use for money. `FLOAT`/`REAL` are IEEE 754 approximate binary floating-point —
fast, but not exact, and a poor choice for anything requiring exact arithmetic.

```sql
-- SQL Server
CREATE TABLE Orders (
    OrderTotal DECIMAL(10, 2),   -- exact: $12345678.90 max
    SensorReading FLOAT           -- approximate
);
```

MySQL and PostgreSQL follow this same two-family pattern almost exactly: both have standard
`DECIMAL`/`NUMERIC` (exact) and `FLOAT`/`DOUBLE` (approximate). If you know the SQL Server split,
you already know the MySQL and PostgreSQL split.

```sql
-- MySQL and PostgreSQL (same pattern as SQL Server)
CREATE TABLE orders (
    order_total DECIMAL(10, 2),  -- exact
    sensor_reading DOUBLE          -- approximate (note: DOUBLE, not FLOAT, is the common name here)
);
```

## Oracle — one flexible NUMBER type for everything

Oracle is the real divergence in this lesson. Oracle has a single, unusually flexible numeric
type, `NUMBER`, that covers what SQL Server splits across `INT`, `DECIMAL`, and more:

```sql
-- Oracle
CREATE TABLE orders (
    order_id NUMBER(10),        -- behaves like an integer (scale 0)
    order_total NUMBER(10, 2)   -- behaves like a fixed-point decimal
);
```

`NUMBER(precision, scale)` can represent both whole numbers (when scale is 0 or omitted) and
decimals (when scale is positive), all through one type. A developer used to reaching for a
separate `INT` type gets surprised the first time they see every numeric column in an Oracle
schema declared as `NUMBER`.

## The real "bites you" lesson: floating-point math and money

This is true on **every platform in this course**, not just one: using `FLOAT`, `REAL`, or
`DOUBLE` for money or any calculation that needs to be exact is wrong, because IEEE 754 binary
floating-point cannot represent most decimal fractions exactly. Always use the exact types —
`DECIMAL`/`NUMERIC` on SQL Server, MySQL, and PostgreSQL, or `NUMBER` with an explicit scale on
Oracle — for anything involving currency.

```sql
-- This surprises people on every platform, not just one:
-- 0.1 + 0.2 in floating point does not equal exactly 0.3
```

## Key terms

| Term | Meaning |
|---|---|
| Exact numeric | A type that represents decimal values precisely (`DECIMAL`/`NUMERIC`, Oracle `NUMBER`) |
| Approximate numeric | IEEE 754 binary floating-point (`FLOAT`/`REAL`/`DOUBLE`) — fast but not exact |
| Oracle `NUMBER` | Oracle's single flexible type covering both integer-like and decimal values via precision/scale |

## Lab

Take a T-SQL table with an `INT` primary key and a `DECIMAL(10,2)` money column. Write the
equivalent `CREATE TABLE` for Oracle, using `NUMBER` for both columns with appropriate
precision/scale.

## Check yourself

You're ready for Lesson 8 when you can explain why Oracle's single `NUMBER` type surprises
developers coming from SQL Server, and why floating-point types are the wrong choice for money on
every platform in this course.
