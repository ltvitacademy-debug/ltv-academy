# Script — DBCC CHECKDB, in Practice

## Segment 1 (title)

DBCC CHECKDB is the single most important integrity command in SQL Server, and one of the easiest to run wrong — by not running it often enough, or by drowning in noise that hides the one message that matters.

## Segment 2 (code: what it actually checks)

CHECKDB isn't one check — it's several run together: allocation consistency, that every page is claimed correctly; structural integrity, that tables and indexes are internally consistent; catalog consistency, that metadata matches what's on disk; and data purity, that column values actually fit their declared type.

## Segment 3 (code: running it for real)

In practice you run it with NO_INFOMSGS to suppress routine chatter so a clean run is silent, ALL_ERRORMSGS to make sure every error comes back, and DATA_PURITY to explicitly check column values — important on databases that trace back to very old SQL Server versions.

## Segment 4 (steps: where it belongs)

CHECKDB is I/O and CPU intensive on a large database, so it belongs in a scheduled maintenance window as an Agent job. Run with NO_INFOMSGS, a clean night produces no output at all — exactly what an unattended job should look like.

## Segment 5 (outro)

A clean CHECKDB is silent. When it isn't, you need to actually read what it's telling you. Next up: consistency errors.
