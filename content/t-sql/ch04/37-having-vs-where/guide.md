# Lesson 37 — HAVING vs. WHERE

**Chapter 4 · Grouping and Aggregating · Lesson 6 of 9**

## What you'll learn

- Why `WHERE` can't filter on an aggregate result
- `HAVING` — filtering groups, after aggregation
- The correct logical order: `WHERE`, then `GROUP BY`, then `HAVING`
- Using `WHERE` and `HAVING` together

## The problem: WHERE runs too early

You want only the colors whose **average** price exceeds `$500`. It's
tempting to reach for `WHERE`:

```sql
-- ERROR: can't use an aggregate function in WHERE
SELECT Color, AVG(ListPrice) AS AveragePrice
FROM Production.Product
WHERE AVG(ListPrice) > 500
GROUP BY Color;
```

This fails. Recall from Lesson 11 that `WHERE` is evaluated **before**
`GROUP BY` even runs — at that point, groups (and their averages) don't
exist yet. `WHERE` filters individual **rows**, not the aggregated result
of a group.

## The fix: HAVING

`HAVING` is `WHERE`'s counterpart for **groups** — it runs **after**
`GROUP BY` has formed the groups and the aggregates have been computed:

```sql
SELECT Color, AVG(ListPrice) AS AveragePrice
FROM Production.Product
GROUP BY Color
HAVING AVG(ListPrice) > 500;
```

This works because, by the time `HAVING` evaluates, every group's average
already exists.

## The correct logical order

Putting it all together, T-SQL clauses are evaluated in this order —
**not** the order you type them:

1. `FROM` (and `JOIN`)
2. `WHERE` — filters individual rows
3. `GROUP BY` — forms groups
4. `HAVING` — filters groups
5. `SELECT` — picks columns/expressions
6. `ORDER BY` — sorts the final result

## Using WHERE and HAVING together

They aren't mutually exclusive — use `WHERE` to filter rows **before**
grouping, and `HAVING` to filter the resulting groups:

```sql
SELECT Color, AVG(ListPrice) AS AveragePrice
FROM Production.Product
WHERE Color IS NOT NULL
GROUP BY Color
HAVING AVG(ListPrice) > 500;
```

`WHERE` removes rows with no color recorded **before** grouping even
starts; `HAVING` then keeps only the color groups whose average price
exceeds `$500`.

## Key terms

| Term | Meaning |
|---|---|
| `HAVING` | Filters groups, evaluated after `GROUP BY` and aggregation |
| Logical order | `FROM` → `WHERE` → `GROUP BY` → `HAVING` → `SELECT` → `ORDER BY` |

## Lab

Run this against AdventureWorks2012:

```sql
SELECT Color, COUNT(*) AS ProductCount
FROM Production.Product
WHERE Color IS NOT NULL
GROUP BY Color
HAVING COUNT(*) > 20;
```

## Check yourself

You're ready for Lesson 38 when you can answer, without looking: why can't
`WHERE` reference an aggregate function, and what's the correct order of
`WHERE`, `GROUP BY`, and `HAVING`?
