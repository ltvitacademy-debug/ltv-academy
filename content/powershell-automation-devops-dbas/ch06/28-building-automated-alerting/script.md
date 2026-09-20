# Script — Building Automated Alerting

## Segment 1 (title)

SQL Server Agent alerts handle performance counters and error-severity events well. Not everything a DBA wants to know fits that mold. This lesson covers the PowerShell-based alternative: a scheduled script that runs real health checks and decides for itself whether to notify anyone.

## Segment 2 (code: a real threshold-check-and-notify script)

Test-DbaLastBackup and Get-DbaDiskSpace are real dbatools health-check commands. Wrapping their output in a threshold check — did the restore actually succeed, is free disk space below ten percent — is exactly how DBAs build custom monitoring that goes beyond what Agent alerts cover alone.

## Segment 3 (code: the threshold lives in the script)

It's tempting to run a check like this manually once and move on. The value is scheduling it and keeping the threshold logic in the script itself — version-controlled, reviewable, changeable — rather than a number someone remembers informally.

## Segment 4 (outro)

Next up: integrating with Teams, Slack, and email — actually delivering that alert once the threshold is breached.
