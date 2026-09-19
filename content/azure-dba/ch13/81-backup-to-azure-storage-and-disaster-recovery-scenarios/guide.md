# Lesson 81 — Backup to Azure Storage & Disaster Recovery Scenarios

**Chapter 13 · Backup & Restore · Lesson 81 of 95**

## What you'll learn

- How on-prem or VM-hosted SQL Server backs up directly to Azure Blob Storage — a genuinely different mechanism from Azure SQL Database's automatic backups
- The real T-SQL for backup-to-URL, and the credential it requires
- What RPO (recovery point objective) means, and how backup frequency is the lever that controls it
- How this chapter's three backup mechanisms map to three different real DR scenarios

## Chapter 13 recap, in one table

Before tying it together, it's worth being explicit that this chapter
covered three genuinely different mechanisms, not one idea with three
names:

| Where the database lives | Backup mechanism | Covered in |
|---|---|---|
| On-prem or Azure VM (IaaS) | Manual `BACKUP DATABASE`/`LOG`, scheduled by the DBA | Lessons 76-77 |
| Azure SQL Database (PaaS) | Fully automatic, no `BACKUP` statement | Lessons 78-80 |
| On-prem or Azure VM, backing up **to Azure** | `BACKUP ... TO URL`, still DBA-scheduled | This lesson |

This lesson's mechanism is a real third option: SQL Server running
on-prem or on a VM, but pointing its backups at Azure Blob Storage instead
of a local disk — getting geo-durable, off-site storage without giving up
control of the backup schedule itself.

## Backup to URL: the real syntax

```sql
-- One-time setup: a SQL Server credential holding the storage account key
-- (or a shared access signature) so BACKUP/RESTORE can authenticate to Azure
CREATE CREDENTIAL [https://ltvbackups.blob.core.windows.net/sql-backups]
WITH IDENTITY = 'SHARED ACCESS SIGNATURE',
SECRET = '<sas-token-here>';

-- Full backup, straight to Azure Blob Storage instead of local disk
BACKUP DATABASE Sales
TO URL = 'https://ltvbackups.blob.core.windows.net/sql-backups/Sales_Full.bak'
WITH COMPRESSION, STATS = 10;

-- Restoring works the same way, just from the URL instead of a disk path
RESTORE DATABASE Sales
FROM URL = 'https://ltvbackups.blob.core.windows.net/sql-backups/Sales_Full.bak'
WITH NORECOVERY;
```

Everything from Lesson 77 still applies — `WITH DIFFERENTIAL` for
incremental backups, `WITH NORECOVERY` mid-chain, the same restore-chain
rules from Lesson 76. The only thing that changed is `TO URL` instead of
`TO DISK`, and the one-time credential that lets SQL Server authenticate
to that storage account.

## RPO: the number backup frequency actually controls

**Recovery point objective (RPO)** is how much data loss, measured in
time, is acceptable if disaster strikes right now. It's not an abstract
metric — it's a direct consequence of how often you back up:

```
Log backups every 15 min  ->  RPO = up to 15 minutes of data loss
Log backups every 1 hour  ->  RPO = up to 1 hour of data loss
Only nightly full backups ->  RPO = up to 24 hours of data loss
```

A DBA doesn't get to declare "our RPO is 5 minutes" without backing it
with an actual backup schedule that supports it. This is also where the
honest trade-off from Lesson 78 resurfaces: Azure SQL Database's
automatic ~5-10 minute log backups give you a tight RPO by default, with
no scheduling effort — while on-prem backup-to-URL gives you full control
over that number, but only if the DBA sets the schedule aggressively
enough to actually hit it.

## Three mechanisms, three real DR scenarios

- **On-prem full/diff/log to local disk** (Lessons 76-77): fastest to
  restore, but the backup itself is only as durable as the building it's
  in — a real DR plan still needs those files copied off-site.
- **Azure SQL Database automatic backups** (Lessons 78-80): already
  geo-durable if you chose geo-redundant storage, with RPO fixed by
  Microsoft's schedule — you can't tighten it, only choose your retention
  and redundancy tier around it.
- **Backup to URL** (this lesson): the deliberate middle ground — on-prem
  or VM-hosted SQL Server, but with off-site, durable storage and a DBA
  who still controls the schedule and therefore the RPO.

Chapter 13 is done. Chapter 14, **High Availability & Disaster Recovery**
— 8 lessons, matching the real exam's 20-25% weight — picks up exactly
where this leaves off: RPO's counterpart, RTO (how *long* the outage can
last), and the availability architectures (Always On, failover groups,
geo-replication) that make both numbers small in practice.

## Key terms

| Term | Meaning |
|---|---|
| `BACKUP ... TO URL` | Backing up on-prem/VM SQL Server directly to Azure Blob Storage |
| `CREATE CREDENTIAL` | The one-time setup step letting SQL Server authenticate to a storage account |
| RPO (recovery point objective) | How much data loss, in time, is acceptable — set directly by backup frequency |

## Check yourself

You're ready for Lesson 82 when you can explain, without looking: how does
backup-to-URL differ from both on-prem-to-disk backups and Azure SQL
Database's automatic backups, and how does backup frequency directly
determine RPO?
