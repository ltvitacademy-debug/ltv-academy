# Lesson 42 — Introduction to Table Calculations

**Chapter 7 · Time Series & Table Calculations · Lesson 42 of 95**

## What you'll learn

- What a **table calculation** actually is, and how it's fundamentally
  different from the calculated fields you already know
- Why table calculations run on the data *already in the view*, not on
  the underlying rows
- How to spot a table calculation in the UI
- How this maps onto SQL window functions you already know from T-SQL
  Development

## Not another calculated field

Earlier in this course you built calculated fields — row-level or
aggregate formulas evaluated against the data source, before it ever
hits the view. A **table calculation** is a different animal
entirely: it's a calculation applied *after* Tableau has already
aggregated your data into the rows and columns visible on screen. It
recomputes values using only what's already showing — the totals, the
ranks, the running sums — not the original detail rows.

This is exactly the distinction SQL draws between a plain
`GROUP BY` aggregate and a window function. `SUM(Sales)` grouped by
month gives you one total per month, computed straight from the
underlying rows. `SUM(Sales) OVER (ORDER BY Month ROWS UNBOUNDED
PRECEDING)` computes a running total *from the already-aggregated
monthly sums* — that's a window function, and it's the closest SQL
concept to what a Tableau table calculation does.

## How you know a field has one applied

Any field carrying a table calculation gets a small triangle badge on
its pill, right where the field's aggregation icon normally sits:

![A Tableau measure pill labeled 1-nest with a small triangle icon in the corner, indicating a table calculation is applied to the field.](/courses/tableau/ch07/42-intro-to-table-calculations/table-calc-indicator.png)
*That triangle is the only visual sign that a field's numbers are being recomputed after aggregation.*
Source: [Tableau Help — Customize a Table Calculation](https://help.tableau.com/current/pro/desktop/en-us/calculations_tablecalculations_custom.htm)

If you ever look at a number in a view and it doesn't match what a
plain `SUM` or `AVG` of the raw data would give you, check for that
triangle first — it means a table calculation is quietly reshaping
what you're looking at.

## What table calculations actually look like

Under the hood, table calculations use their own function vocabulary
— things like `RUNNING_SUM`, `WINDOW_AVG`, `RANK`, and `TOTAL` — none
of which exist in the row-level calculated-field world you already
know:

```
// Percent of Total — Lesson 43
SUM([Sales]) / TOTAL(SUM([Sales]))

// Running Total — Lesson 44
RUNNING_SUM(SUM([Sales]))

// Moving Average — Lesson 44
WINDOW_AVG(SUM([Sales]), -2, 0)
```
*Every one of these is computed on the aggregated values already in the view, in the order the view lays them out.*

Notice the pattern: every table calc function wraps an already-
aggregated value (`SUM([Sales])`), not a raw column. That's the
tell — if you see a table calc function wrapping a bare field name
with no aggregation inside it, Tableau will usually flag it as
invalid.

## Why this chapter exists

The next four lessons walk through the specific, most common table
calculations one at a time — percent of total, difference, running
totals, moving averages, rank — followed by the two settings,
addressing and partitioning, that control exactly how any of them
computes its direction and scope. Get comfortable with the concept in
this lesson, and the rest of the chapter is just vocabulary.

## Key terms

| Term | Meaning |
|---|---|
| Table calculation | A calculation applied to the data already aggregated into the current view |
| Calculated field (row-level) | A calculation evaluated against the underlying data source, before aggregation |
| Table calc indicator | The small triangle badge marking a field with a table calculation applied |
| Window function (SQL) | The closest SQL concept — an aggregate computed over an ordered/partitioned set of already-grouped rows |

## Lab

1. In Sample Superstore, build a text table: **Order Date** (Year, as a Date Value) on Rows, **Sales** on Text.
2. Right-click the **SUM(Sales)** pill, choose **Add Table Calculation**, and pick **Running Total**. Watch the triangle badge appear on the pill.
3. Remove the table calculation (same menu, **Clear Table Calculation**) and confirm the triangle disappears and the values revert to plain yearly sums.

## Check yourself

You're ready for Lesson 43 when you can explain, in one sentence, why
a table calculation is computed differently from a calculated field —
specifically, what it's computed *from*.
