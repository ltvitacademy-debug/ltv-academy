# Full/Differential/Log Backup Strategy Design

Lesson 1 established that FULL recovery is the default assumption for this course because
it's what makes a log backup chain possible. This lesson is about actually designing that
chain: deciding how often to run full, differential, and log backups so the restore chain
stays short and the RPO a business actually needs is achievable — not guessing at a schedule
and hoping it holds up during a real incident.

## What you'll learn

- How database size and change rate drive full backup frequency
- Why differential backups exist and how they shorten the restore chain
- How log backup frequency is really an RPO decision, not a convenience
- The real overhead/RPO tradeoff behind every choice in this lesson

## Full backups: the baseline, sized to the database

A full backup is the only backup type that can restore a database on its own — every other
backup type restores *on top of* a full backup. That makes full backup frequency the first
decision in any strategy:

```sql
BACKUP DATABASE Sales
TO DISK = N'D:\Backup\Sales_Full.bak'
WITH INIT, STATS = 10;
```

How often this needs to run depends on the database, not a fixed rule:

- A small, low-change-rate database (a few GB, mostly reference data) can often run a full
  backup **nightly** with negligible overhead — there's no reason not to keep the chain
  simple.
- A large, high-change-rate database (hundreds of GB, heavy OLTP writes) may only be able to
  afford a full backup **weekly**, because a nightly full would compete with production I/O
  for hours. Differential and log backups fill the gap between full backups here.

## Differential backups: shortening the chain between fulls

A differential backup captures every extent changed since the *last full backup* — not since
the last differential. That single fact is what makes differentials useful:

```sql
BACKUP DATABASE Sales
TO DISK = N'D:\Backup\Sales_Diff.bak'
WITH DIFFERENTIAL, STATS = 10;
```

Without differentials, restoring a database backed up weekly with only log backups in
between means applying *every log backup since the last full* — potentially dozens of log
files, each one a chance for something to go wrong. Adding a nightly differential means the
worst-case restore chain is: last full, one differential, and only the log backups taken
*since that differential* — often just a few hours' worth instead of a week's worth.

## Log backups: frequency is an RPO decision

Under FULL recovery, log backups are what make point-in-time recovery possible — and how
often they run directly sets the **Recovery Point Objective (RPO)**: the maximum acceptable
amount of data loss, measured in time.

```sql
BACKUP LOG Sales
TO DISK = N'D:\Backup\Sales_Log.trn'
WITH STATS = 10;
```

- Log backups every **15 minutes** mean the worst-case data loss in a disaster is 15 minutes
  of transactions — an RPO of 15 minutes.
- Log backups every **hour** mean up to an hour of data loss is acceptable — a much looser
  RPO, but a lot less backup overhead.

There's no universally correct interval — it's whatever RPO the business actually stated,
translated directly into a schedule.

## The real tradeoff: overhead versus RPO and restore-chain length

Every choice in this lesson trades in the same currency. More frequent backups of any type
mean:

- **More overhead** — I/O, CPU, and storage consumed by the backup itself, competing with
  production workload.
- **Tighter RPO** — less data lost in a worst-case disaster.
- **Shorter, safer restore chains** — fewer backup files to apply correctly, in order,
  during a stressful restore.

A strategy is "correct" when it matches the stated RPO at a cost the system and the storage
budget can actually absorb — not when it maximizes backup frequency for its own sake.

## Key terms

| Term | Meaning |
|---|---|
| Full backup | Complete, standalone backup of the database — every restore chain starts here |
| Differential backup | Captures changes since the *last full backup*, shortening the chain between fulls |
| RPO (Recovery Point Objective) | Maximum acceptable data loss, measured in time — set directly by log backup frequency |
| Restore chain | The ordered sequence of backups (full, then optional differential, then logs) applied to reach a target point |

## Check yourself

A 400 GB OLTP database runs a full backup weekly and a differential nightly, but no log
backups at all. The business says its RPO is 30 minutes. Is the current strategy meeting
that RPO, and if not, what's missing?
