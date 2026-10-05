# Lesson 23 — Migrating to Unity Catalog

**Chapter 5 · Lakehouse Governance · Lesson 23 of 25**

## What you'll learn

- The four real migration paths from a legacy Hive metastore to Unity Catalog, and when each applies
- The `SYNC` command's exact syntax, including `DRY RUN` for a safe preview
- How Databricks flags old `hive_metastore` references as deprecated once a table has moved
- How UCX automates migration across an entire workspace rather than table by table

## Four paths, not one

Every course chapter so far assumed tables already live in Unity Catalog. Most real organizations don't start there — they have years of tables registered in the legacy, per-workspace **Hive metastore** (referenced as `hive_metastore.schema.table`). Databricks documents four ways to move a table or schema into Unity Catalog, and picking the right one matters:

- **Upgrade wizard + `SYNC`** — the standard path for external tables in formats Unity Catalog supports; non-destructive, re-runnable
- **`CLONE`** — for managed Hive tables, physically copies data into a Unity Catalog managed table
- **`CREATE TABLE ... AS SELECT` (CTAS)** — a manual rewrite, useful when you also want to reshape the table during the move
- **UCX** — a Databricks Labs toolkit that automates assessment and migration across an entire workspace, not one table at a time

## Selecting what to migrate, in Catalog Explorer

The upgrade wizard starts from Catalog Explorer: pick `hive_metastore` as the catalog, then the schema (database) you want to upgrade.

![Databricks Catalog Explorer's Data panel, breadcrumb "hive_metastore > default", with a "Select Database..." search dropdown open showing database100 and database101.](/courses/databricks-unity-catalog-governance/ch05/23-migrating-to-unity-catalog/data-explorer-select-database.png)
*Picking the Hive schema to upgrade — the wizard then lets you select individual tables within it and set their Unity Catalog destination.*

## The `SYNC` command

The upgrade wizard runs `SYNC` behind the scenes, but it's also a plain SQL command you can run directly — and it supports `DRY RUN` to preview what would happen without changing anything:

```sql
-- Preview first, change nothing
SYNC TABLE main.default.my_tbl FROM hive_metastore.default.my_tbl DRY RUN;

-- Sync one table as a Unity Catalog external table
SYNC TABLE main.default.my_tbl FROM hive_metastore.default.my_tbl;

-- Sync an entire schema, assigning an owner
SYNC SCHEMA main.my_db_uc FROM hive_metastore.my_db
  SET OWNER `data-platform-team@example.com`;
```

`SYNC` leaves the original Hive table untouched and can be re-run on a schedule to pick up new tables added to the source schema — it's a non-destructive, repeatable bridge rather than a one-shot cutover.

## Old references get flagged automatically

Once a table has an upgraded Unity Catalog equivalent, Databricks notebooks actively warn you about code still pointing at the old `hive_metastore` path:

![A Databricks SQL notebook cell querying hive_metastore.flights.flights, with the table name struck through and a tooltip reading "Object has been tagged as deprecated. Please use compose.default.flights instead of hive_metastore.flights.flights," with View Problem and Quick Fix options.](/courses/databricks-unity-catalog-governance/ch05/23-migrating-to-unity-catalog/hive-migration-table-comment.png)
*A strikethrough plus an inline Quick Fix — Databricks catches stale references at the point someone is about to run them, not after.*

That deprecation warning comes from the comment the upgrade process attaches to the old Hive table, and **Quick Fix** can rewrite the query to the new Unity Catalog path automatically — turning a migration that would otherwise require hunting through every notebook into something closer to a compiler warning.

## Migrating at scale with UCX

A single `SYNC` statement works for one table; a workspace with thousands of Hive tables needs automation. **UCX** is a Databricks Labs open-source toolkit purpose-built for exactly that, coordinating assessment, group migration, table mapping, and table migration as a sequenced set of jobs across account-admin, workspace-admin, and IAM-admin roles.

![A UCX migration flow diagram grouped into three swimlanes — account-admin, workspace-admin, and iam-admin — showing workflow steps like assessment, group-migration, create-table-mapping, table-migration, and code-migration connected by arrows.](/courses/databricks-unity-catalog-governance/ch05/23-migrating-to-unity-catalog/ucx-migration-flow.png)
*UCX's own migration-flow diagram — assessment runs first, then group and table migration, with code-migration and revert-migrated-tables as later, optional steps.*

## Key terms

| Term | Meaning |
|---|---|
| `hive_metastore` | The legacy, per-workspace metastore that predates Unity Catalog |
| `SYNC` | The SQL command that copies a Hive table/schema's definition into Unity Catalog as an external table, non-destructively |
| `DRY RUN` | A `SYNC` option that reports what would happen without making any change |
| UCX | A Databricks Labs toolkit automating Hive-to-Unity-Catalog migration across an entire workspace |

## Lab

Write the `SYNC` statement that would preview (via `DRY RUN`) upgrading an entire schema named `legacy` under `hive_metastore` into a Unity Catalog catalog named `main`, assigning ownership to `migration-team@example.com`. Then write the statement with `DRY RUN` removed, ready to actually run.

## Check yourself

Without looking back, can you name all four migration paths from Hive metastore to Unity Catalog, explain what `DRY RUN` does and why you'd use it before a real `SYNC`, and describe what happens in a notebook when someone queries a table that's already been migrated?
