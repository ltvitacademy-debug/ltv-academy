# Feature Store

Every model you build depends on features, the engineered columns such as orders in the last 30 days or average basket size. Teams tend to compute the same features in several places: once in a notebook for training, again in application code for predictions, and again for the next project. The copies drift apart, and the model quietly sees different numbers in production than it saw in training. That mismatch is called **training-serving skew**. **SageMaker Feature Store** is a managed place to compute a feature once, store it, and read it consistently for both training and serving.

> Cloud code in this lesson is illustrative and was not run here (no AWS account). It uses the boto3 API calls, which are the stable layer beneath the SageMaker Python SDK, and follows the AWS developer guide and API reference as of this writing. The store behavior below was simulated locally with pandas to show the ideas; it is not the service.

## What you'll learn

- The vocabulary: feature group, record identifier, event time, online and offline store
- Why the online store keeps only the latest record and the offline store keeps history
- How to build a point-in-time correct training set
- What creating a feature group and reading a record look like in boto3
- Cost and latency points to check

## The concepts

From the developer guide's concepts page:

- A **feature group** is the main resource: a logical grouping of features describing records, like a table. Its schema is a list of **feature definitions**, each a name and a type of `Integral`, `Fractional` or `String`.
- A **record** is one row. The **record identifier** (say, `customer_id`) plus the **event time** uniquely identify a record. The event time is when the event happened, supplied by you. It can be a string in ISO-8601 UTC or a fractional number of seconds since the Unix epoch.
- The **online store** keeps only the latest record per identifier, for low-latency lookups with `GetRecord`. The guide describes it as designed for millisecond reads and high write throughput.
- The **offline store** keeps every record as history, in Amazon S3, for exploration, training and batch inference.
- A feature group can have an online store, an offline store, or both, and you must enable at least one.

## The behavior, simulated locally

Here is a small illustrative table of customers' `orders_30d` over time, and a two-line simulation of each store's rule:

```python
def online_store(df):             # latest event_time per record id only
    return (df.sort_values("event_time")
              .drop_duplicates("customer_id", keep="last")
              .set_index("customer_id"))
```

Applied to five records (customer 1 at Jan, Feb, Mar; customer 2 at Jan, Feb), the online view, as run:

```
ONLINE (latest per customer):
            event_time  orders_30d
customer_id
2           2026-02-15           4
1           2026-03-01           1
```

Now a late-arriving record for customer 1 with an earlier event time (20 January). As the guide describes, the offline store keeps it and the online store does not replace the newer record:

```
after late record -> offline rows: 6 | online orders_30d for customer 1: 1
```

## Point-in-time correct training data

The offline store's history solves a subtle problem. Suppose customer 1's churn label was recorded on 10 February. The right feature value is the one known on that date (5 orders, from 1 February), not today's value (1 order, from March). Using the March value would leak information from the future into training. In pandas, `merge_asof` does the as-of join:

```python
train = pd.merge_asof(labels.sort_values("label_time"),
                      offline.sort_values("event_time"),
                      left_on="label_time", right_on="event_time",
                      by="customer_id")
```

```
 customer_id label_time event_time  orders_30d  churned
           1 2026-02-10 2026-02-01           5        0
           2 2026-03-01 2026-02-15           4        1
```

Each row got the latest feature value at or before its label date. SageMaker's offline store gives you the history to build this join, typically by querying it with Athena; by default a Glue Data Catalog table is created for the offline store, and the create call has a `DisableGlueTableCreation` option, so check your setup.

## Creating a feature group (illustrative, not run here)

The boto3 `create_feature_group` request takes the identifier and event-time names, the feature definitions, and the store configuration. Provisioning an in-memory online store can take on the order of 10 to 15 minutes according to the API reference.

```python
sm = boto3.client("sagemaker")
defs = [
    {"FeatureName": "customer_id", "FeatureType": "Integral"},
    {"FeatureName": "event_time", "FeatureType": "String"},
    {"FeatureName": "orders_30d", "FeatureType": "Integral"},
]
sm.create_feature_group(
    FeatureGroupName="customers",
    RecordIdentifierFeatureName="customer_id",
    EventTimeFeatureName="event_time",
    FeatureDefinitions=defs,
    OnlineStoreConfig={"EnableOnlineStore": True},
    OfflineStoreConfig={"S3StorageConfig": {"S3Uri": "s3://my-bucket/fs/"}},
    RoleArn=role_arn,
)
```

## Writing and reading records (illustrative, not run here)

Ingestion and online lookups use a separate runtime client, `sagemaker-featurestore-runtime`. Every value is passed as a string:

```python
rt = boto3.client("sagemaker-featurestore-runtime")
rt.put_record(
    FeatureGroupName="customers",
    Record=[
        {"FeatureName": "customer_id", "ValueAsString": "1"},
        {"FeatureName": "event_time", "ValueAsString": "2026-03-01T00:00:00Z"},
        {"FeatureName": "orders_30d", "ValueAsString": "1"},
    ],
)
rec = rt.get_record(FeatureGroupName="customers",
                    RecordIdentifierValueAsString="1")
```

`get_record` returns a `Record` list of `FeatureName` and `ValueAsString` pairs, which your inference code converts back to numbers. `put_record` also accepts `TargetStores` to write to only the online or offline store, and a `TtlDuration` for records that should expire.

## When it is worth it

Feature Store pays off when several models or teams share features, when a real-time endpoint needs fast lookups of precomputed features, or when you need reproducible point-in-time training sets. For a single batch model whose features live in one SQL query, it may be more machinery than you need. The online store is always-on infrastructure, so check the pricing page before leaving one running, and delete feature groups you no longer use.

## Recap

A feature group holds records identified by an ID and an event time. The online store keeps the latest value for real-time lookups; the offline store keeps history in S3 for training and batch work. Use the history to build point-in-time correct training sets, and read the same features at serving time to avoid skew. Next: deploying models behind real-time endpoints.
