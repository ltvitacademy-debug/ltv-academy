# Lesson 7 — Prorate Conventions and Calendars

**Chapter 2 · Depreciation Setup · Lesson 7 of 33**

## What you'll learn

- What a prorate convention actually decides
- Why the prorate calendar is a separate structure from the depreciation calendar
- How to work through a mid-year placed-in-service example by hand
- Why the same asset can get a different first-year depreciation amount under different conventions

## The problem a prorate convention solves

Very few assets are placed in service on the first day of a fiscal year. If Meridian Fabrication Co. places a machine in service in month 7 of a 12-month fiscal year, how much of that year's annual depreciation should it actually take — the full amount, half, or something based on the exact date? That's exactly what a **prorate convention** decides: it maps an asset's **date placed in service (DPIS)** to a **prorate period**, which in turn determines what fraction of a full year's depreciation is taken in the first (and sometimes last) year of the asset's life.

Common convention styles include:

- **Mid-month** — treats every asset placed in service anywhere within a given month as if it were placed in service at that month's midpoint, so the first-year fraction depends only on which month, not the exact day.
- **Mid-quarter** — the same idea, coarser: everything within a quarter is treated as placed in service at the quarter's midpoint.
- **Half-year** — a common US tax convention: regardless of when in the year an asset is placed in service, it gets exactly half a year of depreciation in year one (and the remaining half typically falls in the year after the end of its stated life).

## Two separate calendars

This lesson's title mentions calendars for a reason: Oracle Fusion Assets uses two distinct calendar structures, and conflating them is a common setup mistake.

- **Depreciation calendar** — defines the fiscal years and periods a *book* uses to calculate and allocate depreciation expense period by period. It does not have to be identical to the General Ledger's accounting calendar, though many implementations keep them aligned to simplify reconciliation (Lesson 31).
- **Prorate calendar** — a separate calendar that maps calendar date ranges to **prorate periods**, which is what a prorate convention actually references when it looks up where an asset's date placed in service falls.

A category book (Lesson 4) is assigned both a depreciation method and a prorate convention; the prorate convention then relies on the book's prorate calendar to translate an actual date into a prorate period.

## Working an example

Suppose Meridian's $120,000 CNC machine from Lesson 6 ($10,000 full-year straight-line depreciation) is placed in service on August 10, inside a calendar-year fiscal year, under a mid-month convention:

```
Full-year depreciation:         $10,000
Months remaining in the year
  (Aug through Dec, mid-month
  treats Aug as a full month):  5 of 12

Year-one depreciation =
  $10,000 x (5 / 12) = $4,166.67 (rounded)
```

Under a half-year convention instead, that same machine would simply take $5,000 in year one — half the annual amount — regardless of whether it was placed in service in February or November. Same asset, same cost, same life: a materially different first-year number purely because of the convention assigned to its book and category.

## Key terms

| Term | Meaning |
|---|---|
| Prorate convention | The rule mapping an asset's date placed in service to a prorate period, determining the first (and last) year's depreciation fraction |
| Date placed in service (DPIS) | The date depreciation starts being calculated for an asset |
| Prorate period | A defined slice of the prorate calendar an asset's DPIS is mapped into |
| Depreciation calendar | The fiscal year/period structure a book uses to calculate and allocate depreciation, distinct from the prorate calendar |

## Lab

Meridian places a second CNC machine in service on November 20 (same $120,000 cost, $20,000 salvage, 10-year life, same calendar-year fiscal year). Calculate its year-one depreciation under a mid-month convention, then under a half-year convention. Write one sentence explaining why the two answers differ so much.

## Check yourself

Without looking back, can you explain the difference between a depreciation calendar and a prorate calendar, and state what a mid-month convention does differently from a half-year convention?
