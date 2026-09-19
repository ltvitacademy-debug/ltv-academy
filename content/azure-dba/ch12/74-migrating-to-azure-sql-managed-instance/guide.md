# Lesson 74 — Migrating to Azure SQL Managed Instance

**Chapter 12 · Database Migration to Azure · Lesson 74 of 95**

## What you'll learn

- Why Managed Instance has much higher feature parity with on-prem SQL Server than Azure SQL Database (tying back to Lesson 3)
- The real migration path here: native backup/restore, straight from on-prem
- The real gotchas — migration time and network requirements — that still apply

## Much closer to on-prem, by design

Lesson 3 already set up the comparison: Managed Instance sits between
Azure SQL Database and a full SQL Server VM, trading a little PaaS
convenience for near-complete SQL Server surface area. Migrating into it
proves that out directly — the parity gaps from Lesson 73 mostly
disappear here:

- **Cross-database queries work.** Managed Instance hosts multiple
  databases under one instance, the same as on-prem.
- **SQL Server Agent is native**, not Elastic Jobs — jobs, schedules, and
  alerts (Chapter 10) migrate across largely unchanged.
- **Linked servers, CLR, and Service Broker are supported.** Exactly the
  dependencies that would have blocked or complicated a move to Azure
  SQL Database migrate here without a redesign.

## The real migration path: native restore, from a backup you already have

This is the one capability Azure SQL Database cannot do at all: Managed
Instance supports the native T-SQL restore-from-URL workflow, taking an
on-prem backup straight into Azure.

```sql
-- On-prem: back the database up to a storage account
BACKUP DATABASE [SalesDB]
TO URL = 'https://mystorageaccount.blob.core.windows.net/backups/SalesDB.bak'
WITH CREDENTIAL = 'MyAzureCredential';

-- On Managed Instance: restore straight from that same URL
RESTORE DATABASE [SalesDB]
FROM URL = 'https://mystorageaccount.blob.core.windows.net/backups/SalesDB.bak'
WITH CREDENTIAL = 'MyAzureCredential';
```

Same `BACKUP`/`RESTORE` syntax from Chapter 13 (coming up), just pointed
at a blob storage URL instead of a local disk path. This is the direct
payoff of Managed Instance's higher parity: the migration itself uses
skills you already have, not a new export format.

## Real gotchas that still apply

Higher parity doesn't mean zero friction:

- **Migration time.** Restoring a large backup from blob storage can
  take hours, not minutes — plan the cutover window around the actual
  restore time, tested in advance, not an assumption.
- **Network requirements.** Managed Instance deploys inside a VNet by
  design (Lesson 27); reaching it, and reaching the storage account
  holding the backup, both need the right network path configured before
  the restore is attempted, not discovered mid-migration.
- **Instance sizing before cutover.** The instance needs to be sized for
  production load *before* traffic switches over, using the sizing pass
  from Lesson 71 — not resized reactively after go-live.

## Key terms

| Term | Meaning |
|---|---|
| Feature parity | How closely a target matches on-prem SQL Server's capabilities — Managed Instance is close, Azure SQL Database is not |
| `RESTORE ... FROM URL` | The native T-SQL restore workflow Managed Instance supports directly from blob storage |
| Instance pool | Managed Instance's grouping construct — must be sized correctly before cutover |

## Check yourself

Name the three feature-parity items this lesson says migrate to Managed
Instance largely unchanged, and the one T-SQL capability that makes this
target's migration path fundamentally different from Azure SQL
Database's.
