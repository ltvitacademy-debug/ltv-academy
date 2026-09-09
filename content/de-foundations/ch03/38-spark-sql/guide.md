# Lesson 38 — Spark SQL

**Chapter 3 · Apache Spark Fundamentals · Lesson 38 of 62 — Chapter Finale**

## What you'll learn

- Writing genuine SQL against a Spark DataFrame — real T-SQL-style
  syntax, on distributed data
- Why the SQL API and the DataFrame API produce identical results
- That SQL is still lazy, still needs an action — nothing here breaks
  Lessons 34–35
- Chapter 3, complete, and what Chapter 4's PySpark actually adds

## Real SQL, against a Spark DataFrame

```python
df = spark.read.parquet("cleansed/yellow_tripdata_2024-01.parquet")

df.createOrReplaceTempView("trips")

result = spark.sql("""
    SELECT VendorID, COUNT(*) AS trip_count, AVG(fare_amount) AS avg_fare
    FROM trips
    WHERE fare_amount > 0
    GROUP BY VendorID
""")
result.show()
```

`createOrReplaceTempView()` registers a DataFrame under a name SQL can
reference; `spark.sql()` then runs genuine SQL against it — `SELECT`,
`WHERE`, `GROUP BY`, all of it real, and if you've taken this site's
T-SQL Development course, this syntax should look almost entirely
familiar.

## The DataFrame API and SQL API are the same thing underneath

```python
# These two produce IDENTICAL results:

sql_result = spark.sql("""
    SELECT VendorID, COUNT(*) AS trip_count
    FROM trips WHERE fare_amount > 0 GROUP BY VendorID
""")

df_result = (
    df.filter(df["fare_amount"] > 0)
      .groupBy("VendorID")
      .count()
)
```

Both compile down to the exact same underlying execution plan — Spark's
query optimizer (called Catalyst) doesn't care which syntax you started
from. Use whichever is more readable for a given task: SQL for people
who think in queries, the DataFrame API for chaining Python logic
naturally alongside it.

## SQL is still lazy — nothing here breaks earlier lessons

```python
result = spark.sql("SELECT * FROM trips WHERE fare_amount < 0")
# Nothing has run yet -- SAME lazy evaluation as Lesson 34.

result.show()   # THIS is what actually triggers execution
```

`spark.sql()` doesn't run your query immediately either — it returns a
DataFrame, describing a plan, exactly like every transformation in
Lesson 35. The action rule still applies, no exceptions.

## Chapter 3, complete

Why Spark exists, distributed computing, the real architecture, driver/
executor communication, clusters and nodes, Spark's own partitions,
lazy evaluation, transformations vs. actions, SparkSession, Spark
DataFrames, and now Spark SQL. Chapter 4 doesn't introduce new *ideas*
— it teaches the actual **PySpark syntax** for every one of these
concepts, hands-on, against this course's real NYC Taxi data.

## Key terms

| Term | Meaning |
|---|---|
| `createOrReplaceTempView()` | Registers a DataFrame under a name SQL can query |
| `spark.sql()` | Runs genuine SQL against a registered view, returning a DataFrame |
| Catalyst | Spark's query optimizer — the same one for both the SQL and DataFrame APIs |

## Lab

```python
df = spark.range(20).withColumnRenamed("id", "n")
df.createOrReplaceTempView("numbers")

result = spark.sql("SELECT n, n * n AS squared FROM numbers WHERE n > 15")
result.show()
```

Confirm this prints rows for `n` values 16 through 19, each with its
square.

## Check yourself

Chapter 3 is complete when you can explain, without looking, why the
SQL API and DataFrame API produce identical results, and name at least
five concepts from this chapter that Chapter 4 will teach you to write
in real PySpark code.
