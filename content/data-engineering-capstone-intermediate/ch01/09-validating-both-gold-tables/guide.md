# Lesson 9 — Validating Both Gold Tables

**Chapter 1 · Data Engineering Capstone — Intermediate Project · Lesson 9 of 16**

## What you'll learn
- Why two Gold tables built from the same Silver data must always reconcile with each other
- How to write a real cross-table validation query that compares `gold.daily_sales_summary` against `gold.category_breakdown`
- Why a rounding tolerance belongs in a financial reconciliation check, and how small it should be
- Why this exact query is the diagnostic tool you'll reach for later in this course, not a one-time sanity check

## Two tables, one source of truth

`gold.daily_sales_summary` and `gold.category_breakdown` look like two unrelated tables. They aren't.
Both are built from the exact same rows in `silver.sales_clean` — the only difference is how those
rows get grouped on the way up:

- `gold.daily_sales_summary` groups by `store_id, sale_date` only. Every category gets collapsed
  into one number: `total_sales` for that store, that day, period.
- `gold.category_breakdown` groups by `store_id, category, sale_date`. The same underlying rows,
  broken out one more level.

That shared ancestry gives you a guarantee you can actually check: if you take `gold.category_breakdown`
and sum `total_sales` back up across every `category` for a given `store_id` and `sale_date`, you must
land on exactly the same number as `gold.daily_sales_summary.total_sales` for that same store and day.
There's no scenario where those two numbers are allowed to differ — not "usually agree," not
"close enough." If they don't match, one of the two Gold tables was built wrong, full stop.

## Writing the reconciliation query

Here's the check, in SQL first — this is the version you'd run straight against the Lakehouse SQL
endpoint or in a notebook `%sql` cell:

```sql
WITH category_rolled_up AS (
  SELECT
    store_id,
    sale_date,
    SUM(total_sales) AS rolled_up_sales
  FROM gold.category_breakdown
  GROUP BY store_id, sale_date
)
SELECT
  d.store_id,
  d.sale_date,
  d.total_sales       AS daily_summary_sales,
  c.rolled_up_sales   AS category_breakdown_sales,
  ABS(d.total_sales - c.rolled_up_sales) AS diff
FROM gold.daily_sales_summary d
JOIN category_rolled_up c
  ON d.store_id = c.store_id
 AND d.sale_date = c.sale_date
WHERE ABS(d.total_sales - c.rolled_up_sales) > 0.01
ORDER BY diff DESC;
```

And the same logic in PySpark, if you'd rather run it from a notebook cell as a DataFrame job:

```python
from pyspark.sql import functions as F

daily_summary = spark.table("gold.daily_sales_summary")
category_breakdown = spark.table("gold.category_breakdown")

rolled_up = (
    category_breakdown
    .groupBy("store_id", "sale_date")
    .agg(F.sum("total_sales").alias("rolled_up_sales"))
)

discrepancy_report = (
    daily_summary
    .join(rolled_up, on=["store_id", "sale_date"], how="inner")
    .withColumn("diff", F.abs(F.col("total_sales") - F.col("rolled_up_sales")))
    .filter(F.col("diff") > 0.01)
    .orderBy(F.desc("diff"))
)

discrepancy_report.show()
```

This is a **discrepancy report**, not a yes/no check: it returns the actual rows that are wrong,
with both numbers and the size of the gap, so if something ever does break you're not stuck
re-deriving the comparison from scratch — you already have the evidence in front of you.

## Why the tolerance, and why it's tiny

The query doesn't check for an exact match (`total_sales != rolled_up_sales`). It checks whether the
absolute difference exceeds `0.01` — one cent. That tolerance exists for one reason only: floating-point
and decimal rounding when currency amounts get summed in a different order or at a different grouping
level can produce differences at the level of fractions of a cent. A one-cent tolerance absorbs that
noise without hiding anything real. If you ever find yourself raising this tolerance to "fix" a failing
check, that's a sign something is actually wrong upstream — not a sign the tolerance was too strict.

## Run it now — it should come back clean

Run either version of the query against the pipeline as it stands right now, after Lessons 7 and 8
built both Gold tables from the same incremental Silver layer. It should return **zero rows**. That's
the expected, healthy result: every store/day combination reconciles, because both tables were built
correctly from the same `silver.sales_clean` data.

Keep this query. Save it somewhere you can find it again — a notebook, a `.sql` file in your project,
wherever you keep your real tools. You're going to need it again, for real, later in this course, when
something in this pipeline actually does break and you have to prove — and then find — exactly where
the numbers stopped agreeing.

## Key terms

| Term | Meaning |
|---|---|
| Reconciliation | Confirming that two independently-derived numbers that *should* agree, actually do |
| Discrepancy report | A query result listing only the rows that fail a check, with the values that disagree |
| Rounding tolerance | A deliberately tiny allowed difference (here, one cent) that absorbs floating-point noise without masking real errors |
| Shared ancestry | Two Gold tables being correct if and only if they were both built from the same Silver rows |

## Lab

Run the SQL version of the reconciliation query against your own Gold tables. Confirm it returns zero
rows. Then deliberately break it for one row — manually `UPDATE` a single `total_sales` value in
`gold.daily_sales_summary` for one `store_id`/`sale_date` you can identify — and re-run the query to
confirm it now correctly flags that exact row as a discrepancy. Revert your manual edit afterward.

## Check yourself

Without looking back at the lesson: explain in one sentence *why* these two Gold tables are guaranteed
to reconcile, name the one column both tables must be grouped and joined on besides `store_id`, and
say why the tolerance check uses `> 0.01` instead of `!=`.
