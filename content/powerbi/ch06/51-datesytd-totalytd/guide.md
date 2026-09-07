# Lesson 51 — DATESYTD, TOTALYTD & DATESBETWEEN

**Chapter 6 · Dates & Time Intelligence · Lesson 5 of 5**

## What you'll learn

- Why DATESYTD gives you more flexibility than TOTALYTD alone
- A case where that flexibility actually matters
- DATESBETWEEN, for date ranges that don't follow a fixed calendar pattern
- A closing recap of everything this chapter covered

## DATESYTD: the table TOTALYTD builds for you

Lesson 50 showed that `TOTALYTD(<expr>, <dates>)` is shorthand for
`CALCULATE(<expr>, DATESYTD(<dates>))`. Writing it the long way — with
`DATESYTD` explicit — matters when you need to combine the year-to-date
filter with *other* filter arguments in the same `CALCULATE` call:

Sales YTD (Non-US) =
CALCULATE(
    SUM(FactInternetSales[SalesAmount]),
    DATESYTD(DimDate[FullDateAlternateKey]),
    DimSalesTerritory[SalesTerritoryCountry] <> "United States"
)

`TOTALYTD` only accepts a *single* additional filter argument. Once you
need two or more conditions alongside the year-to-date restriction,
`CALCULATE` with `DATESYTD` spelled out gives you room for as many as
you need.

## DATESYTD also takes the same fiscal year option

DATESYTD(<dates>[, <year_end_date>])

Just like `TOTALYTD`, `DATESYTD` accepts an optional fiscal year-end
date — same idea, same syntax, just returning the table directly instead
of wrapping it in `CALCULATE` for you.

## DATESBETWEEN: a custom range, not a calendar pattern

Every function so far — `DATEADD`, `TOTALYTD`, `DATESYTD` — works around
a fixed calendar pattern: a year, a month, a quarter. `DATESBETWEEN`
does something different: it returns every date between two specific
dates you name, with no calendar pattern involved at all.

DATESBETWEEN(<dates>, <StartDate>, <EndDate>)

## A worked example: life-to-date

A common use is a **life-to-date** total — everything accumulated since
the very beginning of your data, however the report happens to be
filtered:

Customers LTD =
CALCULATE(
    DISTINCTCOUNT(FactInternetSales[CustomerKey]),
    DATESBETWEEN(DimDate[FullDateAlternateKey], BLANK(), MAX(DimDate[FullDateAlternateKey]))
)

Passing `BLANK()` as the start date tells `DATESBETWEEN` to use the
earliest date in the table automatically. `MAX(DimDate[...])` returns
the latest date currently in context. Together, this measure always
spans from the true beginning of the data through whatever end point
the report is filtered to — a running distinct-customer count since day
one.

## Closing recap: five lessons, one foundation

| Lesson | What it added |
|---|---|
| 47 | A real date table — the thing every other function in this chapter needs |
| 48 | Building one from scratch with CALENDAR / CALENDARAUTO |
| 49 | DATEADD — shifting a set of dates by a calendar interval |
| 50 | TOTALYTD / TOTALMTD / TOTALQTD — the common running-total shortcuts |
| 51 | DATESYTD and DATESBETWEEN — the flexible, spelled-out versions |

Every function here follows the same shape you learned back in Chapter
5: a table of dates, passed to `CALCULATE` as a filter argument. Time
intelligence isn't a separate skill from `CALCULATE` — it's `CALCULATE`,
applied to dates specifically.

## Key terms

| Term | Meaning |
|---|---|
| DATESYTD | Returns the year-to-date table directly, for combining with other CALCULATE filters |
| DATESBETWEEN | Returns dates between two specific start and end dates, with no calendar pattern |
| Life-to-date | A running total since the earliest date in the data, to whatever end point is in context |

## Lab

1. On **AdventureWorksDW2014**, build the `Sales YTD (Non-US)` measure
   above, combining `DATESYTD` with a `DimSalesTerritory` filter in the
   same `CALCULATE` call.
2. Build the `Customers LTD` measure using `DATESBETWEEN`, and confirm
   it keeps climbing as you move a date slicer forward, never resetting.
3. Compare `Customers LTD` against a plain `DISTINCTCOUNT` measure with
   no date filtering at all — confirm they match only when the slicer
   covers the entire date range.

## Check yourself

Chapter 6 is complete when you can explain why `DATESYTD` (spelled out)
sometimes does something `TOTALYTD` (the shortcut) can't — and build a
`DATESBETWEEN`-based life-to-date measure from memory.
