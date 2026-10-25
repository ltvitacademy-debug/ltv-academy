# Lesson 41 — GROUPING SETS

**Chapter 5 · Grouping and Aggregating · Lesson 11 of 12**

## What you'll learn

- What `GROUPING SETS` adds beyond `ROLLUP` and `CUBE`
- Specifying an exact, custom list of subtotal combinations
- Using `()` for a grand-total-only row
- How `ROLLUP` and `CUBE` are really just `GROUPING SETS` shorthand

## The problem: ROLLUP and CUBE don't let you choose

`ROLLUP (Color, Size)` only ever gives you one fixed hierarchy of
subtotals. `CUBE (Color, Size)` goes the other way and gives you **every**
possible combination — the full power set, whether you want all of it or
not:

```sql
USE AdventureWorks2012;
GO

-- CUBE gives FOUR levels for two columns, including a "Size alone"
-- subtotal you might not actually want in this particular report.
SELECT Color, Size, SUM(ListPrice) AS TotalListPrice
FROM Production.Product
GROUP BY CUBE (Color, Size);
```

Sometimes a report needs something in between: a specific, hand-picked
list of subtotals that is neither ROLLUP's hierarchy nor CUBE's full power
set.

## GROUPING SETS: say exactly what you want

```sql
SELECT
    Color,
    Size,
    SUM(ListPrice) AS TotalListPrice,
    COUNT(*) AS ProductCount
FROM Production.Product
GROUP BY GROUPING SETS (
    (Color, Size),
    (Color),
    ()
);
```

This lists exactly three grouping sets: full `(Color, Size)` detail rows,
a `Color`-only subtotal, and an empty `()` grand total. Notice what's
**missing** compared to `CUBE` above: there is no `Size`-alone subtotal,
because we never asked for one. `GROUPING SETS` returns the union of every
combination you list — nothing more, nothing inferred.

## Reading mixed combinations with GROUPING_ID

Lesson 42's `GROUPING_ID()` still works exactly the same way here, since
it's really measuring the same underlying mechanism:

```sql
SELECT
    Color,
    Size,
    SUM(ListPrice) AS TotalListPrice,
    GROUPING_ID(Color, Size) AS SubtotalLevel
FROM Production.Product
GROUP BY GROUPING SETS (
    (Color, Size),
    (Color),
    ()
)
ORDER BY GROUPING_ID(Color, Size);
```

## ROLLUP and CUBE are shorthand for GROUPING SETS

This is the detail that makes all three keywords click into place together:
`ROLLUP` and `CUBE` aren't separate features from `GROUPING SETS` — they're
convenience shorthand that SQL Server expands into a particular list of
grouping sets automatically.

```sql
-- These two statements return identical result sets:
GROUP BY ROLLUP (Color, Size);
GROUP BY GROUPING SETS ((Color, Size), (Color), ());

-- And these two are identical as well:
GROUP BY CUBE (Color, Size);
GROUP BY GROUPING SETS ((Color, Size), (Color), (Size), ());
```

`ROLLUP` always expands to the hierarchy; `CUBE` always expands to the full
power set. `GROUPING SETS` is the one notation that can reproduce either of
those — or any other custom list you need.

## Key terms

| Term | Meaning |
|---|---|
| `GROUP BY GROUPING SETS (...)` | Returns the union of exactly the grouping combinations you list, nothing more |
| `()` | An empty grouping set — a grand total row with no grouping columns |
| ROLLUP/CUBE as shorthand | `ROLLUP`/`CUBE` are convenience notations that expand into a specific, fixed list of grouping sets |

## Lab

Run the `Color`/`Size` `GROUPING SETS` query above against
AdventureWorks2012. Then add `(Size)` as a fourth grouping set in the list
and confirm the result now matches `CUBE (Color, Size)` exactly.

## Check yourself

You're ready for Lesson 42 when you can answer, without looking: what's the
main difference between `GROUPING SETS` and both `ROLLUP` and `CUBE`, and
how would you write a `GROUPING SETS` list that reproduces
`CUBE (Color, Size)`?
