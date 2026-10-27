# Lesson 3 — Landing Raw Data in the Bronze Layer

**Chapter 1 · Beginner Capstone: First Medallion Pipeline · Lesson 3 of 10**

## What you'll learn

- Real PySpark to read a raw sales extract and land it untouched as a Bronze Delta table
- Why Bronze uses `inferSchema` and `append` mode when Silver and Gold won't
- How the same pattern lands both the in-store POS extract and the online order events

## Reading the in-store POS extract

The in-store POS system drops a daily CSV extract. The first real code in this pipeline reads it and
writes it, unchanged, as a Delta table:

```python
pos_df = (
    spark.read
    .option("header", True)
    .option("inferSchema", True)
    .csv("/mnt/raw/pos_sales_extract/2026-10-25.csv")
)

(pos_df.write
    .format("delta")
    .mode("append")
    .saveAsTable("bronze.daily_sales_raw"))
```

Notice what this code does *not* do: no `dropDuplicates`, no type casting beyond Spark's own schema
inference, no filtering out bad rows. That's deliberate — Bronze's whole job is to preserve exactly
what the source system sent, so if Lesson 4's cleaning logic turns out to be wrong, you can always
rerun it against the same untouched Bronze data instead of having to re-pull the source.

## Reading the online storefront's order events

The online storefront's daily order export lands as JSON, not CSV. Same idea, different reader:

```python
online_df = (
    spark.read
    .option("multiLine", True)
    .json("/mnt/raw/online_orders_extract/2026-10-25.json")
)

(online_df.write
    .format("delta")
    .mode("append")
    .saveAsTable("bronze.daily_sales_raw"))
```

Both extracts append into the same `bronze.daily_sales_raw` table, even though their raw column
names and shapes don't match yet. That mismatch is fine here — reconciling it into one common shape
is explicitly Silver's job, in Lesson 4, not Bronze's.

## Why `append`, not `overwrite`

Bronze uses `mode("append")` because each day's run should add that day's extract on top of every
previous day's, building up a full history of exactly what arrived, when. If you used `overwrite`
here, yesterday's raw record would be gone the moment today's extract landed — and Bronze's entire
purpose is to be the layer you can always go back to.

## Why `inferSchema` is fine here, but won't be later

Letting Spark guess each column's type is acceptable in Bronze because nothing downstream depends on
that guess being perfect yet — it's just a convenience for landing the file. Starting in Lesson 4,
every column Silver and Gold actually use gets an explicit, intentional type cast, because by then a
wrong guess would silently produce wrong numbers in the final daily total.

## Key terms

| Term | Meaning |
|---|---|
| `spark.read` | The PySpark entry point for reading a file into a DataFrame |
| `inferSchema` | Letting Spark guess column types from the data, rather than declaring them explicitly |
| `saveAsTable` | Writing a DataFrame out as a named, queryable table (here, a Delta table) |
| Append mode | Adding new rows to an existing table without removing what's already there |

## Lab

Write the `spark.read` and `.write` lines yourself for a third hypothetical source — a weekly
clearance-sale CSV extract — landing into the same `bronze.daily_sales_raw` table. What option would
you need to add or change if that file used semicolons instead of commas?

## Check yourself

You're ready for Lesson 4 when you can explain, from memory, why Bronze uses `append` instead of
`overwrite`, and why it's correct to skip deduplication and type casting at this layer even though
you know the raw data has duplicates and messy types.
