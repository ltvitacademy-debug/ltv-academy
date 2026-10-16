# Lesson 38 — Building a Config-Driven ETL Script

**Chapter 6 · Python for Data Engineers · Lesson 38 of 48**

## What you'll learn

- Why hardcoded file paths and settings don't belong inside pipeline functions
- Driving a pipeline from a config dictionary (and a config file)
- Assembling every piece from Lessons 32–37 into one real script
- A runnable `main()` you could schedule with Chapter 7's tools

## Why config, not hardcoded values

Every function built across this chapter — `extract_orders()`,
`clean_orders()`, `load_upsert()` — has taken its settings as
arguments, which is good practice, but the orchestrator calling them
has still hardcoded file names like `"orders.csv"` directly in the
code. Change the source file, the target database, or the watermark
file's location, and you'd be editing the script itself. A
config-driven script separates "what the pipeline does" from "which
files and settings it's pointed at."

## A config dictionary

```python
CONFIG = {
    "source_csv": "orders.csv",
    "warehouse_db": "orders_warehouse.db",
    "watermark_file": "last_loaded_date.txt",
    "table_name": "orders",
}
```

## Or, the same thing as a config file

```python
# config.json
{
    "source_csv": "orders.csv",
    "warehouse_db": "orders_warehouse.db",
    "watermark_file": "last_loaded_date.txt",
    "table_name": "orders"
}
```

```python
import json

def load_config(path="config.json"):
    with open(path, "r") as f:
        return json.load(f)
```

A JSON config file means changing the pipeline's behavior — pointing
it at a different source file for a test run, say — doesn't require
touching the Python code at all.

## Assembling the whole pipeline

```python
import pandas as pd
import sqlite3
import os
import json

def extract_incremental(config):
    df = pd.read_csv(config["source_csv"], parse_dates=["order_date"])
    watermark = pd.Timestamp(read_watermark(config["watermark_file"]))
    return df[df["order_date"] > watermark]

def clean_orders(df):
    df = df.copy()
    df.loc[df["customer_name"].isna(), "customer_name"] = "Unknown Customer"
    bad = df["quantity"] <= 0
    df = df[~bad]
    return df

def load_upsert(df, config):
    conn = sqlite3.connect(config["warehouse_db"])
    cursor = conn.cursor()
    cursor.execute(f"""
        CREATE TABLE IF NOT EXISTS {config['table_name']} (
            order_id INTEGER PRIMARY KEY, customer_id INTEGER, customer_name TEXT,
            region TEXT, product TEXT, category TEXT, quantity INTEGER,
            unit_price REAL, order_date TEXT, status TEXT
        );
    """)
    rows = df[[
        "order_id", "customer_id", "customer_name", "region", "product",
        "category", "quantity", "unit_price", "order_date", "status"
    ]].values.tolist()
    cursor.executemany(
        f"INSERT OR REPLACE INTO {config['table_name']} VALUES (?,?,?,?,?,?,?,?,?,?);",
        rows
    )
    conn.commit()
    conn.close()
    return len(rows)

def read_watermark(path):
    return open(path).read().strip() if os.path.exists(path) else "1900-01-01"

def write_watermark(path, value):
    with open(path, "w") as f:
        f.write(str(value))

def run_pipeline(config):
    new_rows = extract_incremental(config)
    if new_rows.empty:
        print("No new rows since last run.")
        return
    clean_rows = clean_orders(new_rows)
    rows_loaded = load_upsert(clean_rows, config)
    new_watermark = clean_rows["order_date"].max().strftime("%Y-%m-%d")
    write_watermark(config["watermark_file"], new_watermark)
    print(f"Loaded {rows_loaded} row(s). Watermark now {new_watermark}.")

def main():
    config = load_config("config.json")
    try:
        run_pipeline(config)
    except Exception as err:
        print(f"Pipeline failed: {err}")
        raise

if __name__ == "__main__":
    main()
```

Every piece in `main()` traces back to an earlier lesson: validation
and cleaning from Lesson 34, the SQLite load target from Lesson 35,
the watermark from Lesson 36, and the upsert-based idempotency from
Lesson 37 — wired together by config instead of hardcoded values, and
runnable from a terminal as `python etl.py`.

## What's next

Chapter 7 adds proper `logging` in place of these `print()` calls,
`pytest` tests for each function in isolation, and a real schedule to
run `main()` automatically — turning this script from something you
run by hand into something that runs itself.

## Key terms

| Term | Meaning |
|---|---|
| Config-driven script | A pipeline whose settings live in a dictionary or file, not hardcoded in the code |
| `config.json` | A JSON file holding a pipeline's settings, loaded at runtime |
| `main()` | The script's single entry point, run when the file is executed directly |

## Lab

Create `config.json` with this lesson's four keys, then run `main()`
against `orders.csv` twice in a row and confirm the second run reports
"No new rows since last run."

## Check yourself

You've completed Chapter 6 when you can explain, without looking: how
each of Lessons 32–37's pieces shows up inside this lesson's
`run_pipeline()`, and why none of this script's settings are hardcoded
inside its functions.
