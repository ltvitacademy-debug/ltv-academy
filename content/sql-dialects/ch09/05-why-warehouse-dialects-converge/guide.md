# Lesson 57 — Why Warehouse SQL Dialects Converge More Than OLTP Dialects Do

**Chapter 9 · Cloud Warehouse SQL Dialects · Lesson 5 of 5**

## What you'll learn

- The real age gap between cloud warehouses and classic OLTP platforms
- Why "designed later" tends to mean "designed more alike"
- The historical baggage OLTP platforms still carry, and why it never got cleaned up
- How this chapter's four platforms illustrate the pattern

## A real age gap

SQL Server, Oracle, MySQL, and PostgreSQL — the four OLTP dialects at the center of this
course — all trace back to the 1980s and 1990s. Snowflake, BigQuery, Databricks, and Redshift
are all dramatically newer: Redshift launched in 2012, Snowflake in 2014, BigQuery in 2010,
Databricks SQL building on Spark which itself dates to the early 2010s. That's roughly two to
three decades of difference, and it shows up directly in how much each generation borrowed from
an already-settled standard.

## Designed later means designed more alike

By the time these cloud warehouses were built, the SQL:2003 standard (window functions),
decades of ANSI join syntax consensus, and each other's early design choices were already
established, public, and battle-tested. Every lesson in this chapter demonstrated this directly:

- Snowflake's syntax (Lesson 53) reads closer to PostgreSQL/standard SQL than to anything
  older and more idiosyncratic.
- Redshift (Lesson 56) is *literally* built on a PostgreSQL fork — it inherited a modern,
  standards-aligned syntax wholesale rather than evolving its own from scratch.
- BigQuery's Standard SQL (Lesson 56) deliberately replaced an older, more idiosyncratic
  "legacy SQL" dialect once the standard approach had proven itself.

None of these platforms had to re-litigate decisions that the OLTP world had already fought
over — they could simply adopt the winning answer.

## OLTP platforms carry decades of their own baggage

The four classic platforms, by contrast, made real design decisions **before** today's
consensus existed — and backward compatibility means those decisions never get cleaned up,
because doing so would break existing production code:

```sql
-- Oracle's DUAL table (Lesson 17) -- a workaround for a 1980s requirement
-- that every SELECT have a FROM clause, still required decades later
SELECT SYSDATE FROM DUAL;
```

```sql
-- Oracle's (+) join operator (Lesson 20) -- predates ANSI join syntax,
-- still supported today purely for backward compatibility
SELECT o.order_id FROM orders o, customers c
WHERE o.customer_id = c.customer_id(+);
```

Both of these are real, working syntax today — not deprecated or removed — because Oracle (and
its customers) can't simply delete decades of production code that depends on them. Cloud
warehouses, built without that installed base to protect, never had to make this trade-off.

## The pattern, stated plainly

| | OLTP platforms (T-SQL, Oracle, MySQL, PostgreSQL) | Cloud warehouses (Snowflake, BigQuery, Databricks, Redshift) |
|---|---|---|
| Era of origin | 1980s-1990s | 2010s |
| Standard existed first? | No — platforms predate or co-evolved with the standard | Yes — SQL:2003 and ANSI join syntax were already settled |
| Backward-compatibility burden | Decades of production code locks in old quirks | Little to no legacy installed base to protect |
| Result | More platform-specific historical quirks (`(+)`, `DUAL`, etc.) | More convergence toward the standard and each other |

## Key terms

| Term | Meaning |
|---|---|
| Historical baggage | Design choices made before a standard existed, kept for backward compatibility |
| Convergence | Newer platforms adopting an already-settled standard rather than inventing their own |

## Lab

List three specific syntax quirks from earlier in this course (one from Chapter 3 or 4, naming
the lesson) that exist specifically because of an OLTP platform's pre-standard history, and
explain in one sentence each why that quirk was never "cleaned up."

## Check yourself

You're ready for Lesson 58 when you can answer, without looking: roughly how many decades
separate the OLTP platforms from the cloud warehouses in this course, why does "designed later"
tend to produce more convergence, and name two specific OLTP quirks that exist purely for
backward compatibility.
