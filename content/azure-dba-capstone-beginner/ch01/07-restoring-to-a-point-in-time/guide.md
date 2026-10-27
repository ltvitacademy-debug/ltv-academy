# Lesson 7 — Restoring to a Point in Time

**Chapter 1 · Beginner Capstone: The First Backup Plan · Lesson 7 of 10**

## What you'll learn

- The real Azure SQL Database point-in-time restore mechanism, and how it maps to the on-prem `WITH NORECOVERY` / `WITH RECOVERY` pattern
- How to actually run a restore, using both the Portal and the Azure CLI
- Why a restore always creates a new database, and what that means for Overlook's incident response
- The specific test this lesson performs — closing the gap Lesson 1 opened

## This is the lesson Lesson 1 was about

Every lesson since Lesson 1 has been building toward this moment: Priya's
real question was never "do we have backups," it was "has anyone actually
restored one." This lesson is where that question finally gets a real,
tested answer for Overlook's database.

## How this differs from the on-prem restore pattern

If you've seen on-prem SQL Server restores, you know the chained pattern:
restore the full `WITH NORECOVERY`, restore the differential `WITH
NORECOVERY`, restore each log backup in order `WITH NORECOVERY`, and the
final one `WITH RECOVERY` to bring the database online. That's real,
correct T-SQL — for SQL Server you manage directly.

Azure SQL Database replaces that entire manual sequence with a single
operation. You pick a target database and a timestamp; Azure selects the
right full backup, the right differential, and every log backup needed,
and applies them in the correct order automatically. The `NORECOVERY` /
`RECOVERY` distinction doesn't disappear — Azure is doing exactly that
chained logic internally — it's just no longer something you orchestrate
by hand.

## Restoring from the Portal

From `db-overlook-core`'s **Overview** page, the **Restore** button opens a
dialog:

1. Choose **Point in time**.
2. Pick a timestamp within the retention window (the same window
   `earliestRestoreDate` describes from Lesson 4).
3. Give the restored copy a new name — for this test, something like
   `db-overlook-core-restoretest`.
4. Confirm. Azure provisions a new database and assembles the full +
   differential + log chain automatically, finishing in minutes.

## Restoring from the Azure CLI

```
az sql db restore \
  --name db-overlook-core \
  --dest-name db-overlook-core-restoretest \
  --resource-group rg-overlook-dba-capstone \
  --server sql-overlook-capstone \
  --time "2026-10-26T14:35:00Z"
```

`--time` is the point-in-time target, in UTC. `--dest-name` is the new
database's name — note there's no flag to overwrite the original database
in place, because that's not how this restore works.

## Restoring always creates a new database — and that's deliberate

This is the detail worth sitting with: the restore does not touch
`db-overlook-core`. It produces an entirely separate database alongside
it. That's not a limitation to work around; it's the safer design. In a
real incident, you restore, verify the restored copy actually has what you
expect (query it, check row counts, spot-check recent `Appointments` or
`Billing` entries), and only then decide how to use it — swap application
connection strings to point at it, or copy specific rows back into the
original. You never risk the original database by restoring directly on
top of it.

## Running the actual test

For this capstone, run a real restore against your Lesson 3-4 database:
restore to a timestamp from the last hour, confirm the new database comes
online, and connect to it (SSMS or Azure Data Studio) to confirm it
contains the data you expect. This is the single most important lab in the
whole project — it's the difference between a backup plan and a *tested*
backup plan, which is exactly the gap Lesson 1 identified.

## Key terms

| Term | Meaning |
|---|---|
| Point-in-time restore | Restoring to any moment within the retention window, with Azure assembling the full/differential/log chain automatically |
| `--time` | The CLI flag giving the restore's target timestamp, in UTC |
| `--dest-name` | The name of the new database the restore creates — never the original |
| Restore test | Actually performing and verifying a restore, not just trusting that backups exist |

## Lab

Perform a real point-in-time restore of your Lesson 3 database to a
timestamp within the last hour. Connect to the restored database and
confirm it contains the expected data. Note how long the restore took, in
minutes — you'll need that number for Lesson 9's runbook.

## Check yourself

You're ready for Lesson 8 when you can explain, without looking: why does
Azure's point-in-time restore always create a new database instead of
restoring in place, and what internal chained logic (full, differential,
log) is Azure actually performing when you give it a single timestamp?
