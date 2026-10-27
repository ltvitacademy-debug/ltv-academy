# Lesson 15 — Fixing and Validating

**Chapter 1 · Data Engineering Capstone — Intermediate Project · Lesson 15 of 16**

## What you'll learn

- Applying the real fix: restoring `transaction_id` as the MERGE's match key
- Backfilling `silver.sales_clean` correctly for the affected date range
- Regenerating both Gold tables and re-running Lesson 9's reconciliation query to prove the fix
- Why `transaction_id` is a durable fix, not just a patch that happens to work today

## Step 1: apply the real fix

Lesson 14 confirmed the exact cause: version 47's `MERGE INTO` matched on `store_id` and
`sale_date` instead of `transaction_id`. The fix isn't a workaround — it's restoring the match
condition to the one Lesson 5 already proved correct:

```sql
MERGE INTO silver.sales_clean AS target
USING bronze_incremental AS source
ON target.transaction_id = source.transaction_id
WHEN MATCHED THEN UPDATE SET *
WHEN NOT MATCHED THEN INSERT *
```

Or in PySpark, using the `DeltaTable` API:

```python
from delta.tables import DeltaTable

silver_table = DeltaTable.forName(spark, "silver.sales_clean")

(silver_table.alias("target")
    .merge(
        bronze_incremental_df.alias("source"),
        "target.transaction_id = source.transaction_id")
    .whenMatchedUpdateAll()
    .whenNotMatchedInsertAll()
    .execute())
```

That's the whole code change: one column swapped back on the `ON` clause. The smallest possible
fix for the largest possible damage — which is exactly what makes a precise root cause worth
finding before writing a single line.

## Step 2: backfill the affected range

Fixing the `ON` clause only protects *future* runs. Every MERGE that ran between March 1st and
today used the wrong match key, so `silver.sales_clean` is still carrying corrupted data for that
whole window. The affected range needs to be reprocessed with the corrected MERGE, not just the
next incremental batch:

```python
from pyspark.sql import functions as F

# Re-pull the Bronze rows for the affected window, not just "today's" batch
bronze_affected = (
    spark.table("bronze.sales_raw")
    .filter(F.col("sale_date").between("2024-03-01", "2024-03-02"))
)

(silver_table.alias("target")
    .merge(
        bronze_affected.alias("source"),
        "target.transaction_id = source.transaction_id")
    .whenMatchedUpdateAll()
    .whenNotMatchedInsertAll()
    .execute())
```

Running the corrected MERGE against the same Bronze rows that version 47 originally mishandled
re-upserts every one of them on the real unique key this time, overwriting the bad matches from
before with the correct, one-row-per-transaction result.

## Step 3: regenerate both Gold tables

`silver.sales_clean` is now correct for the affected range, but both Gold tables were already
built from the corrupted version. They need to be rebuilt from the corrected Silver data —
re-running the same aggregation logic from Lessons 7 and 8, scoped to the affected store/dates:

```python
daily_summary_rebuilt = (
    spark.table("silver.sales_clean")
    .filter(F.col("sale_date").between("2024-03-01", "2024-03-02"))
    .groupBy("store_id", "sale_date")
    .agg(
        F.sum("total_amount").alias("total_sales"),
        F.countDistinct("transaction_id").alias("total_transactions"))
)

category_rebuilt = (
    spark.table("silver.sales_clean")
    .filter(F.col("sale_date").between("2024-03-01", "2024-03-02"))
    .groupBy("store_id", "category", "sale_date")
    .agg(
        F.sum("total_amount").alias("total_sales"),
        F.sum("quantity").alias("total_quantity"))
)
```

Each of these gets merged back into its Gold table on its own real key (`store_id, sale_date` for
the daily summary; `store_id, category, sale_date` for the breakdown) the same way Lessons 7 and 8
already established.

## Step 4: prove it with Lesson 9's query, again

This is the step that actually closes the ticket — not "the code looks right," a real re-run of
the exact tool that caught the bug:

```sql
WITH category_rolled_up AS (
  SELECT store_id, sale_date, SUM(total_sales) AS rolled_up_sales
  FROM gold.category_breakdown
  WHERE store_id = 48
  GROUP BY store_id, sale_date
)
SELECT d.sale_date, d.total_sales, c.rolled_up_sales,
       ABS(d.total_sales - c.rolled_up_sales) AS diff
FROM gold.daily_sales_summary d
JOIN category_rolled_up c USING (store_id, sale_date)
WHERE d.store_id = 48
  AND d.sale_date BETWEEN '2024-02-15' AND '2024-03-10'
ORDER BY d.sale_date;
```

Run it now and every row — including March 1st and 2nd, the exact dates that were broken — comes
back with `diff = 0.00`. Zero discrepancies, for real, confirmed by the same query that flagged the
problem in Lesson 13. That's the difference between "I think it's fixed" and "I proved it's fixed."

## Why this fix is durable

The fix holds up for a reason that has nothing to do with luck: `transaction_id` is
uniqueness-guaranteed by the source system that generates every sale. No combination of
`store_id`, `sale_date`, `product_id`, or any other business column carries that same guarantee —
a store can log any number of transactions on any day, in any category, and nothing about the
business rules out two of them looking alike on every other column. A match key is only as safe as
the uniqueness the source system actually promises, and `transaction_id` is the one column here
that promise was ever made for.

## Key terms

| Term | Meaning |
|---|---|
| Backfill | Reprocessing already-ingested data with a corrected pipeline, instead of only fixing future runs |
| Durable fix | A fix that holds because it relies on a guarantee the source system actually makes, not a coincidence |
| Re-validate | Re-running the exact diagnostic query that caught a bug, to prove the fix with the same tool, not a new one |

## Lab

On your own pipeline (or this scenario's tables), apply the corrected `MERGE INTO`, backfill the
affected date range, rebuild both Gold tables for that range, and re-run Lesson 9's reconciliation
query across the full February 15th–March 10th window. Confirm every row now returns `diff = 0.00`.

## Check yourself

Without looking back: what two things had to be backfilled besides the MERGE's `ON` clause itself,
and what specific property of `transaction_id` — not just "it's a different column" — makes it a
durable match key when `store_id + sale_date` isn't?
