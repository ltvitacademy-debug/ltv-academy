# Lesson 2 — Planning the Architecture

**Chapter 1 · Intermediate Capstone: The Weekly Sales & Fulfillment Report · Lesson 2 of 16**

## What you'll learn

- Why you plan the architecture before writing a single query
- The fact/dimension shape this project will use, and why
- How one staged view plus two small dimension views support both report pages
- Where a Date table fits in, and why DAX time intelligence needs one

## Start from the two requirement lists, not the database

In Lesson 1's lab you wrote down what each stakeholder actually needs. That list drives the
architecture — not the other way around. Here's what it adds up to:

- **Sales Director (Executive Summary):** total sales, average order value, a week-over-week
  trend. All company-wide, all time-based.
- **Operations Manager (Drill-Down):** the same sales figures, but sliceable by **territory** and
  by **product subcategory**, plus a fulfillment angle — how long orders take to ship.

Notice both stakeholders need the *same underlying numbers*. That's the tell that this is one data
model serving two report pages, not two separate reports.

## The grain decision

The single most important architecture decision in any BI project is **grain** — what does one row
of your fact table represent? Here, it has to be the **order line**, not the order:

- `Sales.SalesOrderDetail` already gives you one row per product per order, with `LineTotal`
  already calculated correctly per line (quantity × unit price, net of discount).
- If you aggregated up to the order level first (one row per `SalesOrderID`), you'd lose the
  ability to slice by product — which is exactly what the Operations Manager asked for.

So: **fact grain = one row per order line.** Every measure you write in Lesson 6 sums or counts
from that grain.

## Why not just one giant flat query, like the Beginner project?

The Beginner project's one-time pull joined everything — order, territory, product, subcategory —
into a single flat result, because it fed one page, once. This project can't do that, for two
real reasons:

1. **Two pages need different slices of the same facts.** A flat, fully-joined table forces every
   visual to re-filter descriptive text columns (`TerritoryName`, `SubcategoryName`) instead of
   letting Power BI's relationship engine do it once, consistently, for both pages.
2. **DAX time intelligence (Lesson 6) needs a real Date table.** Functions like `DATEADD` require
   a proper date dimension marked as the model's date table — you can't bolt that onto a flat
   result the same way.

## The architecture: one fact, two small dimensions, one date table

| Object | Grain / contents | Built in |
|---|---|---|
| **Fact** (staged view) | One row per order line: keys only — `SalesOrderID`, `OrderDate`, `DueDate`, `ShipDate`, `TerritoryID`, `ProductID`, `OrderQty`, `LineTotal` | Lesson 3-4 |
| **ProductDim** (staged view) | One row per product: `ProductID`, `ProductName`, `SubcategoryName` | Lesson 4 |
| **TerritoryDim** (staged view) | One row per territory: `TerritoryID`, `TerritoryName`, `TerritoryGroup` | Lesson 4 |
| **Date** (Power BI table) | One row per calendar day, marked as the model's date table | Lesson 5 |

Fact relates to each dimension on its key column, many-to-one, filtering from the dimension side
down to the fact — the standard star-schema direction. This is deliberately a small star, not a
full data warehouse: three dimensions is exactly what the two stakeholders' requirements call for,
nothing added "just in case."

## Why keys only in the fact, not descriptive text

The fact view carries `TerritoryID` and `ProductID` — not `TerritoryName` or `ProductName`. The
names live only in the dimension views. This is what makes Lesson 5's relationships real
relationships instead of decoration: every visual that slices by region or subcategory is actually
asking the model to filter the fact through a join, which is the same mechanism both report pages
will depend on consistently.

## Key terms

| Term | Meaning |
|---|---|
| Grain | What one row of a fact table represents — here, one order line |
| Fact table | The table holding the measures to be summed/counted — keys plus numbers |
| Dimension table | A table of descriptive attributes used to filter or group the fact |
| Star schema | A fact table related to several dimension tables, each on its key |

## Lab

Using SSMS against `AdventureWorks2012`, run:

```sql
SELECT COUNT(*) AS OrderLineCount
FROM Sales.SalesOrderDetail AS sod
JOIN Sales.SalesOrderHeader AS soh ON soh.SalesOrderID = sod.SalesOrderID
WHERE soh.Status = 5;
```

That row count is your fact table's expected grain — one row per shipped order line. Keep this
number; you'll compare it against the view you build in Lesson 4 to confirm nothing was
duplicated or dropped.

## Check yourself

You're ready for Lesson 3 when you can answer, without looking: why does the fact table need to
be at the order-*line* grain instead of the order grain, and why do the dimension views carry
names while the fact view carries only keys?
