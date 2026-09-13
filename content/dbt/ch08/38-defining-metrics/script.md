# Script — Defining Metrics in dbt

## Segment 1 (title)

Two YAML blocks turn a mart into a queryable metric. A semantic model first, describing the table. Then a metric, built on top of it.

## Segment 2 (code: semantic model)

The semantic model tells MetricFlow how to read fct_orders — order_id and customer_id as entities, order_date and order_status as dimensions, order_total as a measure to sum. Nothing new here — just naming the roles columns already play.

## Segment 3 (code: the metric)

A simple metric wraps exactly one measure and optionally a filter. Revenue, built on order_total, filtered to exclude cancelled orders — right there in the definition, not a rule three analysts have to remember separately.

## Segment 4 (screenshot: query builder)

Once it's defined, any connected tool queries it by name. Select Metrics: revenue. Group by: order date. No SQL, no re-deriving the cancelled-orders filter — that logic already lives in the metric.

## Segment 5 (outro)

Next lesson: SCD Type 2 in dbt — using a snapshot's history, from Chapter 5, for real point-in-time reporting.
