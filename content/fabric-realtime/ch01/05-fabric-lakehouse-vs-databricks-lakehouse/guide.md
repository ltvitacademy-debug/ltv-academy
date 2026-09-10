# Lesson 5 — Fabric Lakehouse vs. Databricks Lakehouse

**Chapter 1 · Microsoft Fabric · Lesson 5 of 70**

## What you'll learn

- The same word, two real products — why that's not a contradiction
- What's genuinely identical underneath: the Delta format itself
- What's genuinely different: engine choice, catalog model, and compute
- Reading a table built in one platform, from the other

## The same word, two real products

"Lakehouse" is both a generic architecture idea (Databricks & Delta
Lake Lesson 1's original pitch: cheap storage plus real
transactional guarantees) and, in Fabric specifically, the literal
name of an item type you create (Lesson 4). Two different vendors
converged on the same underlying idea and, largely, the same
underlying file format — that's genuinely why the comparison is
worth making carefully, rather than assuming "lakehouse" means one
specific product.

## What's identical underneath: Delta

A table built by Fabric's "Load to Tables" (Lesson 4) and a table
built by `spark.write.format("delta")` (Databricks & Delta Lake
Lesson 15) are both, at the file level, Parquet data files plus a
`_delta_log/` folder — the exact transaction log Databricks & Delta
Lake Lesson 17 opened up directly. Neither platform invented its
own competing table format; both build on the same open Delta Lake
specification.

## What's genuinely different

| | Databricks | Fabric Lakehouse |
|---|---|---|
| Compute you configure | Clusters (VM size, runtime) | None — capacity only |
| Governance model | Unity Catalog (3-level namespace) | Workspace roles + OneLake |
| Primary query engines | Spark, SQL warehouses | Spark notebooks, SQL endpoint, Power BI Direct Lake (Lesson 12) |
| Pipeline orchestration | Lakeflow Jobs | Fabric Data Factory pipelines (Lesson 8) |

Fabric's Lakehouse automatically exposes a **SQL analytics
endpoint** alongside the Spark-facing Tables view — the same Delta
data, queryable via T-SQL with zero extra configuration, a real
convenience Databricks & Delta Lake's material didn't have an exact
equivalent for.

## Reading across platforms

Because both are genuinely Delta underneath, a Databricks cluster
can, with the right storage credentials, read a table Fabric wrote,
and vice versa — this is the entire practical value of an open
table format rather than a proprietary one. A real organization
using both platforms isn't choosing between two incompatible islands
of data; it's choosing which engine touches a shared set of Delta
files at any given moment.

## Key terms

| Term | Meaning |
|---|---|
| Lakehouse (generic) | Cheap storage plus real transactional guarantees — the architecture idea |
| Lakehouse (Fabric item) | A specific Fabric item type, created in Lesson 4 |
| SQL analytics endpoint | Fabric's automatic T-SQL access to a Lakehouse's Delta tables |

## Check yourself

You're ready for Lesson 6 when you can explain, without looking: why
can a Databricks cluster potentially read a table that was written
entirely through Fabric's UI, with no code involved at all?
