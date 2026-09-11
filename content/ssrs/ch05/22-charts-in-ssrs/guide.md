# Lesson 22 — Charts in SSRS

**Chapter 5 · Charts & Visual Elements · Lesson 22 of 40**

## What you'll learn

- What a Chart data region is, and the elements every chart is built from
- How the Chart Data pane's three areas — Category Groups, Series Groups,
  Values — actually drive what gets plotted
- Why a chart behaves like a matrix underneath, and what that means for
  how you think about grouping
- Which chart types the New Chart Wizard offers, and how to add a chart
  manually when you need a type the wizard doesn't cover

## A chart is a data region, built from named parts

A **Chart** is one of the data regions available on the Insert tab,
alongside Table, Matrix, and List. Like those, it's bound to a single
dataset and it aggregates data by default. Before touching the wizard,
it's worth learning the vocabulary, because every property you'll set
later refers back to these parts.

![Chart Title, Legend, Series, Data Point Marker and Label, Axis Label, and Major/Minor Grid Lines and Tick Marks, labeled on a real column and bar chart.](/courses/ssrs/ch05/22-charts-in-ssrs/chart-elements.gif)
*Title, legend, series, data point label, axis — the core chart vocabulary.*

Notice the chart is really two charts stacked in that illustration — a
stacked column chart on top, a column chart with data point labels on
the bottom — sharing the same category axis (the four employee names).
That's deliberate: it's showing you Series (Q1 Sales, Q2 Sales, Last
Year) as the colored legend entries, and Data Point Markers/Labels as
the individual plotted values.

## The Chart Data pane: Category Groups, Series Groups, Values

Once a Chart data region is on the design surface and selected, Report
Builder shows the **Chart Data** pane with three drop zones. This is
where the real work happens — dragging dataset fields into the right
area is what turns a blank chart into a real one.

![The Chart Data pane with Category Groups (StoreName), Series Groups (Category), and Values ([Sum(LineTotal)]) filled in on a stacked column chart.](/courses/ssrs/ch05/22-charts-in-ssrs/chart-data-pane.gif)
*Category Groups, Series Groups, Values — drag dataset fields here, not the canvas.*

- **Values** — the numbers actually plotted. Drop a numeric field here
  and Report Builder wraps it in `Sum(...)` by default (it uses `Count`
  for non-numeric fields, since there's nothing to sum). This is what
  appears on the value axis.
- **Category Groups** — what appears along the category (x) axis. Add a
  field here and Report Builder creates a matching group automatically —
  each distinct value becomes one data point.
- **Series Groups** — what determines how many *series* the chart draws.
  Leave it empty and you get exactly one series, fixed at design time.
  Add a field (say, `Year`) and the number of distinct values in that
  field determines how many series appear — one line, bar, or column set
  per year, automatically.

## A chart is really a matrix in disguise

If you've already worked with the Matrix data region, the Chart Data
pane should feel familiar, because the mapping is nearly one-to-one:

| Matrix | Chart |
|---|---|
| Columns group | Category Groups |
| Rows group | Series Groups |
| Data area | Values |

That's not a coincidence — a chart *is* organized like a matrix
underneath. If a matrix already makes sense to you, use that mental
model rather than memorizing chart-specific rules from scratch.

## Choosing a chart type

The fastest path is **Insert → Chart → Chart Wizard**, which walks you
through column, line, pie, bar, and area charts — the five most common
types. For anything else (scatter, range, polar, stock, shape charts),
use **Insert → Chart → Insert Chart** instead, which drops an empty
Chart data region and opens the full **Select Chart Type** dialog with
every available type and sub-type.

## Key terms

| Term | Meaning |
|---|---|
| Chart data region | A report data region that renders aggregated data as a chart; bound to one dataset |
| Chart Data pane | The pane with three drop zones — Category Groups, Series Groups, Values — used to build the chart |
| Category Groups | Field(s) that define the category (x) axis; each distinct value becomes a data point |
| Series Groups | Field(s) that determine how many series the chart draws |
| Values | The aggregated numeric field(s) actually plotted |

## Lab

1. Open (or create) a report with a dataset that has at least one
   grouping field and one numeric field — for example, `SalesTerritory`
   and `SalesAmount` from AdventureWorks.
2. Insert a chart using the Chart Wizard, choosing a column chart.
3. In the Chart Data pane, confirm `SalesTerritory` landed in Category
   Groups and `[Sum(SalesAmount)]` landed in Values.
4. Add a second field (such as `CalendarYear`) to Series Groups and run
   the report. Watch the number of series change to match the distinct
   years in your dataset.

## Check yourself

You're ready for Lesson 23 when you can explain, without looking: what's
the difference between dropping a field into Category Groups versus
Series Groups, and why does a chart with an empty Series Groups area
only ever show one series?
