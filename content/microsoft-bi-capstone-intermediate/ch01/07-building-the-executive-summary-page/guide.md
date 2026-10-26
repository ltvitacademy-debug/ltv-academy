# Lesson 7 — Building the Executive Summary Page

**Chapter 1 · Intermediate Capstone: The Weekly Sales & Fulfillment Report · Lesson 7 of 16**

## What you'll learn

- Designing a report page around a time-constrained audience
- Building the KPI cards, trend chart, and region slicer the Sales Director asked for
- Why this page has a long Fields list of similarly-named measures to pick from
- Why a wrong field choice on a card can look completely correct at first glance

## Design for how the Sales Director actually uses this page

Lesson 1's requirements list said: total sales, average order value, a trend line, refreshed
weekly, company-wide. This page should answer those in under ten seconds, standing up in a
Monday meeting — not invite exploration. That means:

- A row of **KPI cards** across the top: Total Sales, Average Order Value, Total Units.
- A **trend line chart** of `Total Sales` by week, using the `Date` table.
- One **Region slicer**, so the Sales Director can check a specific territory without leaving the
  page, plus a **"% of Company Total"** card for context next to whichever region is selected.
- Nothing else. No product-level detail — that's the Drill-Down page's job in Lesson 8.

## Building it

1. Add a Card visual, drag `[Total Sales]` into the Fields well.
2. Add two more cards for `[Average Order Value]` and `[Total Units]`.
3. Add a Line chart: `Date[Date]` (by week) on the X-axis, `[Total Sales]` on Y.
4. Add a slicer on `TerritoryDim[TerritoryName]`.
5. Add a fourth card for `[Pct of Company Total]`, formatted as a percentage.

## A real hazard: the Fields pane is long now

By the end of Lesson 6, the model's Fields pane lists `Total Sales`, `Total Units`,
`Order Count`, `Average Order Value`, `Avg Days to Ship`, `Prior Week Sales`,
`Total Sales (All Regions)`, and `Pct of Company Total` — eight measures, several with
overlapping names, sitting under the same `Fact` table in a list sorted alphabetically.
`Total Sales` and `Total Sales (All Regions)` land right next to each other.

This matters because building a page like this is fast, repetitive work — card after card, drag
after drag — and fast, repetitive work is exactly where a wrong click is easy to make and easy to
miss. A card bound to the wrong one of two similarly-named measures still renders. It still shows
a number. It still looks like a finished KPI card.

## Why you might not catch it today

Recall from Lesson 6: `[Total Sales]` and `[Total Sales (All Regions)]` return the **same number**
whenever no region filter is applied. If you build and review this page's cards with the Region
slicer still on its default "nothing selected" state — which is exactly how you'd glance at a page
right after building it — a card bound to the wrong measure shows the correct-looking number
anyway. The mismatch only becomes visible once someone actually picks a specific region on the
slicer. That's not a hint to go hunt for a mistake right now — it's just worth knowing as you move
through the next few lessons.

## Key terms

| Term | Meaning |
|---|---|
| KPI card | A single-number visual, built for a glance, not exploration |
| Fields pane | Power BI's list of available columns and measures, organized by table |
| Default slicer state | A slicer with nothing selected — the state a page loads in |

## Lab

Build the Executive Summary page as described: three base KPI cards, the trend line, the Region
slicer, and the `Pct of Company Total` card. Leave the Region slicer unselected (its default
state) and confirm all four cards show a number — don't pick a region yet.

## Check yourself

You're ready for Lesson 8 when you can answer, without looking: why can a KPI card bound to the
wrong measure still look completely correct the first time you glance at it?
