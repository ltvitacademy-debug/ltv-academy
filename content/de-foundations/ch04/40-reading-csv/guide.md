# Lesson 40 — Reading CSV

**Chapter 4 · PySpark · Lesson 40 of 62**

## What you'll learn

- `spark.read.csv()` — reading the real NYC Taxi trip file
- `header=True` and `inferSchema=True` — what each one actually does
- Why inferSchema means a full extra read pass over the file
- Checking the result with `.show()`, `.printSchema()`, `.count()`

## Reading the real file

```python
df = spark.read.csv(
    "/data/nyc_taxi/yellow_tripdata_2024-01.csv",
    header=True,
    inferSchema=True,
)

df.show(5)
```

This is the same file format Lesson 22 read with Pandas'
`read_csv()`. The call shape looks almost identical — that
similarity is deliberate on Spark's part, to make the jump from
Pandas easier.

## header=True

Without it, Spark treats the first row as data, and names every
column `_c0`, `_c1`, `_c2`... With it, Spark uses that first row as
the real column names — `VendorID`, `tpep_pickup_datetime`,
`fare_amount`, and so on.

## inferSchema=True — and its real cost

```python
# Without inferSchema: every column comes back as a string
df_strings = spark.read.csv(path, header=True)
df_strings.printSchema()   # everything: string

# With inferSchema: Spark reads the file TWICE —
# once to guess types, once to actually load it
df_typed = spark.read.csv(path, header=True, inferSchema=True)
df_typed.printSchema()   # fare_amount: double, passenger_count: int, ...
```

That second read is a real, measurable cost on a large file — this
is why production pipelines often pass an explicit schema instead
(Lesson 43 covers that directly). For now, on a file this size,
`inferSchema=True` is the practical choice.

## Checking the result

```python
df.show(5)          # first 5 rows
df.printSchema()    # column names + inferred types
print(df.count())   # total row count — triggers a real Spark job
```

Remember Lesson 34's lazy evaluation: `.show()` and `.count()` are
actions — they're what actually triggers Spark to read the file.
`spark.read.csv()` alone doesn't load anything yet.

## Key terms

| Term | Meaning |
|---|---|
| `spark.read.csv()` | Reads a CSV file into a Spark DataFrame |
| `header=True` | Treats the file's first row as column names |
| `inferSchema=True` | Spark reads the file twice: once to guess types, once to load |

## Lab

```python
trips = spark.read.csv(
    "/data/nyc_taxi/yellow_tripdata_2024-01.csv",
    header=True,
    inferSchema=True,
)
trips.printSchema()
print("Row count:", trips.count())
trips.show(3)
```

Confirm `fare_amount` and `trip_distance` come back as numeric types,
not strings — that's `inferSchema` doing its job.

## Check yourself

You're ready for Lesson 41 when you can explain, without looking: why
does `inferSchema=True` require Spark to read the file twice?
