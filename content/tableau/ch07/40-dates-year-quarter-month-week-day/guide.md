# Lesson 40 — Dates: Year, Quarter, Month, Week & Day

**Chapter 7 · Time Series & Table Calculations · Lesson 40 of 95**

## What you'll learn

- The difference between a **date part** and a **date value** — Tableau's
  two ways of breaking a date field down
- How to change a date field's level (Year, Quarter, Month, Week, Day,
  or Exact Date) right from its context menu
- Why this choice changes what your view actually shows, not just how
  it's labeled
- How this maps onto the `DATEPART()` / `YEAR()` / `MONTH()` T-SQL
  functions you already know from T-SQL Development

## Date parts vs. date values

You already know how to pull a piece out of a date in SQL —
`YEAR(OrderDate)`, `DATEPART(quarter, OrderDate)`, and so on. Tableau
gives you the same idea through its own field menu, but it splits it
into two distinct behaviors that don't have a single clean SQL
equivalent, and mixing them up is one of the most common beginner
mistakes in Tableau:

- **Date Parts** give you data aggregated to the level of a specific
  part of a date, ignoring everything above it. "Month" as a date part
  means *any* May, from any year, lumped together — May 2022 and May
  2023 sales get added into the same "May" bucket.
- **Date Values** give you the actual date, truncated to a specific
  level. "Month" as a date value means May 2022 is its own bucket,
  separate from May 2023 — this is the equivalent of SQL's
  `DATETRUNC('month', OrderDate)`.

Right-click any date field already on a shelf and you'll see both
options laid out in the same menu:

![Tableau date field context menu showing the Date Parts section highlighted, with Year, Quarter, Month, Day, and More listed above the divider.](/courses/tableau/ch07/40-dates-year-quarter-month-week-day/date-parts-menu.png)
*Date Parts — Year, Quarter, Month, Day. Choosing "Month" here bins every May together, regardless of year.*
Source: [Tableau Help — Change Date Levels](https://help.tableau.com/current/pro/desktop/en-us/dates_levels.htm)

![The same Tableau date field context menu, now showing the Date Values section highlighted: Year 2015, Quarter Q2 2015, Month May 2015, Week Number, and Day May 8 2015, with Exact Date below.](/courses/tableau/ch07/40-dates-year-quarter-month-week-day/date-values-menu.png)
*Date Values — Year 2015, Quarter Q2 2015, Month May 2015, Week Number, Day May 8 2015. Each bucket is tied to its actual calendar position.*
Source: [Tableau Help — Change Date Levels](https://help.tableau.com/current/pro/desktop/en-us/dates_levels.htm)

## Year, Quarter, Month, Week & Day — the five levels you'll use constantly

Both sections offer the same five core levels, just with different
behavior:

| Level | As a Date Part | As a Date Value |
|---|---|---|
| **Year** | Identical either way — there's only one "2015" | 2015 |
| **Quarter** | Q1/Q2/Q3/Q4, any year combined | Q2 2015 |
| **Month** | January-December, any year combined | May 2015 |
| **Week** | Week number 1-52/53, any year combined | Week 5, 2015 |
| **Day** | Day of month 1-31, any month/year combined | May 8, 2015 |

Below all of that sits **Exact Date**, which gives you the most
granular, row-level date — the untouched original value, exactly like
selecting the raw `OrderDate` column in a SQL query with no function
applied.

## Why this choice matters

Pick the wrong one and your chart tells the wrong story. Put "Month"
as a **date part** on Columns and every year's May, June, and July get
mashed into the same twelve columns — perfect for answering "which
month of the year do we sell the most, regardless of year?" Put
"Month" as a **date value** on Columns instead, and you get a
continuously growing timeline — May 2022, June 2022, ... May
2023 — perfect for answering "how did sales trend over time?" Lesson
41 goes deeper on that second behavior specifically.

## Key terms

| Term | Meaning |
|---|---|
| Date Part | A date broken into a cyclical component (month, quarter, day of week) with the surrounding year(s) ignored |
| Date Value | A date truncated to a level but still anchored to its real calendar position |
| Exact Date | The full, ungrouped, row-level date value |
| Date level | Tableau's term for whichever of the above is currently applied to a date field |

## Lab

1. Connect to Sample Superstore, drag **Order Date** to Columns.
2. Right-click the field, choose **Month** under the Date Parts section — note the header reads "January" through "December," with no year.
3. Undo, then right-click again and choose **Month** under the Date Values section this time — note the headers now read "January 2020," "February 2020," and so on, continuing across years.
4. Try **Week Number** and **Exact Date** too, and watch how the row count and header labels change each time.

## Check yourself

You're ready for Lesson 41 when you can explain, in one sentence, why
choosing "Month" as a Date Part gives you 12 columns no matter how
many years of data you have, while choosing "Month" as a Date Value
gives you one column per calendar month across every year.
