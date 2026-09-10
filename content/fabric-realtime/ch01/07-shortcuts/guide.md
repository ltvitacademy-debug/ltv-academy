# Lesson 7 — Shortcuts — Referencing Data Without Copying It

**Chapter 1 · Microsoft Fabric · Lesson 7 of 70**

## What you'll learn

- Creating a real shortcut, step by step
- Internal shortcuts (Fabric-to-Fabric) vs. external shortcuts (ADLS Gen2, S3)
- Why a shortcut behaves like a real table to every query, with nothing duplicated
- The direct parallel to Databricks & Delta Lake's external tables

## Creating a shortcut

1. In a second lakehouse's **Tables** area, select **New shortcut**.
2. Under **Internal sources**, choose **Microsoft OneLake**.
3. Browse to the first lakehouse (Lesson 4), select its `trips`
   table, and select **Create**.
4. `trips` now appears in the second lakehouse too — with a small
   link icon marking it as a shortcut, not a copy.

This is Lesson 3's preview, made concrete: the second lakehouse's
`trips` and the first lakehouse's `trips` are the exact same
underlying Delta files in OneLake, read through two different
lakehouse "front doors."

## Internal vs. external shortcuts

```
Internal shortcut: -> another OneLake location (another lakehouse/workspace)
External shortcut: -> ADLS Gen2, Amazon S3, Google Cloud Storage
```

An **external shortcut** does the same thing for data that lives
**outside** Fabric entirely — an existing ADLS Gen2 container, say,
from Foundations' entire Chapter 1. Fabric reads it in place,
through OneLake, with nothing physically moved into Fabric's own
storage at all.

## A shortcut behaves like a real table

```python
%%pyspark
trips = spark.read.table("trips")   # works identically, shortcut or not
trips.filter(trips.fare_amount > 0).count()
```

Every PySpark method works on a shortcut-backed table exactly the
way it works on the original — Foundations' entire Chapter 4 and
this table's own transaction log both apply unchanged. The query
engine doesn't treat a shortcut specially at read time; it's simply
resolving to wherever the real bytes happen to live.

## The direct parallel to external tables

Recall Databricks & Delta Lake Lesson 41: an **external table**
pointed at a location you specified, with Unity Catalog managing
only the metadata, not the file lifecycle. A Fabric shortcut is
doing almost exactly that same job — a reference to data whose
actual bytes and lifecycle live somewhere else — just scoped to
OneLake's specific cross-workspace and cross-cloud reach, instead of
Unity Catalog's metastore-wide one.

## Key terms

| Term | Meaning |
|---|---|
| Internal shortcut | References another OneLake location — another lakehouse or workspace |
| External shortcut | References data outside Fabric entirely — ADLS Gen2, S3, GCS |
| Behaves like a real table | Every query engine reads through it identically, no special handling |

## Check yourself

You're ready for Lesson 8 when you can explain, without looking: how
does a Fabric shortcut compare to Databricks & Delta Lake's external
table concept?
