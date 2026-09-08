# Lesson 45 — OneLake as a Destination

**Chapter 9 · Fabric Data Factory · Lesson 4 of 6**

## What you'll learn

- What OneLake actually is, in concrete terms
- Why "one copy of data" is a genuinely real claim, not marketing
- How shortcuts let you reference data without copying it
- Delta Parquet, and why the format itself matters

## Not just another storage account

OneLake is included with every Fabric tenant, and Microsoft's own
framing is deliberate: think **"OneDrive for data."** There's exactly
one OneLake per tenant — you can't create a second one, and there's
no infrastructure to provision. Every workspace, every Lakehouse,
every Warehouse in your tenant stores its data inside this single,
shared lake.

## One copy, many engines

Here's the claim that genuinely changes how you design pipelines
once you internalize it:

![Diagram showing Data Factory, Data Engineering, Data Science, Data Warehouse, Real-Time Intelligence, and Power BI all connecting through Spark, T-SQL, KQL, and Analysis Services compute to the same OneLake, storing data in Delta-Parquet format.](/courses/data-factory/ch09/45-onelake-as-a-destination/use-same-copy-of-data.png)
*Every Fabric workload — Data Factory, Spark notebooks, T-SQL queries, Power BI reports — reads and writes the same physical data in OneLake. No exports, no duplicate copies, no separate connectors between them.*

Concretely: a Dataflow Gen2 loads data into a Lakehouse table. A data
scientist attaches a Spark notebook directly to that same table — no
connector, no export, because it's already sitting in OneLake as
**Delta Parquet**, an open format Spark reads natively. A SQL
engineer queries the exact same table with T-SQL. A Power BI report
built with Direct Lake mode reads it too, without a separate import.
All four are reading the *same bytes*, not four copies.

## Shortcuts: referencing without copying

The other half of "one copy of data" is the **shortcut** — a
reference to data stored somewhere else, made to look and behave as
if it were stored locally in OneLake:

![Diagram showing shortcuts connecting data across different workspaces and OneLake items, referencing external and internal locations without duplicating the underlying data.](/courses/data-factory/ch09/45-onelake-as-a-destination/fabric-shortcuts-structure-onelake.png)
*A shortcut can point at another workspace, another OneLake item, or an entirely external source — Azure Data Lake Storage, Amazon S3, on-premises data, and more.*

Shortcuts matter directly to how you design Fabric pipelines: instead
of building a Copy activity purely to duplicate data from one team's
workspace into your own, you can create a shortcut instead. The
source updates, and your shortcut reflects it immediately — no
scheduled refresh pipeline required at all for that specific case.

## Why the format itself matters

OneLake stores tables in **Delta Parquet** (with growing Apache
Iceberg support) — genuinely open, standard formats, not something
proprietary and locked to one engine. That's precisely what makes
"one copy, many engines" technically possible in the first place: any
tool that speaks Delta Parquet can read OneLake data directly,
without Microsoft needing to build a custom connector for every
possible consumer.

## What this means for a Dataflow Gen2 or pipeline you build

When a Dataflow Gen2's data destination (Lesson 43) is set to
**Lakehouse Tables**, you're not just picking a storage location —
you're writing directly into OneLake, instantly available to every
other Fabric workload in that workspace with zero additional data
movement.

## Key terms

| Term | Meaning |
|---|---|
| OneLake | The single, unified data lake included with every Fabric tenant |
| Shortcut | A reference to data stored elsewhere, made to behave as if stored locally |
| Delta Parquet | The open table format OneLake stores data in, readable by any compatible engine |
| Direct Lake mode | A Power BI data access mode reading OneLake data directly, without a separate import |

## Lab

1. If you have Fabric access, create a shortcut in a Lakehouse
   pointing at another item in the same workspace.
2. Load data into a Lakehouse table using a Dataflow Gen2, then note
   which other Fabric experiences could read that same table with no
   additional data movement.
3. Write one sentence explaining why Delta Parquet, specifically
   being an open format, matters to the "one copy of data" claim.

## Check yourself

You're ready for Lesson 46 when you can explain, in one sentence, the
real difference between copying data with a pipeline and referencing
it with a shortcut.
