# Lesson 77 — Project 3: Real-Time Scoring and Alerting

**Chapter 4 · Added Projects — Capstones · Lesson 77 of 81**

## What you'll learn

- Applying a scoring rule to the feature records from Lesson 76
- Wiring the alert with Activator, the way Fabric Lesson 37 introduced it
- Why the alerting step is exactly where Chapter 1's exactly-once
  thinking becomes concrete
- Designing the alert to be idempotent, not just fast

## Scoring the feature record

Each feature record from Lesson 76 — rolling transaction count, rolling
total amount, recency — feeds a scoring rule. A capstone-scale version
doesn't need a trained model to make the point; a threshold rule is
enough to prove the pipeline end to end:

```
risk_score =
    (txn_count_2m > 5)          * 40 +
    (total_amount_1h > 2000)    * 35 +
    (distance_since_last > 500) * 25

flag_for_review = risk_score >= 60
```

The scoring logic itself is almost the least important part of this
lesson — swapping this threshold rule for a trained model later changes
nothing about the pipeline around it. What matters is that scoring
consumes exactly one feature record and produces exactly one decision.

## Wiring the alert with Activator

Fabric Lesson 37 introduced Activator as the way to turn a streaming
condition into a real action — an alert, a webhook, a downstream flow —
without hand-rolling the plumbing. Here, the condition is
`flag_for_review = true`, and the action is notifying a fraud-review
queue. Activator is the natural fit specifically because it's built to
watch a continuous stream and fire once per qualifying event, which is
exactly the shape of "alert on this transaction."

## The idempotency problem, made concrete

Chapter 1 introduced designing for idempotency (Lesson 11) and the
exactly-once vs. at-least-once delivery trade-off (Lesson 12) as general
system design concerns. This is the lesson where they stop being
abstract: if the streaming platform re-delivers an event after a
transient failure — which at-least-once delivery explicitly allows — the
same transaction can trigger the scoring step twice, and without a
safeguard, the fraud-review queue gets the same alert twice.

```
At-least-once delivery guarantee:
  event delivered >= 1 time  -- the platform's honest guarantee
  "exactly-once effect" is something YOU build on top of that,
  not something the platform hands you for free
```

## Designing the alert to be idempotent

The fix is the same pattern Lesson 8's SCD merge and Databricks's `MERGE
INTO` both leaned on: make the write to the alerting system a targeted
upsert keyed on the transaction ID, not a blind insert.

```sql
-- The alert write is keyed on transaction_id, so redelivery
-- is a no-op instead of a duplicate alert
MERGE INTO FraudAlerts AS target
USING (SELECT @transaction_id AS transaction_id, @risk_score AS risk_score) AS source
ON target.transaction_id = source.transaction_id
WHEN NOT MATCHED THEN
  INSERT (transaction_id, risk_score, alerted_at)
  VALUES (source.transaction_id, source.risk_score, current_timestamp());
```

If the same transaction arrives twice, the second `MERGE` matches the
existing row and does nothing — one alert, no matter how many times the
event gets redelivered. This is the whole reason Lesson 75 flagged
idempotency as a first-class requirement back at kickoff, before a
single line of scoring logic existed.

## Key terms

| Term | Meaning |
|---|---|
| Threshold rule | A simple, explainable scoring function — proves the pipeline before any ML model is warranted |
| Activator | Fabric's mechanism for turning a streaming condition into a real action, once per qualifying event |
| Idempotent alert write | A keyed upsert (MERGE) that makes event redelivery a no-op instead of a duplicate alert |

## Check yourself

You're ready for Lesson 78 when you can explain, without looking: why
does an at-least-once delivery guarantee, on its own, not prevent
duplicate fraud alerts — and what has to be added to actually prevent them?
