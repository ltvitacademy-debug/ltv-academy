# Lesson 75 — KPI Cards, Bullet Charts & Sparklines

**Chapter 13 · Advanced Visualizations · Lesson 75 of 95**

## What you'll learn

- How to build a KPI (Key Progress Indicator) view using Shape marks
  driven by a threshold calculation
- How to build a bullet graph: a measure compared against a target, with
  qualitative performance bands
- What a sparkline is, and how to build one in Tableau even though it
  isn't a distinct chart type

## KPI cards: a threshold, turned into a shape

A **KPI view** answers a yes/no question at a glance — "is this
sub-category meeting its sales goal, in every region?" — using shapes
instead of numbers. Start with a threshold calculation:

```
IF SUM([Sales]) > 25000 THEN "Above Goal" ELSE "Below Goal" END
```

Put this calculated field on the Marks card's **Shape** property, and
assign a green check to "Above Goal" and a red X to "Below Goal." With
`Sub-Category` on Rows and `Region` on Columns:

![Grid of green checkmarks and red X marks showing which product sub-categories meet a sales threshold in each region.](/courses/tableau/ch13/75-kpi-cards-bullet-charts-sparklines/kpi4.png)
*A completed KPI view: green check where a sub-category clears the sales threshold in a region, red X where it doesn't.*
Source: [Tableau Help — Visualize Key Progress Indicators](https://help.tableau.com/current/pro/desktop/en-us/kpi.htm)

This is far more scannable on a crowded dashboard than a text table of raw
numbers — a viewer can spot every red X across a whole region/category
grid in under a second.

## Bullet graphs: a measure vs. a target, with context bands

A **bullet graph** is a purpose-built replacement for a gauge or a
speedometer widget: one bar (the actual value), a tick mark or line (the
target), and shaded distribution bands (qualitative ranges — poor,
satisfactory, good). Tableau builds this from a bar chart plus a
**reference distribution**, and Show Me will build the whole thing for
you once you've selected the right two fields:

![Horizontal bullet graph comparing inbound tourism totals by region, each bar with a tick mark showing the target value and shaded bands behind it.](/courses/tableau/ch13/75-kpi-cards-bullet-charts-sparklines/bullet_graph2.png)
*A finished bullet graph — the bar is the actual value, the black tick is the target, the gray bands are qualitative ranges.*
Source: [Tableau Help — Quick Start: Bullet Graphs](https://help.tableau.com/current/pro/desktop/en-us/qs_bullet_graphs.htm)

To adjust which measure is the bar and which is the reference, right-click
the axis and choose **Swap Reference Line Fields**. To adjust the
qualitative bands themselves, right-click the axis and choose **Edit
Reference Line**, then edit the distribution.

## Sparklines: a trend, shrunk to fit in a table cell

A **sparkline** is a tiny, axis-free line chart meant to sit inline next
to a number — showing the shape of a trend without asking for a whole
worksheet's worth of screen space. Tableau doesn't have a distinct
"Sparkline" mark type or menu item the way Excel does; you build one from
an ordinary line chart, stripped down:

```
1. Build a normal line chart: Order Date (continuous, by month) on
   Columns, SUM(Sales) on Rows.
2. Right-click both axes → uncheck "Show Header" to hide the axis lines
   and labels entirely.
3. Format → Lines → remove gridlines; shrink the worksheet's physical
   size so it reads as a small inline shape, not a full chart.
4. Place many of these small worksheets side by side in a dashboard —
   one per category or region — for a "trend column" next to a table
   of current values.
```

The technique is entirely standard Tableau formatting (hiding headers,
shrinking a worksheet), not a hidden feature — which is exactly why it's
worth knowing as a pattern rather than looking for a single button.

## Key terms

| Term | Meaning |
|---|---|
| KPI view | A threshold calculation mapped to a Shape mark, for at-a-glance pass/fail scanning |
| Bullet graph | A bar (actual) plus a reference line (target) plus reference bands (qualitative ranges), replacing a gauge widget |
| Reference distribution | The shaded qualitative bands behind a bullet graph's bar |
| Sparkline | A small, axis-free line chart built by hiding headers/gridlines on an ordinary line chart |

## Lab

1. On Sample Superstore, build the KPI view above: a threshold
   calculation on Shape, `Sub-Category` on Rows, `Region` on Columns.
2. Build a bullet graph comparing `SUM(Sales)` against a target measure
   of your choice (or a hard-coded target via a parameter), grained by
   `Region`.
3. Build one sparkline: a monthly `SUM(Sales)` line chart with both axis
   headers hidden and gridlines removed, shrunk down small.

## Check yourself

You're ready for Lesson 76 when you can build a KPI shape view, a bullet
graph, and a sparkline-style line chart from scratch, and explain why
Tableau has no dedicated "Sparkline" chart type.
