# Lesson 2 — Planning the Medallion Pipeline

**Chapter 1 · Beginner Capstone: First Medallion Pipeline · Lesson 2 of 10**

## What you'll learn

- Why you plan the Bronze, Silver, and Gold layers in plain English before writing any PySpark
- Exactly what each layer will hold for *this* pipeline, not just the general definition
- Why every layer here is a Delta table, not a folder of files, and what that buys you later

## Recap: Bronze, Silver, Gold

The Foundations course already covered this mapping: Bronze holds untouched source data, Silver
holds validated and deduplicated data, Gold holds business-ready, aggregated data — and the one real
difference versus plain Raw/Cleansed/Curated folders is that every medallion layer is typically a
**Delta table**, which means it has a transaction log and can be read, updated, and audited like a
real table, not just a pile of files. That's true whether you're running this on Azure Databricks or
a Microsoft Fabric Lakehouse notebook — both speak the same PySpark and the same Delta format.

This lesson turns that general definition into a specific plan for Lesson 1's requirement: one Delta
table, refreshed daily, with one row per calendar day holding total sales across both channels.

## The plan, layer by layer

**Bronze — `bronze.daily_sales_raw`**
Holds the raw daily extract exactly as it arrives: one row per original source record, whatever
columns the extract has, no type casting, no deduplication, no filtering. If the in-store POS export
and the online storefront produce slightly different column names or formats, Bronze keeps that
messiness — that's the point. You can always reprocess Bronze into a better Silver later if you
realize you cleaned something wrong; you can never recover detail you threw away on the way in.

**Silver — `silver.sales_transactions`**
Holds one row per sale line item, cleaned: duplicates removed, `sale_date` cast to a real date type,
`sales_amount` cast to a real decimal type, and any row missing a required field (store, date, or
amount) dropped. Both channels get unified into the same shape here — this is the first place in the
pipeline where "in-store" and "online" stop being different things and become just "sales."

**Gold — `gold.daily_sales_summary`**
Holds exactly one row per calendar day: the date, the total sales amount for that day, and the order
count. This is the table Lesson 1's requirement actually asked for — everything upstream of this
exists to make this one aggregation correct.

```text
bronze.daily_sales_raw        -- untouched, one row per source record
        |
        v  dropDuplicates, cast types, drop rows missing required fields
silver.sales_transactions     -- one row per sale line item, cleaned
        |
        v  groupBy date, sum(amount), count(distinct order)
gold.daily_sales_summary      -- one row per calendar day
```

## Why plan this before writing code

It's tempting to open a notebook and start typing `spark.read` immediately. The cost of skipping this
step shows up later: if you don't decide up front which columns Silver requires, you'll find yourself
rewriting the Silver transformation halfway through Lesson 4 because you didn't know what "required"
meant yet. Three short layer definitions, written in plain English, save you from that rewrite.

## Why Delta tables, not just files

Writing each layer as a Delta table (`.format("delta")`) rather than plain Parquet or CSV files means
every layer gets a transaction log for free: you can time-travel to a previous version of a table,
you get schema enforcement so a bad column doesn't silently corrupt Silver, and — a benefit this
Beginner project doesn't use yet, but names out loud — Delta tables support `MERGE`, which is what
lets a later project update Silver and Gold incrementally instead of rebuilding them from scratch
every run.

## Key terms

| Term | Meaning |
|---|---|
| Medallion architecture | The Bronze/Silver/Gold layered pattern this pipeline follows |
| Delta table | A table format with a transaction log, enabling schema enforcement and incremental updates |
| Schema unification | Making two different source shapes (in-store, online) look like one consistent shape |
| Required column | A field a row cannot be missing and still count as valid in Silver |

## Lab

Before Lesson 3, write out the exact column list you expect in each of the three tables —
`bronze.daily_sales_raw`, `silver.sales_transactions`, `gold.daily_sales_summary` — on paper. You'll
compare this against the real PySpark code starting next lesson.

## Check yourself

You're ready for Lesson 3 when you can state, from memory, what each of the three tables in this
pipeline holds, and name the one capability Delta tables give you that plain files in folders don't.
