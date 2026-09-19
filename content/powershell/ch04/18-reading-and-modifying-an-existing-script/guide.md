# Lesson 18 — Reading & Modifying an Existing Script

**Chapter 4 · PowerShell for Azure & SQL · Lesson 18 of 18 — Course Finale**

## What you'll learn

- How to read an existing, moderately complex script line by line before touching anything
- Making one safe, real modification to it — without breaking what already works
- What this course completes — and, verified, what it completes beyond itself
- That this is the last lesson: there's no Lesson 19

## The actual last skill: reading before changing

Every lesson before this one built something. This one is different
on purpose — the real, everyday DBA task isn't usually writing a
script from a blank file, it's opening one someone else (or you, six
months ago) already wrote, and needing to understand it well enough
to trust it, then change one thing safely. Here's Lesson 17's
`Test-BackupAge` script again — a genuine target for exactly that:

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
            Write-Host "$SqlInstance / $($row.DatabaseName): OVERDUE" -ForegroundColor Yellow
        } else {
            Write-Host "$SqlInstance / $($row.DatabaseName): OK" -ForegroundColor Green
        }
    }
}
```

**Reading it in order, not guessing:** a `Verb-Noun` function named
`Test-BackupAge` (Lesson 13) takes a server name and an optional
threshold, defaulted to 24 hours. It builds one T-SQL query, runs it
once via dbatools (Lesson 16), then loops over every row that comes
back (Lesson 12) and branches each database into one of three
states (Lesson 11). That's the whole script — four chapters' worth
of pieces, and none of them individually mysterious once you look
for them by name instead of trying to absorb the whole thing at
once.

## A real gap, found by reading it

Reading closely surfaces a genuine problem: `Invoke-DbaQuery` will
throw an error if `SQL-PROD-03` happens to be down or unreachable —
and with no error handling, that error stops the *entire* script,
never checking the servers after it in the list. That's a real risk
you'd only catch by reading carefully, not by skimming.

## Modification 1: don't let one dead server stop the rest

The safe fix is a `Try`/`Catch` around the one line that can fail:

```powershell
try {
    $results = Invoke-DbaQuery -SqlInstance $SqlInstance -Query $query
} catch {
    Write-Host "$SqlInstance: COULD NOT CONNECT — $($_.Exception.Message)" -ForegroundColor Red
    return
}
```

`try` runs the risky line; if it throws, `catch` runs instead of
crashing the script, and `return` exits just this one call to the
function — the outer `foreach` over `$servers` (from Lesson 17)
keeps going to the next server untouched. One dead server now
reports a clear message instead of silently taking the whole check
down with it.

## Modification 2: log to a file, not just the console

Lesson 17 flagged this script as realistic but incomplete —
console-only output disappears the moment the window closes. Adding
a log file is one new parameter and one line, nothing structural:

```powershell
function Test-BackupAge {
    param(
        [string]$SqlInstance,
        [int]$MaxHoursOld = 24,
        [string]$LogPath = "C:\Logs\backup-check.log"   # NEW
    )
    # ... unchanged query and try/catch ...

    foreach ($row in $results) {
        # ... unchanged status logic building $status text ...
        "$(Get-Date -Format s) $SqlInstance / $($row.DatabaseName): $status" |
            Out-File -FilePath $LogPath -Append   # NEW
    }
}
```

That's the whole modification: one new, defaulted parameter
(`$LogPath`, so existing calls that don't pass it keep working
unchanged — Lesson 13's default-value pattern again), and one
`Out-File -Append` line writing the same status text to a file
instead of only `Write-Host`. Nothing about how the function is
called, or what it checks, changed — that's what makes it a *safe*
modification: additive, backward-compatible, and touching only the
one thing it set out to change.

## What this course completes

18 lessons, 4 chapters — this course completes **PowerShell
Fundamentals**, and with it, the **Azure Database Administrator**
career path's **Advanced** stage. That closes out the entire path,
both stages, all seven courses:

- **Job Ready** — T-SQL Development, Azure Fundamentals, Azure
  Database Administrator, Data Factory
- **Advanced** — Terraform & Bicep for Data Engineers,
  Git/GitHub/CI-CD for Data, and now PowerShell Fundamentals

Every course in both stages is fully built. There's no course left
in this path to point you toward next.

## You're done with this course

There's no Lesson 19. You're ready when you can open any of this
course's other lessons' scripts and confidently explain, and safely
change, what they do.

Congratulations on finishing PowerShell Fundamentals — and the
entire Azure Database Administrator path.
