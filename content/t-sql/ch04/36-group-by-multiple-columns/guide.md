# Lesson 36 — GROUP BY Multiple Columns

**Chapter 4 · Grouping and Aggregating · Lesson 5 of 9**

## What you'll learn

- `GROUP BY` with more than one column
- How the group definition changes with each added column
- Comparing to `SELECT DISTINCT` on multiple columns (Lesson 9)

## Grouping by two columns

```sql
USE AdventureWorks2012;
GO

SELECT Color, Size, AVG(ListPrice) AS AveragePrice, COUNT(*) AS ProductCount
FROM Production.Product
GROUP BY Color, Size;
```

Adding a second column to `GROUP BY` makes the group definition **more
specific**: a group is now every unique **combination** of `Color` **and**
`Size`, not `Color` alone. `Red`/`Large` and `Red`/`Small` are two
**separate** groups here, each getting its own average and count.

## This mirrors DISTINCT on multiple columns

This is exactly the same idea as `SELECT DISTINCT Color, Size` from Lesson
9 — `DISTINCT` compares the **whole combination** of selected columns, not
each independently. `GROUP BY Color, Size` groups on that same combination.
The difference is what you do once the groups exist: `DISTINCT` just
removes duplicates; `GROUP BY` lets you **aggregate** within each group.

## The rule from Lesson 35 still applies

Every non-aggregated column in `SELECT` must appear in `GROUP BY` — now
with **two** columns to account for:

```sql
-- ERROR: ProductLine isn't aggregated and isn't in GROUP BY
SELECT Color, Size, ProductLine, AVG(ListPrice) AS AveragePrice
FROM Production.Product
GROUP BY Color, Size;
```

```sql
-- Fixed: add ProductLine to GROUP BY too
SELECT Color, Size, ProductLine, AVG(ListPrice) AS AveragePrice
FROM Production.Product
GROUP BY Color, Size, ProductLine;
```

## More columns = more, smaller groups

Each additional `GROUP BY` column narrows the groups further — the total
row count can only stay the same or **increase** as you add columns, never
decrease, because you're subdividing existing groups into finer pieces.

## Key terms

| Term | Meaning |
|---|---|
| Multi-column `GROUP BY` | Groups on the combination of all listed columns |

## Lab

Run this against AdventureWorks2012, then remove `Size` from both the
`SELECT` list and `GROUP BY` and compare the row counts:

```sql
SELECT Color, Size, COUNT(*) AS ProductCount
FROM Production.Product
GROUP BY Color, Size;
```

## Check yourself

You're ready for Lesson 37 when you can answer, without looking: does
adding a column to `GROUP BY` increase or decrease the number of groups,
and how does multi-column `GROUP BY` relate to multi-column `DISTINCT`?
