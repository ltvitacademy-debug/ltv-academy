# Lesson 12 — What Is Lakeflow?

**Chapter 3 · Lakeflow & Declarative Pipelines · Lesson 12 of 34**

## What you'll learn

- Databricks & Delta Lake Lessons 48-57 already introduced Lakeflow as the unified name for ingestion + pipelines + orchestration, and the Delta Live Tables (DLT) rename — this is not a re-teach
- What's changed again since then: Lakeflow Declarative Pipelines now runs on the open-source Apache Spark Declarative Pipelines engine, and the Python API itself was renamed
- The real comparison this chapter draws: Lakeflow's declarative authoring model vs. the manual bronze/silver/gold pipeline this track already built by hand
- What Lessons 13-16 cover, one at a time

## The naming, already covered — briefly

Databricks & Delta Lake Lesson 48 already walked through this: **Lakeflow**
is Databricks' current umbrella name for ingestion (Lakeflow Connect),
declarative pipelines (Lakeflow Declarative Pipelines), and orchestration
(Lakeflow Jobs) as one coherent product. That same lesson flagged that
"Lakeflow Declarative Pipelines" was previously called **Delta Live Tables
(DLT)**, and Lesson 51 built a full pipeline with the `@dlt.table` decorator.
If any of that is unfamiliar, go back to Lesson 48 before continuing — this
chapter assumes it.

## What's changed since Lesson 48

Naming in this part of Databricks moves fast, and it has moved again since
this course's earlier chapter. As of the current Azure Databricks
documentation:

```
Delta Live Tables (DLT)
  -> Lakeflow Declarative Pipelines   (the Databricks product name)
  -> built on Apache Spark Declarative Pipelines (SDP), open source since Spark 4.1
```

The `dlt` Python module Lesson 51 used still works, but Databricks now
recommends `pyspark.pipelines`, imported as `dp`:

```python
import dlt                            # still works — the legacy import
from pyspark import pipelines as dp   # current, recommended import
```

`@dlt.table` becomes `@dp.table` (streaming tables) or `@dp.materialized_view`
(materialized views, batch semantics) — `@dlt.table` used to cover both,
decided by whether the function did a streaming or batch read. `@dlt.view`
becomes `@dp.temporary_view`. Same underlying engine; current names.

## The comparison that actually matters here

Lesson 56 already compared Lakeflow to Azure Data Factory. This chapter draws
a different, more useful comparison: Lakeflow's declarative pipelines against
the **manual** bronze-to-silver-to-gold pipeline this same track built by
hand, in Databricks & Delta Lake Chapter 3 (Lessons 25-37) — before Lakeflow
was even introduced. That pipeline worked, and reached the same destination.
What's different is *how* you got there:

| | Manual medallion pipeline (Ch3, Lessons 25-37) | Lakeflow Declarative Pipelines |
|---|---|---|
| You write | Each transformation step, in order | Each target table's definition, as a function or query |
| Dependency order | Wired by hand (Lesson 30's task chain) | Inferred from which table reads which other table |
| New table added later | You update the task chain yourself | Framework re-slots it into the graph automatically |

## What Lessons 13-16 cover

Lesson 13 shows the real SQL and Python syntax for declaring a streaming
table and a materialized view. Lesson 14 gives the honest trade-off between
this declarative model and a traditional notebook pipeline. Lesson 15 covers
Expectations — Lesson 52 already introduced these; this chapter adds the SQL
side. Lesson 16 covers deploying a pipeline definition with Databricks Asset
Bundles, which the earlier course never touched.

## Key terms

| Term | Meaning |
|---|---|
| Lakeflow Declarative Pipelines | The Databricks product name for declarative pipelines — what Lesson 48 introduced, previously "Delta Live Tables" |
| Apache Spark Declarative Pipelines (SDP) | The open-source engine (Spark 4.1+) that Lakeflow Declarative Pipelines runs on and extends |
| `pyspark.pipelines` (`dp`) | The current Python module for pipeline code; replaces the legacy `dlt` module Lesson 51 used |

## Check yourself

You're ready for Lesson 13 when you can explain, without looking: what's the
real difference between how the manual medallion pipeline (Lessons 25-37)
determined its execution order, and how a Lakeflow Declarative Pipeline
determines its?
