# Lesson 18 — Scripting Backup Automation

**Chapter 5 · Automation With PowerShell · Lesson 18 of 26**

## What you'll learn

- Why "a backup exists" and "a backup works" are different claims
- The real dbatools cmdlet that verifies a backup can actually restore
- How to script this as a routine Overlook runs on a schedule, not a one-off manual check
- How this connects directly to Lesson 17's health check and Lesson 11's RPO target

## The claim this lesson actually tests

Lesson 17's health check confirmed a backup exists and is recent. That's a weaker claim than it
sounds: a backup file can exist, be recent, and still be corrupted or unrestorable — and the only
way to actually know is to test it. This is the exact gap the Beginner capstone's backup discipline
left for this capstone to close with real automation, instead of trusting that "the backup job ran"
means "the backup works."

## Testing a backup for real, with dbatools

```powershell
$testResult = Test-DbaLastBackup -SqlInstance "overlook-sql-prod" -Database "OverlookDB"

$testResult | Select-Object Database, RestoreResult, DbccResult, BackupDates
```

`Test-DbaLastBackup` actually restores the most recent backup to a temporary database, runs
`DBCC CHECKDB` against that restored copy to verify it's not corrupted, and then cleans up — a
genuine end-to-end test, not a check of metadata. `RestoreResult` and `DbccResult` both need to
read `Success` for the backup to actually count as verified.

## Scripting this as a repeatable routine

```powershell
function Test-OverlookBackup {
    $result = Test-DbaLastBackup -SqlInstance "overlook-sql-prod" -Database "OverlookDB"

    $verified = ($result.RestoreResult -eq "Success") -and ($result.DbccResult -eq "Success")

    [PSCustomObject]@{
        Database      = $result.Database
        BackupVerified = $verified
        TestedAt      = Get-Date
    }
}

Test-OverlookBackup | Format-List
```

Run on a schedule — Lesson 19 wires this and Lesson 17's health check into the same alerting
routine — this turns "we assume backups work" into "we tested this specific backup, today, and it
restored cleanly." That's a materially different, and much more defensible, answer if a regulator
or the board ever asks.

## Why this connects back to Lesson 11's RPO target

A verified, restorable backup is one half of what Lesson 11's 5-minute RPO actually depends on for
the backup/restore path specifically (separate from the failover group's replication path in
Chapter 4) — an RPO target is meaningless if the backup it assumes exists turns out not to restore
when it's actually needed.

## Key terms

| Term | Meaning |
|---|---|
| `Test-DbaLastBackup` | A dbatools cmdlet that restores the most recent backup to a temp database and runs DBCC CHECKDB against it |
| `DBCC CHECKDB` | Verifies a database's internal structural integrity |
| Backup verification | Confirming a backup actually restores and is uncorrupted, not just that the file exists |

## Check yourself

You're ready for Lesson 19 when you can explain, without looking: what does `Test-DbaLastBackup`
actually do differently from just checking that a recent backup file exists, and why does that
difference matter?
