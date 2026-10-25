# Lesson 14 — Quoting Identifiers: Brackets, Double Quotes & Backticks

**Chapter 3 · Querying Basics Compared · Lesson 3 of 8**

## What you'll learn

- SQL Server's `[brackets]` and when standard double quotes also work
- Oracle and PostgreSQL's standard double-quote identifiers
- MySQL's backtick-quoted identifiers
- Why you need quoting at all: reserved words and "ugly" names

## Why quote an identifier at all

Quoting lets you use a column or table name that would otherwise collide
with a reserved word, or that contains spaces or special characters:

```sql
-- Without quoting, "Order" collides with the ORDER keyword on most platforms
SELECT Order FROM Sales;  -- likely a syntax error everywhere
```

## SQL Server: [brackets] (T-SQL-specific)

```sql
-- T-SQL: brackets are the classic, always-available form
SELECT [Order], [Customer Name]
FROM [Sales].[Orders];
```

SQL Server also accepts standard double quotes for identifiers, but only
when the `QUOTED_IDENTIFIER` session setting is ON (it is ON by default in
most client tools, but scripts and some drivers can turn it off):

```sql
-- Also valid on SQL Server, when QUOTED_IDENTIFIER is ON
SELECT "Order", "Customer Name"
FROM Sales.Orders;
```

Brackets have no such dependency, which is why most T-SQL code you'll see
uses them rather than double quotes.

## Oracle and PostgreSQL: standard double quotes

```sql
-- Oracle
SELECT "Order", "Customer Name"
FROM "Sales"."Orders";

-- PostgreSQL — identical syntax
SELECT "Order", "Customer Name"
FROM "Sales"."Orders";
```

Double quotes are the ANSI-standard quoting mechanism, and both Oracle and
PostgreSQL use them. The important wrinkle (covered in full in the next
lesson) is that a quoted identifier also becomes case-sensitive on both
platforms — `"Order"` and `"order"` are different objects once quoted.

## MySQL: backticks by default

```sql
-- MySQL's default quoting character
SELECT `Order`, `Customer Name`
FROM `Sales`.`Orders`;
```

MySQL can be configured to accept standard double quotes instead, via the
`ANSI_QUOTES` SQL mode:

```sql
-- Only works if sql_mode includes ANSI_QUOTES — not the out-of-the-box default
SET sql_mode = 'ANSI_QUOTES';
SELECT "Order", "Customer Name" FROM "Sales"."Orders";
```

But in real-world MySQL code, backticks are what you'll actually see —
`ANSI_QUOTES` is rarely enabled in practice, so treat backticks as the
default to expect.

## Side-by-side

| Dialect | Default quote character | Alternative |
|---|---|---|
| SQL Server | `[brackets]` | `"double quotes"` (if `QUOTED_IDENTIFIER` is ON) |
| Oracle | `"double quotes"` | none |
| PostgreSQL | `"double quotes"` | none |
| MySQL | `` `backticks` `` | `"double quotes"` (only with `ANSI_QUOTES` mode) |

## Key terms

| Term | Meaning |
|---|---|
| `[brackets]` | T-SQL-specific identifier quoting, always available |
| `QUOTED_IDENTIFIER` | SQL Server session setting that enables double-quote identifiers |
| `"double quotes"` | ANSI-standard identifier quoting; default on Oracle and PostgreSQL |
| `` `backticks` `` | MySQL's default identifier quoting character |
| `ANSI_QUOTES` | MySQL SQL mode that makes double quotes work as identifier quotes |

## Lab

Write a query selecting a column literally named `Group` (a reserved
word) from a table named `Orders`, quoted correctly for: SQL Server (using
brackets), Oracle, PostgreSQL, and MySQL. Note which syntax you used for
each.

## Check yourself

You're ready for the next lesson when you can name, without looking, the
default quoting character for all four platforms — and which one of them
can be reconfigured to accept double quotes instead of its default.
