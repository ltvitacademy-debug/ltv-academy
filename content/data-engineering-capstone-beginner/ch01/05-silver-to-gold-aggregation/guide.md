# Lesson 5 — Writing the Silver-to-Gold Aggregation

**Chapter 1 · Beginner Capstone: First Medallion Pipeline · Lesson 5 of 10**

## What you'll learn

- Real PySpark to aggregate Silver's clean sale line items into Gold's one-row-per-day summary
- Why `countDistinct("order_id")` is correct here and `count("order_id")` would be wrong
- The equivalent Spark SQL version of the same aggregation, and when you'd reach for it instead

## The aggregation

Everything up to this point exists to make this one step correct. `silver.sales_transactions` holds
one row per sale line item; this lesson collapses that down into `gold.daily_sales_summary`, one row
per calendar day:

```python
from pyspark.sql.functions import sum as _sum, countDistinct

gold_df = (
    spark.table("silver.sales_transactions")
    .groupBy("sale_date")
    .agg(
        _sum("sales_amount").alias("total_sales_amount"),
        countDistinct("order_id").alias("order_count"),
    )
    .orderBy("sale_date")
)

(gold_df.write
    .format("delta")
    .mode("overwrite")
    .saveAsTable("gold.daily_sales_summary"))
```

`_sum` is imported under an alias because `sum` is also a Python built-in — a small but common gotcha
when importing PySpark's SQL functions.

## Why `countDistinct`, not plain `count`

Silver's grain is one row per *sale line item*, not one row per order. A single order with three
different products on it produces three rows in Silver, all sharing the same `order_id`. Counting
rows with `count("order_id")` would report 3 orders when there was really 1 — exactly the kind of
mistake that quietly inflates a number nobody double-checks. `countDistinct("order_id")` counts each
unique order exactly once, no matter how many line items it had, which is what "order count" is
supposed to mean.

```text
order_id   line_number   sales_amount
1001       1             24.00
1001       2             11.50
1001       3             6.00

count(order_id)          -> 3   (wrong: inflated by line items)
countDistinct(order_id)  -> 1   (correct: one real order)
```

## The equivalent in Spark SQL

The same logic, written as SQL against the same Silver table — useful to recognize, since Databricks
notebooks and Fabric notebooks both let you mix PySpark and SQL cells freely:

```sql
CREATE OR REPLACE TABLE gold.daily_sales_summary AS
SELECT
  sale_date,
  SUM(sales_amount)        AS total_sales_amount,
  COUNT(DISTINCT order_id) AS order_count
FROM silver.sales_transactions
GROUP BY sale_date
ORDER BY sale_date;
```

Both versions produce the identical result. The PySpark version is what you'd reach for inside a
larger notebook pipeline with conditional logic around it; the SQL version reads slightly more
naturally when the transformation really is "just" a group-by with no branching.

## Why `orderBy("sale_date")`

Sorting isn't required for correctness — Delta tables don't guarantee row order on disk regardless —
but it makes the table pleasant to spot-check by eye while you're building and validating the
pipeline, which is exactly what the next lesson does.

## Key terms

| Term | Meaning |
|---|---|
| `groupBy` / `agg` | Collapsing many rows into one row per group, with an aggregate function per column |
| `countDistinct` | Counting unique values of a column, rather than every row |
| CTAS (`CREATE OR REPLACE TABLE ... AS SELECT`) | The SQL equivalent of writing a DataFrame's result to a new table |

## Lab

Add a third aggregate column, `avg_line_item_amount`, computed as `_sum("sales_amount") /
countDistinct` — actually, compute it properly as the average of `sales_amount` directly using
PySpark's `avg()` function, aliased sensibly, alongside the existing two columns.

## Check yourself

You're ready for Lesson 6 when you can explain why `countDistinct("order_id")` is the correct choice
here, and write out, from memory, the Spark SQL equivalent of the PySpark aggregation above.
