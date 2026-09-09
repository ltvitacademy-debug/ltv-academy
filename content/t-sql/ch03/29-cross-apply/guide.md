# Lesson 29 — CROSS APPLY

**Chapter 3 · Joining Tables · Lesson 9 of 11**

## What you'll learn

- What a table-valued function is, briefly
- `CROSS APPLY` — joining to a function instead of a table
- Why `JOIN ... ON` can't do this job
- A real example against AdventureWorks2012

## The problem: joining to a function

Every `JOIN` so far has connected two **tables**. But T-SQL also has
**table-valued functions (TVFs)** — functions that return a result set,
often computed differently **for each row** of the table you're querying.
`JOIN ... ON` can't reference "the current row's value" while evaluating a
function, because `ON` is evaluated as a set-based condition, not row by
row. `CROSS APPLY` exists to solve exactly this.

## CROSS APPLY — a real example

AdventureWorks2012 ships a table-valued function,
`dbo.ufnGetContactInformation`, that takes a `BusinessEntityID` and returns
that person's contact details:

```sql
USE AdventureWorks2012;
GO

SELECT p.BusinessEntityID, ci.FirstName, ci.LastName, ci.JobTitle
FROM Person.Person AS p
CROSS APPLY dbo.ufnGetContactInformation(p.BusinessEntityID) AS ci;
```

For **every row** in `Person.Person`, `CROSS APPLY` calls
`ufnGetContactInformation`, passing in **that row's own**
`BusinessEntityID`, and joins the result back in. This is the key
difference from a regular `JOIN`: the right side isn't a fixed table — it's
re-evaluated fresh for each left-side row, using that row's own values as
input.

## CROSS APPLY behaves like INNER JOIN

If the function returns no rows for a given input, that left-side row is
dropped from the result — same behavior as `INNER JOIN`. Lesson 30 covers
`OUTER APPLY`, which instead behaves like `LEFT JOIN` — keeping the
left-side row even when the function returns nothing.

## Key terms

| Term | Meaning |
|---|---|
| Table-valued function (TVF) | A function that returns a result set, not a single value |
| `CROSS APPLY` | Joins to a TVF, re-evaluated per row, dropping rows where the function returns nothing |

## Lab

Run this against AdventureWorks2012:

```sql
SELECT p.BusinessEntityID, ci.FirstName, ci.LastName
FROM Person.Person AS p
CROSS APPLY dbo.ufnGetContactInformation(p.BusinessEntityID) AS ci;
```

## Check yourself

You're ready for Lesson 30 when you can answer, without looking: why can't
a regular `JOIN ... ON` call a function using each row's own value, and
what happens to a `CROSS APPLY` row when the function returns nothing?
