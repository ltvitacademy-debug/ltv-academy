# Lesson 10 — Comments & Query Formatting

**Chapter 1 · T-SQL Foundations · Lesson 10 of 10**

## What you'll learn

- Single-line comments (`--`) and block comments (`/* */`)
- Why comments matter in scripts that outlive their author
- Formatting conventions this course uses from here forward
- Wrapping up Chapter 1

## Single-line comments

Two dashes start a comment that runs to the end of the line:

```sql
-- Get every customer in Australia
SELECT *
FROM Person.Person; -- exploring the table structure
```

Anything after `--` on that line is ignored by SQL Server. You've actually
already seen this: the sample scripts back in Lesson 1's screenshots used
exactly this style (`-- Select rows from table 'Customers'`).

## Block comments

`/* */` comments out everything between the markers, even across multiple
lines:

```sql
/*
   Author: LTV Academy
   Purpose: Pull all products under $50 for the spring sale report
   Last updated: this course
*/
SELECT Name, ListPrice
FROM Production.Product
WHERE ListPrice < 50; -- WHERE arrives properly in Chapter 2
```

Block comments are useful for a header describing a whole script, or for
temporarily disabling a chunk of code while you're testing something else.

## Why comment at all?

A query that makes perfect sense to you today can be a mystery in six
months — or to the next developer who inherits your script. Comments should
explain the **why**, not restate the **what** the code already makes obvious:

```sql
-- Bad: just restates the code
-- Select FirstName and LastName
SELECT FirstName, LastName FROM Person.Person;

-- Better: explains WHY
-- Marketing needs a name list for the spring mailer — see ticket #4471
SELECT FirstName, LastName FROM Person.Person;
```

## This course's formatting conventions

From here on, every script in this course follows the same style, so you
can focus on the T-SQL itself instead of decoding formatting:

- Keywords in `UPPERCASE` (`SELECT`, `FROM`, `WHERE`)
- One clause per line once a query has more than one or two clauses
- Every statement ends with `;`
- Every script opens with `USE <database>; GO`
- Two-part `schema.table` naming, always

```sql
USE AdventureWorks2012;
GO

SELECT Name,
       ListPrice
FROM Production.Product
WHERE ListPrice < 50;
```

## Chapter 1 recap

You now have the full vocabulary for a basic query: `SELECT`, `FROM`,
column lists, aliases, concatenation, `CASE`, `DISTINCT`, and how to
document what you write. Chapter 2 builds directly on this: filtering rows
with `WHERE`, wildcards, `NULL` handling, and sorting.

## Key terms

| Term | Meaning |
|---|---|
| `--` | Single-line comment |
| `/* ... */` | Block comment, spans multiple lines |

## Lab

Take any script from this chapter's earlier lessons and add: one block
comment at the top explaining its purpose, and one single-line comment on
a specific line explaining a non-obvious choice.

## Check yourself

You're ready for Chapter 2 when you can answer, without looking: what's the
difference between `--` and `/* */`, and what should a good comment explain
that the code doesn't already show?
