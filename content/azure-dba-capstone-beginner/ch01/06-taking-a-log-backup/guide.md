# Lesson 6 — Taking a Log Backup

**Chapter 1 · Beginner Capstone: The First Backup Plan · Lesson 6 of 10**

## What you'll learn

- Why the log backup is a different kind of backup, not just a smaller or more frequent one
- How Azure's automatic 5-10 minute log backups are what actually make point-in-time restore possible
- The difference between a data-page snapshot and a transaction record, and why that distinction matters
- What this means for the specific restore scenario Lesson 7 is about to walk through

## Full and differential are both snapshots. A log backup isn't.

Full and differential backups both copy *data pages* — a photograph of what
the database's storage looks like at a moment in time. A transaction log
backup is categorically different: it's a record of every insert, update,
and delete since the last log backup, in the order they happened. That
distinction is the whole reason point-in-time recovery exists at all.
Restoring only full and differential backups can only put you back at a
moment one of them happened to run. Replaying log backups on top lets you
stop at *any* second in between.

For a healthcare provider's scheduling and billing database, that's not an
academic distinction. "Restore to last night's backup" might mean losing an
entire day of real appointments and payments. "Restore to 2:35pm, one
minute before the bad script ran" is a fundamentally different, much better
answer — and only the log backup chain makes that possible.

## Automatic, every 5-10 minutes

Consistent with Lessons 4 and 5, there's no `BACKUP LOG` statement to write
here either. Azure SQL Database takes transaction log backups
automatically, every 5 to 10 minutes, continuously:

| Backup type | Frequency | Who triggers it |
|---|---|---|
| Full | Roughly weekly | Azure, automatically |
| Differential | Roughly every 12-24 hours | Azure, automatically |
| Transaction log | Every 5-10 minutes | Azure, automatically |

This is noticeably tighter than the 15-minute log interval Lesson 2
planned by hand for an on-prem-style schedule — and that's a genuinely good
thing. Azure's default cadence gives Overlook's database an even smaller
realistic data-loss window (recovery point objective) than the original
plan called for, at no extra engineering cost, because the platform already
runs this frequently for every database by default.

## Why this one has to run so often

A log backup is small per run — it's transaction records, not full data
pages — which is exactly what makes a 5-10 minute cadence practical. Running
a full or differential backup that often would be wasteful and disruptive;
running the log backup that often is cheap, and it's what keeps the
restorable window granular enough to matter in a real incident. This is the
same reasoning from Lesson 2, just confirming it holds at the platform's
actual (tighter) default frequency.

## What this sets up for Lesson 7

Right now, underneath Overlook's database, Azure already has everything it
needs to restore to nearly any point in the last several minutes: the most
recent full, the most recent differential since that full, and an unbroken
chain of log backups since that differential. Lesson 7 is where you
actually use that chain — picking a specific point in time and watching
Azure assemble the restore from these three backup types automatically, the
same restore-chain logic from Lesson 2, now proven for real rather than
just planned on paper.

## Key terms

| Term | Meaning |
|---|---|
| Transaction log backup | A record of every transaction since the last log backup — not a data-page snapshot |
| Point-in-time recovery | The ability to restore to any moment within the retention window, made possible specifically by the log backup chain |
| Recovery point objective (RPO) | The maximum acceptable data loss; Azure's 5-10 minute log cadence sets this tighter than Lesson 2's original 15-minute plan |

## Lab

Write, in one or two sentences, why "restore to last night's full backup"
and "restore to 2:35pm this afternoon" require fundamentally different
backup types underneath them — name which type makes the second one
possible and why.

## Check yourself

You're ready for Lesson 7 when you can explain, without looking: what makes
a log backup a different *kind* of backup rather than just a smaller,
more-frequent one, and why does that difference matter for a healthcare
scheduling and billing database specifically?
