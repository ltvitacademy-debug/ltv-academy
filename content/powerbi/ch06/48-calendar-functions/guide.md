# Lesson 48 — CALENDAR and Date Functions

**Chapter 6 · Dates & Time Intelligence · Lesson 2 of 5**

## What you'll learn

- How to build a date table from scratch with CALENDAR
- How to make its range track your data automatically
- What CALENDARAUTO does differently
- Why a calculated table needs its own extra columns before it's useful

## Building a date range with CALENDAR

`CALENDAR` returns a table with a single **Date** column, containing
every date between a start and end date, inclusive:

CALENDAR(<start_date>, <end_date>)

The simplest version fixes both ends:

= CALENDAR(DATE(2015, 1, 1), DATE(2021, 12, 31))

That gives you a contiguous run of dates from January 1, 2015 through
December 31, 2021 — one row per day, exactly the shape a date table
needs (Lesson 47).

## Making the range track your data

Hardcoding a date range works, but it silently goes stale — add another
year of sales data, and your fixed range no longer covers it. A more
robust pattern derives the start and end dates from your actual data:

= CALENDAR(MINX(Sales, [Date]), MAXX(Forecast, [Date]))

This builds a calendar spanning from the earliest date anywhere in
`Sales` to the latest date anywhere in `Forecast` — covering both actual
history and future projections, and automatically adjusting as new rows
arrive in either table.

## CALENDARAUTO: even less to specify

`CALENDARAUTO([<fiscal_year_end_month>])` goes a step further: it scans
*every* date column across your entire model and builds a calendar
spanning from the earliest date found to the latest, rounded out to
complete fiscal years. Call it with no argument for a calendar
year-ending December, or pass a month number for a fiscal year ending
some other month.

Use `CALENDARAUTO` when you want a calendar covering literally
everything in your model with no manual range-setting at all;
`CALENDAR` when you want to name a specific range or source deliberately.

## A calculated table is only step one

Either function creates a **calculated table** — you'll see it appear as
a new table in the Fields pane once you enter the formula (via **New
Table**, not **New Column** or **New Measure**). But a bare `Date`
column isn't yet a useful date table: you'll typically add calculated
columns for `Year`, `Quarter`, `Month`, and `MonthName` before marking it
as your date table (Lesson 47) and building hierarchies from it.

Year = YEAR([Date])
Quarter = "Q" & QUARTER([Date])
Month = FORMAT([Date], "MMMM")

## Key terms

| Term | Meaning |
|---|---|
| CALENDAR | Returns a table of contiguous dates between a start and end date |
| CALENDARAUTO | Builds a calendar spanning every date column in the model, rounded to fiscal years |
| Calculated table | A table whose rows are defined by a DAX formula instead of imported data |

## Lab

1. Create a new calculated table using
   `= CALENDAR(DATE(2020,1,1), DATE(2026,12,31))` and confirm it
   produces one row per day.
2. If you've imported **AdventureWorksDW2014**'s `FactInternetSales`,
   try `= CALENDAR(MINX(FactInternetSales, FactInternetSales[OrderDate]), MAXX(FactInternetSales, FactInternetSales[OrderDate]))`
   instead, and confirm the range matches your data exactly.
3. Add `Year`, `Quarter`, and `Month` calculated columns to your new
   date table, following the patterns above.

## Check yourself

You're ready for Lesson 49 when you can explain the difference between
a hardcoded CALENDAR range and one derived from MINX/MAXX — and why the
second is usually the better choice.
