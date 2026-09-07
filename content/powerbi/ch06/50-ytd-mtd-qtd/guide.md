# Lesson 50 — YTD, MTD & QTD

**Chapter 6 · Dates & Time Intelligence · Lesson 4 of 5**

## What you'll learn

- What a running total "to date" means, in plain terms
- TOTALYTD, TOTALMTD, and TOTALQTD, with worked examples
- How to shift a fiscal year's end date away from December 31
- Why these functions are shorthand, and what they're shorthand for

## Running totals that reset on a schedule

A **year-to-date** (YTD) total accumulates from the start of the year up
through whatever date is currently in context — then resets back to zero
at the start of the next year. Month-to-date and quarter-to-date work the
same way, just on shorter cycles. These are some of the most requested
calculations in business reporting, and DAX has purpose-built functions
for exactly this.

## TOTALYTD

TOTALYTD(<expression>, <dates>[, <filter>][, <year_end_date>])

= TOTALYTD(SUM(FactInternetSales[SalesAmount]), DimDate[FullDateAlternateKey])

Put this measure in a table broken out by month, and each row shows the
running sum of sales from January 1st through the end of that month —
not just that month's own total. In March, it shows January + February +
March combined; reset to zero again come January of the next year.

## TOTALMTD and TOTALQTD: same idea, shorter cycles

TOTALMTD(<expression>, <dates>[, <filter>])
TOTALQTD(<expression>, <dates>[, <filter>])

These follow the identical pattern, just resetting monthly or quarterly
instead of yearly:

= TOTALMTD(SUM(FactInternetSales[SalesAmount]), DimDate[FullDateAlternateKey])
= TOTALQTD(SUM(FactInternetSales[SalesAmount]), DimDate[FullDateAlternateKey])

Broken out by day, `TOTALMTD` climbs steadily through the month and
resets on the first of the next one; `TOTALQTD` does the same across
each three-month quarter.

## Handling a fiscal year that isn't January–December

Many businesses run a fiscal year starting somewhere other than
January. `TOTALYTD`'s optional `year_end_date` parameter handles this —
specify the *last* day of your fiscal year, and everything recalculates
around it:

= TOTALYTD(SUM(FactInternetSales[SalesAmount]), DimDate[FullDateAlternateKey], "6/30")

With a fiscal year ending June 30th, this measure's "year" runs from
July 1st through June 30th instead of the calendar year — useful for any
organization whose fiscal calendar doesn't match the calendar year.

## What these functions are shorthand for

`TOTALYTD(<expr>, <dates>)` is exactly equivalent to
`CALCULATE(<expr>, DATESYTD(<dates>))` — `TOTALYTD` just saves you the
extra typing for the single most common case. Every optional filter
argument it accepts gets passed straight through to that underlying
`CALCULATE`. Understanding this equivalence matters for Lesson 51, where
you'll use `DATESYTD` directly for cases `TOTALYTD` can't quite reach.

## Key terms

| Term | Meaning |
|---|---|
| TOTALYTD | A running total from the start of the year through the current context, resetting yearly |
| TOTALMTD / TOTALQTD | The same pattern, resetting monthly or quarterly |
| Fiscal year end | An optional parameter shifting the "year" boundary away from December 31 |

## Lab

1. On **AdventureWorksDW2014**, build
   `Sales YTD = TOTALYTD(SUM(FactInternetSales[SalesAmount]), DimDate[FullDateAlternateKey])`
   and put it in a table broken out by month, alongside plain
   `Total Sales`. Confirm the YTD column climbs through the year and
   resets in January.
2. Build the equivalent `TOTALMTD` and `TOTALQTD` measures, broken out
   by day, and observe their shorter reset cycles.
3. Rebuild your `Sales YTD` measure with a `year_end_date` of `"6/30"`
   and confirm the "year" boundary shifts to match a July–June fiscal
   calendar.

## Check yourself

You're ready for Lesson 51 when you can state the CALCULATE + DATESYTD
equivalent of a TOTALYTD measure from memory.
