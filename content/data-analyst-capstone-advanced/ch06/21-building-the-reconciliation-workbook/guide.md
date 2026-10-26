# Lesson 21 — Building the Reconciliation Workbook

**Chapter 6 · The Finance Reconciliation Workbook · Lesson 21 of 26**

## What you'll learn

- How to import Lesson 20's CSV export into Excel with Power Query
- How to build a PivotTable summarizing sales by territory and
  category from that import
- How to write a `SUMIFS` formula totaling one specific quarter, the
  real formula Finance uses to check the quarter's grand total
- Why this formula is written exactly the way a careful,
  non-technical Excel user would actually write it

## Importing with Power Query

**Data → Get Data → From File → From Text/CSV**, select Lesson 20's
export, and load it into the workbook as a proper **Table** (not just
pasted values) named `Data`. Using Power Query instead of a plain
paste matters for one real reason: the import step can be refreshed
later — **Data → Refresh All** — against a newer export, without
rebuilding the PivotTable or any formula on top of it.

## Building the PivotTable

**Insert → PivotTable**, source set to the `Data` table, with
`TerritoryName` on Rows, `CategoryName` on Columns, and `LineTotal`
summed in Values. This gives Finance the same kind of territory/
category breakdown Power BI's Regional Drill-Down page gives
Executives — built completely independently, from a flat CSV instead
of a modeled star schema, using nothing but Excel's own built-in
summarization.

## The real check: a SUMIFS quarter total

Finance's actual job is narrower than a PivotTable: confirm the
**grand total for the quarter** matches what Power BI and Tableau are
both showing. For Q3 2013 (July through September), Finance writes:

```
=SUMIFS(
    Data[LineTotal],
    Data[OrderDate], ">=" & DATE(2013,7,1),
    Data[OrderDate], "<=" & DATE(2013,10,1)
)
```

This reads, in plain English, as "every line where the order date is
on or after July 1st, and on or before October 1st" — which matches
how a calendar quarter is described in ordinary conversation: "July
through the start of October." `SUMIFS` takes a sum range followed by
any number of criteria-range/criteria pairs, and this formula uses
exactly two: a lower bound and an upper bound on `Data[OrderDate]`,
both built from `DATE()` so Excel compares them as real dates rather
than text.

## Why this formula looks completely reasonable

There is nothing obviously wrong with this formula on its face. It
uses `SUMIFS` correctly, it references real columns, and it produces
*a* number. Every criterion compiles, every range is spelled right,
and a quick glance at the PivotTable built earlier in this lesson
won't reveal anything alarming either. That's exactly what makes this
formula worth building carefully and examining later rather than
trusting on sight — a mistake doesn't have to look like a mistake to
be one, and this capstone is about to test that directly.

## Key terms

| Term | Meaning |
|---|---|
| Power Query | Excel's data-import and transformation engine, supporting refreshable imports instead of static pastes |
| `SUMIFS` | Sums a range subject to one or more criteria-range/criteria pairs |
| Grand total | The single aggregate figure Finance checks against the other two deliverables, as opposed to the PivotTable's full breakdown |

## Lab

1. Import your Lesson 20 CSV export with Power Query as a `Data`
   table.
2. Build the territory-by-category PivotTable described above.
3. Write the `SUMIFS` formula above for your own warehouse's Q3 (or
   whichever quarter has the most data), and record the resulting
   number — you'll need it again next lesson.

## Check yourself

You're ready for Lesson 22 when you can write this `SUMIFS` formula
from memory, explain what each of its three arguments does, and
explain why a formula that "looks completely reasonable" still needs
to be checked against independent numbers rather than trusted on
sight.
