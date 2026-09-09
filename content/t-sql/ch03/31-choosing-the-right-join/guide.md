# Lesson 31 — Choosing the Right Join

**Chapter 3 · Joining Tables · Lesson 11 of 11**

## What you'll learn

- A decision framework for picking a join type
- All seven join tools from this chapter, side by side
- The one question that decides most join choices
- Wrapping up Chapter 3

## The one question that decides most joins

Before writing any join, ask: **"Do I need rows that have no match on the
other side?"**

- **No** → `INNER JOIN`. You only want rows that genuinely relate to both
  tables.
- **Yes, keep everything from one specific side** → `LEFT JOIN` (this
  course's consistent choice, per Lesson 24, over `RIGHT JOIN`).
- **Yes, keep everything from both sides** → `FULL OUTER JOIN`.
- **I need every combination, not a match at all** → `CROSS JOIN` (rare,
  and usually intentional when used).

## All seven tools from this chapter

| Tool | Use it when... |
|---|---|
| `INNER JOIN` | You only want rows that match on both sides |
| `LEFT JOIN` | You want everything from one table, matched or not |
| `RIGHT JOIN` | Recognize it in others' code; write `LEFT JOIN` instead |
| `FULL OUTER JOIN` | You want everything from both tables, matched or not |
| `CROSS JOIN` | You genuinely want every combination (rare) |
| `SELF JOIN` | The relationship you need lives inside one table |
| `CROSS APPLY` / `OUTER APPLY` | You need to join to a function, not a table |

## A worked example

"Show me every customer, and how much they've spent — including customers
who've never placed an order, shown as $0":

```sql
USE AdventureWorks2012;
GO

SELECT per.FirstName, per.LastName, soh.TotalDue
FROM Person.Person AS per
LEFT JOIN Sales.SalesOrderHeader AS soh
    ON per.BusinessEntityID = soh.CustomerID;
```

Walk the question backward: "including customers who've never ordered"
means unmatched left-side rows must be **kept** → `LEFT JOIN`, not
`INNER JOIN`.

## Chapter 3 recap

You can now combine data from any number of tables, keep or drop unmatched
rows deliberately, join a table to itself, and even join to a function.
Chapter 4 builds on this directly: once you can combine tables, the next
question is almost always "now summarize it" — `GROUP BY` and aggregate
functions.

## Key terms

| Term | Meaning |
|---|---|
| Join selection question | "Do I need rows with no match on the other side?" |

## Lab

For each of these plain-English requests, decide which join type you'd
use, then write the query against AdventureWorks2012:

1. Every product and its category, only for products that have a category
   assigned.
2. Every product, whether or not it has a category assigned.

## Check yourself

You're ready for Chapter 4 when you can answer, without looking: what's
the one question that decides most join choices, and which join type
answers "I want everything from both tables, matched or not"?
