# Lesson 17 — RTO and RPO: What They Actually Mean for a Deployment

**Chapter 5 · Backup & Disaster Recovery Basics · Lesson 17 of 32**

## What you'll learn

- What **RTO (Recovery Time Objective)** actually measures: how long a system can be down before
  that downtime is unacceptable to the business
- What **RPO (Recovery Point Objective)** actually measures: how much data loss, measured in
  time, is acceptable if you have to restore from a backup
- Why these two numbers **drive** your backup frequency and strategy — not the other way around
- A worked example: what an RPO of 1 hour actually requires from your backup schedule

## RTO: how long can it stay down?

**Recovery Time Objective (RTO)** is the answer to one question: *if this system goes down right
now, how long do we have before that outage becomes genuinely unacceptable?* It's measured in
time — minutes, hours, or days — and it's a business decision, not a technical one. A customer-
facing checkout service might have an RTO of 15 minutes, because every minute it's down is lost
revenue and angry customers. An internal reporting dashboard that three analysts check once a
day might have an RTO of 24 hours, because nobody's actually blocked by it being down overnight.
The RTO doesn't come from what's technically convenient to build — it comes from asking the
people who depend on the system how much downtime they can actually tolerate, and then you build
toward that number.

## RPO: how much data can you afford to lose?

**Recovery Point Objective (RPO)** is a different question: *if we have to restore from a backup,
how much data are we willing to lose?* It's also measured in time, but it means something
different from RTO — an RPO of 1 hour means that if disaster strikes at 2:47 PM, you can accept
losing everything written since the last backup, as long as that backup is no older than 1 hour.
If your last backup ran at 2:00 PM, you've lost 47 minutes of data, and that's within budget. If
your last backup ran yesterday at midnight, you've lost almost 15 hours of data, and that's a
real problem the business never agreed to.

## The worked example: RPO drives backup frequency

This is the part that trips people up the first time: **an RPO of 1 hour doesn't mean "try to
back up around once an hour, roughly."** It means backups must run **at least every hour**, with
no exceptions, because any gap longer than that violates the RPO the business already signed off
on. A once-daily backup job cannot satisfy a 1-hour RPO — it structurally can't, no matter how
reliable that daily job is, because the worst-case data loss with a daily backup is a full day,
not an hour. This is why RTO and RPO have to be defined **before** you configure a single backup
policy in Azure Backup or AWS Backup: the numbers tell you the schedule, the schedule doesn't get
to tell you the numbers. A team that picks "nightly backups" first and calls that "our backup
strategy" has it backwards — they've picked a schedule with no idea what RPO it actually delivers.

```text
Business says:  "We can lose at most 1 hour of order data."
                  → RPO = 1 hour
Engineer's job:  Configure backups to run at least every 60 minutes.
                  A nightly-only schedule does NOT meet this RPO.

Business says:  "This service can be down for up to 4 hours before it's a crisis."
                  → RTO = 4 hours
Engineer's job:  Make sure a restore, from detection to the service being back up,
                  realistically completes inside 4 hours — including the time to
                  notice the outage and start the restore, not just the restore itself.
```

## RTO and RPO are not the same number

It's tempting to treat these as one combined "how bad can it get" number, but they measure
different failures. A system can have a tight RTO and a loose RPO — a static marketing website
might need to be back up in 10 minutes (tight RTO, because being down looks bad) but losing a
day of edits to its content doesn't really hurt anyone (loose RPO). Or the reverse: a nightly
batch job that nobody notices is down until morning can have a loose RTO, but if it's processing
financial transactions, the business might demand an RPO of minutes — no acceptable window for
lost transaction data, even if nobody's watching the dashboard at 2 AM. Setting both numbers
honestly, for the specific workload in front of you, is what the rest of this chapter's backup
policies and DR plan are built on top of.

## Key terms

| Term | Meaning |
|---|---|
| RTO (Recovery Time Objective) | How long a system can be down before that downtime is unacceptable, measured in time |
| RPO (Recovery Point Objective) | How much data loss is acceptable if restoring from backup, measured in time since the last good backup |
| Backup frequency | How often backups run — must be frequent enough to satisfy the RPO, not just "regular" |
| Restore time | How long it actually takes to bring a system back from a backup — must fit inside the RTO |

## Check yourself

You're ready for Lesson 18 when you can explain, without looking: why does an RPO of 1 hour rule
out a once-daily backup schedule, even if that daily job never fails?
