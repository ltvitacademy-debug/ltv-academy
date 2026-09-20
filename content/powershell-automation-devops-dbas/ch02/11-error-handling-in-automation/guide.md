# Error Handling in Automation

Lesson 5 covered `try`/`catch`/`finally` for a single script run interactively, where a
DBA sees the error the moment it happens. A scheduled script running at 2 a.m. has no one
watching — a silent failure there doesn't get noticed until someone needs the backup that
never ran, or the audit that never flagged a weak password. This lesson expands Lesson
5's error handling into something that survives running completely unattended.

## What you'll learn

- Why silent failures are specifically dangerous in scheduled, unattended automation
- A real custom log-to-file pattern for recording what a script actually did
- `Get-DbatoolsLog`, dbatools' own internal logging, for troubleshooting its commands specifically
- Combining logging with `try`/`catch`/`finally` into one automation-ready pattern

## Why silent failures are dangerous here

An interactive script that fails gets noticed immediately — the error prints right in
front of the person who ran it. A script triggered by Task Scheduler at 2 a.m. runs with
nobody watching the console; if it fails and nothing records that failure anywhere
durable, the *only* signal is a much worse one later — the health check from Lesson 7
catching a stale backup, or worse, an actual restore attempt discovering there's nothing
usable to restore. Logging isn't a nice-to-have polish step for a scheduled script; it's
the only way anyone finds out something went wrong before it becomes an emergency.

## A real custom log-to-file pattern

```powershell
function Write-Log {
    param(
        [Parameter(Mandatory)][string]$Message,
        [ValidateSet('INFO', 'WARN', 'ERROR')][string]$Level = 'INFO',
        [string]$LogPath = "C:\Logs\dba-automation.log"
    )

    $line = "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')  [$Level]  $Message"
    Add-Content -Path $LogPath -Value $line
}

Write-Log -Message "Starting nightly backup job." -Level INFO
```

`Add-Content` appends a timestamped line to a plain text log file — this pattern needs no
external module and works on any machine with PowerShell installed, which is exactly why
it's the common real-world default for logging inside a scheduled script, alongside
richer options like `Start-Transcript` for capturing an entire session's console output.

## Get-DbatoolsLog: dbatools' own internal logging

Separately from your own script's log file, dbatools keeps an internal log of what its
own commands did, useful when a dbatools cmdlet itself misbehaves inside a scheduled job:

```powershell
Get-DbatoolsLog -Errors
```

`Get-DbatoolsLog` retrieves entries from dbatools' internal logging system — filterable
by function name, level, or time — which is a different, complementary thing from the
custom `Write-Log` function above: your log records what *your script* decided to do;
`Get-DbatoolsLog` records what a dbatools *command itself* actually did internally.

## Putting it together: automation-ready error handling

```powershell
$ErrorActionPreference = "Stop"
Write-Log "Starting nightly backup job." INFO

try {
    Backup-DbaDatabase -SqlInstance SQLPRD01 -Database Sales -Path \\backups\sales -ErrorAction Stop
    Write-Log "Backup completed successfully." INFO
}
catch {
    Write-Log "Backup FAILED: $($_.Exception.Message)" ERROR
    Send-MailMessage -To dba-team@company.com -Subject "ALERT: Nightly backup failed on SQLPRD01" `
        -Body $_.Exception.Message -SmtpServer smtp.company.com
}
finally {
    Write-Log "Backup job finished at $(Get-Date)." INFO
}
```

This is Lesson 5's `try`/`catch`/`finally` extended with two things a script running
unattended actually needs: a durable, timestamped record of what happened (the log file),
and an active alert (the email) so a failure doesn't just sit quietly in a log nobody's
reading. Every script from this chapter — backups, health checks, index maintenance,
security audits — should follow this same shape once it's scheduled.

## Key terms

| Term | Meaning |
|---|---|
| Silent failure | An error that occurs with no durable record and no alert, invisible until its consequences surface later |
| `Add-Content` | Appends a line to a text file, the basis of a simple custom logging function |
| `Get-DbatoolsLog` | Retrieves dbatools' own internal log of what its commands did, separate from a script's own logging |
| Automation-ready error handling | `try`/`catch`/`finally` combined with durable logging and active alerting |

## Check yourself

Why is a `try`/`catch`/`finally` block that only prints to the console, with no log file
and no alert, still not sufficient for a script that runs on an unattended nightly
schedule?
