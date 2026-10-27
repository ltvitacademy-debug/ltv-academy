# Lesson 17 — Scripting a Health Check

**Chapter 5 · Automation With PowerShell · Lesson 17 of 26**

## What you'll learn

- What a real health check for Overlook's database actually needs to verify
- How to combine several dbatools checks into one script, using plain PowerShell
- Why checking TDE and failover group health belongs in this script, not just uptime
- What this script returns, and how it's meant to be used (Lesson 19 wires it to alerting)

## What "health" actually means for this database

A health check that only confirms the database is reachable misses most of what Chapters 2-4
actually built. A real health check for `OverlookDB` needs to verify the things this capstone
specifically put in place: that the database is online, that TDE encryption is still active, and
that the failover group is in a healthy state — not just "is it up."

## The script

```powershell
function Test-OverlookHealth {
    param(
        [string]$SqlInstance = "overlook-fg.database.windows.net"
    )

    $health = [ordered]@{}

    $db = Invoke-DbaQuery -SqlInstance $SqlInstance -Query "
        SELECT state_desc FROM sys.databases WHERE name = 'OverlookDB'
    "
    $health.DatabaseOnline = ($db.state_desc -eq "ONLINE")

    $tde = Invoke-DbaQuery -SqlInstance $SqlInstance -Query "
        SELECT encryption_state FROM sys.dm_database_encryption_keys dek
        JOIN sys.databases db ON dek.database_id = db.database_id
        WHERE db.name = 'OverlookDB'
    "
    $health.TdeEncrypted = ($tde.encryption_state -eq 3)

    $lastBackup = Invoke-DbaQuery -SqlInstance $SqlInstance -Query "
        SELECT MAX(backup_finish_date) AS LastBackup
        FROM msdb.dbo.backupset WHERE database_name = 'OverlookDB'
    "
    $hoursSinceBackup = (Get-Date) - $lastBackup.LastBackup
    $health.RecentBackup = ($hoursSinceBackup.TotalHours -lt 24)

    $health.OverallHealthy = -not ($health.Values -contains $false)
    return [PSCustomObject]$health
}

Test-OverlookHealth | Format-List
```

## Why this checks three specific things, not just "is it up"

- **`DatabaseOnline`** is the baseline anyone would check.
- **`TdeEncrypted`** exists because Chapter 3's security posture is only real if it's *still* true
  later — a health check that never re-verifies TDE would miss a real configuration drift.
- **`RecentBackup`** connects straight back to the Beginner capstone's backup discipline and
  Lesson 11's RPO target: a backup older than 24 hours is itself a problem worth surfacing, before
  it becomes a disaster-recovery problem.

## Why this is one function, not three separate scripts

Wrapping all three checks in `Test-OverlookHealth` and returning one object with an
`OverallHealthy` flag means Lesson 19's alerting logic can ask one simple question —
"is `OverallHealthy` false?" — instead of needing to know about TDE, backups, and database state
individually. That's the same instinct as Lesson 12's failover group: push the complexity into one
well-defined place, so everything built on top of it stays simple.

## Key terms

| Term | Meaning |
|---|---|
| Health check | A script verifying the actual security/availability properties a platform depends on, not just uptime |
| `[ordered]@{}` | A PowerShell hashtable that preserves insertion order, used here to build a readable result object |
| Configuration drift | A setting (like TDE) silently changing after initial setup — which a repeated health check can catch |

## Check yourself

You're ready for Lesson 18 when you can explain, without looking: why does `Test-OverlookHealth`
check TDE status and backup recency, not just whether the database is online?
