# Lesson 11 — Building the Power BI Data Model

**Chapter 4 · The Power BI Operational Dashboard · Lesson 11 of 26**

## What you'll learn

- How to connect Power BI Desktop directly to the `dw.*` warehouse,
  as a read-only consumer, exactly as this capstone's architecture
  requires
- How to build the star-schema relationships Power BI needs between
  `dw.FactProductSales` and its four dimensions
- Why `dw.DimDate` has to be explicitly marked as the model's official
  date table
- Why this model does **not** import `dw.DimSalesReason` or the
  bridge table from Lesson 7

## Connecting to the warehouse

In Power BI Desktop: **Get Data → SQL Server**, point it at the same
server and database Chapters 2 and 3 already built against, and
import `dw.FactProductSales`, `dw.DimProduct`, `dw.DimDate`,
`dw.DimTerritory`, and `dw.DimCustomer`. Power BI's **Import** mode is
used here, not **DirectQuery** — this is an operational dashboard
Executives click through live in a meeting, and Import mode's
in-memory engine keeps that interaction fast.

This is, deliberately, the same read-only relationship every front-end
in this capstone has with the warehouse: Power BI reads these five
tables and nothing else writes back into them.

## Building the relationships

Power BI's model view should show one relationship from
`dw.FactProductSales` to each dimension, every one of them the
standard **one-to-many**, filtering from the "one" side (the
dimension) to the "many" side (the fact):

| Fact column | Dimension | Dimension key |
|---|---|---|
| `ProductKey` | `dw.DimProduct` | `ProductKey` |
| `OrderDateKey` | `dw.DimDate` | `DateKey` |
| `TerritoryKey` | `dw.DimTerritory` | `TerritoryKey` |
| `CustomerKey` | `dw.DimCustomer` | `CustomerKey` |

This is the exact same star shape Lesson 3 designed in T-SQL, now
rebuilt as live relationships in Power BI's semantic layer. Nothing
about the shape changes moving from the warehouse to the model — that
consistency is the entire point of building the warehouse first.

## Marking DimDate as the official date table

In Power BI Desktop: select `dw.DimDate` in Model view → **Table
tools → Mark as date table** → choose `FullDate` as the date column.
This single setting is what lets Power BI's built-in time-intelligence
functions (and the `DATEADD`/`ALL` measures Lesson 12 writes) treat
`dw.DimDate` as a real calendar, instead of just another table of
rows. Skipping this step is a common, real mistake — DAX time
intelligence silently produces wrong results against a date column
that was never marked as the model's date table.

## Why DimSalesReason and the bridge table stay out of this model

Lesson 7's `dw.DimSalesReason` and `dw.BridgeOrderSalesReason` exist in
the warehouse, but this Power BI model doesn't import them. The
Executive Summary and Regional Drill-Down pages this chapter builds
answer "how much did we sell, and where" — not "why did customers buy."
Importing a bridge table that fans fact rows out to multiple copies,
for a dashboard that never needs to slice by reason, would only add a
real risk (accidental double-counting through the fan-out) for no
reporting benefit. Leaving genuinely unneeded tables out of a model is
as much a modeling decision as choosing which ones to include.

## Key terms

| Term | Meaning |
|---|---|
| Import mode | Power BI loads a compressed copy of the data into memory, rather than querying the source live on every interaction |
| Mark as date table | A Power BI setting that tells the engine which table and column represent the model's official calendar, required for correct time-intelligence DAX |
| Semantic layer | The relationships, measures, and formatting Power BI builds on top of imported tables — the model itself, not the raw data |

## Lab

1. In Power BI Desktop, connect to your warehouse and import the five
   tables listed above.
2. Build all four relationships in Model view and confirm each one
   shows as one-to-many, filtering from the dimension to the fact.
3. Mark `dw.DimDate` as the date table using `FullDate`, and confirm
   Power BI accepts it without a warning about duplicate or missing
   dates.

## Check yourself

You're ready for Lesson 12 when you can name all four relationships
from memory, explain why `dw.DimDate` has to be explicitly marked as
the date table, and explain why this model deliberately leaves
`dw.DimSalesReason` and its bridge table out.
