# Script — Project 3: Streaming Ingestion and Feature Computation

## Segment 1 (title)

The transaction stream comes in through an Eventstream, the same mechanism Fabric taught for dashboards. What's different here is the consumer: instead of landing raw events for a dashboard, this pipeline computes features from the stream as it flows, because scoring needs them within a sub-second budget.

## Segment 2 (steps: picking the window shape)

A fraud signal like five purchases in two minutes is a rolling count over a moving interval — that points to a sliding window, not a tumbling one. A tumbling window resets at fixed boundaries, so a burst that straddles a boundary gets split and undercounted. A sliding window recomputes continuously, so the last two minutes always means the actual last two minutes.

## Segment 3 (code: computing the rolling features)

The features a fraud model needs are rolling aggregates per card — count of transactions in the last two minutes, sum of amounts in the last hour. That's a summarize pattern applied over a sliding window instead of the whole table. Each new feature record is what gets handed to scoring — the model never sees raw transactions directly.

## Segment 4 (steps: late and out-of-order events)

A transaction that arrives late, after its window already emitted a feature record, either gets dropped or triggers a recomputation. A watermark decides how long to wait for late data — too short and real transactions get silently excluded; too long and the feature misses the latency budget. That trade-off has no universal right answer.

## Segment 5 (outro)

Ingestion and features are flowing, on the right window shape, with a deliberate watermark trade-off. Next up: turning those features into an actual score, and alerting on it without double-counting.
