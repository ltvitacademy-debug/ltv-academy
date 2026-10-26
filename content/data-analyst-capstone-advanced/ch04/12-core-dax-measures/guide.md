# Lesson 12 — Core DAX Measures

**Chapter 4 · The Power BI Operational Dashboard · Lesson 12 of 26**

## What you'll learn

- The base measures this model's Executive Summary and Regional
  Drill-Down pages both depend on
- `DIVIDE` instead of `/`, and why it matters once a slicer can filter
  a page down to zero rows
- `CALCULATE` + `ALL` to build a real company-wide benchmark measure —
  the exact figure Chapter 6's Excel reconciliation will later be
  checked against
- Why having both `[Total Sales]` and `[Total Sales (All Territories)]`
  is a real, useful risk worth understanding, not a naming accident

## The base measures

```dax
Total Sales = SUM ( FactProductSales[LineTotal] )

Total Units = SUM ( FactProductSales[OrderQty] )

Order Count = DISTINCTCOUNT ( FactProductSales[SalesOrderID] )

Average Order Value = DIVIDE ( [Total Sales], [Order Count] )
```

`Order Count` uses `DISTINCTCOUNT` on `SalesOrderID`, not a plain row
count — `dw.FactProductSales` is at the order-*line* grain, so a
simple `COUNTROWS` would count line items, not orders. Counting
distinct `SalesOrderID` values is what actually answers "how many
orders," at the right grain, for a fact table built one row per line.

`Average Order Value` wraps `DIVIDE` instead of writing `[Total
Sales] / [Order Count]` directly. `DIVIDE` returns a blank instead of
throwing a divide-by-zero error when a slicer filters a territory or
date range down to zero orders — a real situation this dashboard will
hit the moment someone clicks a slicer combination with no matching
data.

## The company-wide benchmark: CALCULATE + ALL

The Executive Summary page needs to show what share of total company
sales a selected territory represents — which means one measure has
to **ignore** whatever territory filter is currently applied, on
purpose:

```dax
Total Sales (All Territories) =
CALCULATE (
    [Total Sales],
    ALL ( DimTerritory )
)

Pct of Company Total =
DIVIDE ( [Total Sales], [Total Sales (All Territories)] )
```

`ALL ( DimTerritory )` strips away any filter currently applied
through the `DimTerritory` relationship — a slicer, a visual, a
drill-down click — and recalculates `[Total Sales]` as though the
whole territory table were unfiltered. That's exactly what a
company-wide denominator needs, and it's the same real pattern — a
clean `CALCULATE` + `ALL` benchmark measure — used earlier in this
career path's Intermediate capstone.

## A detail worth sitting with

With no territory filter applied anywhere on a report page,
`[Total Sales]` and `[Total Sales (All Territories)]` return the
**exact same number** — `ALL` has nothing to strip away when nothing
is filtered in the first place. They only diverge once a slicer or a
drill-down click actually narrows the territory down. This isn't a
bug or a naming coincidence to ignore; it's the expected behavior of
the technique, and it's worth testing for yourself before trusting
either measure on a real dashboard page.

## Why this measure matters again, later

`[Total Sales (All Territories)]`, evaluated with no filters applied
at all, is the real company-wide quarterly total this capstone's
Power BI dashboard produces. Chapter 6 builds Finance's own Excel
total completely independently, and Chapter 7 is built entirely around
what happens when those two numbers — this one, and Finance's — don't
match. Get this measure right now; you'll need its exact value again.

## Key terms

| Term | Meaning |
|---|---|
| `DISTINCTCOUNT` | Counts unique values in a column, used here to count orders correctly from a line-grain fact table |
| `DIVIDE` | A safe division function that returns blank instead of erroring on division by zero |
| `CALCULATE` + `ALL` | Re-evaluates a measure with filters on the named table removed, producing an unfiltered benchmark |

## Lab

1. Add all five measures above to your Power BI model.
2. Build a table visual with `DimTerritory[TerritoryName]` on rows and
   `[Total Sales]` plus `[Total Sales (All Territories)]` as values.
   Confirm every territory shows a different `[Total Sales]` but the
   exact same `[Total Sales (All Territories)]` in every row.
3. Add `[Pct of Company Total]` to the same visual and confirm the
   percentages across all territories sum to 100%.

## Check yourself

You're ready for Lesson 13 when you can explain what `ALL (
DimTerritory )` actually removes, why `[Total Sales]` and `[Total
Sales (All Territories)]` return identical numbers until a territory
filter is applied, and why `Order Count` uses `DISTINCTCOUNT` instead
of a plain row count.
