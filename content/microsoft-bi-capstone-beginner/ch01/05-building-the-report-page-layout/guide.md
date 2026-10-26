# Lesson 5 — Building the Report Page Layout

**Chapter 1 · Beginner Capstone: Regional Sales Snapshot · Lesson 5 of 10**

## What you'll learn

- Why sketching the layout before touching the canvas saves rework in Power BI, the same
  way sketching the query before writing SQL did
- A simple, defensible layout for this report: KPI cards, a bar chart, and a table
- How to pick a visual based on the question it needs to answer, not habit

## Sketch first, drag second

Lesson 2 argued for planning a query in plain English before writing SQL. The same
discipline applies to report layout: open a blank page in Power BI Desktop and it's tempting
to start dragging fields onto the canvas and seeing what happens. That produces a report
that looks assembled, not designed — visuals scattered wherever they first landed, no clear
reading order, nothing matching the actual question the stakeholder asked.

Instead, sketch the layout on paper or in a text file first, deciding what each visual needs
to answer before opening the Visualizations pane.

## The layout for this report

Given the requirement from Lesson 1 — total sales and order count, by territory and product
line, glanceable before a Monday call — three visuals cover it completely:

1. **Two KPI cards, top row**: *Total Sales Amount* and *Total Order Count* for the whole
   quarter, company-wide. These answer "how are we doing, overall" in the first half-second
   of looking at the page — exactly what a stakeholder glancing at this before a call needs
   first.
2. **A bar chart, left side**: Total Sales Amount by Territory. This answers "which regions
   are driving sales" at a glance — bars are the right visual here because the comparison
   is between a small number of discrete categories (territories), not a trend over time.
3. **A table, right side**: Territory, Product Line, Total Sales Amount, Order Count — the
   full detail behind the KPI cards and the bar chart. This is where "which product line in
   which region" gets answered, for whoever wants to dig one level deeper.

## Why these visuals, and not others

- **No line chart** — there's no trend to show. This report has one quarter of data, not a
  series of periods, so a chart built for showing change over time would be misleading or
  simply empty of purpose.
- **No pie chart** — pie charts compare parts of a whole, and with multiple territories and
  multiple product lines, a pie would either need to collapse detail the stakeholder asked
  for, or become unreadable with too many slices.
- **A table, not a matrix, for the detail** — a matrix is useful when you want to pivot
  territory against product line as rows and columns. A flat table is simpler to read for
  a stakeholder who just wants to scan values, and matches the row-per-combination shape the
  T-SQL query already produces.

## Sketching the grid

Before placing anything, sketch the page as a rough grid:

```
+-----------------------+-----------------------+
|   KPI: Total Sales    |   KPI: Total Orders    |
+-----------------------+-----------------------+
|                       |                        |
|  Bar chart:           |  Table:                |
|  Sales by Territory    |  Territory, Product    |
|                       |  Line, Sales, Orders    |
+-----------------------+-----------------------+
```

This rough sketch — before a single visual exists in Power BI — is the plan you'll build
against in the next two lessons: DAX measures to power the cards and chart, then slicers and
formatting to finish the page.

## Key terms

| Term | Meaning |
|---|---|
| KPI card | A single-number visual for one headline metric |
| Layout sketch | A rough grid of what goes where, decided before opening the Visualizations pane |
| Visual-to-question fit | Choosing a chart type based on the comparison it needs to show, not habit |

## Lab

Sketch this report's grid yourself — on paper or in a text file — before opening Power BI.
Then open the report canvas and place empty placeholder visuals (even blank cards and an
empty table) in the positions from your sketch, without wiring up any fields yet.

## Check yourself

You're ready for Lesson 6 when you can explain why this layout skips a line chart and a pie
chart, and why a flat table — not a matrix — fits the detail view here.
