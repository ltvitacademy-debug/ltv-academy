# Lesson 27 — SELF JOIN

**Chapter 3 · Joining Tables · Lesson 7 of 11**

## What you'll learn

- What a self join is, conceptually
- Why a self join always needs two aliases for the same table
- A real, runnable self join against AdventureWorks2012

## What is a self join?

A **self join** is a table joined to **itself**. There's no new keyword —
it's the same `JOIN` syntax you already know, applied to one table listed
twice, each copy given a different alias. The classic teaching example is
an employee table where each row also stores that employee's manager:

```sql
-- Illustrative concept, not a runnable AdventureWorks2012 query:
SELECT e.EmployeeName, m.EmployeeName AS ManagerName
FROM Employee AS e
INNER JOIN Employee AS m
    ON e.ManagerID = m.EmployeeID;
```

Here, `Employee` is joined to **itself** — once aliased `e` (the employee),
once aliased `m` (that employee's manager). Without two different aliases,
SQL Server would have no way to tell "the employee's row" from "the
manager's row," since they're both coming from the same table.

## A real self join in AdventureWorks2012

AdventureWorks2012 doesn't store manager relationships this simply, but it
does have a genuine real-world self-join pattern in
`Production.BillOfMaterials`, which records which products are **components**
of which **assembled** products — both referencing `Production.Product`:

```sql
USE AdventureWorks2012;
GO

SELECT
    pAssembly.Name AS AssemblyProduct,
    pComponent.Name AS ComponentProduct
FROM Production.BillOfMaterials AS bom
INNER JOIN Production.Product AS pAssembly
    ON bom.ProductAssemblyID = pAssembly.ProductID
INNER JOIN Production.Product AS pComponent
    ON bom.ComponentID = pComponent.ProductID;
```

`Production.Product` is joined to itself, indirectly, through
`BillOfMaterials` — once as `pAssembly` (the finished product) and once as
`pComponent` (a part that goes into it). This is exactly what a self join
looks like in a real, normalized database: the same table, aliased twice,
representing two different **roles** in the relationship.

## Key terms

| Term | Meaning |
|---|---|
| Self join | A table joined to itself, using two different aliases |
| Role | What each aliased copy of the table represents in the relationship (e.g. "assembly" vs. "component") |

## Lab

Run the `BillOfMaterials` query above against AdventureWorks2012 and
identify: which alias represents the finished product, and which
represents a part used inside it?

## Check yourself

You're ready for Lesson 28 when you can answer, without looking: why does
a self join always require two aliases, and what does each alias
represent in the `BillOfMaterials` example?
