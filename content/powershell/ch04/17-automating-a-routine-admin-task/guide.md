# Lesson 17 — Automating a Routine Admin Task

**Chapter 4 · PowerShell for Azure & SQL · Lesson 17 of 18**

## What you'll learn

- A real, complete script: checking backup age across a list of servers
- How it ties together loops, a function, and dbatools — everything from this chapter and Chapter 3
- Reading the script's structure before its details, the skill Lesson 18 builds on directly

## The real task

Every DBA has this job in some form: make sure every database on
every server actually has a recent backup. Missing it isn't
hypothetical — it's the difference between a bad day and a
resume-updating day. Here's a genuine, complete script for it:

```powershell
function Test-BackupAge {
    param(
        [string]$SqlInstance,
        [int]$MaxHoursOld = 24
    )

    $query = "
        SELECT d.name AS DatabaseName,
               MAX(b.backup_finish_date) AS LastBackup
        FROM sys.databases d
        LEFT JOIN msdb.dbo.backupset b
               ON d.name = b.database_name
        WHERE d.database_id > 4
        GROUP BY d.name
    "

    $results = Invoke-DbaQuery -SqlInstance $SqlInstance -Query $query

    foreach ($row in $results) {
        if ($null -eq $row.LastBackup) {
            Write-Host "$SqlInstance / $($row.DatabaseName): NEVER BACKED UP" -ForegroundColor Red
            continue
        }

        $hoursOld = ((Get-Date) - $row.LastBackup).TotalHours

        if ($hoursOld -gt $MaxHoursOld) {
            Write-Host "$SqlInstance / $($row.DatabaseName): OVERDUE ($([math]::Round($hoursOld,1))h old)" -ForegroundColor Yellow
        } else {
            Write-Host "$SqlInstance / $($row.DatabaseName): OK ($([math]::Round($hoursOld,1))h old)" -ForegroundColor Green
        }
    }
}

$servers = "SQL-PROD-01", "SQL-PROD-02", "SQL-PROD-03"

foreach ($server in $servers) {
    Test-BackupAge -SqlInstance $server -MaxHoursOld 24
}
```

```
SQL-PROD-01 / SalesDB: OK (6.2h old)
SQL-PROD-01 / InventoryDB: OVERDUE (31.4h old)
SQL-PROD-02 / OrdersDB: OK (2.1h old)
SQL-PROD-03 / ArchiveDB: NEVER BACKED UP
```

## What's actually in it

Every piece is something you already know:

- **A function** (Lesson 13) — `Test-BackupAge`, `Verb-Noun` named,
  with typed parameters and a sensible default (`$MaxHoursOld = 24`)
- **dbatools** (Lesson 16) — `Invoke-DbaQuery` runs the T-SQL that
  finds each database's most recent backup, straight from
  `msdb.dbo.backupset`
- **A `foreach` loop, twice** (Lesson 12) — once inside the function,
  over the query results for a single server; once outside it,
  over the whole server list, calling the function for each one
- **`if`/`elseif`-shaped branching** (Lesson 11) — three real
  outcomes per database: never backed up, overdue, or fine

None of that is new. What's new is seeing it **combined** — this is
what "reading a script" actually looks like once you're past
toy examples: recognizing the pieces, not re-learning syntax.

## Why this is a realistic example, not a toy

This script does something a DBA would actually run — probably as a
scheduled task, every morning, emailing or logging anything overdue.
It's also intentionally incomplete in a realistic way: it doesn't
yet send an alert anywhere, and a real version might write results
to a log file instead of just the console. That's exactly the shape
of "existing script" Lesson 18 picks up next — reading one like
this, understanding it, and safely extending it.

## Key terms

| Term | Meaning |
|---|---|
| `msdb.dbo.backupset` | The system table SQL Server uses to record backup history |
| `continue` | Skips the rest of the current loop iteration and moves to the next |
| Realistic vs. toy example | A script doing genuine DBA work, not just demonstrating syntax |

## Check yourself

You're ready for Lesson 18 when you can explain, without looking:
in `Test-BackupAge`, what's the difference between the inner
`foreach` and the outer `foreach`, and what would happen if
`$MaxHoursOld` were never passed in at all?
