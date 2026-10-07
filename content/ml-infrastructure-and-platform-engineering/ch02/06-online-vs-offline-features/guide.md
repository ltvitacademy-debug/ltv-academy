# Online vs. Offline Features

Lesson 5 said a feature store gets two things out of one definition: historical values for training, and a fast live value for serving. This lesson gets concrete about how those two paths actually differ — what storage each one uses, how fast each one needs to be, and how Feast configures both from a single `feature_store.yaml`.

## What you'll learn

- The real difference between an offline store and an online store — not just "slow" vs. "fast"
- Typical technology choices for each, and why they're shaped so differently
- How a single Feast project configures both stores at once
- What "materialization" means — the step that moves data from offline to online

## Offline store: optimized for scale and history

The **offline store** holds the full historical record of feature values — every value a feature has ever had, for every entity, at every point in time. It's used to build training datasets, where you need, for example, "what was this driver's 7-day average rating at the exact moment each historical ride happened." Offline stores are built on technology optimized for scanning large volumes of historical data: a data warehouse (BigQuery, Snowflake, Redshift) or a data lake of files (Parquet on S3/GCS, queried through Spark or DuckDB). Latency of seconds to minutes per query is completely acceptable — nobody is waiting on an offline query in real time.

## Online store: optimized for one-row lookups, fast

The **online store** holds only the *latest* value of each feature for each entity — no history, just "right now." It's queried on every live prediction request, so it has to answer in single-digit milliseconds, at high request volume, for exactly one entity at a time (e.g., "give me driver 1001's current conversion rate and acceptance rate"). This shape — fast, one-key, no history — is exactly what key-value stores are built for, which is why online stores are almost always backed by Redis, DynamoDB, or similar low-latency key-value systems, not a data warehouse.

## One config, two stores: Feast's `feature_store.yaml`

A single Feast project declares both stores in one file:

```yaml
project: ride_sharing
provider: local
registry: data/registry.db

offline_store:
  type: file

online_store:
  type: redis
  connection_string: "localhost:6379"

entity_key_serialization_version: 2
```

Notice this is configuration, not feature logic — the same `FeatureView` from Lesson 5 works unchanged against either store. Swapping the offline store to BigQuery or the online store to DynamoDB is a config change, not a rewrite of feature definitions.

## Materialization: how data moves from offline to online

The online store doesn't populate itself. A step called **materialization** copies the latest feature values from the offline store into the online store on a schedule (e.g., every few minutes or hours, depending on how fresh the feature needs to be). In Feast, this is a CLI command:

```bash
feast materialize-incremental $(date -u +"%Y-%m-%dT%H:%M:%S")
```

`materialize-incremental` picks up only what's changed since the last run, rather than recomputing everything — important once feature tables get large. If a feature needs to reflect something that happened seconds ago rather than minutes ago, materialization on a schedule usually isn't fast enough, and that's when teams add a streaming path (a feature pushed directly into the online store from a Kafka consumer, bypassing the batch materialization step) — a pattern Lesson 7 covers as one of the architecture options.

## Reading from each store in code

Training code asks for historical values with a point-in-time join (covered fully in Lesson 8):

```python
training_df = store.get_historical_features(
    entity_df=entity_df,
    features=["driver_hourly_stats:conv_rate", "driver_hourly_stats:acc_rate"],
).to_df()
```

Serving code asks for the latest value, by entity key, with no history involved:

```python
features = store.get_online_features(
    features=["driver_hourly_stats:conv_rate", "driver_hourly_stats:acc_rate"],
    entity_rows=[{"driver_id": 1001}],
).to_dict()
```

Same feature names, same underlying `FeatureView` — two very different read patterns underneath.

## Key terms

| Term | Meaning |
|---|---|
| Offline store | Historical feature storage optimized for large scans, used to build training datasets |
| Online store | Low-latency, key-value feature storage holding only the latest value per entity, used for live serving |
| Materialization | The scheduled process that copies feature values from the offline store into the online store |
| `get_historical_features` | Feast API for pulling training-time (offline) feature values |
| `get_online_features` | Feast API for pulling serving-time (online) feature values |

## Recap

Offline and online stores aren't just "slow" and "fast" versions of the same thing — they're built on different technology for fundamentally different access patterns, scanning history versus looking up one current row, and materialization is the bridge that keeps the online store fresh. Next up, Lesson 7: the architecture patterns that tie the offline store, online store, and materialization pipeline together into a working system.
