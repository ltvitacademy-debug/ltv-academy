# AdventureWorks Schema Quick Reference

A lookup sheet for the real tables, columns, and relationships this
course's own labs actually query — pulled from `AdventureWorks2012`
(the OLTP database used Chapters 1–11) and `AdventureWorksDW2014` (the
star-schema warehouse used in Chapter 12). Every table and column name
below is the genuine Microsoft sample-database schema, exactly as you'll
see it in SSMS's Object Explorer.

## AdventureWorks2012 (OLTP)

### `Person.Person`

| Column | Type | Notes |
|---|---|---|
| `BusinessEntityID` | `INT` | Primary key. Also the join point into `HumanResources.Employee`, `Sales.Customer`, and `Sales.SalesPerson` — AdventureWorks models "people," "employees," and "customers" as different roles layered onto the same `BusinessEntityID`. |
| `FirstName`, `LastName` | `NVARCHAR` | Unicode name fields — this is the table used throughout Chapter 5's string-function lessons. |
| `EmailPromotion` | `INT` | A marketing-preference flag. Used in Chapter 5's deduplication example as part of the duplicate-matching criteria. |

### `HumanResources.Employee`

| Column | Type | Notes |
|---|---|---|
| `BusinessEntityID` | `INT` | Primary key **and** a foreign key into `Person.Person` — the real one-to-one relationship taught in Lesson 99. |
| `JobTitle` | `NVARCHAR` | |
| `HireDate` | `DATE` | |

### `Production.Product`

| Column | Type | Notes |
|---|---|---|
| `ProductID` | `INT` | Primary key. |
| `Name` | `NVARCHAR(50)` | |
| `Color` | `NVARCHAR(15)` | Nullable — many products have no recorded color, which is exactly why Chapter 4's `COUNT(Color)` vs. `COUNT(*)` example matters. |
| `ListPrice` | `MONEY` | |
| `ProductSubcategoryID` | `INT` | Nullable foreign key into `Production.ProductSubcategory`. |
| `SellStartDate` | `DATETIME` | The column used in Chapter 10's SARGable-vs-non-SARGable example. |

### `Production.ProductSubcategory` / `Production.ProductCategory`

| Table | Key columns | Notes |
|---|---|---|
| `Production.ProductSubcategory` | `ProductSubcategoryID` (PK), `ProductCategoryID` (FK), `Name` | |
| `Production.ProductCategory` | `ProductCategoryID` (PK), `Name` | The three-level hierarchy (`Category` → `Subcategory` → `Product`) behind every "report by category" exercise in this course. |

### `Production.ProductInventory`

| Column | Type | Notes |
|---|---|---|
| `ProductID` | `INT` | Part of the composite primary key with `LocationID`. |
| `LocationID` | `INT` | |
| `Quantity` | `SMALLINT` | The column every Chapter 8 transaction example moves stock between — note there's no `CHECK` constraint stopping it from going negative; that's left to application/procedure logic. |

### `Production.BillOfMaterials`

| Column | Type | Notes |
|---|---|---|
| `ProductAssemblyID` | `INT` | The "parent" — nullable, since a raw component with no further sub-assembly has `NULL` here. |
| `ComponentID` | `INT` | The "child" part that goes into the assembly. |
| `PerAssemblyQty` | `DECIMAL` | How many of this component one unit of the assembly needs — the multiplier Chapter 6's recursive-CTE worked example rolls up across levels. |
| `StartDate`, `EndDate` | `DATETIME` | Effective-dating for when a given component relationship was valid. |

This table is self-referencing: `ComponentID` on one row can equal
`ProductAssemblyID` on another, which is exactly what makes it a real
hierarchy and the subject of Lesson 57's recursive CTE.

### `Sales.SalesOrderHeader` / `Sales.SalesOrderDetail`

| Table | Key columns | Notes |
|---|---|---|
| `Sales.SalesOrderHeader` | `SalesOrderID` (PK), `OrderDate`, `CustomerID` (FK → `Person.Person.BusinessEntityID`) | One row per order. |
| `Sales.SalesOrderDetail` | `SalesOrderID` (FK), `ProductID` (FK), `OrderQty`, `UnitPrice`, `LineTotal` | One row per line item. `LineTotal` is already a computed `OrderQty * UnitPrice * (1 - UnitPriceDiscount)` — use it directly rather than recomputing it. |

This header/detail pair is the four-table join chain (`SalesOrderHeader`
→ `SalesOrderDetail` → `Product` → `Person`) behind Chapter 3's
"joining three or more tables" lesson and most of Chapter 4's summary
reports.

## AdventureWorksDW2014 (star-schema warehouse)

### `dbo.FactInternetSales`

| Column | Type | Notes |
|---|---|---|
| `ProductKey`, `OrderDateKey`, `CustomerKey` | `INT` | Foreign keys into the matching `Dim*` tables — this is a fact table: mostly keys plus numeric measures, as Lesson 113 describes. |
| `SalesAmount`, `OrderQuantity` | numeric | The measures you sum/average/count. |

### `dbo.DimProduct`

| Column | Type | Notes |
|---|---|---|
| `ProductKey` | `INT` | The warehouse's own surrogate key — meaningless outside this database. |
| `ProductAlternateKey` | `NVARCHAR` | The **natural/business key** from the source system — the column to match on when syncing new data in from outside, per Lesson 117. |
| `EnglishProductName`, `Color`, `ListPrice` | mixed | Descriptive attributes. |
| `StartDate`, `EndDate`, `Status` | `DATETIME`/`NVARCHAR` | The real Type 2 slowly-changing-dimension tracking columns described in Lesson 116 — a non-`NULL` `EndDate` marks a retired version. |

### `dbo.DimCustomer`

| Column | Type | Notes |
|---|---|---|
| `CustomerKey` | `INT` | Surrogate key. |
| `City` | `NVARCHAR` | The attribute Lesson 116 uses to illustrate Type 1 vs. Type 3 slowly-changing-dimension handling. |
