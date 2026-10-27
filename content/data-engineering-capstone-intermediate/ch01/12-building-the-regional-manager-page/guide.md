# Lesson 12 — Building the Regional Manager Page

**Chapter 1 · Data Engineering Capstone — Intermediate Project · Lesson 12 of 16**

## What you'll learn
- Why the Regional Manager's question is genuinely different from Store Ops', not just a bigger version of it
- Which visuals turn `gold.category_breakdown` into an answer to "which categories are driving sales"
- Why a bar chart by category fits this question better than a time trend
- Why this page's slicers differ from the Store Ops page, even though both read from the same Power BI model

## The question this page has to answer

Go back to Lesson 1: the Regional Manager's actual ask was *"I want to see which categories are
driving that number — and whether that's different store to store."* That is not a time question the
way Store Ops' question is. It's a composition question — of the sales a store generated, how much
came from which category — and `gold.daily_sales_summary` was never built to answer it, because it has
no category dimension at all. `gold.category_breakdown` exists specifically for this: one row per
`store_id`, `category`, and `sale_date`, holding `total_sales` and `total_quantity`.

## The visuals, and why each one earns its place

- **A bar chart of `total_sales` by `category`.** This is the core answer to "which categories are
  driving sales." A bar chart, not a line chart, because the question isn't about a trend over time —
  it's about comparing a handful of discrete categories against each other at a glance. Bars make that
  side-by-side comparison far easier to read than a line ever could.
- **A `store_id` slicer.** The Regional Manager's question explicitly includes "whether that's
  different store to store" — so the same bar chart needs to be able to answer the question for one
  store, a handful of stores, or the whole region, exactly the same way the Store Ops page's slicer
  works for its own chart.
- **A `sale_date` slicer.** Unlike the Store Ops page, where date is the x-axis of the main chart
  itself, here date is a filter on the question, not the shape of the answer. The Regional Manager
  might want this quarter's category mix, or compare it to last quarter's — a date slicer supports
  that without turning the bar chart into a trend chart it was never meant to be.

## Why this page looks different from the Store Ops page, on purpose

Both pages live in the same Power BI model, built from the same underlying pipeline, and both use a
`store_id` slicer — but they answer genuinely different questions, so they look genuinely different.
The Store Ops page is built around time as the main axis, because its question is about direction and
change day to day. This page is built around category as the main axis, because its question is about
composition — how sales break down across categories — not about watching a number move over time.
Putting `sale_date` on a slicer here instead of an axis is the same design instinct as the Store Ops
page's `store_id` slicer: whatever dimension the question treats as "pick one to focus on" becomes a
slicer, and whatever dimension the question is actually about becomes the chart's main axis.

## Key terms

| Term | Meaning |
|---|---|
| Composition question | A question about how a total breaks down across categories, not how it changes over time |
| Bar chart | A visual built for comparing discrete categories against each other, not for showing a trend |
| Shared data model | Both report pages drawing from the same Power BI model, loaded once in Lesson 10 |
| Main axis vs. slicer | The dimension a chart is built around (the question's real subject) versus the dimension used to focus the view |

## Lab

Write the Regional Manager's question from Lesson 1 in your own words, then write, for this page,
which dimension becomes the bar chart's main axis and which two dimensions become slicers — and
explain in one sentence why `sale_date` is a slicer here but was the x-axis on the Store Ops page.

## Check yourself

Without looking back at the lesson: name the Gold table this page is built on, name its three visuals,
and explain why a bar chart fits this question better than the line chart used on the Store Ops page.
