# Lesson 2 — Account, Database and Schema Structure

**Chapter 1 · Snowflake Governance Foundations · Lesson 2 of 25**

## What you'll learn

- Snowflake's object hierarchy: organization → account → database → schema → object
- How to create and navigate databases and schemas, in both Snowsight and SQL
- Why every object lives at a fully qualified `database.schema.object` address
- Why this hierarchy matters specifically for governance, not just for organizing tables

## The hierarchy

Every object in Snowflake is namespaced. At the top sits your **organization**, which can contain multiple **accounts**. Inside an account, every object you create — tables, views, and (starting next chapter) masking policies, row access policies, and tags — lives inside a **database**, and every database is divided into one or more **schemas**. The full chain looks like:

```
Organization → Account → Database → Schema → Object (table, view, policy, tag, ...)
```

You'll work mostly at the database/schema/object layer in this course, so that's where this lesson focuses.

## Browsing databases in Snowsight

**Data → Databases** lists every database in the account:

![Snowsight's Data > Databases explorer, listing databases including SNOWFLAKE and SNOWFLAKE_SAMPLE_DATA with their source, owner, and creation date.](/courses/snowflake-data-governance/ch01/02-account-database-and-schema-structure/databases-explorer.png)
*Databases in this account — the level right below the account itself.*

## Creating a database and schema in SQL

```sql
CREATE DATABASE IF NOT EXISTS governance_demo
  COMMENT = 'Sandbox database for governance labs';

CREATE SCHEMA IF NOT EXISTS governance_demo.sales
  COMMENT = 'Schema for sales governance objects';

USE DATABASE governance_demo;
USE SCHEMA sales;

SELECT CURRENT_DATABASE(), CURRENT_SCHEMA();
```

`USE DATABASE` and `USE SCHEMA` set your session's working context, so unqualified object names resolve against `governance_demo.sales` until you change it. `CURRENT_DATABASE()` and `CURRENT_SCHEMA()` are a quick sanity check on what your session is actually pointed at.

## The same action, via the UI

Snowsight's **New Database** dialog does exactly what `CREATE DATABASE` does — a name, an optional comment, and a **Create** button:

![The New Database creation dialog in Snowsight, showing a Name field pre-filled with "Public_Data", an optional Comment field, and Cancel/Create buttons.](/courses/snowflake-data-governance/ch01/02-account-database-and-schema-structure/create-new-database-dialog.png)
*The New Database dialog — name and an optional comment, same result as the CREATE DATABASE statement.*

## Checking what exists

```sql
SHOW DATABASES;
SHOW SCHEMAS IN DATABASE governance_demo;
SHOW TABLES IN SCHEMA governance_demo.sales;
```

Each `SHOW` statement walks one level of the hierarchy — databases in the account, schemas in a database, tables in a schema. This is the fastest way to confirm what exists without clicking through the UI, and it's a pattern you'll reuse constantly once you start working with grants (Lesson 4) and tags (Chapter 3).

## The hierarchy, live

![Snowsight's object browser drilled into a database and schema, showing a Tables tab with one table listed underneath.](/courses/snowflake-data-governance/ch01/02-account-database-and-schema-structure/database-schema-table-drilldown.png)
*Database → schema → table, drilled all the way down in the object browser — exactly the structure that's about to carry your governance objects too.*

## Why this matters for governance specifically

It's tempting to treat database/schema structure as pure housekeeping — a way to keep tables organized. It's more than that in this course: the governance objects you'll build starting in Chapter 2 (masking policies, row access policies) and Chapter 3 (tags) are **ordinary schema objects**, created with `CREATE MASKING POLICY`, `CREATE ROW ACCESS POLICY`, and `CREATE TAG` statements that live in a schema exactly like a table does.

And because privileges in Snowflake are grantable at every level of this hierarchy — database, schema, or individual object — the structure you choose now directly shapes how precisely you can scope access control later. A privilege granted at the database level cascades differently than one granted on a single table; understanding the hierarchy is a prerequisite for understanding RBAC, which is where Lessons 3 and 4 go next.

## Key terms

| Term | Meaning |
|---|---|
| Account | The top-level Snowflake environment your organization provisions |
| Database | A top-level namespace inside an account, containing one or more schemas |
| Schema | A namespace inside a database, containing tables, views, and (later) governance objects |
| Namespace | The qualified path (`database.schema.object`) that uniquely identifies an object |
| Object hierarchy | The nested structure: organization → account → database → schema → object |

## Lab

1. In Snowsight or a worksheet, run the `CREATE DATABASE` / `CREATE SCHEMA` block above (adjust names if `governance_demo` already exists in your account).
2. Run all three `SHOW` statements and confirm your new database, schema, and any tables you create show up.
3. In the Snowsight UI, navigate to **Data → Databases**, find `governance_demo`, and drill into the `sales` schema to confirm it matches what `SHOW SCHEMAS` reported.

## Check yourself

- What is the full chain of Snowflake's object hierarchy, from organization down to an individual table?
- Why do masking policies, row access policies, and tags — governance objects, not business data — still need to live inside a schema?
- At which levels of the hierarchy can privileges be granted, and why does that matter for access control?
