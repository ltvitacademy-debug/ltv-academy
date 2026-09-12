# Lesson 14 — PivotTable Calculated Fields

**Chapter 4 · PivotTables & PivotCharts · Lesson 14 of 25**

## What you'll learn

- Where the calculated-field feature actually lives in the ribbon, and
  the formula it uses
- The alternate route — Value Field Settings — for a built-in custom
  calculation instead of a fully custom formula
- The real tradeoff between a PivotTable calculated field and a
  calculated column on the source data

## Where calculated fields live

![The PivotTable ribbon's Calculations group, with the Fields, Items, & Sets button.](/courses/excel/ch04/14-pivottable-calculated-fields/xl-14-r-pivottabletools-optionscalculations-1.jpg)
*PivotTable Analyze tab → Calculations group → Fields, Items, & Sets → Calculated Field.*
Source: [Microsoft Support — Calculate values in a PivotTable](https://support.microsoft.com/en-us/office/calculate-values-in-a-pivottable-11f41417-da80-435c-a5c6-b0185e59da77)

With a cell inside the PivotTable selected, the **Analyze** (or
**PivotTable Analyze**) tab's Calculations group has a **Fields, Items,
& Sets** menu — that's where **Calculated Field** opens a small dialog
with a Name box and a Formula box.

```
Name:    Margin %
Formula: =Profit/Revenue
```

A calculated field's formula references other **fields already in the
PivotTable** by name, and operates on their aggregated totals — so
`=Profit/Revenue` computes margin using the *summed* Profit divided by
the *summed* Revenue for each row/column combination, not a row-by-row
average of individual margins. That distinction matters: a margin
percentage calculated this way is mathematically correct at every
level of the PivotTable's grouping, where a plain average of
already-computed row-level percentages would not be.

## The alternate route: Value Field Settings

![A Values-field context menu with Value Field Settings highlighted.](/courses/excel/ch04/14-pivottable-calculated-fields/excel-pivottable-valuefieldsettings.png)
*Right-click any field already in Values to reach the same calculations menu from a different door.*
Source: [Microsoft Support — Create a PivotTable to analyze worksheet data](https://support.microsoft.com/en-us/office/create-a-pivottable-to-analyze-worksheet-data-a9a84538-bfe9-40a9-a8e9-f99134456576)

Not every computed result needs a fully custom formula. Right-clicking
a field already sitting in Values and choosing **Value Field
Settings** opens a **Show Values As** tab with built-in options —
% of Grand Total, % of Column Total, Running Total, and more — with no
formula to write at all:

![A PivotTable showing values as '% of Grand Total' instead of raw sums.](/courses/excel/ch04/14-pivottable-calculated-fields/excel-pivottable-showvaluesas.png)
*The same numeric field, redisplayed as a percentage of the report's grand total — a built-in custom calculation, not a formula.*
Source: [Microsoft Support — Calculate values in a PivotTable](https://support.microsoft.com/en-us/office/calculate-values-in-a-pivottable-11f41417-da80-435c-a5c6-b0185e59da77)

If the built-in "Show Values As" options cover what's needed, they're
simpler and less fragile than a custom calculated field.

## Calculated field vs. calculated column on the source data

Both approaches can produce the same-looking margin percentage — the
real decision is where the calculation should live:

- **Calculated field (inside the PivotTable)**: no changes to the
  source data at all; the formula only exists inside this one
  PivotTable, and it's recalculated correctly at every subtotal level.
  The tradeoff: it's invisible to anyone looking at the raw data, and
  it doesn't exist until someone opens this specific PivotTable.
- **Calculated column (on the source Table)**: every row gets its own
  margin value, visible in the raw data and usable by any formula,
  chart, or other PivotTable built from that Table — but it can't
  correctly represent a ratio-of-sums at a subtotal level the way a
  calculated field can, since a column of per-row percentages, summed
  or averaged, doesn't equal the true blended percentage.

Rule of thumb: use a calculated column when other parts of the
workbook need the per-row value directly; use a calculated field when
the calculation only needs to exist as a summary inside one PivotTable.

## Key terms

| Term | Meaning |
|---|---|
| Calculated field | A formula added inside a PivotTable that operates on the sums of other fields already in the report |
| Show Values As | Built-in computed displays (like % of Grand Total) requiring no custom formula |
| Calculated column | A formula-based column added to the source data itself, visible outside the PivotTable |

## Lab

1. In a PivotTable with two numeric fields (e.g., Profit and Revenue), add a calculated field named "Margin %" with the formula `=Profit/Revenue`.
2. Right-click a Values field and use Value Field Settings → Show Values As to display it as % of Grand Total instead.
3. Decide, for a specific real metric you use, whether it belongs as a calculated field or a calculated column — and explain why in one sentence.

## Check yourself

You're ready for Lesson 15 when you can explain why a calculated
field's ratio-of-sums approach gives a more correct result than
averaging per-row percentages at a subtotal level.
