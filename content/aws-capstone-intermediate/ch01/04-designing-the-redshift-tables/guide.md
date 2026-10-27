# Lesson 4 — Designing the Redshift Tables

**Chapter 1 · Intermediate Capstone: A Repeatable Curated Dataset · Lesson 4 of 16**

## What you'll learn

- The real `CREATE TABLE` statements for the warehouse Finance and Ops will query
- Why this is a star schema, and what each dimension/fact table is for
- How `DISTKEY` and `SORTKEY` are chosen to match this project's actual query pattern
- Why the warehouse runs on Redshift Serverless, and what the workgroup settings mean

## The warehouse, named

Before the tables, the warehouse that holds them:

- **Workgroup:** `northfield-analytics`
- **Namespace:** `northfield-dw`
- **Database:** `northfielddw`
- **Base capacity:** 8 RPUs

As covered in Lesson 2, Serverless is the right fit here because Northfield's query load is
bursty — heavy around month-end close, quiet otherwise — and Serverless auto-pauses and bills
per RPU-second rather than charging for an always-on cluster sized for the busiest day of the
month.

## The tables

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

## Why a star schema, and why these four tables

`fact_orders` holds the numbers — quantity, price, total — at the same order-line grain the
curated Parquet already uses. The three dimension tables hold descriptive attributes that
Finance and Ops will filter and group by: which product category, which customer, which
calendar period. This is deliberately a **small** star — exactly the three dimensions this
chapter's two real reports (Lessons 9-10) need, nothing added "just in case." `region` stays on
the fact table itself rather than becoming a fourth dimension, since it's a flat attribute of
the order with no further descriptive detail to normalize out.

The `REFERENCES` clauses declare the relationships. Redshift doesn't enforce foreign keys at
write time the way a transactional database would — but it uses them as planning hints, and they
document the model for anyone (including future-you) reading the schema.

## Why DISTKEY(customer_id)

A `DISTKEY` controls which compute slice a row is physically stored on. `DISTSTYLE KEY` with
`DISTKEY(customer_id)` means every `fact_orders` row for a given customer lands on the same
slice as that customer's row in `dim_customer`. When a query joins `fact_orders` to
`dim_customer` — which both the Finance and Ops reports do — Redshift can join matching rows
locally on each slice instead of shuffling data across the cluster network to find matches. For
a join that both planned reports run routinely, that's a real, recurring performance win, not a
one-time tweak.

## Why SORTKEY(dt)

A `SORTKEY` controls the physical order rows are stored in, which Redshift uses to skip blocks
that can't possibly match a query's filter. `SORTKEY(dt)` matches exactly how both Finance and
Ops actually ask for data: "show me last month," "show me the last 7 days." With rows physically
ordered by date, a query filtered to a date range only has to scan the blocks that overlap that
range — it skips the rest of the table's history entirely, instead of scanning every row and
discarding what doesn't match.

## Key terms

| Term | Meaning |
|---|---|
| Star schema | A fact table related to several dimension tables, each on its key |
| DISTKEY | The column Redshift uses to decide which compute slice stores each row |
| SORTKEY | The column(s) Redshift physically orders a table by, enabling block-level pruning |
| RPU | Redshift Processing Unit — Serverless's unit of compute, billed per second |

## Lab

Using the table definitions above, write out which two columns a query would need to filter on
to get "total revenue for one customer, last month" — and name which key (DISTKEY or SORTKEY)
makes each of those two filters fast.

## Check yourself

You're ready for Lesson 5 when you can answer, without looking: why does `DISTKEY(customer_id)`
specifically speed up the join to `dim_customer`, and why does `SORTKEY(dt)` specifically speed
up a "last month" style filter — and why wouldn't swapping those two choices work as well for
this project's actual query pattern?
