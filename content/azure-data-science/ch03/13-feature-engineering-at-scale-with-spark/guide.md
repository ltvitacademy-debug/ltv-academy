# Feature Engineering at Scale With Spark

Most modeling time goes into features: counts, totals, ratios and time windows built from raw tables. You already know how to do this in pandas, and you know Spark and Delta from the Databricks courses. This lesson is about what changes when you do feature engineering at scale and want features that teams can reuse, not the basics of Spark.

> Spark and Databricks Feature Engineering code is illustrative and was not run here (no Spark cluster or workspace). It follows the Microsoft Learn Azure Databricks docs as of this writing; check current docs for API details. The pandas example was run for real on synthetic, illustrative retail data.

## What you'll learn

- Building windowed aggregate features (pandas stand-in and PySpark equivalent)
- Avoiding leakage with a prediction cutoff
- Point-in-time joins
- What a Databricks feature table is and how a training set uses it

## Step 1: features from a cutoff (run locally)

The setup: 400 customers, about 1,900 orders across January to March 2025. We predict whether a customer orders again in March, using only what happened before 1 March. Features come from before the cutoff; the label comes from after it. This is the leakage rule in miniature.

```python
cutoff = pd.Timestamp("2025-03-01")
past = orders[orders.order_date < cutoff]           # features: past only
future = orders[orders.order_date >= cutoff]        # label: future only

def window(df, days, name):
    lo = cutoff - pd.Timedelta(days=days)
    w = df[df.order_date >= lo].groupby("customer_id")["amount"]
    return pd.DataFrame({f"orders_{name}": w.size(),
                         f"spend_{name}": w.sum()})

feat = (window(past, 30, "30d")
        .join(window(past, 7, "7d"), how="outer")
        .reindex(range(n_cust)).fillna(0.0))
last = past.groupby("customer_id").order_date.max()
feat["days_since_last"] = (cutoff - last).dt.days
feat["days_since_last"] = feat["days_since_last"].fillna(60)
label = (future.groupby("customer_id").size() > 0).astype(int)
feat["bought_in_march"] = label.reindex(range(n_cust)).fillna(0).astype(int)
```

Running the full script (orders generated with a seeded random generator, then a logistic regression on a 75/25 split) printed:

```
orders: (1876, 3)
share positive: 0.7
AUC: 0.656
```

A modest AUC on made-up data is expected; the point is the pipeline shape. Customers with no orders in a window get zeros, and a customer with no history gets a sentinel `days_since_last`, both choices you should make deliberately.

## Step 2: the same logic in PySpark (illustrative)

When the orders table has billions of rows, the pandas group-by becomes a Spark aggregation. Not run here:

```python
from pyspark.sql import functions as F

cutoff = F.lit("2025-03-01").cast("date")
past = orders.filter(F.col("order_date") < cutoff)

w30 = past.filter(F.col("order_date") >= F.date_sub(cutoff, 30))
feat_30d = (w30.groupBy("customer_id")
              .agg(F.count("*").alias("orders_30d"),
                   F.sum("amount").alias("spend_30d")))
```

The thinking is identical: filter to the window, group by the entity key, aggregate. The differences are that the work is distributed, results are lazy until an action runs, and you should avoid pulling big tables into pandas with `.toPandas()`; the Databricks quickstart only does that after data is small enough for scikit-learn.

## Step 3: point-in-time joins (run locally)

If you keep many feature snapshots over time, each training example must get the snapshot that existed at its own timestamp, not a later one. `pandas.merge_asof` does this:

```python
snap = pd.DataFrame({"customer_id": [1, 1, 1],
                     "ts": pd.to_datetime(["2025-01-31", "2025-02-28",
                                           "2025-03-31"]),
                     "orders_30d": [3, 5, 9]})
events = pd.DataFrame({"customer_id": [1, 1],
                       "ts": pd.to_datetime(["2025-02-10", "2025-03-15"])})
pit = pd.merge_asof(events.sort_values("ts"), snap.sort_values("ts"),
                    on="ts", by="customer_id")
```

Output:

```
 customer_id         ts  orders_30d
           1 2025-02-10           3
           1 2025-03-15           5
```

The 15 March event received the 28 February snapshot (5), never the 31 March one (9). Per the Databricks docs, feature tables can declare timeseries columns to get point-in-time lookups, and a time-series key is required when a feature table has a DATE or TIMESTAMP primary key.

## Step 4: Databricks feature tables (illustrative)

Per the docs, in Unity Catalog any Delta table with a primary key constraint can serve as a feature table. The Python client is `FeatureEngineeringClient` (package `databricks-feature-engineering`, preinstalled on recent ML runtimes):

```python
from databricks.feature_engineering import FeatureEngineeringClient, FeatureLookup

fe = FeatureEngineeringClient()
fe.create_table(
    name="ml.retail.customer_features",
    primary_keys="customer_id",
    df=feat_df,                       # a Spark DataFrame
    description="Customer features",
)
```

To train, describe which features to join and let the client build the training set, then log the model with the client so it remembers where its features came from:

```python
feature_lookups = [FeatureLookup(
    table_name="ml.retail.customer_features",
    feature_names=["orders_30d", "spend_30d"],
    lookup_key="customer_id")]

training_set = fe.create_training_set(
    df=labels_df, feature_lookups=feature_lookups,
    label="bought_in_march", exclude_columns=["customer_id"])
training_df = training_set.load_df()
```

The docs state that you must use the DataFrame from `load_df` to train, and log the model with `fe.log_model(...)`, for features to be looked up at inference. That is the payoff: the same feature computation at training and serving, which limits training/serving skew. Databricks also offers newer Feature Views for declarative definitions; the docs currently recommend them for many new projects, so check which fits your workspace.

## Recap

Compute features only from before the cutoff, translate pandas group-bys to Spark aggregations, use point-in-time joins for snapshots, and register reusable features in Unity Catalog. Next: the same workflow in Microsoft Fabric.
