# Lesson 15 — Monitoring Lab

**Chapter 4 · Instance Health & Monitoring · Lesson 15 of 25**

## What you'll learn

- How to recognize a real-world symptom as semaphore contention rather than generic slowness
- How to apply the staggering fix from Lesson 14 to a concrete, multi-job scenario
- How to confirm a fix actually worked using Instance Health, rather than just assuming it did
- How Lessons 12 through 14 combine into one practical, end-to-end troubleshooting sequence

## The scenario

Three Scheduled Jobs run every night on this instance: an SLA recalculation job, a data-archival
job, and a reporting-refresh job. All three are configured to start at exactly midnight — a setup
nobody deliberately designed; each job was added at a different time, by a different admin, and
midnight is simply the default nobody thought to change. For weeks, this caused no visible problem.
Then, over the last several mornings, users have started reporting that dashboard data looks stale
first thing in the morning — numbers that should have refreshed overnight are showing yesterday's
values, and the SLA recalculation sometimes hasn't finished by the time the business day starts.
Nobody has touched any of the three jobs' scripts recently. The question is: what's actually going
on here, and what do you do about it?

## Step 1 — Resist the urge to blame one job's code

The instinctive first move for a lot of admins would be to open the reporting-refresh job and start
reading its script line by line, assuming it must have broken. Resist that instinct here, because
nothing about the symptom points specifically at that job's logic. All three jobs are affected
together, all three start at the same moment, and none of them has been recently modified. That
pattern — multiple, unrelated jobs all degrading at once, with no code changes behind any of them —
is exactly the signature Lesson 13 described: not "a request is slow," but "requests are queuing for
a limited shared resource." The real candidate here isn't any one script. It's contention.

## Step 2 — Recognize this as semaphore contention

Walking through Lesson 13's logic directly: these three jobs are all background work, and background
work draws from the same bounded semaphore pool on each node. Configuring all three to start at
midnight means all three are competing for the same small set of available background-processing
slots at the exact same instant. If that pool's capacity is smaller than what three simultaneous jobs
actually demand, some of them have to queue and wait their turn — exactly the kind of delay that
looks like generic slowness from the outside, but is actually resource contention for a limited pool,
precisely as Lesson 13 warned. The staleness users are seeing isn't a sign that the jobs broke; it's a
sign that they're finishing later than expected because they spent part of the night waiting in line
behind each other for the same semaphore slots, rather than running cleanly in parallel.

## Step 3 — Apply Lesson 14's real fix: stagger the start times

The fix here is the direct, practical one from Lesson 14: spread these three jobs across a wider
window instead of clustering them at one moment. Rather than all three firing at midnight, the SLA
recalculation job could be scheduled to start at midnight, the data-archival job at 12:20 AM, and the
reporting-refresh job at 12:40 AM — spacing chosen so each job has a realistic chance of finishing, or
at least getting well underway, before the next one starts competing for the same pool. This requires
no changes to any job's underlying script — only to when each one is told to begin. If, after
staggering, one specific job is still consistently the slowest of the three, that job becomes the one
worth investigating with Chapter 2's script-diagnosis skills — but that's a second step, only taken if
staggering alone doesn't fully resolve things.

## Step 4 — Confirm the fix with Instance Health, not assumption

Changing the schedule and walking away isn't enough — the fix needs to be confirmed, not assumed. This
is where Lesson 12's distinction matters directly: the right tool for "did nightly processing actually
get more reliable" is Instance Health, not a single slow-transaction record, because this is a
trend question, not a single-request question. Checking Instance Health over the following several
nights — watching whether transaction volume for that overnight window completes within a reasonable
time, and whether error rates during that window stay flat — is how you confirm nightly processing now
completes reliably, rather than simply hoping the staggered schedule worked. A trend showing
consistently on-time completion across multiple nights is real evidence; a single good night is not
yet proof.

## Why this lab ties the chapter together

This scenario deliberately walks through all three of this chapter's lessons in the order you'd
actually use them in the field: recognizing a symptom as instance-wide rather than one-off (Lesson
12's distinction), diagnosing the real cause as semaphore contention rather than literal code slowness
(Lesson 13), applying the practical fix of staggering competing jobs (Lesson 14), and then confirming
the fix actually worked by watching a trend over time rather than trusting a single good outcome. That
sequence — recognize, diagnose, fix, confirm — is the real shape of instance-health troubleshooting,
and it's the pattern worth carrying into every future performance investigation on a real instance.

## Key terms

| Term | Meaning |
|---|---|
| Symptom pattern | Multiple unrelated jobs degrading together, with no recent code changes, pointing at contention rather than a bug |
| Staggered schedule | Spreading job start times across a window instead of clustering them at one moment |
| Confirmation trend | Watching a metric over multiple occurrences, not just once, to confirm a fix actually worked |
| Nightly processing window | The overnight period during which multiple background jobs compete for the same semaphore pool |

## Check yourself

You're ready for Lesson 16 when you can explain, without looking: why was blaming the
reporting-refresh job's script the wrong first move in this scenario, what fix was applied instead,
and what specific evidence from Instance Health would actually prove that fix worked?
