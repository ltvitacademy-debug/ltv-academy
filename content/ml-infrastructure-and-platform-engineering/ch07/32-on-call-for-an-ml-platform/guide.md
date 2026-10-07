# On-Call for an ML Platform

Lesson 31 gave the platform team numbers to hold itself to — availability, latency percentiles, freshness, and an error budget that tracks how much failure is left to spend. This lesson is about the humans who get paged when those numbers slip. On-call for an ML platform looks a lot like on-call for any backend service, with a few differences that catch new platform engineers off guard: the thing paging you might be a model, not a server, and "healthy" doesn't always mean "correct."

## What you'll learn

- How to structure an on-call rotation so it's sustainable, not a hazing ritual
- What belongs in a runbook, and why an alert without one shouldn't page anyone
- How to set paging thresholds directly from the SLOs and error budget in Lesson 31
- Why alert fatigue is an even bigger risk on ML platforms than on typical backend services
- A real multiwindow, multi-burn-rate alerting rule, the pattern most mature SRE teams use

## Structuring the rotation

A rotation needs a primary and a secondary on-call engineer at minimum. The primary gets paged first; the secondary is the backup if the primary doesn't acknowledge within a set window (commonly 5–15 minutes) or if an incident needs a second set of hands. Most platform teams rotate weekly, Monday to Monday, which is long enough to build context on an unfolding issue but short enough that no one engineer absorbs a disproportionate share of bad weeks.

A few practices that separate a sustainable rotation from a punishing one:

- **Shadow rotations for new hires.** A new platform engineer observes an experienced on-call engineer for one or two full rotations before carrying the pager alone. They see real pages, real triage, and real false alarms before being responsible for any of it.
- **Explicit handoff.** At the end of each rotation, the outgoing engineer writes a short handoff note: open incidents, anything flaky that paged but didn't turn into a real incident, and anything about to break. This is the same discipline Chapter 6 asked of audit trails — a record exists, not just a memory.
- **Business-hours vs. after-hours thresholds**, when the team is large enough to support it — a lower-severity alert might only page during business hours and route to a ticket queue overnight, while a true availability or data-integrity break pages immediately regardless of time.

## What a runbook actually needs

A page that doesn't come with a runbook is a page that wastes the first ten minutes of every incident on orientation instead of mitigation. A good ML-platform runbook, tied to a specific alert, includes:

1. **What this alert means** — in plain language, not just the metric name. "Feature freshness SLO breached for the `fraud_score_v3` endpoint — online features are more than 15 minutes stale" is a runbook sentence; "`feature_age_seconds_p95 > 900`" is not.
2. **What's likely causing it** — a short list of the usual suspects (streaming pipeline lag, a dead consumer, a feature-store write backlog), ranked by how often each one is actually the cause.
3. **What to check first** — specific dashboards, specific queries, specific log filters, in the order that resolves the question fastest.
4. **Safe mitigation steps** — the rollback paths from Chapter 5: roll the serving model back to the last known-good version, flip a feature killswitch to a safe default, or fail the endpoint over to a cached/fallback response.
5. **When to escalate** — the condition under which this stops being a one-person problem.

The PagerDuty incident-response documentation states the same rule directly: alerts without a runbook generally shouldn't be allowed into the paging rotation in the first place. If nobody can write down what a human should do when an alert fires, the alert isn't ready to wake anyone up.

## Paging thresholds, tied directly to Lesson 31's SLOs

The biggest mistake new platform teams make is paging on raw metric values instead of on SLO burn. A latency spike that lasts four seconds and resolves on its own shouldn't page anyone — it barely touches the error budget. A latency spike that's still happening twenty minutes later, burning the 28-day error budget fast enough to exhaust it in a day, should page immediately. This is the **burn rate** concept, and it's the heart of the error-budget-driven alerting described in the Google SRE Workbook.

A simple, real version of a burn-rate alert, in Prometheus-style alerting-rule shape:

```yaml
groups:
  - name: fraud-scoring-model-slo
    rules:
      - alert: ErrorBudgetFastBurn
        expr: |
          (1 - sum(rate(requests_success[1h])) / sum(rate(requests_total[1h])))
          > (14.4 * 0.001)
        for: 2m
        labels:
          severity: page
        annotations:
          summary: "Fraud-scoring model burning error budget 14x faster than sustainable"
      - alert: ErrorBudgetSlowBurn
        expr: |
          (1 - sum(rate(requests_success[6h])) / sum(rate(requests_total[6h])))
          > (6 * 0.001)
        for: 30m
        labels:
          severity: ticket
        annotations:
          summary: "Fraud-scoring model burning error budget 6x faster than sustainable"
```

The fast-burn rule pages immediately because, left alone, it would exhaust a 28-day budget in about two days. The slow-burn rule only opens a ticket, because at that rate the budget lasts closer to a week — plenty of time to fix it without waking anyone up.

## Alert fatigue — a bigger risk on ML platforms than you'd expect

Alert fatigue is dangerous everywhere, but ML platforms have an extra source of it that pure backend services don't: **model metrics are naturally noisy**. Prediction distributions shift a little every day. A naive alert on "model's average prediction score changed by more than 2%" will page constantly on noise that means nothing, and the on-call engineer learns — correctly, if painfully — to ignore it. Once that happens, they'll also ignore the one time it's real.

Concrete countermeasures:

- **Alert on SLO burn, not on raw metric wobble.** The burn-rate pattern above already does this — it only fires when the trend, sustained over a real window, would actually exhaust the budget.
- **Require every paging alert to pass a 90-day usefulness test.** If an alert hasn't led to a real human action in 90 days, demote it to a non-paging channel or delete it outright.
- **Separate "page" severity from "ticket" severity explicitly**, the way the burn-rate example above does. Not everything that's worth knowing about is worth losing sleep over.
- **Review pages weekly**, not just incidents. A rotation that gets paged 30 times a week for things that resolve themselves is a rotation that will eventually sleep through the real one.

## Key terms

| Term | Meaning |
|---|---|
| Primary / secondary on-call | The first engineer paged, and the backup if they don't respond in time |
| Shadow rotation | A new engineer observing on-call before carrying the pager alone |
| Runbook | The documented steps for what a specific alert means and how to respond to it |
| Burn rate | How fast an error budget is being consumed relative to a sustainable pace |
| Alert fatigue | Desensitization to alerts caused by too many low-value or noisy pages |

## Recap

On-call for an ML platform runs on the same primary/secondary rotation structure as any backend team, with shadow rotations and explicit handoffs keeping it sustainable. Every paging alert needs a runbook, and every paging threshold should be set against SLO burn rate from Lesson 31 — fast burns page immediately, slow burns become tickets — rather than against raw, noisy metric values. Next up, Lesson 33: what actually happens when one of those pages turns into a real incident because a model has quietly degraded.
