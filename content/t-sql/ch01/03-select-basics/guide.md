# Lesson 3 — The SELECT Statement Basics

**Chapter 1 · T-SQL Foundations · Lesson 3 of 10**

## What you'll learn

- The anatomy of a `SELECT` statement: `SELECT`, `FROM`, and the semicolon
- The `*` wildcard vs. naming columns
- Two-part naming: `schema.table`
- Why every statement in this course ends with `;`

## The anatomy of SELECT

Every T-SQL query that retrieves data starts the same way:

```sql
SELECT <what you want>
FROM <where it lives>;
```

`SELECT` names the columns you want back. `FROM` names the table (or view)
they come from. The semicolon (`;`) marks the end of the statement — T-SQL
doesn't strictly require it on the last statement in a batch, but this course
uses it on every statement, because that habit prevents real errors once your
scripts contain more than one statement.

## SELECT * — everything

The `*` wildcard means "every column, in the table's defined order":

```sql
USE AdventureWorks2012;
GO

SELECT *
FROM Person.Person;
```

This is useful for exploring a table you've never seen before, but it's
rarely what you want in production code — more on why in Lesson 4.

![An SSMS query window running SELECT * FROM dbo.Customers, with the returned rows in the Results grid beneath it.](/courses/t-sql/ch01/03-select-basics/query-results.png)
*SELECT * FROM a table — every column, every row, straight into the Results grid.*

## Two-part naming: schema.table

Notice `Person.Person` above, not just `Person`. SQL Server tables live inside
a **schema** — a named container that groups related objects (think of it as
a folder). `Person.Person` means "the `Person` table, inside the `Person`
schema." AdventureWorks2012 organizes its tables into schemas like
`Person`, `Sales`, `Production`, and `HumanResources`. You'll always see
tables referred to this way in this course, because leaving the schema off
can be ambiguous if two schemas both have a table with the same name.

## Running it

```sql
USE AdventureWorks2012;
GO

SELECT *
FROM Sales.Currency;
```

Run this in a New Query window (Lesson 1's `Execute`/F5) and you'll get every
row and every column of the `Sales.Currency` table back in the Results grid.

## Key terms

| Term | Meaning |
|---|---|
| `SELECT` | Names the columns you want returned |
| `FROM` | Names the table or view the data comes from |
| `*` | Wildcard meaning "all columns" |
| Schema | A named container that groups related database objects |
| `schema.table` | Two-part naming that unambiguously identifies a table |

## Lab

Run each of these against AdventureWorks2012 and note how many rows and
columns each one returns:

```sql
USE AdventureWorks2012;
GO

SELECT * FROM Person.Person;
SELECT * FROM Production.Product;
SELECT * FROM Sales.Currency;
```

## Check yourself

You're ready for Lesson 4 when you can answer, without looking: what do
`SELECT` and `FROM` each do, what does `*` mean, and why does
`Person.Person` have the name repeated?
