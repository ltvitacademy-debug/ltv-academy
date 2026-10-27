# Lesson 4 — Taking a Full Backup

**Chapter 1 · Beginner Capstone: The First Backup Plan · Lesson 4 of 10**

## What you'll learn

- The honest answer: on Azure SQL Database, you don't run `BACKUP DATABASE` yourself
- What actually happened the moment Lesson 3's database finished deploying
- How to confirm a full backup already exists, using the Portal and the Azure CLI
- Why this isn't a gap in the capstone — it's the real, accurate behavior of this platform

## Don't go looking for a BACKUP DATABASE statement here

If you've seen on-prem SQL Server backup syntax before, you might expect
this lesson to open with `BACKUP DATABASE db-overlook-core TO DISK = ...`.
It won't — and that's not an oversight. Overlook's database is an **Azure
SQL Database** (PaaS), and on that tier, Microsoft takes full backups
automatically. There is no disk for you to target, no job to schedule, and
no `BACKUP` statement that applies. `BACKUP DATABASE` and `RESTORE DATABASE`
are real, working T-SQL commands — but only for SQL Server you manage
directly, on-prem or on an Azure VM. Running one against `db-overlook-core`
isn't a syntax question; it's a request the platform doesn't accept, by
design.

This matters enough to say plainly rather than gloss over: a real, recurring
DBA responsibility on-prem — scheduling and verifying full backup jobs — is
simply not something you do here. That's a genuine trade-off from Lesson
3's platform choice, not a missing step in this lesson.

## What already happened automatically

The moment `db-overlook-core` finished provisioning in Lesson 3, Azure
began its own backup schedule for it — no action from you required:

| Backup type | Frequency | Who triggers it |
|---|---|---|
| Full | Roughly weekly | Azure, automatically |
| Differential | Roughly every 12-24 hours | Azure, automatically |
| Transaction log | Every 5-10 minutes | Azure, automatically |

A full backup already exists for Overlook's database right now. The job in
this lesson isn't to *create* one — it's to confirm that one is actually
there, which is the first real step toward the "tested, not assumed"
standard Lesson 1 set.

## Confirming it, from the Portal

The database's **Overview** page shows an **Earliest restore point**
value — the oldest point in time you could currently restore to, given the
automated backup chain Azure has been building since deployment. A value
here (even if it's only a few minutes old, right after deployment) is
direct proof a full backup exists and the chain has started.

## Confirming it, from the Azure CLI

```
az sql db show \
  --name db-overlook-core \
  --resource-group rg-overlook-dba-capstone \
  --server sql-overlook-capstone \
  --query earliestRestoreDate
```

`earliestRestoreDate` is a real property on the database resource — the
same value the Portal's restore dialog shows, available as plain
machine-readable output. Running this and getting back a timestamp (not
`null`) is your confirmation: Overlook's first full backup exists, and the
automated chain is live.

## What you still control at the full-backup level

Even though you don't trigger the backup itself, you're not entirely hands
off:

- **Storage redundancy** (LRS/ZRS/GRS), set on the database, which the
  automated backups inherit — this was decided implicitly by the
  `--edition GeneralPurpose` deployment in Lesson 3 and can be changed.
- **Short-term retention window**, covered next in how it interacts with
  Lesson 7's point-in-time restore.
- **Whether to layer a long-term retention (LTR) policy** on top of
  specific full backups, for retention well beyond the short-term window —
  a real option, out of scope for this beginner project but worth knowing
  exists.

## Key terms

| Term | Meaning |
|---|---|
| Automated backup (Azure SQL Database) | A full/differential/log backup Azure takes on its own schedule, with no `BACKUP` statement from the DBA |
| `earliestRestoreDate` | A database property showing the oldest point currently restorable, given the backup chain so far |
| PaaS backup model | Microsoft owns the mechanism and schedule; the DBA owns retention and redundancy settings |

## Lab

Run the `az sql db show` command above against your own Lesson 3 database
and confirm `earliestRestoreDate` returns a real timestamp, not `null`.
Also check the Portal's Overview page for the same value, and confirm the
two agree.

## Check yourself

You're ready for Lesson 5 when you can explain, without looking: why
doesn't `BACKUP DATABASE` apply to Azure SQL Database, and what single
property proves a full backup already exists without you ever running a
backup command?
