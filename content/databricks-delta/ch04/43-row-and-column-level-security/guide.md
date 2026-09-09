# Lesson 43 — Row-Level and Column-Level Security

**Chapter 4 · Unity Catalog · Lesson 43 of 57**

## What you'll learn

- Why "can see the table" and "can see every row/column in it" are different questions
- Column masks — hiding a specific column's real value from some users
- Row filters — hiding entire rows from some users, based on who's asking
- Both are functions, evaluated per-query, not separate copies of data

## Beyond whole-table access

Lesson 42's `GRANT SELECT` is all-or-nothing for a table: either you
can see every row and column, or none of it. Real governance often
needs finer control — an analyst who should see aggregate trip
data, but never a specific rider's exact pickup location; a
contractor who should see this quarter's data, but not last year's.

## Column masks — hiding a column's value

```sql
CREATE FUNCTION mask_vendor_id(vendor_id STRING)
RETURNS STRING
RETURN CASE
    WHEN is_member('data-engineers') THEN vendor_id
    ELSE 'REDACTED'
END;

ALTER TABLE nyc_taxi.silver.trips
ALTER COLUMN VendorID SET MASK mask_vendor_id;
```

A **column mask** is a function, applied automatically on every
query. `is_member()` checks the querying user's group membership at
query time — the `data-engineers` group sees the real `VendorID`;
everyone else sees `'REDACTED'`, from the exact same `SELECT *`.
Nothing about the query itself changes; the masking happens
underneath it.

## Row filters — hiding entire rows

```sql
CREATE FUNCTION filter_by_region(pickup_borough STRING)
RETURNS BOOLEAN
RETURN is_member('admin') OR pickup_borough = current_user_region();

ALTER TABLE nyc_taxi.silver.trips
SET ROW FILTER filter_by_region ON (Borough);
```

A **row filter** works the same way, but returns `true`/`false`
per row instead of masking a value — rows where the function
returns `false` simply don't appear in the result at all, for that
user, from that same query. An `admin` group member sees every row;
everyone else sees only rows matching their own region.

## One table, one set of files, different views per user

Neither mechanism copies data anywhere. There's still exactly one
`nyc_taxi.silver.trips` — the same Delta table from Chapter 3 — with
masking and filtering functions evaluated fresh on every query,
based on who's actually asking. This is genuinely different from
maintaining separate tables per audience, which would mean
Chapter 3's entire pipeline running multiple times over.

## Key terms

| Term | Meaning |
|---|---|
| Column mask | A function replacing a column's value per-query, based on the querying user |
| Row filter | A function hiding entire rows per-query, based on who's asking |
| Single source of truth | One table, one pipeline — views differ per user without copying data |

## Check yourself

You're ready for Lesson 44 when you can explain, without looking: why
is applying a row filter to one table preferable to maintaining
separate tables per audience?
