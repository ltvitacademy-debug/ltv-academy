# Loading Into Redshift

Curated Parquet in S3 is already queryable by Athena, but Northfield's analysts also need fast,
repeated dashboard-style queries with joins across orders, products, and customers — the job
Redshift is built for. This lesson loads the curated zone into a real dimensional model with a
`COPY` command, the fastest way to bulk-load S3 data into Redshift.

## What you'll learn

- Why Redshift Serverless, not a provisioned cluster, fits Northfield's query pattern
- The target schema: `analytics.fact_orders` plus its dimension tables
- The `COPY` command that loads curated Parquet into that schema

## Redshift Serverless, not a cluster

Lesson 1 named Northfield's query pattern as bursty — heavy at month-end when leadership pulls
sales reports, quiet the rest of the month. A provisioned Redshift cluster bills by the hour
whether anyone queries it or not; **Redshift Serverless** bills by the RPU-second actually
consumed and auto-pauses between queries. That maps directly onto Northfield's usage, so this
capstone uses a Serverless workgroup:

```
Workgroup:   northfield-analytics
Namespace:   northfield-dw
Base RPU:    8
Database:    northfielddw
```

## The target schema

`northfielddw` uses a small star schema under the `analytics` schema — a fact table for order
line items, and dimensions analysts join against:

```sql
CREATE SCHEMA IF NOT EXISTS analytics;

CREATE TABLE analytics.dim_product (
    product_sku     VARCHAR(20)   NOT NULL PRIMARY KEY,
    product_name    VARCHAR(100),
    category        VARCHAR(50)
);

CREATE TABLE analytics.dim_customer (
    customer_id     VARCHAR(20)   NOT NULL PRIMARY KEY,
    customer_name   VARCHAR(100),
    signup_date     DATE
);

CREATE TABLE analytics.dim_date (
    dt              DATE          NOT NULL PRIMARY KEY,
    year            SMALLINT,
    month           SMALLINT,
    day             SMALLINT
);

CREATE TABLE analytics.fact_orders (
    order_id        VARCHAR(20)   NOT NULL,
    customer_id     VARCHAR(20)   REFERENCES analytics.dim_customer,
    product_sku     VARCHAR(20)   REFERENCES analytics.dim_product,
    dt              DATE          REFERENCES analytics.dim_date,
    region          VARCHAR(20),
    quantity        INTEGER,
    unit_price      DECIMAL(10,2),
    order_total     DECIMAL(12,2)
)
DISTSTYLE KEY
DISTKEY (customer_id)
SORTKEY (dt);
```

`DISTKEY (customer_id)` colocates each customer's rows on the same node for fast joins against
`dim_customer`; `SORTKEY (dt)` matches the query pattern analysts actually run — "show me last
month" — so Redshift can skip whole blocks of unrelated dates.

## The COPY command

```sql
COPY analytics.fact_orders (order_id, customer_id, product_sku, dt, region, quantity, unit_price, order_total)
FROM 's3://northfield-curated-zone/orders/'
IAM_ROLE 'arn:aws:iam::111122223333:role/northfield-redshift-copy-role'
FORMAT AS PARQUET;
```

`COPY` loads directly from S3 in parallel across Redshift's compute nodes — far faster than
row-by-row `INSERT`s. The `northfield-redshift-copy-role` IAM role (Lesson 10 covers exactly how
it's scoped) grants Redshift read access to `northfield-curated-zone` and nothing else.

## Key terms

| Term | Meaning |
|---|---|
| Redshift Serverless | Auto-scaling, auto-pausing Redshift billed per RPU-second |
| RPU | Redshift Processing Unit — the capacity/billing unit for Serverless |
| DISTKEY | Column controlling how rows are distributed across compute nodes |
| SORTKEY | Column controlling on-disk row order, enabling block-level pruning |

## Check yourself

Why does `analytics.fact_orders` use `SORTKEY (dt)` specifically, rather than sorting by
`order_id` or `product_sku`?
