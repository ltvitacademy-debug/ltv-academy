# Lesson 29 — SCD Type 2 in Snowflake

**Chapter 6 · Data Warehousing & Dimensional Modeling in Snowflake · Lesson 29 of 60**

## What you'll learn

- A quick reminder of what SCD Type 2 preserves that Type 1 doesn't
- The effective-date / expiry-date / current-flag column shape
- Why one `MERGE` alone can't fully implement SCD2, and the two-step pattern that does
- How this pairs with the incremental loading pattern from Lesson 23

## The reminder: SCD2 keeps history

You already know this from Data Warehousing: **SCD Type 2** keeps
every version of a dimension row instead of overwriting it. When a
customer's region changes, the old row is closed out — marked no
longer current, with an expiry date — and a brand-new row is inserted
for the new version, with its own effective date. Facts recorded
*before* the change still join to the *old* version of the dimension
row; facts recorded after join to the new one. That's the entire point
of doing this instead of SCD1.

## The table shape

```sql
CREATE TABLE analytics.dim_customer (
    customer_key    NUMBER,          -- surrogate, unique per VERSION
    customer_id     VARCHAR,         -- natural key, repeats across versions
    customer_name   VARCHAR,
    region          VARCHAR,
    effective_date  DATE,
    expiry_date     DATE,
    is_current      BOOLEAN
);
```

Notice `customer_id` (the natural key) can now appear in **multiple**
rows — one per historical version — while `customer_key` (the
surrogate) is unique per *version*, not per customer. This is exactly
why a plain `HASH(customer_id)` from Lesson 27 isn't enough here on
its own: it would collide across every version of the same customer.
A common fix is hashing the natural key together with the effective
date, or falling back to `AUTOINCREMENT` for this specific table.

## Why a single MERGE can't do this alone

SCD1's `MERGE` worked in one statement because "update in place" and
"insert if new" is exactly what `MERGE` is built for. SCD2 needs a
*third* behavior `MERGE` doesn't have a clause for: closing out an old
row **while also** inserting a new one for the same natural key, in
response to the same source row. Real Snowflake ELT code handles this
as two statements run back-to-back.

**Step 1 — close out rows whose attributes changed:**

```sql
UPDATE analytics.dim_customer AS tgt
SET expiry_date = CURRENT_DATE(), is_current = FALSE
FROM staging.customers_cleaned AS src
WHERE tgt.customer_id = src.customer_id
  AND tgt.is_current = TRUE
  AND tgt.region <> src.region;   -- the attribute(s) being tracked
```

**Step 2 — insert new versions for changed or brand-new customers:**

```sql
INSERT INTO analytics.dim_customer (
    customer_key, customer_id, customer_name, region,
    effective_date, expiry_date, is_current
)
SELECT
    HASH(src.customer_id, CURRENT_DATE()) AS customer_key,
    src.customer_id, src.customer_name, src.region,
    CURRENT_DATE()  AS effective_date,
    NULL            AS expiry_date,
    TRUE            AS is_current
FROM staging.customers_cleaned AS src
LEFT JOIN analytics.dim_customer AS tgt
    ON tgt.customer_id = src.customer_id AND tgt.is_current = TRUE
WHERE tgt.customer_id IS NULL          -- brand-new customer
   OR tgt.region <> src.region;        -- or an attribute changed
```

Step 1 must run **before** step 2, and step 2's anti-join has to look
for a *current* row that no longer matches — which is exactly why the
`is_current` flag exists: it's what lets step 2 find "customers who
need a new version" without accidentally matching against a row
step 1 just closed out.

## This pairs with incremental loading

Nothing here requires reprocessing the whole dimension every run — the
same watermark-filtered `staging.customers_cleaned` from Lesson 23
feeds both statements. SCD2 answers "how do I apply a change," not
"which rows changed" — that's still the incremental loading pattern's
job.

## Key terms

| Term | Meaning |
|---|---|
| SCD Type 2 | Preserves history — closes out the old row, inserts a new one, instead of overwriting |
| `effective_date` / `expiry_date` | The date range during which a given version of the row was current |
| `is_current` | Flags exactly one row per natural key as the active version |
| Two-step SCD2 pattern | An `UPDATE` to close out changed rows, then an `INSERT` for the new versions — one `MERGE` can't do both |

## Lab

1. Build a `dim_customer` table with the SCD2 shape above and seed it
   with a few "current" rows.
2. Change one attribute in a staging table for one customer, and add
   one brand-new customer.
3. Run the two-step pattern and confirm: the changed customer now has
   two rows (one expired, one current), and the new customer has
   exactly one current row.

## Check yourself

You're ready for Lesson 30 when you can explain why step 1 (closing
out changed rows) has to run before step 2 (inserting new versions),
not the other way around.
