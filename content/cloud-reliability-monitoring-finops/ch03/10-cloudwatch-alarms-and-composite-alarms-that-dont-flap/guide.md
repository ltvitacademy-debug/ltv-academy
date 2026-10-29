# Lesson 10 — CloudWatch Alarms and Composite Alarms That Don't Flap

**Chapter 3 · AWS CloudWatch & X-Ray in Depth · Lesson 2 of 4**

## What you'll learn

- The real anatomy of a CloudWatch alarm: statistic, period, evaluation
  periods, and datapoints to alarm — and how those four settings
  interact to decide when an alarm actually fires
- What `TreatMissingData` controls, and why the wrong setting turns a
  scaling event into a false page
- Why a single metric threshold alarm tends to **flap** — fire, clear,
  fire, clear — on a metric that's genuinely borderline
- How a **composite alarm** combines the states of several alarms with
  `AND` / `OR` / `NOT` logic to produce one alarm that only fires when
  the underlying problem is actually real

## The anatomy of a standard alarm

A CloudWatch alarm watches one metric against a threshold, but "watches"
hides four separate decisions you have to make explicitly:

- **Statistic** — which aggregation of the raw data points the alarm
  actually evaluates: `Average`, `Sum`, `Maximum`, `Minimum`, or a
  percentile like `p99`. Average CPU over a period can look fine while
  `p99` latency over the same period is already bad — pick the
  statistic that matches the question you're actually asking.
- **Period** — the length of time each data point represents, e.g. 60
  seconds or 300 seconds. A shorter period reacts faster but is noisier;
  a longer period smooths noise but reacts slower.
- **Evaluation periods** and **datapoints to alarm** — the alarm looks
  back over N evaluation periods and fires only if M of them (M ≤ N)
  breached the threshold. "3 out of 3" demands a sustained breach
  before firing; "2 out of 3" (an **M-of-N** alarm) tolerates one noisy
  period without either going fully silent or firing on every single
  blip — a deliberate middle ground between over-reacting and missing
  a real trend.

A concrete example: an alarm on `CPUUtilization`, statistic `Average`,
period 60 seconds, evaluation periods 3, datapoints to alarm 2, with a
threshold of `GreaterThanThreshold 80`. That fires only when at least 2
of the last 3 one-minute averages were above 80% — one noisy minute
alone won't trip it, but a real sustained spike will.

## TreatMissingData: the setting that causes false pages

Metrics don't always report on schedule — an instance that's scaling
down, a Lambda function that simply wasn't invoked in the last period,
a sparse custom metric that's only published when something happens.
`TreatMissingData` controls what the alarm does during a gap:

- `missing` (the default) — treats the gap as "not breaching," which
  can keep an `ALARM` state from clearing if the alarm was already
  comparing against stale data; behavior here is genuinely easy to get
  wrong, which is exactly why this setting deserves an explicit choice.
- `notBreaching` — explicitly treats missing data points as good,
  useful for metrics that are expected to go quiet sometimes.
- `breaching` — treats a gap as bad, appropriate for a metric that
  should always be reporting (a heartbeat) where silence itself is the
  failure.
- `ignore` — the alarm keeps its last state and doesn't re-evaluate
  until real data returns.

Getting this wrong is a classic false-page source: an alarm on a
per-instance metric left on the default during an Auto Scaling
scale-in event can fire `ALARM` purely because the instance — and its
metric — no longer exists, not because anything is actually wrong.

## Why single alarms flap

A metric that legitimately hovers near its threshold — p99 latency
bouncing between 480ms and 520ms against a 500ms alarm — produces an
alarm that flips `OK → ALARM → OK → ALARM` repeatedly. Each transition
can fire a notification, which is how a borderline-but-not-actually-
broken metric turns into the pager going off every few minutes. Raising
the threshold or widening the evaluation window helps, but it doesn't
fix the underlying issue: a single metric is often not, by itself, the
full definition of "this is actually a problem."

## Composite alarms: combining states, not just metrics

A **composite alarm** doesn't watch a metric at all — it watches the
**states of other alarms** and combines them with an `AlarmRule`
expression using `AND`, `OR`, and `NOT`. That lets you encode exactly
the condition that actually matters:

```
ALARM("high-p99-latency") AND ALARM("elevated-5xx-rate")
```

That composite only enters `ALARM` when both the latency alarm *and*
the error-rate alarm are simultaneously in `ALARM` — a latency blip
alone, with error rates normal, no longer pages anyone. That's the
direct fix for flapping: instead of loosening one alarm's threshold
until it misses real problems, you require corroborating evidence from
a second signal before anything notifies a human.

A composite can also suppress noise during planned work:

```
ALARM("elevated-5xx-rate") AND NOT ALARM("deployment-in-progress")
```

Here, a second alarm — flipped to `ALARM` by a deploy pipeline at the
start of a rollout and cleared at the end — gates the real alert so a
deploy's expected brief error blip never pages on-call.

Only the composite alarm needs an action (SNS topic, Auto Scaling
policy, etc.) attached; the underlying alarms it references can have
their own actions disabled entirely, so a human only ever hears from
the composite.

## Key terms

| Term | Meaning |
|---|---|
| Statistic | Which aggregation (Average, Sum, Maximum, p99, etc.) an alarm evaluates per period |
| Period | The length of time each metric data point represents |
| Evaluation periods / datapoints to alarm | An M-of-N rule: fires only if M of the last N periods breached the threshold |
| TreatMissingData | Controls alarm behavior when a metric stops reporting (`missing`, `notBreaching`, `breaching`, `ignore`) |
| Flapping | An alarm repeatedly flipping OK/ALARM because a metric sits right at its threshold |
| Composite alarm | An alarm whose state is a logical combination (`AND`/`OR`/`NOT`) of other alarms' states, not a metric directly |
| AlarmRule | The expression (e.g. `ALARM(a) AND ALARM(b)`) that defines a composite alarm's logic |

## Check yourself

You're ready for Lesson 11 when you can explain, without looking: what
four settings together decide when a standard alarm fires, what
`TreatMissingData` is actually protecting you against, and how a
composite alarm's `AlarmRule` fixes flapping in a way that adjusting
one alarm's threshold cannot.
