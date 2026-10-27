# Lesson 4 — Writing the Bronze-to-Silver Transformation

**Chapter 1 · Beginner Capstone: First Medallion Pipeline · Lesson 4 of 10**

## What you'll learn

- Real PySpark to deduplicate, type-cast, and drop invalid rows on the way from Bronze to Silver
- Why `dropDuplicates` needs the right key columns, not just "all columns"
- Why this Beginner pipeline overwrites Silver each run, and what that trades away

## The transformation

Lesson 3 landed raw rows, untouched, in `bronze.daily_sales_raw`. This lesson turns that into the
clean, typed, deduplicated `silver.sales_transactions` table Lesson 2's plan called for:

```python
from pyspark.sql.functions import col, to_date

bronze_df = spark.table("bronze.daily_sales_raw")

silver_df = (
    bronze_df
    .dropDuplicates(["order_id", "line_number"])
    .withColumn("sale_date", to_date(col("sale_date")))
    .withColumn("sales_amount", col("sales_amount").cast("decimal(12,2)"))
    .filter(
        col("store_id").isNotNull()
        & col("sale_date").isNotNull()
        & col("sales_amount").isNotNull()
    )
)

(silver_df.write
    .format("delta")
    .mode("overwrite")
    .saveAsTable("silver.sales_transactions"))
```

## Why `dropDuplicates(["order_id", "line_number"])`, not just `dropDuplicates()`

Calling `dropDuplicates()` with no arguments only removes rows that are *completely* identical across
every column — which almost never happens with real data, even when two rows represent the same sale
line item re-sent by a flaky export job. Naming the real business key — `order_id` plus
`line_number`, since one order can have several line items — tells Spark exactly which rows count as
"the same sale line item," regardless of whether some other column differs slightly between the two
copies.

## Why explicit casts, not `inferSchema` again

Bronze let Spark guess types because nothing depended on the guess being right. Silver is different:
`to_date(col("sale_date"))` and `.cast("decimal(12,2)")` declare, on purpose, exactly what type each
column must be, because Gold's aggregation next lesson depends on `sales_amount` actually being a
number it can sum, not a string that happens to look like one.

## Why these three columns are "required"

`store_id`, `sale_date`, and `sales_amount` are the columns Gold's aggregation cannot function
without — no date means the row can't be assigned to a day, no amount means it contributes nothing
measurable, and no store ID means you can't even confirm the record is a real sale at all. Dropping
rows missing any of those is enforcing the "required column" decision made back in Lesson 2's plan;
every other column can be missing without breaking Gold.

## Why `overwrite` here, when Bronze used `append`

Silver recomputes from the entirety of Bronze every run, so `mode("overwrite")` is correct — Silver
doesn't need its own independent history, it only needs to be correct right now, derived fresh from
whatever Bronze has accumulated. This is also the exact point where incremental loading would change
things: a later, more advanced version of this pipeline would use a Delta `MERGE` here instead of a
full overwrite, so each run only processes new rows instead of recomputing everything. That's a real
limitation of this Beginner pipeline — named out loud, not hidden — and it's exactly the kind of
problem the next project in this track tackles head-on.

## Key terms

| Term | Meaning |
|---|---|
| Business key | The column or columns that uniquely identify "the same real-world record" |
| `withColumn` | Adding or replacing a column on a DataFrame with a new expression |
| Explicit cast | Declaring a column's type on purpose, rather than letting Spark guess it |
| Incremental loading | Processing only new or changed data each run, instead of recomputing everything |

## Lab

Add one more required-column check to the filter: require `channel` (in-store or online) to be
non-null too. Write the updated `.filter(...)` line yourself.

## Check yourself

You're ready for Lesson 5 when you can explain why `dropDuplicates(["order_id", "line_number"])` is
safer than a plain `dropDuplicates()`, and name the one thing this lesson's `overwrite` approach
trades away compared to an incremental `MERGE`.
