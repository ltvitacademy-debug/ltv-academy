# Lesson 25 — Capstone Wrap-Up & Prevention Plan

**Chapter 7 · Capstone: Diagnose & Fix a Realistic Performance Problem · Lesson 25 of 25**

## What you'll learn

- How the three confirmed causes from Lesson 24 were actually fixed
- Why a prevention plan is the real deliverable of a performance investigation, not the fix alone
- What proactive monitoring thresholds would have caught this months earlier
- How a periodic performance review cadence keeps pace with real usage growth
- How ATF-based performance regression testing stops the next version of this problem before release

## Applying the three fixes

Each of Lesson 24's three confirmed causes got its own targeted fix, applied and verified
independently rather than as one bundled change:

- **The missing index.** An index was added on `u_checklist_item.u_store_region` (paired with
  `active`, matching the list view's actual filter condition). Re-running the same query plan from
  Lesson 24 afterward shows an index seek in place of the full table scan, and the "My Open
  Checklist Items" list now opens in roughly the time it did when the app had 50 stores.
- **The query-in-a-loop.** The corrected `ChecklistUtils.getApprovalThresholds` function — built in
  Lesson 24, one query instead of one-per-item — was deployed to the Store Opening Checklist app.
  Approval flows that used to sit for a minute or more now clear in the same couple of seconds they
  did at launch, because the flow is no longer waiting on dozens of redundant round trips per batch.
- **The scheduled job contention.** Rather than removing either scheduled job, the Nightly Rollup job
  was moved to run at 2:00 AM, well clear of the 7:00 AM submission spike, so the two jobs that used
  to compete for the same semaphore pool at the same moment no longer overlap at all.

Each fix was verified against the same evidence that confirmed the cause — the query plan, the
script's own execution time, and the semaphore pool's saturation pattern during the next few mornings
— rather than just assuming the change worked because it looked right.

## Why the fix alone isn't the real deliverable

A performance engineer who stops here has only solved this particular instance of the problem.
Meridian Retail didn't get here because of one bad decision — it got here because nobody was
watching for the moment when 10x growth would expose inefficiencies that didn't matter at launch.
Without a real prevention plan, this exact pattern — slow queries, scripts, and scheduled jobs that
were "fine" at a smaller scale — will simply recur the next time a scoped app grows quietly for six
months. The genuinely useful output of this capstone isn't just three fixes; it's a plan that catches
the next version of this problem while it's still small.

## Proactive monitoring thresholds

Chapter 4's Instance Health metrics are only useful if someone is watching them before a user
complains. The prevention plan sets concrete, alerting thresholds instead of relying on someone
noticing a slow trend by eye:

```
Metric                          Alert threshold
Avg list-view load (app-scoped) > 1.5s sustained over 24 hours
Semaphore pool utilization      > 80% during any scheduled window
Script Include execution time   > 2x its 30-day rolling average
Scoped-app active-user count    crosses any 100-user growth milestone
```

That last threshold is the one this incident most needed six months ago: an alert tied to usage
*growth itself*, not just to a performance number that's already degraded — because by the time
response time crosses a threshold, the underlying cause has usually already been accumulating for
months.

## A periodic performance review cadence

Growth from 50 to 500 stores happened in small, individually unremarkable increments — which is
exactly why nobody flagged it as a performance event at the time. The prevention plan adds a
recurring review, not a one-time fix: once a quarter, or whenever a scoped app's active-user count
crosses a growth milestone (whichever comes first), someone re-runs the same diagnostic checks this
capstone just walked through by hand — query plans on the app's heaviest list views, a scan of its
Script Includes for query-in-a-loop patterns, and a check of which scheduled jobs share a semaphore
pool with the app's peak-usage window. Scheduling that review in advance is what turns "we got lucky
and someone finally investigated" into a repeatable practice.

## ATF-based performance regression testing before the next deployment

Course 11 covered the Automated Test Framework in depth; this capstone ties it directly to
performance. Before Meridian Retail ships the next version of the Store Opening Checklist app, an ATF
test suite should capture a performance baseline for the app's heaviest operations — the list view
load, the approval flow, the nightly rollup — and fail the build if a new change pushes any of them
measurably past that baseline. That's the guardrail that would have caught the `ChecklistUtils`
query-in-a-loop at commit time, in a test environment with synthetic data simulating 500 stores,
instead of six months later in production in front of real store managers.

## Closing reflection: from fixing problems to designing around them

This course has been about finding and fixing performance problems after they appear. The next course
in this path, ServiceNow Technical Architecture, is about the decisions made *before* a problem like
this one ever gets the chance to exist — data model choices, integration patterns, and scoped-app
design decisions made with scale in mind from the start. The query-in-a-loop in `ChecklistUtils`
wasn't a mistake anyone would have caught by reviewing the code in isolation; it only became a real
problem because of a scale the original design never accounted for. How might you design a scoped
app's queries, scripts, and scheduled jobs differently from day one if you already knew, going in,
that it would eventually run at 10 times its pilot size?

## Key terms

| Term | Meaning |
|---|---|
| Prevention plan | The lasting output of a performance investigation — monitoring, cadence, and testing that stop recurrence |
| Growth-tied alert threshold | An alert triggered by usage growth itself, not only by a performance metric that has already degraded |
| Performance review cadence | A recurring, scheduled re-check of an app's heaviest queries, scripts, and jobs as usage grows |
| ATF performance regression test | An Automated Test Framework test that fails a build if a change measurably worsens a captured performance baseline |

## Check yourself

This closes the course. Without looking back: name the one proactive threshold from this lesson that
would have flagged Meridian Retail's growth as a performance risk *months* before any user ever
reported a slow list view or a stuck approval — and explain why it catches the problem earlier than
a response-time alert ever could.
