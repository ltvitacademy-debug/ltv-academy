# Script — dbatools, Deep Dive

## Segment 1 (title)

This course assumes you already know PowerShell's basics and goes straight into automation, source control, CI/CD, and infrastructure as code, aimed specifically at DBA work. The first tool to know well is dbatools.

## Segment 2 (code: what dbatools is)

dbatools is a free, open-source PowerShell module, genuinely maintained by working DBAs, with several hundred pre-built, tested commands for the tasks DBAs actually do every day — backups, restores, migrations, health checks, security audits.

## Segment 3 (code: the naming convention)

Every command follows a consistent Verb-DbaNoun shape. Get-Dba retrieves information, Test-Dba validates something, Backup-Dba and Restore-Dba move data. Once you know the pattern, the command names become genuinely guessable.

## Segment 4 (outro)

dbatools replaced everyone's personal library of ad hoc scripts with a single, community-tested module — Test-DbaLastBackup doesn't just check a file exists, it actually restores it to prove the backup is usable. Next up: PowerShell remoting, running these commands against servers you're not logged into directly.
