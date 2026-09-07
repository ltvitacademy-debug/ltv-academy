# Lesson 36 — Measures vs. Calculated Columns

**Chapter 5 · DAX Fundamentals · Lesson 5 of 15**

## What you'll learn

- A direct, side-by-side comparison of measures and calculated columns
- A simple decision rule for choosing between them
- Why the wrong choice usually still "works" — just badly
- A few scenarios worked through explicitly

## Same language, two different jobs

Both calculated columns and measures are written in DAX. Side by side,
they can even look similar:

CityState = [City] & "," & [State]

Projected Sales = SUM('Reseller Sales'[Last Years Sales])*1.06

But they behave completely differently once they're in your model:

| | Calculated column | Measure |
|---|---|---|
| Calculated | Once, when entered — stored per row | Dynamically, every time it's viewed |
| Evaluated in | Row context (one row at a time) | Filter context (whatever's currently filtering) |
| Storage cost | Adds to model size, every row | None — nothing is stored |
| Use it to... | Filter, group, slice, or sort by | Summarize a value in a visual |
| Updates when | The table refreshes | Instantly, as filters change |

## A simple decision rule

Ask one question: **do you need to slice or filter by this value, or
just display a summarized number?**

- If you need a new *category to filter or group by* — a column you'd
  drag into a slicer, a legend, or the rows of a table — you need a
  **calculated column**. Filtering and grouping only work on columns.
- If you need a *calculated number that summarizes* — a total, an
  average, a ratio, a projection — you need a **measure**. Measures exist
  to be aggregated and displayed, not filtered by.

## Working through it

**"I want to categorize customers as High or Low value based on their
total purchases."** This becomes a filterable category — you'll want to
slice a report by it. That's a calculated column.

**"I want to show total revenue, filtered by whatever the user selects."**
This is a number that recalculates as filters change — a measure.

**"I want a combined City, State field to plot on a map."** You're
creating something to group and display by — a calculated column, as you
saw directly in Lesson 34.

**"I want to show this year's sales as a percentage of last year's."**
A dynamically calculated ratio — a measure, built with `CALCULATE` (which
you'll meet properly in Lesson 39).

## Why getting it wrong still "works" — badly

Power BI won't stop you from using the wrong one. Write a calculated
column when you meant a measure, and you'll get a value that's frozen at
whatever it computed at refresh time — silently wrong the moment a user
applies a filter. Write a measure when you needed a column, and you'll
find you simply can't drag it into a slicer or the axis of a chart at
all — measures aren't filterable, only summarizable. Neither failure
throws a loud error. Knowing the distinction ahead of time is what saves
you the debugging.

## Key terms

| Term | Meaning |
|---|---|
| Row context | The "current row" scope a calculated column is evaluated in |
| Filter context | The set of active filters a measure is evaluated against |
| Filterable | Can be used in a slicer, axis, or group-by — only columns qualify |

## Lab

1. Using **AdventureWorks2012** and **AdventureWorksDW2014**, decide for
   each: a `FullName` field on `Person.Person` (calculated column or
   measure?), a `Total Sales` figure on `FactInternetSales` (which one?),
   and a customer loyalty tier based on total purchases (which one?).
2. For one of them, write the actual DAX formula.
3. Try dragging your `Total Sales` measure into a slicer's field well
   and observe what happens — confirm for yourself that measures aren't
   filterable.

## Check yourself

You're ready for Lesson 37 when you can answer, without hesitating,
"calculated column or measure?" for any data question someone hands you.
