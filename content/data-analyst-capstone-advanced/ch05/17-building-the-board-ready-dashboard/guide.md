# Lesson 17 — Building the Board-Ready Dashboard

**Chapter 5 · The Tableau Board Deck · Lesson 17 of 26**

## What you'll learn

- How to write a real Tableau calculated field for a KPI this deck
  needs
- How a `{FIXED : ...}` Level of Detail expression is Tableau's real
  equivalent of Power BI's `CALCULATE` + `ALL` pattern
- Why an LOD expression ignoring sheet-level filters is exactly what a
  board-wide benchmark requires
- How to assemble worksheets into one dashboard, tied together with
  dashboard actions

## A calculated field for Average Order Value

Tableau doesn't have `dw.FactProductSales[LineTotal]` pre-aggregated
into a reusable measure the way Power BI's DAX measures work — a
calculated field fills that role:

```
// Average Order Value
SUM([Line Total]) / COUNTD([Sales Order Id])
```

`COUNTD` (Tableau's distinct count) on `Sales Order Id`, not a plain
row count, for the exact same reason Lesson 12's `[Order Count]`
measure used `DISTINCTCOUNT` — the underlying data is at the order-line
grain, so counting rows would count lines, not orders.

## The real Tableau equivalent of CALCULATE + ALL

Lesson 12 built `[Total Sales (All Territories)]` in DAX using
`CALCULATE` with `ALL ( DimTerritory )` — a measure that deliberately
ignores whatever territory filter is currently applied. Tableau's
direct equivalent is a **Level of Detail (LOD) expression** using
`FIXED`:

```
// Total Sales (All Territories)
{ FIXED : SUM([Line Total]) }
```

`{FIXED : ...}` computes its expression at a fixed level of detail —
here, with **no dimensions named inside the braces at all** — which
means it ignores whatever filters a sheet or dashboard currently has
applied through the view, the same way `ALL` strips away filters in
DAX. Naming no dimensions inside `FIXED` is deliberate: it's what
makes this expression compute one single company-wide number,
regardless of which territory a viewer is currently looking at.

```
// Pct of Company Total
SUM([Line Total]) / [Total Sales (All Territories)]
```

This is the exact same benchmark-and-share pattern Lesson 12 built in
DAX, now rebuilt with Tableau's own real syntax — proof that the
underlying business logic is identical across tools, even though each
tool expresses it differently.

## Why FIXED, specifically, is the right LOD level

Tableau offers three LOD keywords — `FIXED`, `INCLUDE`, and `EXCLUDE`
— and the choice between them matters. `INCLUDE` and `EXCLUDE` both
adjust the level of detail *relative to* the view's current
dimensions, which means their result can still change depending on
what's on the sheet. `FIXED` with no dimensions named is the only one
of the three that produces a genuinely constant value no matter what
the view shows — exactly the property a company-wide benchmark
requires.

## Assembling the dashboard

Create a new dashboard, drag in a worksheet with
`[Total Sales]`/`[Pct of Company Total]` by territory, and a second
worksheet trending `[Total Sales]` by quarter. Add a **dashboard
action** (**Dashboard → Actions → Add Action → Filter**) so clicking a
territory in one worksheet filters the other — a Tableau-native way to
give the Board the same kind of click-through interactivity Power BI
gave Executives, built with Tableau's own real mechanism rather than
copying Power BI's.

## Key terms

| Term | Meaning |
|---|---|
| Calculated field | A reusable formula defined once in Tableau, the rough equivalent of a DAX measure |
| Level of Detail (LOD) expression | A calculation that computes at a different granularity than the current view |
| `FIXED` | An LOD keyword that computes at a specified, constant level of detail, ignoring the view's filters when no dimensions are named |
| Dashboard action | A Tableau mechanism linking worksheets so a selection in one filters or highlights another |

## Lab

1. Build the `Average Order Value` calculated field above.
2. Build `Total Sales (All Territories)` as a `FIXED` LOD expression
   and `Pct of Company Total` on top of it.
3. Build two worksheets and combine them into a dashboard with a
   filter action, confirming a click on one territory filters the
   other worksheet.

## Check yourself

You're ready for Lesson 18 when you can explain why `{FIXED :
SUM([Line Total])}` with no dimensions named behaves like `CALCULATE`
+ `ALL` in DAX, and why `FIXED` is the right LOD keyword here instead
of `INCLUDE` or `EXCLUDE`.
