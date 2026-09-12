# Lesson 28 — Dimension, Measure & Date Filters

**Chapter 5 · Filters, Sorting & Analytics · Lesson 28 of 95**

## What you'll learn

- Why the Filter dialog looks completely different depending on the
  field type you drag onto the Filters shelf
- The four dimension-filter tabs: General, Wildcard, Condition, Top
- Why a measure filter asks you to pick an aggregation first
- The two fundamentally different ways to filter a date field

## The Filter dialog isn't one dialog — it's three

Lesson 27 introduced dragging a field onto the Filters shelf. What
happens next depends entirely on whether that field is a dimension, a
measure, or a date.

## Dimension filters: pick which values to keep

Drag a discrete dimension like `Category` onto Filters, and you get a
dialog with four tabs:

![Filter dialog for the Category dimension, showing General, Wildcard, Condition, and Top tabs, with a checklist of Furniture, Office Supplies, and Technology.](/courses/tableau/ch05/28-dimension-measure-date-filters/filter-dimension.png)
*General lets you check/uncheck values directly; Wildcard, Condition, and Top add more dynamic ways to select which values pass through.*
Source: [Tableau Help — Filter Data from Your Views](https://help.tableau.com/current/pro/desktop/en-us/filtering.htm)

- **General**: manually select or exclude specific values
- **Wildcard**: match values containing, starting with, or ending with text
- **Condition**: keep only values where a formula evaluates true (e.g., `SUM([Sales]) > 10000`)
- **Top**: keep only the top/bottom N by some measure (this is the Top N filter Lesson 29 covers in depth)

## Measure filters: pick an aggregation first

Drag a measure like `Sales` onto Filters, and Tableau asks a question
dimension filters never ask:

![Filter Field dialog for Sales, prompting the user to choose an aggregation — Sum, Average, Median, Count, Count Distinct, Minimum, Maximum, and more — before the range filter appears.](/courses/tableau/ch05/28-dimension-measure-date-filters/filter-measure.png)
*A measure has no single "value" to filter on until you decide how it's aggregated — sum, average, or something else.*
Source: [Tableau Help — Filter Data from Your Views](https://help.tableau.com/current/pro/desktop/en-us/filtering.htm)

This makes sense once you think about it: `Sales` for the Furniture
category isn't one number, it's thousands of individual order lines.
"Filter where Sales > $500" is meaningless until you say whether that
means the *sum*, the *average*, or the *count* of those order lines.
Once you pick an aggregation, Tableau shows the familiar numeric range
dialog.

## Date filters: relative or exact range

Drag a date field like `Order Date` onto Filters, and you get a choice
between two fundamentally different filtering strategies:

![Filter Field dialog for Order Date, showing the choice between Relative Date and Range of Dates, plus date-part granularity options like Years, Quarters, Months, and Individual Dates.](/courses/tableau/ch05/28-dimension-measure-date-filters/filter-date.png)
*Relative Date moves with "today" every time the workbook opens; Range of Dates stays fixed to the exact dates you pick.*
Source: [Tableau Help — Filter Data from Your Views](https://help.tableau.com/current/pro/desktop/en-us/filtering.htm)

- **Relative Date**: "the last 30 days," "this quarter" — recalculates every time the view loads, which is what most live dashboards actually want
- **Range of Dates**: a fixed start and end date — good for a specific historical analysis that shouldn't shift over time

Lesson 29 goes deeper into building Relative Date filters correctly.

## Key terms

| Term | Meaning |
|---|---|
| Dimension filter | Selects which discrete values (categories) pass through, via General/Wildcard/Condition/Top |
| Measure filter | Filters on an aggregated numeric value — requires choosing the aggregation first |
| Relative Date filter | A date range that recalculates from "today" every time the view is opened |
| Range of Dates filter | A fixed, unchanging start and end date |

## Lab

1. In Sample Superstore, build a dimension filter on `Sub-Category` using the Condition tab: keep only sub-categories where `SUM([Profit]) < 0`.
2. Build a measure filter on `Sales`, choosing Sum, keeping only order lines over $500.
3. Build a date filter on `Order Date` using Relative Date, set to "Last 12 Months," and compare it to a Range of Dates filter covering the same literal period.

## Check yourself

You're ready for Lesson 29 when you can explain why a measure filter
requires an aggregation choice that a dimension filter never asks for,
and the practical difference between a Relative Date filter and a
Range of Dates filter on a dashboard that gets opened every week.
