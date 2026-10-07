# Alerting Philosophy

Collecting metrics, logs, and traces doesn't help anyone at 2 AM unless the right alert fires at the right time, for the right reason. Bad alerting is one of the most common and most damaging failures in monitoring — not because teams don't collect enough data, but because they alert on the wrong things, too often, for things nobody can act on. This lesson sets the philosophy you'll apply for the rest of the course, including Chapter 6's work on reducing alert fatigue.

## What you'll learn

- The single most important test an alert must pass: is it actionable?
- The difference between symptom-based and cause-based alerting, and why symptoms win
- How to set alert thresholds using SLOs and error budgets, not guesswork
- Why paging a human should be the last resort, not the first response

## The actionable test

Before anything else is tuned, every alert must pass one test: **if a human is paged, is there something they can actually do right now?** An alert that fires and the on-call engineer's only response is "yes, I know, nothing to do but wait" is a bad alert — it trained someone to wake up for nothing. If Northbridge pages an engineer because disk usage is at 60%, with no immediate action available, that page should not exist; a non-urgent ticket or a dashboard, not a 2 AM page, is the right output.

## Symptom-based vs. cause-based alerting

A **cause-based alert** fires on an internal condition: "CPU is at 95%." A **symptom-based alert** fires on user-visible impact: "checkout success rate dropped below 99%." Symptom-based alerting is almost always the better default, for one simple reason: high CPU that isn't actually hurting users doesn't need a page, and a user-impacting problem that doesn't show up as high CPU (say, a downstream dependency returning wrong data) still gets caught.

This doesn't mean cause-based signals are useless — saturation metrics from the last lesson are exactly the kind of cause-based signal worth watching on a dashboard, as an early-warning input to investigation. The point is which ones should wake someone up.

## Setting thresholds from SLOs, not guesswork

The previous lessons gave you the tool for this: alert based on error-budget burn rate, not an arbitrary number someone picked once. If Northbridge's checkout SLO is 99.9% over 30 days, an alert that fires "we're burning error budget fast enough to exhaust the whole 30-day budget in the next 2 hours" is precise, defensible, and tied directly to what the business actually promised — not a round number like "alert if errors > 50 in 5 minutes" that nobody can explain the reasoning behind.

## Paging a human is the last resort

The best alerting hierarchy tries cheaper responses first: can the system auto-remediate (restart a failed pod, scale up automatically)? Can it self-heal before anyone needs to be told? Only once those options are exhausted, or the problem needs human judgment, should a human get paged — and when they do, the page should come with enough context (which service, which signal, how severe, a link to a relevant dashboard) to start working immediately rather than starting an investigation from zero.

## Key terms

- **Actionable alert** — one where the person paged has something concrete they can do right now
- **Cause-based alert** — fires on an internal condition (e.g. high CPU), regardless of user impact
- **Symptom-based alert** — fires on user-visible impact (e.g. checkout success rate dropped); the better default for paging
- **Burn-rate alerting** — alerting based on how fast an error budget is being consumed, not an arbitrary static threshold
