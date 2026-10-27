# Lesson 11 — Building the Store Ops Page

**Chapter 1 · Data Engineering Capstone — Intermediate Project · Lesson 11 of 16**

## What you'll learn
- What Store Ops actually needs from a report page, and why that question hasn't changed since the Beginner project
- Which visuals turn `gold.daily_sales_summary` into an answer to that question
- Why `store_id` belongs on a slicer instead of baked into a fixed chart
- Why a callout card earns a spot on the page even though it's "just one number"

## The question this page has to answer

Store Operations' question has never changed, from the Beginner project through everything built in
this course: *how are my stores doing, day to day?* That's a trend question, with a store-level lens —
Store Ops needs to see whether sales are climbing, flat, or falling over time, and needs to be able to
check that for a specific store without someone building them a separate report per location.
`gold.daily_sales_summary` was built at exactly the grain this question needs: one row per `store_id`
per `sale_date`, holding `total_sales` and `total_transactions`.

## The visuals, and why each one earns its place

This page needs three things, no more:

- **A line chart of `total_sales` by `sale_date`.** This is the trend itself — the visual that directly
  answers "how are we doing over time." A line, not a bar chart, because the question is about direction
  and change, and a line makes an upward or downward trend immediately visible in a way a bar chart of
  daily totals doesn't.
- **A `store_id` slicer.** Store Ops doesn't ask about the whole chain in the abstract — they ask about
  *their* stores, one at a time, or a handful at a time. A slicer on `store_id` lets the exact same line
  chart answer "how's store 14 doing" and "how's store 22 doing" without maintaining two separate pages
  or two separate charts. This is also why `store_id` stays a slicer instead of getting baked into the
  chart as a fixed filter or a separate line per store — a slicer keeps the page flexible for whichever
  store (or stores) someone actually wants to check today.
- **A `total_transactions` callout.** A single big number, showing total transaction count for whatever
  `store_id` and date range is currently selected. It looks small next to a trend chart, but it answers a
  question the trend line alone can't: *is this a few large transactions or a lot of normal ones?* Sales
  dollars and transaction count can tell different stories — a callout keeps that second number visible
  at a glance instead of forcing Store Ops to dig for it.

## Why this is the right page, and not a bigger one

It would be easy to add more to this page — a category breakdown, a comparison across stores side by
side, a month-over-month percent change. None of that belongs here. Store Ops' actual question is a
day-to-day, store-level trend question, not a category question (that's the Regional Manager's page,
built next lesson, on a different Gold table entirely) and not a cross-store comparison question (a
different ask Store Ops hasn't made). A report page earns its visuals by answering the question that
was actually asked — not by using every column a Gold table happens to expose.

## Key terms

| Term | Meaning |
|---|---|
| Trend visual | A chart whose job is showing direction and change over time, not a single snapshot |
| Slicer | A filter control that lets the viewer change what a chart shows without editing the report itself |
| Callout | A single prominent number on a report page, used when one value deserves attention on its own |
| Report page | One stakeholder-facing view built from a shared data model, scoped to one real question |

## Lab

List, in your own words, the three visuals this page needs and the one sentence of justification for
each — then write one sentence explaining why a category breakdown by product line would be the wrong
addition to this specific page, even though the data to build it already exists elsewhere in this model.

## Check yourself

Without looking back at the lesson: name the Gold table this page is built on, name its three visuals,
and explain in one sentence why `store_id` is a slicer rather than a fixed per-store chart.
