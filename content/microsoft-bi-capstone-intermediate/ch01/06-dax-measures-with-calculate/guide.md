# Lesson 6 — DAX Measures With CALCULATE

**Chapter 1 · Intermediate Capstone: The Weekly Sales & Fulfillment Report · Lesson 6 of 16**

## What you'll learn

- Writing the base measures this project's two pages both depend on
- Using `CALCULATE` with `DATEADD` for a real week-over-week comparison
- Using `CALCULATE` with `ALL` to build a company-wide benchmark measure
- Why having two similarly-named "Total Sales" measures is a real risk worth knowing about

## The base measures: a step up from plain SUM

The Beginner project's measures were plain aggregations — `SUM`, `DISTINCTCOUNT` — with no filter
manipulation. This project needs more, because "weekly" and "company-wide" both require
**changing the filter context**, not just aggregating whatever's currently visible.

Start with the straightforward ones:

```dax
Total Sales = SUM ( Fact[LineTotal] )

Total Units = SUM ( Fact[OrderQty] )

Order Count = DISTINCTCOUNT ( Fact[SalesOrderID] )

Average Order Value = DIVIDE ( [Total Sales], [Order Count] )
```

`Average Order Value` is already a small step up — wrapping `DIVIDE` instead of writing `/`
directly means a territory or week with zero orders returns a blank instead of a divide-by-zero
error, which matters once slicers can filter a page down to nothing.

## A fulfillment measure, for the Operations Manager

```dax
Avg Days to Ship =
AVERAGEX (
    Fact,
    DATEDIFF ( Fact[OrderDate], Fact[ShipDate], DAY )
)
```

`AVERAGEX` iterates row by row over `Fact`, computes the ship lag for each order line, and
averages the result — this is a row-context calculation, not a simple column aggregation, because
the lag itself has to be computed per row before it can be averaged.

## `CALCULATE` + `DATEADD`: a real week-over-week comparison

```dax
Prior Week Sales =
CALCULATE (
    [Total Sales],
    DATEADD ( 'Date'[Date], -7, DAY )
)
```

This is the first place `CALCULATE` actually earns its keep: it re-evaluates `[Total Sales]`
inside a **shifted** filter context — the same filters currently applied, just moved back seven
days on the `Date` table. This only works correctly because Lesson 5 marked `Date` as the model's
official date table; `DATEADD` depends on that.

## `CALCULATE` + `ALL`: a company-wide benchmark

The Sales Director also wants to see, on the Executive Summary page, what share of total company
sales a selected region represents. That needs a measure that **ignores** the region filter on
purpose:

```dax
Total Sales (All Regions) =
CALCULATE (
    [Total Sales],
    ALL ( TerritoryDim )
)

Pct of Company Total =
DIVIDE ( [Total Sales], [Total Sales (All Regions)] )
```

`ALL ( TerritoryDim )` strips away any filter currently applied through the `TerritoryDim`
relationship — slicers, visuals, anything — and recalculates `[Total Sales]` as if the whole
territory table were unfiltered. That's exactly what a "company-wide" denominator needs.

## A detail worth sitting with

You now have two measures that both start with "Total Sales": the plain one, and
`Total Sales (All Regions)`. With no region filter applied, they return the **exact same number**
— `ALL` has nothing to strip away when nothing is filtered in the first place. They only diverge
once a slicer actually narrows the territory down. Keep that in mind; it matters again later in
this chapter.

## Key terms

| Term | Meaning |
|---|---|
| `CALCULATE` | Evaluates an expression inside a modified filter context |
| `DATEADD` | Shifts a date filter by a given interval, for period comparisons |
| `ALL` | Removes filters on the given table or column, for a benchmark/total figure |
| `AVERAGEX` | Row-by-row iterator that computes an expression per row, then averages it |

## Lab

Add all six measures above to the model, then build a quick test table visual with `TerritoryDim`
on rows and `[Total Sales]` plus `[Total Sales (All Regions)]` as values. Confirm every region
shows a different `[Total Sales]` but the exact same `[Total Sales (All Regions)]` in every row —
that's `ALL` doing its job correctly.

## Check yourself

You're ready for Lesson 7 when you can answer, without looking: what does `ALL ( TerritoryDim )`
actually remove, and why do `[Total Sales]` and `[Total Sales (All Regions)]` return identical
numbers until a region filter is applied?
