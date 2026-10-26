# Lesson 8 — Building the Region & Product Drill-Down Page

**Chapter 1 · Intermediate Capstone: The Weekly Sales & Fulfillment Report · Lesson 8 of 16**

## What you'll learn

- Designing a page for an audience that explores, not glances
- Building a matrix broken out by territory and product subcategory
- Adding the fulfillment metric the Executive Summary page doesn't need
- Using the plain `[Total Sales]` measure correctly, on purpose, here

## Design for how the Operations Manager actually uses this page

Lesson 1's requirements said the Operations Manager needs to slice by specific regions and
product lines, and care about fulfillment. This page is built for exploration, the opposite of
Lesson 7's page:

- A **Matrix** visual: `TerritoryDim[TerritoryName]` on rows, `ProductDim[SubcategoryName]` on
  columns, `[Total Sales]` as the value — so she can scan a full grid, not read one number at a
  time.
- A **Region slicer** on `TerritoryDim[TerritoryName]` and a **Subcategory slicer** on
  `ProductDim[SubcategoryName]`, both independent of the Executive Summary page's slicer.
- A **KPI card row**: `[Total Sales]`, `[Total Units]`, `[Avg Days to Ship]` — the fulfillment
  metric that has no place on the executive page, but matters directly to Operations.

## Building it

1. Add a Matrix: rows = `TerritoryDim[TerritoryName]`, columns = `ProductDim[SubcategoryName]`,
   values = `[Total Sales]`.
2. Add the Region and Subcategory slicers.
3. Add three cards: `[Total Sales]`, `[Total Units]`, `[Avg Days to Ship]`.
4. Format `[Avg Days to Ship]` to one decimal place — a day-level average doesn't need more
   precision than that.

## Why this page uses the plain `[Total Sales]`, correctly

Unlike the Executive Summary's `Pct of Company Total` card, nothing on this page needs a
filter-stripped benchmark — every number here is supposed to respond to whichever region and
subcategory the Operations Manager has selected. That's exactly what the plain `[Total Sales]`
measure does: no `ALL`, no filter override, just `SUM(Fact[LineTotal])` evaluated inside whatever
filter context the slicers and matrix cells create.

## Why this matters once both pages exist

With both pages live, `[Total Sales]` on this page and whatever card is bound to it on the
Executive Summary page should now agree for any matching filter selection — same underlying
measure, same filter logic, same real data. If they ever don't agree for the same region, that's
a signal worth taking seriously, not a rounding quirk to wave off.

## Key terms

| Term | Meaning |
|---|---|
| Matrix visual | A pivot-table-style grid, good for scanning two dimensions at once |
| Independent slicer | A slicer on one page that doesn't affect filters on another page |
| Fulfillment metric | A measure about delivery timing, not revenue |

## Lab

Build the Drill-Down page as described, then pick one territory on this page's Region slicer and
note the `[Total Sales]` card's number. You'll come back to that exact number in Lesson 10.

## Check yourself

You're ready for Lesson 9 when you can answer, without looking: why does this page use the plain
`[Total Sales]` measure instead of `[Total Sales (All Regions)]`, and what should be true about
that number compared to the Executive Summary page for the same region?
