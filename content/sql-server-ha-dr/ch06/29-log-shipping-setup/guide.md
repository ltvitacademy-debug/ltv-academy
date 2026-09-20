# Log Shipping Setup

Chapter 5 covered Failover Clustering — instance-level protection against node failure.
This chapter turns to a different, older, and much simpler class of technology: shipping
transaction log backups from one server to another. **Log shipping** is not trying to be a
high-availability solution in the AG or FCI sense; it's a straightforward, durable way to
keep a secondary copy of a database reasonably current, and it's still a real, supported,
legitimately-deployed SQL Server feature. This lesson covers what it's actually built from.

## What you'll learn

- The three real jobs that make up log shipping
- The real restore modes on the secondary (STANDBY vs. NORECOVERY)
- Why log shipping's latency is measured in minutes, not seconds

## Three jobs, one chain

Log shipping is built from three SQL Server Agent jobs, each doing one job in a chain:

1. **Backup job (on the primary)** — runs on a schedule (commonly every 5–15 minutes) and
   takes a transaction log backup of the source database, writing it to a shared network
   folder.
2. **Copy job (on the secondary)** — runs on its own schedule and copies any new log backup
   files from that shared folder to a local folder on the secondary server.
3. **Restore job (on the secondary)** — runs on its own schedule and restores each copied
   log backup, in sequence, onto the secondary copy of the database.

Each job runs independently on its own schedule, which is exactly why log shipping is
resilient to transient network hiccups between the primary and secondary — the copy job
just catches up on the next run.

## The restore mode choice: STANDBY vs. NORECOVERY

The restore job on the secondary restores each log backup using one of two real modes:

- **`RESTORE ... WITH NORECOVERY`** — the secondary database stays in a restoring state,
  completely inaccessible for querying, ready to accept the next log restore immediately.
  This is the right choice when the secondary exists purely to fail over to.
- **`RESTORE ... WITH STANDBY`** — the secondary database is left in a read-only state
  between restores, so it can actually be queried in between log restores. This is the
  right choice for a secondary that also serves as a reporting or offload copy, at the cost
  of briefly disconnecting any active readers each time the next log restore needs to run.

## Real latency: minutes, not seconds

Because each of the three jobs runs on its own schedule rather than continuously streaming
changes, log shipping's secondary is realistically **minutes behind** the primary — however
frequently the backup/copy/restore schedule is set to run, plus the time each step
actually takes. This is fundamentally different from an Availability Group's synchronous
replica, which can be seconds behind or fully caught up by design. Log shipping was never
built to compete with that; it's a durable, low-complexity way to keep a usable copy
around, not a real-time failover mechanism.

## Key terms

| Term | Meaning |
|---|---|
| Backup job | Scheduled job on the primary that takes log backups and writes them to a shared folder |
| Copy job | Scheduled job on the secondary that copies new log backup files locally |
| Restore job | Scheduled job on the secondary that restores each copied log backup in sequence |
| `WITH NORECOVERY` | Restore mode leaving the secondary inaccessible, ready for the next log restore |
| `WITH STANDBY` | Restore mode leaving the secondary read-only and queryable between restores |

## Check yourself

A team wants their log shipping secondary to also serve ad-hoc reporting queries between
log restores. Which restore mode should the restore job use, and what's the real tradeoff
of that choice?
