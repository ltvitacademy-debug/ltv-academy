# Script — Log Shipping Setup

## Segment 1 (title)

This chapter turns to a different, older technology: shipping transaction log backups from one server to another. Log shipping isn't trying to be an AG or FCI — it's a straightforward, durable way to keep a secondary copy reasonably current, and it's still real and supported.

## Segment 2 (steps: three jobs, one chain)

Log shipping is built from three SQL Server Agent jobs. The backup job on the primary takes a log backup, commonly every five to fifteen minutes, and writes it to a shared folder. The copy job on the secondary copies new backup files locally. The restore job on the secondary restores each one in sequence, each job running on its own independent schedule.

## Segment 3 (code: restore mode on the secondary)

The restore job uses one of two real modes. WITH NORECOVERY leaves the secondary inaccessible and ready for the next restore — right for a pure failover target. WITH STANDBY leaves it read-only and queryable between restores — right for a secondary that also serves reporting, at the cost of briefly disconnecting readers each time the next restore runs.

## Segment 4 (outro)

Because each job runs on its own schedule rather than streaming continuously, the secondary is realistically minutes behind the primary, not seconds. Next up: how to actually monitor that lag in a real environment.
