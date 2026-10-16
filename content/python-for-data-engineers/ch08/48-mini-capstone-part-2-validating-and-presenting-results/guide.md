# Lesson 48 — Mini Capstone Part 2: Validating & Presenting Results

**Chapter 8 · PySpark Foundations and Mini Capstone · Lesson 48 of 48**

## What you'll learn

- Why a pipeline finishing without an error isn't the same as a pipeline being correct
- Writing real sanity and row-count checks against Lesson 47's output
- A simple pytest-style validation function for the aggregated result
- Structuring a short write-up that presents findings to someone who didn't build the pipeline

## "It ran" is not the same as "it's right"

Lesson 47's pipeline can finish cleanly, with no exceptions and a
file written to disk, and still be wrong — a bad join, an off-by-one
filter, or a unit mix-up (dollars vs. cents) can all produce a result
that looks plausible but isn't. This final lesson is about the habit
that catches that: checking the *output*, not just trusting that
"no error" means "correct."

## Row-count sanity checks

```python
from pyspark.sql import SparkSession
from pyspark.sql.functions import col
import logging

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger(__name__)

spark = SparkSession.builder.appName("TaxiFareValidation").getOrCreate()

result = spark.read.parquet("/data/nyc_taxi/output/avg_fare_by_zone")

def validate_row_count(df, min_expected=5):
    n = df.count()
    logger.info("Result has %d rows", n)
    if n < min_expected:
        logger.error("Only %d zones in the result — expected at least %d", n, min_expected)
        raise ValueError("Result has suspiciously few rows")
    return True

validate_row_count(result)
```

A result with far fewer rows than expected is often the first visible
sign that a filter upstream was too aggressive, or a join dropped more
rows than it should have — exactly the kind of bug that a quiet,
no-error pipeline run can still hide.

## Checking value ranges make sense

```python
def validate_fare_range(df):
    stats = df.agg(
        {"avg_fare": "min"}
    ).collect()[0]
    min_fare = stats["min(avg_fare)"]
    logger.info("Lowest average fare in result: %.2f", min_fare)

    if min_fare <= 0:
        logger.error("Found a non-positive average fare — upstream cleaning likely failed")
        raise ValueError("avg_fare should never be zero or negative after cleaning")

    max_fare_row = df.orderBy(col("avg_fare").desc()).first()
    logger.info("Highest average fare: %s at %.2f", max_fare_row["pickup_zone"], max_fare_row["avg_fare"])

    if max_fare_row["avg_fare"] > 500:
        logger.warning("Top average fare (%.2f) looks unusually high -- worth a manual check", max_fare_row["avg_fare"])

validate_fare_range(result)
```

This directly checks the business logic, not just row counts: Lesson
47's `clean()` step should have guaranteed no fare of $0 or less ever
reached the aggregation — if one still shows up here, that's proof
the cleaning step has a real bug, caught before anyone downstream
trusts the number.

## A pytest-style validation test, reusing Lesson 40's pattern

```python
# file: test_capstone_result.py
import pytest
from pyspark.sql import SparkSession

@pytest.fixture(scope="module")
def result_df():
    spark = SparkSession.builder.appName("TestCapstoneResult").getOrCreate()
    return spark.read.parquet("/data/nyc_taxi/output/avg_fare_by_zone")

def test_result_has_rows(result_df):
    assert result_df.count() > 0

def test_no_negative_average_fares(result_df):
    bad_rows = result_df.filter(result_df.avg_fare <= 0).count()
    assert bad_rows == 0

def test_every_zone_has_a_trip_count(result_df):
    null_counts = result_df.filter(result_df.trip_count.isNull()).count()
    assert null_counts == 0
```

A `@pytest.fixture` here loads the result once and reuses it across
all three tests, instead of re-reading the Parquet file in every
test function. This turns Lesson 40's unit-testing habit into a real
**data test** — same tool, now checking the output of a pipeline
instead of one isolated function.

## Structuring the write-up

A finished pipeline still needs to actually communicate what it
found, to someone who never saw the code. A short write-up for this
capstone should cover:

1. **The question** — one sentence: "Which pickup zones have the
   highest average fare, and how many trips come from each?"
2. **The data** — one sentence naming the real source: one month of
   NYC Yellow Taxi trip records, joined to the TLC's taxi zone
   lookup table.
3. **The method** — two or three sentences: extracted both files,
   dropped invalid fares/distances, joined to get real zone names,
   grouped by zone with a minimum-trip-count threshold to avoid
   noisy small groups.
4. **The finding** — the actual top 5-10 zones by average fare, as a
   small table, plus one honest sentence noting anything surprising
   (e.g., airport zones often lead on average fare, which matches
   real-world expectations about longer average trip distances to
   airports).
5. **The validation** — one sentence: what was checked (row count,
   no non-positive fares, no unmatched trip counts) and that it
   passed.

```markdown
## Average Fare by Pickup Zone — January 2024 NYC Yellow Taxi

**Question:** Which pickup zones have the highest average fare?

**Data:** One month of real NYC TLC yellow taxi trip records,
joined to the official taxi zone lookup table.

**Method:** Removed trips with non-positive fare/distance or a
missing passenger count, joined to zone names on PULocationID,
grouped by zone (minimum 50 trips), ranked by average fare.

**Finding:** JFK Airport and LaGuardia Airport pickup zones lead
with average fares of $62.14 and $48.73 — consistent with their
longer average trip distances compared to Manhattan pickups.

**Validation:** Result has 180+ zones, no non-positive average
fares, and no unmatched trip counts — all three pytest checks pass.
```

This is the real difference between a script that produces a
Parquet file and a finished piece of data engineering work: the
write-up is what makes the result usable by someone who will never
open the code.

## Key terms

| Term | Meaning |
|---|---|
| "It ran" vs. "it's correct" | A pipeline finishing without an error doesn't prove the output is right |
| Row-count sanity check | Confirming the result has a plausible number of rows, not an obviously broken count |
| Value-range check | Confirming aggregated values (like `avg_fare`) fall within believable bounds |
| Data test | A pytest-style test that checks a pipeline's *output*, not just one function |
| Write-up | A short, non-technical summary of the question, method, finding, and validation |

## Lab

Run all three validation steps from this lesson against Lesson 47's
real output (`validate_row_count`, `validate_fare_range`, and the
`pytest` file), then write your own two-sentence "Finding" section
based on whatever zones actually come out on top in your run.
Confirm every check passes before considering the capstone complete.

## Check yourself

You're ready to call the course complete when you can explain, without
looking: why is a pipeline that finishes with no exceptions not
sufficient proof that its output is correct, and what three things
belong in a short write-up besides the raw numbers?
