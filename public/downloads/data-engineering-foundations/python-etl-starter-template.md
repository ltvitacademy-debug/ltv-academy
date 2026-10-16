# Python ETL Starter Template (Extract / Transform / Load)

A reusable skeleton built on Lesson 27's `extract()` / `transform()` /
`load()` shape, extended with a second extract source (a REST API) and
a run-log write to SQL — the pattern this course's Worked Example 2
walks through end to end. Copy this, rename the functions, and adjust
the validation rules inside `transform()` for whatever source you're
onboarding next.

```python
import pandas as pd
import requests
from datetime import datetime

def extract_file(path):
    """E: read the raw file, exactly as it arrived (the raw/bronze zone)."""
    return pd.read_csv(
        path,
        parse_dates=["tpep_pickup_datetime", "tpep_dropoff_datetime"],
        dtype={"VendorID": "str", "PULocationID": "int"},
    )

def extract_api(url, timeout=10):
    """E (second source): pull a lookup/reference table from a REST API."""
    response = requests.get(url, timeout=timeout)
    response.raise_for_status()
    return pd.json_normalize(response.json())

def transform(df):
    """T: clean and validate (the cleansed/silver zone)."""
    df = df.dropna(subset=["fare_amount", "passenger_count"])
    df = df[df["fare_amount"] > 0]
    df = df[df["passenger_count"] > 0]
    df = df[df["trip_distance"] > 0]
    df = df.drop_duplicates()
    df["fare_per_mile"] = df["fare_amount"] / df["trip_distance"]
    return df

def load_parquet(df, path):
    """L: write the cleansed result to disk, ready for Spark to read."""
    df.to_parquet(path, index=False)
    return len(df)

def log_run(connection, source_file, rows_in, rows_out, status):
    """L (second sink): write run stats to a SQL ops table."""
    connection.execute(
        """
        INSERT INTO etl_run_log (run_date, source_file, rows_in, rows_out, status)
        VALUES (?, ?, ?, ?, ?)
        """,
        (datetime.utcnow(), source_file, rows_in, rows_out, status),
    )

def run_etl(source_path, destination_path, connection):
    rows_in = 0
    try:
        raw_df = extract_file(source_path)
        rows_in = len(raw_df)
        clean_df = transform(raw_df)
        rows_out = load_parquet(clean_df, destination_path)
        log_run(connection, source_path, rows_in, rows_out, "success")
        print(f"Wrote {rows_out} rows to {destination_path}")
    except FileNotFoundError:
        log_run(connection, source_path, rows_in, 0, "source_not_found")
        print(f"Source file not found: {source_path}")
    except Exception as e:
        log_run(connection, source_path, rows_in, 0, "failed")
        print(f"ETL failed: {e}")
```

## Checklist before you run this against a new source

- [ ] `parse_dates` / `dtype` set for every column you'll later join or filter on (a `VendorID` read as an int on one side and a string on the other is a silent join-mismatch bug).
- [ ] Every validation rule in `transform()` matches something you actually confirmed is invalid in this source — don't copy another source's rules unchanged.
- [ ] `try` / `except` catches the specific failure you expect (`FileNotFoundError`) separately from a catch-all, so you can tell the two apart in the log.
- [ ] `log_run()` writes even on failure, with `rows_out = 0` — a failed run should always leave a row, never a silent gap in the ops table.
