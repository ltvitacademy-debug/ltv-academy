# Lesson 65 — Automating Azure SQL Administration

**Chapter 11 · Azure Automation & Infrastructure as Code · Lesson 65 of 95**

## What you'll learn

- The real reason to automate: routine DBA work doesn't scale past a handful of databases
- Which of your Chapter 9-10 tasks are the first candidates for automation
- A preview of what Chapters 11's five lessons actually cover, in order

## The manual ceiling

Everything in Chapters 9 and 10 works fine by hand — for one database. Run
`DBCC CHECKDB` yourself, rebuild a fragmented index yourself, check that
last night's backup actually succeeded yourself. The problem isn't any
single task; it's that Azure environments rarely stay at one database.
Once you're responsible for ten databases across two servers, or fifty
databases in an elastic pool, the same task performed by hand ten or
fifty times a week is where DBAs lose evenings and weekends — and where
things quietly stop getting checked at all, because there isn't time.

Three tasks hit this ceiling first:

- **Index maintenance** — rebuilding or reorganizing fragmented indexes
  (Lesson 53) on a schedule, across every database, not just the one you
  remembered to check.
- **Integrity checks** — running `DBCC CHECKDB` (Lesson 55) regularly
  enough that corruption is caught in days, not discovered during a
  restore.
- **Backup verification** — confirming a backup didn't just complete, but
  is actually restorable, on every database that matters.

None of these need a person watching a clock. They need something that
runs the same script, on a schedule, against every target, and tells a
human only when something's wrong.

## Why this isn't just "SQL Server Agent again"

Chapter 10 built this same instinct on-prem with SQL Server Agent. The
problem this chapter solves is that Agent's role in Azure is smaller than
it was on-prem — Lesson 59 already showed Agent has real limits in Azure
SQL Database. Azure gives you a different, wider toolbox for automation:
command-line and scripting tools that talk to the Azure control plane
itself, infrastructure defined as reviewable code instead of manual
portal clicks, and a purpose-built job scheduler for databases that don't
have full Agent support. This chapter is that toolbox.

## The arc of Chapters 65-69

1. **Lesson 66** — Azure CLI and PowerShell: the commands a DBA actually
   reaches for to read and change resources, not a scripting deep-dive.
2. **Lesson 67** — ARM templates and Bicep: what infrastructure as code
   buys a DBA, at a conceptual level.
3. **Lesson 68** — Elastic Jobs: the SQL Server Agent equivalent for
   Azure SQL Database, running one T-SQL script across many databases.
4. **Lesson 69** — Tying it together: automation inside a deployment
   pipeline, with alerts and a real troubleshooting angle for when the
   automation itself breaks.

## Key terms

| Term | Meaning |
|---|---|
| Automation ceiling | The point where a manual task, multiplied across enough databases, stops being sustainable by hand |
| Control plane | The Azure management layer (CLI/PowerShell/ARM talk to it) — distinct from the T-SQL layer inside a database |
| Elastic Jobs | Azure SQL Database's job scheduler, covered in Lesson 68 |

## Check yourself

Name the three Chapter 9-10 tasks this lesson calls out as the first
candidates for automation, and explain in one sentence why a single DBA
running them by hand stops working once the database count grows.
