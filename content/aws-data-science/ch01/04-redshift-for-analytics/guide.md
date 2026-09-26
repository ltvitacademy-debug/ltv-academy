# Redshift for Analytics

In many companies the cleanest, most trusted data does not live in S3 files. It lives in a data warehouse: customers, orders, products, already joined and governed. On AWS that warehouse is very often Amazon Redshift. The Data Engineer path covers how Redshift is built and loaded. In this lesson we take the data scientist's view: how to build features from warehouse tables without leaking the future, how to get data out for training, and what Redshift ML offers when you want a model without leaving SQL.

AWS code below is illustrative and **not run here**. The feature SQL and the modeling were run against a local SQLite stand-in with a synthetic table, so the dialect is deliberately plain.

## What you'll learn

- How to build point-in-time features with a join
- Why leakage can fake a perfect model
- Three ways to get warehouse data to a model: Data API, UNLOAD, and Redshift ML
- What to watch for on cost and permissions

## Point-in-time features

Suppose you want to predict which customers will stop ordering in the first half of 2024. Features must come only from **before** the cutoff date, `2024-01-01`; the label comes from **after** it. Here is the shape of the query I ran on a synthetic table of 4,000 customers and about 79,000 orders:

```sql
SELECT c.customer_id,
       COUNT(o.order_date) AS orders_before,
       COALESCE(SUM(o.amount), 0) AS spend_before
FROM customers c
LEFT JOIN orders o
  ON o.customer_id = c.customer_id
 AND o.order_date < '2024-01-01'
GROUP BY c.customer_id;
```

The cutoff sits inside the join condition, not in a `WHERE`, so customers with no earlier orders still appear with zeros. A second query counted orders on or after the cutoff and labeled a customer churned when that count was zero. The churn rate came out at 0.346.

## Leakage: when the model is too good

I trained a logistic regression on a stratified 70/30 split (`random_state=42`) two ways. With the point-in-time features the test AUC was **0.775**. Then I added a feature that included 2024 orders. The AUC jumped to **1.000**. A perfect score is a red flag, not a triumph: the feature contained the answer. In a warehouse it is easy to do this by accident, because every table holds the whole history. Always ask of each feature, "would I have known this on the cutoff date?"

## Getting data out: the Data API

The Redshift Data API lets you run SQL over a secure HTTP endpoint, with no drivers or persistent connections. Calls are asynchronous, and you authenticate with credentials in AWS Secrets Manager or temporary IAM credentials, so no password appears in your notebook.

```python
import boto3
rsd = boto3.client("redshift-data")
r = rsd.execute_statement(
    WorkgroupName="my-workgroup",
    Database="dev",
    Sql="SELECT * FROM churn_features")
rsd.describe_statement(Id=r["Id"])
```

`WorkgroupName` targets Redshift Serverless; for a provisioned cluster you pass `ClusterIdentifier` instead. Poll `describe_statement` until it finishes, then call `get_statement_result`. The docs list limits, including a 500 MB maximum result size after compression, so this route suits modest results, not bulk exports. The AWS SDK for pandas also has a `wr.redshift` module if you prefer a DataFrame back.

## Getting data out: UNLOAD

For training data, write it to S3 instead:

```sql
UNLOAD ('SELECT * FROM churn_features')
TO 's3://my-ds-bucket/unload/churn_'
IAM_ROLE default
FORMAT AS PARQUET;
```

Details from the docs: the query is enclosed in single quotes, the outer `SELECT` cannot use `LIMIT`, and the default output is pipe-delimited text, so ask for Parquet explicitly. The files land in S3, ready for Athena, Glue or SageMaker.

## Redshift ML

`CREATE MODEL` trains a model from a table or query, using Amazon SageMaker AI behind the scenes, and creates a SQL function you call to predict:

```sql
CREATE MODEL churn_model
FROM churn_features
TARGET churned
FUNCTION predict_churn
IAM_ROLE default
PROBLEM_TYPE BINARY_CLASSIFICATION
SETTINGS (S3_BUCKET 'my-ds-bucket');
```

The docs note that SageMaker training has additional cost, and you can limit it with `MAX_RUNTIME` (default 5,400 seconds) and `MAX_CELLS` (default 1,000,000). Keep the keyword order shown in the docs. This is handy for quick baselines by SQL analysts; when you need custom code or full control, use SageMaker directly, which starts in Chapter 2.

## Recap

- Build features from data before the cutoff; label from after.
- A suspiciously perfect metric usually means leakage.
- Data API for small results, UNLOAD to Parquet for training data, Redshift ML for SQL-only models.

Next, Lesson 5 covers the IAM roles that make all of this work securely.
