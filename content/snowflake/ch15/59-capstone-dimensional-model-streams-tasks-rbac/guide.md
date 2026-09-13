# Lesson 59 — Capstone: Dimensional Model, Streams/Tasks & RBAC

**Chapter 15 · End-to-End Capstone Project · Lesson 59 of 60**

## What you'll build

Milestone 2: your staging tables from Lesson 58 become a real star
schema, that schema stays current automatically through Streams and
Tasks, and the whole thing is secured with roles that actually reflect
who should touch what. Chapters 6, 8, and 9, applied to your project.

## Build the star schema

At least one dimension needs a real surrogate key and SCD Type 2
history (Ch. 6-27, 29) — this is the piece that separates a genuine
dimensional model from just renaming your staging tables:

```sql
CREATE OR REPLACE TABLE warehouse.dim_customer (
  customer_key   NUMBER AUTOINCREMENT PRIMARY KEY,  -- surrogate key
  customer_id    STRING,                            -- natural/business key
  customer_name  STRING,
  segment        STRING,
  effective_date DATE,
  end_date       DATE,
  is_current     BOOLEAN
);

CREATE OR REPLACE TABLE warehouse.fact_orders (
  order_id      STRING,
  customer_key  NUMBER,   -- references dim_customer.customer_key, not customer_id
  product_key   NUMBER,
  order_date    DATE,
  quantity      NUMBER,
  unit_price    NUMBER(10,2),
  extended_amt  NUMBER(12,2)
);
```

The fact table joins to dimensions on the **surrogate key**, never the
natural key — that indirection is exactly what makes SCD Type 2 history
possible without rewriting fact rows every time a customer's segment
changes.

## Wire up Streams and Tasks for incremental refresh

A Stream on staging, feeding a Task that merges into the fact table —
the Chapter 8 pattern, pointed at your own tables:

```sql
CREATE OR REPLACE STREAM staging.orders_stream ON TABLE staging.orders;

CREATE OR REPLACE TASK refresh_fact_orders
  WAREHOUSE = load_wh
  SCHEDULE = '60 MINUTE'
  WHEN SYSTEM$STREAM_HAS_DATA('staging.orders_stream')
AS
MERGE INTO warehouse.fact_orders f
USING staging.orders_stream s
ON f.order_id = s.order_id
WHEN MATCHED AND s.METADATA$ACTION = 'DELETE' THEN DELETE
WHEN MATCHED THEN UPDATE SET
  f.quantity = s.quantity, f.unit_price = s.unit_price,
  f.extended_amt = s.quantity * s.unit_price
WHEN NOT MATCHED AND s.METADATA$ACTION = 'INSERT' THEN INSERT
  (order_id, customer_key, order_date, quantity, unit_price, extended_amt)
  VALUES (s.order_id, /* look up customer_key */ NULL,
          s.order_date, s.quantity, s.unit_price, s.quantity * s.unit_price);

ALTER TASK refresh_fact_orders RESUME;  -- Tasks start suspended
```

The `WHEN SYSTEM$STREAM_HAS_DATA(...)` clause is what keeps this
cheap — the Task wakes up on schedule but does nothing (a `SKIPPED`
run, from Lesson 56) when the Stream is empty, instead of running a
full `MERGE` against unchanged data every hour.

## Configure RBAC for the project

At least two roles, with grants that reflect what each one actually
needs to do — not everyone running as `ACCOUNTADMIN` (Ch. 9):

```sql
CREATE ROLE IF NOT EXISTS capstone_loader_role;
CREATE ROLE IF NOT EXISTS capstone_analyst_role;

-- Loader: can write to raw/staging, run the Task's warehouse
GRANT USAGE ON DATABASE capstone_db TO ROLE capstone_loader_role;
GRANT USAGE ON SCHEMA capstone_db.raw TO ROLE capstone_loader_role;
GRANT INSERT, SELECT ON ALL TABLES IN SCHEMA capstone_db.raw TO ROLE capstone_loader_role;
GRANT USAGE ON WAREHOUSE load_wh TO ROLE capstone_loader_role;

-- Analyst: read-only on the reporting/warehouse layer only
GRANT USAGE ON DATABASE capstone_db TO ROLE capstone_analyst_role;
GRANT USAGE ON SCHEMA capstone_db.warehouse TO ROLE capstone_analyst_role;
GRANT SELECT ON ALL TABLES IN SCHEMA capstone_db.warehouse TO ROLE capstone_analyst_role;
GRANT USAGE ON WAREHOUSE analytics_wh TO ROLE capstone_analyst_role;

-- Confirm it's real, not just declared
SHOW GRANTS TO ROLE capstone_analyst_role;
```

Notice the analyst role has no grant on `raw` or `staging` at all —
that's the point. If the analyst role could `SELECT` from a raw
landing table, the RBAC doesn't actually reflect the project's real
data-access boundaries.

## Key terms

| Term | Meaning |
|---|---|
| Surrogate key | An auto-generated dimension key the fact table joins on, independent of the natural/business key |
| `MERGE` | Single statement handling insert/update/delete from a Stream in one Task run |
| Least privilege | Each role granted only what it actually needs — verified with `SHOW GRANTS`, not assumed |

## Lab

1. Build at least one dimension with a real surrogate key and SCD Type
   2 columns, and a fact table that joins to it by surrogate key.
2. Create a Stream on a staging table and a Task that merges its
   changes into your fact/dimension tables — confirm at least one real
   incremental run in `TASK_HISTORY`.
3. Create your loader and analyst roles, grant only what each needs,
   and run `SHOW GRANTS TO ROLE` on both to confirm the boundary is
   real, not assumed.

## Check yourself

You're ready for Lesson 60 when your star schema is populated through
a working Stream+Task pipeline (not a one-time manual load), and you
can prove — with `SHOW GRANTS`, not a guess — that your analyst role
cannot see the raw layer.
