# Lesson 8 — CASE Expressions (Searched)

**Chapter 1 · T-SQL Foundations · Lesson 8 of 10**

## What you'll learn

- The searched `CASE` — real conditions instead of exact matches
- When to reach for searched `CASE` over simple `CASE`
- Multiple conditions per branch
- Ordering branches so the right one wins

## What is a searched CASE?

The **simple** `CASE` from Lesson 7 can only test for exact matches against
one value. The **searched** form drops that restriction — each `WHEN` holds
a full boolean condition, evaluated independently:

```sql
USE AdventureWorks2012;
GO

SELECT Name, ListPrice,
       CASE
           WHEN ListPrice = 0 THEN 'Not for Sale'
           WHEN ListPrice < 50 THEN 'Budget'
           WHEN ListPrice < 500 THEN 'Mid-Range'
           ELSE 'Premium'
       END AS PriceTier
FROM Production.Product;
```

Notice there's no expression right after `CASE` this time — each `WHEN`
supplies its own complete condition (`ListPrice = 0`, `ListPrice < 50`, and
so on). We cover the comparison operators used here (`=`, `<`, `>`) properly
in Chapter 2 — for now, read them as plain English: equals, less than,
greater than.

## Order matters

Just like the simple form, SQL Server evaluates `WHEN` conditions **top to
bottom** and stops at the first match. That means order isn't just
stylistic — it changes the result:

```sql
-- WRONG ORDER: every row under 500 hits the second branch first
CASE
    WHEN ListPrice < 500 THEN 'Mid-Range'
    WHEN ListPrice < 50 THEN 'Budget'
    ELSE 'Premium'
END
```

Here, a `$20` product matches `ListPrice < 500` on the very first check and
gets labeled `'Mid-Range'` — the `Budget` branch never even gets a chance to
run for it. Always order your conditions from most specific to least
specific.

## Multiple conditions per branch

Each `WHEN` can combine conditions with `AND`/`OR` (previewed here, covered
fully in Chapter 2):

```sql
SELECT Name, ListPrice, Color,
       CASE
           WHEN ListPrice > 1000 AND Color = 'Red' THEN 'Premium Red'
           WHEN ListPrice > 1000 THEN 'Premium'
           ELSE 'Standard'
       END AS Tier
FROM Production.Product;
```

## Simple vs. searched — which one?

| Use simple `CASE` when... | Use searched `CASE` when... |
|---|---|
| Testing one column for exact matches | Testing ranges, comparisons, or multiple columns |
| `CASE Color WHEN 'Red' THEN ...` | `CASE WHEN Price < 50 THEN ...` |

## Key terms

| Term | Meaning |
|---|---|
| Searched `CASE` | A `CASE` where each `WHEN` holds its own full condition |
| Evaluation order | `WHEN` branches are checked top to bottom; first match wins |

## Lab

Run this, then deliberately reorder the `WHEN` branches and compare how the
results change:

```sql
SELECT Name, ListPrice,
       CASE
           WHEN ListPrice = 0 THEN 'Not for Sale'
           WHEN ListPrice < 50 THEN 'Budget'
           WHEN ListPrice < 500 THEN 'Mid-Range'
           ELSE 'Premium'
       END AS PriceTier
FROM Production.Product;
```

## Check yourself

You're ready for Lesson 9 when you can answer, without looking: what's the
difference between simple and searched `CASE`, and why does branch order
matter?
