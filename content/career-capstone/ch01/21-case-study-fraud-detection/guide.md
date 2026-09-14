# Lesson 21 — Case Study: A Real-Time Fraud Detection System

**Chapter 1 · System Design for Data Engineers · Lesson 21 of 81**

## What you'll learn

- Why this system has no sensible batch path at all
- How idempotency and delivery guarantees protect the fraud score itself
- Where the design deliberately leans AP, per Lesson 19's CAP analysis
- How Eventstreams, watermarks, and Activator fit together here

## A system where batch was never an option

A transaction has to be scored *before* it completes, not after — so
unlike Lesson 20's ride-sharing platform, there's no "and also batch
this for later" path that makes sense. Lesson 5's processing-model
choice is streaming, full stop, and Lesson 7's Kappa architecture is
the natural fit: one pipeline, always running, no batch layer to keep
in sync with it.

```
Functional:      score every transaction against recent behavior
                 within a tight latency budget (e.g. 200ms)
Non-functional:  the scoring pipeline must stay available under
                 load — a network hiccup should degrade gracefully,
                 not silently drop or double-score a transaction
```

## Delivery guarantees and idempotency protect the score

Lesson 12's delivery guarantees matter enormously here: if a
transaction event gets delivered twice (a common at-least-once
reality), a naive pipeline might score it twice, or worse, flag one
duplicate as a second suspicious purchase. Lesson 11's idempotency
is the fix — every scoring operation is keyed on `transaction_id`, so
replaying or duplicating the same event produces the same result
instead of a new one:

```sql
-- Idempotent write: scoring a transaction twice is a no-op,
-- not two separate fraud signals
MERGE INTO TransactionScores AS target
USING (SELECT @transaction_id AS transaction_id, @score AS score) AS source
ON target.transaction_id = source.transaction_id
WHEN NOT MATCHED THEN
  INSERT (transaction_id, score, scored_at)
  VALUES (source.transaction_id, source.score, SYSUTCDATETIME());
-- WHEN MATCHED: intentionally do nothing -- already scored
```

## Leaning AP, on purpose

Lesson 19's CAP analysis applies directly: during a partition or a
degraded dependency, this system should favor **availability**. A
transaction-scoring pipeline that refuses to answer because it can't
confirm every feature is perfectly current isn't protecting anyone —
it's just blocking legitimate purchases. The design deliberately
accepts scoring against slightly stale rolling features (e.g. "spend
in the last 5 minutes") rather than erroring out.

## Ingestion, features, and alerting

```
Transactions
     |
     v
Fabric Eventstream (Fabric Lesson 19) -- ingestion layer (Lesson 13)
     |
     v
Rolling feature computation (Lesson 14's transformation layer)
  -- e.g. spend_last_5min, distinct_merchants_last_hour
  -- Fabric Lesson 33's watermarks handle events arriving late
     |
     v
Score + idempotent write (Lesson 15's serving layer)
     |
     v
Fabric Activator (Fabric Lesson 37) -- fires the real-time alert
```

Activator is the concrete answer to "then what" — a flagged score
isn't useful sitting in a table; Activator is the piece that turns a
crossed threshold into an actual alert, in real time.

## Key terms

| Term | Meaning |
|---|---|
| Idempotent scoring | Scoring the same transaction_id twice produces one result, not two |
| AP by design | Favoring availability over perfect freshness during a partition |
| Rolling feature | A time-windowed aggregate (like spend in the last 5 minutes) fed to the score |

## Check yourself

You're ready for Lesson 22 when you can explain, without looking: why
does this system deliberately lean AP rather than CP, and what would
go wrong if it leaned CP instead?
