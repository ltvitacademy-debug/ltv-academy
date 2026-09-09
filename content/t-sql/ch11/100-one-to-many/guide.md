# Lesson 100 — Table Relationships: One-to-Many

**Chapter 11 · Database Design Fundamentals · Lesson 6 of 12**

## What you'll learn

- What **one-to-many** means, and why it's the relationship shape you'll
  use constantly
- Why it's just a plain foreign key — no special trick required
- AdventureWorks2012's real example: one order, many order lines
- How to spot the "one" side and the "many" side when designing a schema

## What one-to-many means

A **one-to-many** relationship means one row on the "one" side can be
referenced by *many* rows on the "many" side — but each row on the "many"
side points back to exactly one row on the "one" side. This is the shape
behind almost every foreign key you've written so far in this course.

Unlike Lesson 99's one-to-one, there's no special trick needed: it's just
an ordinary foreign key, on its own, with no extra `UNIQUE` or shared
primary key forcing it down to one match.

## The real AdventureWorks2012 example

One `Sales.SalesOrderHeader` row (one order) has **many**
`Sales.SalesOrderDetail` rows (its line items) — but each line item belongs
to exactly one order:

```sql
SELECT h.SalesOrderID, h.OrderDate, d.ProductID, d.OrderQty, d.UnitPrice
FROM Sales.SalesOrderHeader AS h
JOIN Sales.SalesOrderDetail AS d ON d.SalesOrderID = h.SalesOrderID
WHERE h.SalesOrderID = 43659
ORDER BY d.SalesOrderDetailID;
```

`SalesOrderDetail.SalesOrderID` is a foreign key back to
`SalesOrderHeader.SalesOrderID` — but it's *not* unique on its own (recall
Lesson 95: the real primary key here is the **composite** of
`SalesOrderID` *and* `SalesOrderDetailID` together). That's exactly what
allows many detail rows to share the same `SalesOrderID`.

```sql
-- Prove it: one order, many lines
SELECT SalesOrderID, COUNT(*) AS LineCount
FROM Sales.SalesOrderDetail
WHERE SalesOrderID = 43659
GROUP BY SalesOrderID;
```

## Defining your own

```sql
CREATE TABLE dbo.Department (
    DepartmentID INT NOT NULL PRIMARY KEY,
    Name         NVARCHAR(50) NOT NULL
);

CREATE TABLE dbo.Employee (
    EmployeeID   INT NOT NULL PRIMARY KEY,
    Name         NVARCHAR(50) NOT NULL,
    DepartmentID INT NOT NULL REFERENCES dbo.Department (DepartmentID)
    -- No UNIQUE here — many employees CAN share one DepartmentID
);
```

The difference from Lesson 99 is entirely about whether the foreign key
column is *also* constrained to be unique. Leave it unconstrained, and you
get one-to-many for free — every ordinary foreign key defaults to this
shape unless you deliberately restrict it.

## Key terms

| Term | Meaning |
|---|---|
| One-to-many | One row on the "one" side may be referenced by many rows on the "many" side |
| The "one" side | The table whose primary key is being referenced |
| The "many" side | The table holding the foreign key column, unconstrained to uniqueness |

## Lab

Run against AdventureWorks2012:

```sql
-- Find every order with more than 10 line items
SELECT SalesOrderID, COUNT(*) AS LineCount
FROM Sales.SalesOrderDetail
GROUP BY SalesOrderID
HAVING COUNT(*) > 10
ORDER BY LineCount DESC;
```

## Check yourself

You're ready for Lesson 101 when you can explain, without looking: what
makes a foreign key relationship one-to-many instead of one-to-one, and
which AdventureWorks2012 tables demonstrate it?
