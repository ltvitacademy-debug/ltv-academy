# Script — Capstone: Build the Automation Suite

## Segment 1 (title)

Time to write real scripts. Everything here applies Chapter 1's dbatools foundations and Chapter 2's automation patterns directly to Meridian Outfitters' actual environment.

## Segment 2 (code: replacing the nightly backup)

Invoke-MeridianBackups runs a full backup, then a log backup, then proves the full backup is actually restorable with Test-DbaLastBackup — wrapped in try/catch so a failure gets reported through Send-MeridianAlert instead of discovered the next time someone needs a restore.

## Segment 3 (code: replacing the 40-minute morning routine)

Invoke-MeridianHealthCheck pulls the same handful of facts Priya used to check by hand — free disk space, last night's backup, any failed Agent jobs — into one object and hands it to the alerting helper. Instead of 40 minutes in SSMS, she gets one message she can read in under two minutes.

## Segment 4 (code: index and statistics maintenance)

Invoke-MeridianIndexMaintenance wraps Invoke-DbaDbIndexOptimize, which inspects fragmentation and statistics across the database and decides, index by index, whether to reorganize, rebuild, or just update statistics. It runs weekly, off-hours, since index maintenance is real I/O and CPU load.

## Segment 5 (outro)

Next up: taking a real schema change Meridian's fulfillment team requested, and moving it through source control and a CI/CD pipeline instead of an emailed script — Chapters 3 and 4's patterns, applied.
