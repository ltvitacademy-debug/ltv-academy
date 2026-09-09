# Lesson 103 — Normalization: 2NF and 3NF

**Chapter 11 · Database Design Fundamentals · Lesson 9 of 12**

## What you'll learn

- **Second Normal Form (2NF)**: eliminating partial dependencies on a
  composite key
- **Third Normal Form (3NF)**: eliminating transitive dependencies between
  non-key columns
- Real AdventureWorks2012 designs that already follow both rules
- A simple test you can run on any table to check for violations

## Second Normal Form (2NF)

2NF applies to tables with a **composite** primary key (Lesson 95). It
requires that every non-key column depend on the **entire** key — not just
part of it. A column that only depends on part of a composite key is a
*partial dependency*, and it's a 2NF violation.

```sql
-- VIOLATES 2NF: ProductName depends only on ProductID,
-- not on the whole (OrderID, ProductID) key
CREATE TABLE dbo.BadOrderLine (
    OrderID     INT NOT NULL,
    ProductID   INT NOT NULL,
    ProductName NVARCHAR(50),  -- doesn't need OrderID to know this
    Quantity    INT NOT NULL,
    CONSTRAINT PK_BadOrderLine PRIMARY KEY (OrderID, ProductID)
);
```

AdventureWorks2012's real `Sales.SalesOrderDetail` gets this right: its
composite key is `(SalesOrderID, SalesOrderDetailID)`, but it stores only
`ProductID`, never `ProductName` — the name lives in `Production.Product`,
one join away:

```sql
SELECT d.SalesOrderID, d.OrderQty, p.Name AS ProductName
FROM Sales.SalesOrderDetail AS d
JOIN Production.Product AS p ON p.ProductID = d.ProductID
WHERE d.SalesOrderID = 43659;
```

## Third Normal Form (3NF)

3NF goes one step further: it also forbids a *transitive* dependency —
a non-key column depending on **another non-key column**, instead of
depending directly on the primary key.

```sql
-- VIOLATES 3NF: DepartmentName depends on DepartmentID,
-- not directly on EmployeeID (the primary key)
CREATE TABLE dbo.BadEmployee (
    EmployeeID     INT NOT NULL PRIMARY KEY,
    Name           NVARCHAR(50),
    DepartmentID   INT,
    DepartmentName NVARCHAR(50)  -- this is really about DepartmentID, not EmployeeID
);
```

AdventureWorks2012 avoids this too: `HumanResources.Employee` doesn't store
a department name at all — department membership and its name both live in
separate tables, reached through `HumanResources.EmployeeDepartmentHistory`:

```sql
SELECT e.BusinessEntityID, d.Name AS DepartmentName
FROM HumanResources.Employee AS e
JOIN HumanResources.EmployeeDepartmentHistory AS edh
    ON edh.BusinessEntityID = e.BusinessEntityID AND edh.EndDate IS NULL
JOIN HumanResources.Department AS d ON d.DepartmentID = edh.DepartmentID;
```

## The simple test

For any table: ask "does this column depend on the *key*, the *whole*
key, and *nothing but* the key?" A "no" to any part of that points at a
1NF, 2NF, or 3NF violation, respectively.

## Key terms

| Term | Meaning |
|---|---|
| 2NF | Every non-key column must depend on the entire composite key, not just part of it |
| Partial dependency | A column depending on only part of a composite key — a 2NF violation |
| 3NF | Every non-key column must depend only on the key, not on another non-key column |
| Transitive dependency | A non-key column depending on another non-key column — a 3NF violation |

## Lab

Run against AdventureWorks2012:

```sql
-- Confirm SalesOrderDetail never duplicates ProductName across rows
SELECT DISTINCT d.ProductID, p.Name
FROM Sales.SalesOrderDetail AS d
JOIN Production.Product AS p ON p.ProductID = d.ProductID
ORDER BY d.ProductID;
```

## Check yourself

You're ready for Lesson 104 when you can explain, without looking: what's
the difference between a partial dependency (2NF) and a transitive
dependency (3NF)?
