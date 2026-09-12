# Lesson 13 — Wide vs. Long Data & Preparing Data for Tableau

**Chapter 2 · Connecting & Preparing Data · Lesson 13 of 95**

## What you'll learn

- The difference between wide and long data shapes
- Why Tableau overwhelmingly prefers long data, even though wide data
  is what most people build in Excel
- How to recognize which shape a dataset is in before you connect it
- What to do about a wide dataset before dragging it into a view

## Two shapes for the same data

The same numbers can be arranged two different ways:

**Wide data** puts one row per entity, with separate columns for each
time period or category — a spreadsheet with `Region, Jan, Feb, Mar,
Apr` as its columns is wide. It's the shape most people reach for
naturally in Excel, because it's easy to read at a glance.

**Long data** puts one row per *observation* instead — `Region, Month,
Sales` — where every combination of region and month gets its own row.
It looks repetitive and harder to read as a spreadsheet, but it's the
shape a database, and Tableau, actually wants.

| | Wide | Long |
|---|---|---|
| Shape | One row per entity, one column per category/period | One row per observation |
| Example columns | `Region, Jan, Feb, Mar` | `Region, Month, Sales` |
| Easy for a human to skim | Yes | Less so |
| Easy for Tableau to encode as Color/Size/Filter | No — each month is a separate field | Yes — "Month" is one field you can drag anywhere |

## Why Tableau wants long data specifically

Tableau's whole model (Lesson 5's Dimensions and Measures) assumes
each *field* is one thing you can drag onto a shelf, a filter, or the
Marks card. If "Jan," "Feb," and "Mar" are three separate columns
(wide), Tableau sees three unrelated fields — there's no single "Month"
dimension to filter by, sort by, or put on a date axis. Pivot the same
data to long — one `Month` column, one `Sales` column — and suddenly
"Month" is a real, single field Tableau can treat as a genuine time
dimension.

This is exactly why Lesson 3's Sample Superstore dataset already
arrives long (one row per order line, not one column per year) — it
was built to be Tableau-ready from the start.

## Spotting the shape before you connect

Before dragging a new data source into Tableau, skim its column
headers:

- If you see category or date values *as column names themselves*
  (`Jan`, `Feb`, `Mar`, or `2022`, `2023`, `2024`) — that's wide.
- If every column name is a genuine field name (`Region`, `Month`,
  `Sales`) and the actual values live in the rows — that's long.

## Fixing wide data

If you're stuck with a wide export (a common reality — a lot of
finance and ops teams still ship data this way), Tableau's own **Data
Interpreter** and **Pivot** tools (covered next lesson) can reshape it
to long directly inside Tableau, without needing to touch the source
file or a separate tool first.

## Key terms

| Term | Meaning |
|---|---|
| Wide data | One row per entity, with categories/periods spread across separate columns |
| Long data | One row per observation — every category/period combination gets its own row |
| Pivot | The operation that reshapes wide data into long (Lesson 12 introduced Tableau's pivot tool) |

## Lab

1. Open a spreadsheet with monthly columns (`Jan, Feb, Mar, ...`) —
   real or hypothetical — and sketch what the same data would look
   like reshaped into long format with a `Month` column.
2. Confirm the Sample Superstore dataset (Lesson 3) is already long:
   check that Order Date is a single column, not twelve.

## Check yourself

You're ready for Chapter 3 when you can explain, in one sentence, why
a wide spreadsheet with a column per month can't be used directly as a
Tableau date filter, and what has to happen to it first.
