# Lesson 28 — SCD Type 1 in Snowflake

**Chapter 6 · Data Warehousing & Dimensional Modeling in Snowflake · Lesson 28 of 60**

## What you'll learn

- A quick reminder of what SCD Type 1 means — assumed known from Data Warehousing
- The exact `MERGE` statement that implements it in Snowflake
- A syntax note: Snowflake's `MERGE` doesn't support an `OUTPUT` clause the way T-SQL's does
- Why SCD1 pairs naturally with the `HASH()`-based surrogate keys from Lesson 27

## The reminder: SCD1 overwrites, no history

You already know this from Data Warehousing: **Slowly Changing
Dimension Type 1** means when a source attribute changes — a
customer's address, say — you simply overwrite the old value in
place. No history is kept; the dimension row always reflects the
current state only. It's the simplest SCD strategy, appropriate when
nobody needs to know what the value *used to be*.

## Implementing it with MERGE

The mechanics are exactly the `MERGE` you already know from T-SQL —
match on the natural key, update the row in place if it exists,
insert it if it doesn't:

```sql
MERGE INTO analytics.dim_customer AS tgt
USING staging.customers_cleaned AS src
    ON tgt.customer_id = src.customer_id
WHEN MATCHED THEN UPDATE SET
    tgt.customer_name = src.customer_name,
    tgt.region        = src.region,
    tgt.email         = src.email
WHEN NOT MATCHED THEN INSERT (
    customer_key, customer_id, customer_name, region, email
) VALUES (
    HASH(src.customer_id), src.customer_id, src.customer_name, src.region, src.email
);
```

Every run, this brings `dim_customer` fully in sync with whatever the
staging layer currently holds — matched rows get overwritten with the
new attribute values, new rows get inserted with a `HASH()`-derived
surrogate key so it's consistent with anything else in the pipeline
computing the same key independently (Lesson 27).

## A syntax note: no OUTPUT clause

If you've used T-SQL's `MERGE ... OUTPUT` to capture which rows were
inserted vs. updated, note that Snowflake's `MERGE` has **no `OUTPUT`
clause**. If you need to know what changed, the usual approach is a
separate query — comparing row counts before and after, or checking
`MERGE`'s own returned "rows inserted / rows updated" counts, which
Snowsight displays after the statement runs. There's no built-in way
to stream the actual changed rows out of the `MERGE` statement itself.

## Why HASH()-based keys pair naturally with SCD1

Because SCD1 never needs to preserve multiple versions of a row, the
surrogate key only ever needs to identify "this customer," not "this
customer, as of this version" — exactly what a `HASH()` of the natural
key gives you for free, with no extra bookkeeping. SCD Type 2, next
lesson, is where that stops being sufficient.

## Key terms

| Term | Meaning |
|---|---|
| SCD Type 1 | Overwrite-in-place — no history of prior attribute values kept |
| `MERGE ... WHEN MATCHED / WHEN NOT MATCHED` | Updates existing rows, inserts new ones, in one statement |
| `OUTPUT` clause (T-SQL) | Not available in Snowflake's `MERGE` — no way to stream changed rows out directly |

## Lab

1. Build a small `dim_customer` table and a staging table with a few
   overlapping and a few new customer rows.
2. Write the SCD1 `MERGE` above and run it, confirming updates apply
   to matched rows and inserts apply to new ones.
3. Change one attribute in the staging table and rerun the same
   `MERGE` — confirm the old value in the dimension is gone with no
   trace, consistent with SCD1's "no history" rule.

## Check yourself

You're ready for Lesson 29 when you can explain, in one sentence, what
SCD Type 1 loses that SCD Type 2 is specifically designed to keep.
