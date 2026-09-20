# Script — Backup Automation Strategy

## Segment 1 (title)

This chapter has designed a strategy, compressed and encrypted it, spread it across locations, and verified it. None of that matters if it depends on someone remembering to run it by hand. This lesson wires the strategy to a real, industry-standard scheduling mechanism.

## Segment 2 (code: SQL Server Agent job)

SQL Server Agent jobs turn the Lesson 2 strategy into something that runs unattended — a weekly full, a nightly differential, a log backup every 15 minutes, each as its own job step and schedule. That's the mechanism, and it works, but almost nobody hand-rolls dozens of these across every database in production.

## Segment 3 (code: Ola Hallengren's DatabaseBackup)

The honest, real answer is Ola Hallengren's Maintenance Solution — free scripts that are the actual industry standard. The DatabaseBackup procedure handles full, differential, and log backups for every database on an instance with one call per type, with compression, checksum verification, and automatic cleanup of old files built in.

## Segment 4 (steps: mapping the strategy to scheduled jobs)

Each DatabaseBackup call becomes the single command inside one Agent job step, scheduled to match the cadence decided back in Lesson 2 — FULL weekly, DIFF nightly, LOG every 15 minutes. Recognizing this script suite by name is a real, transferable skill, not a shortcut.

## Segment 5 (outro)

Everything from here forward — restore scenarios, Availability Groups, failover clustering, log shipping, replication — assumes this backup foundation is already correctly in place. A gap here is a gap in everything that follows. Next up: Chapter 2 starts with the simplest restore there is — a full restore.
