# Lesson 22 — Reading CSV and JSON

**Chapter 2 · Python for Data Engineers · Lesson 22 of 62**

## What you'll learn

- `pd.read_csv()` — one line replacing Lesson 20's entire manual loop
- `pd.read_json()` — the JSON equivalent
- The parameters that matter most: `parse_dates` and `dtype`
- Reading this course's actual NYC Taxi file

## Reading a CSV: one line

```python
import pandas as pd

df = pd.read_csv("yellow_tripdata_2024-01.csv")
print(df.head())
print(len(df))
```

Compare this to Lesson 20's manual version — opening the file, reading
line by line, splitting on commas, converting each value's type by
hand. `pd.read_csv()` does all of it: opens the file, parses every row,
infers every column's type, and hands you back a ready-to-use
DataFrame.

## Reading JSON

```python
df = pd.read_json("trips.json")
```

If the JSON file is shaped as a list of objects — exactly Lesson 15's
list of dictionaries — `read_json()` converts it into a DataFrame the
same way `read_csv()` does for CSV. Lesson 24 goes deeper into JSON
shapes that aren't this simple.

## Two parameters that matter constantly

```python
df = pd.read_csv(
    "yellow_tripdata_2024-01.csv",
    parse_dates=["tpep_pickup_datetime", "tpep_dropoff_datetime"],
    dtype={"VendorID": "str"},
)
```

- **`parse_dates`** — without it, a date column loads as plain text;
  with it, Pandas converts it to an actual datetime type you can
  subtract, filter, and extract year/month/day from directly
- **`dtype`** — overrides Pandas' automatic type guessing for a
  specific column; useful for a column like `VendorID` that looks
  numeric but should stay text (recall Lesson 14)

## Why this matters more than it sounds like it should

Getting a column's type wrong at read time causes bugs that show up
much later — a date stored as text can't be filtered by year; a
numeric-looking ID stored as an actual number might lose meaningful
leading characters. Catching this at `read_csv()` time, deliberately,
avoids debugging it three lessons later.

## Key terms

| Term | Meaning |
|---|---|
| `pd.read_csv()` | Reads a CSV file directly into a DataFrame |
| `pd.read_json()` | Reads a JSON file directly into a DataFrame |
| `parse_dates` | Tells Pandas which columns to convert to real datetime values |
| `dtype` | Overrides Pandas' automatic type inference for specific columns |

## Lab

```python
import pandas as pd

df = pd.read_csv(
    "yellow_tripdata_2024-01.csv",
    parse_dates=["tpep_pickup_datetime"],
)

print(df.dtypes["tpep_pickup_datetime"])   # datetime64[ns]
print(df["tpep_pickup_datetime"].dt.year.unique())
```

Confirm `tpep_pickup_datetime` shows as a real datetime type, and that
`.dt.year` works directly on it — something that would fail entirely if
it had loaded as plain text.

## Check yourself

You're ready for Lesson 23 when you can explain, without looking: what
does `parse_dates` actually change, and why does it matter for a column
you plan to filter by year or month later?
