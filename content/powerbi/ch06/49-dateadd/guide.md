# Lesson 49 — DATEADD

**Chapter 6 · Dates & Time Intelligence · Lesson 3 of 5**

## What you'll learn

- What DATEADD returns, and how it differs from a plain date calculation
- Its syntax, and the five interval options
- A worked "same period last year" comparison
- Where DATEADD fits versus the more specific PREVIOUSYEAR/SAMEPERIODLASTYEAR functions

## Shifting a set of dates

`DATEADD` takes whatever dates are in the current context and shifts
every one of them forward or backward by a specified interval:

DATEADD(<dates>, <number_of_intervals>, <interval>)

- **`<dates>`** — a reference to your date table's date column.
- **`<number_of_intervals>`** — how many intervals to shift. Positive
  moves forward in time; negative moves backward.
- **`<interval>`** — one of `year`, `quarter`, `month`, `week`, or
  `day`, written unquoted (it's an enumeration, not a string).

The result is a table of shifted dates — meant to be passed into
`CALCULATE` as a filter, the same pattern you saw with `PREVIOUSQUARTER`
back in Lesson 32.

## A worked example: same month, last year

Sales Prior Year =
CALCULATE(SUM(FactInternetSales[SalesAmount]), DATEADD('DimDate'[FullDateAlternateKey], -1, YEAR))

Whatever month, quarter, or single day is currently in context,
`DATEADD` shifts every one of those dates back exactly one year, and
`CALCULATE` sums sales over that shifted set instead. Compare this
measure against a plain `Total Sales` in a table broken out by month,
and you get a clean, month-by-month year-over-year comparison.

## Why not just subtract 365 days?

`DATEADD` understands calendar units, not fixed day counts. Shifting
back one **year** correctly lands on the same month and day the
following year, regardless of leap years. Shifting back one **month**
correctly handles months of different lengths — end-of-month dates
included: select the last two days of a month, add a month, and
`DATEADD` extends the result to cover the destination month's actual
end, rather than producing a nonsensical date like "February 31st."

## DATEADD vs. the specific shortcuts

DAX also has purpose-built functions for the most common shifts —
`PREVIOUSYEAR`, `PREVIOUSMONTH`, `PREVIOUSQUARTER`, `SAMEPERIODLASTYEAR`,
and their `NEXT*` counterparts. These are shorter to write for exactly
those specific cases. `DATEADD` earns its place when:

- You need a shift that isn't one of those exact cases (three months
  back, two weeks forward).
- You want the interval to be a variable or parameter, decided at
  report time rather than hardcoded.
- You're already comfortable with `DATEADD` and prefer one consistent
  function instead of memorizing several specific ones.

Either approach is correct — pick based on which reads more clearly for
the specific formula you're writing.

## Key terms

| Term | Meaning |
|---|---|
| DATEADD | Shifts a set of dates forward or backward by a specified interval |
| Interval | The unit of the shift: year, quarter, month, week, or day (unquoted) |

## Lab

1. On **AdventureWorksDW2014**, build
   `Sales Prior Year = CALCULATE(SUM(FactInternetSales[SalesAmount]), DATEADD(DimDate[FullDateAlternateKey], -1, YEAR))`.
2. Put it in a table alongside plain `Total Sales`, broken out by
   `DimDate[CalendarYear]` and `DimDate[EnglishMonthName]`, and confirm
   each row's prior-year value matches the actual total from a year
   earlier.
3. Try shifting by `-1, QUARTER` and `-3, MONTH` instead, and confirm
   the results make sense for each interval.

## Check yourself

You're ready for Lesson 50 when you can write a DATEADD-based measure
from memory, including correctly choosing between a positive and
negative interval.
