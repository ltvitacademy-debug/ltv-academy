# Lesson 92 — Project 1: Executive Sales Dashboard

**Chapter 17 · Portfolio Projects · Lesson 92 of 95**

## What you'll learn

- How to turn everything from Chapters 1-16 into one real, finished
  deliverable
- What an executive-level sales dashboard actually needs to contain —
  and what it should deliberately leave out
- How to build and wire up a working filter action across an entire
  dashboard
- What separates a passable version of this project from a strong one

## The scenario

You're the BI analyst for a fictional retail chain, and you're using
the **Sample Superstore** dataset — the same one this course
established in Lesson 3 and has returned to throughout. Leadership
wants one dashboard they can open Monday morning that answers, in
under thirty seconds: how are we doing, where, and on what. No live
presentation, no data digging — just open it and know.

## Dataset and fields

Build this against Sample Superstore, using at minimum:

- `Sales`, `Profit` (measures)
- `Order Date` (for the trend)
- `Region`, `State` (for the map)
- `Category`, `Sub-Category`, `Product Name` (for the product ranking)

You'll also need one calculated field: **Profit Ratio**
(`SUM([Profit]) / SUM([Sales])`), which you built the skills for back
in Chapter 5.

## Required deliverables

Build one single-screen dashboard containing all of the following:

1. **A KPI header** — Total Sales, Total Profit, and Profit Ratio as
   large, clearly labeled number displays (Chapter 14 covered building
   KPI headers specifically).
2. **A sales-by-region map** — a filled or symbol map of the U.S.,
   color-encoded by a measure that actually tells a story (Profit
   Ratio is more interesting here than raw Sales, since it shows
   *where* the business is healthy, not just where it's big).
3. **A profit-trend line chart** — Profit by month or quarter, with a
   reference line (average, or a target) for context.
4. **A top-10-products bar chart** — the ten best (or worst) performing
   products by Sales or Profit, built with a Top N filter, not a
   manually curated list.
5. **A working filter action** — clicking a region on the map filters
   the trend line and the top-10 chart to that region. This is the
   single most important technical requirement in this project: it's
   what turns four separate charts into one connected dashboard.

## What a strong version of this looks like

| Criterion | What it looks like when done well |
|---|---|
| KPI header | Correctly aggregated (SUM, not AVG of a ratio), consistently formatted, readable at a glance |
| Map | Correct geographic role assigned, color encodes a meaningful measure — not the default |
| Trend chart | Clear time granularity, a reference line that adds real context, not decoration |
| Top-10 chart | Sorted descending, labeled, built with an actual Top N filter |
| Filter action | Verified by clicking through in Presentation Mode — it should just work, every time |
| Layout | Fits on one screen with no scrolling, consistent fonts and colors, no leftover default gridlines |
| Framing | A dashboard title and a one-line "how to read this" caption for a first-time viewer |

A dashboard that technically has all five pieces but where the filter
action is flaky, or the map's colors are the Tableau default with no
thought behind them, is a passable dashboard — not a strong portfolio
piece. The difference between the two is entirely in the details in
this table, not in adding a sixth chart.

## Key terms

| Term | Meaning |
|---|---|
| KPI header | A row of large, single-number summary metrics at the top of a dashboard |
| Top N filter | A filter that dynamically shows only the highest (or lowest) N members of a dimension by a measure |
| Filter action | A dashboard action where clicking a mark on one sheet filters one or more other sheets |

## Lab

Build the dashboard described above, end to end, in Tableau Desktop
against the Sample Superstore dataset:

1. Create the Profit Ratio calculated field if you haven't already.
2. Build all four required sheets separately first — KPI header, map,
   trend, top-10 — before assembling the dashboard.
3. Assemble the dashboard, wire up the filter action from the map to
   the other two sheets, and switch to Presentation Mode to test it.
4. Compare your finished dashboard against every row of the rubric
   table above, honestly, before moving on.

## Check yourself

You're ready for Lesson 93 when your dashboard passes every row of the
rubric above, and you can explain out loud, in under a minute, what
the dashboard shows and why you chose to color the map by Profit Ratio
instead of raw Sales.
