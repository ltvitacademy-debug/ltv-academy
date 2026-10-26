# Lesson 5 — Building the Dimension Tables

**Chapter 2 · Building the T-SQL Warehouse Layer · Lesson 5 of 26**

## What you'll learn

- The real `CREATE TABLE` and `INSERT ... SELECT` statements for all
  four dimensions this warehouse needs
- How the flattened category/subcategory join from Lesson 3 actually
  gets written, once, during `dw.DimProduct`'s load
- How `dw.DimCustomer` derives a `CustomerType` column from
  `PersonID`/`StoreID` instead of just copying them forward
- Why every dimension here uses a surrogate `IDENTITY` key plus an
  `AlternateKey` column, instead of just reusing the source ID directly

## The pattern every dimension follows

Every dimension table in this warehouse follows the same shape: an
`IDENTITY` **surrogate key** as its primary key, and the original OLTP
ID kept as an **alternate key** so the fact table's load (Lesson 6) can
look rows up by their real source identifier.

## dw.DimProduct — flattened

```sql
CREATE TABLE dw.DimProduct (
    ProductKey          INT IDENTITY(1,1) PRIMARY KEY,
    ProductAlternateKey INT          NOT NULL,   -- Production.Product.ProductID
    ProductName          NVARCHAR(50) NOT NULL,
    SubcategoryName       NVARCHAR(50) NULL,
    CategoryName          NVARCHAR(50) NULL
);

INSERT INTO dw.DimProduct (ProductAlternateKey, ProductName, SubcategoryName, CategoryName)
SELECT
    p.ProductID,
    p.Name,
    sc.Name,
    c.Name
FROM Production.Product p
LEFT JOIN Production.ProductSubcategory sc
    ON p.ProductSubcategoryID = sc.ProductSubcategoryID
LEFT JOIN Production.ProductCategory c
    ON sc.ProductCategoryID = c.ProductCategoryID;
```

The `LEFT JOIN`s matter: `Production.Product.ProductSubcategoryID` is
nullable in the real source table — some products (raw materials,
components not sold directly) have no subcategory at all. An inner
join would silently drop those products out of the warehouse entirely.
A `LEFT JOIN` keeps every product, with `SubcategoryName` and
`CategoryName` simply `NULL` where the source has nothing to flatten.

## dw.DimTerritory

```sql
CREATE TABLE dw.DimTerritory (
    TerritoryKey          INT IDENTITY(1,1) PRIMARY KEY,
    TerritoryAlternateKey INT          NOT NULL,   -- Sales.SalesTerritory.TerritoryID
    TerritoryName          NVARCHAR(50) NOT NULL,
    TerritoryGroup          NVARCHAR(50) NOT NULL   -- Sales.SalesTerritory.[Group]
);

INSERT INTO dw.DimTerritory (TerritoryAlternateKey, TerritoryName, TerritoryGroup)
SELECT TerritoryID, Name, [Group]
FROM Sales.SalesTerritory;
```

`Group` has to be bracketed as `[Group]` because it's a T-SQL reserved
word — a small, real detail you'll hit the first time you query this
table directly if you forget it.

## dw.DimCustomer — deriving CustomerType

```sql
CREATE TABLE dw.DimCustomer (
    CustomerKey          INT IDENTITY(1,1) PRIMARY KEY,
    CustomerAlternateKey INT         NOT NULL,   -- Sales.Customer.CustomerID
    PersonID              INT        NULL,
    StoreID                INT        NULL,
    CustomerType            VARCHAR(10) NOT NULL
);

INSERT INTO dw.DimCustomer (CustomerAlternateKey, PersonID, StoreID, CustomerType)
SELECT
    CustomerID,
    PersonID,
    StoreID,
    CASE WHEN StoreID IS NOT NULL THEN 'Store' ELSE 'Person' END
FROM Sales.Customer;
```

`CustomerType` doesn't exist as a column anywhere in AdventureWorks2012
— it's **derived**, once, during this load, from the real fact that
`StoreID` is populated for store accounts and null for individuals.
Every front-end that wants to split sales by "retail customer vs.
individual customer" can now just filter on `CustomerType` directly,
instead of re-deriving the same `CASE` expression three separate times.

## dw.DimDate — built, not borrowed

Unlike the dimensions above, `dw.DimDate` isn't built from a single
`SELECT` against a source table — there's no "table of all possible
dates" sitting in AdventureWorks2012. It's generated with a recursive
CTE covering the real order-date range this warehouse needs:

```sql
CREATE TABLE dw.DimDate (
    DateKey   INT PRIMARY KEY,         -- yyyyMMdd, e.g. 20130615
    FullDate  DATE        NOT NULL,
    DayName    VARCHAR(10) NOT NULL,
    MonthName  VARCHAR(10) NOT NULL,
    Quarter    TINYINT     NOT NULL,
    Year       SMALLINT    NOT NULL
);

WITH Dates AS (
    SELECT CAST('2011-01-01' AS DATE) AS FullDate
    UNION ALL
    SELECT DATEADD(DAY, 1, FullDate) FROM Dates WHERE FullDate < '2014-12-31'
)
INSERT INTO dw.DimDate (DateKey, FullDate, DayName, MonthName, Quarter, Year)
SELECT
    CAST(FORMAT(FullDate, 'yyyyMMdd') AS INT),
    FullDate,
    DATENAME(WEEKDAY, FullDate),
    DATENAME(MONTH, FullDate),
    DATEPART(QUARTER, FullDate),
    DATEPART(YEAR, FullDate)
FROM Dates
OPTION (MAXRECURSION 0);
```

`2011-01-01` through `2014-12-31` covers the real range of
`Sales.SalesOrderHeader.OrderDate` in AdventureWorks2012 with room to
spare. `MAXRECURSION 0` removes SQL Server's default 100-row recursion
limit, which this four-year date range would otherwise hit immediately.

## Key terms

| Term | Meaning |
|---|---|
| Surrogate key / alternate key | The warehouse-generated `IDENTITY` key, paired with the original source ID kept for lookup |
| Derived attribute | A column with no source-system equivalent, computed once during the load (e.g. `CustomerType`) |
| Recursive CTE | A common table expression that references itself to generate a sequence, here used to build every calendar date in a range |

## Lab

1. Run every `CREATE TABLE` and `INSERT` statement above, in order,
   against your scratch database.
2. Run `SELECT COUNT(*) FROM dw.DimProduct WHERE CategoryName IS NULL;`
   and compare it to `SELECT COUNT(*) FROM Production.Product WHERE ProductSubcategoryID IS NULL;`
   — they should match exactly, confirming the `LEFT JOIN` preserved
   every uncategorized product instead of dropping it.
3. Run `SELECT CustomerType, COUNT(*) FROM dw.DimCustomer GROUP BY CustomerType;`
   and sanity-check the split against
   `SELECT COUNT(*) FROM Sales.Customer WHERE StoreID IS NOT NULL;`

## Check yourself

You're ready for Lesson 6 when you can explain why `dw.DimProduct`'s
load uses `LEFT JOIN` instead of `INNER JOIN`, where `CustomerType`
comes from, and why `dw.DimDate` is generated with a recursive CTE
instead of being copied from a source table.
