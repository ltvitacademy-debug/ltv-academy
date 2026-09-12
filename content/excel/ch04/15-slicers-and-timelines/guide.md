# Lesson 15 — Slicers & Timelines

**Chapter 4 · PivotTables & PivotCharts · Lesson 15 of 25**

## What you'll learn

- Why slicers beat the PivotTable's own field dropdown filters for a
  dashboard-style workbook
- How to insert a slicer and read its visual filtering state at a
  glance
- Timelines as a purpose-built slicer for date fields specifically
- How one slicer or Timeline can filter multiple PivotTables at once

## Why a slicer beats a dropdown filter

A PivotTable's built-in field dropdown works, but it hides the current
filter state behind a small arrow icon — anyone looking at the report
has to click the dropdown just to see what's currently filtered.
Slicers solve exactly that problem: they're always-visible buttons that
show every possible value at once, with selected values highlighted, so
the current filter state is obvious without clicking anything.

## Inserting a slicer

![The Insert Slicers dialog, listing every available field as a checkbox.](/courses/excel/ch04/15-slicers-and-timelines/insert-slicer-2.png)
*Checking a field creates one slicer for it — check several to get several slicers at once.*
Source: [Microsoft Support — Use slicers to filter data](https://support.microsoft.com/en-us/excel/get-started/use-slicers-to-filter-data)

With a cell in the PivotTable selected, **Insert > Slicer** opens a
dialog listing every available field as a checkbox. Checking multiple
fields creates a slicer for each one in a single step, which is faster
than inserting them one at a time.

## Reading a slicer's anatomy

![A slicer's anatomy: header, selected items highlighted, unselected items, multi-select, scrollbar, and clear-filter icon.](/courses/excel/ch04/15-slicers-and-timelines/xl-14-pivottableslicerelements.jpg)
*Highlighted buttons are currently selected — everything else is filtered out.*
Source: [Microsoft Support — Use slicers to filter data](https://support.microsoft.com/en-us/excel/get-started/use-slicers-to-filter-data)

A slicer's header names the field; the highlighted buttons are the
values currently included; clicking an unhighlighted button filters to
just that one value, and `Ctrl`-clicking (or the multi-select icon)
adds more values to the selection. The small icon in the header corner
clears the filter back to "everything," which is far more discoverable
than the equivalent "Clear Filter" option buried in a dropdown menu.

## Timelines: a slicer built specifically for dates

![The Insert Timelines dialog box, listing available date fields.](/courses/excel/ch04/15-slicers-and-timelines/o15-xl-inserttimelinesdb.png)
*Timelines only list date fields — this is a slicer purpose-built for one data type.*
Source: [Microsoft Support — Create a PivotTable timeline to filter dates](https://support.microsoft.com/en-us/office/create-a-pivottable-timeline-to-filter-dates-d3956083-01be-408c-906d-6fc99d9fadfa)

A regular slicer built on a date field would list every individual
date as a separate button — unusable for a dataset spanning years.
**Insert > Timeline** solves this with a control designed specifically
for date ranges:

![A Timeline control filtering Order Date by year, with a range slider set to 2010 through 2012.](/courses/excel/ch04/15-slicers-and-timelines/o15-xl-timeline.png)
*A drag-to-select range slider, with a Years/Quarters/Months/Days zoom level in the corner.*
Source: [Microsoft Support — Create a PivotTable timeline to filter dates](https://support.microsoft.com/en-us/office/create-a-pivottable-timeline-to-filter-dates-d3956083-01be-408c-906d-6fc99d9fadfa)

A Timeline lets you drag across a range of periods, zoom the level of
granularity (Years, Quarters, Months, or Days) from a corner dropdown,
and filter with a single visual gesture instead of checking boxes for
every individual date.

## One filter, multiple PivotTables

Both slicers and Timelines can be connected to more than one PivotTable
at once, as long as those PivotTables share the same underlying data
source — exactly the setup a dashboard-style workbook needs, where a
single Timeline drag updates every chart and table on the sheet
simultaneously, instead of filtering each one separately.

## Key terms

| Term | Meaning |
|---|---|
| Slicer | An always-visible, click-based filter button set for one field |
| Timeline | A slicer purpose-built for date fields, with a drag-to-select range and a zoom level |
| Connected slicer | A slicer or Timeline linked to more than one PivotTable sharing the same source |

## Lab

1. Insert a slicer for a text field in any PivotTable and click through a few values to confirm the report updates and the highlighted state is visible at a glance.
2. Insert a Timeline for a date field, and use the zoom dropdown to switch between Years and Months.
3. If you have two PivotTables from the same source, connect one slicer to both (via Slicer/Timeline options → Report Connections) and confirm one click filters both.

## Check yourself

You're ready for Lesson 16 when you can explain why a Timeline exists
as a separate control instead of just using a regular slicer on a date
field.
