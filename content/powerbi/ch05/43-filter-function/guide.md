# Lesson 43 — FILTER & Table Filter Expressions

**Chapter 5 · DAX Fundamentals · Lesson 12 of 15**

## What you'll learn

- What FILTER returns, and how that's different from a Boolean filter
- FILTER's syntax, with a worked example
- Why FILTER is meant to be nested inside other functions, not used alone
- A guideline for when you actually need FILTER versus a simpler Boolean condition

## A function that returns a table

Every filter argument you've written so far — `'Product'[Color] =
"Blue"` — is a **Boolean expression**: it evaluates to true or false for
each row. `FILTER` is different. It **returns an entire table**: a
subset of rows from whatever table you pass it, matching a condition.

FILTER(<table>, <filter>)

- **`<table>`** — the table to filter (or an expression that returns
  one).
- **`<filter>`** — a Boolean condition, evaluated for every row of that
  table.

The result is a table containing only the rows where the condition held
true.

## A worked example

Here's `FILTER` doing what a simple Boolean condition can't — filtering
based on a *related* table's column, not just the table's own columns:

NON USA Internet Sales =
SUMX(
    FILTER('InternetSales', RELATED('SalesTerritory'[Country]) <> "United States"),
    'InternetSales'[SalesAmount]
)

`FILTER` walks every row of `InternetSales`, checks — via `RELATED` — the
country tied to that row's territory, and keeps only the rows where that
country isn't the United States. `SUMX` then sums `SalesAmount` across
exactly that filtered table.

## FILTER is meant to be nested

`FILTER` almost never stands alone in a formula. Its whole purpose is to
be passed *into* something else that expects a table — most often
`CALCULATE` or an iterator like `SUMX`. On its own, a table isn't
something a report visual can display directly the way a single value
can; it needs to feed into an aggregation first.

This is also why `FILTER` pairs so naturally with `CALCULATE`: recall
from Lesson 39 that `CALCULATE`'s filter arguments can be table
expressions, not just Boolean conditions. `FILTER` is how you build
those table expressions when a simple comparison isn't enough.

## When you actually need FILTER

A simple Boolean condition — `'Product'[Color] = "Blue"` directly inside
`CALCULATE` — already works for straightforward, single-column
conditions. Reach for `FILTER` specifically when the condition:

- Depends on a **related table's** column, via `RELATED` (as in the
  example above).
- Combines **multiple conditions** in ways too complex for a simple
  Boolean expression.
- Needs to compare a column against a **calculated value**, not just a
  fixed one.

If a plain Boolean filter argument already expresses what you need,
prefer it — it's simpler to read and, in most cases, more efficient than
wrapping the same condition in `FILTER`.

## Key terms

| Term | Meaning |
|---|---|
| Boolean filter expression | A condition, like `Column = Value`, that evaluates to true or false per row |
| Table filter expression | A filter argument that returns a table of rows, typically built with FILTER |
| RELATED | Retrieves a value from a related table, usable inside FILTER's condition |

## Lab

1. On **AdventureWorksDW2014**, write
   `COUNTROWS(FILTER(FactInternetSales, FactInternetSales[SalesAmount] > 2000))`
   to count how many order lines exceeded $2,000.
2. Import `DimSalesTerritory` and write a `FILTER` condition on
   `FactInternetSales` that uses `RELATED` to check
   `DimSalesTerritory[SalesTerritoryCountry] <> "United States"`.
3. Combine that `FILTER` expression with `SUMX` to produce a
   `Non-US Sales` measure, following the pattern in this lesson.

## Check yourself

You're ready for Lesson 44 when you can explain, in one sentence, why
FILTER is almost always nested inside another function rather than used
by itself.
