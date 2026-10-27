# Lesson 5 — Using MERGE INTO for the Silver Layer

**Chapter 1 · Data Engineering Capstone — Intermediate Project · Lesson 5 of 16**

## What you'll learn

- Why Silver can no longer be fully rewritten every night now that Bronze ingestion is incremental
- The real Delta Lake `MERGE INTO` syntax: `WHEN MATCHED` vs. `WHEN NOT MATCHED`
- Why `transaction_id` — not `store_id` or `sale_date` — is the only safe match key
- How to point a `MERGE INTO` at the new incremental Bronze batch instead of the whole table

## From full rewrite to a real upsert

Lesson 4 made Bronze ingestion incremental: `bronze.sales_raw` now only picks up new source files
instead of re-reading everything every night. But that creates a new problem one layer up. The old
Silver step used to just truncate `silver.sales_clean` and rebuild it from the full contents of
Bronze. That worked because Bronze was small enough to fully reprocess. It isn't anymore — and more
importantly, it's wasteful: most rows in Bronze haven't changed since yesterday.

What Silver actually needs now is an **upsert**: take today's incremental batch out of Bronze, and
for each row either update a transaction that's already in Silver (because it arrived corrected or
amended) or insert one that's brand new. Delta Lake has a real SQL and PySpark primitive built
exactly for this: `MERGE INTO`.

## The real MERGE INTO statement

Here's the exact pattern for this pipeline. `bronze_incremental` is a temporary view or DataFrame
holding only today's new Bronze rows — not the whole `bronze.sales_raw` table:

```sql
MERGE INTO silver.sales_clean AS target
USING bronze_incremental AS source
ON target.transaction_id = source.transaction_id
WHEN MATCHED THEN UPDATE SET *
WHEN NOT MATCHED THEN INSERT *
```

Reading it line by line:

- `MERGE INTO silver.sales_clean AS target` — the Delta table being upserted. This is the table that
  stays correct over time.
- `USING bronze_incremental AS source` — the incoming incremental batch. Not the full Bronze table —
  just the rows ingestion picked up today.
- `ON target.transaction_id = source.transaction_id` — the match condition. This is the single most
  important line in the whole statement.
- `WHEN MATCHED THEN UPDATE SET *` — if a row in the source already exists in the target (same
  `transaction_id`), overwrite that row's columns with the incoming values.
- `WHEN NOT MATCHED THEN INSERT *` — if a row in the source has no match in the target, it's a new
  transaction Silver has never seen before, so insert it as a new row.

The same operation in PySpark, using the `DeltaTable` API:

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

Both versions do the same thing: one real pass over only the incoming rows, no full rewrite of
Silver.

## Why transaction_id, and nothing else

The match condition is the part worth getting exactly right, because it decides whether this upsert
is correct or silently wrong.

- `store_id` identifies a *store*, not a sale. Every transaction at Store 12 shares the same
  `store_id`. Matching on it would make every new sale at that store look like an "update" to
  whichever row happened to be there first.
- `sale_date` identifies a *day*, not a sale. A single store can easily have thousands of
  transactions on the same `sale_date`. Matching on it would collapse all of them into one row.
- `transaction_id` is the one column in this schema that uniquely identifies a single sale — one
  row, one real-world transaction, no two transactions share it. That's exactly the property a
  `MERGE INTO` match key needs: it has to be unique per logical record, or `UPDATE SET *` will
  silently overwrite the wrong row, or insert duplicates of ones that should have matched.

This is the pattern this course keeps coming back to: lessons 13-15 later diagnose a real
production bug by comparing a broken `MERGE INTO` against this exact, correct version. Get the
match key right here and that diagnosis becomes straightforward later.

## Key terms

| Term | Meaning |
|---|---|
| Upsert | A single operation that updates existing rows and inserts new ones, instead of two separate steps |
| `MERGE INTO` | Delta Lake's SQL/PySpark statement for performing a real upsert against a Delta table |
| Match key | The column (or columns) used to decide whether an incoming row corresponds to an existing row |
| `WHEN MATCHED` / `WHEN NOT MATCHED` | The two branches of a MERGE: update an existing row, or insert a brand-new one |

## Lab

Write the `MERGE INTO` statement for `silver.sales_clean` from memory, without looking back at this
lesson. Then write one sentence explaining what would go wrong if you matched on `store_id` instead
of `transaction_id`, using a concrete example (two different sales at the same store, same day).

## Check yourself

Without looking back: what are the two branches of a `MERGE INTO` statement called, and what does
each one do? And why is `transaction_id` the correct match key for this table, when `store_id` and
`sale_date` are both available but wrong?
