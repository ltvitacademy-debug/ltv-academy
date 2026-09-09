# Lesson 57 — Recursive CTEs

**Chapter 6 · Subqueries, CTEs, and Views · Lesson 6 of 10**

## What you'll learn

- What makes a CTE "recursive" — referencing itself
- The two required parts: anchor and recursive member
- A real hierarchical example: bills of materials
- Why recursive CTEs need `UNION ALL`, not `UNION`

## The problem: hierarchical data

Some data is naturally **hierarchical** — an org chart, a folder
structure, or (in AdventureWorks2012) a **bill of materials**: a bicycle
`Product` is assembled from component `Product`s, and some of those
components are themselves assemblies made of further components. A
regular query can't walk an arbitrary number of levels deep — you'd need
to know in advance how many levels exist. A **recursive CTE** solves
exactly this.

## The two required parts

A recursive CTE has two parts, joined with `UNION ALL`:

```sql
USE AdventureWorks2012;
GO

WITH BOMHierarchy AS (
    -- Anchor member: the starting point
    SELECT ProductAssemblyID, ComponentID, 0 AS Level
    FROM Production.BillOfMaterials
    WHERE ProductAssemblyID = 800  -- pick a real assembly ID from your data

    UNION ALL

    -- Recursive member: references BOMHierarchy itself
    SELECT bom.ProductAssemblyID, bom.ComponentID, bh.Level + 1
    FROM Production.BillOfMaterials AS bom
    INNER JOIN BOMHierarchy AS bh
        ON bom.ProductAssemblyID = bh.ComponentID
)
SELECT * FROM BOMHierarchy
ORDER BY Level;
```

- The **anchor member** (before `UNION ALL`) is the starting point — here,
  the top-level assembly's direct components, at `Level 0`.
- The **recursive member** (after `UNION ALL`) references
  `BOMHierarchy` **by its own name** — this is what makes it recursive.
  Each pass finds the next level down, joining components-of-components
  onto what was found in the previous pass, incrementing `Level` each
  time.

SQL Server repeats the recursive member automatically until it produces
**no new rows** — that's how deep hierarchies get walked without you
knowing the depth in advance.

## Why UNION ALL, not UNION

Recursive CTEs **require** `UNION ALL` between the anchor and recursive
members — `UNION`'s deduplication (Lesson 38) isn't just unnecessary here,
it's actually disallowed by T-SQL's recursive CTE syntax.

## Key terms

| Term | Meaning |
|---|---|
| Anchor member | The starting point of a recursive CTE |
| Recursive member | The part that references the CTE by its own name, repeated until no new rows appear |

## Lab

Look up a real `ProductAssemblyID` in `Production.BillOfMaterials` (any
value that appears in that column), substitute it into the query above,
and run it against AdventureWorks2012.

## Check yourself

You're ready for Lesson 58 when you can answer, without looking: what are
the two required parts of a recursive CTE, and why must they be joined
with `UNION ALL` instead of `UNION`?
