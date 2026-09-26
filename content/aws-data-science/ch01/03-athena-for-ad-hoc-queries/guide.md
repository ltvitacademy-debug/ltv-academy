# Athena for Ad Hoc Queries

You now have Parquet files in S3 and a table in the Glue Data Catalog. Before you pull anything into pandas, ask a simple question: can SQL answer it, or shrink the data first? Amazon Athena lets you run SQL directly against catalog tables in S3, with no cluster to start. The Data Engineer path covered Athena's engine, pricing and partitioning in depth. This lesson is about how a data scientist uses it: fast exploration, deterministic sampling, and building a training table with one statement.

As always, AWS code is illustrative and **not run here**. Because we have no Athena to call, I ran the SQL against **SQLite**, a small local database, as a stand-in. SQLite and Athena (which uses Trino-family SQL) agree on plain `SELECT`, `GROUP BY` and `CASE`, but differ in many details, so always retest on Athena.

## What you'll learn

- Where Athena fits in a data science workflow
- How to explore and aggregate with SQL before touching pandas
- How to sample reproducibly
- How CTAS builds a Parquet training table
- How to run a query from Python

## Explore with SQL first

Question: does churn differ by plan? On the 50,000-row synthetic customer table, this ran in the SQLite stand-in:

```sql
SELECT plan,
       COUNT(*) AS customers,
       ROUND(AVG(churned), 3) AS churn_rate
FROM customers
GROUP BY plan
ORDER BY plan;
```

The result: basic 24,849 customers at 0.190, plus 15,210 at 0.186, pro 9,941 at 0.193. Plan alone barely moves churn, which is worth knowing before you spend hours modeling it. Only three small rows travelled back to your notebook, not 50,000.

## Sample reproducibly

Athena's `SELECT` supports `TABLESAMPLE BERNOULLI (percentage)`, which keeps each row with the probability you give. That is convenient, but it is random: run it twice and you get different rows. For experiments you want to repeat, filter on a key instead:

```sql
SELECT region,
       ROUND(AVG(monthly_spend), 2) AS avg_spend,
       ROUND(AVG(churned), 3) AS churn_rate
FROM customers
WHERE customer_id % 10 = 0
GROUP BY region;
```

That keeps every tenth customer, the same customers every time (5,000 rows here). Same idea as fixing a random seed in Lesson 1.

## Build a training table with CTAS

`CREATE TABLE AS SELECT` (CTAS) creates a new table from a query. In Athena you can choose the storage format and location:

```sql
CREATE TABLE churn_features
WITH (format = 'PARQUET',
      external_location =
        's3://my-ds-bucket/processed/v1/')
AS
SELECT customer_id, tenure_months, monthly_spend,
       support_tickets,
       CASE WHEN tenure_months <= 12 THEN 'new'
            WHEN tenure_months <= 36 THEN 'mid'
            ELSE 'loyal' END AS tenure_band,
       churned
FROM customers;
```

The AWS docs give two rules to remember. The `external_location` must contain no data, because Athena never deletes anything and will fail if you reuse a non-empty location. And if your workgroup enforces a query results location, a CTAS that specifies `external_location` fails; in that case ask your administrator. I ran the same statement without the `WITH` clause in SQLite: the tenure bands came out as loyal 24,714 rows (churn 0.141), mid 16,933 (0.218) and new 8,353 (0.275), matching the pandas result from Lesson 2.

## Query from Python

Two routes, both illustrative. The AWS SDK for pandas returns a DataFrame:

```python
import awswrangler as wr

df = wr.athena.read_sql_query(
    "SELECT * FROM churn_features",
    database="churn_db")
```

With plain `boto3`, `athena.start_query_execution(QueryString=..., QueryExecutionContext={"Database": ...}, ResultConfiguration={"OutputLocation": "s3://..."})` starts a query, and you poll `get_query_execution` and read `get_query_results` using the returned `QueryExecutionId`. I validated those parameter names against the boto3 service model. Athena is asynchronous, which is why the wrapper is handy.

## Habits that keep queries cheap

Athena bills by data scanned, so select only the columns you need instead of `SELECT *`, filter on partition columns, and store training tables as Parquet. Pull aggregated or sampled results into pandas, not the raw table.

## Recap

- Use Athena to explore, aggregate and sample with SQL before pandas.
- Sample by key for repeatable experiments; `TABLESAMPLE` is random.
- CTAS writes a Parquet training table straight to S3.
- Watch the non-empty location and workgroup rules.

Next, Lesson 4 looks at Redshift for analytics.
