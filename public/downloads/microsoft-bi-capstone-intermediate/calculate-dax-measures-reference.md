# Weekly Sales & Fulfillment Report — DAX Measures Reference

Intermediate Capstone, Lesson 6: "DAX Measures With CALCULATE." All six real
measures from the lesson, in the order you build them.

## Base measures

```dax
Total Sales = SUM ( Fact[LineTotal] )

Total Units = SUM ( Fact[OrderQty] )

Order Count = DISTINCTCOUNT ( Fact[SalesOrderID] )

Average Order Value = DIVIDE ( [Total Sales], [Order Count] )
```

`DIVIDE` instead of `/` means a territory or week with zero orders returns
blank instead of a divide-by-zero error once slicers can filter a page down
to nothing.

## Fulfillment measure (for the Operations Manager)

```dax
Avg Days to Ship =
AVERAGEX (
    Fact,
    DATEDIFF ( Fact[OrderDate], Fact[ShipDate], DAY )
)
```

`AVERAGEX` iterates row by row, computes the ship lag per order line, then
averages the result — a row-context calculation, not a simple aggregation.

## Week-over-week comparison

```dax
Prior Week Sales =
CALCULATE (
    [Total Sales],
    DATEADD ( 'Date'[Date], -7, DAY )
)
```

Requires `Date` to be marked as the model's official date table (Lesson 5) —
`DATEADD` depends on it. Re-evaluates `[Total Sales]` inside a filter context
shifted back seven days.

## Company-wide benchmark

```dax
Total Sales (All Regions) =
CALCULATE (
    [Total Sales],
    ALL ( TerritoryDim )
)

Pct of Company Total =
DIVIDE ( [Total Sales], [Total Sales (All Regions)] )
```

`ALL ( TerritoryDim )` strips away any filter currently applied through the
`TerritoryDim` relationship, recalculating `[Total Sales]` as if the whole
territory table were unfiltered — exactly what a company-wide denominator
needs.

## The detail worth remembering

`[Total Sales]` and `[Total Sales (All Regions)]` return the **exact same
number** until a region filter is actually applied — `ALL` has nothing to
strip away when nothing is filtered yet. That's precisely the coincidence
behind the bug in Lessons 10–12 (see `debugging-playbook.md` in this same
download).

## Quick self-check

- [ ] Every region shows a different `[Total Sales]` in a test table visual
- [ ] Every region shows the **same** `[Total Sales (All Regions)]`
- [ ] You can explain why those two statements are both true
