# Lesson 44 — Running Totals & Moving Averages

**Chapter 7 · Time Series & Table Calculations · Lesson 44 of 95**

## What you'll learn

- How a **Running Total** accumulates a measure as it moves across
  the view
- How a **Moving Average** (also called a Moving Calculation) smooths
  out noisy period-to-period swings
- How to stack a secondary calculation — like Percent Difference — on
  top of a primary one, like Running Total
- How both map onto SQL window-function frames you already know

## Running Total

A **Running Total** adds each value to the sum of everything before
it, so the last cell in the view always equals the grand total. It's
the direct equivalent of a SQL window function with a
`ROWS UNBOUNDED PRECEDING` frame — `SUM(Sales) OVER (ORDER BY
OrderDate ROWS UNBOUNDED PRECEDING)`.

Tableau lets you stack a second calculation on top of the first. Here,
the **Primary Calculation Type** is Running Total (Sum), and a
**Secondary Calculation Type** of Percent Difference From is layered
on top of it — giving you the year-over-year percent change *of the
running total itself*, not of the raw monthly value:

![Tableau's Table Calculation panel: Primary Calculation Type set to Running Total (Sum), Secondary Calculation Type set to Percent Difference From, Compute Using Table (across), Specific Dimensions checked for Quarter and Month of Order Date, Restarting Every set to Quarter of Order Date.](/courses/tableau/ch07/44-running-totals-and-moving-averages/running-total-dialog.png)
*Two calculations stacked: a Running Total first, then a Percent Difference From applied to that running total's results.*
Source: [Tableau Help — Table Calculation Types](https://help.tableau.com/current/pro/desktop/en-us/calculations_tablecalculations_definebasic_runningtotal.htm)

Notice **Restarting Every: Quarter of Order Date** in that dialog —
that setting resets the running total back to zero at the start of
each new quarter, rather than letting it accumulate across the entire
table. Without it, the running total would keep growing all the way
to the end of the view.

## Moving Average

A **Moving Average** (Tableau also calls this a "Moving Calculation")
replaces each value with the average of it and a fixed window of
neighboring values — commonly "this value and the two before it."
That smooths out noisy month-to-month spikes so the underlying trend
is easier to see. In SQL terms, this is a window function with a
bounded frame instead of an unbounded one — `AVG(Sales) OVER (ORDER
BY OrderDate ROWS BETWEEN 2 PRECEDING AND CURRENT ROW)`.

## The formulas underneath

```
// Running Total
RUNNING_SUM(SUM([Sales]))

// Moving Average — this value plus the two before it
WINDOW_AVG(SUM([Sales]), -2, 0)

// Moving Average — a centered 3-period window
WINDOW_AVG(SUM([Sales]), -1, 1)
```
*`WINDOW_AVG`'s two numeric arguments are the offsets, exactly like a SQL window frame's PRECEDING/FOLLOWING bounds.*

`WINDOW_AVG(expression, start, end)` takes the same shape as a SQL
window frame: `start` and `end` are offsets from the current row,
where a negative number reaches backward and a positive number reaches
forward. `-2, 0` means "from two rows back through the current row" —
a trailing 3-period average. `-1, 1` means "one row back through one
row forward" — a centered 3-period average.

## Key terms

| Term | Meaning |
|---|---|
| Running Total | A cumulative sum that grows as it moves across the view |
| Moving Average / Moving Calculation | A calculation applied over a sliding window of neighboring values |
| Restarting Every | A setting that resets a running total back to zero at a chosen dimension boundary |
| `WINDOW_AVG(expr, start, end)` | Table calc function computing an average over an offset window around the current row |

## Lab

1. Build a text table: Year and Month of Order Date on Rows, Sales on Text.
2. Add a **Running Total** table calculation. Confirm the last row's value equals the grand total of all sales.
3. Set **Restarting Every** to Year of Order Date, and watch the running total reset to zero at the start of each year instead of accumulating across the whole table.
4. Clear that calculation, then add a **Moving Average** with 2 values before and 0 after. Compare the smoothed line to the raw monthly Sales line on the same view.

## Check yourself

You're ready for Lesson 45 when you can explain what "Restarting
Every" does to a Running Total, and what the two numeric arguments in
`WINDOW_AVG(expression, start, end)` control.
