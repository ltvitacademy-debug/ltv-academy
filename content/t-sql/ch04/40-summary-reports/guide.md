# Lesson 40 — Building Summary Reports

**Chapter 4 · Grouping and Aggregating · Lesson 9 of 9**

## What you'll learn

- Combining every tool from this chapter into one real report
- The correct clause order, written out in full
- Wrapping up Chapter 4

## A real summary report

Let's build the kind of query you'd actually write on the job: "For each
product category with more than 5 products, show the product count,
average price, and price range — sorted by average price, highest
first, but only for categories averaging over $50."

```sql
USE AdventureWorks2012;
GO

SELECT
    p.Color,
    COUNT(*) AS ProductCount,
    AVG(p.ListPrice) AS AveragePrice,
    MIN(p.ListPrice) AS CheapestPrice,
    MAX(p.ListPrice) AS MostExpensivePrice
FROM Production.Product AS p
WHERE p.Color IS NOT NULL
GROUP BY p.Color
HAVING COUNT(*) > 5 AND AVG(p.ListPrice) > 50
ORDER BY AveragePrice DESC;
```

## Reading it in logical order, not typed order

Walk through what SQL Server actually does, step by step:

1. **`FROM`** — start with `Production.Product`
2. **`WHERE`** — drop rows with no `Color` recorded, before anything else
3. **`GROUP BY`** — split the remaining rows into one group per `Color`
4. **Aggregates evaluate** — `COUNT`, `AVG`, `MIN`, `MAX` each compute once
   per group
5. **`HAVING`** — drop any group with 5 or fewer products, or averaging
   $50 or less
6. **`SELECT`** — produce the final columns, using the aliases you'll see
   in the output
7. **`ORDER BY`** — sort what's left by `AveragePrice`, descending

Every clause you've learned this chapter has a fixed place in this
pipeline, and none of them can skip ahead or fall behind it.

## Chapter 4 recap

You can now summarize data at any level of detail — one number for a whole
table, one number per group, or one number per multi-column combination —
filter rows before grouping and groups after, stack multiple queries
together, and measure both the center and the spread of your data.
Chapter 5 shifts focus to data types and the string/date functions you'll
use constantly while building reports like this one.

## Key terms

| Term | Meaning |
|---|---|
| Summary report | A query combining filtering, grouping, aggregation, and sorting into one result |

## Lab

Modify the query above to report by `ProductSubcategoryID` instead of
`Color`, keeping every other rule the same, and run it against
AdventureWorks2012.

## Check yourself

You're ready for Chapter 5 when you can answer, without looking: in the
actual order SQL Server evaluates them, where does `HAVING` sit relative to
`GROUP BY` and `SELECT`?
