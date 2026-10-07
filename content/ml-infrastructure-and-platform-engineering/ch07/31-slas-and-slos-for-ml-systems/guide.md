# SLAs & SLOs for ML Systems

Welcome to Chapter 7, the final chapter of this course. Every earlier chapter built a piece of the ML platform — a feature store, a model registry, a pipeline, a deployment path, a versioning scheme. None of that matters if nobody can say, in a number, whether the resulting system is actually working. This lesson gives you the vocabulary and the math for that: SLAs, SLOs, SLIs, and the error budget that ties them together, applied specifically to the parts of an ML system that are different from a normal web service.

## What you'll learn

- The difference between an SLI, an SLO, and an SLA, and why ML platforms need all three
- Why latency SLOs for ML systems are usually written as p50/p95/p99, not an average
- Freshness SLOs — a target that barely exists outside ML and data systems
- How an error budget turns a reliability target into a day-to-day deployment decision
- A real SLO definition written as config, the way a platform team would actually store it

## SLI, SLO, and SLA — three different things

These three terms get used interchangeably in casual conversation, and that causes real confusion on an ML platform team. They are not the same thing:

- **SLI (Service Level Indicator)** — the actual measured number. "99.3% of prediction requests in the last 5 minutes returned successfully" is an SLI.
- **SLO (Service Level Objective)** — the target you've set for that indicator. "99.9% of prediction requests succeed, measured over a rolling 28 days" is an SLO.
- **SLA (Service Level Agreement)** — a contractual promise, usually to someone outside your team, with a consequence attached if you miss it. "If uptime falls below 99.5% this month, the customer's bill is credited 10%" is an SLA.

The Google SRE book's chapter on service level objectives lays this distinction out directly: an SLA carries consequences, an SLO is the internal target you actually engineer to, and you always build in margin so the SLO you promise (via the SLA) is looser than the SLO you actually hold yourself to internally. A platform team sets SLOs for the model-serving layer itself; the SLA, if one exists, is usually a layer up, between the product organization and its own customers.

## Availability SLOs for a prediction service

The most familiar SLO type is availability: the fraction of requests to a model-serving endpoint that return a valid response instead of an error, timeout, or crash. For an ML platform this usually gets scoped per endpoint or per model, not for the platform as a whole, because a single team can be running fifteen models with wildly different traffic and criticality. A fraud-scoring endpoint sitting in a real-time checkout path earns a much tighter availability SLO than a weekly batch-scored churn model, and writing one platform-wide number for both hides the one that actually matters.

## Latency SLOs — why p50/p95/p99, not an average

Averages lie about latency. If 95 out of 100 requests return in 20ms and 5 return in 4 seconds because they hit a cold model replica or a slow feature lookup, the average looks fine — around 220ms — while 5% of your users are having a terrible experience. ML platforms report latency as **percentiles** instead:

- **p50 (median)** — typical-case latency; half of requests are faster than this.
- **p95** — the latency experienced by the slower 5% of requests; this is where feature-store lookups, cold starts, and GC pauses start showing up.
- **p99** — the tail; this is where you catch the requests that fall back to a slow path, hit a retry, or wait on a lock.

A typical platform SLO might read: "p50 latency under 50ms, p95 under 200ms, p99 under 500ms, measured at the model-serving endpoint, excluding client network time." Each percentile gets its own target because each one catches a different kind of problem — p50 regressions usually mean the model itself got slower (a bigger architecture, more features), while p99 regressions usually mean an infrastructure problem (a noisy neighbor, a feature store timeout, an under-provisioned replica).

## Freshness SLOs — the one that's unique to ML and data platforms

A web service doesn't normally have a "freshness" requirement — the code behind an endpoint doesn't go stale on its own. An ML system's **features** and **model** both can:

- **Feature freshness** — how old is the data behind an online feature when it's read at inference time? A fraud model reading a "transactions in the last 10 minutes" feature that's actually 6 hours stale, because the streaming pipeline backed up, will silently make worse decisions without throwing a single error. This is exactly the training/serving skew territory from Chapter 2, except now as an ongoing operational target instead of a one-time bug.
- **Model freshness** — how long since the currently-deployed model version was trained on representative data? A retraining pipeline (Chapter 4) that's supposed to run weekly but has been silently failing for two months means the "model" SLI is fine — it's still serving predictions — while the model itself has drifted out from under the traffic it's seeing.

A freshness SLO is written the same shape as the others: "95% of online feature reads reflect data no more than 15 minutes old" or "the production model version is retrained from data no more than 14 days old, with retraining-pipeline failures alerting within 1 hour."

## The error budget — turning a target into a decision

An SLO by itself is just a number on a dashboard. The **error budget** is what makes it operationally useful. If your availability SLO is 99.9% over 28 days, your error budget is the remaining 0.1% — a concrete, spendable allowance of failure. The SRE book's chapter on embracing risk describes exactly this mechanism: a team jointly agrees on an SLO, and the gap between the SLO and 100% becomes a budget that can be spent on risk — shipping a risky deployment, running a chaotic canary test, deliberately taking a dependency offline to test a fallback.

For an ML platform, the error budget becomes a real governance tool from Chapter 5 and Chapter 6: when the budget is healthy, a model-deployment approval gate can auto-approve a canary rollout; when the budget is nearly exhausted, the same gate can require manual sign-off or block non-critical deployments entirely until the budget resets. This is the single cleanest way to connect "is this platform reliable" to "should we ship this model change today," and it removes the argument from being a subjective one.

## A real SLO definition, as config

Platform teams don't keep SLOs in a slide deck — they keep them as versioned config next to the service, often feeding an alerting system built on the same multiwindow, multi-burn-rate pattern described in the Google SRE Workbook's chapter on alerting on SLOs. A simplified example for a fraud-scoring model endpoint:

```yaml
service: fraud-scoring-model
slos:
  - name: availability
    sli: successful_requests / total_requests
    target: 0.999
    window: 28d
  - name: latency_p95
    sli: request_duration_seconds
    target_ms: 200
    percentile: 95
    window: 28d
  - name: feature_freshness
    sli: feature_age_seconds
    target_seconds: 900
    percentile: 95
    window: 24h
error_budget_policy:
  healthy_threshold: 0.75   # fraction of budget remaining
  action_below_healthy: require_manual_deploy_approval
  action_exhausted: freeze_non_critical_deploys
```

Nothing here is exotic — it's a YAML file a platform engineer could write today, feeding straight into the deployment approval gates from Chapter 5.

## Key terms

| Term | Meaning |
|---|---|
| SLI (Service Level Indicator) | The actual measured value — what's really happening right now |
| SLO (Service Level Objective) | The internal target set for an SLI |
| SLA (Service Level Agreement) | A contractual promise with consequences, usually set looser than the internal SLO |
| p50 / p95 / p99 | Latency percentiles — median, slower-5%, and tail-1% response times |
| Freshness SLO | A target for how current a feature value or model version is allowed to be |
| Error budget | The gap between an SLO and perfect reliability, spent deliberately on risk |

## Recap

An SLI is what's actually happening, an SLO is the target you hold yourself to, and an SLA is the contractual version with teeth, usually set looser than your internal SLO. ML platforms need availability and latency SLOs like any service, written as percentiles instead of averages, plus a freshness SLO that most services never need at all. The error budget — the gap between your SLO and 100% — turns all of this from a dashboard into an actual deployment decision. Next up, Lesson 32: what it's like to carry the pager for a platform governed by these targets.
