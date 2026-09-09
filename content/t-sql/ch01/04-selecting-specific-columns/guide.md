# Lesson 4 — Selecting Specific Columns

**Chapter 1 · T-SQL Foundations · Lesson 4 of 10**

## What you'll learn

- Naming exact columns instead of using `*`
- Column order in your results is whatever order you list them
- Why `SELECT *` is a bad habit in real, production code
- Separating multiple columns with commas

## Naming the columns you want

Instead of `*`, list the columns you actually need, separated by commas:

```sql
USE AdventureWorks2012;
GO

SELECT FirstName, LastName, EmailPromotion
FROM Person.Person;
```

The columns come back in the exact order you listed them — not the table's
internal order. That's a useful trick: you control the shape of your output
just by how you write the `SELECT` list.

```sql
SELECT LastName, FirstName
FROM Person.Person;
```

Same table, same rows — but now `LastName` comes first, because that's the
order you asked for.

## Why not just always use SELECT *?

`SELECT *` feels faster to type, but it causes real problems once code moves
beyond a quick exploratory query:

- **Wasted bandwidth and memory.** Returning columns nobody uses is wasted
  work for the server and the network, especially on wide tables.
- **Fragile code.** If someone adds a column to the table later, every
  `SELECT *` query changes its output shape without warning — which can break
  application code that expects a specific column order.
- **Unclear intent.** Naming columns tells the next developer (or you, in six
  months) exactly what the query is actually for.

The rule of thumb: use `SELECT *` freely while exploring a table you don't
know yet. Once you're writing a query that's going into an application,
report, or script that runs regularly, name your columns.

## Practice

```sql
USE AdventureWorks2012;
GO

SELECT Name, ProductNumber, Color, ListPrice
FROM Production.Product;
```

## Key terms

| Term | Meaning |
|---|---|
| Column list | The comma-separated columns named after `SELECT` |
| Output order | Determined by the order columns are listed, not the table's internal order |

## Lab

Run this against AdventureWorks2012, then rewrite it twice more — once
selecting only `Name` and `Color`, and once with the columns in reverse order
— and confirm the Results grid changes to match each time:

```sql
SELECT Name, ProductNumber, Color, ListPrice
FROM Production.Product;
```

## Check yourself

You're ready for Lesson 5 when you can answer, without looking: what decides
the order of columns in your results, and why is `SELECT *` a bad habit in
production code?
