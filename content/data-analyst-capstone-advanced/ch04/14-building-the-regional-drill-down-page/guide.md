# Lesson 14 — Building the Regional Drill-Down Page

**Chapter 4 · The Power BI Operational Dashboard · Lesson 14 of 26**

## What you'll learn

- How to build a page an Executive can genuinely click through live,
  from a company-wide view down to one territory
- Using `dw.DimTerritory[TerritoryGroup]` and `[TerritoryName]` as a
  real two-level drill hierarchy
- Putting `[Pct of Company Total]` to work as the measure that makes
  drilling meaningful, not just decorative
- Why this page is the one place in this capstone where
  `[Total Sales (All Territories)]` actually earns its keep

## The drill hierarchy

`dw.DimTerritory` has two real levels worth drilling through:
`TerritoryGroup` (the region, e.g. "North America," "Europe,"
"Pacific") and `TerritoryName` (the individual territory within it,
e.g. "Southwest," "France"). In Power BI's Model view, build a
hierarchy on `dw.DimTerritory` with `TerritoryGroup` above
`TerritoryName`. A clustered bar chart of `[Total Sales]` built on
that hierarchy lets an Executive click a bar for "Europe" live, in the
meeting, and drill straight into its individual territories — no
rebuilding the visual, no switching pages.

## Showing share, not just dollars

A bar chart of raw `[Total Sales]` by territory answers "which
territory sold the most," but a QBR audience usually wants a second,
harder question answered too: "is that territory *proportionally*
strong, or does it just look big because it's a big region." That's
exactly what Lesson 12's `[Pct of Company Total]` measure exists for:

```dax
Pct of Company Total =
DIVIDE ( [Total Sales], [Total Sales (All Territories)] )
```

Adding `[Pct of Company Total]` as a data label on the same bar chart
turns a chart of raw dollars into a chart that also answers "how much
of the whole pie is this." This is the one place in the whole
dashboard where `[Total Sales (All Territories)]`'s unfiltered,
`ALL`-driven value does real work — every bar's percentage is
computed against that same constant denominator, no matter which bar
(or drill level) is currently selected.

## Why the drill has to respect the slicer from Lesson 13

If this page shares the same quarter/year slicer built in Lesson 13
(a common slicer placed on a shared background, or synced across
pages via **Format → Edit interactions** / sync slicers), drilling into
a single territory for Q3 shows exactly Q3's numbers for that
territory — not an all-time total that would silently mix periods
together. Confirming the slicer and the drill hierarchy interact
correctly, rather than assuming they do, is part of actually finishing
this page, not an afterthought.

## Key terms

| Term | Meaning |
|---|---|
| Drill hierarchy | A defined parent-child structure (here, `TerritoryGroup` → `TerritoryName`) that lets a visual expand from a coarser to a finer level on click |
| Share-of-total | A percentage measure, computed against a fixed unfiltered denominator, showing how one slice compares to the whole |

## Lab

1. Build a `TerritoryGroup → TerritoryName` hierarchy on
   `dw.DimTerritory` in Model view.
2. Build a clustered bar chart of `[Total Sales]` using that
   hierarchy, and confirm you can click a region bar to drill into its
   individual territories.
3. Add `[Pct of Company Total]` as a label on the same chart, and
   confirm the percentages at the `TerritoryGroup` level sum to 100%.

## Check yourself

You're ready for Lesson 15 when you can explain why `[Pct of Company
Total]` needs `[Total Sales (All Territories)]`'s `ALL`-based
denominator specifically, and why this page's drill hierarchy has to
respect the same quarter slicer as the Executive Summary page.
