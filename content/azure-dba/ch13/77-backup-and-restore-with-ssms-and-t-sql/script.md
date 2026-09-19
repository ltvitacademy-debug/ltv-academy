# Script — Backup & Restore with SSMS and T-SQL

## Segment 1 (title)

This is the lesson where a DBA genuinely holds the wheel — real BACKUP DATABASE and RESTORE DATABASE T-SQL, for on-prem and VM-hosted SQL Server specifically. Azure SQL Database doesn't expose any of this to you, which is next lesson's subject.

## Segment 2 (code: BACKUP and RESTORE syntax)

BACKUP DATABASE with the DIFFERENTIAL keyword is what makes it incremental instead of a second full backup. On restore, WITH NORECOVERY keeps the database in a restoring state so you can apply the next backup on top — use it on every step except the very last one in the chain.

## Segment 3 (steps: SSMS GUI equivalents)

In SSMS, Tasks, Back Up gives you the backup type dropdown including differential. The Restore Database dialog reads backup history from msdb and proposes a valid chain automatically, with a point-in-time slider for log backups — and it has a Script button to turn your clicks into verified T-SQL.

## Segment 4 (outro)

Recover too early in a restore chain and the database comes online, but you lose the ability to apply anything else on top of it. Next up: what Azure SQL Database does instead — automated backups you never have to script at all.
