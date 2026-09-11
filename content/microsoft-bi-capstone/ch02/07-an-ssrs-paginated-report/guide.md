# Lesson 7 — An SSRS Paginated Report

**Chapter 2 · Building the Full Stack · Lesson 7 of 25**

## What you'll learn

- The report this lesson builds — `WorkOrderProductionSummary.rdl` — and
  exactly what it's grouped, filtered, and computed against
- Why this report is a **matrix**, not a simple table, and what that
  buys you against a fact table shaped like `dw.FactWorkOrder`
- How to write the one expression that turns three raw sums into a
  business number: **scrap rate**
- Where a report parameter belongs in a report that's about to be
  reused across every product line in the plant

## The report: WorkOrderProductionSummary.rdl

By the end of Lesson 6, `dw.FactWorkOrder` and its dimensions exist and
are populated. This lesson builds the first thing that actually reads
them: a paginated SSRS report named `WorkOrderProductionSummary.rdl`,
built the same way SSRS Development's own tutorials build one — Report
Builder, a shared data source pointed at the warehouse, and the Table
or Matrix Wizard.

The report is a **matrix** grouped by `Product` (joined in from
`dw.DimProduct` through `FactWorkOrder.ProductKey`), with these columns:

| Column | Source |
|---|---|
| Product | `DimProduct.ProductName` |
| Order Qty | `SUM(FactWorkOrder.OrderQty)` |
| Stocked Qty | `SUM(FactWorkOrder.StockedQty)` |
| Scrapped Qty | `SUM(FactWorkOrder.ScrappedQty)` |
| Scrap Rate | An expression — see below |

Grouping by Product instead of listing every work order row is the
same design decision SSRS Development's own matrix lessons walk
through: a **Matrix** groups data on two independent axes — rows and
columns — and here that's exactly what turns hundreds of individual
`FactWorkOrder` rows into one summary line per product:

![The Row Groups pane and Column Groups pane in Report Builder, each showing a populated grouping hierarchy.](/courses/microsoft-bi-capstone/ch02/07-an-ssrs-paginated-report/report-builder-row-and-column-groups.png)
*The same Report Builder grouping UI SSRS Development's matrix lesson uses — here it's grouping by Product instead of Territory.*

Run the wizard with Product in Row groups and the four measures in
Values, and Report Builder produces the finished cross-tab:

![A finished matrix-style report with grouped rows and summed numeric columns, with subtotals.](/courses/microsoft-bi-capstone/ch02/07-an-ssrs-paginated-report/report-builder-matrix-tutorial.png)
*The real shape a grouped SSRS report produces once run — one summary row per group, with totals.*

## The expression: scrap rate

`ScrappedQty` and `OrderQty` are just numbers on their own. **Scrap
rate** is the business question a plant manager actually asks, and it
only exists as an expression:

```
=Sum(Fields!ScrappedQty.Value) / Sum(Fields!OrderQty.Value)
```

Two things matter about how this is written:

- **`Sum()` wraps both fields.** Without it, the expression divides
  one detail row's values instead of the group's totals — a mistake
  that produces a number that looks plausible and is wrong for every
  group except a group with exactly one row.
- **It goes in the group total row**, not the detail row, since the
  report is grouped by Product and the scrap rate that matters is the
  product's overall rate, not any single work order's.

Format the resulting text box as **Percentage** (right-click → Text Box
Properties → Number → Percentage) rather than baking a `* 100` and a
`"%"` string into the expression itself — the same separation-of-concerns
SSRS Development's formatting lessons teach: expressions compute the
value, formatting decides how it displays.

## Adding a parameter

A report hardcoded to every product forever isn't reusable. Add a
`ProductName` parameter (Report Data pane → right-click Parameters →
Add Parameter), and filter the dataset's query — or the matrix's
filter — on it:

![The Report Data pane showing a Parameters node.](/courses/microsoft-bi-capstone/ch02/07-an-ssrs-paginated-report/reportdata-parameters-node.png)
*Same real Report Data pane SSRS Development's parameters lesson uses — the Parameters node is where this report's product filter lives.*

Leave it with a default of "(All)" using a `Select Parameter Values`
dataset, the same pattern SSRS Development's cascading-parameter
lessons cover — so the report opens fully populated and a plant
manager narrows it only when they want to.

## Key terms

| Term | Meaning |
|---|---|
| Matrix | An SSRS data region grouping data on two axes — here, one axis (Product), with measures across |
| Scrap rate | `ScrappedQty / OrderQty`, summed at the group level — the business number this report exists to show |
| Report parameter | A user-supplied value (here, Product) that filters what a report shows without changing the underlying query's shape |
| Shared data source | A connection definition reused across reports, rather than embedded per-report — see Lesson 9 |

## Lab

1. In Report Builder, connect to your warehouse database and build a
   Matrix using the Table or Matrix Wizard: Row groups = `ProductName`
   (from `DimProduct`), Values = `SUM(OrderQty)`, `SUM(StockedQty)`,
   `SUM(ScrappedQty)`.
2. Add a calculated text box next to the three summed values with the
   expression `=Sum(Fields!ScrappedQty.Value) / Sum(Fields!OrderQty.Value)`,
   formatted as Percentage.
3. Add a `ProductName` parameter with a dataset-driven "(All)" default,
   and confirm the report re-filters correctly when you pick a single
   product.
4. Run the report and sanity-check one product's scrap rate by hand
   against the raw `Production.WorkOrder` rows for that product — you'll
   repeat this exact check, formally, in Lesson 10.

## Check yourself

You're ready for Lesson 8 when you can write the scrap-rate expression
from memory, explain why it has to be wrapped in `Sum()` at the group
level, and explain what a report parameter buys you that a report with
no parameters doesn't.
