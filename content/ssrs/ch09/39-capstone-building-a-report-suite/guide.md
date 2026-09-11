# Lesson 39 — Capstone: Building a Real Paginated Report Suite

**Chapter 9 · Capstone · Lesson 39 of 40**

## What you'll learn

- How to build `RegionalSalesSummary.rdl` — a matrix report against
  `AdventureWorksDW2014`, driven by a cascading and a multi-value
  parameter
- How to build `OrderDetailByTerritory.rdl` — a table report against
  `AdventureWorks2012`, driven entirely by parameters passed in from
  elsewhere
- How to wire a drillthrough action so clicking a cell in the summary
  report opens the detail report already filtered to that cell
- Why this single suite pulls directly from Chapters 2, 3, and 6 —
  datasets/tables/matrices, parameters, and drillthrough navigation

## Report 1: RegionalSalesSummary.rdl

### The dataset

In a new report, add a data source pointing at `AdventureWorksDW2014`,
then add a dataset named `dsSalesSummary` (Chapter 2, Lesson 6) using
this query:

```sql
SELECT
    t.SalesTerritoryAlternateKey AS TerritoryID,
    t.SalesTerritoryRegion,
    d.CalendarYear,
    SUM(f.SalesAmount) AS TotalSalesAmount
FROM dbo.FactInternetSales AS f
JOIN dbo.DimSalesTerritory AS t
    ON f.SalesTerritoryKey = t.SalesTerritoryKey
JOIN dbo.DimDate AS d
    ON f.OrderDateKey = d.DateKey
WHERE t.SalesTerritoryGroup = @TerritoryGroup
  AND d.CalendarYear IN (@CalendarYear)
GROUP BY t.SalesTerritoryAlternateKey, t.SalesTerritoryRegion, d.CalendarYear;
```

Notice the query itself references `@TerritoryGroup` and
`@CalendarYear` — this is a **parameter-driven dataset** (Chapter 3,
Lesson 16): the filtering happens in SQL Server, not after the rows
already arrived at the report.

### The two parameters that drive it

Add two more datasets first, since both report parameters below get
their pick-lists from a query instead of a typed-in list (Chapter 3,
Lesson 12):

```sql
-- dsTerritoryGroups
SELECT DISTINCT SalesTerritoryGroup
FROM dbo.DimSalesTerritory
ORDER BY SalesTerritoryGroup;

-- dsYears
SELECT DISTINCT CalendarYear
FROM dbo.DimDate
WHERE CalendarYear BETWEEN 2011 AND 2014
ORDER BY CalendarYear;
```

Then create the report parameters:

| Parameter | Type | Behavior |
|---|---|---|
| `@TerritoryGroup` | Text, single-value | Populated from `dsTerritoryGroups` (Chapter 3, Lesson 13 — this is the parent half of a cascading pair) |
| `@CalendarYear` | Integer, **multi-value** | Populated from `dsYears`, default value set to "select all" (Chapter 3, Lessons 14–15) |

Because `dsSalesSummary`'s own `WHERE` clause filters on both, changing
either parameter re-runs the query against the database — not just
re-filters what's already on screen.

### The layout: a matrix

Drag a **Matrix** (Chapter 2, Lesson 9) onto the design surface:

- **Rows**: `SalesTerritoryRegion` (grouped — Chapter 2, Lesson 10)
- **Columns**: `CalendarYear`
- **Data**: `=Sum(Fields!TotalSalesAmount.Value)`

Apply a currency format to the data cell and right-align it (Chapter 4
covers the expression and formatting details) — a matrix full of
unformatted numbers is exactly the kind of layout mistake Chapter 2,
Lesson 11 warns against.

## Report 2: OrderDetailByTerritory.rdl

### The dataset

Add a second report with its own data source, this one pointing at
`AdventureWorks2012`. Add a dataset named `dsOrderDetail`:

```sql
SELECT
    soh.SalesOrderID,
    soh.OrderDate,
    p.Name AS ProductName,
    sod.OrderQty,
    sod.UnitPrice,
    sod.LineTotal
FROM Sales.SalesOrderHeader AS soh
JOIN Sales.SalesOrderDetail AS sod
    ON sod.SalesOrderID = soh.SalesOrderID
JOIN Production.Product AS p
    ON p.ProductID = sod.ProductID
WHERE soh.TerritoryID = @TerritoryID
  AND YEAR(soh.OrderDate) = @Year
ORDER BY soh.SalesOrderID;
```

### Internal parameters

Create `@TerritoryID` (Integer) and `@Year` (Integer). Set both to
**Internal** in the parameter properties — no available-values list,
no default. This report is never meant to be opened directly with a
blank parameter prompt; it only ever receives its values from the
drillthrough click below. That distinction — a parameter a user fills
in versus one only another report ever supplies — is exactly what
Chapter 3, Lesson 16 covers.

### The layout: a grouped table

Drag a **Table** (Chapter 2, Lesson 8) onto the design surface, grouped
by `SalesOrderID` (Chapter 2, Lesson 10):

- **Group header**: `SalesOrderID`, `OrderDate`
- **Detail rows**: `ProductName`, `OrderQty`, `UnitPrice`, `LineTotal`
- **Group footer**: `=Sum(Fields!LineTotal.Value)` — a per-order subtotal

## Wiring the drillthrough

Back in `RegionalSalesSummary.rdl`, select the matrix's data cell,
open its **Action** properties, and set (Chapter 6, Lesson 27):

- **Action**: Go to report
- **Specify a report**: `OrderDetailByTerritory`
- **Use these parameters to run the report**:
  - `TerritoryID` = `=Fields!TerritoryID.Value`
  - `Year` = `=Fields!CalendarYear.Value`

Clicking any cell in the matrix now opens the detail report, already
filtered to the exact territory and year that cell represents — no
extra prompt, because both target parameters are Internal.

## Key terms

| Term | Meaning |
|---|---|
| Parameter-driven dataset | A dataset whose query text itself references a report parameter, filtering in the database rather than after the fact |
| Cascading parameter | A parameter whose available values, or whose query, depends on the value chosen in another parameter |
| Internal parameter | A report parameter with no prompt or default, set entirely by another report or a subscription |
| Drillthrough action | A text box, image, or data cell property that navigates to another report, optionally passing parameter values |

## Lab

Build both reports for real:

1. Create `RegionalSalesSummary.rdl` with the three datasets and two
   parameters above, and the matrix layout.
2. Create `OrderDetailByTerritory.rdl` with its dataset, its two
   internal parameters, and the grouped table layout.
3. Preview `RegionalSalesSummary.rdl`, pick a territory group and a
   year, and confirm the matrix renders real numbers.
4. Click a data cell and confirm the drillthrough opens
   `OrderDetailByTerritory.rdl` already filtered — with no parameter
   prompt, since both its parameters are Internal.
5. Deploy both reports to the same folder on your Report Server
   (Chapter 1, Lesson 5) so the drillthrough resolves correctly once
   published, not just in preview.

## Check yourself

You're ready for Lesson 40 when both reports run cleanly, the
drillthrough opens the detail report pre-filtered with no prompt, and
you can explain in one sentence why `OrderDetailByTerritory`'s
parameters are set to Internal instead of a normal visible prompt.
