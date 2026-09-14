# Lesson 76 — Project 3: Streaming Ingestion and Feature Computation

**Chapter 4 · Added Projects — Capstones · Lesson 76 of 81**

## What you'll learn

- Wiring the transaction stream in through an Eventstream, the way
  Fabric Lesson 19 taught it
- Which window shape actually fits a rolling fraud feature, and why
- Computing rolling aggregates as features, not just as dashboard metrics
- Where out-of-order and late-arriving events threaten a feature's
  correctness

## Ingestion: the same Eventstream, a different consumer

Lesson 75 fixed the shape of the problem; this lesson builds the first
half of it. The transaction stream comes in through an Eventstream
exactly as Fabric Lesson 19 introduced it — each card swipe is one event,
carrying a card ID, amount, merchant, and timestamp. What's different
here isn't the ingestion mechanism, it's the consumer: instead of landing
raw events into an Eventhouse for dashboards (Fabric Lesson 28), this
pipeline computes features from the stream *as it flows*, because the
scoring model in Lesson 77 needs those features within the same
sub-second budget Lesson 75 set.

```
Fabric Lesson 19-21 pattern:  Eventstream -> Eventhouse -> KQL dashboard
This pipeline:                Eventstream -> windowed aggregation
                               -> feature record -> scoring (Lesson 77)
```

## Picking the window shape

A fraud signal like "this card just made 5 purchases in 2 minutes" is a
rolling count over a recent, moving interval — which points straight at
a **hopping** or **sliding window** (Fabric Lesson 31), not a tumbling
window (Lesson 30). A tumbling window resets to zero at fixed boundaries,
so a burst of transactions that straddles a boundary gets split across
two windows and undercounted — exactly the failure mode a fraud detector
can't afford. A sliding window recomputes continuously as new events
arrive, so "the last 2 minutes" always means the actual last 2 minutes,
not "since the last boundary."

```
Tumbling (wrong fit): |--- window 1 ---|--- window 2 ---|
                            3 txns here     2 txns here      -> looks like
                                                                 2 separate,
                                                                 smaller bursts

Sliding (right fit):  the last 2 minutes, recomputed on every new event
                            -> the burst of 5 is always seen as 5
```

## Computing the rolling features

The features a fraud model needs are rolling aggregates per card, not raw
events — count of transactions in the last 2 minutes, sum of amounts in
the last hour, distance since the last transaction's location. This is
Fabric Lesson 24's `summarize` pattern, applied over a sliding window
instead of the whole table:

```kql
// Conceptually, KQL's summarize over a sliding window (Fabric L24, L31),
// producing one feature record per card per new event
Transactions
| where timestamp > ago(2m)
| summarize txn_count_2m = count(),
            total_amount_2m = sum(amount)
          by card_id
```

Each new feature record is what actually gets handed to the scoring step
in Lesson 77 — the model never sees raw transactions directly, only the
computed features.

## Late and out-of-order events break the window

Fabric Lesson 34 covered handling out-of-order events, and it matters
directly here: a transaction that arrives 3 seconds late, after the
window already computed and emitted its feature record, either has to
be dropped (accepted inaccuracy) or trigger a recomputation. A watermark
(Fabric Lesson 33) is the mechanism that decides how long to wait for
late data before finalizing a window — set it too short and real
transactions get silently excluded from a card's feature; set it too
long and the feature arrives too late for Lesson 75's 300ms budget. That
trade-off has no universally correct answer — it's a deliberate choice
this project has to make and document.

## Key terms

| Term | Meaning |
|---|---|
| Sliding window | Recomputes continuously over the last N minutes as new events arrive — the right fit for rolling fraud counts |
| Feature record | A computed rolling aggregate (count, sum, recency) per card, handed to the scoring step — not a raw transaction |
| Watermark trade-off | How long to wait for late events before finalizing a window — accuracy vs. the latency budget |

## Check yourself

You're ready for Lesson 77 when you can explain, without looking: why
does a tumbling window undercount a burst of fraud-like transactions
that straddles a window boundary, while a sliding window doesn't?
