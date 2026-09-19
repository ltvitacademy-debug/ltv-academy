# Lesson 73 — Migrating SQL Server to Azure SQL Database

**Chapter 12 · Database Migration to Azure · Lesson 73 of 95**

## What you'll learn

- The compatibility considerations specific to Azure SQL Database as a target
- Why native T-SQL `BACKUP`/`RESTORE` isn't the migration path here
- The real path: BACPAC export/import (and Database Migration Service for larger, online moves)

## Compatibility considerations, specific to this target

Azure SQL Database is a single database, not an instance — and that
shapes exactly what doesn't come with it:

- **No cross-database queries or three-part names across servers.**
  `SELECT * FROM OtherDB.dbo.Table` has no equivalent; each Azure SQL
  Database is its own isolated boundary.
- **No SQL Server Agent** as a full on-server scheduler — Lesson 68's
  Elastic Jobs is the real replacement, not a workaround.
- **No linked servers.** External data access needs a different
  approach entirely (Elastic Query or application-side integration), not
  a linked server definition carried over from on-prem.

These are exactly the feature parity gaps Lesson 71 introduced — the
database migrates and runs, but these specific capabilities don't travel
with it. If assessment turned up a hard dependency on any of these,
Azure SQL Database may be the wrong target; Managed Instance
(Lesson 74) exists partly because of gaps like these.

## The real migration path: it isn't native backup/restore

Here's a fact that trips up DBAs coming straight from on-prem: Azure SQL
Database does **not** support the T-SQL `RESTORE DATABASE ... FROM URL`
statement — that's a Managed Instance and SQL Server on Azure VM
capability (Lesson 74), not a singleton database one. Migrating into
Azure SQL Database uses a different, schema-and-data path instead:

```
az sql db import \
  --resource-group myrg \
  --server myserver \
  --name mydb \
  --storage-uri "https://mystorage.blob.core.windows.net/backups/SalesDB.bacpac" \
  --storage-key-type StorageAccessKey \
  --storage-key <storage-account-key> \
  --admin-user sqladmin \
  --admin-password <password>
```

This imports a **BACPAC** — a portable package containing schema and
data, exported from the source database — into a new Azure SQL Database.
It's the offline path from Lesson 72: export, upload, import, verify,
then cut traffic over.

For a large database, or when the online path from Lesson 72 is the
right call, **Azure Database Migration Service (DMS)** is the managed
service built for this specifically — it handles continuous sync from
an on-prem source into Azure SQL Database with a short final cutover,
rather than a single offline export/import. The mechanism differs; the
outcome (schema and data landing safely in Azure SQL Database) is the
same job this lesson is about.

## Key terms

| Term | Meaning |
|---|---|
| BACPAC | A portable package of schema and data, exported from a source and imported into Azure SQL Database |
| `az sql db import` | The CLI command that imports a BACPAC into a new Azure SQL Database |
| DMS (Database Migration Service) | Azure's managed service for online, continuously-synced migrations into Azure SQL Database |

## Check yourself

Explain why `RESTORE DATABASE ... FROM URL` is not the migration path
for Azure SQL Database, and name the two real paths this lesson covers
instead, and when each fits.
