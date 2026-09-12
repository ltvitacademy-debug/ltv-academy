# Lesson 43 — Percent of Total, Difference & Percent Difference

**Chapter 7 · Time Series & Table Calculations · Lesson 43 of 95**

## What you'll learn

- How **Percent of Total** turns raw values into a share of a whole
- How **Difference** and **Percent Difference** compare each value to
  the one before it
- How the same three quick table calculations look as raw table-calc
  formulas
- Why the "Compute Using" setting changes what "total" and "previous"
  even mean

## Percent of Total

A **Percent of Total** table calculation answers "what share of this
whole does each number represent?" Applied to a sales table with
**Compute Using: Pane (down)**, each month's sales become a percentage
of that quarter's total instead of a raw dollar figure:

![Tableau's Table Calculation panel with Percent of Total selected, Compute Using set to Pane (down), showing January 2022 highlighted at 19.11% of Q1's sales.](/courses/tableau/ch07/43-percent-of-total-difference-percent-difference/percent-of-total-dialog.png)
*January makes up 19.11% of Q1 2022's sales — the percentage is entirely dependent on which dimension Compute Using scopes it to.*
Source: [Tableau Help — Table Calculation Types](https://help.tableau.com/current/pro/desktop/en-us/calculations_tablecalculations_definebasic_runningtotal.htm)

Change **Compute Using** to a wider or narrower scope — say, the
entire table instead of just one quarter — and every percentage
recalculates against that new "whole." Percent of Total is only ever
meaningful once you know what it's a percent *of*.

## Difference and Percent Difference

**Difference** and **Percent Difference** both compare a value to a
different one in the view — most commonly the value immediately
before it. **Percent Difference From**, with **Compute Using: Table
(down)** and **Relative to: Previous**, shows how much each month's
sales grew or shrank compared to the prior month:

![Tableau's Table Calculation panel with Percent Difference From selected, Compute Using set to Table (down), Relative to Previous.](/courses/tableau/ch07/43-percent-of-total-difference-percent-difference/percent-difference-dialog.png)
*"Relative to Previous" is the default — but you can just as easily compare to First, Last, or Next instead.*
Source: [Tableau Help — Table Calculation Types](https://help.tableau.com/current/pro/desktop/en-us/calculations_tablecalculations_definebasic_runningtotal.htm)

**Difference** gives you the raw gap (this month minus last month, in
dollars); **Percent Difference** gives you that same gap expressed as
a percentage of the earlier value. Both depend entirely on "Relative
to" — Previous is the default, but Tableau also lets you compare to
First, Last, or Next.

## The formulas underneath

Every quick table calculation you apply through the right-click menu
is really just a pre-built version of one of these:

```
// Percent of Total
ZN(SUM([Sales])) / TOTAL(SUM([Sales]))

// Difference (from previous)
ZN(SUM([Sales])) - LOOKUP(SUM([Sales]), -1)

// Percent Difference (from previous)
(ZN(SUM([Sales])) - LOOKUP(SUM([Sales]), -1))
  / ABS(LOOKUP(SUM([Sales]), -1))
```
*`LOOKUP(..., -1)` reaches back one position in the view — that "-1" is what "Relative to Previous" means underneath the dialog.*

`TOTAL()` sums every value in the current partition, regardless of
row; `LOOKUP(expression, offset)` reaches to a different row relative
to the current one. You'll meet both functions again once addressing
and partitioning (Lesson 46) start controlling exactly which rows
those offsets reach.

## Key terms

| Term | Meaning |
|---|---|
| Percent of Total | Each value expressed as a share of a total, scoped by Compute Using |
| Difference | The raw gap between a value and a reference value (usually the previous one) |
| Percent Difference | The same gap expressed as a percentage of the reference value |
| `TOTAL()` | A table calc function that sums every value in the current partition |
| `LOOKUP()` | A table calc function that reaches to a different row, offset from the current one |

## Lab

1. Build the sales-by-quarter-and-month table from the screenshots above (Year on Columns, Quarter and Month of Order Date on Rows, Sales on Text).
2. Right-click SUM(Sales), add **Percent of Total**, and try both **Table** and **Pane (down)** for Compute Using — watch the percentages change even though the underlying numbers didn't.
3. Clear that calculation, then add **Percent Difference** with **Compute Using: Table (down)**, **Relative to: Previous**. Note which cell has no value — the very first row has nothing to compare against.

## Check yourself

You're ready for Lesson 44 when you can explain why the very first
value in a "Percent Difference from Previous" column is always blank,
and how changing Compute Using changes what "total" means in a
Percent of Total calculation.
