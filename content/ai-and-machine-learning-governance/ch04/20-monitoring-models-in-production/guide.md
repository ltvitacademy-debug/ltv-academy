# Lesson 20 — Monitoring Models in Production

**Chapter 4 · Security, Access and Monitoring · Lesson 20 of 30**

## What you'll learn

- Why "it passed evaluation and shipped" is the start of a model's governance story, not the end
- The four categories of signal a production model needs watched continuously
- What a monitoring alert configuration actually looks like, as an illustrative example
- Who gets paged when a model's monitoring trips, and why that has to be decided in advance

## Shipping is not the finish line

Chapter 3 covered everything that happens before a model goes live: documentation, registration, versioning, approval. It's tempting to treat production as the reward for getting all of that right — the model shipped, the dashboard is green, move on to the next thing. But a model that passed evaluation on last year's data doesn't stay validated by default. The world it's making decisions about keeps changing, and nothing stops that automatically. Monitoring is what turns "we validated this once" into "we know this is still working."

## Four things to watch

A production model needs continuous visibility into at least four categories of signal:

- **Volume** — is the model receiving roughly the traffic it expects? A sudden drop can mean an upstream system broke before it means the model did.
- **Latency and errors** — is the model responding within its expected time, and failing at an expected rate? This is standard application monitoring, still necessary here.
- **Output distribution** — are the model's predictions shaped roughly the way they were during validation, or has the mix of outputs shifted meaningfully? (Lesson 21 goes deep on this specifically.)
- **Business outcome, where measurable** — does the decision the model drove actually track the real-world result it was meant to predict, once that result becomes known?

Most teams monitor the first two well, because they're standard application metrics. The last two are the ones that are specific to governing a model, and the ones most often skipped.

## An illustrative monitoring configuration

There's no single standard monitoring config format across the industry — every platform implements this differently. But the shape of what needs to be defined is consistent: a metric, a threshold that defines "something's wrong," and what happens when that threshold is crossed.

```yaml
# Illustrative production monitoring config — not a specific vendor's actual format
model: credit-risk-scorer
metrics:
  prediction_volume:
    alert_if: "< 50% of 7-day rolling average"
  latency_p95_ms:
    alert_if: "> 400"
  error_rate:
    alert_if: "> 1%"
  output_distribution_shift:
    alert_if: "PSI > 0.2"
on_alert:
  notify: "ml-oncall"
  action: "page + auto-flag version for review"
```

*The categories a monitoring setup needs to define — illustrative, not a specific product's actual configuration syntax.*

## Who gets paged, and why that has to be decided in advance

An alert that fires with nobody assigned to receive it isn't monitoring — it's a log entry nobody reads. Deciding who's on call for a model's alerts, and what they're actually authorized to do when one fires (roll back to a previous version, page a human reviewer, or escalate to the model's registered owner from Lesson 13) has to happen before the model ships, not improvised the first time something breaks. This connects directly to the registry: the "owner" field recorded there is exactly who this escalation path should point to.

## Key terms

| Term | Meaning |
|---|---|
| Output distribution | The shape and spread of a model's predictions, monitored for unexpected shifts over time |
| Business outcome monitoring | Comparing a model's driven decisions against the real-world result they were meant to predict |
| Alert threshold | The defined point at which a monitored metric is considered "something's wrong" |
| On-call / escalation path | The predefined person or team responsible for responding when a model's monitoring alert fires |

## Lab

For a model you're familiar with (or the credit-risk-scorer example above), write one alert threshold for each of the four signal categories — volume, latency/errors, output distribution, and business outcome — and name who you think should be paged when each one fires.

## Check yourself

Can you name the four categories of signal a production model needs monitored, and explain why the lesson says the last two — output distribution and business outcome — are the ones most often skipped?
