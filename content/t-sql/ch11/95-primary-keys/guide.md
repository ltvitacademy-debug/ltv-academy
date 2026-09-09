# Lesson 95 — Primary Keys

**Chapter 11 · Database Design Fundamentals · Lesson 1 of 12**

## What you'll learn

- What a **primary key** guarantees, and why every table should have one
- How to define one inline, and how to add one after the fact
- **Composite** primary keys — when one column isn't enough to be unique
- Why creating a primary key usually creates a clustered index too
  (tying back to Lesson 88)

## What a primary key guarantees

A **primary key** is a constraint that guarantees two things about a
column (or set of columns) at once: every value is **unique**, and no value
is ever **NULL**. Together, that means a primary key value always uniquely
identifies exactly one row — the single most fundamental building block of
relational design.

## Defining a primary key inline

```sql
CREATE TABLE dbo.Department (
    DepartmentID INT NOT NULL PRIMARY KEY,
    Name         NVARCHAR(50) NOT NULL
);
```

Real AdventureWorks2012 example — `Production.Product`'s primary key is
`ProductID`, a single `INT` column:

```sql
-- Confirm it yourself
SELECT kc.name AS constraint_name, c.name AS column_name
FROM sys.key_constraints kc
JOIN sys.index_columns ic ON ic.object_id = kc.parent_object_id AND ic.index_id = kc.unique_index_id
JOIN sys.columns c ON c.object_id = ic.object_id AND c.column_id = ic.column_id
WHERE kc.parent_object_id = OBJECT_ID('Production.Product');
```

## Adding a primary key after the table exists

```sql
CREATE TABLE dbo.Department (
    DepartmentID INT NOT NULL,
    Name         NVARCHAR(50) NOT NULL
);

ALTER TABLE dbo.Department
ADD CONSTRAINT PK_Department PRIMARY KEY (DepartmentID);
```

Naming the constraint explicitly (`PK_Department`) is good practice — it
gives you a predictable name to reference later if you ever need to drop or
alter it, instead of relying on SQL Server's auto-generated name.

## Composite primary keys — when one column isn't enough

Sometimes no single column is unique by itself, but a *combination* of
columns is. AdventureWorks2012's `Sales.SalesOrderDetail` is the real
example: `SalesOrderDetailID` alone would be unique enough, but the table
is actually keyed on **both** `SalesOrderID` and `SalesOrderDetailID`
together:

```sql
ALTER TABLE dbo.OrderLine
ADD CONSTRAINT PK_OrderLine PRIMARY KEY (OrderID, LineNumber);
```

Neither `OrderID` nor `LineNumber` alone is unique across the whole table —
order 1001 has a line 1, and so does order 1002 — but the *pair* always is.

## The hidden connection to Lesson 88

When you create a primary key without saying otherwise, SQL Server builds
it as a **clustered** index by default — the same clustered index concept
from Lesson 88, physically sorting the table's rows by that key. That's why
a good primary key should also be narrow, unique, and ever-increasing: it's
not just an identity guarantee, it's your table's physical sort order too.

```sql
-- Force it nonclustered instead, if something else deserves the clustered slot
ALTER TABLE dbo.Department
ADD CONSTRAINT PK_Department PRIMARY KEY NONCLUSTERED (DepartmentID);
```

## Key terms

| Term | Meaning |
|---|---|
| Primary key | A constraint guaranteeing uniqueness and NOT NULL for a column or column set |
| Composite key | A primary key made of more than one column together |
| PK_ prefix | Common naming convention for primary key constraint names |

## Lab

Run against AdventureWorks2012:

```sql
-- 1. See Production.Product's real primary key
EXEC sp_helpconstraint 'Production.Product';

-- 2. Build your own table with an inline primary key
CREATE TABLE dbo.Lesson95Demo (
    DemoID INT NOT NULL PRIMARY KEY,
    Label  NVARCHAR(50)
);

-- 3. Add a composite-key table
CREATE TABLE dbo.Lesson95LineItems (
    OrderID    INT NOT NULL,
    LineNumber INT NOT NULL,
    Quantity   INT NOT NULL,
    CONSTRAINT PK_Lesson95LineItems PRIMARY KEY (OrderID, LineNumber)
);

-- Clean up
DROP TABLE dbo.Lesson95Demo;
DROP TABLE dbo.Lesson95LineItems;
```

## Check yourself

You're ready for Lesson 96 when you can explain, without looking: what two
things does a primary key guarantee, and what kind of index does it build
by default?
