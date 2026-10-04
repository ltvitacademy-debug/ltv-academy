# Lesson 15 — Uniqueness

**Chapter 3 · The Quality Dimensions · Lesson 15 of 30**

## What you'll learn

- What "uniqueness" means, and why duplicates are one of the most
  expensive quality problems to leave unfixed
- The difference between an exact duplicate and a "fuzzy" near-duplicate
- How to find exact duplicates with `GROUP BY ... HAVING` and
  `ROW_NUMBER()`
- Why uniqueness constraints at the database level don't catch
  everything

## What uniqueness actually means

**Uniqueness** is whether each real-world entity is represented by
exactly one record — not zero (that's completeness) and not two or
more. A duplicate customer record isn't inaccurate, invalid, or
inconsistent by itself; each copy might be perfectly correct. The
problem is that there are *two* of them when there should be one.

Duplicates are expensive in ways that are easy to underestimate: a
customer gets the same marketing email twice, a revenue report
double-counts a sale, a support agent can't tell which of two customer
records is the "real" one to update.

## Exact duplicates vs. fuzzy duplicates

| Type | What it looks like | How it's found |
|---|---|---|
| **Exact duplicate** | Every compared column matches, character for character | `GROUP BY` all relevant columns, `HAVING COUNT(*) > 1` |
| **Fuzzy duplicate** | Columns are *close but not identical* — `"Jon Smith"` vs. `"John Smith"`, same address with different abbreviations | Similarity scoring, standardized/cleansed comparison keys (Chapter 5 territory) |

This lesson focuses on exact duplicates, since they're fully solvable
with plain T-SQL. Fuzzy matching needs cleansing and standardization
first — that's Lesson 24.

## Finding exact duplicates with `GROUP BY`

The classic pattern — group by the columns that should uniquely
identify a real-world entity, and keep only the groups with more than
one row:

```sql
SELECT
    Email,
    COUNT(*) AS DuplicateCount
FROM dbo.Customers
GROUP BY Email
HAVING COUNT(*) > 1;
```

![SQL Server Management Studio results grid showing a SELECT query and a four-row result set with CustomerId, Name, Location, and Email columns.](/courses/data-quality-management/ch03/15-uniqueness/query-results.png)
*A real SSMS results grid — a duplicate-finder query's output lands in a grid shaped exactly like this one, just with a `DuplicateCount` column instead.*

That tells you *which* emails are duplicated and *how many times* —
but not the individual duplicate rows themselves. To get the full
duplicate rows, join back to the base table:

```sql
SELECT c.*
FROM dbo.Customers AS c
JOIN (
    SELECT Email
    FROM dbo.Customers
    GROUP BY Email
    HAVING COUNT(*) > 1
) AS dupes
    ON c.Email = dupes.Email
ORDER BY c.Email;
```

## Finding duplicates with `ROW_NUMBER()`

A second, very common pattern — especially useful when you want to
keep exactly one row per duplicate group and discard the rest:

```sql
WITH Ranked AS (
    SELECT
        *,
        ROW_NUMBER() OVER (
            PARTITION BY Email
            ORDER BY CustomerId
        ) AS rn
    FROM dbo.Customers
)
SELECT *
FROM Ranked
WHERE rn > 1;   -- everything except the first occurrence per Email
```

Every row where `rn > 1` is a duplicate beyond the first — this is
the exact query pattern you'd use as the starting point for a
de-duplication delete (with real caution, and ideally a backup, before
actually running a `DELETE` on production data).

## Key terms

| Term | Meaning |
|---|---|
| Uniqueness | Whether each real-world entity has exactly one record |
| Exact duplicate | Rows that match character-for-character on the compared columns |
| Fuzzy duplicate | Rows that represent the same entity but don't match exactly |

## Lab

1. Create a small `Customers` test table and insert rows including at
   least one exact duplicate `Email` value (two rows, same email,
   different `CustomerId`).
2. Write a `GROUP BY ... HAVING COUNT(*) > 1` query to find the
   duplicated email(s).
3. Write a `ROW_NUMBER()` query that returns only the "extra" rows
   (everything but the first per email).
4. Write a single query that reports a overall duplicate rate:
   `(duplicate rows) / (total rows) * 100`.

## Check yourself

- Why isn't a duplicate record automatically an accuracy or validity
  problem?
- When would you reach for `GROUP BY ... HAVING` versus
  `ROW_NUMBER()`?
- Why does this lesson defer fuzzy duplicates to a later chapter
  instead of covering them here?
