# Lesson 15 — Case Sensitivity: Object Names Across Platforms

**Chapter 3 · Querying Basics Compared · Lesson 4 of 8**

## What you'll learn

- SQL Server and MySQL's typically case-insensitive unquoted identifiers
- MySQL's genuinely messy filesystem-dependent exception
- Oracle's automatic uppercase folding and PostgreSQL's automatic lowercase folding
- Why mixing quoted and unquoted references causes "table not found" confusion

## SQL Server: usually case-insensitive, but it's the collation's call

```sql
-- These all typically refer to the SAME object on SQL Server
SELECT * FROM Production.Product;
SELECT * FROM production.product;
SELECT * FROM PRODUCTION.PRODUCT;
```

Unquoted identifiers on SQL Server are case-insensitive by default,
because the default collation (`SQL_Latin1_General_CP1_CI_AS` and similar)
is itself case-insensitive (`CI`). It's technically a collation setting,
not a hard language rule — a database created with a case-sensitive
collation would behave differently — but in the overwhelming majority of
real installations, unquoted names are case-insensitive.

## MySQL: usually case-insensitive, with a genuinely messy exception

```sql
-- Typically works the same regardless of case, on most MySQL installs
SELECT * FROM Employees;
SELECT * FROM employees;
```

Column and table *data* comparisons in MySQL generally follow the
collation, similar to SQL Server. But **table and database name**
case-sensitivity on MySQL is a real, documented wrinkle: it depends on the
underlying operating system's filesystem, because MySQL (with the default
storage engine behavior) maps tables to files on disk. On Windows, where
filenames are case-insensitive, table names behave as case-insensitive. On
Linux, where the filesystem is case-sensitive, table names can be
case-sensitive too — the exact same CREATE TABLE statement can behave
differently depending on the server's OS. This is a genuinely messy detail
worth knowing before you assume MySQL behaves identically everywhere.

## Oracle: unquoted identifiers fold to UPPERCASE

```sql
-- These are IDENTICAL on Oracle — both fold to EMPLOYEES
SELECT * FROM employees;
SELECT * FROM EMPLOYEES;

-- But once quoted, case matters exactly as typed
SELECT * FROM "employees";  -- looks for a table literally named employees (lowercase)
-- This FAILS if the table was created unquoted, because it's really stored as EMPLOYEES
```

## PostgreSQL: unquoted identifiers fold to lowercase

```sql
-- These are IDENTICAL on PostgreSQL — both fold to employees
SELECT * FROM Employees;
SELECT * FROM EMPLOYEES;

-- Once quoted, case matters exactly as typed
SELECT * FROM "Employees";  -- looks for a table literally named Employees (capital E)
-- This FAILS if the table was created unquoted, because it's really stored as employees
```

## The classic confusion: mixing quoted and unquoted

```sql
-- Create the table unquoted — Oracle stores it as EMPLOYEES
CREATE TABLE employees (id NUMBER);

-- This fails with "table or view does not exist"
SELECT * FROM "Employees";
-- Because the quoted literal "Employees" doesn't match the stored EMPLOYEES
```

Mixing a quoted reference with a table that was created unquoted (or vice
versa) is one of the most common sources of "table not found" confusion
when moving from SQL Server to Oracle or PostgreSQL.

## Side-by-side

| Dialect | Unquoted identifier behavior | Quoted identifier behavior |
|---|---|---|
| SQL Server | Case-insensitive (collation-dependent) | Case-insensitive too, same collation rule |
| MySQL | Usually case-insensitive; table/db names can depend on the OS filesystem | Follows the same rules as unquoted |
| Oracle | Folded to UPPERCASE automatically | Case-sensitive, exactly as typed |
| PostgreSQL | Folded to lowercase automatically | Case-sensitive, exactly as typed |

## Key terms

| Term | Meaning |
|---|---|
| Case folding | Automatically converting unquoted identifiers to a fixed case (upper on Oracle, lower on PostgreSQL) |
| Collation | SQL Server/MySQL setting controlling case sensitivity of comparisons |
| Filesystem-dependent names | MySQL's quirk where table name case-sensitivity depends on the server's OS |

## Lab

On Oracle or PostgreSQL, create a table unquoted, then try querying it with
a quoted reference using different letter casing than you typed at
creation. Observe the "does not exist" error, and explain why it happens
in terms of case folding.

## Check yourself

You're ready for the next lesson when you can explain, without looking,
why Oracle and PostgreSQL fold case in opposite directions, and why
quoting an identifier changes the rules entirely.
