# Lesson 89 — Build the Report

**Chapter 12 · Capstone Project · Lesson 6 of 10**

## What you'll learn

- Three report pages, one per group of Lesson 84 requirements
- Choosing each visual against Chapter 7's honesty checklist
- Applying Chapter 8's reading-order placement, page by page
- Why this capstone doesn't need a fourth page

## Three pages, not one

Trying to cram regional performance, profitability, and fulfillment
onto a single page would violate Chapter 8's "fit it to one screen"
rule the moment real numbers replace placeholder data. Three focused
pages, each answering one part of Lesson 84's scope, works better
than one crowded page:

1. **Regional Performance** — territory-level sales vs. target.
2. **Product Profitability** — category/subcategory margin.
3. **Fulfillment & Trend** — reseller on-time rate, plus
   year-over-year.

## Page 1: Regional Performance

- **Headline card**: `Total Sales`, top-left, largest element on the
  page (Chapter 8, Lesson 64's reading-order principle).
- **Map or bar chart**: `Sales vs. Target %` by
  `DimSalesTerritory[SalesTerritoryRegion]` — a bar chart sorted
  descending is more honest than a map for precise comparison
  (Chapter 7, Lesson 61's distortion checklist).
- **Table**: territory, sales, target, variance — the detail behind
  the headline, for anyone who wants to drill past the summary.

## Page 2: Product Profitability

- **Headline card**: overall `Gross Margin %`.
- **Bar chart**: `Gross Margin %` by
  `DimProductCategory[EnglishProductCategoryName]`, sorted descending
  — never sorted alphabetically, which would bury the real story.
- **Scatter or column chart**: revenue vs. margin by subcategory, so
  a viewer can spot the "high revenue, low margin" categories Lesson
  88's requirement was specifically asking about.

## Page 3: Fulfillment & Trend

- **Headline card**: `Sales YoY %` — is this year ahead of last year?
- **Gauge or card**: reseller on-time fulfillment rate.
- **Line chart**: `Total Sales` by month, current year vs. prior year
  overlaid — the visual form of the `SAMEPERIODLASTYEAR` measure from
  Lesson 88.

## Consistency across all three pages

Reuse the same color for "sales," the same color for "target/prior
year," and the same sort direction convention everywhere. A viewer
who's learned page 1's color coding shouldn't have to relearn it on
page 2 — that consistency itself was the point of Chapter 8, Lesson
65.

## Key terms

| Term | Meaning |
|---|---|
| Reading order | Placing the most important element where the eye naturally lands first |
| Distortion checklist | Chapter 7's list of chart choices that mislead rather than inform |

## Lab

1. Build all three report pages described above, using the measures
   from Lesson 88.
2. On each page, confirm the headline card is the largest, top-left
   element — check this against Chapter 8's reading-order principle
   directly.
3. Confirm your color and sort conventions are identical across all
   three pages before moving to Lesson 90.

## Check yourself

You're ready for Lesson 90 when each of your three pages answers
exactly one group of Lesson 84's requirements, with a headline number
a viewer could name in under five seconds.
