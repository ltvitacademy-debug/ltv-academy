/* =====================================================================
   T-SQL DEVELOPMENT COURSE — CHAPTER QUERY PATTERN REFERENCE
   =====================================================================
   A single compiled reference of the real query shapes taught across
   all 12 chapters of this course, in the order you learned them.
   Every pattern below mirrors an actual lesson example — this is a
   lookup sheet to copy/adapt, not new material.

   Runs against the real SQL Server sample databases you already use
   in this course's labs: AdventureWorks2012 (OLTP) and
   AdventureWorksDW2014 (star-schema warehouse). Swap table/column
   names for your own task; keep the shape.
   ===================================================================== */


/* ---------------------------------------------------------------------
   CHAPTER 1 — T-SQL Foundations
   --------------------------------------------------------------------- */
USE AdventureWorks2012;
GO

-- Basic SELECT with column list, alias, and concatenation
SELECT
    p.Name                                   AS ProductName,
    p.Color,
    'SKU-' + CAST(p.ProductID AS VARCHAR(10)) AS DisplaySku
FROM Production.Product AS p;

-- CASE: simple vs. searched
SELECT
    Name,
    CASE Color
        WHEN 'Red' THEN 'Warm'
        WHEN 'Blue' THEN 'Cool'
        ELSE 'Neutral'
    END AS ColorTemp,
    CASE
        WHEN ListPrice > 1000 THEN 'Premium'
        WHEN ListPrice > 100  THEN 'Standard'
        ELSE 'Budget'
    END AS PriceTier
FROM Production.Product;

-- DISTINCT
SELECT DISTINCT Color FROM Production.Product;


/* ---------------------------------------------------------------------
   CHAPTER 2 — Filtering and Sorting
   --------------------------------------------------------------------- */

-- WHERE + AND/OR/NOT + IN/BETWEEN + NULL handling
SELECT Name, ListPrice, Color
FROM Production.Product
WHERE Color IN ('Red', 'Black')
  AND ListPrice BETWEEN 50 AND 1000
  AND Color IS NOT NULL;

-- LIKE wildcards
SELECT Name FROM Production.Product WHERE Name LIKE 'Mountain%';

-- ORDER BY + TOP ... WITH TIES
SELECT TOP 10 WITH TIES Name, ListPrice
FROM Production.Product
ORDER BY ListPrice DESC;


/* ---------------------------------------------------------------------
   CHAPTER 3 — Joining Tables
   --------------------------------------------------------------------- */

-- Chained INNER JOINs across four tables (the standard order-detail shape)
SELECT soh.OrderDate, p.Name AS ProductName, sod.OrderQty,
       per.FirstName, per.LastName
FROM Sales.SalesOrderHeader AS soh
INNER JOIN Sales.SalesOrderDetail AS sod ON soh.SalesOrderID = sod.SalesOrderID
INNER JOIN Production.Product AS p       ON sod.ProductID = p.ProductID
INNER JOIN Person.Person AS per          ON soh.CustomerID = per.BusinessEntityID;

-- LEFT JOIN: keep every row on the left even without a match
SELECT p.Name, sod.OrderQty
FROM Production.Product AS p
LEFT JOIN Sales.SalesOrderDetail AS sod ON p.ProductID = sod.ProductID;

-- SELF JOIN: a table related to itself (e.g. bill-of-materials assemblies)
SELECT bom.ProductAssemblyID, bom.ComponentID
FROM Production.BillOfMaterials AS bom
INNER JOIN Production.BillOfMaterials AS bom2
    ON bom.ComponentID = bom2.ProductAssemblyID;


/* ---------------------------------------------------------------------
   CHAPTER 4 — Grouping and Aggregating
   --------------------------------------------------------------------- */

-- The full summary-report shape: filter, group, aggregate, filter groups, sort
SELECT
    p.Color,
    COUNT(*)            AS ProductCount,
    AVG(p.ListPrice)     AS AveragePrice,
    MIN(p.ListPrice)     AS CheapestPrice,
    MAX(p.ListPrice)     AS MostExpensivePrice
FROM Production.Product AS p
WHERE p.Color IS NOT NULL
GROUP BY p.Color
HAVING COUNT(*) > 5 AND AVG(p.ListPrice) > 50
ORDER BY AveragePrice DESC;

-- UNION ALL to stack two compatible result sets
SELECT Name FROM Production.ProductCategory
UNION ALL
SELECT Name FROM Production.ProductSubcategory;


/* ---------------------------------------------------------------------
   CHAPTER 5 — Data Types, Strings, and Dates
   --------------------------------------------------------------------- */

-- Date range filter — SARGable, never wrap the column in a function
SELECT SalesOrderID, OrderDate
FROM Sales.SalesOrderHeader
WHERE OrderDate >= '2013-01-01' AND OrderDate < '2014-01-01';

-- String cleanup: TRIM, SUBSTRING, CHARINDEX
SELECT
    TRIM(FirstName) AS CleanFirstName,
    SUBSTRING(LastName, 1, 3) AS LastInitials
FROM Person.Person;

-- Deduplication preview: ROW_NUMBER() + PARTITION BY, deleted through a CTE
WITH NumberedRows AS (
    SELECT *,
           ROW_NUMBER() OVER (PARTITION BY FirstName, LastName, EmailPromotion
                               ORDER BY BusinessEntityID) AS RowNum
    FROM Person.Person
)
SELECT * FROM NumberedRows WHERE RowNum > 1; -- review before converting to DELETE


/* ---------------------------------------------------------------------
   CHAPTER 6 — Subqueries, CTEs, and Views
   --------------------------------------------------------------------- */

-- EXISTS for a presence check (usually faster/clearer than IN for this)
SELECT p.Name
FROM Production.Product AS p
WHERE EXISTS (
    SELECT 1 FROM Sales.SalesOrderDetail AS sod WHERE sod.ProductID = p.ProductID
);

-- A plain CTE
WITH ExpensiveProducts AS (
    SELECT ProductID, Name, ListPrice
    FROM Production.Product
    WHERE ListPrice > 1000
)
SELECT * FROM ExpensiveProducts ORDER BY ListPrice DESC;

-- A recursive CTE: anchor + recursive member, joined with UNION ALL
WITH BOMHierarchy AS (
    SELECT ProductAssemblyID, ComponentID, 0 AS Level
    FROM Production.BillOfMaterials
    WHERE ProductAssemblyID = 800

    UNION ALL

    SELECT bom.ProductAssemblyID, bom.ComponentID, bh.Level + 1
    FROM Production.BillOfMaterials AS bom
    INNER JOIN BOMHierarchy AS bh ON bom.ProductAssemblyID = bh.ComponentID
)
SELECT * FROM BOMHierarchy ORDER BY Level;

-- A reusable view
CREATE OR ALTER VIEW vw_ExpensiveProducts AS
SELECT ProductID, Name, ListPrice, Color
FROM Production.Product
WHERE ListPrice > 1000;


/* ---------------------------------------------------------------------
   CHAPTER 7 — Programming with T-SQL
   --------------------------------------------------------------------- */

-- Variables and IF/ELSE
DECLARE @ProductCount INT;
SELECT @ProductCount = COUNT(*) FROM Production.Product;
IF @ProductCount > 500
    PRINT 'Large catalog';
ELSE
    PRINT 'Small catalog';

-- A parameterized stored procedure, named-notation call
CREATE OR ALTER PROCEDURE usp_GetProductsByColorAndPrice
    @Color NVARCHAR(15),
    @MinPrice MONEY = 0
AS
BEGIN
    SELECT Name, ListPrice, Color
    FROM Production.Product
    WHERE Color = @Color AND ListPrice >= @MinPrice;
END
GO

EXEC usp_GetProductsByColorAndPrice @Color = 'Red', @MinPrice = 500;

-- MERGE: insert/update/delete in one statement, keyed by a join condition
MERGE Production.Product AS target
USING (
    SELECT ProductID, Name, ListPrice
    FROM Production.Product
    WHERE ProductSubcategoryID = 1
) AS source
    ON target.ProductID = source.ProductID
WHEN MATCHED THEN
    UPDATE SET target.ListPrice = source.ListPrice * 1.05
WHEN NOT MATCHED BY TARGET THEN
    INSERT (ProductID, Name, ListPrice)
    VALUES (source.ProductID, source.Name, source.ListPrice);


/* ---------------------------------------------------------------------
   CHAPTER 8 — Transactions and Error Handling
   --------------------------------------------------------------------- */

-- The standard transaction + TRY/CATCH + ROLLBACK pattern
BEGIN TRY
    BEGIN TRANSACTION;

    UPDATE Production.ProductInventory
    SET Quantity = Quantity - 10
    WHERE ProductID = 1 AND LocationID = 1;

    UPDATE Production.ProductInventory
    SET Quantity = Quantity + 10
    WHERE ProductID = 1 AND LocationID = 2;

    COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    IF XACT_STATE() <> 0
        ROLLBACK TRANSACTION;
    PRINT 'Transfer failed: ' + ERROR_MESSAGE();
END CATCH

-- Raising a custom, business-rule error (modern syntax)
IF NOT EXISTS (SELECT 1 FROM Production.Product WHERE ProductID = 99999)
    THROW 50000, 'Product does not exist.', 1;


/* ---------------------------------------------------------------------
   CHAPTER 9 — Window and Ranking Functions
   --------------------------------------------------------------------- */

-- ROW_NUMBER / RANK / DENSE_RANK side by side
SELECT Name, ListPrice,
       ROW_NUMBER() OVER (ORDER BY ListPrice DESC)                        AS RowNum,
       RANK()       OVER (ORDER BY ListPrice DESC)                        AS Rank_,
       DENSE_RANK() OVER (ORDER BY ListPrice DESC)                        AS DenseRank_,
       ROW_NUMBER() OVER (PARTITION BY Color ORDER BY ListPrice DESC)     AS RankInColor
FROM Production.Product
ORDER BY ListPrice DESC;

-- NTILE: splitting rows into N roughly-equal buckets
SELECT Name, ListPrice, NTILE(4) OVER (ORDER BY ListPrice DESC) AS PriceQuartile
FROM Production.Product;


/* ---------------------------------------------------------------------
   CHAPTER 10 — Performance Tuning
   --------------------------------------------------------------------- */

-- Non-SARGable (avoid) vs. SARGable (prefer) — same logical question
-- NON-SARGABLE:
-- WHERE YEAR(SellStartDate) = 2013
-- SARGABLE:
SELECT Name, ListPrice
FROM Production.Product
WHERE SellStartDate >= '2013-01-01' AND SellStartDate < '2014-01-01';

-- A covering nonclustered index: avoids the Key Lookup entirely
CREATE NONCLUSTERED INDEX IX_Product_Name
ON Production.Product (Name)
INCLUDE (ListPrice, Color);

-- Measuring the real cost of a query
SET STATISTICS IO ON;
SET STATISTICS TIME ON;
SELECT ProductID, Name, ListPrice FROM Production.Product WHERE Name = N'Chainring Bolts';
SET STATISTICS IO OFF;
SET STATISTICS TIME OFF;


/* ---------------------------------------------------------------------
   CHAPTER 11 — Database Design Fundamentals
   --------------------------------------------------------------------- */

-- PRIMARY KEY + FOREIGN KEY, inline
CREATE TABLE dbo.Department (
    DepartmentID INT NOT NULL PRIMARY KEY,
    Name         NVARCHAR(50) NOT NULL
);

CREATE TABLE dbo.Employee (
    EmployeeID   INT NOT NULL PRIMARY KEY,
    Name         NVARCHAR(50) NOT NULL,
    DepartmentID INT NOT NULL
        REFERENCES dbo.Department (DepartmentID)
);

-- Adding a foreign key after the fact, with a cascade option
ALTER TABLE dbo.Employee
ADD CONSTRAINT FK_Employee_Department
FOREIGN KEY (DepartmentID) REFERENCES dbo.Department (DepartmentID)
ON DELETE CASCADE;


/* ---------------------------------------------------------------------
   CHAPTER 12 — Data Warehouse Concepts
   --------------------------------------------------------------------- */
USE AdventureWorksDW2014;
GO

-- A fact table joined to a dimension table (the whole point of a star schema)
SELECT p.EnglishProductName, p.Color, SUM(f.SalesAmount) AS TotalSales
FROM dbo.FactInternetSales AS f
JOIN dbo.DimProduct AS p ON p.ProductKey = f.ProductKey
GROUP BY p.EnglishProductName, p.Color
ORDER BY TotalSales DESC;

-- Finding SCD Type 2 history already present in DimProduct
SELECT ProductKey, EnglishProductName, StartDate, EndDate, Status
FROM dbo.DimProduct
WHERE EndDate IS NOT NULL
ORDER BY EndDate DESC;
