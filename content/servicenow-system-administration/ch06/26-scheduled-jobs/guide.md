# Lesson 26 — Scheduled Jobs

**Chapter 6 · System Properties, Scheduled Jobs & Logs · Lesson 26 of 36**

## What you'll learn

- What a Scheduled Job is and where it lives (the `sysauto_script` table)
- The real schedule options a job can run on
- Three out-of-box scheduled jobs worth recognizing by name and purpose
- The real distinction between a Scheduled Job and a Business Rule
- Where to check a job's run history and next run time as an admin

## A job that runs on a clock, not an event

A Scheduled Job is a piece of server-side logic stored in the `sysauto_script` table that runs on a defined schedule, independent of anything happening to any particular record. Where a Business Rule wakes up because someone inserted, updated, or deleted a specific record, a Scheduled Job wakes up because the clock says it's time — and when it does, it typically doesn't care about just one record. It's built to sweep across many records at once, doing whatever maintenance or recalculation its logic defines.

## Real schedule options

When you open a Scheduled Job record, the "Run" field gives you real choices for how often it fires: a specific time once a day ("Daily" at a chosen hour/minute), a repeat interval measured in a unit like minutes or hours ("Run" set to a recurring interval, e.g. every 30 minutes), or a more flexible recurring pattern similar to a cron schedule for jobs that need particular days of the week or more complex timing. Whichever option is chosen, the job record also tracks "Next action," which tells you exactly when it's due to fire next — your first stop when someone asks "did this job actually run?"

## Three real jobs worth knowing

SLA recalculation jobs periodically re-evaluate SLA (Service Level Agreement) records against current time and business rules — rather than recalculating on every single record change, they sweep through SLAs in bulk on a schedule to catch breaches and update stage. Scheduled reports are exactly what they sound like: a report configured to generate and (usually) email itself out on a recurring schedule, instead of a user pulling it manually. And cleanup/housekeeping jobs run in the background to purge old data that would otherwise accumulate forever — a very real example is a job that trims old rows out of the system log table so `syslog` doesn't grow without bound.

## Scheduled Job vs. Business Rule — the distinction that matters

You met Business Rules from the admin's perspective in Chapter 5. The core difference: a Business Rule is reactive — it fires because of a specific event (before/after insert, before/after update, before delete) on a specific record, right as that event happens. A Scheduled Job is proactive on a timer — it fires because a clock expired, regardless of whether any record changed at all, and when it runs, it's often written to operate across a whole set of records in one pass rather than one record at a time. A good way to picture the difference: "find all SLAs due to breach in the next hour" is a Scheduled Job's kind of task — nobody edited a record to trigger that check, the job just looked at the clock and swept the table. "Set the assignment group when a new Incident is created" is a Business Rule's kind of task — it's tied to one specific record event.

## Checking a job as an admin

As an admin, two fields on the Scheduled Job record matter most day to day: "Next action" tells you when it's due to run next, and the job's execution history (visible through the related list or the job's own run log) tells you when it actually ran and whether it completed successfully. If a job hasn't run when expected, or keeps running longer than it should, these two places — schedule configuration and run history — are where you start looking, before you ever touch the script itself.

## Key terms

| Term | Meaning |
|---|---|
| Scheduled Job | Server-side logic in `sysauto_script` that runs on a timer, not a record event |
| `sysauto_script` | The table that stores Scheduled Job records |
| Run field | The schedule configuration — daily time, repeat interval, or recurring pattern |
| Next action | The field showing exactly when a job is due to fire next |
| Housekeeping job | A scheduled job that purges old data, e.g. trimming old system log rows |

## Check yourself

A Business Rule and a Scheduled Job can both update many Incident records. What's the real difference in *why* each one runs, and which one would you use for "find and update every SLA about to breach in the next hour"?
