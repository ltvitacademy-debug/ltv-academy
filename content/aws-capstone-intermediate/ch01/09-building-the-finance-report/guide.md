# Lesson 9 — Building the Finance Report

**Chapter 1 · Intermediate Capstone: A Repeatable Curated Dataset · Lesson 9 of 16**

## What you'll learn

- Turning Finance's original Lesson 1 request into the actual SQL that answers it
- Why this report lives in Redshift, not Athena, now that the warehouse exists
- How `fact_orders` joins to the dimension tables built in Lesson 4
- Why this query is meant to be re-run on a schedule, not typed by hand each month

## This is the report Finance actually asked for

Back in Lesson 1, Finance's request was specific: "the same regional revenue numbers every
month, without anyone re-writing or re-running a query by hand — and we need to be able to trust
the totals." Everything since then — the Glue ETL job, the Redshift tables, the `COPY` load, the
scheduled nightly refresh — exists to make this one report possible without anyone hand-rolling
SQL every month. This lesson writes that report.

## The query

Finance wants monthly revenue broken out by region and product category. That means joining
`analytics.fact_orders` to `analytics.dim_product` (for `category`) and `analytics.dim_date`
(for `year` and `month`):

```sql
SELECT
    d.year, d.month,
    f.region,
    p.category,
    SUM(f.order_total) AS revenue,
    SUM(f.quantity)    AS units_sold
FROM analytics.fact_orders f
JOIN analytics.dim_product p ON f.product_sku = p.product_sku
JOIN analytics.dim_date d     ON f.dt = d.dt
WHERE d.year = 2026 AND d.month = 9
GROUP BY d.year, d.month, f.region, p.category
ORDER BY revenue DESC;
```

Every piece of this traces back to something already built: `f.order_total` is the computed
column the Glue ETL job added in Lesson 3, `p.category` and `d.year`/`d.month` come straight from
the dimension tables designed in Lesson 4, and the whole thing only works because the nightly
`COPY` from Lesson 8 keeps `fact_orders` current without anyone touching it.

## Why Redshift, and not Athena, for this one

Lesson 7 kept Athena available as a secondary path over the curated S3 data, and Lesson 10 reuses
exactly that path for a different stakeholder. This report is different: it's a genuine
multi-table join — fact table against two dimensions — run the same way every month, by people
who expect consistent performance and a stable schema to build on (a BI tool, a scheduled export,
a dashboard refresh). That's precisely the workload a warehouse is designed for, and precisely
what Lesson 1 said ad hoc Athena queries couldn't give Finance on their own.

`analytics.dim_customer` is also sitting in the warehouse from Lesson 4, ready if Finance later
asks for a customer-level cut of the same revenue numbers — this particular report doesn't need
it, but the join would be identical in shape to the two already here.

## Not a one-off — a saved report

The critical difference from the Beginner tier's Athena habit: this query gets saved (as a
Redshift view, a BI tool's saved query, or a scheduled export — the exact mechanism matters less
than the discipline) and re-run against whatever `fact_orders` holds after each nightly refresh.
Nobody retypes the `WHERE d.year = 2026 AND d.month = 9` filter by hand each month by guessing at
what changed — the same logic runs again, against freshly loaded data, every time.

## Key terms

| Term | Meaning |
|---|---|
| Fact table | The table holding one row per business event — here, `fact_orders` |
| Dimension table | A table of descriptive attributes a fact table joins against — `dim_product`, `dim_date` |
| Recurring report | A saved query re-run against fresh data on a schedule, not retyped each time |

## Lab

On your own warehouse, run the query above against whatever month of data you have loaded.
Confirm it returns one row per region/category combination with a `revenue` and `units_sold`
figure, then re-run it after your next refresh and confirm the numbers update without changing
the query text.

## Check yourself

You're ready for Lesson 10 when you can answer, without looking: why does this specific report
belong in Redshift instead of Athena, when Lesson 7 proved Athena could already query the same
curated data?
