# Lesson 38 — Defining Metrics in dbt

**Chapter 8 · Semantic Layer & Advanced Patterns · Lesson 38 of 45**

## What you'll learn

- The real MetricFlow YAML syntax: a `semantic_models` block, then a
  `metrics` block on top of it
- What entities, dimensions, and measures each mean inside a semantic
  model
- How a `simple` metric turns one measure into a named, reusable
  calculation — including a filter, so "revenue" excludes cancelled
  orders by definition, not by convention
- What querying that metric actually looks like from a connected tool

## Step one: the semantic model

A semantic model tells MetricFlow how to read one mart — which
columns are keys (**entities**), which are things you'd group or slice
by (**dimensions**), and which are things you'd aggregate
(**measures**):

```yaml
# models/marts/_fct_orders.yml
semantic_models:
  - name: orders
    model: ref('fct_orders')
    defaults:
      agg_time_dimension: order_date
    entities:
      - name: order_id
        type: primary
      - name: customer_id
        type: foreign
    dimensions:
      - name: order_date
        type: time
        type_params:
          time_granularity: day
      - name: order_status
        type: categorical
    measures:
      - name: order_total
        agg: sum
        expr: order_total
```

None of this is new information — `fct_orders` already has a primary
key, a foreign key, a date column, and a numeric column you'd sum.
This block just tells MetricFlow, explicitly, which of those columns
plays which role.

## Step two: the metric

A **metric** is a named calculation built on top of one or more
measures. The simplest kind, `type: simple`, wraps exactly one measure
and optionally adds a filter:

```yaml
metrics:
  - name: revenue
    label: Revenue
    type: simple
    type_params:
      measure: order_total
    filter: |
      {{ Dimension('order_status') }} != 'cancelled'
```

This is the actual fix for last lesson's "three different revenue
definitions" problem: the filter excluding cancelled orders is now
*part of the metric's definition itself*, reviewed in a pull request
like any other code, instead of a rule three different analysts have
to remember to apply themselves in three different tools.

## Querying the metric

Once `revenue` is defined, any connected tool queries it by name — not
by re-deriving the SQL. That's what the real Query Builder in dbt
Cloud's Semantic Layer actually looks like:

![The real dbt Semantic Layer Query Builder: fields for Select Metrics, Group By, Time Range, Where (Filter), Order By, and Limit.](/courses/dbt/ch08/38-defining-metrics/query-builder.png)
*"Select Metrics: revenue. Group By: order_date." No SQL, no re-deriving the cancelled-orders filter — that logic already lives in the metric.*
Source: [dbt Docs — Connect the dbt Semantic Layer to Google Sheets](https://docs.getdbt.com/docs/cloud-integrations/semantic-layer/gsheets)

The equivalent MetricFlow CLI command for the same query is
`mf query --metrics revenue --group-by metric_time__day` — the Query
Builder above is just a UI in front of that same request.

## Key terms

| Term | Meaning |
|---|---|
| Entity | A key column in a semantic model (primary or foreign) |
| Dimension | A column you'd group or filter by — categorical or time-based |
| Measure | A column you'd aggregate — the raw input a metric is built from |
| `type: simple` metric | A metric wrapping exactly one measure, with an optional filter |

## Lab

1. Write a `semantic_models` block for one of your own marts models,
   naming at least one entity, one dimension, and one measure.
2. Add a `type: simple` metric on top of that measure, with a filter
   excluding at least one category of row (a status, a flag).
3. If you have Semantic Layer access, query that metric through the
   Query Builder (or `mf query`) and confirm the filter is actually
   applied.

## Check yourself

You're ready for Lesson 39 when you can write, from memory, the
minimum shape of a `semantic_models` entry (one entity, one dimension,
one measure) and a `simple` metric built on top of it.
