# Lesson 26 — Star Schemas, Fact & Dimension Tables — Implementing Them in Snowflake

**Chapter 6 · Data Warehousing & Dimensional Modeling in Snowflake · Lesson 26 of 60**

## What you'll learn

- A quick reminder of star schema shape — assumed known from Data Warehousing / T-SQL Development
- Real Snowflake DDL for a dimension table and a fact table
- Data type choices (`NUMBER` vs. the T-SQL types you're used to)
- A brief first mention of clustering keys — the full topic is Chapter 10

## The shape, briefly — you already know this

One fact table in the middle, one row per business event (a sale, an
order line), holding foreign keys to the dimensions and the numeric
measures. Dimension tables around it, one row per business entity
(customer, product, date), holding the descriptive attributes you
filter and group by. Nothing about that shape changes in Snowflake —
what changes is the exact SQL you write to build it.

## A dimension table in Snowflake

```sql
CREATE TABLE analytics.dim_customer (
    customer_key    NUMBER       PRIMARY KEY,
    customer_id     VARCHAR      NOT NULL,   -- natural/business key
    customer_name   VARCHAR,
    region          VARCHAR,
    signup_date     DATE
);
```

A few things worth noticing coming from T-SQL:

- `NUMBER` is Snowflake's general-purpose numeric type — it covers
  what `INT`, `BIGINT`, and `DECIMAL` each handled separately in
  T-SQL. `NUMBER(12,2)` for a scaled decimal reads the same way you'd
  expect.
- `PRIMARY KEY` and `NOT NULL` are declarable, but Snowflake does
  **not enforce** them by default the way SQL Server does — they're
  informational metadata that query optimization and BI tools can use,
  not constraints the engine blocks bad inserts on. Data quality
  (Lesson 25) is what actually protects a dimension table, not the
  constraint declaration alone.

## A fact table in Snowflake

```sql
CREATE TABLE analytics.fact_sales (
    sale_id         NUMBER,
    customer_key    NUMBER,
    product_key     NUMBER,
    date_key        NUMBER,
    quantity        NUMBER,
    sale_amount     NUMBER(12,2),
    sale_date       DATE
)
CLUSTER BY (sale_date);
```

The foreign keys (`customer_key`, `product_key`, `date_key`) point at
the surrogate keys of the dimension tables around it — exactly the
star schema shape you already know. `sale_amount` uses `NUMBER(12,2)`
for a currency-style scaled decimal, the same instinct as T-SQL's
`DECIMAL(12,2)`.

## A first mention of clustering keys

`CLUSTER BY (sale_date)` tells Snowflake to keep the table's
micro-partitions organized by that column, so queries that filter on
`sale_date` (very common for a fact table — "last quarter's sales")
can prune most of the table without scanning it. This is *not* the
same mechanism as a SQL Server clustered index — there's no physical
row ordering guarantee, and Snowflake decides internally how much
reorganization to do. Chapter 10 covers choosing a clustering key
properly; for now, know that a fact table's most commonly filtered
date or key column is usually the right one to reach for.

## Key terms

| Term | Meaning |
|---|---|
| `NUMBER` | Snowflake's general-purpose numeric type, covering what T-SQL splits into `INT`/`BIGINT`/`DECIMAL` |
| Declared (not enforced) constraint | `PRIMARY KEY`/`NOT NULL` are informational in Snowflake by default, not blocking |
| `CLUSTER BY` | Organizes a table's micro-partitions by a column to help queries prune scans — full coverage in Chapter 10 |
| Surrogate key | The dimension's own generated key, referenced by the fact table's foreign key columns — Lesson 27 |

## Lab

1. Create one dimension table and one fact table in your Snowflake
   trial account, using `NUMBER` types throughout.
2. Add a `CLUSTER BY` clause to the fact table on whichever column
   you'd most often filter by.
3. Insert a handful of rows into each and write a join between them to
   confirm the relationships resolve as expected.

## Check yourself

You're ready for Lesson 27 when you can explain why declaring
`PRIMARY KEY` on a Snowflake table doesn't, by itself, stop a
duplicate row from being inserted.
