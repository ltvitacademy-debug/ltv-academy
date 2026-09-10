# Lesson 53 — Setting Up Alerts for Pipeline Failures

**Chapter 3 · Production Data Engineering · Lesson 53 of 70**

## What you'll learn

- Data alerts vs. pipeline-health alerts — a distinction worth keeping straight
- What actually needs to trigger a page, versus a log entry nobody reads urgently
- Alert fatigue — the real cost of alerting on too much
- Severity tiers, so not every alert demands the same response

## Two different kinds of alert

Lesson 37's Activator watches **data values** — a fare crossing
$200, a trip failing a check. This lesson covers a different
category: alerting on the **pipeline itself** failing — a notebook
throwing an exception, an Eventstream disconnecting from its
source, a Deployment Pipeline's promotion failing partway through.
Both matter, but they're triggered by completely different
conditions and usually need different people to see them.

## What actually deserves a page

```
Page immediately:   Eventstream disconnected from its Event Hub source
Page immediately:   A scheduled notebook run failed with an exception
Log, review later:  A single event failed a data quality check (Lesson 39)
Log, review later:  A KQL query ran 200ms slower than its rolling average
```

Not every observed problem (Lesson 52) deserves the same urgency. A
disconnected Eventstream means data has stopped flowing entirely —
that needs a human right now. One event failing a quality check is
already being handled by Lesson 36's routing; it doesn't need to
interrupt anyone's evening.

## Alert fatigue — the real cost of over-alerting

If every minor blip pages someone, the people receiving those pages
eventually start ignoring them — including the one time it's a
real, serious problem. This isn't a hypothetical: it's the single
most common reason alerting systems fail in practice. The fix isn't
"add more alerts" — it's being deliberate about which conditions
genuinely warrant interrupting a person's day.

## Severity tiers

```
Sev 1 (page now):        Data stopped flowing; a user-facing system is down
Sev 2 (notify, business hours): Degraded performance, not yet critical
Sev 3 (log only):        A single anomaly, already handled automatically
```

Attaching a severity to every alert rule means the response matches
the actual stakes — nobody gets woken up at 2am for a Sev 3, and
nothing Sev 1 ever waits until morning. Lesson 68 (On-Call for Data
Engineers) picks this exact structure back up when it covers who
actually receives each tier.

## Key terms

| Term | Meaning |
|---|---|
| Data alert vs. pipeline-health alert | Watching values vs. watching the pipeline's own operation |
| Alert fatigue | Too many low-value alerts causing real ones to get ignored |
| Severity tiers | Matching response urgency to actual stakes, not treating every alert the same |

## Check yourself

You're ready for Lesson 54 when you can explain, without looking: why
is "add more alerts" the wrong fix for alert fatigue?
