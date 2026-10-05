# Lesson 26 — Data Quality and SQL Interview Practice

**Chapter 2 · Career Preparation · Lesson 26 of 35**

## What you'll learn

- The four SQL patterns most commonly asked in a data quality interview
- Complete, correct T-SQL answers you can run and adapt yourself
- How to narrate your reasoning out loud while you write the query
- The follow-up question to expect after each pattern

## The practice schema

Every query below assumes the same simple two-table schema this catalog's Data Quality Management course uses: `dbo.Customers` (`CustomerId`, `Email`) and `dbo.Orders` (`OrderId`, `CustomerId`). Build it yourself with a handful of rows — including at least one duplicate email and one order with a `CustomerId` that doesn't exist in `Customers` — so you know the right answer before you run anything.

## Question 1: "What percentage of a column is NULL?"

This tests completeness. The standard pattern is `SUM(CASE WHEN ... THEN 1 ELSE 0 END)` against `COUNT(*)`:

```sql
SELECT
    COUNT(*) AS TotalRows,
    SUM(CASE WHEN Email IS NULL THEN 1 ELSE 0 END) AS NullEmails,
    CAST(100.0 * SUM(CASE WHEN Email IS NULL THEN 1 ELSE 0 END)
         / COUNT(*) AS DECIMAL(5,2)) AS NullEmailPct
FROM dbo.Customers;
```

**Expect this follow-up:** "Why `100.0` and not `100`?" T-SQL performs integer division when both operands are integers, silently truncating the result to `0` before it ever reaches a decimal. Multiplying by `100.0` forces decimal division first.

## Question 2: "Find duplicate customers by email."

This tests uniqueness. `GROUP BY` with `HAVING COUNT(*) > 1` finds which values are duplicated:

```sql
SELECT Email, COUNT(*) AS DuplicateCount
FROM dbo.Customers
GROUP BY Email
HAVING COUNT(*) > 1;
```

**Expect this follow-up:** "How would you get the actual duplicate rows, not just the counts?" Either join back to the base table on the grouped column, or use `ROW_NUMBER() OVER (PARTITION BY Email ORDER BY CustomerId)` and keep every row where the row number is greater than 1 — useful specifically when you need to decide which single row to keep.

## Question 3: "Find orders with no matching customer."

This tests referential integrity. The standard pattern is a `LEFT JOIN` from child to parent, filtered to where the join found nothing:

```sql
SELECT o.OrderId, o.CustomerId
FROM dbo.Orders AS o
LEFT JOIN dbo.Customers AS c
    ON o.CustomerId = c.CustomerId
WHERE c.CustomerId IS NULL
  AND o.CustomerId IS NOT NULL;
```

**Expect this follow-up:** "Why do you need `AND o.CustomerId IS NOT NULL` in addition to `c.CustomerId IS NULL`?" A `NULL` foreign key usually means "no customer, intentionally" — a guest checkout, say — which is a completeness question, not an orphaned row. Without that condition, every legitimately-NULL order would get miscounted as an orphan.

## Question 4: "Combine several rules into one report."

This tests whether you can scale past a single check. `UNION ALL` combines multiple rules into one labeled failures report:

```sql
SELECT 'Customers: Email must be present' AS RuleName,
       CAST(CustomerId AS VARCHAR(20)) AS RecordKey
FROM dbo.Customers
WHERE Email IS NULL

UNION ALL

SELECT 'Customers: Email must be unique',
       CAST(c.CustomerId AS VARCHAR(20))
FROM dbo.Customers AS c
WHERE EXISTS (
    SELECT 1 FROM dbo.Customers AS c2
    WHERE c2.Email = c.Email AND c2.CustomerId <> c.CustomerId
)

UNION ALL

SELECT 'Orders: CustomerId must exist',
       CAST(o.OrderId AS VARCHAR(20))
FROM dbo.Orders AS o
LEFT JOIN dbo.Customers AS c ON o.CustomerId = c.CustomerId
WHERE c.CustomerId IS NULL AND o.CustomerId IS NOT NULL;
```

**Expect this follow-up:** "Why cast every key to the same type before `UNION ALL`-ing them?" `CustomerId` and `OrderId` might be different underlying types; mismatched types across `UNION` branches either raise an error or force an implicit, sometimes slow, conversion. Casting every `RecordKey` to the same `VARCHAR` length up front avoids both problems.

## How to talk through it live

1. **Restate what "bad" means** for this rule, out loud, before writing anything.
2. **Write the `SELECT` key columns and `FROM` first**, then earn the `WHERE` clause for the failure condition — not the success condition.
3. **Run it, and sanity-check the count** against the table's total row count; a result that returns every row, or zero rows, is usually a sign the condition is backwards.
4. **Say what you'd do next** — flag it in a report, not silently delete or update anything. Checks are read-only; remediation is a separate, deliberate step.

## Key terms

| Term | Meaning |
|---|---|
| Completeness check | A query measuring how much of a column is missing or NULL |
| Uniqueness check | A query finding rows that duplicate a value that should be unique |
| Referential integrity check | A `LEFT JOIN ... WHERE ... IS NULL` query finding foreign keys with no matching parent row |
| Failures report | A single result set combining multiple rules' violations via `UNION ALL` |

## Lab

Against AdventureWorks2012 or Northwind (consistent with this catalog's SQL labs), write your own NULL-rate check on one column, a `GROUP BY ... HAVING` duplicate check on another, and a `LEFT JOIN` orphan check between two related tables. Combine all three into one `UNION ALL` failures report.

## Check yourself

Without looking back, can you write the `SUM(CASE WHEN col IS NULL THEN 1 ELSE 0 END)` pattern and the `LEFT JOIN ... WHERE ... IS NULL` orphan pattern from memory?
