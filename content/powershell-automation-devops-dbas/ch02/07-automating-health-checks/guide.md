# Automating Health Checks

A DBA doing a manual daily health check runs the same handful of things every morning:
disk space, last good `DBCC CHECKDB`, backup recency, failed jobs. dbatools has a
dedicated cmdlet for most of these checks individually — the automation win is chaining
several of them into one script that produces a single report, instead of running each
check by hand.

## What you'll learn

- Real dbatools health-check cmdlets: `Test-DbaDiskSpace`, `Get-DbaLastGoodCheckDb`, and others
- How to chain several checks into one combined report
- Turning the report into something that flags problems instead of just listing data
- Why this is the natural next step after Lesson 6's backup automation

## The individual health-check cmdlets

```powershell
# Disk space on every drive the SQL Server instance can see
Test-DbaDiskSpace -SqlInstance SQLPRD01

# Last known-good DBCC CHECKDB per database
Get-DbaLastGoodCheckDb -SqlInstance SQLPRD01

# Last backup of any type per database
Get-DbaLastBackup -SqlInstance SQLPRD01

# Any failed SQL Server Agent jobs
Get-DbaAgentJobHistory -SqlInstance SQLPRD01 -StartDate (Get-Date).AddDays(-1) |
    Where-Object Status -eq 'Failed'
```

Each of these already exists as a tested, standalone dbatools command — this isn't new
capability, it's the same commands a DBA would run interactively, run back-to-back.

## Chaining them into one report

```powershell
$instance = "SQLPRD01"
$report = [PSCustomObject]@{
    Instance        = $instance
    CheckedAt       = Get-Date
    LowDiskDrives   = (Test-DbaDiskSpace -SqlInstance $instance | Where-Object PercentFree -lt 15).Name
    StaleCheckDb    = (Get-DbaLastGoodCheckDb -SqlInstance $instance |
                        Where-Object { $_.LastGoodCheckDb -lt (Get-Date).AddDays(-7) }).Database
    StaleBackups    = (Get-DbaLastBackup -SqlInstance $instance |
                        Where-Object { $_.LastBackup -lt (Get-Date).AddHours(-24) }).Database
    FailedJobsToday = (Get-DbaAgentJobHistory -SqlInstance $instance -StartDate (Get-Date).AddDays(-1) |
                        Where-Object Status -eq 'Failed').JobName
}

$report | ConvertTo-Html | Out-File \\reports\daily-health\$instance-$(Get-Date -Format yyyyMMdd).html
```

Building a `[PSCustomObject]` from the results of several checks turns four separate
command outputs into a single structured record — one row per server, ready to email,
export, or feed into a dashboard later in this course.

## Flagging problems instead of just listing data

The `Where-Object` filters above already do real work — `Test-DbaDiskSpace` alone returns
every drive, not just the low ones; filtering to `PercentFree -lt 15` is what turns raw
data into an actual signal. Extending that idea, wrapping the whole report in a check for
"anything non-empty" is what makes it genuinely useful unattended:

```powershell
$problems = $report.LowDiskDrives + $report.StaleCheckDb + $report.StaleBackups + $report.FailedJobsToday

if ($problems) {
    Send-MailMessage -To dba-team@company.com -Subject "Health check flagged issues on $instance" `
        -Body ($report | ConvertTo-Html | Out-String) -SmtpServer smtp.company.com
}
```

A report nobody reads unless something's wrong is far more sustainable than one that gets
skimmed daily and eventually ignored — the same principle Lesson 5's error handling
applies to failures now applies to health signals: surface the problem, don't just log it
quietly.

## Key terms

| Term | Meaning |
|---|---|
| `Test-DbaDiskSpace` | Checks free disk space on drives visible to a SQL Server instance |
| `Get-DbaLastGoodCheckDb` | Returns the last known-good `DBCC CHECKDB` date per database |
| `Get-DbaLastBackup` | Returns the most recent backup (any type) per database |
| `[PSCustomObject]` | Builds a single structured record out of several separate command results |

## Check yourself

Why does building a health-check report as a `[PSCustomObject]` with filtered results
(e.g. only drives under 15% free) matter more than just running `Test-DbaDiskSpace` on its
own and reading the raw output?
