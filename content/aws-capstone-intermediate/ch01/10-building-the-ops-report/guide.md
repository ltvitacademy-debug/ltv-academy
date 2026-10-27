# Lesson 10 — Building the Ops Report

**Chapter 1 · Intermediate Capstone: A Repeatable Curated Dataset · Lesson 10 of 16**

## What you'll learn

- Why Ops gets a lighter report than Finance, over the same curated data
- Querying `northfield_orders_curated` directly with Athena instead of Redshift
- The real reason two stakeholders end up on two different query paths
- How this reuses the exact Spectrum-style pattern Lesson 7 already proved out

## Remember who Ops is

The Beginner tier's original stakeholder was Ops — the team that ran ad hoc Athena queries
against the raw zone before any of this warehouse existed. They never asked for recurring,
join-heavy reporting the way Finance did in Lesson 1. What they want now is simpler: a quick
read on order volume and average order value by region, over a given date range, without
learning Redshift or waiting on a warehouse query.

## The query

Ops's report queries the curated data directly with Athena — no Redshift involved:

```sql
SELECT
    region,
    SUM(quantity)     AS units_sold,
    COUNT(DISTINCT order_id) AS orders,
    SUM(order_total) / COUNT(DISTINCT order_id) AS avg_order_value
FROM northfield_catalog.northfield_orders_curated
WHERE dt BETWEEN DATE '2026-09-13' AND DATE '2026-09-19'
GROUP BY region
ORDER BY units_sold DESC;
```

This is a single table, no joins, filtered to one week and grouped by one column — a shape
Athena handles well without any warehouse machinery behind it.

## Same curated data, two different paths

This is the point worth sitting with: `northfield_orders_curated` is the exact same Parquet data,
written by the exact same `northfield-orders-etl` Glue job, that feeds `fact_orders` in Redshift.
Finance and Ops are not working from two different datasets that happen to agree — they're
working from one curated dataset, reached two different ways:

| Stakeholder | Query path | Why |
|---|---|---|
| Finance (Lesson 9) | Redshift, `analytics.fact_orders` joined to dimensions | Recurring, multi-table, consistent performance expected |
| Ops (this lesson) | Athena, directly over `northfield_orders_curated` | Lighter, single-table, no need for warehouse joins |

## Why not just send Ops to Redshift too

It would work — Lesson 7's Spectrum external schema already lets Redshift reach this same S3
data. But routing every reporting need through the warehouse regardless of how light it is adds
unnecessary cost and complexity: provisioning access, teaching Ops basic warehouse SQL, and
consuming Redshift Serverless capacity for a query that Athena was already built to answer well.
The right tool depends on the shape of the question, not a blanket rule that "the warehouse is
where reports live now."

## Key terms

| Term | Meaning |
|---|---|
| Query path | The specific service and table a report's SQL actually runs against |
| Single-table query | A report with no joins — Athena's strongest fit |
| Right-sizing a query path | Matching a report's complexity to the simplest tool that satisfies it |

## Lab

Run the query above against your own curated zone for a one-week date range you have data for.
Then compare: which of this lesson's and the previous lesson's two reports would you reach for
if someone asked "how many units did the Pacific region move last week" versus "what was
September's revenue by category"?

## Check yourself

You're ready for Lesson 11 when you can answer, without looking: why do Finance and Ops end up
on two different query paths over data that is, underneath, exactly the same curated dataset?
