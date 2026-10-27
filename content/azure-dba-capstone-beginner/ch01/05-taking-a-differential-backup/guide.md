# Lesson 5 — Taking a Differential Backup

**Chapter 1 · Beginner Capstone: The First Backup Plan · Lesson 5 of 10**

## What you'll learn

- Why differential backups exist at all, once you already have automated full backups
- Confirming Overlook's differential backups are actually running, the same way you confirmed the full
- Why "smaller and faster" isn't just a performance detail — it's what makes frequent backups practical
- How the differential fits into the restore chain you sketched back in Lesson 2

## The same honest starting point as Lesson 4

Just like the full backup, you won't find a `BACKUP DATABASE ... WITH
DIFFERENTIAL` statement in this lesson either. Azure SQL Database takes
differential backups automatically, roughly every 12 to 24 hours, as part
of the same managed backup mechanism from Lesson 4. The question this
lesson answers isn't "how do I trigger one" — it's "why does this backup
type exist at all, and how do I know it's doing its job."

## Why a differential, when you already have a full

A full backup, taken roughly weekly, is Overlook's safety net — but a
database that takes real appointments and billing entries every business
day can't rely on a once-a-week snapshot alone. The differential backup is
what keeps the gap between "the last full backup" and "right now" small,
without the cost of taking a full backup constantly.

Recall from Lesson 2's planning: a differential captures everything
changed since the *last full backup*, not since the last differential. If
Azure's weekly full ran Sunday, Monday's differential captures Sunday
through Monday; Wednesday's differential captures Sunday through
Wednesday — each one growing, until the next full resets it. That's true
whether you're triggering it by hand on-prem or, as here, letting Azure
trigger it automatically.

## Why smaller and faster actually matters

A differential only copies pages that changed since the last full — for
Overlook's database, that's a small fraction of the total data most days.
That matters for two concrete reasons:

- **It's fast enough to run every 12-24 hours without a noticeable backup
  window** — a full backup at that frequency would be far more expensive
  for the amount of genuinely new data it captures each time.
- **It shortens the restore**, because applying one differential (however
  large it's grown since the last full) is still less work than reapplying
  every individual day's changes one log backup at a time all the way back
  to the full.

This is the direct payoff of the plan from Lesson 2: full weekly,
differential daily, log every 15 minutes — each type doing the job it's
actually suited for.

## Confirming it's running

There's no separate CLI query for "list my differential backups" the way
you might expect from on-prem `msdb` history — Azure SQL Database doesn't
expose that level of backup-job detail to the DBA, consistent with Lesson
4's PaaS trade-off. What you *can* confirm is that the overall backup chain
is healthy and current, the same way as Lesson 4:

```
az sql db show \
  --name db-overlook-core \
  --resource-group rg-overlook-dba-capstone \
  --server sql-overlook-capstone \
  --query earliestRestoreDate
```

If `earliestRestoreDate` stays current and the database's **Overview** page
in the Portal continues to show a healthy restore window, the full
+ differential + log chain underneath it is functioning — you don't need,
and don't get, a day-by-day differential job log to trust that.

## How this fits the restore chain

This is the same restore-chain logic from Lesson 2, now backed by a real
deployed database: when you eventually restore (Lesson 7), Azure applies
the most recent full backup, then the most recent differential taken after
it, then every log backup since — automatically, as one operation. You
never manually pick which differential to use; the platform's point-in-time
restore does that selection for you.

## Key terms

| Term | Meaning |
|---|---|
| Differential backup | Pages changed since the last full backup — not the last differential — taken automatically on Azure SQL Database |
| Backup window | The time a backup operation takes to run; differentials keep this short relative to a full |
| Restore chain | Full, then latest differential, then every log in order — Azure assembles this automatically during restore |

## Lab

Re-run the `earliestRestoreDate` check from Lesson 4 at least a day after
your database was deployed. Confirm the value has moved forward in time,
which is indirect but real evidence that differential and log backups have
continued running underneath it since you last checked.

## Check yourself

You're ready for Lesson 6 when you can explain, without looking: why does a
differential backup stay cheap even as it grows larger each day until the
next full, and why can't you query a day-by-day differential job history on
Azure SQL Database the way you could with on-prem `msdb`?
