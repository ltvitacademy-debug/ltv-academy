# Lesson 37 — SUM, COUNT, DISTINCTCOUNT & Basic Aggregations

**Chapter 5 · DAX Fundamentals · Lesson 6 of 15**

## What you'll learn

- The core aggregation functions you'll reach for constantly
- The difference between COUNT, COUNTA, and COUNTROWS
- Why DISTINCTCOUNT totals don't add up the way you'd expect
- Why these simple functions are the foundation for everything later in the chapter

## The functions you'll use every day

Most measures you write start with one of a small set of aggregation
functions. You've already met `SUM`:

Total Sales = SUM(Sales[SalesAmount])

Its close relatives work the same way — a function name, then a column
to aggregate:

| Function | Returns |
|---|---|
| `SUM` | The total of every numeric value in a column |
| `AVERAGE` | The mean of every numeric value in a column |
| `MIN` / `MAX` | The smallest / largest value in a column |
| `COUNT` | The count of rows with a non-blank *numeric* value in a column |
| `COUNTA` | The count of rows with any non-blank value (numbers, text, or dates) |
| `COUNTROWS` | The count of rows in a table, regardless of blanks |
| `DISTINCTCOUNT` | The count of *distinct* (unique) values in a column |

## COUNT, COUNTA, and COUNTROWS aren't interchangeable

These three look similar but answer different questions:

- **COUNT** only counts numeric values — a text or date column returns 0
  with `COUNT`, which surprises people the first time they hit it.
- **COUNTA** counts any non-blank value, regardless of type — text,
  numbers, or dates all count.
- **COUNTROWS** counts table rows directly, ignoring column content
  entirely — it's the one to reach for when you want "how many rows are
  in this table (or this filtered subset of it)."

A safe default: if you're counting *rows*, use `COUNTROWS`. If you're
specifically counting non-blank values in one column, choose `COUNT` or
`COUNTA` based on whether that column holds numbers or something else.

## DISTINCTCOUNT: unique values, not row counts

`DISTINCTCOUNT` counts how many *distinct* values appear in a column —
useful for questions like "how many unique customers placed an order this
year."

DistinctOrders = DISTINCTCOUNT(ResellerSales_USD[SalesOrderNumber])

Here's the part that catches people off guard: **distinct count totals
don't add up.** If Accessories has 135 distinct orders and Bikes has 345,
the grand total isn't necessarily 480 — it's often lower, because an
order that contains both an accessory and a bike gets counted once in
each category, but only once overall. The category-level numbers count
distinct orders *within that category*; the grand total counts distinct
orders *across the whole dataset*. Both are correct — they're just
answering slightly different questions.

If you need numbers that always add up cleanly to their total, `COUNT` or
`COUNTROWS` will do that — just remember they're counting rows, not
unique values, so they'll give a different (usually larger) number than
`DISTINCTCOUNT`.

## Why this lesson matters more than it looks

Every function in this lesson takes a single column and returns a single
number — about as simple as DAX gets. But they're also the building
block for nearly everything else in this chapter. `CALCULATE`, which
you'll meet in a few lessons, does nothing on its own — it modifies the
filter context that one of *these* aggregation functions then evaluates
against. Get comfortable with SUM, COUNT, and DISTINCTCOUNT now, and the
more advanced functions later will make far more sense.

## Key terms

| Term | Meaning |
|---|---|
| Aggregation function | A function that reduces a column of values to a single summary number |
| Non-additive | A total that isn't simply the sum of its category-level values (true of DISTINCTCOUNT) |

## Lab

1. On **AdventureWorksDW2014**'s `FactInternetSales`, write three
   measures: `SUM(FactInternetSales[SalesAmount])`,
   `AVERAGE(FactInternetSales[SalesAmount])`, and
   `COUNTROWS(FactInternetSales)`.
2. Add a `DISTINCTCOUNT(FactInternetSales[SalesOrderNumber])` measure
   and compare its grand total against your `COUNTROWS` measure —
   confirm they give different numbers, and understand why (one order
   can span multiple rows/products).
3. Try `COUNT` on `FactInternetSales[SalesOrderNumber]` (a text-like
   column) and confirm it returns 0 — then switch it to `COUNTA` and
   watch the difference.

## Check yourself

You're ready for Lesson 38 when you can explain, without checking this
guide, why a DISTINCTCOUNT grand total can be smaller than the sum of
its parts.
