# Lesson 36 — Incremental Loads & Watermarks

**Chapter 6 · Python for Data Engineers · Lesson 36 of 48**

## What you'll learn

- Why reloading an entire dataset on every run doesn't scale
- Watermarks — tracking the last successfully loaded value
- Using `order_date` from `orders.csv` as a real watermark column
- Reading and writing a watermark file between pipeline runs

## The problem with reloading everything

Lesson 35's `load_to_warehouse()` used `if_exists="replace"` — every
run wipes the table and reloads all 20 rows of `orders.csv`. That's
fine at 20 rows. It stops being fine once a source has millions of
rows and a pipeline that's supposed to run every hour — re-extracting
and re-loading everything, every run, wastes time and resources on
data that hasn't changed since the last run.

## Watermarks: remembering where you left off

A **watermark** is just the highest value of some ordering column —
usually a date — that's already been successfully loaded. The next run
only extracts rows *after* that watermark, instead of everything.

`orders.csv` has a real column built for exactly this: `order_date`.
The highest `order_date` in the current data is `2026-01-19` (order
`1020`) — once that row is loaded, a watermark of `2026-01-19` means
next run only needs rows with a later date.

## Reading and writing a watermark file

```python
import os

WATERMARK_FILE = "last_loaded_date.txt"

def read_watermark():
    if not os.path.exists(WATERMARK_FILE):
        return "1900-01-01"   # no prior run - load everything
    with open(WATERMARK_FILE, "r") as f:
        return f.read().strip()

def write_watermark(value):
    with open(WATERMARK_FILE, "w") as f:
        f.write(str(value))
```

A single-line text file is enough to persist a watermark between runs
— no database table required, though a real production pipeline often
stores this in a small metadata table instead, for the same durability
reasons a file lacks.

## Extracting only new rows

```python
import pandas as pd

def extract_incremental(path="orders.csv"):
    df = pd.read_csv(path, parse_dates=["order_date"])
    watermark = pd.Timestamp(read_watermark())
    new_rows = df[df["order_date"] > watermark]
    return new_rows
```

`parse_dates=["order_date"]` tells pandas to read that column as real
`datetime64` values instead of plain strings, so the `>` comparison
against the watermark actually compares dates, not text.

## Updating the watermark after a successful load

```python
def run_incremental_pipeline(path="orders.csv"):
    new_rows = extract_incremental(path)
    if new_rows.empty:
        print("No new rows since last run.")
        return

    clean_rows = clean_orders(new_rows)        # Lesson 34
    load_to_warehouse(clean_rows)              # Lesson 35

    new_watermark = clean_rows["order_date"].max()
    write_watermark(new_watermark.strftime("%Y-%m-%d"))
    print(f"Loaded {len(clean_rows)} new row(s). Watermark now {new_watermark.date()}.")
```

The watermark only advances **after** the load succeeds — update it
before the load and a failed run would silently skip those rows
forever on the next attempt, since the pipeline would believe they
were already loaded.

## Key terms

| Term | Meaning |
|---|---|
| Incremental load | Extracting and loading only data newer than the last successful run |
| Watermark | The highest already-loaded value of an ordering column, usually a date |
| `parse_dates` | A `pd.read_csv()` argument that parses a column as real dates |

## Lab

Set the watermark file to `2026-01-10` and run `extract_incremental()`
against `orders.csv` — confirm it returns only orders `1010` and later.

## Check yourself

You're ready for Lesson 37 when you can explain, without looking: why
the watermark must update only after a successful load, and what
`order_date` column value currently represents the dataset's
watermark.
