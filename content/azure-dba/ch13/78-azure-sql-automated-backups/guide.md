# Lesson 78 — Azure SQL Automated Backups

**Chapter 13 · Backup & Restore · Lesson 78 of 95**

## What you'll learn

- What Azure SQL Database backs up automatically, on what schedule, and why you never write a `BACKUP` statement for it
- The honest truth: this removes a task on-prem DBAs are used to owning directly
- Where the backups are stored, and how that relates to redundancy options you already configured for the database itself
- What you still control, even though you don't control the backup schedule itself

## There is no BACKUP DATABASE statement here

For Azure SQL Database (the PaaS tier — not a VM running SQL Server),
Microsoft takes full, differential, and transaction log backups on its own
schedule, automatically, for every database, with no action from you:

| Backup type | Frequency | Who triggers it |
|---|---|---|
| Full | Roughly weekly | Azure, automatically |
| Differential | Roughly every 12-24 hours | Azure, automatically |
| Transaction log | Every 5-10 minutes | Azure, automatically |

There is no `BACKUP DATABASE` statement to run, no job to schedule, no
backup file to manage, and no disk space to monitor for backup storage —
because you never had a disk to manage in the first place. This is a real,
honest gap for someone coming from on-prem DBA work: the entire skill set
in Lesson 77 (writing and scheduling backup T-SQL) simply does not apply
here. It's not that Azure does it a different way you configure — it's
that there's nothing for you to configure.

## Why this is worth stating plainly

It would be easy to gloss past this with vague language like "Azure
handles backups seamlessly," but that undersells what's actually happening
to your job. A significant, recurring on-prem DBA responsibility —
verifying backup jobs succeeded last night, investigating why one failed,
managing backup storage capacity — is removed entirely for Azure SQL
Database. That's a genuine trade-off, not just a convenience: you gain
reliability and lose direct control and visibility into the mechanism
itself. Azure SQL Managed Instance and SQL Server on an Azure VM sit at
different points on this spectrum, which is exactly why Chapter 3's
platform choice (Database vs. Managed Instance vs. VM) has real backup
consequences, not just performance or cost ones.

## Where backups are stored, and what you still control

Automated backups are stored in Microsoft-managed Azure Storage,
automatically using the same storage redundancy option you selected for
the database — locally redundant (LRS), zone-redundant (ZRS), or
geo-redundant (GRS). You don't pick a separate backup destination; it
inherits the database's own redundancy setting, which is one more reason
that setting matters beyond "keeping the database itself available."

What you *do* still control:

- **Retention window** for these short-term automated backups (the subject
  of Lesson 79's point-in-time restore)
- **An optional long-term retention (LTR) policy** layered on top, for
  compliance needs well beyond the default window (Lesson 80)
- **Which redundancy tier** the database — and therefore its backups —
  uses

## Key terms

| Term | Meaning |
|---|---|
| Automated backups | Full/differential/log backups Azure SQL Database takes on its own schedule, with no `BACKUP` statement required |
| PaaS backup model | Microsoft owns the mechanism and schedule; the DBA owns retention and redundancy settings only |
| Storage redundancy | LRS/ZRS/GRS setting the database uses — automated backups inherit the same setting |

## Check yourself

You're ready for Lesson 79 when you can explain, without looking: what
does a DBA lose direct visibility into when using Azure SQL Database's
automated backups, and what do they still control instead?
