# Building Automated Alerting

SQL Server Agent alerts (covered in the SQL Server DBA course) handle a specific category of
condition well: performance counter thresholds and error-severity events, evaluated by the
engine itself. Not everything a DBA wants to know about fits that mold. This lesson covers the
PowerShell-based alternative: a scheduled script that runs real health checks and decides for
itself whether to notify anyone.

## What you'll learn

- Why a scheduled PowerShell/dbatools script complements Agent alerts rather than replacing them
- What a real threshold-check-and-notify script actually looks like, end to end
- Why the threshold logic belongs in the script, not buried in a one-off manual check

## Where this complements SQL Server Agent alerts

Agent alerts are strong at things SQL Server itself can observe and fire on directly —
a performance counter crossing a value, a specific error number occurring. They're weaker at
anything that requires combining several signals, running a multi-step check like a backup
verification, or applying DBA-specific judgment ("is this actually a problem right now, or is
it expected during the nightly ETL window"). A PowerShell script running on a schedule can do
that kind of composite check, because it's just code — any condition you can express in
PowerShell, you can alert on.

## A real threshold-check-and-notify script

```powershell
$results = Test-DbaLastBackup -SqlInstance SQLPRD01

foreach ($r in $results) {
    if (-not $r.RestoreResult -eq 'Success') {
        $message = "Backup verification failed for $($r.Database) on $($r.SqlInstance)"
        Send-AlertNotification -Message $message  # your own notify function; Lesson 29 covers real delivery methods
    }
}

$diskSpace = Get-DbaDiskSpace -SqlInstance SQLPRD01 | Where-Object { $_.PercentFree -lt 10 }
if ($diskSpace) {
    Send-AlertNotification -Message "Low disk space on SQLPRD01: $($diskSpace.Name) at $($diskSpace.PercentFree)% free"
}
```

This is a genuinely real, useful pattern: `Test-DbaLastBackup` and `Get-DbaDiskSpace` are real
dbatools health-check commands, and wrapping their output in a threshold check is exactly how
DBAs build custom monitoring that goes beyond what Agent alerts cover on their own.

## Where the threshold logic belongs

It's tempting to run a check like this manually once, see it looks fine, and move on. The whole
value is scheduling it and keeping the threshold logic in the script itself, not in a person's
head:

```powershell
# Scheduled via Windows Task Scheduler or an Agent job that just calls PowerShell
powershell.exe -File "C:\Scripts\Check-BackupHealth.ps1"
```

Lesson 10 already covered scheduling PowerShell scripts generally — this is the same mechanism,
aimed specifically at a check-and-notify script instead of a maintenance task. The threshold
values (`PercentFree -lt 10`, for example) live in version-controlled code, reviewable and
changeable the same way any other script in this course has been, rather than being a number
someone remembers informally.

## Key terms

| Term | Meaning |
|---|---|
| Threshold check | Code that compares a real metric against a defined limit and decides whether to alert |
| `Test-DbaLastBackup` | dbatools command that verifies a backup by actually restoring it |
| `Get-DbaDiskSpace` | dbatools command that reports free disk space on a SQL Server host |

## Check yourself

Why can a scheduled PowerShell script check a condition that a native SQL Server Agent alert
generally can't — like "did last night's backup actually restore successfully"?
