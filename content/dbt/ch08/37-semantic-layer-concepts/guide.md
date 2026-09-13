# Lesson 37 — Semantic Layer Concepts

**Chapter 8 · Semantic Layer & Advanced Patterns · Lesson 37 of 45**

## What you'll learn

- The exact problem a semantic layer solves: "revenue" meaning five
  different things across five different BI tools
- Why that problem exists even when every tool queries the same
  well-modeled marts layer from Chapter 3
- What MetricFlow is, and how it fits inside dbt
- That the dbt Semantic Layer is a real, connectable dbt Cloud
  feature — not just a conceptual diagram

## The problem: one number, five definitions

Imagine `fct_orders` is a clean, tested, documented marts model —
everything Chapters 2 through 4 taught you to build. Now three
different people build "revenue" on top of it: one in Tableau sums
`order_total` including cancelled orders, one in Power BI excludes
returns, one in a spreadsheet uses `order_total - discount`. All three
call it "Revenue." All three are querying the same underlying table.
None of them agree, and there's no single place to go check which
definition is "right" — the logic lives scattered across BI tools
instead of in one place.

## The fix: define the metric once, upstream of every tool

A **semantic layer** moves that definition into dbt itself, as code —
version-controlled, tested, and reviewed exactly like a model. Once
`revenue` is defined once (next lesson covers the actual YAML), every
BI tool that connects to it gets the identical calculation, because
they're all asking the same semantic layer the same question instead
of each writing their own SQL.

## MetricFlow: the engine underneath

**MetricFlow** is the query engine that makes this work. Instead of a
metric being a hardcoded SQL aggregation, MetricFlow compiles a
metric definition, at query time, into the correct SQL for whatever's
actually being asked — "revenue, by month" compiles differently than
"revenue, by region, this quarter" — from the *same* metric
definition. You already have indirect proof this exists in your own
project: Lesson 1's file-explorer screenshot showed a real file called
`metricflow_time_spine.sql` sitting in that dbt project, because
MetricFlow needs a spine of dates to calculate time-based metrics
against.

## This is a real, connectable feature — not a diagram

The Semantic Layer isn't a conceptual-only idea layered on top of
marketing material — it's a real dbt Cloud connection you configure
once per project:

![dbt Cloud's real "Semantic Layer" connection panel: an Environment ID, a Host (semantic-layer.cloud.getdbt.com), a JDBC URL, and a GraphQL URL — the actual endpoint details a BI tool plugs into.](/courses/dbt/ch08/37-semantic-layer-concepts/sl-configure-example.png)
*Any tool that can call this GraphQL or JDBC endpoint — Tableau, Power BI, Hex, even a spreadsheet plugin — gets the same metric definition every other tool gets.*
Source: [dbt Docs — Set up the dbt Semantic Layer](https://docs.getdbt.com/docs/use-dbt-semantic-layer/setup-sl)

## Key terms

| Term | Meaning |
|---|---|
| Semantic layer | A single, version-controlled place metrics are defined, so every consuming tool agrees |
| MetricFlow | dbt's query engine that compiles a metric definition into the correct SQL for a given query |
| Semantic model | The YAML that tells MetricFlow how a mart's columns map to dimensions and measures (next lesson) |
| Metric | A named, reusable calculation (e.g. `revenue`) built on top of one or more semantic models |

## Lab

1. Pick one metric your own project (or a hypothetical one) would need
   — "revenue," "active users," "orders per customer" — and write down
   every place that metric's *logic* currently lives (a BI tool
   calculation, a spreadsheet formula, someone's memory).
2. For that same metric, write one sentence describing exactly what
   would go into its definition (which table, which column, any
   filters like "exclude cancelled").
3. If you have dbt Cloud access, find the Semantic Layer connection
   panel in your project's settings and note whether it's already
   configured.

## Check yourself

You're ready for Lesson 38 when you can explain, without using the
word "diagram," why a semantic layer fixes the "five tools, five
definitions" problem — and what MetricFlow's actual job is in making
that work.
