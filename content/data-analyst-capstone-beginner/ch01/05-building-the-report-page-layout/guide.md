# Lesson 5 — Building the Report Page Layout

**Chapter 1 · Beginner Capstone: Product Category Performance Snapshot · Lesson 5 of 10**

## What you'll learn

- Why sketching the layout before touching the canvas saves rework in Power BI, the same way
  sketching the query before writing SQL did
- A simple, defensible layout for this report: KPI cards, a bar chart, and a table
- How to pick a visual based on the question it needs to answer, not habit — including why a
  bar chart beats a pie chart even with only four categories to show

## Sketch first, drag second

Lesson 2 argued for planning a query in plain English before writing SQL. The same discipline
applies to report layout: open a blank page in Power BI Desktop and it's tempting to start
dragging fields onto the canvas and seeing what happens. That produces a report that looks
assembled, not designed — visuals scattered wherever they first landed, no clear reading order,
nothing matching the actual question the stakeholder asked.

Instead, sketch the layout on paper or in a text file first, deciding what each visual needs to
answer before opening the Visualizations pane.

## The layout for this report

Given the requirement from Lesson 1 — total sales and order count, by product category, ready
to pull up during a pricing review — three visuals cover it completely:

1. **Two KPI cards, top row**: *Total Sales Amount* and *Total Order Count* for the whole
   quarter, across all categories. These answer "how are we doing, overall" in the first
   half-second of looking at the page — exactly what a stakeholder opening this during a meeting
   needs first.
2. **A bar chart, left side**: Total Sales Amount by Category. This answers "which categories
   are driving sales" at a glance — bars are the right visual here because the pricing review's
   whole purpose is ranking categories against each other, and bars encode magnitude as a
   length that's easy to compare precisely.
3. **A table, right side**: Category, Total Sales Amount, Order Count — the full detail behind
   the KPI cards and the bar chart. This is where "exactly how much, and how many orders, per
   category" gets answered precisely, for whoever wants the exact figures during the meeting.

## Why a bar chart, not a pie chart — even with only four categories

With just four categories, a pie chart might seem tempting; it won't have the "too many slices"
problem a bigger breakdown would. But the choice still comes down to what the pricing review
actually needs:

- **A pie chart encodes value as an angle.** Comparing two wedge angles precisely is harder for
  a reader than comparing two bar lengths, even with only four wedges — and a pricing
  conversation is exactly the kind of comparison that benefits from precision.
- **A bar chart can be sorted by value.** Ordering categories from highest to lowest sales
  amount instantly shows the ranking the Merchandising Manager will want to discuss — a pie
  chart has no equivalent "sort."
- **A bar chart scales forward.** If a future version of this report ever adds a comparison
  quarter or splits further, bars extend naturally (grouped or stacked); a pie chart does not.

## Why a flat table, not a matrix, for the detail

A matrix is useful when you want to pivot two fields against each other as rows and columns —
category against region, say. This report only has one grouping dimension, category, so there's
nothing to pivot against; a flat table is simpler to read for a stakeholder who just wants to
scan values, and it matches the one-row-per-category shape the T-SQL query already produces.

## Why no line chart

There's no trend to show. This report has one quarter of data, not a series of periods, so a
chart built for showing change over time would be misleading or simply empty of purpose.

## Sketching the grid

Before placing anything, sketch the page as a rough grid:

```
+-----------------------+-----------------------+
|   KPI: Total Sales    |   KPI: Total Orders   |
+-----------------------+-----------------------+
|                       |                        |
|  Bar chart:           |  Table:                |
|  Sales by Category     |  Category, Sales,      |
|                       |  Order Count            |
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

Sketch this report's grid yourself — on paper or in a text file — before opening Power BI. Then
open the report canvas and place empty placeholder visuals (even blank cards and an empty table)
in the positions from your sketch, without wiring up any fields yet.

## Check yourself

You're ready for Lesson 6 when you can explain why this layout uses a bar chart rather than a
pie chart even though there are only four categories, and why a flat table — not a matrix — fits
the detail view here.
