# Recovery Models

The recovery model is arguably the single most consequential database option a DBA sets,
because it determines what you can and cannot recover after data loss. Get it wrong and
you find out during an outage, not before. There are exactly three models, and each one
trades logging overhead against recovery capability differently.

## What you'll learn

- What each of the three recovery models actually does to the transaction log
- Why only one of them supports point-in-time recovery
- How to check and change a database's recovery model

## SIMPLE: no log backups, no point-in-time recovery

In `SIMPLE` recovery, the transaction log is automatically truncated (its space reused)
after every checkpoint, once the transactions in it are no longer needed for crash
recovery. There's no log backup to take, because there's effectively no log to back up —
it never grows to hold history. The tradeoff: you can only restore to the point of your
last full or differential backup. Anything since then is gone. `SIMPLE` also permits
minimally-logged bulk operations, which is why bulk loads run fast in this model.

## FULL: everything logged, point-in-time recovery

In `FULL` recovery, the log retains every transaction until a log backup runs and
truncates it. This is what makes point-in-time recovery possible: with a chain of full,
differential, and log backups, you can restore to any specific moment — right up to the
point just before a bad `DELETE` ran, for example. The cost is that you *must* take regular
log backups, or the log file grows without bound. `FULL` is the standard choice for any
production database where losing recent transactions is unacceptable.

## BULK_LOGGED: FULL's faster, riskier cousin

`BULK_LOGGED` behaves like `FULL` for ordinary transactions, but minimally logs certain
bulk operations — `BULK INSERT`, `SELECT INTO`, index rebuilds — for a large performance
win during those operations. The tradeoff: if a log backup's time window contains a
minimally-logged operation, you cannot point-in-time restore into that window; you can
only recover to the end of that log backup. Many shops switch to `BULK_LOGGED` briefly
during a big load, then switch back to `FULL` and take a log backup immediately after.

## Checking and changing the model

```sql
SELECT name, recovery_model_desc FROM sys.databases WHERE name = 'Sales';

ALTER DATABASE Sales SET RECOVERY FULL;
```

Switching a database from `SIMPLE` to `FULL` doesn't give you point-in-time recovery
immediately — the log backup chain only starts from the next full backup you take.

## Key terms

| Term | Meaning |
|---|---|
| SIMPLE | Log auto-truncates after checkpoint; no log backups; no point-in-time recovery |
| FULL | Log retains all transactions until a log backup runs; enables point-in-time recovery |
| BULK_LOGGED | Like FULL, but minimally logs bulk operations; no point-in-time restore through them |
| Point-in-time recovery | Restoring a database to an exact moment using full + log backups |

## Check yourself

A database is in SIMPLE recovery and the server crashes at 2:15 PM. The last full backup
ran at midnight. What's the most recent point you can recover to, and what would you need
to change to do better next time?
