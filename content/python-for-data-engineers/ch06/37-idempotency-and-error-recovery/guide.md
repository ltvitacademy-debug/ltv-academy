# Lesson 37 — Idempotency & Error Recovery

**Chapter 6 · Python for Data Engineers · Lesson 37 of 48**

## What you'll learn

- What idempotency means for a pipeline, in plain terms
- Why `if_exists="append"` without a safeguard creates duplicate rows on a rerun
- An upsert pattern keyed on `order_id`, using SQLite
- Recovering safely from a failure partway through a load

## Idempotency: rerunning safely

A pipeline step is **idempotent** if running it twice with the same
input produces the same result as running it once. This matters
constantly in real pipelines, because reruns are normal — a scheduled
job that failed halfway, or a manual rerun after fixing a bug
upstream, shouldn't leave the target in a worse state than before.

## The duplicate-row problem

```python
import sqlite3

def load_append_only(df, db_path="orders_warehouse.db"):
    conn = sqlite3.connect(db_path)
    df.to_sql("orders", conn, if_exists="append", index=False)
    conn.close()
```

Run this once against `orders.csv` and the warehouse has 18 rows
(after Lesson 34 drops order `1014`). Run it again — because the
schedule fired twice, or because someone reran it by hand — and the
warehouse now has 36 rows, 18 of them exact duplicates. `if_exists=
"append"` has no idea the data was already loaded; it just appends
whatever it's handed, every time.

## Upserting on order_id instead

```python
def load_upsert(df, db_path="orders_warehouse.db"):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS orders (
            order_id INTEGER PRIMARY KEY,
            customer_id INTEGER,
            customer_name TEXT,
            region TEXT,
            product TEXT,
            category TEXT,
            quantity INTEGER,
            unit_price REAL,
            order_date TEXT,
            status TEXT
        );
    """)
    rows = df[[
        "order_id", "customer_id", "customer_name", "region", "product",
        "category", "quantity", "unit_price", "order_date", "status"
    ]].values.tolist()

    cursor.executemany(
        "INSERT OR REPLACE INTO orders VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
        rows
    )
    conn.commit()
    conn.close()
    return len(rows)
```

`order_id INTEGER PRIMARY KEY` makes `order_id` the table's unique key.
`INSERT OR REPLACE` is SQLite's upsert: if a row with that `order_id`
already exists, it's replaced in place instead of duplicated; if it
doesn't exist yet, it's inserted as new. Run `load_upsert()` against
the same data any number of times, and the table always ends up with
exactly one row per `order_id` — this is what makes the Load step
idempotent.

## Recovering from a failure partway through

```python
def run_pipeline_with_recovery(path="orders.csv"):
    try:
        raw_df = extract_orders(path)
        clean_df = clean_orders(raw_df)
        rows_loaded = load_upsert(clean_df)
        print(f"Pipeline succeeded: {rows_loaded} rows upserted.")
    except Exception as err:
        print(f"Pipeline failed: {err}")
        print("Safe to rerun - load_upsert() will not create duplicates.")
        raise
```

Because `load_upsert()` is idempotent, the recovery story for almost
any failure is the same: fix whatever caused the error, then rerun the
whole pipeline from the top. There's no need to figure out exactly
which rows made it in before the crash — rerunning the full batch
simply re-upserts everything, with no duplicates.

## Key terms

| Term | Meaning |
|---|---|
| Idempotent | Running a step twice has the same effect as running it once |
| Upsert | Insert if a row's key doesn't exist yet, replace it if it does |
| `INSERT OR REPLACE` | SQLite's upsert statement, keyed on the table's primary key |

## Lab

Run `load_append_only()` twice against `orders.csv` and confirm the
row count doubles; then run `load_upsert()` twice and confirm it
doesn't.

## Check yourself

You're ready for Lesson 38 when you can explain, without looking: what
makes `load_upsert()` idempotent, and why that simplifies recovering
from a failed pipeline run.
