# Lesson 49 — Unit Testing PySpark Transformations

**Chapter 3 · Production Data Engineering · Lesson 49 of 70**

## What you'll learn

- Separating transformation logic from I/O, so it's actually testable
- A local SparkSession fixture — no cluster, no Fabric workspace needed
- Comparing DataFrame results correctly, not by accident
- What this catches that a full pipeline run wouldn't

## Separating logic from I/O

```python
# Hard to test: reads and transforms in one function
def process_trips():
    df = spark.read.csv("abfss://.../trips.csv")
    return df.filter(df.FareAmount > 0).select("TripId", "FareAmount")

# Testable: the transformation takes a DataFrame, returns a DataFrame
def clean_trips(df):
    return df.filter(df.FareAmount > 0).select("TripId", "FareAmount")
```

DE Foundations Lessons 44–45 (`select()`/`filter()`) taught these
operations as things you do to a DataFrame you already have. The
testable version of a real pipeline keeps that exact shape — a
function taking a DataFrame in, returning a DataFrame out — with the
actual file-reading kept separate. You can't easily unit-test
"reads a file and transforms it" without a real file; you very
easily can unit-test "transforms a DataFrame," because you get to
hand it exactly the DataFrame you want.

## A local SparkSession fixture

```python
import pytest
from pyspark.sql import SparkSession

@pytest.fixture(scope="session")
def spark():
    return SparkSession.builder.master("local[1]").appName("tests").getOrCreate()

def test_clean_trips_drops_negative_fares(spark):
    input_df = spark.createDataFrame(
        [(1, 10.0), (2, -5.0), (3, 25.0)], ["TripId", "FareAmount"]
    )
    result = clean_trips(input_df)
    assert result.count() == 2
```

`local[1]` runs Spark on a single local thread — no Fabric
workspace, no real cluster, no network call at all. This is what
makes the test fast enough to run dozens of times per commit as part
of Lesson 45's CI/CD Test stage, rather than requiring a slow,
expensive real environment every time.

## Comparing results correctly

Two DataFrames with identical data can differ in row order, since
Spark distributes work across partitions with no guaranteed
ordering. Comparing them naively — row by row, in whatever order
`collect()` happens to return — can produce a flaky test that fails
for no real reason. Sorting both results by a stable key (or using a
dedicated comparison helper) before comparing avoids that entirely.

## What this catches that a full run wouldn't

A full pipeline test (Lesson 48) tells you the *whole thing* worked
or didn't — useful, but slow, and it doesn't pinpoint which specific
transformation broke. A unit test isolates one function, so when it
fails, you already know exactly where the bug is, without needing to
debug an entire pipeline run to find it.

## Key terms

| Term | Meaning |
|---|---|
| DataFrame-in, DataFrame-out | The shape that makes a transformation actually unit-testable |
| `local[1]` SparkSession | A fast, real Spark session with no cluster or network dependency |
| Row-order flakiness | A false test failure caused by unordered comparison, not a real bug |

## Check yourself

You're ready for Lesson 50 when you can explain, without looking: why
is `process_trips()` (reading and transforming in one function)
harder to unit test than `clean_trips(df)`?
