# Lesson 28 — Scheduled Jobs & Logs Lab

**Chapter 6 · System Properties, Scheduled Jobs & Logs · Lesson 28 of 36**

## What you'll learn

- How to work a "this scheduled job seems slow" report start to finish
- How to check a Scheduled Job's schedule and run history before assuming the script is broken
- How to connect a System Property to a job's configured behavior
- How to use a timestamp from run history to anchor a System Log search
- How to tell "slow but working" apart from "silently failing"

## The ticket

A fulfiller on the service desk team reports: "SLA breach warnings used to show up on Incidents right away. Lately they're showing up late, sometimes 20-30 minutes after they should have." Nothing about the Incident form has changed, and no one touched any ACL or Business Rule recently. Your job is to work this the way you'd work any real performance complaint — by checking configuration, then history, then the log, in that order, rather than guessing at the script first.

## Step 1 — Identify the real suspect: a Scheduled Job, not a Business Rule

SLA breach evaluation isn't triggered by a single record edit — it's the kind of sweep-many-records-on-a-timer task from Lesson 26, which means the thing to check first is the relevant Scheduled Job (something like an "SLA recalculation" job in `sysauto_script`), not a Business Rule. If breach warnings are arriving late rather than not at all, that points toward a timing or performance issue with the job itself, not a logic error that would make it fail outright.

## Step 2 — Check the System Property for its schedule/behavior settings

Before touching the job record, check whether a System Property governs its behavior — many scheduled recalculation jobs read a property for how often they should run or how large a batch to process per run. If a property controlling the job's interval or batch size was recently changed (intentionally or by accident), that alone could explain a 20-30 minute lag: a job that used to run every 5 minutes now running every 30 would produce exactly this symptom. Check the property's value and its `sys_updated_on` timestamp — if it changed recently, you may have already found the cause.

## Step 3 — Review the job's run history and next scheduled time

If the property checks out, move to the Scheduled Job record itself. "Next action" tells you when it's due to run next — compare that against the interval you'd expect. Then look at the run history: is the job actually firing on schedule, or are runs themselves taking longer than the gap between them? A job configured to run every 5 minutes that takes 25 minutes to complete each time will back up exactly like this ticket describes — not failing, just falling behind its own schedule.

## Step 4 — Check the System Log for errors or warnings around recent runs

With a specific run's start and end time from the job's history, go to System Log > Errors (or Script Log Statements, if the job logs its own progress with `gs.info()`/`gs.warn()`) and filter to that window, per the reproduce-then-check-timestamp workflow from Lesson 27. Look for warnings about volume ("processed 40,000 records" where it used to process 4,000) or errors that would cause the job to retry partway through. A job silently working through a much larger record set than usual, logged as a `gs.warn()` rather than an error, is a very plausible real cause — and it explains why nothing is "broken," it's just slower.

## Step 5 — Decide the fix based on what the evidence actually shows

If Step 2 found a changed property, the fix is restoring (or deliberately re-tuning) that property value. If Step 3 and 4 point to runs simply taking longer because the underlying record volume grew, the real fix isn't a code change at all — it's adjusting the job's interval or batch size, or escalating a genuine capacity question, rather than assuming the script is broken. In every case, the order mattered: property, then schedule and history, then log — each step either rules out a cause or hands you the next timestamp to search, instead of guessing at the script from the start.

## Key terms

| Term | Meaning |
|---|---|
| Configuration-first order | Check the System Property, then the job's schedule/history, then the log — before the script |
| Next action | What a Scheduled Job's own record tells you about its next expected run |
| Run history | Where you confirm whether a job is actually falling behind its own schedule |
| Timestamp anchor | A specific run's start/end time, used to narrow a System Log search |
| "Slow" vs. "broken" | A job can be working correctly but simply unable to keep up with a growing record volume |

## Check yourself

Why does checking the System Property and the Scheduled Job's run history *before* opening the System Log actually save you time, instead of just going straight to the log first?
