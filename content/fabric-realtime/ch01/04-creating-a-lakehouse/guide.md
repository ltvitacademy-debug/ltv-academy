# Lesson 4 — Creating a Lakehouse

**Chapter 1 · Microsoft Fabric · Lesson 4 of 70**

## What you'll learn

- Creating a lakehouse: the real steps, in the Fabric portal
- Files vs. Tables — the two areas every lakehouse starts with
- Loading a file into a real Delta table, in the actual UI
- Why this feels like Databricks & Delta Lake's bronze layer, on purpose

## Creating one, in the Fabric portal

1. In your workspace, select **New item**.
2. Search for and select **Lakehouse**.
3. Enter a name (this course uses `nyc_taxi_lakehouse`) and select **Create**.

The lakehouse opens to the **Explorer** view — two empty sections,
**Files** and **Tables**, both already backed by OneLake (Lesson 3)
and ready for content, with no separate storage step required.

## Files vs. Tables

**Files** is unstructured storage — CSV, JSON, Parquet, images,
anything, with no schema required up front. This is Databricks &
Delta Lake Lesson 26's bronze layer instinct, made literal: land
raw data exactly as it arrived, before deciding anything about its
shape. **Tables** holds real, queryable Delta tables — the same
Delta format from that course's entire Chapter 2, with the same
transaction log, the same ACID guarantees, underneath.

## Loading a file into a real Delta table

![The Fabric portal's Lakehouse explorer, showing the right-click menu on a CSV file in the Files section with "Load to Tables" and "New table" options highlighted.](/courses/fabric-realtime/ch01/04-creating-a-lakehouse/lakehouse-load-to-table.png)

*Loading a raw file into a new Delta table, directly in the Lakehouse explorer.*

1. In **Files**, hover over a CSV, select the **...** menu.
2. Select **Load to Tables → New table**.
3. Name the table (`trips`, for this course's NYC Taxi data) and select **Load**.

Fabric reads the source file, infers a schema, and writes it out as
a real Delta table — the exact `inferSchema` cost Foundations
Lesson 40 described, now happening behind a UI click instead of a
`spark.read.csv(..., inferSchema=True)` call. The original CSV in
**Files** is untouched; `trips` in **Tables** is a new, separate
Delta table built from it.

## Why this feels like a bronze layer, on purpose

Files holding raw, as-arrived data, and Tables holding a real Delta
table built from it, is genuinely the same bronze-layer pattern
Databricks & Delta Lake's Chapter 3 established — this course will
build the same medallion shape here, in Fabric's own UI, rather than
in `@dlt.table` decorators.

## Key terms

| Term | Meaning |
|---|---|
| Files | Unstructured storage inside a lakehouse — no schema required |
| Tables | Real, queryable Delta tables inside a lakehouse |
| Load to Tables | Reads a file, infers a schema, writes a new Delta table |

## Check yourself

You're ready for Lesson 5 when you can explain, without looking: why
does loading a CSV into Tables not modify the original file sitting
in Files?
