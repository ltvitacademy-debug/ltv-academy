# What a Feature Store Solves

Chapter 1 named "feature store" as the first component of an ML platform. This lesson explains the actual problem it exists to solve, in concrete terms, before Lesson 6 and 7 get into online/offline splits and architecture patterns. If you've ever seen a model behave worse in production than its test metrics suggested, there's a good chance the root cause is exactly what this lesson covers.

## What you'll learn

- The specific problem of duplicated feature logic between training code and serving code
- What a feature store actually is, in concrete terms — not just "a database for features"
- A first look at Feast, the leading open-source feature store, and what a feature definition looks like in it
- Why "feature store" is as much a governance and reuse tool as it is a performance tool

## The problem: two code paths computing the "same" feature

Without a feature store, a feature like "this driver's average trip rating over the last 7 days" typically gets computed twice, by two different pieces of code, written at two different times, often by two different people:

- **Training-time code** — usually a batch SQL query or a pandas/Spark job run against historical data, used to build the training dataset.
- **Serving-time code** — usually a small, latency-sensitive function that computes the same thing from live data, called on every prediction request.

These two code paths are supposed to compute the same value. In practice they drift: someone fixes a bug in the batch query and forgets the serving function, or the serving function handles a timezone or null case slightly differently than the batch job. The model was trained on one definition of "average rating" and is making live predictions against a subtly different one. This gap is called **training/serving skew**, and it's the subject of Lesson 8 — but you can't understand why it happens without first seeing that the two code paths exist in the first place.

## What a feature store actually is

A feature store is a system that lets you define a feature **once**, as code, and then get two things out of that single definition automatically:

1. A way to compute that feature's historical values for a given set of entities and timestamps, for building training sets.
2. A way to serve that feature's latest value for a given entity, fast enough for a live prediction request.

The point isn't just "store features in one place" — plenty of teams have a shared table of pre-computed features and still have skew, because the logic that populates that table for training and the logic that populates it for serving are still two different pieces of code. A real feature store's value is that **one definition drives both paths**, so there's no second copy to drift out of sync.

## A first look at Feast

Feast (Feature Store, open source, originally from Gojek and Google, now a Linux Foundation AI project) is the most widely adopted open-source feature store. A feature in Feast starts as a **FeatureView** definition in Python:

```python
from datetime import timedelta
from feast import Entity, FeatureView, Field, FileSource
from feast.types import Float32, Int64

driver = Entity(name="driver_id", join_keys=["driver_id"])

driver_stats_source = FileSource(
    path="data/driver_stats.parquet",
    timestamp_field="event_timestamp",
)

driver_hourly_stats = FeatureView(
    name="driver_hourly_stats",
    entities=[driver],
    ttl=timedelta(days=1),
    schema=[
        Field(name="conv_rate", dtype=Float32),
        Field(name="acc_rate", dtype=Float32),
        Field(name="avg_daily_trips", dtype=Int64),
    ],
    online=True,
    source=driver_stats_source,
)
```

This single definition tells Feast where the raw data lives (`driver_stats_source`), what entity it's keyed on (`driver_id`), and what fields it exposes. Lesson 6 covers exactly how Feast turns this one definition into both a training-time (offline) and a serving-time (online) path.

## It's a governance tool, not just a performance tool

A less obvious benefit: once feature definitions live in one place as code, they become **discoverable and reusable**. A new model doesn't need to reinvent "average trip rating over 7 days" — it reuses the existing `FeatureView`. That reuse also means a bug fix or a feature improvement benefits every model using it simultaneously, instead of needing to be patched into every team's copy-pasted version, which is exactly the Stage 2 pain described in Lesson 4.

## Key terms

| Term | Meaning |
|---|---|
| Feature store | A system that defines a feature once and serves both historical (training) and live (serving) values from that single definition |
| Training/serving skew | The gap that opens up when training-time and serving-time code compute a feature differently, even if both are "correct" in isolation |
| Feast | The leading open-source feature store, where features are defined as Python `FeatureView` objects |
| FeatureView | A Feast object defining a named group of features, their source data, their entity key, and their schema |

## Recap

A feature store exists to kill the "two code paths, one intended meaning" problem: define a feature once, and let that single definition drive both the historical data used for training and the live value used for serving. Next up, Lesson 6: exactly how that single definition splits into an online path and an offline path under the hood.
