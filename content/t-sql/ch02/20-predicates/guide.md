# Lesson 20 — Predicates: How SQL Server Filters Data

**Chapter 2 · Filtering and Sorting · Lesson 10 of 10**

## What you'll learn

- What a "predicate" actually is
- Every predicate you've learned this chapter, unified under one concept
- Where else predicates appear in T-SQL beyond `WHERE`
- Wrapping up Chapter 2

## What is a predicate?

A **predicate** is any expression that evaluates to `TRUE`, `FALSE`, or
`UNKNOWN` (the special case `NULL` comparisons produce, from Lesson 16).
In plain terms: **a predicate is how you filter data.** Every condition
you've written in a `WHERE` clause this entire chapter has been a
predicate.

```sql
USE AdventureWorks2012;
GO

SELECT Name, ListPrice
FROM Production.Product
WHERE ListPrice > 100;  -- "ListPrice > 100" is the predicate
```

## Every predicate you already know

This chapter taught you several kinds of predicates without necessarily
naming them that:

| Predicate type | Example | Lesson |
|---|---|---|
| Comparison | `ListPrice > 100` | 12 |
| Logical combination | `Color = 'Red' AND ListPrice > 100` | 13 |
| Pattern match | `LastName LIKE 'Sm%'` | 14 |
| List membership | `Color IN ('Red', 'Blue')` | 15 |
| Range | `ListPrice BETWEEN 50 AND 100` | 15 |
| Null check | `MiddleName IS NULL` | 16 |

They all share one property: for any given row, each one resolves to a
single `TRUE`/`FALSE`/`UNKNOWN` value, and `WHERE` keeps only the rows
where the overall predicate is `TRUE`.

## Predicates aren't just for WHERE

You've actually already used predicates in two other places in this
course:

- **Inside `CASE`** (Chapter 1) — every searched `CASE`'s `WHEN` clause is a
  predicate.
- **Inside `JOIN ... ON`** — you'll meet this properly in Chapter 3, but the
  condition after `ON` is also a predicate, just like `WHERE`.
- **Inside `HAVING`** (Chapter 4) — filters groups instead of rows, but
  works the same way.

Once you recognize predicates as one unifying concept, a lot of T-SQL
clicks into place — `WHERE`, `ON`, `HAVING`, and searched `CASE` are all
just "somewhere SQL Server expects a predicate."

## Chapter 2 recap

You can now filter rows with every comparison and logical operator, match
text patterns, check ranges and lists, handle `NULL` correctly, sort
results, and limit how many rows come back. Chapter 3 builds directly on
this: combining data from **multiple tables** with joins — and every join
condition you'll write is, unsurprisingly, a predicate.

## Key terms

| Term | Meaning |
|---|---|
| Predicate | An expression evaluating to `TRUE`, `FALSE`, or `UNKNOWN` — how SQL Server filters |

## Lab

Look back at every query you've written in this chapter. For each one,
identify the predicate — the specific expression after `WHERE` that
resolves to true or false for each row.

## Check yourself

You're ready for Chapter 3 when you can answer, without looking: what is a
predicate, and name two clauses (besides `WHERE`) that also expect one.
