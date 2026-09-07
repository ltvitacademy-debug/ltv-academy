# Lesson 90 — Add Interactivity

**Chapter 12 · Capstone Project · Lesson 7 of 10**

## What you'll learn

- One slicer per page, chosen for what that page's audience needs
- A drillthrough page from summary straight to territory-level detail
- Cross-filtering behavior, checked rather than assumed
- Why more interactivity isn't automatically better

## One slicer per page, not five

Each page gets exactly **one** slicer, matched to what that page is
actually for:

- **Regional Performance**: slice by `DimDate[CalendarYear]` — the
  VP will want to compare years without leaving the page.
- **Product Profitability**: slice by
  `DimProductCategory[EnglishProductCategoryName]` — narrow to one
  category at a time.
- **Fulfillment & Trend**: slice by
  `DimSalesTerritory[SalesTerritoryRegion]` — check whether
  fulfillment problems cluster in one region.

Adding slicers for every field "just because you can" recreates the
cluttered-dashboard problem Chapter 8 spent a whole lesson warning
against. One well-chosen slicer beats four the viewer will never
touch.

## A drillthrough to territory detail

Build a fourth, hidden page: **Territory Detail**. Set it up as a
**drillthrough** target from the Regional Performance page's
territory table — right-clicking any territory row jumps straight to
a detail page filtered to just that territory, showing product-level
breakdown underneath it.

This is exactly the pattern from earlier report-building lessons:
summary pages stay clean, and anyone who wants to go deeper has a
path to do it without cluttering the summary itself.

## Checking cross-filter behavior

By default, selecting a bar in one visual filters every other visual
on the page. Before calling this done, click through each page and
confirm:

- Selecting a territory on the map/bar chart filters the detail table
  correctly.
- Selecting a category on Page 2 updates both the bar chart and the
  revenue-vs-margin visual together.

If a visual doesn't respond the way you'd expect, check its **Edit
interactions** setting — a visual can be deliberately excluded from
cross-filtering, and it's worth confirming that's intentional rather
than an accident.

## More interactivity isn't automatically better

A dashboard where every click does something can be genuinely harder
to use than one with a few, well-chosen interactions — a viewer who
isn't sure what's clickable ends up clicking everything, defeating
the "glance and understand" goal from Chapter 8. Add interactivity
because a specific requirement needs it, not because Power BI makes
it easy to add.

## Key terms

| Term | Meaning |
|---|---|
| Slicer | A visual filter control a viewer interacts with directly |
| Drillthrough | A hidden detail page reached by right-clicking a data point on a summary page |
| Edit interactions | The setting controlling whether a visual responds to another visual's selection |

## Lab

1. Add exactly one slicer to each of your three pages, matching the
   choices above.
2. Build the hidden Territory Detail page and configure it as a
   drillthrough target from Page 1's territory table.
3. Test cross-filtering on every page by selecting different data
   points and confirming the rest of the page responds as expected.

## Check yourself

You're ready for Lesson 91 when you can right-click a territory on
Page 1 and land on a correctly filtered detail page, and you can
explain why each page has exactly one slicer rather than several.
