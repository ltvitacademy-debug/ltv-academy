# Lesson 81 — Building KPI Headers & Executive Summary Sections

**Chapter 14 · Dashboards · Lesson 81 of 95**

## What you'll learn

- What a **KPI** is inside Tableau specifically, and the two real ways to
  build one: shape-based indicators and text-based number tiles
- How to assemble a KPI header row using the Horizontal containers from
  Lesson 80
- What actually belongs in an **executive summary** section, and — just as
  important — what to leave out
- A concrete layout pattern (3-2-1) you can reuse on every dashboard from
  here forward

## What "KPI" means inside Tableau

A **Key Performance Indicator** is a measurable value showing how well
something is performing against a target — nothing Tableau-specific yet.
What *is* Tableau-specific is how you render one. The most direct approach
uses a calculated field plus a **Shape** mark:

```
KPI
IF SUM([Sales]) > 25000 THEN "Above Benchmark"
ELSE "Below Benchmark"
END
```

Put that field on the Marks card as **Shape**, then assign each outcome its
own icon — a green checkmark for "Above Benchmark," a red X for "Below" —
using Tableau's built-in KPI shape palette:

![Tableau's Edit Shape [KPI] dialog, showing "Above Benchmark" assigned a black checkmark and "Below Benchmark" assigned a black X, with a palette of KPI-style shapes (checkmarks, exclamation points, X marks, circles, triangles) to choose from.](/courses/tableau/ch14/81-kpi-headers-and-executive-summary/kpi2.png)
*The Edit Shape dialog's built-in "KPI" palette — checkmarks, X marks, and warning triangles, exactly the vocabulary a viewer already expects from a status indicator.*
Source: [Tableau Help — Visualize Key Progress Indicators](https://help.tableau.com/current/pro/desktop/en-us/kpi.htm)

The second common approach skips shapes entirely and uses a big number with
conditional color — a text table showing just the aggregated value (e.g.
"$847K"), colored green or red by a calculated field, with the metric name
as a caption above it. Both are legitimate; shape-based KPIs read faster at
a glance, text-based KPIs communicate the actual number, and most executive
dashboards use both side by side.

## Assembling a KPI header row

A KPI header is nothing more than several single-number worksheets placed
inside one Horizontal container, evenly spaced, sitting at the top of the
dashboard:

1. Build each KPI as its own tiny worksheet — one number, minimal chrome,
   no axis, no gridlines.
2. Drag a Horizontal container onto the dashboard canvas, sized to span the
   full width.
3. Drag each KPI worksheet inside the container, in the order you want them
   read left to right.
4. Use **Distribute Evenly** (right-click the container, or drag the
   dividers) so each tile gets equal width regardless of how many you have.

This is exactly the "add the KPI header last" step from Lesson 79's build
order — you need the rest of the dashboard's shape decided before the
header's width makes sense.

## What belongs in an executive summary — and what doesn't

An **executive summary** section is the top-of-dashboard zone a VP reads in
the first ten seconds, before they scroll or click anything. Real dashboards
that work well tend to combine exactly this pattern: a headline number, a
segment or category breakdown, and a supporting detail table, all visible
without scrolling.

![A real example dashboard combining a "Profit by State" map, a "Profit by Segment" stacked-bar breakdown, and a "Sales and Average Profit" detail table by category and sub-category — all on one screen.](/courses/tableau/ch14/81-kpi-headers-and-executive-summary/dashboard_best_practices3.png)
*Headline geography, a segment breakdown, and a detail table — one screen, no scrolling, no guessing what matters.*
Source: [Tableau Help — Best Practices for Effective Dashboards](https://help.tableau.com/current/pro/desktop/en-us/dashboards_best_practices.htm)

A reliable layout pattern to reuse: **3-2-1** — three headline KPIs across
the top, two trend or breakdown charts in the middle, and one detail area
(a table or a filter-driven drill-down) at the bottom. It isn't a rigid law,
but it forces a useful discipline: pick 5-10 KPIs maximum that map directly
to business questions ("Are we hitting the monthly target?"), not every
number your data happens to contain. An executive summary that shows
everything shows nothing — the entire point is ruthless prioritization
before the viewer ever gets to the supporting detail underneath it.

## Key terms

| Term | Meaning |
|---|---|
| KPI | A measurable value shown against a target or benchmark, typically as a shape or colored number |
| KPI header | A row of single-number worksheets, usually in a Horizontal container, at the top of a dashboard |
| Executive summary | The top-of-dashboard zone a viewer reads first, combining a handful of headline metrics with minimal supporting detail |
| 3-2-1 layout | Three headline KPIs, two supporting charts, one detail area — a reusable dashboard structuring pattern |

## Lab

1. Build a KPI calculated field similar to the one above using any measure
   from a dataset you've worked with (Sample Superstore or otherwise).
   Assign it a shape from the KPI palette.
2. Create three single-number KPI worksheets, place them inside one
   Horizontal container at the top of a dashboard, and use Distribute
   Evenly so they're spaced identically regardless of screen width.

## Check yourself

You're ready for Lesson 82 when you can name the two ways to build a KPI in
Tableau (shape-based vs. text-based), and explain why the 3-2-1 pattern
insists on picking a small number of KPIs rather than showing everything the
data contains.
