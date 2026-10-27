# Lesson 2 — Planning the Backup Strategy

**Chapter 1 · Beginner Capstone: The First Backup Plan · Lesson 2 of 10**

## What you'll learn

- Why a real backup strategy is three backup types working together, not "more backups = better"
- What each type — full, differential, log — actually captures, in plain English
- A sensible schedule for Overlook's database, and the reasoning behind it
- The restore-chain consequence of the schedule you pick, before you've restored anything

## Before any T-SQL: write the plan on paper

It's tempting to open SSMS and start running `BACKUP DATABASE` statements.
Resist that for one more lesson. A backup strategy is a decision about
*trade-offs* — how much data you're willing to lose, how long a restore is
allowed to take, and how much storage and backup-window time you're willing
to spend — and those decisions are easier to get right in plain English,
on paper, before any code exists to defend.

## The three backup types, and what each one is actually for

| Backup type | Captures | Answers the question |
|---|---|---|
| Full | Every page of the database, at the moment it runs | "What did the whole database look like at 2am?" |
| Differential | Every page changed since the last full backup | "What's changed since the last full, without re-copying everything?" |
| Log (transaction log) | Every transaction since the last log backup | "Can I recover to the exact minute before something went wrong?" |

A full backup alone could technically keep Overlook safe — restore the most
recent one and you're back to however it looked at that backup's run time.
But "however it looked at 2am" is a bad answer for a patient-scheduling
database that takes appointments all day. If something goes wrong at 4pm,
restoring only last night's full backup throws away fourteen hours of real
appointments and billing entries. That gap is exactly what differential and
log backups exist to close.

## Why not just take more full backups, more often?

This is the natural follow-up question, and it has a real, concrete answer:
a full backup copies *every page*, every time, regardless of how little
changed. Running one every hour against Overlook's database would mean
redoing the same multi-gigabyte copy sixteen times a day for a few hours of
real new data each time — slow, and wasteful of storage. A differential
backup only copies pages that changed since the last full, so it's smaller
and faster to take *and* to restore, right up until the next full backup
resets it. A log backup is smaller still — it's not even full data pages,
just the record of transactions — which is exactly what makes it light
enough to run every few minutes without disrupting the system.

## Planning Overlook's schedule

Overlook's database is a single, moderately active system — real patient
appointments and billing activity happen throughout the business day. A
sensible, honest starting schedule:

| Backup type | Schedule | Reasoning |
|---|---|---|
| Full | Weekly (Sunday) | Base of the restore chain; the expensive one, so it runs when traffic is lowest |
| Differential | Daily | Keeps the "replay from here" gap to at most a day, without the cost of a daily full |
| Log | Every 15 minutes during business hours | Caps acceptable data loss (RPO) at 15 minutes — reasonable for appointment/billing data, not so frequent it adds meaningful overhead |

Visualized as a timeline:

```
Sun 2am:  FULL                      <- base of the chain
Mon 2am:  DIFF  (everything since Sunday's full)
Tue 2am:  DIFF  (everything since Sunday's full, not Monday's diff)
...
Daily, every 15 min (9am-5pm): LOG  (every transaction since the last log)

Restore = latest FULL + latest DIFF + every LOG since that DIFF
```

Notice this is the same restore-chain logic from the real T-SQL backup
lessons you've already seen in the Azure DBA course: a differential is
always relative to the *last full*, not the last differential, and the log
chain must be applied in order with none skipped.

## Why this is a reasonable RPO/RTO trade-off, not an arbitrary one

Two terms are worth being precise about before you build anything:

- **Recovery point objective (RPO)** — how much data could you lose? A
  15-minute log backup interval means, worst case, Overlook loses up to 15
  minutes of appointments or billing entries in an outage. That's a
  deliberate choice, not an accident.
- **Recovery time objective (RTO)** — how long can a restore take? A weekly
  full plus daily differential keeps the restore chain short (at most: one
  full, one differential, and up to a day's worth of 15-minute logs) — long
  enough to be real, short enough to actually finish during an incident.

A plan that backed up less often would be cheaper but risk losing more data
and taking longer to restore. A plan that backed up constantly would waste
storage and backup-window time for a database that doesn't need
second-by-second protection. This schedule is the honest middle, justified
by what Overlook's database actually does.

## Key terms

| Term | Meaning |
|---|---|
| Backup strategy | The combination of backup types and schedule chosen to meet a specific RPO/RTO, not just "turn on backups" |
| Recovery point objective (RPO) | The maximum acceptable data loss, measured in time |
| Recovery time objective (RTO) | The maximum acceptable time to complete a restore |
| Restore chain | The ordered sequence — full, then latest differential, then every log in order — required to restore |

## Lab

Sketch Overlook's restore chain for a hypothetical outage at 2:40pm on a
Wednesday: which full backup, which differential, and which log backups
would you need, in order, to restore up to 2:35pm? Write it out as a short
list before moving on to Lesson 3.

## Check yourself

You're ready for Lesson 3 when you can explain, without looking: why does a
differential backup get smaller and faster relative to a full, and why
would running full backups hourly be a bad plan for a database like
Overlook's even though it would technically work?
