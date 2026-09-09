# Lesson 96 — Foreign Keys

**Chapter 11 · Database Design Fundamentals · Lesson 2 of 12**

## What you'll learn

- What a **foreign key** enforces, and why it's the mechanism behind every
  JOIN you've written since Chapter 3
- How to define one inline and after the fact
- What happens when you try to violate one
- `ON DELETE CASCADE` and `ON UPDATE CASCADE` — letting SQL Server clean up
  related rows automatically

## What a foreign key enforces

A **foreign key** is a constraint that says: "every value in this column
must already exist as a primary key value in that other table." It's how a
database guarantees **referential integrity** — you can't have an order for
a customer who doesn't exist, or a product in a subcategory that was never
created.

Real AdventureWorks2012 example: `Production.Product.ProductSubcategoryID`
is a foreign key referencing `Production.ProductSubcategory.ProductSubcategoryID`.

```sql
-- See it yourself
EXEC sp_helpconstraint 'Production.Product';
```

## Defining a foreign key inline

```sql
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
```

## Adding one after the fact

```sql
ALTER TABLE dbo.Employee
ADD CONSTRAINT FK_Employee_Department
FOREIGN KEY (DepartmentID) REFERENCES dbo.Department (DepartmentID);
```

## What happens if you try to violate it

```sql
-- This fails with Error 547 — the referenced DepartmentID doesn't exist
INSERT INTO dbo.Employee (EmployeeID, Name, DepartmentID)
VALUES (1, 'Test Employee', 9999);
```

That failure is the entire point: the foreign key physically prevents
orphaned data from ever entering the table, no application code required.

## Letting SQL Server clean up automatically

By default, deleting a referenced row fails if any foreign key still points
to it — SQL Server refuses to create an orphan. `ON DELETE CASCADE` changes
that, automatically deleting the dependent rows too:

```sql
ALTER TABLE dbo.Employee
DROP CONSTRAINT FK_Employee_Department;

ALTER TABLE dbo.Employee
ADD CONSTRAINT FK_Employee_Department
FOREIGN KEY (DepartmentID) REFERENCES dbo.Department (DepartmentID)
ON DELETE CASCADE;

-- Now deleting a Department also deletes every Employee in it
DELETE FROM dbo.Department WHERE DepartmentID = 1;
```

Use cascades carefully — they're convenient, but a cascading delete can
silently remove far more data than you expect if the relationship chain
runs deep.

## Key terms

| Term | Meaning |
|---|---|
| Foreign key | A constraint requiring a column's values to exist as primary keys in another table |
| Referential integrity | The guarantee that relationships between tables always point to real rows |
| Error 547 | The constraint violation error raised when an INSERT/UPDATE/DELETE would break a foreign key |
| ON DELETE CASCADE | Automatically deletes dependent rows when the referenced row is deleted |

## Lab

Run against AdventureWorks2012 or a scratch schema:

```sql
CREATE TABLE dbo.Lesson96Dept (
    DeptID INT NOT NULL PRIMARY KEY,
    Name   NVARCHAR(50)
);

CREATE TABLE dbo.Lesson96Emp (
    EmpID  INT NOT NULL PRIMARY KEY,
    DeptID INT NOT NULL,
    CONSTRAINT FK_Lesson96 FOREIGN KEY (DeptID) REFERENCES dbo.Lesson96Dept (DeptID)
);

INSERT INTO dbo.Lesson96Dept VALUES (1, 'Engineering');

-- Works: DeptID 1 exists
INSERT INTO dbo.Lesson96Emp VALUES (100, 1);

-- Fails with Error 547: DeptID 2 doesn't exist
INSERT INTO dbo.Lesson96Emp VALUES (101, 2);

-- Clean up
DROP TABLE dbo.Lesson96Emp;
DROP TABLE dbo.Lesson96Dept;
```

## Check yourself

You're ready for Lesson 97 when you can explain, without looking: what
error do you get when you violate a foreign key, and what does
`ON DELETE CASCADE` change about that behavior?
