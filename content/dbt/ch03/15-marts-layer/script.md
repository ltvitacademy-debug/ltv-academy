# Script — The Marts Layer

## Segment 1 (title)

Staging through marts moves data from source-conformed, shaped by whatever system produced it, to business-conformed, shaped by what the business actually means by an order or a customer. Marts are where that arc ends.

## Segment 2 (steps: wide and denormalized on purpose)

A mart is entity-grained — one row per order, per customer — and deliberately wide. Order costs, item counts, boolean flags like is_food_order all get packed in. Storage is cheap, compute is expensive, and a mart absorbs that cost once so nobody downstream re-derives it.

## Segment 3 (code: real orders.sql)

This is dbt Labs' own example. It references stg_orders and the order_items mart, joins in a summary, and computes is_food_order right there. Marts can build on other marts — but joining four or five concepts is the signal to push work into an intermediate model instead.

## Segment 4 (steps: naming anti-patterns)

Two anti-patterns to avoid: naming marts by time rollup like orders_per_day, that's a metric, not an entity; and creating departmental duplicates, finance_orders and marketing_orders describing the same thing twice. One orders mart, used by everyone.

## Segment 5 (outro)

Next lesson: Naming Conventions That Scale — the stg_, int_, and fct_/dim_ prefixes that make every model's job legible from its name alone.
