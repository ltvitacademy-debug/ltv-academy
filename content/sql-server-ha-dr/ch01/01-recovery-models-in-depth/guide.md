# Recovery Models, in Depth

SQL Server Database Administration covered the three recovery models at a basic level —
SIMPLE, FULL, BULK_LOGGED, and the syntax to set them. This course goes deeper: this
course is where recovery models stop being a database property you set once and become
the foundation every backup strategy, restore scenario, and HA/DR design in the next
eight chapters is built on top of.

## What you'll learn

- Why the recovery model is really a decision about the transaction log, not the data file
- What each model actually promises and costs
- Why almost every production database that matters runs FULL

## The recovery model is a log-management decision

Every recovery model answers the same underlying question: **what happens to the
transaction log after a transaction commits, and how much of that log does SQL Server
keep around?** The data file behaves identically regardless of recovery model — the
model changes only how much log history survives, and therefore what kinds of restore are
possible later.

## The three models, precisely

- **SIMPLE** — the log is truncated automatically after each checkpoint. Nothing beyond
  the current state is recoverable; you can restore to your last full or differential
  backup, and nothing more recent. No log backups are possible in this model at all.
- **FULL** — the log is never truncated automatically; it grows until a log backup
  explicitly backs up and truncates it. This is what makes **point-in-time recovery**
  possible: restoring to any specific moment between backups, not just to a backup's own
  timestamp.
- **BULK_LOGGED** — behaves like FULL for most operations, but minimally logs certain
  bulk operations (`BULK INSERT`, index rebuilds, `SELECT INTO`) for performance. The
  tradeoff: if a disaster happens during or shortly after a bulk operation, point-in-time
  recovery through that operation isn't guaranteed — you may only be able to restore to
  the end of the log backup that contains it, not to an arbitrary point inside it.

## Why FULL is the default assumption for this course

Every restore scenario in Chapter 2, and nearly every HA/DR technology in Chapters 3
through 7, depends on log backups existing and being restorable in sequence — Always On
Availability Groups, log shipping, and database mirroring all replicate or ship the
transaction log itself. None of that works under SIMPLE, where there's no log backup to
ship or replicate. Unless a database is genuinely disposable or fully rebuildable from
another source, this course assumes FULL is the real answer, and treats SIMPLE as a
deliberate, narrow exception rather than a safe default.

## The real cost of getting this wrong

A database left on SIMPLE that was supposed to support point-in-time recovery isn't a
theoretical gap — it's the specific, common failure mode where a team discovers, during
an actual incident, that they can only restore to last night's full backup and lose
everything since. Checking `sys.databases.recovery_model_desc` against what a database
actually needs is the first, cheapest verification step in this entire course.

## Key terms

| Term | Meaning |
|---|---|
| Recovery model | Database setting controlling transaction log retention and truncation behavior |
| Point-in-time recovery | Restoring to any specific moment, not just a backup's own timestamp — requires FULL |
| Minimally logged operation | A bulk operation logged just enough to undo, not enough for point-in-time recovery through it |
| `sys.databases.recovery_model_desc` | The column that reports a database's actual current recovery model |

## Check yourself

A database is set to SIMPLE recovery. A stakeholder asks for the ability to restore to
"any point in the last 24 hours" after a mistake. Is that promise achievable under SIMPLE
— and if not, what has to change first?
