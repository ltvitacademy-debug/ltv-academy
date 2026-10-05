# Lesson 3 — Catalogs and Schemas

**Chapter 1 · Unity Catalog Foundations · Lesson 3 of 25**

## What you'll learn

- What a catalog is and common ways teams organize them (by environment, by business unit)
- What a schema is, and why it's the same concept Databricks used to call a "database"
- How to drill from catalog to schema to table in Catalog Explorer
- The real SQL for creating and navigating catalogs and schemas

## Catalogs: the first level

A **catalog** is the top level of the three-level namespace, sitting directly below the metastore. Most organizations organize catalogs by **environment** (`dev`, `staging`, `prod`) or by **business unit** (`finance`, `marketing`, `sales`) — whichever boundary matches how they actually want to separate access and billing. Every Unity Catalog-enabled workspace also gets an auto-created **workspace catalog**, sharing the workspace's own name, that all of that workspace's users can access by default.

## Schemas: the second level

A **schema** sits inside a catalog and groups related objects — tables, views, volumes, and functions. If you've used SQL Server or PostgreSQL, a Unity Catalog schema is the same concept as a database in those systems; Databricks itself used to call this level "database" before Unity Catalog's current `catalog.schema.table` terminology. Every catalog gets a `default` schema automatically when it's created.

## Drilling down in Catalog Explorer

The whole point of the three-level namespace is that you can expand it, level by level, in the UI. Click a catalog to expand it to its schemas; click a schema to expand it to its tables.

![Catalog Explorer showing an expanded tree: catalog "my_workspace" expanded to schema "default," expanded to "Tables," with the table "department" selected and highlighted.](/courses/databricks-unity-catalog-governance/ch01/03-catalogs-and-schemas/table-search-explorer.png)
*Catalog Explorer's tree, fully expanded: catalog → schema → Tables → table — the three-level namespace, drilled all the way down.*

Zoomed out, the catalog level is one node directly below the metastore in Unity Catalog's object model:

![Databricks' own object-model diagram with the Catalog node highlighted: Metastore at the top, branching to Storage credential, External location, Catalog, Share, Recipient, and others; Catalog branches down to Schema, which branches to Table, View, Volume, and Function.](/courses/databricks-unity-catalog-governance/ch01/03-catalogs-and-schemas/object-model-catalog.png)
*The catalog level highlighted in Databricks' object model — directly below the metastore, directly above schemas.*

And the schema level, one node further down:

![The same Databricks object-model diagram with the Schema node highlighted instead, showing Schema sitting below Catalog and branching down to Table, View, Volume, and Function (including models).](/courses/databricks-unity-catalog-governance/ch01/03-catalogs-and-schemas/object-model-schema.png)
*The schema level highlighted — every table, view, volume, and function in this course lives inside one of these.*

## Creating and navigating them in SQL

```sql
CREATE CATALOG IF NOT EXISTS finance;

CREATE SCHEMA IF NOT EXISTS finance.accounts_payable;

USE CATALOG finance;
USE SCHEMA accounts_payable;

SHOW SCHEMAS IN finance;
SHOW TABLES IN finance.accounts_payable;
```

`USE CATALOG` and `USE SCHEMA` set the session's default so you can reference `accounts_payable.invoices` without typing the catalog name every time — but the table's real, fully-qualified name is always `finance.accounts_payable.invoices`.

## Key terms

| Term | Meaning |
|---|---|
| Catalog | The top level of the namespace, typically organized by environment or business unit |
| Workspace catalog | The catalog auto-created with a workspace, sharing its name, accessible to that workspace's users by default |
| Schema | The second level, grouping tables/views/volumes/functions — the same concept as a "database" in older terminology |
| `default` schema | The schema auto-created inside every new catalog |

## Lab

Write the `CREATE CATALOG` and `CREATE SCHEMA` statements for a catalog named `marketing` with a schema named `campaigns` inside it. Then write the `USE CATALOG` / `USE SCHEMA` statements that would make `campaigns.leads` resolvable as just `leads`.

## Check yourself

- What is the auto-created catalog every Unity Catalog workspace gets, and who can access it by default?
- What older Databricks term is a Unity Catalog "schema" equivalent to?
- Write the fully-qualified three-level name for a table called `invoices` in the `accounts_payable` schema of the `finance` catalog.
