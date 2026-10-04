# Lesson 26 — Data Quality Monitoring

**Chapter 5 · Remediation and Monitoring · Lesson 26 of 30**

## What you'll learn

- How monitoring differs from the one-time rule checks in Chapter 4
- The three things worth monitoring: data quality metrics, pipeline
  health, and trend/drift over time
- How to turn a SQL check into a scheduled, alerting monitor
- What makes a good alert — and why over-alerting is as harmful as
  under-alerting
- How monitoring feeds both the scorecards in Lesson 27 and the issue
  log in Lesson 28

## From checks to monitoring

Chapter 4 taught you to *write* a data quality rule — a query that
returns the rows violating a dimension like completeness or validity.
**Monitoring** is what happens when that query stops being something
you run by hand and becomes something that runs on a schedule, every
time compares its result to an expected range, and tells someone the
moment it doesn't. A rule check answers "is this data bad right now?"
Monitoring answers "is this data bad right now, and did anyone need to
ask?"

## Three things worth monitoring

1. **Data quality metrics** — the pass/fail rate of the rules from
   Chapter 4, tracked over time (percent of rows passing a completeness
   check, count of referential integrity violations per day)
2. **Pipeline health** — did the job that loads this table actually
   run, on schedule, and finish without error? A quality rule can't
   catch bad data from a load that never happened at all
3. **Trend and drift** — is a metric that's technically still "passing"
   quietly getting worse? A null rate creeping from 1% to 3% to 6% over
   three months might never cross a hard threshold (Lesson 21) but is
   still worth surfacing before it does

## Turning a check into a monitor

The SQL doesn't change much — what changes is what happens around it:
a schedule, a stored history of past results, and a comparison against
an expected range instead of a single pass/fail.

```sql
-- The same completeness check from Chapter 4,
-- now logged with a timestamp every time it runs
INSERT INTO dq_monitor_results (check_name, run_date, pass_rate)
SELECT
    'customer_email_completeness',
    CURRENT_DATE,
    100.0 * SUM(CASE WHEN customer_email IS NOT NULL THEN 1 ELSE 0 END)
          / COUNT(*)
FROM customers;
```

Run daily, that single row becomes a trend line — which is exactly
what a scorecard (Lesson 27) visualizes, and exactly what a drifting
pass rate (not yet below threshold, but heading there) would show up
in before it becomes an open issue (Lesson 28).

## What makes a good alert

A monitor that alerts on every tiny fluctuation gets ignored within a
month — this is the same "alert fatigue" problem seen in software
operations generally. A few principles keep alerts worth acting on:

- **Alert on the threshold, not the noise** — use Lesson 21's agreed
  tolerance, not a hair-trigger on any change at all
- **Route the alert to an owner**, not a shared inbox nobody checks
- **Include the "so what"** — a useful alert says what broke and what
  table/report it affects, not just "check failed"
- **Distinguish severity** — a warning-level drift and a hard threshold
  breach shouldn't look the same in the alert, or people will start
  ignoring both

## Monitoring feeds the next two lessons directly

Monitoring isn't the end of the pipeline — it's the beginning of the
next two lessons. The pass-rate history a monitor accumulates is the
raw data a scorecard (Lesson 27) visualizes for stakeholders, and every
alert a monitor fires is a candidate to become a tracked issue (Lesson
28) if it isn't resolved immediately.

## Key terms

| Term | Meaning |
|---|---|
| Monitoring | A scheduled, recurring check that compares results to an expected range and alerts automatically |
| Pipeline health | Whether the job that loads data actually ran, on time, without error |
| Drift | A metric slowly worsening over time without crossing a hard threshold yet |
| Alert fatigue | Ignoring alerts because too many fire without being actionable |

## Lab

1. Take one rule check you wrote in Chapter 4 (or sketch a new one) and
   write the `INSERT ... SELECT` statement that would log its result,
   with a timestamp, into a history table — following the pattern shown
   above.
2. Write one sentence describing what "drift" would look like for that
   specific check over a month, even if it never crosses its hard
   threshold.
3. Write what you'd put in the alert message itself — not just "check
   failed," but what broke and who should see it.

## Check yourself

Can you explain the difference between a one-time rule check and a
monitor, in your own words? Can you name the three things worth
monitoring beyond the pass/fail rate of a single rule, and why pipeline
health matters even when every data quality rule is passing?
