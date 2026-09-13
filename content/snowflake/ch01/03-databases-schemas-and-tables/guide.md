# Lesson 3 — Databases, Schemas & Tables in Snowflake

**Chapter 1 · Snowflake Architecture & Getting Started · Lesson 3 of 60**

## What you'll learn

- Snowflake's three-level object hierarchy: database → schema → table
- How that compares to the SQL Server hierarchy you already know
- How to create a database and pick a schema in Snowsight
- Why every query context includes a database and schema, not just a connection

## The hierarchy: database → schema → table

Snowflake organizes every object into a strict three-level hierarchy:

```
Account
 └─ Database
     └─ Schema
         └─ Table / View / Stage / File Format / ...
```

A **database** is a top-level container — a logical grouping, not a
physical file the way an `.mdf` is in SQL Server. A **schema** is a
namespace inside a database that groups related tables, views, and other
objects together. A **table** lives inside exactly one schema, inside
exactly one database.

![The 'New Database' dialog in Snowsight: a Name field and optional Comment field, with Cancel and Create buttons.](/courses/snowflake/ch01/03-databases-schemas-and-tables/create-new-database.png)
*Creating a database is just naming a container — there's no file path, drive letter, or physical storage setting to configure.*
Source: [Snowflake Quickstarts — Getting Started with Snowflake](https://quickstarts.snowflake.com/guide/getting_started_with_snowflake/index.html)

```sql
CREATE DATABASE sales_db;
CREATE SCHEMA sales_db.raw;
CREATE SCHEMA sales_db.reporting;

CREATE TABLE sales_db.raw.orders (
    order_id     NUMBER,
    order_date   DATE,
    customer_id  NUMBER,
    amount       NUMBER(10,2)
);
```

## Comparing to SQL Server

You already know this shape from SQL Server, just with different names and
one extra level:

| SQL Server | Snowflake | Notes |
|---|---|---|
| Instance | Account | The whole Snowflake account you log into |
| Database | Database | Same idea — a top-level logical container |
| Schema (e.g. `dbo`) | Schema | Same idea — a namespace inside a database |
| Table | Table | Same idea |
| — | Warehouse | No SQL Server equivalent — compute is chosen separately (Lesson 4) |

The database → schema → table shape is identical to what you already do
in SQL Server with `dbo.Orders` or `sales.Orders`. The real difference
isn't the hierarchy — it's that a Snowflake session also has an active
**role** and **warehouse** alongside the database and schema, because
compute is a separate concern (Lesson 2).

## Setting your session context

Every worksheet has a current database and schema, shown in the context
selector, and switchable without reconnecting:

![Snowsight's database/schema picker: searching "publi" shows matching databases like PUBLIC_DATA with a checkmark, and its PUBLIC schema selected in the adjacent panel, with role (ACCOUNTADMIN) and warehouse (XSMALL) shown above.](/courses/snowflake/ch01/03-databases-schemas-and-tables/choose-database-schema.png)
*Database and schema are picked from the worksheet itself — same place you already saw the role and warehouse selectors in Lesson 1.*
Source: [Snowflake Quickstarts — Getting Started with Snowflake](https://quickstarts.snowflake.com/guide/getting_started_with_snowflake/index.html)

You can also set context explicitly in SQL, which is the more common
pattern in scripts and stored procedures:

```sql
USE DATABASE sales_db;
USE SCHEMA reporting;

SELECT CURRENT_DATABASE(), CURRENT_SCHEMA();
```

One quiet difference from SQL Server: unquoted identifiers in Snowflake
are case-**insensitive** and get folded to uppercase internally.
`orders`, `Orders`, and `ORDERS` all refer to the same table unless you
wrap the name in double quotes to force exact casing — worth knowing
before you're debugging a "table not found" error that's really a casing
mismatch.

## Key terms

| Term | Meaning |
|---|---|
| Database | Top-level logical container for schemas — no physical file involved |
| Schema | A namespace inside a database, grouping tables/views/stages together |
| Fully qualified name | `database.schema.object` — the unambiguous way to reference any object |
| `USE DATABASE` / `USE SCHEMA` | Sets the session's current database/schema context |
| Unquoted identifier | Case-insensitive by default, folded to uppercase — unlike quoted `"Identifiers"` |

## Lab

1. Create a new database: `CREATE DATABASE lab_db;`
2. Create two schemas inside it: `raw` and `reporting`.
3. Create one table in `raw` with a few columns of your choice.
4. Run `SELECT CURRENT_DATABASE(), CURRENT_SCHEMA();` after switching
   context with `USE DATABASE` / `USE SCHEMA`, and confirm the output
   matches what you expect.

## Check yourself

You're ready for Lesson 4 when you can write a fully qualified table name
(`database.schema.table`) from memory and explain what's different about
a Snowflake session's context compared to a plain SQL Server connection.
