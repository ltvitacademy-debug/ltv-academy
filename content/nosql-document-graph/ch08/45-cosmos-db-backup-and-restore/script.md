# Script — Cosmos DB Backup & Restore

## Segment 1 (title)

SQL Server backup strategy comes down to full, differential, and log backups. Cosmos DB's story is simpler on the surface — backups are automatic — but the real decision is which of two backup modes a container uses, because it determines what kind of restore is actually possible.

## Segment 2 (steps: periodic backup, the default)

Periodic backup mode automatically takes full backups at a configurable interval, four hours by default, retaining a couple of the most recent ones. Restoring means restoring to one of those discrete snapshot points, into a new account, not an arbitrary moment in time.

## Segment 3 (code: continuous backup, real point-in-time restore)

Continuous backup mode backs up data as it changes, enabling point-in-time restore to any specific timestamp within the retention window — seven or thirty days depending on tier. That's the genuinely important distinction: any second, not just a handful of hours-apart snapshots.

## Segment 4 (outro)

Continuous backup matters most when you need to land precisely before an incident, like a bad deploy or an accidental bulk delete — periodic backup simply can't do that. Next up: tying distribution, consistency, and conflict resolution together into a real high-availability design.
