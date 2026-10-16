# SUMIFS, COUNTIFS & AVERAGEIFS Quick Reference

Compiled from Chapter 3 (Aggregation & Logic Functions). The argument order is the single most
common mistake moving from SUMIF to SUMIFS — this page exists mainly to stop you guessing it from
muscle memory.

## The pattern, once it clicks, is the same for all three

```
=SUMIFS(sum_range, criteria_range1, criteria1, [criteria_range2, criteria2], ...)
=AVERAGEIFS(avg_range, criteria_range1, criteria1, [criteria_range2, criteria2], ...)
=COUNTIFS(criteria_range1, criteria1, [criteria_range2, criteria2], ...)
```

SUMIFS and AVERAGEIFS put the range being aggregated **first**, then as many criteria-range/
criteria pairs as the question needs. COUNTIFS has no aggregated range at all — it's just pairs,
because counting doesn't need a value column.

## Worked pattern, against this vault's sample dataset

Using `regional-sales-transactions-sample-dataset.csv` (OrderID, OrderDate, Region, SalesRep,
ProductID, Quantity, UnitPrice), once loaded as a Table named `Sales` with a calculated `Revenue`
column (`=[@Quantity]*[@UnitPrice]`):

```
=SUMIFS(Sales[Revenue], Sales[Region], "West", Sales[ProductID], "P-101")
=COUNTIFS(Sales[Region], "West", Sales[ProductID], "P-101")
=AVERAGEIFS(Sales[Revenue], Sales[Region], "West", Sales[ProductID], "P-101")
```

Each extra condition is just one more range/criteria pair — three conditions is six more arguments,
with no practical limit that matters in real work.

## Why this beats a helper column every time

A helper column (`=IF(AND(B2="West", C2="P-101"), 1, 0)` plus a plain `SUM`) works, but it's an
extra column to maintain, re-copy down as rows are added, and explain to whoever inherits the
workbook. SUMIFS does the same job in one cell, recalculates automatically as rows are added to a
real Table, and needs no explanation beyond the formula itself.

## Related course material

- Lesson 9 — SUMIFS, COUNTIFS & AVERAGEIFS
- Lesson 3 — Excel Tables (why this should be built on a Table, not a raw range)
