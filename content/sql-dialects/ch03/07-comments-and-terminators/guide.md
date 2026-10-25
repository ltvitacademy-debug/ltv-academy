# Lesson 18 — Comments and Statement Terminators Across Dialects

**Chapter 3 · Querying Basics Compared · Lesson 7 of 8**

## What you'll learn

- Comments: identical across T-SQL, Oracle, MySQL, and PostgreSQL
- Statement terminators: SQL Server's loose semicolon rule vs. the others' strict one
- Why `GO` is not part of the SQL language at all
- What breaks when you carry `GO` habits to another platform's tools

## Comments: the same everywhere

```sql
-- Single-line comment: works identically on T-SQL, Oracle, MySQL, and PostgreSQL
SELECT * FROM Orders; -- trailing comment

/* Block comment: also identical across all four dialects
   can span multiple lines */
SELECT * FROM Orders;
```

This is one of the rare areas with zero divergence: `--` for single-line
and `/* */` for block comments behave the same on every platform in this
course.

## Statement terminators: SQL Server is the loose one

```sql
-- T-SQL: a semicolon is increasingly recommended, but
-- not strictly required for most statements
SELECT * FROM Sales.Orders
UPDATE Sales.Orders SET Status = 'Shipped' WHERE OrderID = 1
```

T-SQL has historically let you skip the semicolon for most single
statements. That's changing: newer T-SQL syntax, like Common Table
Expressions, actually requires a semicolon before the `WITH` keyword that
starts them, which is part of why semicolons are now broadly recommended
even where they aren't strictly mandatory.

```sql
-- Oracle: semicolon required, especially in scripts
SELECT * FROM orders;
UPDATE orders SET status = 'Shipped' WHERE order_id = 1;

-- MySQL: semicolon required
SELECT * FROM orders;
UPDATE orders SET status = 'Shipped' WHERE order_id = 1;

-- PostgreSQL: semicolon required
SELECT * FROM orders;
UPDATE orders SET status = 'Shipped' WHERE order_id = 1;
```

Oracle, MySQL, and PostgreSQL all effectively require the semicolon to
terminate a statement, especially the moment you have more than one
statement in a script or multi-statement context — without it, the parser
doesn't know where one statement ends and the next begins.

## GO is not SQL — it's an SSMS/sqlcmd batch separator

```sql
-- This is T-SQL tooling syntax, NOT part of the SQL language itself
CREATE TABLE dbo.Example (ID INT);
GO
INSERT INTO dbo.Example VALUES (1);
GO
```

`GO` is a signal understood only by SQL Server client tools — SQL Server
Management Studio and `sqlcmd` — telling the *tool* to send everything
since the last `GO` to the server as one batch. The server itself has no
idea what `GO` means; it's not SQL syntax at all. This is a common point
of confusion for anyone moving to another platform's tooling: there is no
`GO` equivalent expected in Oracle's SQL*Plus, MySQL's client, or
PostgreSQL's `psql` — paste a `GO` into any of them and you'll get a
syntax error, because none of those tools recognize it.

## Side-by-side

| Dialect | Comments | Semicolon required? | Batch separator |
|---|---|---|---|
| SQL Server (T-SQL) | `--` and `/* */` | Not strictly, but increasingly recommended (CTEs require it) | `GO` (tooling-only, not SQL) |
| Oracle | `--` and `/* */` | Effectively yes, especially in scripts | None needed |
| MySQL | `--` and `/* */` | Effectively yes | None needed |
| PostgreSQL | `--` and `/* */` | Effectively yes | None needed |

## Key terms

| Term | Meaning |
|---|---|
| `--` | Single-line comment, identical across all four dialects |
| `/* */` | Block comment, identical across all four dialects |
| Statement terminator | The semicolon marking the end of a SQL statement |
| `GO` | SSMS/sqlcmd-specific batch separator — not part of the SQL language |

## Lab

Take a two-statement script (`CREATE TABLE` followed by `INSERT`) and
write it correctly for: SQL Server with `GO` between batches, and Oracle,
MySQL, and PostgreSQL using semicolons only, with no `GO` at all.

## Check yourself

You're ready for the final lesson when you can explain, without looking,
why pasting `GO` into Oracle's SQL*Plus or PostgreSQL's `psql` produces a
syntax error.
