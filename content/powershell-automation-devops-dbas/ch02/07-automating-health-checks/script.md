# Script — Automating Health Checks

## Segment 1 (title)

A DBA doing a manual daily health check runs the same handful of things every morning: disk space, last good CHECKDB, backup recency, failed jobs. dbatools has a dedicated cmdlet for most of these — the automation win is chaining them into one report.

## Segment 2 (code: the individual checks already exist)

Test-DbaDiskSpace checks free space on every drive the instance can see. Get-DbaLastGoodCheckDb returns the last known-good CHECKDB per database. Get-DbaLastBackup returns the most recent backup per database. Each already exists as a tested standalone command.

## Segment 3 (code: one report, four checks)

Building a PSCustomObject from the results of several checks turns four separate command outputs into one structured record — one row per server, ready to email, export, or feed into a dashboard later in this course.

## Segment 4 (code: flag problems, don't just log data)

Filtering to only drives under 15 percent free, or backups older than 24 hours, is what turns raw data into an actual signal. Wrapping the whole report in a check for anything non-empty and emailing only when something's actually wrong is what makes it sustainable.

## Segment 5 (outro)

A report nobody reads unless something's wrong beats one that gets skimmed daily and eventually ignored. Next up: automating index and statistics maintenance, turning manual T-SQL maintenance into one scheduled script.
