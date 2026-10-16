# Lesson 32 — Designing an ETL Pipeline

**Chapter 6 · Python for Data Engineers · Lesson 32 of 48**

## What you'll learn

- The three stages of ETL — Extract, Transform, Load — and why the order matters
- Structuring a pipeline as one function per stage, plus an orchestrator
- This chapter's running example: `orders.csv`, a real 20-row order dataset
- Why separating stages makes a pipeline easier to test and to fix

## Extract, Transform, Load

Every ETL pipeline does three things, in order:

- **Extract** — pull raw data from one or more sources (a file, a database, an API)
- **Transform** — clean it, validate it, reshape it into the form the target expects
- **Load** — write the result somewhere it can be used (a database, a warehouse, another file)

Chapter 5 covered the database half of Extract and Load in isolation.
This chapter builds all three stages into one real, running pipeline.

## This chapter's dataset: orders.csv

```
order_id,customer_id,customer_name,region,product,category,quantity,unit_price,order_date,status
1001,501,Dana Whitfield,West,Trail Runner GTX,Footwear,2,129.99,2026-01-03,Shipped
...
1005,504,,West,Camp Stove Duo,Camping,3,45.25,2026-01-06,Shipped
...
1014,502,Marcus Ibeh,East,Insulated Bottle 1L,Accessories,-1,22.00,2026-01-14,Shipped
...
```

Twenty real order rows for an outdoor-gear retailer — and it has two
real data-quality problems you'll deal with across this chapter: row
`1005` is missing `customer_name`, and row `1014` has a `quantity` of
`-1`. Real source data looks like this far more often than it looks
clean, which is exactly why Transform exists as its own stage.

## One function per stage

```python
import pandas as pd

def extract(path):
    return pd.read_csv(path)

def transform(df):
    df = df.dropna(subset=["customer_name"])
    df = df[df["quantity"] > 0]
    return df

def load(df, target_path):
    df.to_csv(target_path, index=False)
    return len(df)
```

Each function does exactly one job and takes the previous stage's
output as its input. `extract()` doesn't know anything about cleaning
rules; `load()` doesn't know anything about where the data came from.
That separation is what makes each stage independently testable —
Chapter 7's `pytest` lessons will test `transform()` on its own,
without needing a real file or database at all.

## The orchestrator

```python
def run_pipeline(source_path, target_path):
    raw_df = extract(source_path)
    clean_df = transform(raw_df)
    rows_loaded = load(clean_df, target_path)
    print(f"Loaded {rows_loaded} rows (from {len(raw_df)} extracted).")

if __name__ == "__main__":
    run_pipeline("orders.csv", "orders_clean.csv")
```

The orchestrator's only job is to call the three stages in order and
pass each one's output to the next. It doesn't contain any cleaning
logic or file-handling details itself — those live inside `extract()`,
`transform()`, and `load()`.

## Why separate the stages at all

A single giant function that reads the CSV, cleans it, and writes the
output all in one block works, right up until something breaks — and
then it's unclear whether the bug is in reading, cleaning, or writing.
Separate functions mean you can test, log, or replace one stage
without touching the others, and the orchestrator reads like a
description of the pipeline, not an implementation of it.

## Key terms

| Term | Meaning |
|---|---|
| Extract | Pulling raw data from a source |
| Transform | Cleaning and reshaping data into the form the target expects |
| Load | Writing the result to its destination |
| Orchestrator | The function that calls each stage in order |

## Lab

Run the `extract()`/`transform()`/`load()` pipeline above against
`orders.csv` and confirm the printed row counts show two rows were
dropped.

## Check yourself

You're ready for Lesson 33 when you can explain, without looking: what
each of the three ETL stages is responsible for, and why `orders.csv`
is a realistic (not artificially clean) dataset to practice on.
