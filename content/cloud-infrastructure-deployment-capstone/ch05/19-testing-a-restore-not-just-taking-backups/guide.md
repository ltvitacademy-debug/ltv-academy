# Lesson 19 — Testing a Restore, Not Just Taking Backups

**Chapter 5 · Backup & Disaster Recovery Basics · Lesson 19 of 32**

## What you'll learn

- Why a backup that has **never been test-restored** is not actually a verified backup — just an
  unverified claim that one exists
- A real, common failure pattern: discovering a backup is corrupted or incomplete only at the
  moment you desperately need it, when it's too late to fix
- What a **restore test** actually involves, and how often it needs to happen
- How to tell the difference between "the backup job completed successfully" and "the data can
  actually be restored"

## The backup job succeeding is not the same as the backup working

Azure Backup and AWS Backup will both happily report a backup job as "completed successfully"
for years. That status means the backup **process** ran without error — it does not mean the
resulting backup can actually be restored into a working system. A backup can be incomplete,
corrupted, missing a dependency it needs to restore cleanly, or simply restoring into a
configuration that no longer matches production, and the nightly job will keep reporting success
every single night regardless, because nothing in that job checks whether a restore from it would
actually work. The only way to know a backup is good is to actually restore from it and confirm
the result is usable — everything short of that is an assumption, not a verified fact.

## The real failure pattern this prevents

This isn't a hypothetical. A genuinely common real-world disaster-recovery failure looks exactly
like this: an organization has been taking backups faithfully for months or years, a real outage
or data-loss event finally happens, someone goes to restore from the backup — and discovers, at
the worst possible moment, that the backup is corrupted, incomplete, or was quietly failing in a
way that never showed up as a visible error. The backup existed. The job logs said success. The
data still wasn't recoverable. The damage from that kind of discovery is almost always worse than
the original incident, because now there's an outage **and** no working safety net, and everyone
finds out at the same time, under pressure, with no time to fix it properly.

```text
What the job log shows:        "Backup completed successfully." ✓  (every night, for a year)

What a restore test would have shown:
  Attempt restore to a test VM/resource  -> fails: snapshot missing a dependency
  Attempt restore to a test VM/resource  -> fails: restored data is 6 months stale
  Attempt restore to a test VM/resource  -> succeeds, data verified correct

Only the restore test tells you which of these you actually have.
```

## What a restore test actually is

A **restore test** means periodically — on a real schedule, not "whenever someone remembers" —
actually restoring a backup into a real (usually non-production) environment and verifying the
result: does the system come up, does the data look correct and current, does anything depend on
a configuration or secret that didn't get captured in the backup. This doesn't need to happen for
every single backup every single day, but it needs to happen on a defined cadence (quarterly is a
common baseline for a smaller environment) and after any significant change to what's being
backed up, because a restore process that worked against last year's configuration isn't
guaranteed to still work against this year's.

## Making restore testing an actual practice, not a one-time event

The reason this gets its own lesson, separate from configuring the backup policy itself, is that
teams reliably do the first half (configure backups, watch them report success) and skip the
second half (prove a restore actually works) — because the first half is a one-time setup task
and the second half is ongoing discipline that has no urgency until the day it's suddenly the
only thing that matters. Treating restore testing as a recurring, scheduled task — the same way
monitoring alerts from Chapter 4 are a recurring, scheduled concern — is what turns "we have
backups" into "we have a backup that we know works."

## Key terms

| Term | Meaning |
|---|---|
| Restore test | Actually restoring a backup into a real environment and verifying the result works |
| Backup job success | Confirms the backup process ran without error — not that the data can be restored |
| Silent backup failure | A backup that's incomplete or corrupted without ever producing a visible error |
| Restore cadence | A defined, recurring schedule for restore testing, not an ad hoc or one-time check |

## Check yourself

You're ready for Lesson 20 when you can explain, without looking: why can a backup job report
"completed successfully" every night for a year while the underlying backup is actually
unusable?
