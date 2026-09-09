# Lesson 5 — Column Aliases (AS)

**Chapter 1 · T-SQL Foundations · Lesson 5 of 10**

## What you'll learn

- Renaming a column in your output with `AS`
- Aliasing without `AS` (and why this course always uses it)
- Aliasing expressions and calculated columns
- Quoting an alias that contains spaces

## What is a column alias?

An **alias** renames a column *in the output only* — it never touches the
table itself. Use the `AS` keyword between the column and the new name:

```sql
USE AdventureWorks2012;
GO

SELECT FirstName AS GivenName, LastName AS Surname
FROM Person.Person;
```

The Results grid now shows `GivenName` and `Surname` as the column headers,
even though the table's real columns are still called `FirstName` and
`LastName`.

## AS is optional — but use it anyway

T-SQL actually lets you drop the `AS` keyword entirely:

```sql
SELECT FirstName GivenName, LastName Surname
FROM Person.Person;
```

This works, but it's easy to misread — a missing comma can silently turn
what should be two columns into one aliased column. This course always
writes `AS` explicitly, because it makes the intent unambiguous to anyone
reading the query.

## Aliasing expressions

Aliases matter most when a column isn't just a table column but a
calculation — without an alias, SQL Server gives it an ugly, unnamed column
header:

```sql
SELECT ListPrice AS OriginalPrice,
       ListPrice * 0.9 AS DiscountedPrice
FROM Production.Product;
```

`ListPrice * 0.9` is an *expression*, not a stored column — the alias is
what gives it a readable name in your results.

## Aliases with spaces

If you want an alias that contains a space, wrap it in square brackets:

```sql
SELECT FirstName AS [Given Name], LastName AS [Last Name]
FROM Person.Person;
```

## Key terms

| Term | Meaning |
|---|---|
| Alias | A temporary name for a column (or expression) in your query's output |
| `AS` | The keyword that introduces an alias |
| `[ ]` | Square brackets, used to quote an alias containing spaces or reserved words |

## Lab

Run this against AdventureWorks2012 and confirm the column headers in your
Results grid match the aliases, not the original column names:

```sql
SELECT Name AS ProductName,
       ListPrice AS Price,
       ListPrice * 1.08 AS [Price With Tax]
FROM Production.Product;
```

## Check yourself

You're ready for Lesson 6 when you can answer, without looking: what does
`AS` actually change about the table, and how do you alias a name that has a
space in it?
