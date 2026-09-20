# Script — RESTORE Fundamentals

## Segment 1 (title)

Backup only matters if you can get the data back. Restore database is the statement that does it, and the option that trips up more DBAs than any other is whether to bring the database online immediately, or leave it waiting for more backups to apply.

## Segment 2 (code: step one of a restore sequence)

Restoring a full backup with norecovery writes its pages back into the database's files, but leaves the database in a restoring state. It's not usable yet — it's still expecting more backups, like a differential or a log file, to be applied on top.

## Segment 3 (code: relocating files with MOVE)

Restoring to a different server usually means the original file paths don't exist on the target. Restore filelistonly reads the backup header and gives you the logical file names. Feed those into the move clause to relocate the data and log files to wherever they actually belong on the new server.

## Segment 4 (steps: NORECOVERY vs RECOVERY)

The rule of thumb: norecovery on every restore step except the last one, recovery only on the final step. Recovery rolls back uncommitted transactions and brings the database online — but once you do that, you can't restore anything else on top without starting over from the full backup.

## Segment 5 (outro)

Get norecovery and recovery backwards and you either lock yourself out of the rest of the chain, or bring a half-restored database online too early. Next up: chaining full, differential, and log restores together, and restoring to an exact point in time.
