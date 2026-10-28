# Lesson 23 — Automating Backup Verification

**Chapter 6 · Automating Operational Tasks · Lesson 23 of 32**

## What you'll learn

- Why "a backup schedule exists" and "the backup actually ran successfully" are two different claims
- How a scheduled backup job fails silently, and why that silence is a real, common cause of data loss
- How to write a script that checks the last 24 hours of Azure Backup job results and flags any failures
- Why this check needs to run daily, independent of whatever is running the backups themselves

## A schedule existing isn't the same as a backup happening

Setting up a backup policy feels like the job is done — a policy says "back this up nightly," and
it's easy to assume that means it's happening. It doesn't. A backup job can fail for reasons that
have nothing to do with the policy itself: a VM agent that stopped responding, a storage account
that hit a permission change, a snapshot that timed out under load. The policy still exists and
still looks correctly configured in the portal. The backup it was supposed to produce last night
simply didn't happen, and nothing about the policy's existence tells you that.

## The real cost of finding out too late

This is one of the most common, most avoidable causes of actual data loss: a backup job has been
silently failing for weeks, nobody checked, and then the day a restore is actually needed, there's
nothing recent to restore from. The backup "existing" on paper was never the same claim as the
backup actually completing, and the gap between those two claims only gets discovered at the worst
possible moment — during an incident, not before one.

## Checking the last 24 hours of backup jobs

Azure Backup records every backup attempt as a **job**, with a status of `Completed`, `Failed`, or
a few other states. This script pulls every backup job from the last day and reports any that
didn't succeed:

```
# check-backup-jobs.ps1 — run daily
$vault = Get-AzRecoveryServicesVault -ResourceGroupName "rg-backup" -Name "vault-prod"

$jobs = Get-AzRecoveryServicesBackupJob -VaultId $vault.ID `
    -From (Get-Date).AddHours(-24) -To (Get-Date)

$failed = $jobs | Where-Object { $_.Status -ne "Completed" }

if ($failed) {
    Write-Output "ALERT: $($failed.Count) backup job(s) did not complete successfully:"
    $failed | Select-Object WorkloadName, Operation, Status | Format-Table
} else {
    Write-Output "All backup jobs in the last 24 hours completed successfully."
}
```

`-From` and `-To` scope the query to a rolling 24-hour window, so the script always checks
yesterday's activity regardless of when it runs. Filtering on `Status -ne "Completed"` — rather
than specifically matching `"Failed"` — catches anything that didn't finish cleanly, including
states like cancelled or in-progress-too-long, not just the one most obvious failure mode.

## Why this has to run independently and daily

The backup job itself runs on its own schedule inside Azure Backup — this verification script is
deliberately a **separate** job, run daily, that checks on the first one from the outside. That
separation matters: if the verification lived inside the same pipeline as the backup, a failure
that broke the backup could just as easily break the check meant to catch it. Running it
independently, every day, on its own Azure Automation schedule (Lesson 8) means a failure gets
caught within 24 hours — not discovered three weeks later when a restore is actually needed.

## Key terms

| Term | Meaning |
|---|---|
| Backup job | A single recorded attempt by Azure Backup to back up a resource, with a status like Completed or Failed |
| Recovery Services vault | The Azure resource that stores backup data and backup job history |
| Silent failure | A backup that fails without anyone noticing, because the policy still looks correctly configured |
| Rolling window | A time range relative to "now" (e.g. the last 24 hours), rather than a fixed calendar date |

## Check yourself

You're ready for Lesson 24 when you can explain, without looking: why can a backup policy look
completely correctly configured in the portal while the actual backup has been failing for weeks,
and why does the verification check need to be a separate script rather than part of the backup
job itself?
