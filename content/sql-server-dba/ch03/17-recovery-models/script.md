# Script — Recovery Models

## Segment 1 (title)

The recovery model is arguably the single most consequential database option a DBA sets — it determines what you can and cannot recover after data loss. There are exactly three models.

## Segment 2 (steps: the three models)

SIMPLE auto-truncates the log after checkpoint, so there's no log backup and no point-in-time recovery. FULL retains every transaction until a log backup runs, enabling point-in-time recovery. BULK_LOGGED behaves like FULL but minimally logs bulk operations for speed, at the cost of point-in-time restore through that window.

## Segment 3 (code: checking and changing)

You check a database's model with sys.databases, and change it with ALTER DATABASE SET RECOVERY. Switching from SIMPLE to FULL doesn't give you point-in-time recovery immediately — the log backup chain only starts from the next full backup you take.

## Segment 4 (outro)

Get the recovery model wrong and you find out during an outage, not before. Next up: database-scoped configuration — MAXDOP and other settings that apply per database.
