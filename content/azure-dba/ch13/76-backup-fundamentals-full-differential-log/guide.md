# Lesson 76 — SQL Server Backup Fundamentals: Full, Differential & Log

**Chapter 13 · Backup & Restore · Lesson 76 of 95**

## What you'll learn

- The three backup types SQL Server actually gives you, and what each one captures
- Why a differential backup only makes sense relative to a full backup
- Why a log backup is the one that gives you point-in-time recovery, not just a copy of the data
- The real restore-chain implication: which backups you need, and in what order, to get a database back

## The three backup types

SQL Server backs up at three levels, and a DBA's whole restore strategy is
built on knowing exactly what each one contains:

| Backup type | Captures | Depends on |
|---|---|---|
| Full | Every page of the database, at the moment the backup ran | Nothing — it's a complete copy |
| Differential | Every page that changed since the **last full backup** | The most recent full backup |
| Log (transaction log) | Every transaction recorded since the **last log backup** | An unbroken chain of prior log backups |

Notice what differential does *not* do: it isn't "changes since the last
differential." It's always relative to the last full. Run a full backup on
Sunday, then differentials every night — Monday's differential captures
everything changed since Sunday, Tuesday's differential captures everything
changed since Sunday too (not since Monday). Each differential grows through
the week until the next full resets it.

## Why log backups are different in kind

Full and differential backups are both snapshots of *data pages*. A log
backup is a snapshot of *transactions* — the record of every insert, update,
and delete since the last log backup, in order. That's what makes log
backups the only ones that give you point-in-time recovery: you can restore
a full backup, then replay log backups up to any exact second in between,
not just to the moment a backup happened to run.

This is also why log backups are the one type that must run continuously in
production — hourly, every 15 minutes, whatever your recovery point
objective demands — while full and differential backups run on a much
coarser schedule (nightly, weekly).

## The restore-chain implication

This is the part that trips people up in an actual outage: restoring a
database is not "restore the most recent backup." It's restoring a *chain*,
in a specific order:

1. Restore the **last full backup**
2. Restore the **most recent differential backup** taken after that full (if any)
3. Restore **every log backup**, in order, from immediately after that
   differential up through the point you want to recover to

Skip a log backup in that chain, or restore them out of order, and the
chain breaks — you cannot restore log backup #47 without first restoring
#46. This is the single most common real-world backup failure: not that no
backup existed, but that a link in the chain was missing when it was
needed.

```
Sun 2am: FULL          <- base of the chain
Mon 2am: DIFF           (everything since Sunday's full)
Mon-Fri, hourly: LOG    (every transaction since the last log)
                         Restore = FULL + latest DIFF + every LOG since
```

## Key terms

| Term | Meaning |
|---|---|
| Full backup | A complete copy of every page in the database |
| Differential backup | Pages changed since the last full backup (not the last differential) |
| Log (transaction log) backup | Transactions recorded since the last log backup — enables point-in-time recovery |
| Restore chain | The ordered sequence — full, then latest differential, then every log — needed to restore |
| Recovery point objective (RPO) | How much data loss is acceptable; drives how often you take log backups |

## Check yourself

You're ready for Lesson 77 when you can explain, without looking: why is a
differential backup always relative to the last full backup rather than the
last differential, and why does skipping one log backup in the middle of a
restore chain break the whole restore?
