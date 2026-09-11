# Lesson 38 — Capstone Kickoff

**Chapter 9 · Capstone · Lesson 38 of 40**

## What you'll learn

- The scope of the capstone project you'll build across this chapter's
  three lessons: a real, two-report paginated report suite, not a toy
  example
- The two real databases this project uses — the same ones the rest of
  this catalog already builds against — and exactly which tables from
  each one are in play
- The Dataset → Layout → Parameters → Drillthrough architecture every
  lesson in this chapter adds one more piece to
- What you need in place before Lesson 39 starts building the reports

## Why a capstone, and why now

Chapters 1 through 8 taught SSRS one piece at a time: report projects
and deployment in Chapter 1, datasets/tables/matrices/grouping in
Chapter 2, parameters in Chapter 3, expressions and formatting in
Chapter 4, charts and visual elements in Chapter 5, drilldowns and
drillthrough navigation in Chapter 6, subscriptions in Chapter 7, and
administration in Chapter 8. A real paginated report suite doesn't use
those pieces one at a time — a production report links a summary report
to a detail report, filters both with parameters, and hands the whole
thing to a Report Server. The only way to prove you can do that is to
actually do it. That's this chapter.

Across Lessons 38–40 you'll build one connected report suite, not two
unrelated reports. This lesson scopes it. Lesson 39 builds both reports
and wires the parameters and the drillthrough link between them.
Lesson 40 checks the finished suite against this lesson's scope and
turns it into something you can put in front of a hiring manager.

## The project: a summary report that drills into a detail report

| Piece | What it means for this project |
|---|---|
| **Summary report** | A matrix showing total sales by territory and year, built from `AdventureWorksDW2014` — the same warehouse database this catalog's T-SQL and SSIS Development courses already query |
| **Parameters** | A cascading territory-group parameter and a multi-value year parameter, both filtering the summary report's dataset |
| **Drillthrough** | Clicking a cell in the summary matrix jumps to a detail report, passing the territory and year that cell represents |
| **Detail report** | A table listing the actual order line items behind that cell, built from `AdventureWorks2012` — the same OLTP-style transactional database this catalog's T-SQL course queries directly |

```
DATASET  ->  LAYOUT  ->  PARAMETERS  ->  DRILLTHROUGH
(Ch09-39)    (Ch09-39)    (Ch09-39)       (Ch09-39)
```

Lesson 39 builds every one of those four pieces, for both reports, in
one sitting. Nothing here is thrown away between lessons; Lesson 40
evaluates the same two `.rdl` files you're about to build.

## The summary source: AdventureWorksDW2014

The summary report's dataset queries three real dimensional tables in
`AdventureWorksDW2014` — the exact warehouse database this catalog's
SSIS Development capstone already loaded a fact table into:

- **`dbo.FactInternetSales`** — one row per sold line item
  (`SalesTerritoryKey`, `OrderDateKey`, `SalesAmount`)
- **`dbo.DimSalesTerritory`** — the territory dimension
  (`SalesTerritoryKey`, `SalesTerritoryRegion`, `SalesTerritoryGroup`,
  `SalesTerritoryAlternateKey`)
- **`dbo.DimDate`** — the date dimension (`DateKey`, `CalendarYear`)

`DimSalesTerritory.SalesTerritoryAlternateKey` is the detail that makes
the drillthrough possible: it's the original `TerritoryID` from the
OLTP source, carried into the warehouse unchanged. That single column
is the bridge between the summary report's warehouse data and the
detail report's transactional data.

## The detail source: AdventureWorks2012

The detail report's dataset queries three real OLTP tables in
`AdventureWorks2012`, filtered by the territory and year passed in from
the summary report:

- **`Sales.SalesOrderHeader`** — one row per order (`SalesOrderID`,
  `OrderDate`, `TerritoryID`)
- **`Sales.SalesOrderDetail`** — one row per line item on an order
  (`SalesOrderID`, `ProductID`, `OrderQty`, `UnitPrice`, `LineTotal`)
- **`Production.Product`** — the product catalog (`ProductID`, `Name`)

These are the same ordinary transactional tables the SSIS Development
capstone extracted from — no dimensional shape, just the rows a sales
system actually writes.

## Key terms

| Term | Meaning |
|---|---|
| Report suite | Two or more related paginated reports designed to be used together, usually linked by drillthrough |
| Summary report | A rolled-up, aggregated report — here, a matrix of sales by territory and year |
| Detail report | A row-level report a summary report drills into for the specifics behind a number |
| Alternate key | A dimension column that preserves a source system's original business key — here, `SalesTerritoryAlternateKey` preserving `TerritoryID` |

## Lab

Before Lesson 39, get both sides of the report suite ready:

1. In SSDT or Report Builder, confirm you have two working data
   sources: one pointing at `AdventureWorksDW2014`, one pointing at
   `AdventureWorks2012` — the same SQL Server instance this catalog's
   T-SQL and SSIS Development courses use. (Lesson 4 covers report
   project setup if you need a refresher.)
2. Run this against `AdventureWorksDW2014` to confirm the bridge column
   exists and holds the values you'd expect:

   ```sql
   SELECT SalesTerritoryKey, SalesTerritoryRegion,
          SalesTerritoryGroup, SalesTerritoryAlternateKey
   FROM dbo.DimSalesTerritory
   ORDER BY SalesTerritoryGroup, SalesTerritoryRegion;
   ```
3. Run this against `AdventureWorks2012` and confirm the same
   `TerritoryID` values show up on real orders:

   ```sql
   SELECT TOP 20 SalesOrderID, OrderDate, TerritoryID
   FROM Sales.SalesOrderHeader
   ORDER BY OrderDate DESC;
   ```
4. Sketch — on paper or in a text file, not in the designer yet — which
   fields you think the summary matrix needs as rows, columns, and
   values, and which two values a drillthrough click would need to pass
   to the detail report. You'll compare it against what you actually
   build next lesson.

## Check yourself

You're ready for Lesson 39 when both data sources connect successfully,
you can see matching `TerritoryID`/`SalesTerritoryAlternateKey` values
across both databases, and you can explain in one sentence why the
detail report can't simply reuse the summary report's own dataset.
