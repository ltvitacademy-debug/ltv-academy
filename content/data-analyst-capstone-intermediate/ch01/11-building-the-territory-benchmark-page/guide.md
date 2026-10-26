# Lesson 11 — Building the Sales Director's Territory Benchmark Page

**Chapter 1 · Intermediate Capstone: Customer Segment & Territory Report · Lesson 11 of 16**

## What you'll learn

- Building the page that answers the Sales Director's territory benchmark question
- A headline card meant to show a selected territory's total against the company figure
- A table comparing every territory to the company total at once
- Why "built quickly" is worth noticing as you go, not just after something breaks

## What this page needs to answer

The Sales Director wants to see how a selected territory's sales compare to the company as a
whole — a benchmark, not just a raw number.

## The visuals

- A **headline card**, meant to show the currently-filtered territory's Total Sales.
- A **table**, `DimTerritory[TerritoryName]` on rows, `[Total Sales]`,
  `[Pct of Company Total (Territory)]`, and `[Order Count]` as values — every territory benchmarked
  against the company total at once, in one view.
- A **territory slicer** (`DimTerritory[TerritoryName]`), so the Sales Director can drill into one
  territory and watch the headline card respond.

## Building it at a faster pace

This page gets built in one longer, faster pass than Lesson 10's — the Fields pane now has five
measures whose names all start with "Total Sales": the plain measure, both "(All …)" benchmark
measures, and both percent measures sitting near them alphabetically. Dragging a measure onto the
headline card from a long, similarly-named list, without re-checking the exact name afterward, is
an easy, ordinary mistake to make at this pace — and it's exactly the kind of mistake this
project's later lessons are built to catch.

## What the page looks like once it's built

With the table and slicer in place, the table correctly shows a different `[Total Sales]` per
territory, and `[Pct of Company Total (Territory)]` correctly varies too. The headline card, built
quickly earlier in this same session, shows some number — and at first glance, with no filter
selected yet, it looks exactly right, because every "Total Sales" measure agrees when nothing is
filtered. That's the same detail from Lesson 9's "worth sitting with" note, now live on a real
page.

## Key terms

| Term | Meaning |
|---|---|
| Headline card | A single prominent number meant to summarize the page's current filter state |
| Benchmark table | A table comparing every category's figure against a company-wide total |

## Lab

Build the territory page exactly as described. Don't click the headline card's Fields-pane binding
to check it yet — that's deliberately Lesson 13's and 14's job. Just confirm the table and slicer
work, and that the headline card shows a number that looks reasonable with no filter applied.

## Check yourself

You're ready for Lesson 12 when you can answer, without looking: why would a mis-bound headline
card be easy to miss immediately after building this page, specifically with no territory filter
applied yet?
