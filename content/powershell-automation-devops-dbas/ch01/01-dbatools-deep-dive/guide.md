# dbatools, Deep Dive

This course is distinct from PowerShell Fundamentals — it assumes you already know
PowerShell's basics (variables, pipelines, cmdlets, objects) and goes straight into
automation, source control, CI/CD, infrastructure as code, and DevOps practice, all aimed
specifically at DBA work. The first tool to know well is **dbatools**, because nearly
everything in this course either uses it directly or builds on the patterns it
established.

## What you'll learn

- What dbatools actually is, and why it exists
- The naming convention that makes its 500+ commands predictable
- Why it replaced hand-rolled DBA scripts across the industry

## What dbatools is

dbatools is a free, open-source PowerShell module — genuinely maintained by working
DBAs, not a Microsoft product — built specifically to automate SQL Server administration.
Where SMO (Lesson 3) gives you the raw .NET objects to build anything, dbatools gives you
several hundred pre-built, tested commands for the tasks DBAs actually do every day:
backups, restores, migrations, health checks, security audits, and more.

```powershell
Install-Module dbatools -Scope CurrentUser
Import-Module dbatools
Get-Command -Module dbatools | Measure-Object  # 500+ commands
```

## The naming convention

Every dbatools command follows PowerShell's `Verb-Noun` convention, with a consistent
`Verb-DbaNoun` shape:

```powershell
Get-DbaDatabase -SqlInstance SQLPRD01
Backup-DbaDatabase -SqlInstance SQLPRD01 -Database Sales -Path \\backups\sales
Test-DbaLastBackup -SqlInstance SQLPRD01
Copy-DbaLogin -Source SQLPRD01 -Destination SQLPRD02
```

Once you know the pattern — `Get-Dba*` retrieves information, `Test-Dba*` validates
something, `Backup-Dba*`/`Restore-Dba*` move data, `Copy-Dba*`/`Set-Dba*` change
configuration — the command names become genuinely guessable, not something you have to
memorize one by one.

## Why it replaced hand-rolled scripts

Before dbatools, most DBAs maintained their own personal library of ad hoc PowerShell
scripts — inconsistent, undocumented, and untested. dbatools consolidates that into a
single, community-tested module: `Test-DbaLastBackup` doesn't just check that a backup
file exists, it actually restores it to verify the backup is genuinely usable — the kind
of thorough logic almost nobody hand-rolls themselves. Because it's actively maintained by
thousands of contributors and used across a huge number of real production environments,
a bug in a common command gets found and fixed fast, in a way a personal script never
would.

## Key terms

| Term | Meaning |
|---|---|
| dbatools | Free, open-source PowerShell module for SQL Server administration automation |
| SMO | SQL Server Management Objects — the .NET API dbatools itself is partly built on |
| `Verb-DbaNoun` | dbatools' consistent command naming pattern |

## Check yourself

Why does `Test-DbaLastBackup` actually restore a backup rather than just checking that the
backup file exists? What real problem does that extra step catch that a simple
file-existence check would miss?
