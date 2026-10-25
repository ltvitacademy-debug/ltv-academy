# Lesson 56 — BigQuery and Redshift: A Quick Orientation

**Chapter 9 · Cloud Warehouse SQL Dialects · Lesson 4 of 5**

## What you'll learn

- BigQuery's Standard SQL dialect and its backtick-quoted fully-qualified table names
- BigQuery's native array and struct handling
- Why Redshift's syntax is the closest to PostgreSQL of anything in this course
- Why Redshift's distribution/sort-key DDL is out of scope here (it's administration, not language)

This lesson is intentionally brief and orientational, matching its title — the goal is
recognition, not mastery. You've already done the deep-dive work for Snowflake and Databricks;
these two platforms get a lighter pass.

## BigQuery: Standard SQL, backtick-qualified tables

Google's BigQuery uses what Google calls "Standard SQL" — not the older, now-legacy "legacy
SQL" dialect BigQuery originally shipped with. Standard SQL is the one you'll encounter in any
current BigQuery work. A distinctive visual signature: fully-qualified table names in
backticks, spanning project, dataset, and table:

```sql
-- BigQuery Standard SQL
SELECT customer_id, order_date, total_due
FROM `my-project.sales_dataset.orders`
WHERE order_date >= '2026-01-01';
```

BigQuery also has native array and struct types, letting a single column hold a repeated value
or a nested record directly:

```sql
-- A column of type ARRAY<STRING>, and a STRUCT (nested record) column
SELECT
  customer_id,
  tags,                      -- ARRAY<STRING>
  address.city, address.zip  -- STRUCT fields reached with dot notation
FROM `my-project.sales_dataset.customers`;
```

That's the orientation: recognize the backtick-qualified three-part table name and the
array/struct dot notation as distinctly BigQuery, and you'll know what you're looking at.

## Redshift: the closest thing to PostgreSQL in this course

Amazon Redshift is PostgreSQL-derived — built on an older fork of Postgres — making its SQL
syntax closer to PostgreSQL than any other platform covered in this course:

```sql
-- Redshift — reads almost exactly like PostgreSQL
SELECT customer_id, order_date, total_due
FROM orders
WHERE order_date >= '2026-01-01'
LIMIT 10;
```

If you've internalized PostgreSQL's syntax from earlier chapters, Redshift requires the least
new learning of any warehouse dialect in this course.

## Redshift's distribution and sort keys: out of scope here

Redshift layers its own distribution-key and sort-key concepts onto `CREATE TABLE`, controlling
how data is physically spread across compute nodes and ordered on disk:

```sql
-- Redshift-specific DDL — administration territory, not covered in depth here
CREATE TABLE orders (
  order_id INT,
  customer_id INT,
  order_date DATE
)
DISTKEY(customer_id)
SORTKEY(order_date);
```

This is real Redshift syntax, but it's a physical-design/administration concern, not a
language-comparison one — squarely outside this course's scope, which stays focused on the SQL
language itself.

## Key terms

| Term | Meaning |
|---|---|
| BigQuery Standard SQL | BigQuery's current SQL dialect, replacing the older legacy SQL |
| Backtick-qualified table | BigQuery's `` `project.dataset.table` `` naming convention |
| `STRUCT` | BigQuery's nested-record type, reached with dot notation |
| `DISTKEY` / `SORTKEY` | Redshift's distribution/sort-key DDL — administration, out of this course's scope |

## Lab

Identify which platform — BigQuery or Redshift — each of these snippets belongs to, and why:

```sql
-- Snippet A
SELECT * FROM `analytics.web.pageviews` WHERE event_date = CURRENT_DATE();

-- Snippet B
SELECT * FROM pageviews WHERE event_date = CURRENT_DATE LIMIT 100;
```

## Check yourself

You're ready for Lesson 57 when you can answer, without looking: what's the current name for
BigQuery's modern SQL dialect, which platform in this course is closest to PostgreSQL, and why
are Redshift's distribution/sort keys out of scope for this course?
