# Lesson 51 — Deleting Duplicate Rows

**Chapter 5 · Data Types, Strings, and Dates · Lesson 11 of 11**

## What you'll learn

- Why duplicate rows are a real, common cleanup problem
- Using `ROW_NUMBER()` (a preview of Chapter 9) to identify duplicates
- Deleting duplicates while keeping exactly one copy
- Wrapping up Chapter 5

## Why duplicates happen

Real-world data accumulates duplicate rows constantly — a form submitted
twice, an import run more than once, a sync process without proper
deduplication logic. Finding and removing them safely is a genuinely
common real-world task.

## Identifying duplicates with ROW_NUMBER()

We'll cover `ROW_NUMBER()` properly in Chapter 9, but here's a preview
just enough to solve this problem: it assigns a sequential number to each
row **within a group** of rows that share the same values in specified
columns.

```sql
USE AdventureWorks2012;
GO

SELECT *,
       ROW_NUMBER() OVER (PARTITION BY FirstName, LastName, EmailPromotion
                           ORDER BY BusinessEntityID) AS RowNum
FROM Person.Person;
```

`PARTITION BY` groups rows sharing the same `FirstName`, `LastName`, and
`EmailPromotion` — think of it as `GROUP BY` for numbering purposes,
without collapsing the rows. Within each group, `RowNum` starts at `1` and
counts up. Any row where `RowNum` is greater than `1` is, by definition, a
**duplicate** of an earlier row in that same group.

## Deleting the duplicates

Wrap the numbered query in a CTE (a tool we'll cover fully in Chapter 6)
and delete anything past the first copy:

```sql
WITH NumberedRows AS (
    SELECT *,
           ROW_NUMBER() OVER (PARTITION BY FirstName, LastName, EmailPromotion
                               ORDER BY BusinessEntityID) AS RowNum
    FROM Person.Person
)
DELETE FROM NumberedRows
WHERE RowNum > 1;
```

This keeps exactly **one** copy of each duplicate group (the one with the
lowest `BusinessEntityID`, per the `ORDER BY` inside `OVER`) and removes
the rest.

## Always verify before deleting

Any `DELETE` is a genuinely destructive operation. Run the `SELECT`
version first, review which rows have `RowNum > 1`, and only convert it to
a `DELETE` once you're confident those are the rows you actually want
gone.

## Chapter 5 recap

You now know how T-SQL stores and manipulates text and dates: fixed vs.
variable length, Unicode, string functions for extracting and
transforming, date arithmetic, type conversion, and this practical
deduplication technique. Chapter 6 moves into subqueries, CTEs, and
views — the tools for building queries out of other queries.

## Key terms

| Term | Meaning |
|---|---|
| `ROW_NUMBER()` | Assigns a sequential number to rows within a group (previewed here, covered fully in Chapter 9) |
| `PARTITION BY` | Defines the groups `ROW_NUMBER()` numbers within |

## Lab

Run the `SELECT` version of the query above against
AdventureWorks2012 and identify (without deleting anything) how many
duplicate groups exist.

## Check yourself

You're ready for Chapter 6 when you can answer, without looking: what does
a `RowNum` greater than `1` signal, and why should you always run the
`SELECT` version before converting it to a `DELETE`?
