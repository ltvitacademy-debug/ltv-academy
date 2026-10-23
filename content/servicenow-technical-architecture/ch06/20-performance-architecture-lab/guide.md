# Lesson 20 — Performance Architecture Lab

**Chapter 6 · Performance & Scalability Architecture · Lesson 20 of 32**

## What you'll learn

- How to work a real readiness assessment end to end, using Lessons 18 and 19 together
- How to evaluate table design and indexing against a specific, numeric growth projection
- How to evaluate semaphore and scheduled-job configuration against projected concurrent usage
- How to write a capacity-tracking plan that will actually catch a wrong assumption during rollout

## The scenario

A company built a custom scoped application two years ago for a single
department of 150 users. It's handled that load without incident. Now the
company is planning to roll the same application out to three additional
departments over the next twelve months, bringing total users to roughly 450
— a tripling of both active users and, since each department will enter
comparable transaction volume, the application's core table's data volume.
Leadership has asked a Technical Architect, before the rollout begins, for a
written readiness assessment: can the platform handle this as configured
today, and if not, what has to change first?

## Step 1 — review table design and indexing against 3x data volume

The first thing the architect pulls is the schema for the application's core
table, built back in Lesson 8's "Table Design for Scale" discipline. The real
question isn't whether the table works today — at 150 users it clearly does
— it's whether the indexes chosen for 150 users' worth of records are still
the right indexes at roughly three times that volume. The architect checks
which fields currently carry an index, cross-references them against the
queries the application's list views and reports actually run, and confirms
whether any of those queries currently rely on a field that isn't indexed but
has stayed fast only because the table is still small. A query without an
encoded, indexed filter that returns acceptable results against 40,000 records
today can easily become the next slow list view once that table holds 120,000.
Where the architect finds a gap, the fix — adding the right index now, before
volume triples, not after a list view starts timing out — is cheap. Finding it
after rollout, the way Performance Troubleshooting's tools would, is not.

## Step 2 — evaluate semaphore and scheduled-job configuration against 3x concurrent usage

Next, the architect pulls current semaphore and scheduled-job data from the
Instance Health Dashboard — the same data Performance Troubleshooting's
"Semaphore & Node Usage" and "Scheduled Job Contention" lessons taught how to
read. At 150 users, semaphore utilization during peak hours sits comfortably
below capacity. The architect doesn't stop at that comfortable number; the
job is projecting it forward. If peak concurrent transactions are expected to
roughly triple alongside the user count, does the current semaphore pool
still have headroom, or is it already running close enough to capacity today
that tripling the load would push it into the queuing behavior that same
course's diagnostic tools exist to catch? The architect also checks the
application's own scheduled jobs — any nightly batch job that touches the
core table — for whether their run time was sized for 150 users' worth of
records, and whether that run time at three times the volume will still fit
inside its maintenance window without contending with other scheduled work.
If either check shows the pool or the job running near its ceiling today,
that's not a future risk to watch — it's a near-certain contention point to
plan for now, exactly as Lesson 19 described.

## Step 3 — establish capacity-tracking metrics and a review cadence for the rollout

A one-time assessment, done once before rollout and never revisited, assumes
the 3x projection is exactly right. It usually isn't exactly right. So the
architect's final deliverable isn't just a go/no-go answer — it's a tracking
plan for the rollout itself: active user count by department as each one
comes online, record count growth on the application's core table month over
month, and peak semaphore utilization, all pulled from the same Instance
Health Dashboard, reviewed monthly during the twelve-month rollout rather than
only at the end. If the second department's onboarding shows data growth
running ahead of the original projection, that monthly review is what catches
it while there's still time to add capacity or adjust the schedule for the
third department — instead of discovering it only once users start noticing
the platform is slow.

## Key terms

| Term | Meaning |
|---|---|
| Readiness assessment | A written, forward-looking evaluation of whether current architecture can handle a specific, numeric projected growth |
| Index gap | A query relying on a field that isn't indexed, staying fast today only because current data volume is still small |
| Maintenance window | The time slot a scheduled job must complete within without contending with other scheduled work |
| Rollout tracking plan | A recurring review of real growth metrics during a phased rollout, used to catch a wrong projection early |

## Check yourself

If the architect's semaphore check in Step 2 had shown comfortable headroom
even at 3x projected load, would Steps 1 and 3 still matter? Why or why not —
and what does that tell you about why this lesson treats all three steps as
one assessment, not three independent checks?
