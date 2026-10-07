# Feature Store Architecture Patterns

Lesson 6 covered offline stores, online stores, and materialization as individual pieces. This lesson puts them together into the handful of architecture patterns real teams actually run, and gives you a way to decide which pattern fits a given feature's freshness requirement.

## What you'll learn

- The batch materialization pattern — the default, and when it's enough
- The streaming ingestion pattern — when batch isn't fresh enough, and what it adds
- The on-demand / request-time transformation pattern — for features that can't be precomputed at all
- How to choose between these patterns per feature, not per project

## Pattern 1: batch materialization (the default)

This is the pattern from Lesson 6: a batch job computes feature values on a schedule (hourly, every few minutes), writes them to the offline store, and a materialization job copies the latest values into the online store. It's the simplest pattern to build and operate, and it's correct for the majority of features — most feature freshness requirements are measured in minutes-to-hours, not seconds, because most models aren't making decisions where the last few minutes of data would change the outcome.

```bash
# runs on a schedule (e.g. every 15 minutes via Airflow/cron)
feast materialize-incremental $(date -u +"%Y-%m-%dT%H:%M:%S")
```

Use this pattern unless you have a specific, named feature that needs fresher data than its schedule can deliver — don't build streaming infrastructure speculatively.

## Pattern 2: streaming ingestion (for sub-minute freshness)

Some features genuinely need to reflect something that happened seconds ago — a fraud model that needs "has this card been used twice in the last 90 seconds," for example. Here, a stream processor (commonly reading from Kafka) computes the feature value continuously and writes it **directly into the online store**, bypassing the batch materialization schedule entirely. The offline store is still updated separately (often from the same stream, written to a data lake) so training data stays available, but the online path no longer waits on a batch job.

This pattern costs more to build and operate — you now have stream processing infrastructure to maintain, and a second way for feature values to end up in the online store, which means a second thing that can introduce training/serving skew if it computes the value even slightly differently than the batch path (Lesson 8 covers this risk directly).

## Pattern 3: on-demand / request-time transformation

Some features can't be precomputed at all, because they depend on something only known at request time — "distance between the user's current GPS location and the nearest store," computed from a GPS coordinate that arrives with the prediction request itself. Feast supports this as an **on-demand feature view**: a transformation function that runs at request time, combining precomputed features from the online store with data passed in on the request.

```python
from feast import RequestSource, Field
from feast.types import Float32
from feast import on_demand_feature_view

input_request = RequestSource(
    name="user_gps",
    schema=[Field(name="lat", dtype=Float32), Field(name="lon", dtype=Float32)],
)

@on_demand_feature_view(
    sources=[input_request],
    schema=[Field(name="distance_to_nearest_store", dtype=Float32)],
)
def distance_to_nearest_store(inputs):
    # transformation logic using inputs["lat"], inputs["lon"]
    ...
```

This pattern has no freshness problem at all, because nothing is precomputed — but it means the transformation logic runs on every request, so it has to be fast and it has to be the same logic used in training (otherwise it reintroduces the exact skew problem a feature store exists to prevent).

## Choosing a pattern per feature, not per project

A real feature store usually runs all three patterns side by side: most features on batch materialization, a handful on streaming because they're genuinely freshness-sensitive, and a handful on on-demand transformation because they depend on request-time inputs. The decision is made feature by feature, based on that feature's actual requirement — not as a single architecture choice applied uniformly to every feature in the project.

## Key terms

| Term | Meaning |
|---|---|
| Batch materialization | Scheduled job copying feature values from offline to online store; the default pattern |
| Streaming ingestion | A stream processor writing feature values directly into the online store for sub-minute freshness |
| On-demand feature view | A Feast transformation that runs at request time, using data only available when the prediction request arrives |
| Request-time data | Input available only when a prediction is requested (e.g., current GPS coordinates), not precomputable in advance |

## Recap

Three architecture patterns cover almost every feature store need: batch materialization as the default, streaming ingestion when sub-minute freshness genuinely matters, and on-demand transformation when a feature depends on request-time input that can't be precomputed. Pick per feature, not per project. Next up, Lesson 8: training/serving skew — what happens when these patterns don't stay perfectly aligned with the training-time logic.
