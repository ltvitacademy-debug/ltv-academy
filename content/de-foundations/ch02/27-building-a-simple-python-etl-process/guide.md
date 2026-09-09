# Lesson 27 — Building a Simple Python ETL Process

**Chapter 2 · Python for Data Engineers · Lesson 27 of 62 — Chapter Finale**

## What you'll learn

- One real ETL script, combining every lesson in this chapter
- Extract, Transform, Load — as actual Python, not just theory
- How this maps directly onto Chapter 1's raw → cleansed zones
- Where Chapter 2 leaves off, and Chapter 3 (Spark) picks up

## The full script

```python
import pandas as pd

def extract(path):
    """E: read the raw file, exactly as it arrived (Ch1's raw zone)."""
    return pd.read_csv(
        path,
        parse_dates=["tpep_pickup_datetime", "tpep_dropoff_datetime"],
        dtype={"VendorID": "str"},
    )

def transform(df):
    """T: clean and validate (Ch1's cleansed zone)."""
    df = df.dropna(subset=["fare_amount", "passenger_count"])
    df = df[df["fare_amount"] > 0]
    df = df[df["passenger_count"] > 0]
    df = df[df["trip_distance"] > 0]
    df = df.drop_duplicates()
    df["fare_per_mile"] = df["fare_amount"] / df["trip_distance"]
    return df

def load(df, path):
    """L: write the cleansed result, ready for Chapter 4's Spark to read."""
    df.to_parquet(path, index=False)
    print(f"Wrote {len(df)} rows to {path}")

def run_etl(source_path, destination_path):
    try:
        raw_df = extract(source_path)
        clean_df = transform(raw_df)
        load(clean_df, destination_path)
    except FileNotFoundError:
        print(f"Source file not found: {source_path}")
    except Exception as e:
        print(f"ETL failed: {e}")

run_etl(
    "raw/yellow_tripdata_2024-01.csv",
    "cleansed/yellow_tripdata_2024-01.parquet",
)
```

## Mapping every piece back to this chapter

| Line | Lesson |
|---|---|
| `def extract(...)`, `def transform(...)` | 18 — Functions |
| `parse_dates`, `dtype` | 22 — Reading CSV and JSON |
| `.dropna()`, boolean filtering, `.drop_duplicates()` | 26 — Cleaning Data |
| `df["fare_per_mile"] = ...` | 14 — computed from existing columns |
| `try` / `except FileNotFoundError` | 19 — Exception Handling |
| `.to_parquet(...)` | 8 — choosing Parquet for the cleansed zone |
| `raw/` → `cleansed/` paths | Chapter 1's zones, in Chapter 2's code |

## This is genuinely how it's done

This isn't a toy example simplified for teaching — this three-function
shape (`extract` / `transform` / `load`, wrapped in error handling) is
close to how real, small-scale ETL scripts look in production, before a
team graduates to orchestrating them with something like Data Factory or
Databricks Jobs (covered in this track's later courses).

## Chapter 2, complete

Variables, types, lists, dicts, conditions, loops, functions, exception
handling, files, Pandas, CSV/JSON, APIs, SQL, cleaning — and now, all of
it, in one real script. Chapter 3 introduces Apache Spark: the same
extract/transform/load thinking, but distributed across a cluster
instead of running on one machine.

## Key terms

| Term | Meaning |
|---|---|
| Extract | Read raw data from its source |
| Transform | Clean, validate, and reshape it |
| Load | Write the result to its destination |

## Lab

Adapt `run_etl` to run against a small sample: create a tiny CSV by
hand (5–10 rows, including at least one invalid row), run the pipeline,
and confirm the output Parquet file has fewer, cleaner rows than the
input.

## Check yourself

Chapter 2 is complete when you can explain, without looking, what each
of `extract`, `transform`, and `load` does in this script, and identify
which earlier lesson each piece of code came from.
