# Lesson 13 — Building a PivotTable

**Chapter 4 · PivotTables & PivotCharts · Lesson 13 of 25**

## What you'll learn

- Why starting a PivotTable from a real Excel Table (Lesson 3) beats
  starting from a raw range
- How to insert a PivotTable and read the recommended-layout preview
- The four drop zones — Filters, Rows, Columns, Values — and how
  dragging a field into each one changes the report
- What "Sum of X" actually means by default, and why that matters for
  the calculated-field work in Lesson 14

## Start from a Table, not a raw range

![The 'PivotTable from table or range' dialog, with Table/Range pointed at a Table.](/courses/excel/ch04/13-building-a-pivottable/pivottable-from-range-or-table.png)
*Table/Range references a named Table — not a fixed cell address like `Sheet1!$B$1:$C$6`.*
Source: [Microsoft Support — Create a PivotTable to analyze worksheet data](https://support.microsoft.com/en-us/office/create-a-pivottable-to-analyze-worksheet-data-a9a84538-bfe9-40a9-a8e9-f99134456576)

Any PivotTable needs a source range. Point it at a raw cell range and
that range is fixed forever — add ten new rows of data next month, and
the PivotTable simply won't see them until someone manually edits the
source reference. Point it at a real Excel Table instead, and the
Table/Range box shows the Table's name (like `Table1` or `Sales`)
rather than a fixed address — the PivotTable then automatically
expands to include new rows the moment the Table grows, with nothing
to remember or fix later. This is the single biggest reason Lesson 3
insisted on `Ctrl+T` early in this course.

## Inserting the PivotTable

From **Insert > PivotTable**, Excel offers to build it on a new
worksheet or an existing one, and — in current versions — shows a
recommended layout preview before you commit to anything:

![The Insert PivotTable pane, showing a recommended 'Sales by Product and Year' layout preview.](/courses/excel/ch04/13-building-a-pivottable/insert-pivottable-pane-001.png)
*Excel proposes a layout based on the shape of the source data — useful as a starting point, not a final answer.*
Source: [Microsoft Support — Create a PivotTable to analyze worksheet data](https://support.microsoft.com/en-us/office/create-a-pivottable-to-analyze-worksheet-data-a9a84538-bfe9-40a9-a8e9-f99134456576)

Accepting a recommendation still produces an editable PivotTable — it's
a starting point to adjust, not a locked-in structure.

## The four drop zones

![The PivotTable Fields pane, with fields dragged into Filters, Rows, Columns, and Values.](/courses/excel/ch04/13-building-a-pivottable/pivot-table-003.png)
*Filters narrow the whole report; Rows and Columns group it; Values aggregates it.*
Source: [Microsoft Support — Create a PivotTable to analyze worksheet data](https://support.microsoft.com/en-us/office/create-a-pivottable-to-analyze-worksheet-data-a9a84538-bfe9-40a9-a8e9-f99134456576)

Every PivotTable is built from the same four zones in the PivotTable
Fields pane:

- **Filters** — narrows the entire report to a subset (e.g., one
  region) without changing its row/column structure
- **Rows** — groups data down the left side (here: Item Number, Family,
  Status, stacked as nested groups)
- **Columns** — groups data across the top (here: Last Sale Date)
- **Values** — the numbers actually being aggregated (here: Sum of
  Margin Item Cost)

Dragging a numeric field into Values doesn't just display it — it
**aggregates** it, defaulting to Sum for numbers and Count for text.
That default aggregation, and how to change or extend it, is exactly
what Lesson 14's calculated fields build on.

## Why this beats a raw range every time

A PivotTable built from a Table refreshes correctly as data grows, its
field names stay meaningful (Table column headers, not `Column1`), and
it's immune to the single most common PivotTable bug: a source range
that quietly stops one row short of the real data because someone
inserted rows below the original selection.

## Key terms

| Term | Meaning |
|---|---|
| PivotTable | A report that groups and aggregates rows of source data by dragging fields into zones |
| Filters / Rows / Columns / Values | The four drop zones that define a PivotTable's structure |
| Default aggregation | Sum for numeric fields, Count for text fields, when first dropped into Values |

## Lab

1. Convert any raw range of data into a Table (`Ctrl+T`) if it isn't one already.
2. Insert a PivotTable from that Table, accepting or adjusting the recommended layout.
3. Drag one field into Rows, one into Columns, and one numeric field into Values — then add five new rows to the source Table and refresh the PivotTable to confirm the new rows are included automatically.

## Check yourself

You're ready for Lesson 14 when you can explain, without looking it up,
why a PivotTable built from a Table needs no manual fixing as new rows
are added.
