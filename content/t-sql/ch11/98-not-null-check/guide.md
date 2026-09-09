# Lesson 98 — NOT NULL and CHECK Constraints

**Chapter 11 · Database Design Fundamentals · Lesson 4 of 12**

## What you'll learn

- What `NOT NULL` guarantees, and why it's the simplest constraint of all
- What a `CHECK` constraint validates, beyond just "is there a value?"
- AdventureWorks2012's real `CK_` constraints on `Production.Product`
- Why enforcing rules in the database beats hoping the application
  remembers to

## NOT NULL — requiring a value

```sql
CREATE TABLE dbo.Department (
    DepartmentID INT NOT NULL PRIMARY KEY,
    Name         NVARCHAR(50) NOT NULL,
    Notes        NVARCHAR(200) NULL  -- explicitly optional
);
```

Every column is nullable by default unless you say `NOT NULL`. It's the
simplest constraint in the whole language — no value, no row.

## CHECK — validating a condition

A `CHECK` constraint goes further than "is there a value?" — it validates
that the value satisfies **any boolean expression** you write.
AdventureWorks2012's real `Production.Product` table has several,
following the `CK_` naming convention:

```sql
-- See them yourself
EXEC sp_helpconstraint 'Production.Product';
```

Two real examples from that table:

```sql
-- CK_Product_ListPrice: price can never be negative
ALTER TABLE dbo.Product
ADD CONSTRAINT CK_Product_ListPrice CHECK (ListPrice >= 0.00);

-- CK_Product_Class: only three valid class codes, or unknown (NULL)
ALTER TABLE dbo.Product
ADD CONSTRAINT CK_Product_Class CHECK (Class IN ('L', 'M', 'H') OR Class IS NULL);
```

A `CHECK` constraint can reference **any** logic on that row — comparisons,
ranges, pattern matching with `LIKE`, or a list with `IN`. It's evaluated
on every `INSERT` and `UPDATE`, automatically, with zero application code.

## Why this beats trusting the application

Any front-end form or API endpoint *could* validate that a price is
non-negative — but if even one code path forgets to check, invalid data
gets in, silently, forever. A `CHECK` constraint makes that validation
physically impossible to bypass, no matter which application, script, or
person is writing the `INSERT`.

```sql
-- This fails immediately, regardless of what inserted it
INSERT INTO dbo.Product (ProductID, Name, ListPrice)
VALUES (1, 'Broken Widget', -5.00);
-- Msg 547: The INSERT statement conflicted with the CHECK constraint "CK_Product_ListPrice"
```

## Key terms

| Term | Meaning |
|---|---|
| NOT NULL | Requires a column to always have a value |
| CHECK constraint | Validates that a column's value satisfies a boolean expression |
| CK_ prefix | AdventureWorks2012's naming convention for CHECK constraints |

## Lab

Run against a scratch schema:

```sql
CREATE TABLE dbo.Lesson98Demo (
    DemoID   INT NOT NULL PRIMARY KEY,
    Name     NVARCHAR(50) NOT NULL,
    Price    MONEY NOT NULL,
    CONSTRAINT CK_Lesson98_Price CHECK (Price >= 0.00)
);

-- Works
INSERT INTO dbo.Lesson98Demo VALUES (1, 'Widget', 9.99);

-- Fails: NOT NULL violation
INSERT INTO dbo.Lesson98Demo (DemoID, Price) VALUES (2, 5.00);

-- Fails: CHECK constraint violation
INSERT INTO dbo.Lesson98Demo VALUES (3, 'Broken', -1.00);

-- Clean up
DROP TABLE dbo.Lesson98Demo;
```

## Check yourself

You're ready for Lesson 99 when you can explain, without looking: what can
a CHECK constraint validate that NOT NULL cannot, and why enforce that in
the database instead of the application?
