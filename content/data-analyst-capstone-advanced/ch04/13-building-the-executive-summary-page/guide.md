# Lesson 13 — Building the Executive Summary Page

**Chapter 4 · The Power BI Operational Dashboard · Lesson 13 of 26**

## What you'll learn

- How to lay out a one-screen Executive Summary page built entirely
  around Lesson 12's five measures
- Why card visuals, not a table, carry the headline numbers
- How a quarter slicer, built from `dw.DimDate`, drives every visual
  on the page at once
- Why this page intentionally shows company-wide numbers only, with
  territory detail deliberately left for Lesson 14

## What an Executive actually looks at first

An executive walking into a QBR meeting needs the answer to "how did
we do" in the first five seconds on screen, before drilling into
anything. That means the top of this page is built from **card
visuals** — one number, one label, nothing to interpret — not a table
that makes the reader hunt for the headline figure.

| Card | Measure |
|---|---|
| Total Sales | `[Total Sales]` |
| Order Count | `[Order Count]` |
| Average Order Value | `[Average Order Value]` |
| Total Units | `[Total Units]` |

## Adding the quarter slicer

A single slicer, built from `dw.DimDate[Quarter]` and
`dw.DimDate[Year]`, sits at the top of the page. Because every visual
on this page reads from measures built on `dw.FactProductSales`, and
that fact table's only path to `dw.DimDate` is through the
relationship Lesson 11 built, one slicer selection filters every card
and every chart on the page simultaneously — this is the real payoff
of getting the model's relationships right before building a single
visual.

## A trend visual, not just a snapshot

Below the cards, a line chart of `[Total Sales]` by month (from
`dw.DimDate[MonthName]`, sorted by `dw.DimDate[FullDate]`) gives the
Executive something a card alone can't: whether this quarter's number
is part of a trend or a one-off blip. A single total, with nothing
to compare it against, invites exactly the kind of unfounded
speculation a trend line heads off before the meeting even reaches
questions.

## Why this page stays company-wide

This page deliberately does **not** break sales down by territory —
no territory slicer, no territory-grouped chart. That's Lesson 14's
job, on its own page, built specifically for drilling into regional
detail. The Executive Summary page answers one question only: how did
the whole company do this quarter. Mixing both jobs onto one page
would mean neither question gets a clean answer — a lesson about
scope that applies as much to dashboard design as it did to the
warehouse's dimensional model back in Chapter 2.

## Key terms

| Term | Meaning |
|---|---|
| Card visual | A Power BI visual showing a single aggregated number, used for headline figures meant to be read instantly |
| Cross-filtering | When a slicer or visual selection automatically filters every other visual connected through the model's relationships |
| Trend visual | A chart (typically a line) showing a measure's change over time, giving context a single snapshot number can't |

## Lab

1. Build the four card visuals above on a new report page named
   "Executive Summary."
2. Add a quarter/year slicer from `dw.DimDate` and confirm selecting a
   different quarter updates every card.
3. Add the monthly `[Total Sales]` trend line and confirm it responds
   to the same slicer.

## Check yourself

You're ready for Lesson 14 when you can explain why this page uses
card visuals instead of a table for its headline numbers, why one
slicer can filter every visual on the page at once, and why territory
detail is deliberately left off this page entirely.
