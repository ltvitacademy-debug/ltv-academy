# Lesson 5 — Building the Power BI Data Model

**Chapter 1 · Intermediate Capstone: The Weekly Sales & Fulfillment Report · Lesson 5 of 16**

## What you'll learn

- Importing all three staged views into Power BI Desktop
- Building a Date table with `CALENDAR`, and marking it as the model's official date table
- Creating real many-to-one relationships, not a single flat table
- Checking relationship direction and cardinality in Model view

## This is the step the Beginner project skipped

The Beginner project connected to one flat query result and built visuals directly on it — there
was nothing to relate, because there was only one table. This project is different on purpose:
you now import **three separate objects**, and Power BI's relationship engine does the work of
connecting them, instead of SQL doing it once and handing over a flattened result.

## Step 1: connect and import the three views

In Power BI Desktop, use **Get Data → SQL Server**, connect to the server hosting
`AdventureWorks2012`, and import:

- `dbo.vw_CarrawayWeeklySalesFact` → rename to **Fact**
- `dbo.vw_CarrawayProductDim` → rename to **ProductDim**
- `dbo.vw_CarrawayTerritoryDim` → rename to **TerritoryDim**

Renaming them in Power Query now (not later) keeps every DAX measure in Lesson 6 readable —
`SUM(Fact[LineTotal])` instead of `SUM(vw_CarrawayWeeklySalesFact[LineTotal])`.

## Step 2: build the Date table

`Fact[OrderDate]` is a column, not a dimension. For DAX time intelligence in Lesson 6 — things
like "sales this week vs. last week" — you need a real calendar table, marked as such:

```dax
Date =
CALENDAR (
    MIN ( Fact[OrderDate] ),
    MAX ( Fact[OrderDate] )
)
```

Add a couple of useful columns on top:

```dax
Date[Year] = YEAR ( Date[Date] )
Date[WeekNumber] = WEEKNUM ( Date[Date] )
```

Then, in Model view, select the **Date** table → **Table tools** → **Mark as date table** →
point it at the `Date` column. This one setting is what makes `DATEADD` and similar functions
behave correctly in Lesson 6 — skip it, and time-intelligence measures silently compute wrong.

## Step 3: build the relationships

In Model view, drag to create three relationships:

| From | To | Cardinality | Direction |
|---|---|---|---|
| `Fact[ProductID]` | `ProductDim[ProductID]` | Many-to-one | Single, dimension → fact |
| `Fact[TerritoryID]` | `TerritoryDim[TerritoryID]` | Many-to-one | Single, dimension → fact |
| `Fact[OrderDate]` | `Date[Date]` | Many-to-one | Single, dimension → fact |

All three are **many-to-one**, because many fact rows (order lines) can share one product, one
territory, or one date. All three use **single-direction** filtering, flowing from the dimension
down to the fact — the standard star-schema setup, and the one every measure in this project will
assume.

## Why this matters for what comes later

Every DAX measure in Lesson 6, every visual on the Executive Summary (Lesson 7) and Drill-Down
(Lesson 8) pages, depends on these three relationships existing and pointing the right direction.
When you select a region on a slicer, it's `TerritoryDim → Fact` doing the filtering. Get the
relationship direction or cardinality wrong here, and no amount of correct DAX later fixes it.

## Key terms

| Term | Meaning |
|---|---|
| Many-to-one relationship | Many fact rows relate to one dimension row |
| Single-direction filter | Filters flow one way — dimension to fact, not back |
| Date table | A calendar table marked so DAX time-intelligence functions work correctly |

## Lab

After building the model, open Model view and click each of the three relationship lines. Confirm
the cardinality reads "Many to one" and the cross-filter direction arrow points from the dimension
toward `Fact`. If any relationship shows "Both" direction, change it to single — this project
doesn't need bidirectional filtering, and leaving it on invites exactly the kind of filter-context
confusion this chapter's later bug is about.

## Check yourself

You're ready for Lesson 6 when you can answer, without looking: why does marking the Date table
matter, and which direction should the cross-filter arrows point on all three relationships?
