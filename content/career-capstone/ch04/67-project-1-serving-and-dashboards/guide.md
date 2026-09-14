# Lesson 67 — Project 1: Serving and Dashboards

**Chapter 4 · Added Projects — Capstones · Lesson 67 of 81**

## What you'll learn

- Choosing between a Fabric Lakehouse SQL endpoint and a Fabric Data Warehouse
- Connecting `gold.FactSales` to a dashboard via Direct Lake mode
- Turning Lesson 65's freshness numbers into an actual refresh-cadence design
- Why the serving layer is a separate decision from the transformation layer

## Choosing the serving engine

Lesson 15's serving-layer design and Fabric & Real-Time Analytics Lesson
11's lakehouse-vs-warehouse comparison both apply here. `gold.FactSales`
and its dimensions are already Delta tables sitting in a lakehouse — the
question is whether the dashboard queries them there directly, or through
a separate Fabric Data Warehouse.

```
Lakehouse SQL endpoint:  query Delta tables directly, no data movement
Fabric Data Warehouse:   T-SQL engine, separate compute, tables copied in
```

For this project, the dashboard's queries are straightforward aggregations
(sum of `amount` grouped by region and category) against tables that are
already well-modeled. That's exactly the case Lesson 11 says favors the
lakehouse SQL endpoint over standing up a separate warehouse — no benefit
to copying `FactSales` into a second engine just to run a `GROUP BY`.

## Direct Lake mode

Fabric Lesson 12's Direct Lake mode is what makes this work without an
import step: a Power BI-style semantic model reads `gold.FactSales`
directly out of the Delta table's Parquet files, skipping both a scheduled
import and a live DirectQuery round-trip per click.

```
Delta table (gold.FactSales)
   -> Direct Lake semantic model (Fabric Lesson 12)
   -> dashboard visuals, sum(amount) by region / category
```

Fabric Lesson 13's semantic model layer is where the star schema actually
gets exposed to the dashboard tool — `FactSales` marked as the fact table,
`DimStore`/`DimProduct`/`DimDate` marked as dimensions, relationships
matching the foreign keys from Lesson 66.

## The freshness SLA, made real

Lesson 65 set the target: online sales visible within minutes, in-store
sales by the next morning. Direct Lake mode reads the Delta table's
current state, so the dashboard is only as fresh as the gold table
underneath it — which means the freshness SLA is actually enforced back in
the silver-to-gold pipeline's schedule (Databricks Lesson 30), not in the
dashboard layer itself.

```
Online path:  Eventstream -> bronze -> silver -> gold
              (near-continuous, minutes-level latency)
Batch path:   nightly export -> bronze -> silver -> gold
              (once nightly, visible next morning)
```

This is worth stating plainly: **the dashboard doesn't create freshness,
it inherits it.** A serving layer can be instant and still show stale
data if the layer feeding it runs on a slow schedule.

## Why this is a separate decision from transformation

Lesson 66 decided what `FactSales` looks like. This lesson decides how
something reads it. Keeping those decisions separate is deliberate — Lesson
15 makes the same point: a well-modeled gold table can be served through
more than one engine depending on the query pattern, and choosing wrong
here doesn't require re-doing Lesson 66's modeling work.

## Key terms

| Term | Meaning |
|---|---|
| Lakehouse SQL endpoint | Queries Delta tables directly, no separate warehouse or data copy |
| Direct Lake mode | Reads a Delta table's Parquet files directly into a semantic model |
| Inherited freshness | The dashboard is only as fresh as the gold-layer pipeline feeding it |

## Check yourself

You're ready for Lesson 68 when you can explain, without looking: why does
a fast serving layer not guarantee a fresh dashboard, and where does this
project's real freshness guarantee actually come from?
