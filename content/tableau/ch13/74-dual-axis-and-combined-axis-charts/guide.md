# Lesson 74 — Dual-Axis & Combined-Axis Charts

**Chapter 13 · Advanced Visualizations · Lesson 74 of 95**

## What you'll learn

- What a dual-axis (combination) chart is, and when to reach for one
- How to build one from two measures on the same shelf
- How to change the mark type on just one axis, to combine chart types
  (e.g., bars + a line)
- How and when to synchronize two axes so they share one scale

## Why combine two measures on one chart

Sometimes two measures matter together but live on very different
scales — Sales in the tens of thousands, Profit Ratio as a small
percentage. Putting both on the same single axis makes one of them
unreadable. A **dual-axis chart** solves this by giving each measure its
own axis while sharing the same set of category labels, so you can read
both trends side by side without needing two separate charts.

Tableau supports up to **four layered axes total** — two on Columns and
two on Rows — but the two-measures-on-one-shelf pattern below is what
you'll use the overwhelming majority of the time.

## Building a dual axis

Start with `SUM(Sales)` and `SUM(Profit)` both on the Rows shelf (as two
separate marks cards), with `Order Date` on Columns. Right-click the
second measure's pill — `SUM(Profit)` — and select **Dual-Axis**:

![Line chart context menu with Dual-Axis option selected, converting Sum of Profit into a second axis on the same chart.](/courses/tableau/ch13/74-dual-axis-and-combined-axis-charts/combo_chart3.png)
*Right-click the second measure on Rows and choose Dual-Axis to layer it onto the same chart as a second axis.*
Source: [Tableau Help — Quick Start: Combination Charts](https://help.tableau.com/current/pro/desktop/en-us/qs_combo_charts.htm)

The view updates immediately, and `Measure Names` is added to Color on
the Marks card automatically, so the two lines are visually
distinguished by color.

## Combining mark types

A **dual-axis chart** becomes a true **combination chart** once you give
each axis a different mark type. On the `SUM(Profit)` marks card, open
the Mark Type dropdown and choose **Bar** instead of Line — now Sales
renders as a line and Profit renders as bars, sharing the same category
axis:

![Combination chart displaying profit as blue bars and sales as an orange line, by month, on Sample Superstore data.](/courses/tableau/ch13/74-dual-axis-and-combined-axis-charts/combo_chart6.png)
*The finished combination chart — profit as bars, sales as a line, sharing one set of month labels.*
Source: [Tableau Help — Quick Start: Combination Charts](https://help.tableau.com/current/pro/desktop/en-us/qs_combo_charts.htm)

This is the classic "bars for a total, line for a rate or trend" pairing,
and it's one of the most common patterns you'll build in real dashboards.

## Synchronizing the axes

By default, Tableau scales each axis independently based on its own
measure's range — which can visually mislead by making two unrelated
scales *look* aligned when they aren't. To force both axes onto the same
numeric scale, right-click either axis and choose **Synchronize Axis**.
Use this when the two measures share the same unit and you specifically
want a direct visual comparison of magnitude; leave axes unsynchronized
when the measures are on genuinely different scales (like Sales vs.
Profit Ratio) and you only care about each one's own shape over time.

## Key terms

| Term | Meaning |
|---|---|
| Dual-axis chart | Two measures layered onto the same view, each with its own axis, sharing one set of category labels |
| Combination chart | A dual-axis chart where each axis uses a different mark type (e.g., bar + line) |
| Synchronize Axis | Forces two axes to share the exact same numeric scale |
| Measure Names / Measure Values | The generated fields Tableau uses to color and label multiple measures on one chart |

## Lab

1. On Sample Superstore, put `Order Date` (by month) on Columns and both
   `SUM(Sales)` and `SUM(Profit)` on Rows.
2. Right-click `SUM(Profit)` and select Dual-Axis, matching the first
   screenshot above.
3. Change the `SUM(Profit)` mark type to Bar, matching the finished
   combination chart above.
4. Try Synchronize Axis on and off, and write one sentence on when you'd
   actually want it turned on for this specific pair of measures.

## Check yourself

You're ready for Lesson 75 when you can build a dual-axis combination
chart (bars + line) from scratch on two measures with different scales,
and explain what Synchronize Axis changes.
