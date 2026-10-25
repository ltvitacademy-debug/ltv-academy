# Lesson 52 — Translating a Real T-SQL Query into PostgreSQL

**Chapter 8 · PostgreSQL Deep Dive for T-SQL Developers · Lesson 5 of 5**

## What you'll learn

- A complete, realistic T-SQL query using `IDENTITY`, `TOP`, and `ISNULL`
- Line-by-line conversion of each piece into correct PostgreSQL
- Why each conversion decision is necessary, not stylistic
- How this ties together every PostgreSQL-specific lesson from this chapter

## The starting query: real T-SQL, as you'd actually write it

```sql
CREATE TABLE customers (
  customer_id INT IDENTITY(1,1) PRIMARY KEY,
  customer_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20)
);

SELECT TOP 10 customer_id,
       customer_name,
       ISNULL(phone, 'No phone on file') AS phone_display
FROM customers
ORDER BY customer_id DESC;
```

Three pieces here don't translate literally: `IDENTITY(1,1)` for auto-incrementing the primary
key, `TOP 10` to limit rows, and `ISNULL` for NULL replacement.

## Decision 1: IDENTITY → GENERATED ALWAYS AS IDENTITY (or SERIAL)

T-SQL's `IDENTITY(1,1)` is a column property. PostgreSQL has two common equivalents: the modern,
standard-SQL-compliant `GENERATED ALWAYS AS IDENTITY`, or the older, PostgreSQL-specific `SERIAL`
pseudo-type (which is really just `INTEGER` plus an auto-created sequence and default behind the
scenes). The modern syntax is the better choice for new code.

```sql
-- Modern, standard-compliant PostgreSQL (preferred)
CREATE TABLE customers (
  customer_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  customer_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20)
);

-- Older, PostgreSQL-specific shortcut (still common in existing code)
CREATE TABLE customers (
  customer_id SERIAL PRIMARY KEY,
  customer_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20)
);
```

## Decision 2: TOP → LIMIT, moved to the end

Same move you already made for MySQL in Chapter 7: T-SQL's `TOP 10` sits right after `SELECT`;
PostgreSQL's `LIMIT 10` goes at the **end** of the query.

```sql
-- T-SQL
SELECT TOP 10 customer_id, customer_name FROM customers ORDER BY customer_id DESC;

-- PostgreSQL
SELECT customer_id, customer_name FROM customers ORDER BY customer_id DESC LIMIT 10;
```

## Decision 3: ISNULL → COALESCE

PostgreSQL has no `ISNULL` function at all — reach for the standard `COALESCE`, which works
identically across every dialect in this course.

```sql
-- T-SQL
ISNULL(phone, 'No phone on file')

-- PostgreSQL
COALESCE(phone, 'No phone on file')
```

## Putting it all together

```sql
-- PostgreSQL, fully translated
CREATE TABLE customers (
  customer_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  customer_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20)
);

SELECT customer_id,
       customer_name,
       COALESCE(phone, 'No phone on file') AS phone_display
FROM customers
ORDER BY customer_id DESC
LIMIT 10;
```

Every other part of the query — `SELECT`, `FROM`, `ORDER BY`, the column list — needed zero
changes. As in the MySQL chapter, the pattern holds: most of a query translates untouched, and the
real skill is recognizing the handful of vendor-specific pieces and knowing their replacements.

## Key terms

| Term | Meaning |
|---|---|
| `GENERATED ALWAYS AS IDENTITY` | Modern, standard-compliant PostgreSQL auto-increment syntax |
| `SERIAL` | Older PostgreSQL-specific auto-increment shortcut (INTEGER + sequence + default) |
| `LIMIT N` | PostgreSQL's row-limiting clause; goes at the end, unlike T-SQL's `TOP N` |
| `COALESCE` | Standard NULL-replacement function; replaces T-SQL's `ISNULL` (PostgreSQL has no ISNULL) |

## Lab

Take a T-SQL `CREATE TABLE` using `IDENTITY`, paired with a `SELECT TOP ... ISNULL(...)` query,
and translate both into PostgreSQL using the three decision points from this lesson.

## Check yourself

You've finished Chapter 8 when you can explain, without looking: what are PostgreSQL's two options
for auto-incrementing a primary key, and why does `ISNULL` need to become `COALESCE` rather than
something spelled similarly?
