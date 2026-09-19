# Script — Automating a Routine Admin Task

## Segment 1 (title)

Every DBA has this job: make sure every database on every server has a recent backup. Test-BackupAge is a real, complete script that checks exactly that, across a whole server list.

## Segment 2 (code: the function)

A function, Verb-Noun named with a sensible default. dbatools' Invoke-DbaQuery runs the T-SQL that finds each database's most recent backup from msdb.dbo.backupset — everything already covered, combined.

## Segment 3 (code: two loops)

A foreach loop inside the function walks each database's query result; a foreach loop outside it walks the whole server list, calling the function once per server. Branching logic sorts each database into never-backed-up, overdue, or fine.

## Segment 4 (steps: why this is realistic, not a toy)

This is something a DBA would actually run, probably as a scheduled task every morning. It's intentionally incomplete in a realistic way — no alert yet, console output instead of a log file — exactly the shape of script Lesson 18 picks up next.

## Segment 5 (outro)

Function, dbatools, two loops, branching — nothing new, just combined. Next up: reading and safely modifying a script exactly like this one.
