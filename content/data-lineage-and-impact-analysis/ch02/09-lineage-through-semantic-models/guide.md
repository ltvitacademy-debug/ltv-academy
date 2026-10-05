# Lesson 9 — Lineage Through Semantic Models

**Chapter 2 · Tracing Data · Lesson 9 of 25**

## What you'll learn

- What a semantic model is, and where it sits between the warehouse and the report
- Import vs. DirectQuery, and what each means for lineage freshness
- Why measures create a second, separate lineage graph *inside* the model
- How this sets up Lesson 10's look at a real semantic-model lineage UI

## The layer between the warehouse and the report

Lesson 8 ended at the gold layer — fact and dimension tables in a warehouse. A **semantic model** (a Power BI dataset, a Tableau published data source, an Analysis Services / AAS model, a dbt semantic layer) sits on top of that, and adds its own lineage hop: it pulls from warehouse tables, renames and relates them into a model a report can actually query, and defines **measures** — calculations like "Total Sales" or "Year-over-Year Growth" that don't exist as columns anywhere upstream.

This is a genuinely new kind of lineage edge, not just another hop in the same chain you've been tracing since Lesson 6. A warehouse column has one clear upstream source. A measure can be built from a column, from another measure, or from several measures combined — lineage inside the model can branch and recombine in ways table-to-table lineage usually doesn't.

## Import vs. DirectQuery: a freshness fork

How a semantic model connects to its warehouse tables changes what "current" even means for everything built on top of it:

- **Import** — the model copies data into its own storage at refresh time. Fast to query, but frozen as of the last refresh — the same lag you saw with materialized tables in Lesson 8, just one layer further downstream.
- **DirectQuery** — the model queries the warehouse live, on every report interaction. Always current, but lineage-wise it means the warehouse's own freshness (and any view-vs-materialized distinction there) propagates straight through to the report, unfiltered.

Knowing which mode a model uses tells you, at a glance, whether "the number looks wrong" could be a stale import or a live upstream problem.

## Measure-to-measure lineage

```
fact_sales.amount            (warehouse column)
  -> [Total Sales]           (base measure: SUM of amount)
    -> [Total Sales YoY]     (measure built on another measure)
      -> visual              (what the report actually shows)
```

This chain is why "a broken upstream column breaks a report" undersells the real blast radius. A single column feeding one base measure can cascade into every measure built on top of it, and every visual built on any of those — lineage *inside* the semantic model, distinct from lineage *into* it.

## Key terms

| Term | Meaning |
|---|---|
| Semantic model | The modeling layer between the warehouse and the report — datasets, measures, relationships |
| Measure | A calculation (DAX, or equivalent) defined inside the model, not a column copied from upstream |
| Import mode | The model copies data at refresh time — fast, but frozen as of last refresh |
| DirectQuery | The model queries the warehouse live on every interaction — current, but inherits warehouse freshness |

## Lab

Pick a measure you've seen in any report (a "Total Revenue," a "Conversion Rate" — real or hypothetical). Sketch its lineage as a chain like the one above: which warehouse column(s) feed it, whether it's built directly on a column or on another measure, and whether the model it lives in is Import or DirectQuery. That sketch is exactly the shape Lesson 10's real screenshots will show you inside an actual product.

## Check yourself

Can you explain why a measure built on top of another measure represents a different *kind* of lineage edge than a column flowing from one table into the next — and why that distinction matters when something downstream looks wrong?
