# Setting SLOs for Inference

Lesson 30 covered measuring a serving stack honestly. This lesson covers turning those measurements into a commitment — a concrete, agreed-upon target for what "good enough" actually means, so decisions about capacity, autoscaling, and alerting have something precise to aim at instead of a vague sense of "fast."

## What you'll learn

- The difference between an SLI, an SLO, and an SLA
- How to write an inference SLO that's actually useful, not just a nice-sounding number
- What an error budget is, and how it changes day-to-day decisions
- How SLOs connect back to autoscaling thresholds and alerting

## SLI, SLO, SLA

This vocabulary comes from site reliability engineering, and it maps directly onto inference serving:

- **SLI (Service Level Indicator)** — the actual measured number, e.g., "p99 time to first token, measured every 5 minutes"
- **SLO (Service Level Objective)** — the internal target for that indicator, e.g., "p99 TTFT under roughly 500ms"
- **SLA (Service Level Agreement)** — an external, often contractual promise with consequences if missed, usually set looser than the internal SLO to leave margin

An SLI without an SLO is just a dashboard nobody has to respond to. An SLO without tracking the right SLI is just a guess.

## Writing a good inference SLO

A good SLO has a few properties regardless of the exact number chosen:

- **It's a percentile, not an average** — "p99 TTFT under 500ms" is meaningful; "average TTFT under 500ms" can be true while 5% of users wait several seconds, because the average doesn't see the tail (Lesson 1)
- **It ties to a concrete user-facing effect** — pick the target because of what happens above it (a chat UI starts feeling broken, a downstream timeout fires), not because it's a round number
- **It's achievable under realistic load, not just a quiet benchmark** — an SLO set from a single lightly-loaded test run will be missed constantly once real concurrent traffic arrives

```yaml
# Example inference SLO definition
slo:
  name: chat-api-ttft
  indicator: p99_time_to_first_token_ms
  target: 500
  window: 30d
  min_success_rate: 0.999
```

## Error budgets

If the SLO allows 99.9% of requests to meet the target, the remaining 0.1% is the **error budget** — a deliberate, pre-approved allowance for things going imperfectly. That changes how teams make decisions day to day:

- Spending budget on a risky deploy or an aggressive cost-optimization experiment is a reasonable trade, as long as there's budget left
- A budget that's nearly exhausted means reliability work takes priority over new features until it recovers
- Burning through the budget fast (a "burn rate" alert) is something teams page on *before* the SLO is actually breached, not after

## Connecting SLOs to the rest of the stack

An SLO isn't just a reporting artifact — it's the thing that should actually drive other decisions covered in this course: the autoscaling target in Lesson 23 ("keep queue depth low enough that p99 TTFT stays under the SLO"), and the capacity plan in Lesson 32 (how many replicas are needed to hold that SLO at the traffic level you expect).

## Key terms

| Term | Meaning |
|---|---|
| SLI | The actual measured metric (e.g., p99 TTFT) |
| SLO | The internal target for that metric |
| SLA | An external, often contractual commitment, usually looser than the SLO |
| Error budget | The allowed share of requests that can miss the SLO before reliability work takes priority |

## Recap

A good inference SLO is a percentile target tied to a real user-facing effect and set against realistic load, and the error budget it implies turns reliability into a concrete, spendable allowance rather than a vague goal. Next up, Lesson 32: once you know what you're committing to, how many GPUs does it actually take to hold that commitment?
