# Lesson 12 — Completeness

**Chapter 3 · The Quality Dimensions · Lesson 12 of 30**

## What you'll learn

- What "completeness" means, at both the field level and the record
  level
- Why `NULL`, an empty string, and a placeholder default are three
  different problems that look similar
- How to measure completeness with T-SQL, column by column
- How to turn completeness into a trackable rate instead of a
  pass/fail

## What completeness actually means

**Completeness** is whether all the data that's supposed to be there
actually is. It splits into two levels:

- **Field-level completeness** — does this *column* have a value for
  this row? (`PhoneNumber` is `NULL` for 400 of 10,000 customers)
- **Record-level completeness** — does this *entire record* exist at
  all? (A customer placed an order but no row exists in the
  `Shipments` table for it)

Most completeness work in practice is field-level, because it's
directly measurable with a single query. Record-level completeness
usually requires comparing two tables or systems — it overlaps with
reconciliation, which gets its own lesson (Lesson 20).

## Three different kinds of "missing"

A column that looks "complete" by one check can still be hiding
missing data, because missingness shows up in disguise:

| Disguise | What it looks like | Why it's missing anyway |
|---|---|---|
| `NULL` | The database's actual "no value" marker | Easiest to detect — `IS NULL` catches it directly |
| Empty string | `''` — a string of zero length | Not `NULL`, so `IS NULL` misses it entirely |
| Sentinel/default value | `'N/A'`, `'Unknown'`, `0`, `1900-01-01` | Looks like real data to a naive `COUNT`, but means the same thing as missing |

A completeness check that only looks for `NULL` will systematically
undercount how much data is actually missing. Good completeness checks
look for all three.

## Measuring completeness with SQL

Start with per-column missingness — how many rows are missing each
important field, and what percentage of the table that represents:

```sql
SELECT
    COUNT(*) AS TotalRows,
    SUM(CASE WHEN PhoneNumber IS NULL
                  OR LTRIM(RTRIM(PhoneNumber)) = ''
             THEN 1 ELSE 0 END) AS MissingPhone,
    SUM(CASE WHEN Email IS NULL
                  OR LTRIM(RTRIM(Email)) = ''
             THEN 1 ELSE 0 END) AS MissingEmail
FROM dbo.Customers;
```

Notice the pattern: `IS NULL OR LTRIM(RTRIM(col)) = ''` catches both
`NULL` and blank-string missingness in one condition. Sentinel values
like `'Unknown'` need their own explicit check, since they're
business-specific:

```sql
SELECT COUNT(*) AS SentinelCountryCodes
FROM dbo.Customers
WHERE CountryCode IN ('N/A', 'UNKNOWN', 'XX');
```

## Turning it into a completeness rate

A single count is useful once. A **rate** is useful every time you
run it, because you can track it over time and set a threshold
(Lesson 21 covers exactly this):

```sql
SELECT
    CAST(SUM(CASE WHEN Email IS NULL
                       OR LTRIM(RTRIM(Email)) = ''
                  THEN 0 ELSE 1 END) AS DECIMAL(5,2))
        / COUNT(*) * 100 AS EmailCompletenessPct
FROM dbo.Customers;
```

Run that same query every day and plot the result, and you've built
the simplest possible data quality monitor for one column.

## Key terms

| Term | Meaning |
|---|---|
| Field-level completeness | Whether a specific column has a value for a given row |
| Record-level completeness | Whether an entire expected record exists at all |
| Sentinel value | A placeholder ('N/A', '1900-01-01') that disguises missing data as real data |
| Completeness rate | The percentage of non-missing values for a column or table |

## Lab

1. Pick any table you have access to (or create one with a handful of
   test rows, some with `NULL`s and empty strings deliberately mixed
   in).
2. Write a query that reports, per important column: total rows,
   count missing (`NULL` or blank), and completeness percentage.
3. Add a check for at least one sentinel value specific to your table
   (a placeholder your organization — or your test data — actually
   uses).
4. Run the query twice against two different snapshots of the same
   table (or re-run after deleting a few values) and compare the
   completeness rate between runs.

## Check yourself

- Why does checking only `IS NULL` undercount missing data?
- Give an example of a record-level completeness problem that a
  single-table query couldn't detect.
- What's the advantage of a completeness *rate* over a one-time
  completeness *count*?
