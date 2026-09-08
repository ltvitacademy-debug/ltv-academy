# Lesson 43 — Dataflow Gen2 vs. Mapping Data Flows

**Chapter 9 · Fabric Data Factory · Lesson 2 of 6**

## What you'll learn

- What Dataflow Gen2 actually is, and what engine powers it
- How it genuinely differs from the mapping data flows in Chapter 5
- Multiple output destinations, and why that matters
- When you'd still reach for something else

## A familiar idea, a different engine

Chapter 5 covered mapping data flows — visual, Spark-based
transformations inside classic ADF. Fabric's equivalent is
**Dataflow Gen2**, and the single most important thing to understand
is that it's genuinely **not** the same engine wearing a different
name. Dataflow Gen2 is built on **Power Query** — the same engine
behind Excel's Get & Transform, Power BI dataflows, and Power
Platform — not Spark.

## Seeing the editor

![Power Query editor in Dataflow Gen2, showing a Customers query with applied steps, a data preview grid with column quality bars, and a Data destination panel set to Lakehouse.](/courses/data-factory/ch09/43-dataflow-gen2-vs-mapping-data-flows/authoring-experience.png)
*If you've ever used Power Query in Excel or Power BI, this is immediately familiar — Applied Steps, column quality indicators, and the same ribbon-driven transformation experience.*

That familiarity is deliberate. If your organization already has
Power BI report authors comfortable with Power Query, they can be
productive in Dataflow Gen2 almost immediately — a genuinely
different audience than the Spark-literate engineers mapping data
flows tend to require.

## Multiple real destinations

Where a classic Power BI dataflow (Gen1) only ever stored data in its
own internal storage, Dataflow Gen2 can write to a real, wide set of
external destinations:

![List of Dataflow Gen2 supported data destinations: Azure SQL databases, Azure Data Explorer, ADLS Gen2, Fabric Lakehouse Tables and Files, Fabric Warehouse, Fabric KQL database, Fabric SQL database, SharePoint, Snowflake, and PostgreSQL.](/courses/data-factory/ch09/43-dataflow-gen2-vs-mapping-data-flows/output-destinations-overview.png)
*A genuinely wide destination list — including two Fabric-native ones, Lakehouse Tables and Warehouse, that didn't exist as options in classic mapping data flows at all.*

This is what makes Dataflow Gen2 genuinely useful beyond just being
"Power Query in the cloud": load into a Lakehouse, then hand off to a
Spark notebook for further analysis, all within the same workspace,
sharing the same OneLake storage.

## What's actually different from mapping data flows

| | Mapping Data Flows (ADF) | Dataflow Gen2 (Fabric) |
|---|---|---|
| Engine | Apache Spark | Power Query (M) |
| Authoring feel | Visual transformation graph | Power Query ribbon and Applied Steps |
| Debug mode | Explicit debug cluster startup | Always interactive — no separate debug mode |
| Destinations | Sink transformation to one connector type per run | Multiple destination types, including two Fabric-native options |
| Best audience | Spark-literate data engineers | Power Query-literate analysts and engineers alike |

Neither engine is strictly "better" — they're built for genuinely
different transformation styles. A wrangling, exploratory,
column-by-column cleanup task fits Dataflow Gen2's Power Query model
naturally. A heavy, large-scale join-and-aggregate transformation
across huge datasets still leans on Spark's real strengths, which is
exactly what mapping data flows (and Fabric's own Spark notebooks)
are built for.

## Key terms

| Term | Meaning |
|---|---|
| Dataflow Gen2 | Fabric's Power Query-based, low-code transformation tool |
| Power Query (M) | The transformation engine and language behind Dataflow Gen2, Excel, and Power BI |
| Data destination | Where a Dataflow Gen2 writes its output — Lakehouse, Warehouse, SQL database, and more |
| DataflowsStagingLakehouse | A system-generated staging item Dataflow Gen2 creates automatically — safe to ignore |

## Lab

1. If you have Fabric access, create a new Dataflow Gen2 and connect
   to any sample data source.
2. Set its data destination to a Lakehouse table.
3. Write one sentence comparing Dataflow Gen2's engine to the engine
   behind the mapping data flows from Chapter 5.

## Check yourself

You're ready for Lesson 44 when you can explain, in one sentence,
why Dataflow Gen2's Power Query foundation makes it accessible to a
different audience than Spark-based mapping data flows.
