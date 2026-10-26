-- Regional Sales Snapshot — Sales Extract Query Reference
-- Beginner Capstone, Lesson 3: "Writing the Sales Extract Query"
--
-- This is the finished extract query from the lesson, against AdventureWorks2012.
-- Run it as-is to see the real result set, then use it as a reference while you
-- write your own version from Lesson 2's plan.

USE AdventureWorks2012;
GO

SELECT
    st.Name                                   AS Territory,
    p.ProductLine                             AS ProductLine,
    SUM(sod.LineTotal)                        AS TotalSalesAmount,
    COUNT(DISTINCT soh.SalesOrderID)          AS OrderCount
FROM Sales.SalesOrderDetail AS sod
JOIN Sales.SalesOrderHeader AS soh
    ON sod.SalesOrderID = soh.SalesOrderID
JOIN Production.Product AS p
    ON sod.ProductID = p.ProductID
JOIN Sales.SalesTerritory AS st
    ON soh.TerritoryID = st.TerritoryID
WHERE soh.OrderDate >= DATEFROMPARTS(
        YEAR(GETDATE()),
        (DATEPART(QUARTER, GETDATE()) - 1) * 3 + 1,
        1)
  AND soh.OrderDate < DATEADD(MONTH, 3, DATEFROMPARTS(
        YEAR(GETDATE()),
        (DATEPART(QUARTER, GETDATE()) - 1) * 3 + 1,
        1))
GROUP BY st.Name, p.ProductLine
ORDER BY st.Name, p.ProductLine;
GO

-- Lab check from Lesson 3: swap COUNT(DISTINCT soh.SalesOrderID) for a plain
-- COUNT(*) below and compare the OrderCount columns — they will differ, because
-- the join to SalesOrderDetail repeats each SalesOrderID once per line item.

SELECT
    st.Name                                   AS Territory,
    p.ProductLine                             AS ProductLine,
    SUM(sod.LineTotal)                        AS TotalSalesAmount,
    COUNT(*)                                  AS OrderCount_WRONG_DoNotUse
FROM Sales.SalesOrderDetail AS sod
JOIN Sales.SalesOrderHeader AS soh
    ON sod.SalesOrderID = soh.SalesOrderID
JOIN Production.Product AS p
    ON sod.ProductID = p.ProductID
JOIN Sales.SalesTerritory AS st
    ON soh.TerritoryID = st.TerritoryID
WHERE soh.OrderDate >= DATEFROMPARTS(
        YEAR(GETDATE()),
        (DATEPART(QUARTER, GETDATE()) - 1) * 3 + 1,
        1)
  AND soh.OrderDate < DATEADD(MONTH, 3, DATEFROMPARTS(
        YEAR(GETDATE()),
        (DATEPART(QUARTER, GETDATE()) - 1) * 3 + 1,
        1))
GROUP BY st.Name, p.ProductLine
ORDER BY st.Name, p.ProductLine;
GO
