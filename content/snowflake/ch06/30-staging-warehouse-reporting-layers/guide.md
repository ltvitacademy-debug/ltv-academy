# Lesson 30 — Staging → Warehouse → Reporting Layers

**Chapter 6 · Data Warehousing & Dimensional Modeling in Snowflake · Lesson 30 of 60**

## What you'll learn

- The three-schema convention that formalizes everything Chapters 5 and 6 have been building toward
- Real `CREATE SCHEMA` naming for each layer, and what actually lives in each one
- How an object moves through all three layers, start to finish
- Why this convention is exactly what Chapter 15's capstone will ask you to build

## Naming the layers for real

Lesson 21 introduced raw, staging, and business-ready as *concepts*.
This lesson gives them the concrete schema names used through the
rest of this course — one database, three schemas, each with a
distinct job:

```sql
CREATE SCHEMA IF NOT EXISTS raw;        -- landing zone, unmodified
CREATE SCHEMA IF NOT EXISTS staging;    -- typed, deduped, quality-checked
CREATE SCHEMA IF NOT EXISTS warehouse;  -- star schema: facts & dimensions
CREATE SCHEMA IF NOT EXISTS reporting;  -- views, for BI tools to query
```

Four schemas, not three, once you separate "warehouse" (the modeled
star schema itself) from "reporting" (what a BI tool actually connects
to). That split matters: it means a BI connection never points
directly at fact and dimension tables — it points at a reporting view
in front of them.

## What actually lives in each schema

| Schema | Holds | Built by |
|---|---|---|
| `raw` | Unmodified loaded data | `COPY INTO` / Snowpipe (Ch. 3-4) |
| `staging` | Typed, deduplicated, quality-checked | CTAS, `MERGE`, `QUALIFY` (Ch. 5) |
| `warehouse` | Star schema fact & dimension tables | SCD1/SCD2 `MERGE`, surrogate keys (Ch. 6) |
| `reporting` | Views joining facts to dimensions, pre-aggregated where useful | Plain `CREATE VIEW` over `warehouse` |

A reporting view is usually nothing more than the join a BI report
would otherwise have to repeat every time:

```sql
CREATE OR REPLACE VIEW reporting.vw_sales_by_customer AS
SELECT
    c.customer_name,
    c.region,
    s.sale_date,
    s.sale_amount
FROM warehouse.fact_sales AS s
JOIN warehouse.dim_customer AS c
    ON s.customer_key = c.customer_key
   AND c.is_current = TRUE;
```

Notice the `is_current = TRUE` filter — this is exactly where Lesson
29's SCD2 pattern pays off: the reporting view naturally shows each
fact against the dimension version that was current, without any
report author needing to know SCD2 exists.

## One order, start to finish

```sql
-- 1. Land it (Chapter 3-4)
COPY INTO raw.orders FROM @my_stage/orders/;

-- 2. Clean it (Chapter 5)
CREATE OR REPLACE TABLE staging.orders_cleaned AS
SELECT order_id, customer_id, TRY_CAST(order_total AS NUMBER(12,2)) AS order_total
FROM raw.orders WHERE order_id IS NOT NULL;

-- 3. Model it (Chapter 6)
MERGE INTO warehouse.fact_sales AS tgt
USING staging.orders_cleaned AS src
    ON tgt.order_id = src.order_id
WHEN NOT MATCHED THEN INSERT (order_id, order_total)
    VALUES (src.order_id, src.order_total);

-- 4. Expose it (this lesson)
-- reporting.vw_sales_by_customer, defined above, is what a BI tool queries.
```

## Foreshadowing what comes later

Two things this layering sets up for later chapters, briefly:

- **RBAC (Chapter 9)** — each schema typically gets its own scoped
  role: a loader role can write to `raw`, a transform role can write
  to `staging`/`warehouse`, and a reporting role gets read-only access
  to `reporting` alone, never touching `raw` or `warehouse` directly.
- **The capstone (Chapter 15)** — this exact four-schema shape, built
  end-to-end against real data, is what the capstone project asks you
  to deliver.

## Key terms

| Term | Meaning |
|---|---|
| `raw` schema | Unmodified landing zone for loaded data |
| `staging` schema | Typed, deduplicated, quality-checked data — Chapter 5's output |
| `warehouse` schema | Star schema fact & dimension tables — Chapter 6's output |
| `reporting` schema | Views a BI tool actually connects to, sitting in front of `warehouse` |

## Lab

1. In your Snowflake trial account, create all four schemas:
   `raw`, `staging`, `warehouse`, `reporting`.
2. Move one table you've built in an earlier lab through all four
   layers, ending with a reporting view that joins a fact to a
   dimension.
3. Write one sentence explaining why the reporting view, not the raw
   fact/dimension tables, is what a BI tool should connect to.

## Check yourself

You're ready for Chapter 7 when you can name all four schemas in
order, and explain in one sentence why `reporting` sits in front of
`warehouse` instead of being the same thing.
