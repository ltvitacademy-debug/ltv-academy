# Scheduling PowerShell Scripts

Every script built so far in this chapter is only automation once something actually
triggers it without a person present. SQL Server Agent can technically run a PowerShell
step, but it has real permission limitations that make Windows Task Scheduler the more
common real-world choice for scripts like these.

## What you'll learn

- `Register-ScheduledTask` and `schtasks.exe` as the real mechanisms for scheduling a script
- SQL Server Agent's real PowerShell-step limitation, and why it matters
- Choosing the right account for a scheduled script to run under
- Which mechanism this chapter's scripts should actually use, and why

## Register-ScheduledTask: the modern way

```powershell
$action = New-ScheduledTaskAction -Execute "powershell.exe" `
    -Argument "-NoProfile -File C:\Scripts\Backup-Sales.ps1"

$trigger = New-ScheduledTaskTrigger -Daily -At 2am

Register-ScheduledTask -TaskName "Nightly Sales Backup" `
    -Action $action -Trigger $trigger `
    -User "DOMAIN\svc-dbascripts" -RunLevel Highest
```

`Register-ScheduledTask` is itself a PowerShell cmdlet (from the built-in
`ScheduledTasks` module), building a Task Scheduler entry entirely from a script instead
of clicking through the Task Scheduler GUI — which matters if you're deploying the same
scheduled job across many servers.

## schtasks.exe: the classic command-line equivalent

```powershell
schtasks /Create /TN "Nightly Sales Backup" /TR "powershell.exe -NoProfile -File C:\Scripts\Backup-Sales.ps1" `
    /SC Daily /ST 02:00 /RU "DOMAIN\svc-dbascripts"
```

`schtasks.exe` predates the `ScheduledTasks` PowerShell module and still works identically
— useful to recognize in older scripts, remote deployment tooling, or environments that
haven't standardized on the newer cmdlets yet. Both ultimately create the exact same
underlying Task Scheduler entry.

## SQL Server Agent's real limitation

SQL Server Agent *can* run a PowerShell step type, but it runs under the SQL Server Agent
service account — not a dedicated account you choose per job. That's a genuine permission
problem: a PowerShell step that needs to touch a file share, call `Invoke-Command`
against other servers, or send an email through an internal SMTP relay is now constrained
to whatever the Agent service account happens to have rights to, which is often either
too little (the script fails) or too much (the Agent account was over-provisioned to make
scripts stop failing, expanding its blast radius). Windows Task Scheduler, by contrast,
lets you specify exactly which account each individual scheduled task runs under.

## Choosing the right account

```powershell
Register-ScheduledTask -TaskName "Weekly Security Audit" `
    -Action $action -Trigger $trigger `
    -User "DOMAIN\svc-dbascripts" -Password $null -RunLevel Highest
```

A dedicated service account (`svc-dbascripts` here, not a personal admin account and not
the SQL Server Agent account) scoped to exactly the permissions each script needs — read
access to backup shares, `sysadmin` on the relevant instances, SMTP relay rights — is the
right default. Running scheduled DBA scripts under a personal account breaks the moment
that person changes their password or leaves the team; running everything under an
over-privileged shared account violates the same least-privilege principle the security
audit in Lesson 9 exists to catch.

## What this chapter's scripts should actually use

Every automated task from Lessons 6 through 9 — backups, health checks, index
maintenance, security audits — is a Windows Task Scheduler job running a `.ps1` file under
a dedicated service account, not a SQL Server Agent PowerShell step. That's the practical
takeaway of this lesson: it's not that Agent PowerShell steps are forbidden, it's that
they're the wrong default for scripts that need controlled, specific permissions.

## Key terms

| Term | Meaning |
|---|---|
| `Register-ScheduledTask` | PowerShell cmdlet (ScheduledTasks module) that creates a Windows Task Scheduler entry |
| `schtasks.exe` | Command-line equivalent to Task Scheduler, predating the PowerShell cmdlets |
| Agent service account | The single account every SQL Server Agent PowerShell step runs under, regardless of job |
| Dedicated service account | A scoped, non-personal account chosen per scheduled task in Task Scheduler |

## Check yourself

Why does SQL Server Agent's PowerShell step type create a real permission problem for
scripts like the ones built in Lessons 6 through 9, and what does Windows Task Scheduler
offer instead?
