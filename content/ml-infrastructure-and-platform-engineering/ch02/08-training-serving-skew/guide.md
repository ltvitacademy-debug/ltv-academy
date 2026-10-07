# Training/Serving Skew

This lesson has been promised since Lesson 5: training/serving skew, named directly, with the specific mechanism that causes it and the specific technique — the point-in-time join — that a feature store uses to prevent the most common form of it.

## What you'll learn

- A precise definition of training/serving skew, and the three distinct ways it happens
- Why naive training-set construction leaks future information without anyone noticing
- What a point-in-time join is and how it prevents that leak
- How to detect skew that's already happening in a live system

## Defining the skew, precisely

Training/serving skew is any difference between the feature values a model was trained on and the feature values it sees at serving time for what should be "the same" input. It shows up as a model with strong offline evaluation metrics that performs noticeably worse once it's actually live — because the model learned patterns against one version of reality and is being asked to predict against a subtly different one.

## Three distinct causes

1. **Code duplication** (Lesson 5's core problem) — training-time and serving-time code are two separate implementations of the "same" feature logic, and they drift out of sync over time as one gets updated without the other.
2. **Time travel / data leakage** — a training set is built by joining features to labels using each feature's *current* value instead of its value *at the time the label's event actually happened*. This leaks information from the future into training, inflating offline accuracy in a way that can never be reproduced at serving time, when the model only has access to what's true right now.
3. **Infrastructure differences** — subtler cases, like a training pipeline that fills missing values with a mean computed over the full historical dataset, while the serving path fills missing values with zero because it doesn't have that historical context available in real time.

## The point-in-time join: preventing time travel

Here's the leak in concrete terms. Say you're training a model to predict whether a ride will be rated 5 stars, using the driver's `avg_daily_trips` feature. If you naively join today's current value of `avg_daily_trips` onto a ride that happened three months ago, the model trains on information that didn't exist yet at the time of that historical ride — it's seeing three months of *future* driving activity baked into a feature for a past event.

A **point-in-time join** fixes this by matching each historical event to the feature value **as of that event's own timestamp**, not the feature's current value. Feast's `get_historical_features` does exactly this automatically:

```python
import pandas as pd
from feast import FeatureStore

store = FeatureStore(repo_path=".")

entity_df = pd.DataFrame({
    "driver_id": [1001, 1002, 1003],
    "event_timestamp": [
        pd.Timestamp("2026-07-01 10:00:00"),
        pd.Timestamp("2026-07-03 14:30:00"),
        pd.Timestamp("2026-07-05 09:15:00"),
    ],
})

training_df = store.get_historical_features(
    entity_df=entity_df,
    features=[
        "driver_hourly_stats:conv_rate",
        "driver_hourly_stats:avg_daily_trips",
    ],
).to_df()
```

For each row in `entity_df`, Feast looks up the feature value that was correct **as of that exact `event_timestamp`** — never a later value, no matter how much more recent data exists. This is the single most important guarantee a real feature store provides over a hand-rolled SQL join, which is very easy to get wrong in the "just use the current value" direction without realizing it.

## Detecting skew in a system that's already live

Since skew is a difference between two numbers that should match, it's detectable by directly comparing them: log the feature values actually used at serving time, and periodically compare a sample against what the offline pipeline would have computed for the same entity and timestamp. A persistent, nonzero difference is skew, even before it shows up as a drop in model performance. This comparison job is itself a form of monitoring — foreshadowing the broader monitoring and reliability topic in Chapter 7.

## Key terms

| Term | Meaning |
|---|---|
| Training/serving skew | A difference between the feature values used in training and the feature values seen at serving time for the same logical input |
| Time travel / data leakage | Accidentally using a feature's future (post-event) value when building a training example, inflating offline accuracy unrealistically |
| Point-in-time join | A join that matches each historical event to the feature value as of that event's own timestamp, not the feature's current value |
| `get_historical_features` | Feast's API for building a training set with point-in-time correctness automatically applied |

## Recap

Training/serving skew comes from three places — duplicated code, time-travel leakage in naive joins, and infrastructure differences — and a point-in-time join is the specific technique that prevents the most damaging of the three by matching each historical event to the feature value that was actually true at that moment. Next up, Lesson 9: feature versioning and lineage, closing the loop on how you track exactly which feature definition produced which result.
