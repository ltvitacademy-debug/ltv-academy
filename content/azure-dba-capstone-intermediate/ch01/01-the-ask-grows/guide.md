# Lesson 1 — The Ask Grows: Two Departments, One Slow System

**Chapter 1 · Intermediate Capstone: Two Departments, One Performance Problem · Lesson 1 of 16**

## What you'll learn

- The scenario for this project: Overlook Medical Group's shared Azure SQL Database
- Why two separate-sounding complaints can share one root system
- What's different about a performance project versus the Beginner project's backup/restore work
- The real tables this chapter uses, and what each department does with them

## Picking up where the Beginner project left off

In the Beginner project, you built Overlook Medical Group's backup and
restore plan — full, differential, and log backups, a tested
point-in-time restore, and a documented recovery plan. That plan
already exists and isn't revisited here. This project assumes backups
are handled and asks a completely different question: the database is
up, backups are fine, and people are complaining it's **slow**.

## Two complaints arrive the same week

Overlook Medical Group runs one Azure SQL Database,
`OverlookClinicalDB`, shared by two departments:

- The **Billing** team emails: "Invoice lookups have been crawling
  all week, every morning. Patients are on hold while we wait for a
  single invoice to load."
- The **Scheduling** team emails, separately, the same week: "The
  appointment calendar freezes for whole minutes around mid-morning.
  We can't book new patients fast enough."

Neither email mentions the other department. Each one assumes the
problem is specific to "their" screen, their report, their part of
the system.

## The real tables behind both complaints

```sql
dbo.Invoices        -- one row per billing invoice (Billing's table)
dbo.Appointments     -- one row per scheduled visit (Scheduling's table)
dbo.Patients         -- shared reference table, both departments join to it
dbo.Providers        -- shared reference table, both departments join to it
```

Two different-looking problems, but both departments' queries run
against the same `OverlookClinicalDB`, at the same time of day, and
both join back to the same shared `Patients` and `Providers` tables.
That overlap — same database, same peak window, shared tables — is
exactly why this chapter treats "two complaints" as "one
investigation" rather than two unrelated support tickets.

## Why mid-morning, specifically

Both emails mention roughly the same window: mid-morning, when the
clinic is busiest. Patients are checking in, providers are running
behind, Billing is posting the morning's charges, and Scheduling is
juggling same-day reschedules — all at once, against the same
database. A symptom that clusters around one specific time window is
itself a clue worth holding onto before you've opened a single DMV.

## What this chapter is, and isn't

This is a performance-tuning project, not a backup project and not a
security project. You'll use dynamic management views (DMVs) to see
what's actually running, read execution plans, fix a missing index,
untangle a blocking chain, automate maintenance so the fixes don't
quietly undo themselves, and — later in the chapter — diagnose a
second, unrelated slowdown that shows up after everything else is
already fixed. Every tool here is real SQL Server/Azure SQL
diagnostic machinery, not a simplified toy version of it.

## Key terms

| Term | Meaning |
|---|---|
| `OverlookClinicalDB` | The one shared Azure SQL Database both Billing and Scheduling query |
| Shared root cause | Two separate-sounding complaints that trace back to the same underlying system |
| Peak window | The recurring time of day (here, mid-morning) when a performance problem is worst |

## Check yourself

You're ready for Lesson 2 when you can explain, without looking: what
three things do the Billing and Scheduling complaints have in common
that make this one investigation instead of two, and why does the
shared mid-morning timing matter before you've even looked at a DMV?
