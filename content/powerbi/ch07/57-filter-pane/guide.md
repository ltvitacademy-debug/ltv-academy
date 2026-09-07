# Lesson 57 — Filters & the Filter Pane

**Chapter 7 · Building Reports & Visualizations · Lesson 6 of 10**

## What you'll learn

- The three levels a filter can apply at, and how they stack
- What any viewer can see about the filters affecting a visual
- Locking and hiding filters so consumers can see, but not change, them
- The Apply button, for batching filter changes instead of querying on every click

## Three levels, one pane

Every filter you build lives in the **Filters** pane, and applies at
one of three levels:

- **Visual-level**: affects only the one visual it's attached to.
- **Page-level**: affects every visual on the current report page.
- **Report-level**: affects every visual on every page of the report.

Add a visual to the canvas, and Power BI automatically creates a
visual-level filter card for each field the visual uses. Drag any other
field into the Filters pane to add more, at whichever level you drop it.

## What every viewer can already see

Even without opening the Filters pane, any viewer can hover over a
visual to see a read-only summary of exactly what's filtering it:

![Screenshot of a line chart with a filter icon selected, showing a popup list of filters and slicers affecting the visual — Category, DM, and District.](/courses/power-bi/ch07/57-filter-pane/power-bi-filter-visual.png)
*Every active filter and slicer touching this one visual, in one glance — no editing, just visibility.*

This is worth knowing when you design reports for other people: they
can always check what's filtering a confusing number, even if the
Filters pane itself is hidden.

## Locking and hiding individual filters

Not every filter belongs in front of a viewer. Two controls on each
filter card handle this:

- **Lock**: viewers can see the filter, but can't change it.
- **Hide**: viewers can't see the filter at all.

Hiding is typically for data-cleanup filters — excluding nulls or test
rows — that a viewer has no reason to know about, let alone adjust.

## Formatting the pane to match your report

The Filters pane doesn't have to look like a bolted-on afterthought.
Select the report background, then **Format**, and you can set the
pane's background color, border, and transparency — plus separate
colors for filter cards depending on whether they're **Applied** or
**Available**:

![Screenshot of the Format pane in Power BI Desktop showing Filters pane background, border, and color settings expanded.](/courses/power-bi/ch07/57-filter-pane/power-bi-desktop-format-filter-pane.png)
*Different colors for applied vs. available cards make it obvious, at a glance, which filters are actually doing something.*

## Batch filter changes with the Apply button

By default, each filter change re-queries the report immediately — fine
for small models, sluggish for large ones. Turning on a single **Apply**
button lets viewers make several filter changes first, then apply them
all together in one query:

![Screenshot of the Filters pane with several filter cards set and a yellow Apply button at the bottom.](/courses/power-bi/ch07/57-filter-pane/apply-filter-button.png)
*Change Category, Design Factor, Product, and Status first — nothing re-queries until Apply is selected.*

Turn this on under **File → Options and settings → Options → Query
reduction**. It's a small setting with an outsized effect on perceived
performance for larger reports.

## Key terms

| Term | Meaning |
|---|---|
| Visual-level filter | Applies to one specific visual only |
| Page-level filter | Applies to every visual on the current page |
| Report-level filter | Applies to every visual across the entire report |
| Lock / Hide filter | Prevents a viewer from changing, or from seeing, a specific filter |

## Lab

1. On a report page built from **AdventureWorksDW2014**, add a
   report-level filter on `DimDate[CalendarYear]` and confirm it affects
   every page, not just the current one.
2. Add a visual-level filter to just one chart, and hover over that
   visual to confirm the filter icon shows it in the read-only summary.
3. Turn on the **Apply** button under Query reduction options, make
   several filter changes at once, and confirm nothing re-queries until
   you select Apply.

## Check yourself

You're ready for Lesson 58 when you can explain the difference between
locking a filter and hiding it, and when you'd choose each.
