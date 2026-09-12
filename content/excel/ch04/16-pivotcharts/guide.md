# Lesson 16 — PivotCharts

**Chapter 4 · PivotTables & PivotCharts · Lesson 16 of 25**

## What you'll learn

- How a PivotChart stays linked to its PivotTable instead of becoming
  a static picture of the data
- The specific PivotChart-only feature — field buttons directly on the
  chart — that a normal Excel chart doesn't have
- How slicers and Timelines from Lesson 15 filter a PivotChart exactly
  like they filter a PivotTable

## From source data to a linked chart

![Source data: household expenses by category and month.](/courses/excel/ch04/16-pivotcharts/excel-pivottable-sampledata.png)
*The same source data that would go into any PivotTable — categories down, months across.*
Source: [Microsoft Support — Overview of PivotTables and PivotCharts](https://support.microsoft.com/en-us/office/overview-of-pivottables-and-pivotcharts-527c8fa3-02c0-445a-a2db-7794676bce96)

Selecting a cell inside an existing PivotTable and choosing **Insert
Chart** from the ribbon builds a PivotChart directly from that
PivotTable's current rows, columns, and values:

![The resulting PivotChart, showing household expenses by month grouped by category.](/courses/excel/ch04/16-pivotcharts/excel-pivotchart-ex01.png)
*Grocery, Household, Entertainment, and Transportation, grouped by month — generated straight from the PivotTable, not redrawn by hand.*
Source: [Microsoft Support — Overview of PivotTables and PivotCharts](https://support.microsoft.com/en-us/office/overview-of-pivottables-and-pivotcharts-527c8fa3-02c0-445a-a2db-7794676bce96)

The critical difference from a normal Excel chart built off a static
range: a PivotChart stays **linked** to its PivotTable. Rearrange the
PivotTable's fields — swap what's in Rows for what's in Columns, add a
Filter, change the aggregation — and the PivotChart updates
automatically to match, with no need to rebuild or re-select a data
range.

## What a normal chart can't do: field buttons on the chart

A regular Excel chart is a fixed picture of whatever range it was
built from — changing what it shows means going back to the data and
adjusting it there. A PivotChart is different: it displays interactive
**field buttons** directly on the chart itself — small dropdown
controls sitting on the chart for whichever fields are in Rows,
Columns, and Filters, letting you filter or rearrange the chart from
the chart itself, without ever touching the underlying PivotTable.
That's a capability unique to PivotCharts; a standard chart has no
equivalent, because a standard chart has no live connection to a
PivotTable's field structure to expose controls for.

## Slicers and Timelines work on PivotCharts too

Everything from Lesson 15 carries over directly: a slicer or Timeline
connected to the PivotTable a PivotChart is built from also filters
the chart, since the chart is just a visual reflection of the same
PivotTable. This is exactly how a dashboard-style sheet works in
practice — one Timeline drag updates a PivotTable and every PivotChart
built from it, all at once, with the field buttons on each chart still
available as a second way to adjust it further.

## Key terms

| Term | Meaning |
|---|---|
| PivotChart | A chart built directly from a PivotTable, staying linked to its rows/columns/values |
| Field buttons | Interactive dropdown controls Excel places on a PivotChart for its Rows/Columns/Filters — unique to PivotCharts |
| Linked update | A PivotChart automatically redraws when its source PivotTable's structure changes |

## Lab

1. Build a PivotTable from any Table, then select a cell inside it and use Insert Chart to create a PivotChart from it.
2. Rearrange the PivotTable's Rows and Columns fields and confirm the PivotChart updates automatically without being rebuilt.
3. If you built a slicer or Timeline in Lesson 15's lab, connect it to this PivotChart's PivotTable and confirm one click filters both the table and the chart.

## Check yourself

You're ready to move on when you can explain, in one sentence, the
specific thing a PivotChart can do that a normal Excel chart built from
a static range cannot.
