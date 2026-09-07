# Lesson 41 — Iterator Functions: SUMX and Friends

**Chapter 5 · DAX Fundamentals · Lesson 10 of 15**

## What you'll learn

- What makes a function an "iterator," and how that differs from SUM
- SUMX's syntax, with a worked example
- The rest of the X-suffixed family: AVERAGEX, COUNTX, MAXX, MINX, RANKX
- When a plain aggregation isn't enough and you need to iterate instead

## What "iterator" means

`SUM(Sales[Amount])` aggregates a column directly — one column in,
one number out. **Iterator functions** work differently: they walk
through a table **row by row**, evaluate an expression for each row
using that row's own context, and then combine the results. Every
iterator function ends in **X** — `SUMX`, `AVERAGEX`, `COUNTX`, and so
on — which is a useful visual cue once you know to look for it.

## SUMX: the one you'll reach for first

SUMX(<table>, <expression>)

`SUMX` takes a table (or something that returns one) as its first
argument, and an expression to evaluate for every row of that table as
its second. It sums the result of that expression, row by row.

Here's why that matters: sometimes the number you need doesn't already
exist as a column — it has to be calculated per row, *then* summed. A
classic example is revenue that isn't stored directly, only quantity and
unit price:

Total Revenue = SUMX(Sales, Sales[Quantity] * Sales[UnitPrice])

`SUM` can't do this — there's no single column to sum, because the value
you need only exists as a per-row calculation. `SUMX` evaluates
`Quantity * UnitPrice` fresh for every row, then adds up all those
results.

## Combining SUMX with FILTER

`SUMX`'s first argument doesn't have to be a whole table — it can be a
*filtered* subset, built with `FILTER` (which you'll meet properly in
Lesson 43):

NON USA Internet Sales =
SUMX(
    FILTER('InternetSales', RELATED('SalesTerritory'[Country]) <> "United States"),
    'InternetSales'[SalesAmount]
)

This sums `SalesAmount`, but only across the rows `FILTER` lets through —
every row *except* those tied to the United States. `SUM` alone can't
express "sum this, but only for rows matching a complex condition" — that
combination of `SUMX` and `FILTER` is exactly the pattern for it.

## The rest of the X family

Every aggregation function has an iterator counterpart, and they all
follow the same shape — `FUNCTIONX(<table>, <expression>)`:

| Function | Iterates a table and... |
|---|---|
| `AVERAGEX` | ...averages the expression's result across rows |
| `COUNTX` | ...counts rows where the expression returns a valid value |
| `MAXX` / `MINX` | ...finds the largest / smallest expression result |
| `RANKX` | ...ranks each row by the expression's result |

You'll reach for these exactly when the plain (non-X) version can't
express what you need — usually because the value depends on more than
one column, or needs a condition applied row by row.

## When to reach for an iterator

Ask: *does the number I need already exist as one column, or does it
have to be calculated fresh for every row first?* If it's already a
column, plain `SUM`/`AVERAGE`/`COUNT` is simpler and usually faster. If
it has to be computed per row — multiplying two columns together,
applying row-specific logic, filtering to a condition first — reach for
the X version.

## Key terms

| Term | Meaning |
|---|---|
| Iterator function | A function that evaluates an expression row by row across a table, then combines the results |
| SUMX | Sums the result of an expression evaluated for every row of a table |

## Lab

1. On **AdventureWorks2012**'s `Sales.SalesOrderDetail`, write
   `Calculated Revenue = SUMX(Sales.SalesOrderDetail, Sales.SalesOrderDetail[OrderQty] * Sales.SalesOrderDetail[UnitPrice])`
   — the value isn't a single stored column, so SUMX has to calculate
   it per row first.
2. Combine `SUMX` with `FILTER` on **AdventureWorksDW2014** to sum
   `FactInternetSales[SalesAmount]` across only rows where
   `DimSalesTerritory[SalesTerritoryCountry]` isn't "United States"
   (via `RELATED`).
3. Try `AVERAGEX` or `MAXX` on `Sales.SalesOrderDetail` and compare its
   result to what a plain `AVERAGE`/`MAX` on the existing `LineTotal`
   column would give you.

## Check yourself

You're ready for Lesson 42 when you can explain, in one sentence, when
you'd reach for `SUMX` instead of `SUM`.
