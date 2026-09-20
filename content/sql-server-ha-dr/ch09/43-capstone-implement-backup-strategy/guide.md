# Capstone: Implement the Backup Strategy

Lesson 42 set the scene: Bellhaven Freight Systems, BellhavenOLTP, a 5-minute RPO, and a decision
to build AG_Bellhaven across three replicas. Before touching the Availability Group itself, this
lesson applies Chapter 1's backup strategy design to this exact environment — because an AG
protects against server and site loss, but it is not a backup, and it does nothing to protect
against a dropped table, a bad update, or corruption that replicates to every replica just as
fast as the good data does. Bellhaven still needs a real, restorable backup chain.

## What you'll learn

- How a 5-minute RPO translates directly into a log backup frequency
- Why a database inside an Availability Group changes *where* backups can run, not *whether*
  they're needed
- The real full/differential/log schedule built for BellhavenOLTP

## Turning the RPO into a schedule

Chapter 1 (Lesson 2) covered the general shape of a full/differential/log strategy. The specific
number that drives it here is Bellhaven's stated RPO: **no more than 5 minutes of data lost**.
A log backup is the only backup type that bounds data loss directly — whatever's in the log since
the last log backup is what's at risk — so the schedule starts there and builds outward:

- **Full backup** — nightly at 1:00 AM, when dispatch volume is lowest
- **Differential backup** — every 6 hours (7 AM, 1 PM, 7 PM), to keep worst-case restore time
  down without the overhead of a full backup that often
- **Log backup — every 5 minutes**, continuously, matching the RPO exactly

```sql
-- Full backup — COPY_ONLY so it doesn't disturb the AG's own backup chain assumptions
BACKUP DATABASE BellhavenOLTP
TO DISK = N'\\SQLBKP01\Backups\BellhavenOLTP\Full\BellhavenOLTP_Full.bak'
WITH COPY_ONLY, COMPRESSION, CHECKSUM, STATS = 10;

-- Differential backup — every 6 hours
BACKUP DATABASE BellhavenOLTP
TO DISK = N'\\SQLBKP01\Backups\BellhavenOLTP\Diff\BellhavenOLTP_Diff.bak'
WITH DIFFERENTIAL, COMPRESSION, CHECKSUM, STATS = 10;

-- Log backup — every 5 minutes
BACKUP LOG BellhavenOLTP
TO DISK = N'\\SQLBKP01\Backups\BellhavenOLTP\Log\BellhavenOLTP_Log.trn'
WITH COMPRESSION, CHECKSUM;
```

## Why `COPY_ONLY` matters once an AG exists

Once BellhavenOLTP is inside AG_Bellhaven (Lesson 44 builds this), the full backup is marked
`COPY_ONLY` deliberately. A normal full backup resets the differential base and can be taken on
any replica the AG's backup preference points to — but only `COPY_ONLY` full backups and log
backups are supported on **secondary** replicas at all. Differential backups are not supported on
a secondary, because the differential bitmap that tracks "changed since the last full" isn't
something a secondary can maintain on its own. That's a real, deliberate limitation of Always On
Availability Groups, not an oversight — and it's why Bellhaven's schedule splits by replica:

- Full backup (`COPY_ONLY`) → runs on **SQLPRD02** (the synchronous secondary), offloading the
  I/O from the primary
- Differential backup → runs on **SQLPRD01** (the primary) — the only place it's supported
- Log backup → runs wherever `AUTOMATED_BACKUP_PREFERENCE` designates, checked at the start of
  each job with `sys.fn_hadr_backup_is_preferred_replica`

```sql
-- Inside the log backup job step, so only the correct replica actually runs it
IF (SELECT sys.fn_hadr_backup_is_preferred_replica('BellhavenOLTP')) = 1
BEGIN
    BACKUP LOG BellhavenOLTP
    TO DISK = N'\\SQLBKP01\Backups\BellhavenOLTP\Log\BellhavenOLTP_Log.trn'
    WITH COMPRESSION, CHECKSUM;
END
```

## What this schedule actually buys Bellhaven

With a full backup nightly, a differential every 6 hours, and a log backup every 5 minutes,
the worst case for a corruption or deletion event that an AG would faithfully replicate everywhere
is: restore last night's full, the last differential, and every log backup since — a maximum of
5 minutes of data at risk, matching the stated RPO precisely, and a bounded, known restore chain
rather than an open-ended one.

## Key terms

| Term | Meaning |
|---|---|
| `COPY_ONLY` | A full backup that doesn't reset the differential base — required for full backups on a secondary replica |
| `sys.fn_hadr_backup_is_preferred_replica` | Function a backup job checks so only the AG's designated replica actually runs the scheduled backup |
| `AUTOMATED_BACKUP_PREFERENCE` | AG-level setting controlling which replica type backup jobs should prefer |
| 5-minute log backup | The specific interval chosen to match Bellhaven's stated 5-minute RPO |

## Check yourself

A teammate suggests running the differential backup on SQLDR01 (the asynchronous DR replica) to
save load on the primary. Why won't that work, per what Always On actually supports on secondary
replicas?
