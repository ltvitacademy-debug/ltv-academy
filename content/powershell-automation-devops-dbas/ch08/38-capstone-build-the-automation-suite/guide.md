# Capstone: Build the Automation Suite

Time to write real scripts. Everything here applies Chapter 1's dbatools/scripting
foundations and Chapter 2's automation patterns (backups, health checks, index and
statistics maintenance, and wrapping it all in error handling) directly to Meridian
Outfitters' actual environment from Lesson 37: **MERSQLPRD01**, database
**MeridianCommerce**, backup share `\\MERBACKUP01\SQLBackups\MeridianCommerce`.

## What you'll learn

- A real, working backup script that replaces Priya's nightly SSMS click-through
- A real health-check script that replaces her 40-minute morning routine
- A real index/statistics maintenance script, and where error handling belongs in each

## Replacing the nightly backup

`Invoke-MeridianBackups.ps1` runs a full backup, then a log backup, then proves the full
backup is actually restorable — the same `Test-DbaLastBackup` behavior Lesson 1 opened
this whole course with. Wrapping it in `try`/`catch` (Chapter 1, Lesson 5) means a failure
doesn't just vanish silently; it gets reported instead of discovered the next time
someone needs a restore.

```powershell
function Invoke-MeridianBackups {
    param(
        [string]$SqlInstance = "MERSQLPRD01",
        [string]$BackupPath  = "\\MERBACKUP01\SQLBackups\MeridianCommerce"
    )
    try {
        Backup-DbaDatabase -SqlInstance $SqlInstance -Database MeridianCommerce `
            -Type Full -Path $BackupPath -CompressBackup -Checksum

        Backup-DbaDatabase -SqlInstance $SqlInstance -Database MeridianCommerce `
            -Type Log -Path $BackupPath -CompressBackup -Checksum

        Test-DbaLastBackup -SqlInstance $SqlInstance -Database MeridianCommerce
    }
    catch {
        Send-MeridianAlert -Severity Critical -Message "Nightly backup failed on $SqlInstance : $_"
    }
}
```

A SQL Server Agent job on MERSQLPRD01 calls this script nightly (Chapter 2, Lesson 10's
scheduling patterns) — no more right-clicking SSMS, and no more forgetting before a long
weekend.

## Replacing the 40-minute morning routine

`Invoke-MeridianHealthCheck.ps1` pulls the same handful of facts Priya used to check by
hand — free disk space, last night's backup, any failed Agent jobs — into one object, and
hands it to the alerting helper Lesson 40 builds out properly.

```powershell
function Invoke-MeridianHealthCheck {
    param([string]$SqlInstance = "MERSQLPRD01")

    $disk   = Get-DbaDiskSpace -ComputerName $SqlInstance | Where-Object Free -lt 50
    $backup = Test-DbaLastBackup -SqlInstance $SqlInstance -Database MeridianCommerce
    $jobs   = Get-DbaAgentJobHistory -SqlInstance $SqlInstance -StartDate (Get-Date).AddDays(-1) |
                Where-Object Status -eq 'Failed'

    [PSCustomObject]@{
        LowDiskVolumes  = $disk.Count
        LastBackupOk    = [bool]$backup.RestoreResult
        FailedJobsToday = $jobs.Count
    } | Send-MeridianAlert -Severity Info
}
```

Instead of 40 minutes clicking through SSMS every morning, Priya gets one message at
7:05 AM she can read in under two minutes — and Lesson 40 covers exactly how that message
gets tuned so it's useful instead of noisy.

## Index and statistics maintenance, on a schedule

`Invoke-MeridianIndexMaintenance.ps1` wraps `Invoke-DbaDbIndexOptimize` — the dbatools
command that inspects fragmentation and statistics across a database and decides,
index by index, whether to reorganize, rebuild, or update statistics, the same kind of
smart maintenance logic DBAs used to hand-roll from scratch (Lesson 1's whole point about
dbatools replacing personal script libraries).

```powershell
function Invoke-MeridianIndexMaintenance {
    param([string]$SqlInstance = "MERSQLPRD01")

    try {
        Invoke-DbaDbIndexOptimize -SqlInstance $SqlInstance -Database MeridianCommerce
    }
    catch {
        Send-MeridianAlert -Severity Warning -Message "Index maintenance failed on $SqlInstance : $_"
    }
}
```

This one runs weekly, off-hours, on a schedule (Chapter 2, Lesson 10 again) rather than
nightly — index maintenance is real I/O and CPU load, and MeridianCommerce's storefront
traffic pattern means it can't run during the day.

## Key terms

| Term | Meaning |
|---|---|
| `Invoke-MeridianBackups.ps1` | The capstone's nightly backup script — full + log backup, then `Test-DbaLastBackup` |
| `Invoke-MeridianHealthCheck.ps1` | The capstone's morning health-check script — disk, backup, and job status in one object |
| `Invoke-MeridianIndexMaintenance.ps1` | The capstone's weekly maintenance script, wrapping `Invoke-DbaDbIndexOptimize` |
| `Send-MeridianAlert` | The shared helper all three scripts call to report results — built out fully in Lesson 40 |

## Check yourself

`Invoke-MeridianBackups.ps1` wraps its work in `try`/`catch` and calls `Send-MeridianAlert`
on failure. Why does that matter more for a backup script specifically than it would for,
say, a script that just prints a report to the screen?
