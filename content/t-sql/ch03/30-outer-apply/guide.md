# Lesson 30 — OUTER APPLY

**Chapter 3 · Joining Tables · Lesson 10 of 11**

## What you'll learn

- `OUTER APPLY` — `CROSS APPLY`'s `LEFT JOIN` equivalent
- Keeping rows even when the function returns nothing
- The exact CROSS/OUTER APPLY ↔ INNER/LEFT JOIN parallel

## The problem CROSS APPLY has

Lesson 29's `CROSS APPLY` **drops** any row where the function returns
nothing — exactly like `INNER JOIN` drops unmatched rows. Sometimes that's
wrong: you want every row from the left table, whether or not the function
found anything for it.

## OUTER APPLY — keep everything on the left

```sql
USE AdventureWorks2012;
GO

SELECT p.BusinessEntityID, ci.FirstName, ci.LastName
FROM Person.Person AS p
OUTER APPLY dbo.ufnGetContactInformation(p.BusinessEntityID) AS ci;
```

`OUTER APPLY` keeps **every row from `Person.Person`**, even if
`ufnGetContactInformation` returns nothing for a given `BusinessEntityID`.
When that happens, `ci.FirstName` and `ci.LastName` simply come back
`NULL` for that row — the exact same `NULL`-filling behavior you already
know from `LEFT JOIN` (Lesson 23).

## The parallel is exact

This mirrors the `INNER`/`LEFT` distinction perfectly:

| Regular JOIN | APPLY equivalent | Behavior on no match |
|---|---|---|
| `INNER JOIN` | `CROSS APPLY` | Row dropped |
| `LEFT JOIN` | `OUTER APPLY` | Row kept, `NULL`-filled |

If you've internalized `INNER JOIN` vs. `LEFT JOIN` from Lessons 22–23,
you already understand `CROSS APPLY` vs. `OUTER APPLY` — it's the identical
concept, just applied to a function instead of a table.

## When you'd reach for this

`OUTER APPLY` matters whenever the function's input might legitimately
produce no result, but you still need the calling row to appear in your
report — for example, showing every person in a list even if their
contact-info lookup came back empty, rather than silently excluding them.

## Key terms

| Term | Meaning |
|---|---|
| `OUTER APPLY` | Keeps every left-side row, `NULL`-filling when the function returns nothing |

## Lab

Run this against AdventureWorks2012 and compare its row count to the
`CROSS APPLY` version from Lesson 29:

```sql
SELECT p.BusinessEntityID, ci.FirstName, ci.LastName
FROM Person.Person AS p
OUTER APPLY dbo.ufnGetContactInformation(p.BusinessEntityID) AS ci;
```

## Check yourself

You're ready for Lesson 31 when you can answer, without looking: which
regular `JOIN` type does `OUTER APPLY` behave like, and what appears in the
function's columns when it returns nothing for a row?
