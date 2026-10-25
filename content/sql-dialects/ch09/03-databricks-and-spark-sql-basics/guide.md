# Lesson 55 — Databricks SQL and Spark SQL Basics

**Chapter 9 · Cloud Warehouse SQL Dialects · Lesson 3 of 5**

## What you'll learn

- Databricks SQL's heritage: it runs on Apache Spark, with Hive SQL ancestry
- Backticks for identifiers, the way MySQL quotes them
- Why Delta Lake matters to how you think about tables here
- `LATERAL VIEW explode()` — conceptually like `CROSS APPLY`, syntactically very different

## A different heritage from the OLTP dialects

Databricks SQL runs on top of Apache Spark, and its syntax traces back through Spark SQL to
Hive SQL. That heritage is close to standard SQL in most everyday statements, but it carries its
own set of conventions that a T-SQL developer should expect to adjust to, rather than assume
away.

## Identifiers: backticks, like MySQL

Databricks SQL quotes identifiers with backticks, not T-SQL's square brackets or ANSI double
quotes:

```sql
-- T-SQL
SELECT [Order Date], [Customer Name] FROM [Sales Orders];

-- Databricks SQL — backticks, the same convention MySQL uses
SELECT `Order Date`, `Customer Name` FROM `Sales Orders`;
```

If you've already met MySQL's backtick quoting earlier in this course, this one requires no new
learning — it's the identical convention.

## Delta Lake underneath

Databricks SQL tables are usually backed by Delta Lake, an open table format that adds
transactional guarantees and versioning on top of files in cloud storage. You don't need to
master Delta Lake internals for this course's scope, but keep the name in mind: when Databricks
documentation or error messages mention Delta Lake, it's talking about the storage layer behind
the tables your SQL queries against, not a separate product you opt into.

```sql
-- Table creation commonly specifies Delta explicitly or implicitly defaults to it
CREATE TABLE orders (
  order_id INT,
  order_date DATE,
  total_due DECIMAL(10,2)
) USING DELTA;
```

## LATERAL VIEW explode(): a Spark-specific pattern

Databricks SQL's array/map-handling workhorse is `LATERAL VIEW explode()` — conceptually
similar to what `CROSS APPLY` does in T-SQL (expanding a correlated value per source row), but
syntactically very different:

```sql
-- A table with an array column
-- orders(order_id INT, item_names ARRAY<STRING>)

-- Databricks SQL / Spark SQL — one row per array element
SELECT order_id, item_name
FROM orders
LATERAL VIEW explode(item_names) AS item_name;
```

Each row of `item_names` (an array) produces one output row per element, paired with its parent
`order_id` — the same end result as expanding a correlated table-valued function with
`CROSS APPLY`, but a Spark-specific keyword combination (`LATERAL VIEW` plus `explode()`) rather
than a `JOIN`-family keyword.

## Comparing the pattern to T-SQL

| | T-SQL | Databricks SQL / Spark SQL |
|---|---|---|
| Identifier quoting | `[brackets]` | `` `backticks` `` |
| Expanding a per-row array/set | `CROSS APPLY` + a table-valued function | `LATERAL VIEW explode(...)` |
| Underlying storage concept | Rows/pages in a database engine | Delta Lake table format over cloud files |

## Key terms

| Term | Meaning |
|---|---|
| Databricks SQL | The SQL interface to Databricks, running on Apache Spark |
| Delta Lake | The open table format typically backing Databricks SQL tables |
| `LATERAL VIEW explode()` | Spark SQL's pattern for turning array/map column values into one row per element |

## Lab

Given a table `customers(customer_id INT, tags ARRAY<STRING>)`, write a Databricks SQL query
using `LATERAL VIEW explode()` that returns one row per `customer_id`/`tag` pair.

## Check yourself

You're ready for Lesson 56 when you can answer, without looking: what identifier-quoting
convention does Databricks SQL share with MySQL, what table format typically backs a Databricks
SQL table, and what's the Spark-specific way to expand an array column into one row per element?
