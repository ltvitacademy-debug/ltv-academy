# Automating Backups With PowerShell

In the SQL Server DBA and HA/DR courses, backups ran as SQL Server Agent jobs executing
T-SQL `BACKUP DATABASE` statements — reliable, but limited to whatever T-SQL and Agent
can express. This lesson automates the same backup strategy concepts — full, differential,
log, retention — with `Backup-DbaDatabase`, giving you PowerShell's full scripting
surface (loops, conditionals, logging, error handling) wrapped around the backup itself.

## What you'll learn

- `Backup-DbaDatabase` and its real, commonly used parameters
- How to express full/differential/log strategy in a script instead of separate Agent jobs
- Retention cleanup as part of the same automated routine
- Why this is "the same strategy, a different execution engine," not a new strategy

## Backup-DbaDatabase, for real

```powershell
Backup-DbaDatabase -SqlInstance SQLPRD01 `
    -Database Sales `
    -Path \\backups\sales `
    -Type Full `
    -CompressBackup `
    -Checksum
```

- `-Type` accepts `Full`, `Differential`, or `Log` — the exact same backup types from the
  SQL Server DBA course, just invoked from PowerShell instead of a T-SQL `BACKUP DATABASE`
  statement.
- `-CompressBackup` enables backup compression, the same feature you'd otherwise turn on
  with `WITH COMPRESSION` in T-SQL.
- `-Checksum` verifies page checksums during the backup, catching corruption early — the
  same value as `WITH CHECKSUM` in T-SQL.
- Omit `-Database` and dbatools backs up every user database on the instance, which is
  exactly the loop-avoidance a hand-written script would otherwise need explicit code for.

## Expressing a full strategy in one script

```powershell
$instance = "SQLPRD01"
$backupRoot = "\\backups\sales"

# Sunday: full backup
if ((Get-Date).DayOfWeek -eq 'Sunday') {
    Backup-DbaDatabase -SqlInstance $instance -Database Sales -Path $backupRoot -Type Full -CompressBackup
}
# Every other day: differential
else {
    Backup-DbaDatabase -SqlInstance $instance -Database Sales -Path $backupRoot -Type Differential -CompressBackup
}

# Every 15 minutes (via its own scheduled trigger): log backup
Backup-DbaDatabase -SqlInstance $instance -Database Sales -Path $backupRoot -Type Log -CompressBackup
```

This is the exact same full/differential/log cadence the SQL Server DBA course covered as
a backup strategy — the difference is that the branching logic (which day gets a full
backup) now lives in PowerShell's `if`/`else`, not three separately maintained Agent job
schedules.

## Retention cleanup in the same script

```powershell
$retentionDays = 14

Get-ChildItem $backupRoot -Filter *.bak |
    Where-Object { $_.LastWriteTime -lt (Get-Date).AddDays(-$retentionDays) } |
    Remove-Item
```

Folding retention cleanup into the same script (or a scheduled companion script) closes a
gap that pure T-SQL/Agent backup jobs often leave to a separate, easily-forgotten
maintenance plan step.

## Why this matters: same strategy, different engine

Nothing about *what* gets backed up, *how often*, or *why* changes here — the HA/DR
concepts (RPO driven by log backup frequency, RTO driven by how fast a full-plus-log chain
restores) are identical to what the SQL Server DBA and HA/DR courses taught. What changes
is the execution engine: PowerShell gives you real conditionals, real error handling
(Lesson 5), real logging, and the ability to run the exact same backup command against
every server in an estate in a single script (Lesson 2) — none of which T-SQL inside an
Agent job step can do on its own.

## Key terms

| Term | Meaning |
|---|---|
| `Backup-DbaDatabase` | dbatools cmdlet that performs a SQL Server backup, wrapping the same operation as T-SQL `BACKUP DATABASE` |
| `-Type Full/Differential/Log` | Selects the backup type, matching the same three types from the SQL Server DBA course |
| `-CompressBackup` / `-Checksum` | Enable backup compression and page checksum verification, matching T-SQL's `WITH COMPRESSION`/`WITH CHECKSUM` |
| Retention cleanup | Deleting backup files older than a policy window, foldable into the same automated script |

## Check yourself

The lesson calls this "the same backup strategy, a different execution engine." What
actually stays identical between a T-SQL/Agent-based backup strategy and a
`Backup-DbaDatabase`-based one, and what specifically changes?
