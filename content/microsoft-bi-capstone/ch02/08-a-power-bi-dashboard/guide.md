# Lesson 8 — A Power BI Dashboard

**Chapter 2 · Building the Full Stack · Lesson 8 of 25**

## What you'll learn

- The connection decision — Import vs. DirectQuery — this dashboard
  makes against `dw.FactWorkOrder`, and why
- The three visuals this dashboard needs to answer the plant's actual
  questions: scrap rate over time, on-time vs. late completion, and
  production volume by product
- How each visual maps to a specific column or expression on the fact
  table and its dimensions
- Why this is the same warehouse Lesson 7's SSRS report already reads
  — not a second copy

## The connection: Import

Power BI Desktop can read `dw.FactWorkOrder` two ways: **Import**, which
copies the data into Power BI's in-memory model and refreshes on a
schedule, or **DirectQuery**, which sends live queries back to SQL
Server on every interaction. This dashboard uses **Import** — the
warehouse is a nightly-refreshed batch target fed by the SSIS package
from Lesson 4, not a live operational system, so there's no reason to
pay DirectQuery's per-click query cost. Import also unlocks the full
DAX surface (measures like `DIVIDE()`), which the scrap-rate measure
below depends on.

![Where storage mode is set per table in Power BI Desktop's model view.](/courses/microsoft-bi-capstone/ch02/08-a-power-bi-dashboard/see-storage-mode.png)
*The real Power BI screen where this decision gets made and confirmed, one table at a time.*

Document this choice the way every decision in this capstone gets
documented — a one-line note in the project's README (Lesson 14 covers
this properly): "FactWorkOrder and its dimensions: Import, refreshed
nightly after the SSIS load completes."

## Three visuals, one fact table

Everything on this dashboard traces back to the same
`dw.FactWorkOrder` grain — one row per work order — read three
different ways:

| Visual | Type | What it reads |
|---|---|---|
| Scrap rate trend | Line chart | `ScrappedQty`/`OrderQty` by `EndDateKey` → `DimDate` |
| On-time vs. late | Clustered column | `EndDateKey` compared to `DueDateKey`, bucketed |
| Production volume by product | Column chart | `SUM(OrderQty)` by `ProductKey` → `DimProduct` |

**Production volume by product** is the simplest: drag `ProductName`
onto the axis, `OrderQty` onto values, and Power BI produces a real
column chart — the same visual type, doing the same job, as any bar
chart built anywhere else in this program:

![A real Power BI column chart, with drill and cross-filter behavior.](/courses/microsoft-bi-capstone/ch02/08-a-power-bi-dashboard/column-formatting.png)
*The same column chart visual, here summing OrderQty per product instead of Sales per category.*

**Scrap rate trend over time** needs a measure first, since scrap rate
is a ratio, not a stored column:

```
Scrap Rate =
DIVIDE(SUM(FactWorkOrder[ScrappedQty]), SUM(FactWorkOrder[OrderQty]))
```

`DIVIDE()` instead of the raw `/` operator matters here for the exact
reason it matters everywhere else in this program: it returns a blank
instead of throwing an error on a date with zero work orders and zero
`OrderQty`, which a raw `/` would divide-by-zero on. Put that measure
on a line chart's Values with `EndDateKey` (via `DimDate`) on the axis,
and Power BI's own Analytics pane can add a trend line on top of it —
the same real feature covered in Power BI's forecasting lessons:

![A Power BI line chart with a trend line added from the Analytics pane.](/courses/microsoft-bi-capstone/ch02/08-a-power-bi-dashboard/analytics-pane_4.png)
*The Analytics pane's trend line, here tracking scrap rate over time instead of sales.*

**On-time vs. late completion** compares two dates that live on the
same fact row: `EndDateKey` (when the work order actually finished)
against `DueDateKey` (when it was supposed to). A calculated column on
the fact table buckets every row:

```
OnTimeFlag =
IF(FactWorkOrder[EndDateKey] <= FactWorkOrder[DueDateKey], "On Time", "Late")
```

Then a clustered column chart with `OnTimeFlag` on the axis and
`COUNTROWS(FactWorkOrder)` as the value shows exactly what a plant
manager wants to know at a glance: how many work orders finished on
time versus late, this period.

## Same warehouse, no separate copy

Every one of these three visuals reads `dw.FactWorkOrder` and its
dimensions directly — the exact same tables Lesson 7's SSRS report
reads. Nothing here gets recalculated in a spreadsheet, restated in a
separate extract, or defined with slightly different logic. Lesson 9
confirms this connection explicitly, because "both tools point at the
same tables" is the entire point of building the warehouse in the
first place.

## Key terms

| Term | Meaning |
|---|---|
| Import | Power BI copies source data into its own in-memory model, refreshed on a schedule |
| DirectQuery | Power BI queries the source live on every interaction, with no local copy |
| DIVIDE() | A DAX function that returns blank (not an error) when the denominator is zero |
| OnTimeFlag | A calculated column comparing EndDateKey to DueDateKey, bucketing each work order as on time or late |

## Lab

1. In Power BI Desktop, connect to your warehouse's `dw.FactWorkOrder`,
   `dw.DimProduct`, and `dw.DimDate` tables using Import mode.
2. Build the `Scrap Rate` measure with `DIVIDE()`, and put it on a line
   chart against `DimDate`.
3. Build the `OnTimeFlag` calculated column, and put it on a clustered
   column chart with a row count.
4. Build a column chart of `SUM(OrderQty)` by `ProductName`.
5. Write one sentence documenting the Import decision, the way you'll
   need it again in Lesson 14.

## Check yourself

You're ready for Lesson 9 when you can explain why this dashboard uses
Import instead of DirectQuery, write the `DIVIDE()`-based scrap rate
measure from memory, and name which two date columns the on-time-vs-late
visual compares.
