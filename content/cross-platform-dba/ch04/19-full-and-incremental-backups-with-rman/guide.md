# Full & Incremental Backups with RMAN

SQL Server's full/differential/log backup chain has a real RMAN analog, but the terminology
and mechanics don't map one-to-one. RMAN organizes backups by **level** — 0 is a baseline
that looks like a full backup, level 1 is incremental against it — and a separate feature,
**block change tracking**, is what makes incremental backups fast instead of just smaller.

## What you'll learn

- Real `BACKUP DATABASE` and `BACKUP INCREMENTAL LEVEL 0/1` syntax
- The difference between differential and cumulative level 1 backups
- What block change tracking does and why you'd enable it

## A full backup, and an incremental level 0, are almost the same thing

```
RMAN> BACKUP DATABASE PLUS ARCHIVELOG;
```

A plain `BACKUP DATABASE` is a full backup — every used block, once, not part of any
incremental strategy. An **incremental level 0** backup:

```
RMAN> BACKUP INCREMENTAL LEVEL 0 DATABASE;
```

...is physically identical to a full backup (every used block is backed up), but it's
*registered* as level 0 — meaning it can serve as the baseline that a later level 1
incremental backs up changes against. If you plan to use incrementals at all, start the
strategy with a level 0, not a plain full backup, so RMAN has a proper baseline on record.

## Level 1 backs up only the blocks that changed

```
RMAN> BACKUP INCREMENTAL LEVEL 1 DATABASE;
```

A level 1 backup only writes blocks changed since the reference point — dramatically smaller
and faster than a full backup on a large, mostly-static database. RMAN supports two flavors
of level 1:

- **Differential (the default)** — blocks changed since the most recent level 0 *or* level 1,
  whichever is more recent. Smallest, fastest, but a restore may need to apply several
  differential backups in sequence.
- **Cumulative** — `BACKUP INCREMENTAL LEVEL 1 CUMULATIVE DATABASE;` — blocks changed since the
  most recent level 0, regardless of any level 1s taken since. Larger than a differential, but
  a restore only ever needs the level 0 plus the *one* most recent cumulative — fewer pieces to
  apply, at the cost of more space and time per backup.

A common real schedule: level 0 weekly, cumulative level 1 nightly — bounding restore
complexity to "the weekly baseline plus last night's cumulative" without the differential
chain's multi-file restore.

## Block change tracking makes incrementals fast, not just smaller

Without help, RMAN has to *read every block* of the database to figure out which ones changed
since the last backup — the incremental backup is smaller on disk, but building it still scans
everything. **Block change tracking (BCT)** fixes this by maintaining a small file that
records which blocks have changed since the last backup, so RMAN can go straight to the
changed blocks instead of scanning the whole database:

```sql
ALTER DATABASE ENABLE BLOCK CHANGE TRACKING
  USING FILE '/u01/app/oracle/oradata/orcl/bct.dbf';
```

With BCT enabled, an incremental backup's *runtime* scales with how much data actually
changed, not with the size of the whole database — the real performance win, on top of the
storage savings incremental backups already provide.

## Key terms

| Term | Meaning |
|---|---|
| `BACKUP DATABASE` | A plain full backup, not registered as part of an incremental strategy |
| Level 0 | An incremental backup that is physically a full backup, but usable as a baseline |
| Level 1 differential | Blocks changed since the most recent level 0 or level 1 (RMAN's default) |
| Level 1 cumulative | Blocks changed since the most recent level 0, regardless of level 1s since |
| Block Change Tracking (BCT) | A tracking file letting RMAN skip straight to changed blocks instead of scanning everything |
| `BACKUP AS COMPRESSED BACKUPSET` | Option to compress the backup set during creation |

## Check yourself

Your team takes a level 0 backup every Sunday. You need restores to require applying at most
two backup sets (the level 0 plus one more), regardless of which day this week something goes
wrong. Should the nightly incrementals be differential or cumulative, and why?
