# Power BI DAX Quick Reference

A one-page reference to every DAX function this course teaches in depth
(Chapters 5–6), organized the way you'll actually reach for them —
not alphabetically. Each entry shows the syntax and the course's own
worked example, so you can copy the shape and adapt it to your own
tables.

## The foundation: CALCULATE

```dax
CALCULATE(<expression>, <filter1>, <filter2>, ...)
```

Evaluates `<expression>` inside a *modified* filter context. Almost
every other function below is either a shortcut for a specific
`CALCULATE` pattern, or a filter argument you pass into one.

```dax
Blue Revenue = CALCULATE(SUM(Sales[SalesAmount]), 'Product'[Color] = "Blue")
```

- A filter on a column that **isn't** already filtered gets added.
- A filter on a column that **is** already filtered **overwrites** it —
  this is CALCULATE's default, and it's what makes it powerful.

## Iterator functions — the "X" family

Aggregate row by row instead of straight off one column. Reach for
these when the number you need isn't already a stored column — it has
to be calculated fresh per row first.

```dax
SUMX(<table>, <expression>)
AVERAGEX(<table>, <expression>)
COUNTX(<table>, <expression>)
MAXX(<table>, <expression>)
MINX(<table>, <expression>)
RANKX(<table>, <expression>[, <value>][, <order>][, <ties>])
```

```dax
Total Revenue = SUMX(Sales, Sales[Quantity] * Sales[UnitPrice])

NON USA Internet Sales =
SUMX(
    FILTER('InternetSales', RELATED('SalesTerritory'[Country]) <> "United States"),
    'InternetSales'[SalesAmount]
)
```

## Filter modifier functions

Change *how* filtering behaves, rather than adding a plain condition.

```dax
REMOVEFILTERS([<table/column>, ...])     -- clears filters
KEEPFILTERS(<filter>)                     -- intersects instead of overwriting
USERELATIONSHIP(<col1>, <col2>)           -- activates an inactive relationship
CROSSFILTER(<col1>, <col2>, <direction>)  -- changes direction for one calc
```

```dax
%Sales = DIVIDE([Total Sales], CALCULATE([Total Sales], REMOVEFILTERS()))

Sales by Ship Date =
CALCULATE(SUM(Sales[SalesAmount]), USERELATIONSHIP(Sales[ShipDateKey], 'Date'[DateKey]))
```

## ALL and ALLEXCEPT — removing filters on purpose

```dax
ALL()                        -- removes every filter, everywhere
ALL(<table>)                 -- removes all filters from a table
ALL(<column>, ...)            -- removes filters from just those columns
ALLEXCEPT(<table>, <column>, ...)  -- removes every filter EXCEPT the columns named
```

```dax
All Reseller Sales Ratio =
SUMX(ResellerSales, ResellerSales[SalesAmount])
/ SUMX(ALL(ResellerSales), ResellerSales[SalesAmount])
```

Choose `ALL(columns)` when the few columns to *clear* are the shorter
list; choose `ALLEXCEPT` when the few columns to *keep* are the shorter
list.

## ALLSELECTED — respecting the user's own selections

```dax
ALLSELECTED([<table/column>, ...])
```

Removes filters created by the *visual's own layout* (its row/column
breakdown) but keeps filters applied outside it — slicers, report-level
filters. This is the function behind "visual totals" and "% of visible
total." `ALL` ignores everything, including slicers; `ALLSELECTED`
respects them.

## Time intelligence — all of it routes through CALCULATE + a date table

```dax
DATEADD(<dates>, <number_of_intervals>, <interval>)       -- year/quarter/month/week/day
TOTALYTD(<expr>, <dates>[, <filter>][, <year_end_date>])
TOTALMTD(<expr>, <dates>[, <filter>])
TOTALQTD(<expr>, <dates>[, <filter>])
DATESYTD(<dates>[, <year_end_date>])                       -- the table TOTALYTD builds for you
DATESBETWEEN(<dates>, <StartDate>, <EndDate>)
```

```dax
Sales Prior Year =
CALCULATE(SUM(FactInternetSales[SalesAmount]), DATEADD(DimDate[FullDateAlternateKey], -1, YEAR))

Sales YTD = TOTALYTD(SUM(FactInternetSales[SalesAmount]), DimDate[FullDateAlternateKey])

-- Spell DATESYTD out when you need a SECOND filter alongside the YTD restriction —
-- TOTALYTD only accepts one:
Sales YTD (Non-US) =
CALCULATE(
    SUM(FactInternetSales[SalesAmount]),
    DATESYTD(DimDate[FullDateAlternateKey]),
    DimSalesTerritory[SalesTerritoryCountry] <> "United States"
)

-- Life-to-date, no calendar pattern at all:
Customers LTD =
CALCULATE(
    DISTINCTCOUNT(FactInternetSales[CustomerKey]),
    DATESBETWEEN(DimDate[FullDateAlternateKey], BLANK(), MAX(DimDate[FullDateAlternateKey]))
)
```

`DATEADD` shifts by a calendar interval (handles leap years and
month-end dates correctly — never subtract a fixed number of days
instead). `TOTALYTD`/`MTD`/`QTD` are shorthand for `CALCULATE` +
`DATESYTD`/etc. `DATESBETWEEN` is for a custom range with no fixed
calendar pattern, like a life-to-date total.

## Variables, and the one habit worth adopting everywhere

```dax
VAR <name> = <expression>
RETURN <expression using name>
```

```dax
Sales YoY Growth % =
VAR SalesPriorYear =
    CALCULATE([Sales], PARALLELPERIOD('Date'[Date], -12, MONTH))
RETURN
    DIVIDE(([Sales] - SalesPriorYear), SalesPriorYear)
```

`VAR`/`RETURN` computes a subexpression once and reuses the name —
faster than repeating the same expression twice, and self-documenting.

```dax
DIVIDE(<numerator>, <denominator>[, <alternate result>])
```

Use `DIVIDE` instead of the plain `/` operator in every report-facing
measure — it returns blank (or a value you choose) instead of erroring
when the denominator is zero.

## A five-point checklist before you ship a measure

1. Named clearly (`Sales YoY Growth %`, not `Measure 3`).
2. Any subexpression used twice is pulled into a `VAR`.
3. Division uses `DIVIDE`, not `/`.
4. Column references are fully qualified, even within the same table.
5. Filter arguments are as simple as the requirement allows — reach for
   `FILTER` only when a plain Boolean condition genuinely isn't enough.

*Compiled from this course's Chapter 5 (DAX Fundamentals) and Chapter 6
(Dates & Time Intelligence) lessons — every function and example above
is one this course actually teaches, not a reinvented list.*
