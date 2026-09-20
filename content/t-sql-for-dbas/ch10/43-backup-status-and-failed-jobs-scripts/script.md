# Script — Backup Status & Failed Jobs Scripts

## Segment 1 (title)

This is the script every DBA should run before coffee finishes brewing. It combines backup history from msdb.dbo.backupset and failed Agent job steps from sysjobhistory — the two questions that actually determine whether last night went fine.

## Segment 2 (code: section 1 — backup status)

Section one reports the last full, differential, and log backup per database, then flags it OK, OVERDUE, or NEVER BACKED UP based on a threshold. The LEFT JOIN from sys.databases matters — a database with zero backups still shows up, flagged as the problem it is, instead of silently disappearing from an inner join.

## Segment 3 (code: section 2 — failed jobs, bounded)

Section two is the failed-jobs query from Lesson 29, but bounded to a lookback window instead of the entire retention history. For a morning check you want last night's failures, not every failure since the job was created — the window keeps the output focused on what actually needs a response today.

## Segment 4 (steps: reading the morning check)

Read together, this script answers two questions: were we backed up, and did the scheduled jobs run clean. An overdue backup sitting next to a failed backup job in the same output isn't a coincidence you have to spot yourself — it's on the same screen.

## Segment 5 (outro)

Backup status and job failures, in one script, bounded to a sane window. Next up: the incident-response script — blocking chains and expensive active queries, combined into one thing you run the moment someone says the database is slow.
