# Script — SQL Server Backup Fundamentals: Full, Differential & Log

## Segment 1 (title)

SQL Server gives you three backup types, and a real restore strategy depends on knowing exactly what each one captures — full, differential, and transaction log.

## Segment 2 (code: the restore chain)

A differential backup isn't relative to the last differential — it's always relative to the last full. And log backups aren't snapshots of data, they're a record of every transaction, which is what lets you restore to an exact point in time, not just to when a backup happened to run.

## Segment 3 (steps: three types compared)

Full backup captures every page in the database. Differential captures everything changed since the last full. Log backup captures every transaction since the last log backup — and it's the only one that enables point-in-time recovery.

## Segment 4 (outro)

The restore-chain implication is the one that trips people up in a real outage: you need the last full, the most recent differential, and every log backup since, in order — skip one link and the chain breaks. Next up: doing this for real, with SSMS and T-SQL.
