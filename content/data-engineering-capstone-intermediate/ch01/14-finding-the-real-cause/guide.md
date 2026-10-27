# Lesson 14 — Finding the Real Cause

**Chapter 1 · Data Engineering Capstone — Intermediate Project · Lesson 14 of 16**

## What you'll learn

- Using `DESCRIBE HISTORY` to find exactly which job touched a Delta table, and when
- Pulling up the actual statement a past job ran, instead of guessing what it probably did
- Running a controlled query to confirm — or rule out — a hypothesis before touching anything
- The full mechanical chain that explains the symptom from Lesson 13, start to finish

## Step 1: ask the table what happened to it

Lesson 13 narrowed the discrepancy to "something changed around March 1st." Delta Lake keeps a
real, queryable audit trail of every write to a table, and that's the next stop — not a guess, a
log:

```sql
DESCRIBE HISTORY silver.sales_clean;
```

Scanning the output for the date that matters turns up this row:

| version | timestamp | operation | operationParameters (ON clause) |
|---|---|---|---|
| 47 | 2024-03-01 02:14:09 | MERGE | `target.store_id = source.store_id AND target.sale_date = source.sale_date` |
| 46 | 2024-02-29 02:11:52 | MERGE | `target.transaction_id = source.transaction_id` |

Version 46, the night before, ran with the correct match condition from Lesson 5. Version 47 — the
very first MERGE to run on or after March 1st — shows a different `ON` clause entirely. That's not
a theory anymore. That's the exact commit where the pipeline changed.

## Step 2: see the actual statement that ran

`DESCRIBE HISTORY` confirms *that* the condition changed and exactly which run it changed on. Pulling
up version 47's job code shows the full statement that actually executed that night:

```sql
MERGE INTO silver.sales_clean AS target
USING bronze_incremental AS source
ON target.store_id = source.store_id AND target.sale_date = source.sale_date
WHEN MATCHED THEN UPDATE SET *
WHEN NOT MATCHED THEN INSERT *
```

Compare that to Lesson 5's ground truth:

```sql
-- Lesson 5 — correct
ON target.transaction_id = source.transaction_id

-- Version 47 — what actually shipped
ON target.store_id = source.store_id AND target.sale_date = source.sale_date
```

Someone swapped the match key. It reads as "simpler" — two plain business columns instead of one
opaque ID — and it would pass a quick glance in a code review. It is also wrong.

## Step 3: confirm it with a controlled test

Don't stop at "that looks suspicious" — prove the match key is actually non-unique, the same way
Lesson 11's template confirmed a field binding instead of assuming one. Run this directly against
`silver.sales_clean`:

```sql
SELECT store_id, sale_date, COUNT(*) AS row_count
FROM silver.sales_clean
GROUP BY store_id, sale_date
HAVING COUNT(*) > 1
ORDER BY row_count DESC;
```

For Store 48 on March 2nd alone, this returns a row with `row_count = 37` — thirty-seven separate
transactions, same store, same day. That's the smoking gun: `store_id + sale_date` is nowhere close
to unique. A single store routinely logs dozens of transactions on the same date, and this query
proves it with real counts instead of assuming it.

## Step 4: the full mechanical chain, precisely

Here's exactly how a non-unique match key turns into the symptom from Lesson 13:

1. Version 47's MERGE matches `target` rows to `source` rows using `store_id + sale_date`.
2. One incoming row in `bronze_incremental` for Store 48 / March 2nd now matches 37 existing rows
   in `silver.sales_clean` — every transaction that store logged that day — instead of the single
   transaction it actually corresponds to.
3. `WHEN MATCHED THEN UPDATE SET *` has no way to apply one incoming row's values to 37 different
   target rows unambiguously. Depending on the engine and the exact batch, this either throws a
   "multiple rows matched" error, overwrites several unrelated transactions with one row's values,
   or causes genuinely new transactions to be wrongly treated as already-matched and silently
   dropped from the `WHEN NOT MATCHED THEN INSERT` path.
4. Any of those outcomes corrupts `silver.sales_clean` for that store/day without ever raising an
   alarm on its own — the corruption just sits there until something downstream checks it.
5. Both Gold tables are built from that same corrupted Silver data, so both inherit the error — but
   `daily_sales_summary` and `category_breakdown` group the rows differently on the way up, so the
   damage doesn't land the same way in both tables. That's exactly why Lesson 9's reconciliation
   query is the thing that catches it: it's the one check that compares two independently-grouped
   views of the same broken data.

## Why this bug is realistic, not contrived

Nothing about `store_id` or `sale_date` is wrong as columns — they're both real, useful, correctly
populated fields elsewhere in this schema. The bug isn't in the data. It's in treating two
columns that are each individually meaningful as if their *combination* were a unique key, when
nothing about the business guarantees that. That exact mistake is easy to make during a
"simplification" pass, and easy to miss in review, because the new `ON` clause reads just fine in
isolation — it only fails once you know a store logs more than one sale a day.

## Key terms

| Term | Meaning |
|---|---|
| `DESCRIBE HISTORY` | Delta Lake's built-in audit log of every write to a table, including the operation and its parameters |
| Match key | The column or columns a `MERGE INTO` uses to decide which target row an incoming row corresponds to |
| Non-unique match | A match key that can match more than one target row per source row, making `UPDATE SET *` ambiguous |
| Controlled test | A query run specifically to confirm or rule out a hypothesis, with real output, before changing anything |

## Lab

Run `DESCRIBE HISTORY` against a Delta table in your own environment (or against this scenario's
`silver.sales_clean` if you're following along) and find one real version's `operationParameters`.
Then write the `GROUP BY ... HAVING COUNT(*) > 1` query above from memory, and explain in one
sentence why it proves non-uniqueness rather than just suggesting it.

## Check yourself

Without looking back: what single command let you find the exact table version where the match
condition changed, and what did the `HAVING COUNT(*) > 1` query return for Store 48 on March 2nd
that made this a confirmed cause instead of a hunch?
