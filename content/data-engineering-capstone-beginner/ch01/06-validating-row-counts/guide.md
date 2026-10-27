# Lesson 6 — Validating Row Counts Across Layers

**Chapter 1 · Beginner Capstone: First Medallion Pipeline · Lesson 6 of 10**

## What you'll learn

- A real, concrete row-count validation pattern that checks Bronze, Silver, and Gold against each
  other, not just that each table exists
- Why "the pipeline ran without an error" is not the same claim as "the pipeline produced the right
  answer"
- How to turn each validation rule into an assertion that actually fails loudly when something's wrong

## Why "it ran" isn't "it's right"

PySpark will happily run a pipeline with a wrong `countDistinct`, a bad filter, or a silently dropped
join and never raise an exception — the job finishes, the table exists, and the numbers are simply
wrong. A pipeline you trust needs a validation step that checks the *relationships between layers*,
not just that each step completed.

## The validation checks

```python
bronze_count = spark.table("bronze.daily_sales_raw").count()
silver_count = spark.table("silver.sales_transactions").count()
gold_count = spark.table("gold.daily_sales_summary").count()
silver_distinct_dates = (
    spark.table("silver.sales_transactions")
    .select("sale_date")
    .distinct()
    .count()
)

print(f"bronze={bronze_count} silver={silver_count} gold={gold_count}")

assert silver_count <= bronze_count, (
    "Silver should never have MORE rows than Bronze -- "
    "dropDuplicates and filters only remove rows, never add them"
)

assert gold_count == silver_distinct_dates, (
    "Gold's row count should equal the number of distinct days in Silver -- "
    "Gold's grain is one row per day"
)
```

## Reading each rule

**`silver_count <= bronze_count`** — Silver is produced entirely by removing rows from Bronze
(duplicates, nulls in required columns). It is logically impossible for that process to *add* rows.
If this assertion ever fails, something is badly wrong upstream — most likely a join in the Silver
transformation that accidentally multiplied rows instead of filtering them.

**`gold_count == silver_distinct_dates`** — Gold's whole grain is one row per calendar day, fixed back
in Lesson 2's plan. If Silver has sale records across, say, 30 distinct days, Gold must have exactly
30 rows — not 29 (a day silently dropped by a bad filter) and not 31 (a `groupBy` that split on
something other than just the date, like an extra hidden column with different time components).

## Why this matters more than it looks like it does

Both of these checks would have caught a real class of bug from the last two lessons: if Lesson 4's
`dropDuplicates` key had been wrong, or Lesson 5's `groupBy` had accidentally included a timestamp
column alongside `sale_date`, these assertions would fail loudly, immediately, with a clear reason —
instead of quietly shipping a slightly-wrong daily total to the Store Operations lead, who has no way
to know it's wrong just by looking at a chart.

## What this is NOT

This is not a full data-quality test suite — it doesn't check that `total_sales_amount` is a
*reasonable* number, or that no day is missing entirely from a 30-day expected range. Those are real,
deeper validation techniques worth learning, but the two checks here are the minimum habit: confirm
your layers agree with each other before you trust what's downstream of them.

## Key terms

| Term | Meaning |
|---|---|
| Row-count validation | Checking that the number of rows at each layer is logically consistent with the layer before it |
| `assert` | A Python statement that raises an error immediately if its condition is false |
| Grain consistency | Confirming a table's actual row count matches what its defined grain predicts |

## Lab

Add a third assertion: `bronze_count` should be greater than or equal to the number of distinct
`(order_id, line_number)` pairs in Bronze — explain in a comment why that one can be `==`, not just
`>=`, if Bronze happens to have zero duplicate rows that day.

## Check yourself

You're ready for Lesson 7 when you can explain, from memory, why `silver_count` can never be greater
than `bronze_count`, and why `gold_count` must equal the distinct date count in Silver, not some other
number.
