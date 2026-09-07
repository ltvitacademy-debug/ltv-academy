# Lesson 52 — Choosing the Right Visual

**Chapter 7 · Building Reports & Visualizations · Lesson 1 of 10**

## What you'll learn

- How to sort Power BI's visual gallery into a handful of decision categories
- Which visual fits which kind of question, not just which kind of data
- Why "what looks impressive" is the wrong first question
- Where the rest of this chapter fits into the bigger picture

## Every visual answers a different question

Power BI's Visualizations pane offers dozens of icons, and it's tempting
to pick whichever one looks most sophisticated. The better approach:
start from the question you're trying to answer, then pick the visual
built to answer it.

## Comparing values across categories

**Bar and column charts** compare specific values across categories.
Use columns for time-based comparisons; use bars when category names run
long and need horizontal room to display.

## Showing a trend over time

**Line charts** emphasize the overall shape of change over a continuous
axis — the right choice when the story is "how did this move," not "how
do these compare."

## Showing how parts make up a whole

**Pie and donut charts** show a small number of categories as slices of
a total. **Treemaps** do the same job for hierarchical data with many
more categories, using nested rectangle size instead of slice angle.

## Showing exact values

**Tables and matrices** — Lesson 53's topic — are what you reach for
when the audience needs to see and compare precise numbers, not just a
visual impression of them.

## Highlighting one key number

**Cards** put a single measure front and center — total sales, this
month's signups — for when one number matters more than any comparison.
**KPI visuals** go a step further, showing progress toward a specific
target alongside that number.

## Filtering interactively

**Slicers** put a filter directly on the report canvas, so viewers can
narrow the data themselves without opening the Filters pane.

## A simple decision process

1. **What question am I answering?** Comparison, trend, part-to-whole,
   exact values, or a single key number?
2. **How many categories does the data have?** A pie chart falls apart
   past five or six slices; a treemap or bar chart handles many more.
3. **Does the audience need exact numbers, or a visual impression?**
   Tables for the former, charts for the latter.
4. **Will this visual need to filter or be filtered by others?** Nearly
   every visual can — Lesson 58 covers exactly how that works.

## Where this chapter is headed

| Lessons | What they cover |
|---|---|
| 53 | Tables & Matrices — exact values, hierarchies, drill-down |
| 54 | Bar, Column, Line & Pie Charts — the everyday comparison and trend visuals |
| 55 | Cards, KPIs & Slicers — single numbers and interactive filtering |
| 56 | Formatting & Conditional Formatting — making data-driven color and style choices |
| 57 | Filters & the Filter Pane — every level a filter can apply at |
| 58 | Cross Filtering & Visual Interactions — how visuals affect each other |
| 59 | Drill Down & Drill Through — moving from summary to detail |
| 60 | Buttons, Bookmarks & Navigation — building guided report experiences |
| 61 | Analytics, Forecasting & Advanced Visuals — reference lines, trends, and AI-assisted visuals |

## Key terms

| Term | Meaning |
|---|---|
| Comparison visual | A chart built to compare values across categories (bar, column) |
| Trend visual | A chart built to show change over a continuous axis (line) |
| Part-to-whole visual | A chart showing how categories make up a total (pie, donut, treemap) |

## Lab

1. Open **AdventureWorksDW2014**'s `FactInternetSales` and think through
   three different report questions you could ask of it: a comparison
   (sales by product category), a trend (sales over time), and a
   part-to-whole breakdown (sales by sales territory).
2. For each question, name the visual type you'd reach for first, and
   why — before building anything.
3. Build all three as simple visuals and confirm each communicates its
   specific question clearly.

## Check yourself

You're ready for Lesson 53 when you can look at any reporting question
and name a visual category for it before opening the Visualizations
pane.
