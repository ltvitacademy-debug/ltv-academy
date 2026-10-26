# Lesson 10 — Building the Marketing Manager's Segment Page

**Chapter 1 · Intermediate Capstone: Customer Segment & Territory Report · Lesson 10 of 16**

## What you'll learn

- Building the page that actually answers the Marketing Manager's original question
- Choosing visuals that show a two-category mix clearly
- Binding each card and visual to the correct measure, deliberately
- Why this page is built carefully, right before Lesson 11 moves faster

## What this page needs to answer

Back in Lesson 1: the Marketing Manager wants the sales mix between Individual customers and
Store/Reseller customers. This page needs to answer that directly, at a glance, without making
anyone dig through a table first.

## The visuals

- A **donut or stacked bar chart**, `DimCustomer[CustomerSegment]` on legend/axis, `[Total Sales]`
  as the value — the sales mix itself, the core answer.
- Two **cards**, one filtered to `Individual`, one filtered to `Store/Reseller`, both bound to
  `[Total Sales]` — a clean side-by-side dollar comparison.
- A **table** with `CustomerSegment`, `[Total Sales]`, `[Order Count]`, and
  `[Pct of Company Total (Segment)]` — the detail view, for anyone who wants the exact numbers
  behind the chart.
- A **segment slicer** (`DimCustomer[CustomerSegment]`), so the Marketing Manager can isolate
  either segment across the whole page.

## Binding each card to the right measure, carefully

Every card and visual on this page gets bound to `[Total Sales]` or `[Order Count]` — the plain,
filter-responsive measures, not either of the "(All …)" benchmark measures from Lesson 9. The
`[Pct of Company Total (Segment)]` measure, which *does* use the benchmark internally, only
appears in the detail table, where its denominator role is explicit and visible in the column
header next to the numbers it's comparing.

## Why care about this now

With three similarly-named "Total Sales" measures sitting in the Fields pane, it's easy to drag
the wrong one onto a card without noticing — especially while moving quickly through two pages in
one build session. This page gets built carefully, with each binding checked deliberately. Lesson
11 builds the next page at a faster pace, which is exactly the condition under which this kind of
mistake tends to happen.

## Key terms

| Term | Meaning |
|---|---|
| Sales mix visual | A chart showing the relative share of two or more categories |
| Slicer | A Power BI filter control a user interacts with directly on the page |
| Detail table | A table visual showing the exact numbers behind a summary chart |

## Lab

Build the segment page exactly as described: the mix chart, the two segment cards, the detail
table, and the segment slicer. Click each card individually and confirm, in the Fields pane, that
it's bound to `[Total Sales]` — not one of the benchmark measures — before moving on.

## Check yourself

You're ready for Lesson 11 when you can answer, without looking: which measure does every card and
chart on this page use, and where specifically does `[Pct of Company Total (Segment)]` appear on
this page?
