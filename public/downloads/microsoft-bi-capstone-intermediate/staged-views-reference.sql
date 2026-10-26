-- Weekly Sales & Fulfillment Report — Staged Views Reference
-- Intermediate Capstone, Lesson 4: "Staging the Data for Repeatable Use"
--
-- Three views: one keys-only fact view, two small dimension views that carry
-- the names. Run these against AdventureWorks2012, then re-run them with
-- CREATE OR ALTER any time the business logic needs to change (see Lesson 15).

USE AdventureWorks2012;
GO

CREATE OR ALTER VIEW dbo.vw_CarrawayWeeklySalesFact AS
SELECT
    soh.SalesOrderID,
    soh.OrderDate,
    soh.DueDate,
    soh.ShipDate,
    soh.TerritoryID,
    sod.ProductID,
    sod.OrderQty,
    sod.UnitPrice,
    sod.UnitPriceDiscount,
    sod.LineTotal
FROM Sales.SalesOrderHeader AS soh
INNER JOIN Sales.SalesOrderDetail AS sod
    ON sod.SalesOrderID = soh.SalesOrderID
WHERE soh.Status = 5;
GO

CREATE OR ALTER VIEW dbo.vw_CarrawayProductDim AS
SELECT
    p.ProductID,
    p.Name AS ProductName,
    psc.Name AS SubcategoryName
FROM Production.Product AS p
LEFT JOIN Production.ProductSubcategory AS psc
    ON psc.ProductSubcategoryID = p.ProductSubcategoryID;
GO

CREATE OR ALTER VIEW dbo.vw_CarrawayTerritoryDim AS
SELECT
    TerritoryID,
    Name  AS TerritoryName,
    [Group] AS TerritoryGroup
FROM Sales.SalesTerritory;
GO

-- Validation: FactRowCount should match the COUNT(*) you got from Lessons 2-3.
SELECT COUNT(*) AS FactRowCount FROM dbo.vw_CarrawayWeeklySalesFact;

-- Sanity-check all three views return sensible rows before building the model.
SELECT TOP 5 * FROM dbo.vw_CarrawayWeeklySalesFact ORDER BY OrderDate DESC;
SELECT TOP 5 * FROM dbo.vw_CarrawayProductDim;
SELECT TOP 5 * FROM dbo.vw_CarrawayTerritoryDim;
